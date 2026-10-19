import React from "react"

export interface VideoBackgroundProps {
  src?: string
  poster?: string
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src = "BG.mp4",
  poster
}) => {
  const resolvedSrc = React.useMemo(() => {
    if (src.startsWith("chrome-extension://") || src.startsWith("http://") || src.startsWith("https://")) {
      return src
    }
    const cleanPath = src.replace(/^\//, "")
    if (typeof chrome !== "undefined" && chrome.runtime?.getURL) {
      return chrome.runtime.getURL(cleanPath)
    }
    return `/${cleanPath}`
  }, [src])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 overflow-hidden select-none pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="w-full h-full object-cover object-center">
        <source src={resolvedSrc} type="video/mp4" />
      </video>

      {/* Contrast Scrim / Dark Vignette */}
      <div className="absolute inset-0 bg-[#070709]/65 backdrop-blur-[2px]" />
    </div>
  )
}
