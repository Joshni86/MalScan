// Listen to all new downloads
chrome.downloads.onCreated.addListener(async (downloadItem) => {
  const fileUrl = downloadItem.url;

  // Get user toggle (on/off)
  const { vt_enabled } = await chrome.storage.local.get("vt_enabled");
  if (vt_enabled === false) {
    console.log("VirusTotal scan disabled by user.");
    return;
  }

  const extension = fileUrl.split(".").pop().toLowerCase();
  const targetTypes = [
    "exe",
    "msi",
    "bat",
    "cmd",
    "scr",
    "ps1",
    "jar",
    "vbs",
    "wsf",
    "apk",
    "zip",
    "rar",
    "7z",
    "tar",
    "gz",
    "xz",
    "iso",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "rtf",
    "pdf",
    "js",
    "sh",
    "py",
    "php",
    "pl",
    "rb",
    "html",
    "htm",
    "svg",
  ];

  if (!targetTypes.includes(extension)) return;

  const isSafe = await scanUrlWithVirusTotal(fileUrl);
  if (!isSafe) {
    chrome.downloads.cancel(downloadItem.id);
    showMaliciousNotification(fileUrl);
  } else {
    console.log("File deemed safe by VirusTotal:", fileUrl);
  }
});

// Function: Submit file URL to VirusTotal and check scan result
async function scanUrlWithVirusTotal(fileUrl) {
  const { vt_api_key: API_KEY } = await chrome.storage.local.get("vt_api_key");

  if (!API_KEY) {
    console.warn("⚠️ VirusTotal API key not found.");
    return true; // Allow download if key not set
  }

  try {
    // Step 1: Submit URL for analysis
    const submitResp = await fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: {
        "x-apikey": API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "url=" + encodeURIComponent(fileUrl),
    });

    const submitData = await submitResp.json();
    const analysisId = submitData.data.id;

    // Step 2: Wait for a few seconds (scan delay)
    await new Promise((res) => setTimeout(res, 15000)); // wait ~15 seconds

    // Step 3: Fetch analysis result
    const resultResp = await fetch(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: { "x-apikey": API_KEY },
      }
    );

    const resultJson = await resultResp.json();
    const stats = resultJson.data.attributes.stats;

    console.log("🔎 VT Scan Stats:", stats); // optional ofc

    return stats.malicious === 0; // true = safe, false = malicious
  } catch (err) {
    console.error("Error during VirusTotal scan: Continuing Download...", err);
    return true; // Assume safe if scan fails
  }
}

// Function: Show notification if malicious
function showMaliciousNotification(fileUrl) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "⚠️ Malicious File Detected",
    message: `Download blocked:\n${fileUrl}`,
    priority: 2, // critical
  });
}
