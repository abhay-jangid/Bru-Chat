<div align="center">

<img src="src/assets/icon.png" alt="Bru Chat Logo" width="96" height="96" />

# Bru Chat 🐾
### The Free, Local-First AI Web Companion

**Browse the web, chat with web pages, and analyze content using 100% local open-weight AI.**  
*Zero subscriptions. Zero cloud dependencies. Zero telemetry. Absolute privacy.*

---

[![Download Bru Chat](https://img.shields.io/badge/Download-Pre--Built%20Extension%20(.ZIP)-10b981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/abhay-jangid/bru-chat/releases)
[![100% Local Privacy](https://img.shields.io/badge/Privacy-100%25%20Local-success?style=for-the-badge&logo=shield&logoColor=white)](PRIVACY.md)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-Zero%20Tracking-0284c7?style=for-the-badge&logo=eye-slash&logoColor=white)](PRIVACY.md)
[![GPL-3.0 License](https://img.shields.io/badge/License-GPL--3.0-f97316?style=for-the-badge&logo=gnu)](LICENCE)
[![Powered by Ollama](https://img.shields.io/badge/Inference-Ollama%20%7C%20LM%20Studio-8b5cf6?style=for-the-badge&logo=terminal&logoColor=white)](https://ollama.com)

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#how-to-use">How to Use</a> •
  <a href="#features">Features</a> •
  <a href="#comparison">Why Bru Chat?</a> •
  <a href="#lm-studio">LM Studio</a> •
  <a href="#shortcuts">Shortcuts</a> •
  <a href="#troubleshooting">Troubleshooting</a> •
  <a href="#development">Development</a> •
  <a href="#attribution">Attribution & License</a>
</p>

</div>

---

> [!TIP]
> **Why Bru Chat?** Most browser AI assistants route your tabs, keystrokes, and documents through paid cloud APIs. **Bru Chat runs entirely on your machine.** Pair it with Ollama or LM Studio to get a lightning-fast, private copilot in Chrome, Brave, Edge, and Firefox without paying a cent.

---

<a id="installation"></a>
## 🚀 Quick Installation

You can install Bru Chat in two ways:

```text
┌────────────────────────────────────────────────────────┐
│  Choose your installation method:                      │
│                                                        │
│  ⭐ Method 1: Pre-built ZIP (Easiest — No code needed)  │
│  🛠️ Method 2: Build from Source (For Developers)        │
└────────────────────────────────────────────────────────┘
```

### ⭐ Method 1: The Easiest Way (Non-Developers — 1 Minute)
*No coding, Bun, or Node.js required!*

1. **Download the Extension:**
   - Go to [**GitHub Releases**](https://github.com/abhay-jangid/bru-chat/releases).
   - Download the latest **`bru-chat-chrome-mv3.zip`** (or `bru-chat-firefox-mv2.zip` for Firefox).
2. **Extract the ZIP:**
   - Right-click the downloaded `.zip` file and choose **Extract All...** to an easy-to-find folder (e.g. `Downloads/bru-chat-chrome-mv3` or `Documents`).
3. **Load into your Browser (Chrome, Brave, Edge, Opera, Vivaldi):**
   - Open your browser and navigate to `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
   - Turn **ON** the **Developer mode** toggle in the top-right corner.
   - Click the **Load unpacked** button in the top-left corner.
   - Select the extracted `bru-chat-chrome-mv3` folder (the folder containing `manifest.json`).
4. **Pin Extension:**
   - Click the puzzle icon (🧩) in Chrome toolbar and click the pin (📌) next to **Bru Chat 🐾**.
   - Done! You are ready to chat!

> [!NOTE]
> **Firefox Users:** Navigate to `about:debugging` → **This Firefox** → **Load Temporary Add-on** and select the `manifest.json` inside the extracted `bru-chat-firefox-mv2` folder.

---

### 🛠️ Method 2: Build from Source (For Developers)

If you cloned this repository from GitHub, note that the compiled extension folder (`build/chrome-mv3`) is not committed to Git. You generate it with one command:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhay-jangid/bru-chat.git
   cd bru-chat
   ```

2. **Install dependencies:**
   ```bash
   bun install
   # or: npm install
   ```

3. **Build the extension:**
   ```bash
   bun run build:chrome
   # or: npm run build:chrome
   ```
   *This will compile the TypeScript & React files and generate the **`build/chrome-mv3`** directory!*

4. **Load into Chrome:**
   - Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select `build/chrome-mv3`.

---

<a id="how-to-use"></a>
## 📖 How to Use Bru Chat

Get the most out of Bru Chat in 4 simple steps:

```text
┌─────────────────┐       ┌────────────────────┐       ┌─────────────────┐
│  1. Run Ollama  │ ────> │ 2. Open Side Panel │ ────> │  3. Chat & Surf │
│ localhost:11434 │       │    Ctrl+Shift+Y    │       │ Token-Saving AI │
└─────────────────┘       └────────────────────┘       └─────────────────┘
```

### Step 1: Set Up Your Local AI Engine (Ollama)

1. Download and install [Ollama](https://ollama.com/) (available for Windows, macOS, and Linux).
2. Open your terminal or PowerShell and pull your preferred model:
   ```bash
   # Recommended daily driver (fast, accurate, multi-language)
   ollama run qwen2.5:7b

   # Lightweight model (best for laptops & battery life)
   ollama run llama3.2:3b

   # Deep reasoning model (renders step-by-step <think> chains)
   ollama run deepseek-r1:7b

   # Uncensored model (zero guardrails / unfiltered answers)
   ollama run dolphin-llama3:8b
   ```

3. **CRITICAL: Allow Browser Extension Access (CORS)**  
   *Chrome extensions cannot communicate with Ollama unless CORS is enabled:*

   - **Windows (PowerShell):**
     ```powershell
     [System.Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
     ```
     > [!IMPORTANT]
     > After running the PowerShell command, **right-click the Ollama icon in your Windows Taskbar tray, click "Quit Ollama", and restart Ollama from your Start Menu**.

   - **macOS / Linux:**
     ```bash
     export OLLAMA_ORIGINS="*"
     ollama serve
     ```

---

### Step 2: Open Bru Chat

You can trigger Bru Chat anytime using your keyboard or toolbar:

| Action | Shortcut (Windows/Linux) | Shortcut (macOS) | Description |
| :--- | :--- | :--- | :--- |
| **Side Panel** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd> | Opens beside your active tab — ideal for side-by-side reading |
| **Full Web UI** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Opens a dedicated tab for long writing, coding, or managing docs |
| **Toolbar Icon** | Click 🐾 in toolbar | Click 🐾 in toolbar | Quick-launch options |

---

### Step 3: Chat with Any Webpage

1. Open any webpage, documentation, news article, or blog post.
2. Open the **Bru Chat Side Panel** (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>).
3. Bru Chat will automatically extract the core text using its **Token-Saving Readability Parser** (stripping ads, cookie banners, navigation menus, and tracking scripts).
4. Try asking:
   - *"Summarize this article in 5 bullet points."*
   - *"Explain this code snippet in plain English."*
   - *"What are the author's primary arguments?"*
   - *"Translate this text to Spanish/French/German."*

---

### Step 4: Toggle "Fast Mode" ⚡ vs "Deep Analysis" 🔬

Use the quick toggle in the top bar of the chat:
- ⚡ **Fast Mode**: Low temperature and concise responses for quick TL;DRs, facts, and rapid lookups.
- 🔬 **Deep Analysis**: Deep context, detailed explanations, and full step-by-step chain of thought.

When using **DeepSeek-R1**, Bru Chat automatically renders collapsible `<think>` blocks, allowing you to inspect the AI's internal reasoning steps before seeing its final conclusion.

---

<a id="features"></a>
## ⚡ Key Features & Upgrades

Bru Chat is engineered from the ground up for high-performance, local-first intelligence:

### 🍃 Token-Saving Page Extractor
- **Intelligent Readability Parsing**: Strips cookie banners, paywall overlays, navigation bars, tracking scripts, and sidebars before prompt synthesis.
- **70% Token Reduction**: Delivers clean, information-dense Markdown directly to your LLM, preventing context window bloat and speeding up generation times dramatically.

<a id="models"></a>
### 🧠 Curated Open-Weight Model Presets
Bru Chat is tuned to exploit the strengths of today’s finest open weights:
- **Qwen 2.5 (3B / 7B / 14B)**: Flawless instruction following, clean structured code, and multi-lingual fluency.
- **Llama 3.2 (1B / 3B)**: Ultra-compact footprint optimized for whisper-quiet inference on lightweight laptops and battery power.
- **DeepSeek-R1 Distill Models**: Native rendering of `<think>` reasoning blocks with expandable thought processes and step-by-step chain of thought.

### 🔓 Uncensored AI Support
- **True Algorithmic Freedom**: Seamless compatibility with uncensored community models such as **Dolphin-Llama3**, **Hermes**, and custom fine-tunes.
- **No Arbitrary Refusals**: Analyze unfiltered security advisories, fiction, synthetic data, and creative prompts without corporate guardrails.

### 🛡️ Absolute Privacy Guarantee
- **Air-Gapped Operation**: No background analytics, no telemetry pings, and no third-party data broker SDKs.
- **Local Persistence via Dexie**: All chat logs, vector embeddings, and configurations are stored inside your browser's local **IndexedDB** database.

---

<a id="comparison"></a>
## 🆚 Why Bru Chat Over Cloud AI Assistants?

| Feature | Bru Chat 🐾 | Cloud AI Extensions (Copilot, Monica, etc.) |
| :--- | :---: | :---: |
| **Privacy & Telemetry** | 🔒 **100% Local & Zero Tracking** | ⚠️ Transmitted to third-party cloud |
| **Subscription Cost** | 🆓 **$0 Forever (GPL-3.0)** | 💳 $15–$30 / month |
| **Page Extractor** | ⚡ **Readability filter (-70% tokens)** | ❌ Raw DOM dumping |
| **Reasoning Display** | 🧠 **Native `<think>` tag UI** | ⚠️ Proprietary / hidden |
| **Model Freedom** | 🔓 **Ollama, LM Studio, Uncensored** | ❌ Locked to vendor models |
| **Offline Capability** | ✅ **Works without Internet** | ❌ Requires continuous connection |

---

<a id="lm-studio"></a>
## 🔄 Alternative: LM Studio Setup

Prefer using [LM Studio](https://lmstudio.ai/) with custom GGUF models? Bru Chat works out of the box with any OpenAI-compatible local server.

```text
┌─────────────────────────────────┐
│        LM Studio Server         │
│     http://localhost:1234/v1    │ ──> Enabled CORS ──> Bru Chat
└─────────────────────────────────┘
```

1. Launch **LM Studio** and download your favorite GGUF model (e.g. `Qwen2.5-7B-Instruct-GGUF` or `DeepSeek-R1-Distill-Qwen-7B-GGUF`).
2. Go to the **Local Server** tab (the `↔️` icon on the left rail).
3. Select your model from the dropdown.
4. Check **Enable CORS (Cross-Origin Resource Sharing)**.
5. Click **Start Server** on port `1234`.
6. In **Bru Chat**:
   - Click **Settings** (⚙️) → **OpenAI-Compatible Providers**.
   - Set the API Base URL: `http://localhost:1234/v1`
   - Set API Key: `lm-studio` (or leave empty).
   - Save and select your model from the main chat dropdown.

---

<a id="troubleshooting"></a>
## ❓ Troubleshooting & FAQs

### 1. "Failed to fetch" or "Cannot connect to Ollama (localhost:11434)"
- **Cause**: Chrome extensions are blocked by Ollama's default cross-origin policy until CORS is enabled.
- **Fix (Windows)**:
  1. Open PowerShell and run:
     ```powershell
     [System.Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
     ```
  2. Right-click the Ollama icon in your Windows Taskbar tray and choose **Quit Ollama**.
  3. Re-open Ollama from your Start Menu.
  4. Test by opening `http://localhost:11434` in your browser. You should see `"Ollama is running"`.

### 2. "Why don't I see `build/chrome-mv3` when I clone from GitHub?"
- **Cause**: The `build/` folder contains generated binary assets and is intentionally ignored by `.gitignore` to keep the repository lightweight.
- **Fix**:
  - If you just want to use the extension, download the pre-packaged zip from [**GitHub Releases**](https://github.com/abhay-jangid/bru-chat/releases).
  - If you are developing, run `bun install && bun run build:chrome` to generate the `build/chrome-mv3` folder.

### 3. "Can I use Bru Chat completely offline without internet?"
- **Yes!** As long as you have already pulled your model weights into Ollama or LM Studio, Bru Chat operates 100% offline without requiring an internet connection.

---

<a id="shortcuts"></a>
## ⌨️ Keyboard Shortcuts

| Shortcut (Windows / Linux) | Shortcut (macOS) | Action |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd> | Toggle Bru Chat Side Panel |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Launch Bru Chat Full Web UI |
| <kbd>Esc</kbd> | <kbd>Esc</kbd> | Close Overlay / Popover |

---

<a id="development"></a>
## 🛠️ Development & Building

Bru Chat is built with a modern, high-velocity frontend stack:

<p align="left">
  <img src="https://img.shields.io/badge/WXT-Next--Gen%20Extension%20Framework-6366f1?style=flat-square" alt="WXT" />
  <img src="https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Runtime-Bun%20v1.1+-fbf0df?style=flat-square&logo=bun&logoColor=black" alt="Bun" />
</p>

### Prerequisites
- [Bun](https://bun.sh/) (version 1.1 or higher) or Node.js v18+
- Git

### Local Development Workflow
```bash
# 1. Clone repository
git clone https://github.com/abhay-jangid/bru-chat.git
cd bru-chat

# 2. Install dependencies with Bun
bun install

# 3. Start Chromium dev server with Hot Module Replacement (HMR)
bun run dev

# Or develop specifically for Firefox or Edge:
bun run dev:firefox
bun run dev:edge
```

### Production Build & Packaging
```bash
# Build production bundles for Chrome MV3, Firefox MV2, and Edge
bun run build

# Or build single target:
bun run build:chrome
bun run build:firefox

# Package zip releases ready for distribution
bun run zip
bun run zip:firefox
```
The compiled output is outputted directly to `build/chrome-mv3` and `build/firefox-mv2`.

---

<a id="privacy"></a>
## 🔒 Privacy Commitment

Bru Chat was born out of frustration with privacy-invasive, subscription-gated browser extensions:

- 🚫 **Zero Telemetry**: We do not include Google Analytics, Mixpanel, Sentry, or any tracking beacons.
- 🚫 **Zero Remote Endpoints**: Bru Chat makes zero network requests to third parties. Network traffic is restricted strictly to `localhost` and your current active browser tab.
- 💾 **Local-Only Storage**: All conversation histories, system prompts, presets, and cached tokens reside in your browser's local **IndexedDB** via Dexie.js.
- 🔍 **Audit Ready**: You are encouraged to inspect your browser's `DevTools -> Network` tab at any time to verify that zero external traffic leaves your machine.

Read our complete privacy statement at [PRIVACY.md](PRIVACY.md).

---

<a id="attribution"></a>
<a id="license"></a>
## 📜 Attribution & License

### Upstream Heritage
Bru Chat is forked from the exceptional [Page Assist](https://github.com/n4ze3m/page-assist) project created by [Muhammed Nazeem](https://github.com/n4ze3m). We express our deepest gratitude to Muhammed Nazeem and all upstream contributors for laying the foundation of open-source browser AI.

### License
In full compliance with open-source ethics and the **GNU General Public License v3.0 (GPL-3.0)**:
- Original codebase © Muhammed Nazeem and contributors.
- Bru Chat modifications and upgrades © Abhay Jangid and Bru Chat contributors.
- Licensed under the **GNU General Public License v3.0**. You may freely study, modify, distribute, and enhance this software under the terms of GPL-3.0.

See the full license text in the [LICENCE](LICENCE) file.

---

<div align="center">

**Built with ❤️ for the open-source local AI community.**  
*If you find Bru Chat helpful, consider giving the repository a ⭐ on GitHub!*

</div>
