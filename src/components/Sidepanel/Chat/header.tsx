import logoImage from "~/assets/icon.png"
import { useMessage } from "~/hooks/useMessage"
import { Link } from "react-router-dom"
import { Tooltip, Drawer, notification } from "antd"
import {
  BoxesIcon,
  BrainCog,
  CogIcon,
  EraserIcon,
  // EraserIcon,
  HistoryIcon,
  PlusSquare,
  XIcon,
  MessageSquareShareIcon
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { CurrentChatModelSettings } from "@/components/Common/Settings/CurrentChatModelSettings"
import React from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { PromptSelect } from "@/components/Common/PromptSelect"
import { ExecutionModeToggle } from "@/components/Common/ExecutionModeToggle"
import { Sidebar } from "@/components/Option/Sidebar"
import { BsIncognito } from "react-icons/bs"
import { isFireFoxPrivateMode } from "@/utils/is-private-mode"

type SidepanelHeaderProps = {
  sidebarOpen?: boolean
  setSidebarOpen?: (open: boolean) => void
}

export const SidepanelHeader = ({
  sidebarOpen: propSidebarOpen,
  setSidebarOpen: propSetSidebarOpen
}: SidepanelHeaderProps = {}) => {
  const [hideCurrentChatModelSettings] = useStorage(
    "hideCurrentChatModelSettings",
    false
  )

  const {
    clearChat,
    isEmbedding,
    messages,
    streaming,
    selectedSystemPrompt,
    setSelectedSystemPrompt,
    setSelectedQuickPrompt,
    setMessages,
    setHistory,
    setHistoryId,
    setSelectedModel,
    historyId,
    history,
    useOCR,
    temporaryChat,
    setTemporaryChat,
    selectedModel
  } = useMessage()
  const { t } = useTranslation(["sidepanel", "common", "option"])
  const [openModelSettings, setOpenModelSettings] = React.useState(false)
  const [localSidebarOpen, setLocalSidebarOpen] = React.useState(false)
  const [webuiBtnSidePanel, setWebuiBtnSidePanel] = useStorage(
    "webuiBtnSidePanel",
    false
  )

  // Use prop state if provided, otherwise use local state
  const sidebarOpen =
    propSidebarOpen !== undefined ? propSidebarOpen : localSidebarOpen
  const setSidebarOpen = propSetSidebarOpen || setLocalSidebarOpen

  return (
    <div
      data-istemporary-chat={temporaryChat}
      className="px-3 justify-between glass-panel border-b border-white/10 py-4 items-center absolute top-0 z-10 flex h-14 w-full data-[istemporary-chat='true']:border-amber-500/40">
      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center dark:text-white">
        <img
          className="h-6 w-auto"
          src={logoImage}
          alt="Bru Chat"
        />
        <span className="ml-1.5 text-sm font-semibold tracking-tight">Bru Chat</span>
      </div>

      <div className="flex items-center space-x-1.5">
        {webuiBtnSidePanel ? (
          <Tooltip title={t("tooltip.openwebui")}>
            <button
              onClick={() => {
                const url = browser.runtime.getURL("/options.html")
                browser.tabs.create({ url })
              }}
              className="flex items-center p-1.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all duration-200">
              <MessageSquareShareIcon className="size-4" />
            </button>
          </Tooltip>
        ) : null}
        {isEmbedding ? (
          <Tooltip title={t("tooltip.embed")}>
            <BoxesIcon className="size-4 text-gray-500 dark:text-gray-400 animate-bounce animate-infinite" />
          </Tooltip>
        ) : null}

        {messages.length > 0 && !streaming && (
          <button
            title={t("option:newChat")}
            onClick={() => {
              clearChat()
            }}
            className="flex items-center p-1.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all duration-200">
            <PlusSquare className="size-4" />
          </button>
        )}

        <button
          title={t("option:temporaryChat")}
          onClick={() => {
            if (isFireFoxPrivateMode) {
              notification.error({
                message: "Error",
                description:
                  "Bru Chat can't save chat in Firefox Private Mode. Temporary chat is enabled by default. More fixes coming soon."
              })
              return
            }

            setTemporaryChat(!temporaryChat)
            if (messages.length > 0) {
              clearChat()
            }
          }}
          data-istemporary-chat={temporaryChat}
          className="flex items-center p-1.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all duration-200 data-[istemporary-chat='true']:bg-violet-500/20 data-[istemporary-chat='true']:text-violet-600 data-[istemporary-chat='true']:dark:text-violet-300">
          <BsIncognito className="size-4" />
        </button>

        {history.length > 0 && (
          <button
            title={t("tooltip.clear")}
            onClick={() => {
              setHistory([])
            }}
            className="flex items-center p-1.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all duration-200">
            <EraserIcon className="size-4" />
          </button>
        )}
        <Tooltip title={t("tooltip.history")}>
          <button
            onClick={() => {
              setSidebarOpen(true)
            }}
            className="flex items-center p-1.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all duration-200">
            <HistoryIcon className="size-4" />
          </button>
        </Tooltip>
        <PromptSelect
          selectedSystemPrompt={selectedSystemPrompt}
          setSelectedSystemPrompt={setSelectedSystemPrompt}
          setSelectedQuickPrompt={setSelectedQuickPrompt}
          iconClassName="size-4"
          className="p-1.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all duration-200"
        />
        <ExecutionModeToggle compact />
        {!hideCurrentChatModelSettings && (
          <Tooltip title={t("common:currentChatModelSettings")}>
            <button
              onClick={() => setOpenModelSettings(true)}
              className="p-1.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all duration-200">
              <BrainCog className="size-4" />
            </button>
          </Tooltip>
        )}
        <Link
          to="/settings"
          className="p-1.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all duration-200 inline-flex items-center">
          <CogIcon className="size-4" />
        </Link>
      </div>
      <CurrentChatModelSettings
        open={openModelSettings}
        setOpen={setOpenModelSettings}
        isOCREnabled={useOCR}
      />

      <Drawer
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              {t("tooltip.history")}
            </div>

            <button onClick={() => setSidebarOpen(false)}>
              <XIcon className="size-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        }
        placement="left"
        closeIcon={null}
        onClose={() => setSidebarOpen(false)}
        open={sidebarOpen}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          setMessages={setMessages}
          setHistory={setHistory}
          setHistoryId={setHistoryId}
          setSelectedModel={setSelectedModel}
          setSelectedSystemPrompt={setSelectedSystemPrompt}
          clearChat={clearChat}
          historyId={historyId}
          setSystemPrompt={(e) => {}}
          temporaryChat={false}
          history={history}
          selectedModel={selectedModel}
        />
      </Drawer>
    </div>
  )
}
