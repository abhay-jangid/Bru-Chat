import React from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { Tooltip } from "antd"
import { Zap, Brain } from "lucide-react"
import { useStoreChatModelSettings } from "@/store/model"
import { BRU_MODEL_PRESETS } from "@/data/default-prompts"

type Props = {
  compact?: boolean
  className?: string
  onModeChange?: (mode: "fast" | "deep") => void
}

export const ExecutionModeToggle: React.FC<Props> = ({
  compact = false,
  className = "",
  onModeChange
}) => {
  const [chatMode, setChatMode] = useStorage<"fast" | "deep">(
    "bru_execution_mode",
    "fast"
  )
  const setTemperature = useStoreChatModelSettings((state) => state.setTemperature)
  const setSystemPrompt = useStoreChatModelSettings(
    (state) => state.setSystemPrompt
  )

  const toggleMode = (newMode: "fast" | "deep") => {
    setChatMode(newMode)
    if (newMode === "fast") {
      // Lower temperature for fast, factual, deterministic summaries
      setTemperature?.(0.2)
      const fastPreset = BRU_MODEL_PRESETS.find((p) => p.id === "preset-fast-mode")
      if (fastPreset) {
        setSystemPrompt?.(fastPreset.content)
      }
    } else {
      // Standard/higher temperature for rich reasoning and thorough analysis
      setTemperature?.(0.7)
      const deepPreset = BRU_MODEL_PRESETS.find((p) => p.id === "preset-deep-analysis")
      if (deepPreset) {
        setSystemPrompt?.(deepPreset.content)
      }
    }
    onModeChange?.(newMode)
  }

  const isFast = chatMode === "fast"

  if (compact) {
    return (
      <Tooltip
        title={
          isFast
            ? "Fast Mode Active (Temp 0.2 - Rapid & Concise). Click for Deep Analysis."
            : "Deep Analysis Active (Temp 0.7 - Methodical Reasoning). Click for Fast Mode."
        }>
        <button
          type="button"
          aria-label="Toggle Fast / Deep Analysis Mode"
          onClick={() => toggleMode(isFast ? "deep" : "fast")}
          className={`relative inline-flex items-center justify-center p-1.5 rounded-lg transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            isFast
              ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 focus:ring-amber-400"
              : "bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 focus:ring-indigo-400"
          } ${className}`}>
          {isFast ? (
            <Zap className="size-4 animate-pulse text-amber-500" />
          ) : (
            <Brain className="size-4 text-indigo-500" />
          )}
        </button>
      </Tooltip>
    )
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-gray-200/70 dark:bg-zinc-800/80 border border-gray-300/80 dark:border-zinc-700 backdrop-blur-sm text-xs font-medium select-none shadow-sm ${className}`}>
      <Tooltip title="Fast Mode: Low temperature (0.2), rapid concise summaries, minimal token usage">
        <button
          type="button"
          onClick={() => toggleMode("fast")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 focus:outline-none ${
            isFast
              ? "bg-amber-500 text-white shadow-sm font-semibold"
              : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
          }`}>
          <Zap className={`size-3.5 ${isFast ? "text-white" : "text-amber-500"}`} />
          <span>Fast</span>
        </button>
      </Tooltip>

      <Tooltip title="Deep Analysis: Higher temperature (0.7), thorough multi-step reasoning and deep insights">
        <button
          type="button"
          onClick={() => toggleMode("deep")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 focus:outline-none ${
            !isFast
              ? "bg-indigo-600 text-white shadow-sm font-semibold"
              : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
          }`}>
          <Brain className={`size-3.5 ${!isFast ? "text-white" : "text-indigo-400"}`} />
          <span>Deep</span>
        </button>
      </Tooltip>
    </div>
  )
}
