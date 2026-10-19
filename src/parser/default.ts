import Defuddle, { createMarkdownContent } from "defuddle/full"

/**
 * Remove noisy DOM elements (ads, sidebars, cookie banners, navigation, scripts)
 * before extracting readable article content.
 */
function stripClutterFromDOM(doc: Document): void {
  // 1. Technical clutter & non-content tags
  const technicalSelectors = [
    "script",
    "style",
    "noscript",
    "link",
    "svg",
    "canvas",
    "iframe",
    "frame",
    "object",
    "embed",
    "audio",
    "video",
    "map",
    "track",
    "applet",
    "template"
  ]

  // 2. Navigation chrome, headers, footers, sidebars
  const navigationSelectors = [
    "nav",
    "footer",
    "aside",
    "header:not(article header)",
    "[role='navigation']",
    "[role='banner']",
    "[role='contentinfo']",
    "[role='complementary']",
    "[class*='sidebar']",
    "[id*='sidebar']",
    "[class*='navbar']",
    "[id*='navbar']",
    "[class*='menu']",
    "[id*='menu']",
    "[class*='breadcrumb']",
    "[id*='breadcrumb']",
    "[class*='pagination']"
  ]

  // 3. Ads, tracking, sponsors, popups, cookie consent
  const adAndModalSelectors = [
    "[class*='ad-']",
    "[class*='ads-']",
    "[class*='advert']",
    "[id*='ad-']",
    "[id*='ads-']",
    "[id*='advert']",
    "[class*='sponsor']",
    "[id*='sponsor']",
    "[data-ad]",
    "[data-ad-slot]",
    "[class*='cookie']",
    "[id*='cookie']",
    "[class*='consent']",
    "[id*='consent']",
    "[class*='gdpr']",
    "[id*='gdpr']",
    "[class*='modal']",
    "[id*='modal']",
    "[class*='popup']",
    "[id*='popup']",
    "dialog",
    "[role='alertdialog']",
    "[class*='newsletter']",
    "[id*='newsletter']",
    "[class*='subscribe']",
    "[id*='subscribe']",
    "[class*='promo']",
    "[id*='promo']",
    "[class*='social']",
    "[id*='social']",
    "[class*='share']",
    "[id*='share']",
    "[class*='related-']",
    "[id*='related-']",
    "[class*='recommended']",
    "[id*='recommended']",
    "[class*='comments']",
    "[id*='comments']"
  ]

  // 4. Hidden & invisible elements
  const hiddenSelectors = [
    "[aria-hidden='true']",
    "[hidden]",
    "[style*='display: none']",
    "[style*='display:none']",
    "[style*='visibility: hidden']"
  ]

  const allSelectors = [
    ...technicalSelectors,
    ...navigationSelectors,
    ...adAndModalSelectors,
    ...hiddenSelectors
  ].join(", ")

  doc.querySelectorAll(allSelectors).forEach((el) => {
    try {
      el.remove()
    } catch {
      // Ignore if already removed
    }
  })

  // Strip massive base64 images to prevent bloat
  doc.querySelectorAll("img[src^='data:']").forEach((img) => img.remove())
}

/**
 * Clean and compress markdown to keep token usage minimal on local LLMs.
 */
function cleanMarkdownTokens(markdown: string): string {
  if (!markdown) return ""

  return (
    markdown
      // Strip markdown image syntax: ![alt](url) -> ""
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // Strip empty or whitespace-only links [   ](...) -> ""
      .replace(/\[\s*\]\([^)]*\)/g, "")
      // Simplify redundant links with huge tracking parameters: [Text](url?utm_...) -> [Text](url)
      .replace(/\[(.*?)\]\((https?:\/\/[^\s?#]+)\?[^)]*\)/g, "[$1]($2)")
      // Remove zero-width spaces and invisible unicode characters
      .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
      // Collapse excessive horizontal rules (--- or ***)
      .replace(/(\n\s*[-*_]{3,}\s*){2,}/g, "\n\n---\n\n")
      // Remove trailing whitespace from each line
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      // Collapse 3 or more newlines into double newlines
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  )
}

export const defaultExtractContent = (html: string, url: string = "") => {
  if (!html) return ""

  // Attempt 1: Pre-clean DOM and run Defuddle readability parser
  try {
    const doc = new DOMParser().parseFromString(html, "text/html")
    stripClutterFromDOM(doc)

    const result = new Defuddle(doc as unknown as Document, { url }).parse()

    if (result?.content && result.content.trim().length > 0) {
      const markdown = createMarkdownContent(result.content, url)
      const cleanTokens = cleanMarkdownTokens(markdown)
      if (cleanTokens.length > 50) {
        return cleanTokens
      }
    }
  } catch (error) {
    console.warn(
      "[defaultExtractContent] Cleaned Defuddle extraction failed, falling back:",
      error
    )
  }

  // Attempt 2: Direct semantic article container fallback
  try {
    const doc = new DOMParser().parseFromString(html, "text/html")
    stripClutterFromDOM(doc)

    const candidate =
      doc.querySelector("article") ||
      doc.querySelector("[itemprop='articleBody']") ||
      doc.querySelector("main") ||
      doc.querySelector("[role='main']") ||
      doc.querySelector("#content") ||
      doc.querySelector(".post-content") ||
      doc.querySelector(".entry-content") ||
      doc.querySelector(".article-content") ||
      doc.body

    const extractedHtml = candidate?.innerHTML || html
    const markdown = createMarkdownContent(extractedHtml, url)
    return cleanMarkdownTokens(markdown)
  } catch (error) {
    console.warn(
      "[defaultExtractContent] Fallback markdown conversion failed:",
      error
    )
    return ""
  }
}
