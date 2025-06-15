# MalScan – Intelligent Download Scanner for Chrome

**MalScan** is a Chrome extension that stops threats before they reach your system. It automatically scans downloads in real-time using the VirusTotal API and blocks malicious files — all without interrupting your browsing flow.

Protect your device. Automate your vigilance.

---

## What is MalScan?

MalScan is a lightweight security layer that integrates directly with your Chrome browser. Once installed, it monitors download activity and uses the trusted VirusTotal engine — which aggregates results from over 70 antivirus scanners — to detect harmful content.

If a file is flagged as malicious, the download is blocked immediately, and you're notified. Simple, effective, and private.

---

## Why MalScan?

Most browsers or antivirus programs only check files **after** they've landed on your system. MalScan changes that.

- **Real-time threat detection**
- **Prevents harmful files from downloading**
- **Supports a wide variety of file types (.exe, .zip, .docx, .pdf, .js, etc.)**
- **Clear notifications for malicious content**
- **No backend server or tracking – your data stays with you**
- **Open-source and developer-friendly**

MalScan offers proactive protection for developers, researchers, and everyday users who value control and safety in a digital environment.

---

## How to Set Up MalScan Locally

### 1. Get a VirusTotal API Key

- Sign up at [virustotal.com](https://www.virustotal.com/)
- Navigate to your profile to obtain a free public API key

### 2. Clone or Download the Project

```bash
git clone https://github.com/Joshni86/MalScan.git
```

### 3. Load the Extension in Chrome

- Open chrome://extensions in Chrome
- Enable Developer Mode (toggle at top right)
- Click Load Unpacked
- Select the malscan/ folder

### 4. Add Your API Key

- Click the MalScan extension icon in the toolbar
- Paste your VirusTotal API key in the settings panel
- Use the toggle to turn scanning on or off anytime

## Testing It Out

#### Try downloading files like PDFs, ZIPs, or executables.

- If clean, the download proceeds normally
- If flagged, the download is canceled and a desktop notification is shown

All logs and scan results are available in the browser console for transparency and debugging.

## Customization and Development

MalScan is modular and easy to extend.

**You can:**

- Add support for additional file types
- Customize notification styles
- Connect it with enterprise VirusTotal tiers
- Contribute improvements via pull requests

# License

MalScan is released under the MIT License. You are free to use, modify, and distribute it.

## Stay ahead of threats — before they reach you.

MalScan is more than a safety net. It's a guardrail for the modern web.
