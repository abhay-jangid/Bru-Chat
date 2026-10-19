import { cleanUrl } from "@/libs/clean-url"
import { useStorage } from "@plasmohq/storage/hook"
import { useQuery } from "@tanstack/react-query"
import { RotateCcw, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import {
  getOllamaURL,
  isOllamaRunning,
  setOllamaURL as saveOllamaURL
} from "~/services/ollama"

export const PlaygroundEmpty = () => {
  const [ollamaURL, setOllamaURL] = useState<string>("")
  const { t } = useTranslation(["playground", "common"])

  const [checkOllamaStatus] = useStorage("checkOllamaStatus", true)

  const {
    data: ollamaInfo,
    status: ollamaStatus,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ["ollamaStatus"],
    queryFn: async () => {
      const ollamaURL = await getOllamaURL()
      const isOk = await isOllamaRunning()

      if (ollamaURL) {
        saveOllamaURL(ollamaURL)
      }

      return {
        isOk,
        ollamaURL
      }
    },
    enabled: checkOllamaStatus
  })

  useEffect(() => {
    if (ollamaInfo?.ollamaURL) {
      setOllamaURL(ollamaInfo.ollamaURL)
    }
  }, [ollamaInfo])

  const isDisconnected =
    checkOllamaStatus &&
    !isRefetching &&
    ollamaStatus === "success" &&
    !ollamaInfo?.isOk

  return (
    <div className="mx-auto w-full max-w-xl px-4 flex flex-col items-center justify-center select-none">
      {/* 1. Connection Status Card (When Ollama is disconnected) */}
      {isDisconnected && (
        <div className="glass-panel w-full rounded-3xl p-6 mb-8 shadow-2xl transition-all duration-300">
          {/* Header with coral-red pulsing indicator */}
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444] shadow-[0_0_8px_#EF4444]"></span>
            </span>
            <h2 className="text-[#F4F4F5] font-semibold text-base tracking-tight">
              Ollama isn't connected
            </h2>
          </div>

          <p className="text-neutral-400 text-xs mb-4">
            Make sure Ollama is running locally, then try again.
          </p>

          {/* URL Input and Retry Button row */}
          <div className="flex items-center gap-2.5 w-full">
            <input
              className="bg-black/40 border border-white/10 focus:border-white/30 focus:outline-none text-[#F4F4F5] placeholder-neutral-500 rounded-xl px-3.5 py-2.5 text-xs flex-1 transition-all font-mono"
              type="url"
              placeholder="http://127.0.0.1:11434"
              value={ollamaURL}
              onChange={(e) => setOllamaURL(e.target.value)}
            />

            <button
              type="button"
              onClick={() => {
                saveOllamaURL(ollamaURL)
                refetch()
              }}
              className="glass-control bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shrink-0">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("common:retry", { defaultValue: "Retry" })}</span>
            </button>
          </div>

          {ollamaURL && cleanUrl(ollamaURL) !== "http://127.0.0.1:11434" && (
            <p className="text-[11px] text-neutral-400 mt-3 text-center">
              <Trans
                i18nKey="playground:ollamaState.connectionError"
                components={{
                  anchor: (
                    <a
                      href="https://github.com/abhay-jangid/bru-chat/blob/main/docs/connection-issue.md"
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-200 hover:text-white underline"
                    />
                  )
                }}
              />
            </p>
          )}
        </div>
      )}

      {/* Loading state indicator */}
      {(ollamaStatus === "pending" || isRefetching) && (
        <div className="glass-panel inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
          <p className="text-xs text-neutral-300">{t("ollamaState.searching")}</p>
        </div>
      )}

      {/* Connected indicator badge (subtle) */}
      {!isRefetching && ollamaStatus === "success" && ollamaInfo?.isOk && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
          <span className="text-[11px] font-medium text-emerald-400">
            {t("ollamaState.running", { defaultValue: "Ollama Connected" })}
          </span>
        </div>
      )}

      {/* 2. Welcome Watermark (When connected or resting) */}
      <div className="flex flex-col items-center justify-center text-center mt-2">
        {/* Sparkle divider */}
        <div className="flex items-center justify-center gap-3 w-64 mx-auto mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.15]" />
          <Sparkles className="w-4 h-4 text-neutral-300" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.15]" />
        </div>

        <h1 className="text-2xl font-semibold text-[#F4F4F5] tracking-tight">
          Your private AI workspace
        </h1>
        <p className="text-neutral-400 text-sm mt-1.5 font-normal">
          Local models. Your data. Complete privacy.
        </p>
      </div>
    </div>
  )
}
