import { useStorage } from "@plasmohq/storage/hook"
import {
  BrainCog,
  ChevronLeft,
  ChevronRight,
  CogIcon,
  ComputerIcon,
  GithubIcon,
  PanelLeftIcon,
  SaveIcon,
  Sparkles,
  ZapIcon
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useLocation, NavLink } from "react-router-dom"
import { SelectedKnowledge } from "../Option/Knowledge/SelectedKnowledge"
import { ModelSelect } from "../Common/ModelSelect"
import { PromptSelect } from "../Common/PromptSelect"
import { ExecutionModeToggle } from "../Common/ExecutionModeToggle"
import { useQuery } from "@tanstack/react-query"
import { fetchChatModels } from "~/services/ollama"
import { useMessageOption } from "~/hooks/useMessageOption"
import { Avatar, Select, Tooltip } from "antd"
import { getAllPrompts } from "@/db/dexie/helpers"
import { ProviderIcons } from "../Common/ProviderIcon"
import { NewChat } from "./NewChat"
import { MoreOptions } from "./MoreOptions"
import { useUiDirection } from "~/hooks/useUiDirection"

type Props = {
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  setOpenModelSettings: (open: boolean) => void
  saveTemporaryChat?: () => Promise<string>
}

export const Header: React.FC<Props> = ({
  setOpenModelSettings,
  setSidebarOpen,
  saveTemporaryChat
}) => {
  const { t } = useTranslation(["option", "common"])
  const { isRTL } = useUiDirection()

  const [shareModeEnabled] = useStorage("shareMode", false)
  const [hideCurrentChatModelSettings] = useStorage(
    "hideCurrentChatModelSettings",
    false
  )
  const {
    selectedModel,
    setSelectedModel,
    clearChat,
    selectedSystemPrompt,
    setSelectedQuickPrompt,
    setSelectedSystemPrompt,
    messages,
    streaming,
    historyId,
    temporaryChat
  } = useMessageOption()
  const {
    data: models,
    isLoading: isModelsLoading,
    refetch
  } = useQuery({
    queryKey: ["fetchModel"],
    queryFn: () => fetchChatModels({ returnEmpty: true }),
    refetchIntervalInBackground: false,
    staleTime: 1000 * 60 * 1
  })

  const { data: prompts, isLoading: isPromptLoading } = useQuery({
    queryKey: ["fetchAllPromptsLayout"],
    queryFn: getAllPrompts
  })

  const { pathname } = useLocation()

  const getPromptInfoById = (id: string) => {
    return prompts?.find((prompt) => prompt.id === id)
  }

  const handlePromptChange = (value?: string) => {
    if (!value) {
      setSelectedSystemPrompt(undefined)
      setSelectedQuickPrompt(undefined)
      return
    }
    const prompt = getPromptInfoById(value)
    if (prompt?.is_system) {
      setSelectedSystemPrompt(prompt.id)
    } else {
      setSelectedSystemPrompt(undefined)
      setSelectedQuickPrompt(prompt!.content)
    }
  }

  return (
    <header
      data-istemporary-chat={temporaryChat}
      className="glass-panel rounded-2xl mx-4 mt-3 px-4 py-2.5 flex items-center justify-between gap-3 transition-all duration-300">
      {/* Left Section: Brand Logo, Wordmark, Divider, New Chat */}
      <div className="flex items-center gap-3 shrink-0">
        {pathname !== "/" && (
          <NavLink
            to="/"
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] transition-all inline-flex items-center">
            {isRTL ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </NavLink>
        )}

        <button
          type="button"
          aria-label="Toggle Sidebar"
          className="p-1.5 rounded-xl text-neutral-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] transition-all inline-flex items-center"
          onClick={() => setSidebarOpen((prev) => !prev)}>
          <PanelLeftIcon className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-sm">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zM8 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </div>
          <span className="font-semibold text-base text-[#F4F4F5] tracking-tight hidden sm:inline-block">
            Bru Chat
          </span>
        </div>

        <div className="h-5 w-px bg-white/[0.15] hidden sm:block" />

        <NewChat clearChat={clearChat} />
      </div>

      {/* Center Section: Model Select, Prompt Select, Fast/Deep Toggle */}
      <div className="hidden md:flex items-center gap-2.5 shrink-0">
        <div className="hidden lg:block">
          <Select
            className="header-glass-select min-w-[190px] max-w-[260px]"
            placeholder={t("common:selectAModel")}
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e)
              localStorage.setItem("selectedModel", e)
            }}
            filterOption={(input, option) => {
              //@ts-ignore
              return (
                option?.label?.props["data-title"]
                  ?.toLowerCase()
                  ?.indexOf(input.toLowerCase()) >= 0
              )
            }}
            showSearch
            loading={isModelsLoading}
            options={models?.map((model) => ({
              label: (
                <span
                  key={model.model}
                  data-title={model.name}
                  className="flex flex-row gap-2.5 items-center text-sm font-medium">
                  {model?.avatar ? (
                    <Avatar src={model.avatar} alt={model.name} size="small" />
                  ) : (
                    <ProviderIcons
                      provider={model?.provider}
                      className="w-4 h-4 text-neutral-400"
                    />
                  )}
                  <span className="truncate">
                    {model?.nickname || model.model}
                  </span>
                </span>
              ),
              value: model.model
            }))}
            size="middle"
          />
        </div>
        <div className="lg:hidden">
          <ModelSelect />
        </div>

        <div className="hidden xl:block">
          <Select
            size="middle"
            loading={isPromptLoading}
            showSearch
            placeholder={
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
                <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                {t("selectAPrompt")}
              </span>
            }
            className="header-glass-select w-44"
            allowClear
            onChange={handlePromptChange}
            value={selectedSystemPrompt}
            filterOption={(input, option) =>
              //@ts-ignore
              option.label.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            options={prompts?.map((prompt) => ({
              label: (
                <span
                  key={prompt.title}
                  className="flex flex-row gap-2 items-center text-xs">
                  {prompt.is_system ? (
                    <ComputerIcon className="w-3.5 h-3.5 text-neutral-400" />
                  ) : (
                    <ZapIcon className="w-3.5 h-3.5 text-neutral-300" />
                  )}
                  <span className="truncate">{prompt.title}</span>
                </span>
              ),
              value: prompt.id
            }))}
          />
        </div>
        <div className="xl:hidden">
          <PromptSelect
            selectedSystemPrompt={selectedSystemPrompt}
            setSelectedSystemPrompt={setSelectedSystemPrompt}
            setSelectedQuickPrompt={setSelectedQuickPrompt}
          />
        </div>

        <SelectedKnowledge />
        <ExecutionModeToggle />
      </div>

      {/* Right Section: Utilities (Settings, GitHub) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {temporaryChat && messages.length > 0 && !streaming && (
          <Tooltip title={t("common:saveChat")}>
            <button
              onClick={saveTemporaryChat}
              className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] transition-all">
              <SaveIcon className="w-4 h-4" />
            </button>
          </Tooltip>
        )}

        {messages.length > 0 && !streaming && (
          <MoreOptions
            shareModeEnabled={shareModeEnabled}
            historyId={historyId}
            messages={messages}
          />
        )}

        {!hideCurrentChatModelSettings && (
          <Tooltip title={t("common:currentChatModelSettings")}>
            <button
              onClick={() => setOpenModelSettings(true)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] transition-all">
              <BrainCog className="w-4 h-4" />
            </button>
          </Tooltip>
        )}

        {/* Settings */}
        <Tooltip title={t("settings")}>
          <NavLink
            to="/settings"
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] transition-all inline-flex items-center">
            <CogIcon className="w-4 h-4" />
          </NavLink>
        </Tooltip>

        {/* GitHub link - Strictly https://github.com/abhay-jangid/bru-chat */}
        <Tooltip title="Bru Chat GitHub">
          <a
            href="https://github.com/abhay-jangid/bru-chat"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] transition-all inline-flex items-center"
            title="Bru Chat GitHub Repository">
            <GithubIcon className="w-4 h-4" />
          </a>
        </Tooltip>
      </div>
    </header>
  )
}

