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
          className={`relative inline-flex items-center justify-center p-1.5 rounded-xl transition-all duration-200 border focus:outline-none ${
            isFast
              ? "bg-white/20 border-white/30 text-white shadow-sm"
              : "bg-white/10 border-white/20 text-neutral-300 shadow-sm"
          } ${className}`}>
          {isFast ? (
            <Zap className="size-4 text-white" />
          ) : (
            <Brain className="size-4 text-neutral-400" />
          )}
        </button>
      </Tooltip>
    )
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-xl bg-black/30 border border-white/10 backdrop-blur-md text-xs font-medium select-none ${className}`}>
      <Tooltip title="Fast Mode: Low temperature (0.2), rapid concise summaries, minimal token usage">
        <button
          type="button"
          onClick={() => toggleMode("fast")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all duration-200 focus:outline-none text-xs font-medium ${
            isFast
              ? "bg-white/20 text-white border border-white/30 shadow-sm"
              : "text-neutral-400 hover:text-white border border-transparent"
          }`}>
          <Zap className="size-3.5 fill-current" />
          <span>Fast</span>
        </button>
      </Tooltip>

      <Tooltip title="Deep Analysis: Higher temperature (0.7), thorough multi-step reasoning and deep insights">
        <button
          type="button"
          onClick={() => toggleMode("deep")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all duration-200 focus:outline-none text-xs font-medium ${
            !isFast
              ? "bg-white/20 text-white border border-white/30 shadow-sm"
              : "text-neutral-400 hover:text-white border border-transparent"
          }`}>
          <Brain className="size-3.5" />
          <span>Deep</span>
        </button>
      </Tooltip>
    </div>
  )
}
