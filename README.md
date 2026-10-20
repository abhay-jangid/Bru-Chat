<div align="center">

<img src="src/assets/icon.png" alt="Bru Chat Logo" width="96" height="96" />

# Bru Chat 🐾
### The Free, Local-First AI Web Companion

**Browse the web, chat with web pages, and analyze content using 100% local open-weight AI.**  
*Zero subscriptions. Zero cloud dependencies. Zero telemetry. Absolute privacy.*

---

[![100% Local Privacy](https://img.shields.io/badge/Privacy-100%25%20Local-success?style=for-the-badge&logo=shield&logoColor=white)](PRIVACY.md)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-Zero%20Tracking-0284c7?style=for-the-badge&logo=eye-slash&logoColor=white)](PRIVACY.md)
[![GPL-3.0 License](https://img.shields.io/badge/License-GPL--3.0-f97316?style=for-the-badge&logo=gnu)](LICENCE)
[![100% Free & Open](https://img.shields.io/badge/Cost-100%25%20Free%20%26%20Open-10b981?style=for-the-badge&logo=open-source-initiative&logoColor=white)](#license)
[![Powered by Ollama](https://img.shields.io/badge/Inference-Ollama%20%7C%20LM%20Studio-8b5cf6?style=for-the-badge&logo=terminal&logoColor=white)](https://ollama.com)

<p align="center">
  <a href="#features">Features</a> •
  <a href="#comparison">Why Bru Chat?</a> •
  <a href="#quickstart">Quickstart Guide</a> •
  <a href="#lm-studio">LM Studio</a> •
  <a href="#shortcuts">Shortcuts</a> •
  <a href="#development">Development</a> •
  <a href="#privacy">Privacy</a> •
  <a href="#attribution">Attribution & License</a>
</p>

</div>

---

> [!TIP]
> **Why Bru Chat?** Most browser AI assistants route your tabs, keystrokes, and documents through paid cloud APIs. **Bru Chat runs entirely on your hardware.** Pair it with Ollama or LM Studio to get a lightning-fast, private copilot in Chrome, Brave, Edge, and Firefox without paying a cent.

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

### 🎛️ "Fast Mode" vs. "Deep Analysis" Quick Toggle
- **Header Bar Quick Switch**: Toggle between generation profiles with a single click right from the top bar.
  - ⚡ **Fast Mode**: Low temperature and concise sampling for instant summaries, TL;DRs, and fast page lookups.
  - 🔬 **Deep Analysis**: High context depth, step-by-step chain of thought, and thorough deductive reasoning.

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

<a id="quickstart"></a>
## 🏁 Quickstart Guide

Get up and running in **under 3 minutes**:

```text
┌─────────────────┐       ┌────────────────────┐       ┌─────────────────┐
│  1. Run Ollama  │ ────> │  2. Load Extension │ ────> │  3. Chat & Surf │
│ localhost:11434 │       │  build/chrome-mv3  │       │  Ctrl+Shift+Y   │
└─────────────────┘       └────────────────────┘       └─────────────────┘
```

### Step 1: Install Ollama & Pull Models

1. Download and install [Ollama](https://ollama.com/) for Windows, macOS, or Linux.
2. Open your terminal or PowerShell and pull the recommended model weights:

```bash
# Recommended daily driver (Balanced, fast, sharp)
ollama run qwen2.5:7b

# Ultra-fast & lightweight (Best for laptops & battery life)
ollama run llama3.2:3b

# Deep reasoning model (Native <think> tag support)
ollama run deepseek-r1:7b

# Uncensored model (Zero guardrails / unrestricted assistance)
ollama run dolphin-llama3:8b
```

3. **Configure Cross-Origin Resource Sharing (CORS)** so your browser extension can talk to Ollama:

**Windows (PowerShell — run once, then restart Ollama from taskbar tray):**
```powershell
[System.Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
```

**macOS / Linux:**
```bash
export OLLAMA_ORIGINS="*"
ollama serve
```

---

### Step 2: Install the Bru Chat Extension

1. Clone or download this repository:
   ```bash
   git clone https://github.com/abhay-jangid/bru-chat.git
   ```
2. Open your Chromium-based browser (Chrome, Brave, Edge, Opera, Vivaldi):
   - Navigate to `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
3. Toggle on **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the extension directory:
   ```text
   Bru Chat\build\chrome-mv3
   ```
5. Reload your browser or extension tab to complete installation.

> [!NOTE]
> Firefox users can load the unpacked extension from `Bru Chat/build/firefox-mv2` via `about:debugging` → **This Firefox** → **Load Temporary Add-on**.

---

### Step 3: Launch and Chat!

1. Open any webpage you want to explore or summarize.
2. Launch Bru Chat:
   - Click the **Bru Chat 🐾** icon in your browser toolbar, or
   - Press the global hotkeys:
     - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd> — Open the **Side Panel**
     - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> — Open the **Full Web UI**
3. Bru Chat will **automatically detect your local Ollama instance** at `http://localhost:11434`.
4. Ask questions, summarize the page, query specific sections, or brainstorm with zero latency!

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

Bru Chat is crafted with a modern, high-velocity frontend stack:

<p align="left">
  <img src="https://img.shields.io/badge/WXT-Next--Gen%20Extension%20Framework-6366f1?style=flat-square" alt="WXT" />
  <img src="https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Runtime-Bun%20v1.1+-fbf0df?style=flat-square&logo=bun&logoColor=black" alt="Bun" />
</p>

### Prerequisites
- [Bun](https://bun.sh/) (version 1.1 or higher)
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

### Production Build
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
- Bru Chat modifications and upgrades © Bru Chat contributors.
- Licensed under the **GNU General Public License v3.0**. You may freely study, modify, distribute, and enhance this software under the terms of GPL-3.0.

See the full license text in the [LICENCE](LICENCE) file.

---

<div align="center">

**Built with ❤️ for the open-source local AI community.**  
*If you find Bru Chat helpful, consider giving the repository a ⭐ on GitHub!*

</div>
