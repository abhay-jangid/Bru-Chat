import React, { useState } from "react"
import { Sidebar } from "../Option/Sidebar"
import { useTranslation } from "react-i18next"
import { CurrentChatModelSettings } from "../Common/Settings/CurrentChatModelSettings"
import { Header } from "./Header"
import { useMessageOption } from "@/hooks/useMessageOption"
import {
  useChatShortcuts,
  useSidebarShortcuts
} from "@/hooks/keyboard/useKeyboardShortcuts"
import { useQueryClient } from "@tanstack/react-query"
import { useStoreChatModelSettings } from "@/store/model"
import { useMigration } from "../../hooks/useMigration"
import { useStorage } from "@plasmohq/storage/hook"
import { VideoBackground } from "../Common/VideoBackground"

export default function OptionLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Single, clean toggle state persisted in localStorage, defaulting to false (closed)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("bru_chat_sidebar_open")
      return saved !== null ? saved === "true" : false
    } catch {
      return false
    }
  })

  const { t } = useTranslation(["option", "common", "settings"])
  const [openModelSettings, setOpenModelSettings] = useState(false)
  useMigration()
  const [sidebarPosition] = useStorage("sidebarPosition", "left")
  const {
    setMessages,
    setHistory,
    setHistoryId,
    historyId,
    clearChat,
    setSelectedModel,
    temporaryChat,
    setSelectedSystemPrompt,
    setContextFiles,
    useOCR,
    selectedModel,
    saveTemporaryChat
  } = useMessageOption()
  const queryClient = useQueryClient()
  const { setSystemPrompt } = useStoreChatModelSettings()

  const setSidebarOpen = (val: boolean | ((prev: boolean) => boolean)) => {
    setIsSidebarOpen((prev) => {
      const next = typeof val === "function" ? val(prev) : val
      try {
        localStorage.setItem("bru_chat_sidebar_open", String(next))
      } catch {}
      return next
    })
  }

  // Create toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  // Initialize shortcuts
  useChatShortcuts(clearChat, true)
  useSidebarShortcuts(toggleSidebar, true)

  return (
    <div className="flex h-screen w-full bg-[#070709] overflow-hidden relative select-none">
      {/* Ambient Looping Video Background Layer */}
      <VideoBackground src="BG.mp4" />

      {/* Unified Single Sidebar Component (Desktop & Responsive Mobile Overlay) */}
      {isSidebarOpen && (
        <>
          {/* Mobile Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed lg:relative inset-y-0 left-0 flex flex-col w-80 h-[calc(100vh-2rem)] my-4 ml-4 shrink-0 rounded-2xl glass-panel z-40 lg:z-20 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
              setMessages={setMessages}
              setHistory={setHistory}
              setHistoryId={setHistoryId}
              setSelectedModel={setSelectedModel}
              setSelectedSystemPrompt={setSelectedSystemPrompt}
              clearChat={clearChat}
              historyId={historyId}
              setSystemPrompt={setSystemPrompt}
              temporaryChat={temporaryChat}
              history={history}
              setContext={setContextFiles}
              selectedModel={selectedModel}
            />
          </aside>
        </>
      )}

      {/* Main Workspace Canvas - Expands to 100% width when sidebar is closed */}
      <main className="relative flex flex-col flex-1 h-screen overflow-hidden z-10 w-full min-w-0 transition-all duration-300">
        <div className="p-4 pb-0 w-full z-20 shrink-0">
          <Header
            setSidebarOpen={setSidebarOpen}
            setOpenModelSettings={setOpenModelSettings}
            saveTemporaryChat={saveTemporaryChat}
          />
        </div>

        <div className="flex-1 relative overflow-hidden flex flex-col">
          {children}
        </div>

        <CurrentChatModelSettings
          open={openModelSettings}
          setOpen={setOpenModelSettings}
          useDrawer
          isOCREnabled={useOCR}
        />
      </main>
    </div>
  )
}

