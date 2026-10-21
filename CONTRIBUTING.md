# Contributing to Bru Chat 🐾

Thank you for your interest in contributing to **Bru Chat**! We welcome contributions from everyone, whether it's reporting bugs, suggesting improvements, or submitting code changes.

## Getting Started

1. **Fork the repository**

   To start contributing, fork the [Bru Chat repository](https://github.com/abhay-jangid/bru-chat) by clicking the "Fork" button at the top right of the page.

2. **Clone your forked repository**

   Once you have your own fork, clone it to your local machine:

   ```bash
   git clone https://github.com/YOUR-USERNAME/bru-chat.git
   cd bru-chat
   ```

3. **Install dependencies**

   Bru Chat uses [Bun](https://bun.sh/) (or `npm`) for package management. Install dependencies by running:

   ```bash
   bun install
   ```

4. **Start the development server**

   To run the extension in development mode with hot reloading:

   ```bash
   bun run dev
   ```

   This will open a Chromium browser window with the extension automatically loaded.

   For Firefox:

   ```bash
   bun run dev:firefox
   ```

5. **Install Ollama locally**

   Bru Chat connects to [Ollama](https://ollama.com) or LM Studio locally. Make sure you have Ollama running with CORS enabled:
   ```bash
   export OLLAMA_ORIGINS="*"
   ollama serve
   ```

## Making Changes

Once you have the project set up locally, you can start making changes. We recommend creating a new branch for your changes:

```
git checkout -b my-feature-branch
```

Make your desired changes, and don't forget to add or update tests if necessary.

## Submitting a Pull Request

1. **Commit your changes**

   Once you've made your changes, commit them with a descriptive commit message:

   ```
   git commit -m "Add a brief description of your changes"
   ```

2. **Push your changes**

   Push your changes to your forked repository:

   ```
   git push origin my-feature-branch
   ```

3. **Open a Pull Request**

   Go to the original repository on GitHub and click the "New Pull Request" button. Select your forked repository and the branch you just pushed as the source, and the main repository's `main` branch as the destination.

4. **Describe your changes**

   Provide a clear and concise description of the changes you've made, including any relevant issue numbers or other context.

5. **Review and merge**

   The maintainers of the project will review your pull request and provide feedback or merge it if everything looks good.

## Code Style and Guidelines

To ensure consistency and maintainability, we follow certain code style guidelines. Please ensure your code adheres to these guidelines before submitting a pull request.

- Use proper indentation and code formatting
- Write clear and concise comments when necessary
- Follow best practices for TypeScript and React development

## Need Help?

If you have any questions or need further assistance, feel free to open an issue or reach out to the maintainers.

Thank you for your contribution!
