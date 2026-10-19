# Bru Chat 🐾

<p align="center">
  <h1 align="center">Bru Chat</h1>
  <p align="center"><b>Free, Local-First AI Web Companion</b></p>
</p>

<p align="center">
  <a href="PRIVACY.md"><img src="https://img.shields.io/badge/Privacy-100%25%20Local-success?style=for-the-badge&logo=shield" alt="100% Local Privacy" /></a>
  <a href="PRIVACY.md"><img src="https://img.shields.io/badge/Telemetry-Zero%20Tracking-blue?style=for-the-badge" alt="Zero Telemetry" /></a>
  <a href="LICENCE"><img src="https://img.shields.io/badge/License-GPL--3.0-orange?style=for-the-badge" alt="GPL-3.0 License" /></a>
  <img src="https://img.shields.io/badge/Cost-100%25%20Free%20%26%20Open-green?style=for-the-badge" alt="100% Free" />
</p>

---

## 🚀 Mission & Upstream Attribution

**Bru Chat** is an elite, 100% free, and open-source browser companion for local AI inference. It enables web browsing, page summarization, contextual querying, and sidepanel chat powered entirely by local open weights — with **zero subscriptions, zero cloud APIs, and zero tracking**.

### 📜 Attribution & GPL-3.0 Compliance
Bru Chat is forked and heavily upgraded from the remarkable [Page Assist](https://github.com/n4ze3m/page-assist) project created by [Muhammed Nazeem](https://github.com/n4ze3m). 
In compliance with the **GNU General Public License v3.0 (GPL-3.0)**, all source code remains open, freely redistributable, and dedicated to the open-source local AI community. Original copyright belongs to Muhammed Nazeem and contributors; modifications and new features are copyright the Bru Chat contributors.

---

## ⚡ Key Upgrades in Bru Chat

- 🧠 **Token-Saving Page Extractor**: Advanced Readability parsing and clean Markdown extraction that purges ads, sidebars, cookie banners, and scripts before context reaches your LLM — cutting token usage by up to 70%.
- 🎯 **Curated Open-Weight Model Presets**:
  - **Qwen 2.5 (3B / 7B / 14B)**: Precision instruction adherence and structured markdown outputs.
  - **Llama 3.2 (1B / 3B)**: Ultra-compact, low-latency prompts tailored for resource-constrained laptops and edge devices.
  - **DeepSeek-R1 Distill Models**: Native reasoning `<think>` tag visualization and methodical step-by-step chain of thought.
- ⚡ **"Fast Mode" vs. "Deep Analysis" Quick Toggle**: Instantly toggle between rapid low-temperature summaries and comprehensive multi-step reasoning from the top header bar.
- 🛡️ **Absolute Privacy Guarantee**: No analytics, no telemetry, no tracking, and no external calls. Your web pages and chat prompts never leave your device.

---

## 🏁 Quickstart Guide

Bru Chat connects seamlessly to local inference engines running on your machine:

### 1. Ollama (`localhost:11434`)

1. Install [Ollama](https://ollama.com/) on Windows, macOS, or Linux.
2. Pull your favorite open weights:
   ```bash
   # Balanced everyday assistant
   ollama run qwen2.5:7b

   # Ultra-lightweight & lightning fast
   ollama run llama3.2:3b

   # Deep reasoning model
   ollama run deepseek-r1:7b
   ```
3. Configure CORS access for browser extensions:
   - **Windows (PowerShell)**:
     ```powershell
     [System.Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
     ```
     *Restart Ollama from the system tray.*
   - **Linux / macOS**:
     ```bash
     export OLLAMA_ORIGINS="*"
     ollama serve
     ```
4. Open Bru Chat: It will automatically detect Ollama at `http://localhost:11434`!

---

### 2. LM Studio (`localhost:1234`)

1. Download [LM Studio](https://lmstudio.ai/).
2. Download any GGUF model (e.g., `Qwen2.5-7B-Instruct-GGUF`, `Llama-3.2-3B-Instruct-GGUF`, or `DeepSeek-R1-Distill-Qwen-7B-GGUF`).
3. Navigate to the **Local Server** tab (↔️ icon) in LM Studio:
   - Select your loaded model.
   - Check **Enable CORS** (Cross-Origin Resource Sharing).
   - Start the server on port `1234`.
4. In Bru Chat:
   - Open **Settings** → **OpenAI-Compatible Providers**.
   - Set URL: `http://localhost:1234/v1` (API key can be left empty or set to `lm-studio`).
   - Save and select your model from the dropdown.

---

## 🛠️ Development & Building

Bru Chat is built using [WXT](https://wxt.dev/), React, TypeScript, Tailwind CSS, and [Bun](https://bun.sh/).

### Prerequisites
- [Bun](https://bun.sh/) (v1.1+)

### Local Development
```bash
# Clone the repository
git clone https://github.com/abhay-jangid/bru-chat.git
cd bru-chat

# Install dependencies
bun install

# Run Chrome MV3 dev server with hot reloading
bun run dev

# Run Firefox dev server
bun run dev:firefox
```

### Production Build
```bash
# Build for Chrome MV3, Firefox MV2, and Edge
bun run build

# Or build target-specific bundles:
bun run build:chrome
bun run build:firefox

# Create zip archives for release
bun run zip
bun run zip:firefox
```
The output builds will be located in the `.output/` or `build/` directory ready to be unpacked into Chrome (`chrome://extensions`) or Firefox (`about:debugging`).

---

## 🔒 Privacy Commitment

Bru Chat is strictly **local-first**:
- ❌ No telemetry or tracking SDKs.
- ❌ No remote analytics or usage metrics.
- ❌ No prompt forwarding to external servers.
- ✅ All chat logs and index databases are stored locally in your browser's IndexedDB via Dexie.
- ✅ Full network transparency — inspect your browser's DevTools Network tab anytime.

---

## 📄 License

Bru Chat is licensed under the **GNU General Public License v3.0 (GPL-3.0)**. See [LICENCE](LICENCE) for details.
