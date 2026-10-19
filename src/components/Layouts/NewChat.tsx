import { Plus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { notification, Tooltip } from "antd"
import { useMessageOption } from "@/hooks/useMessageOption"
import { BsIncognito } from "react-icons/bs"
import { isFireFoxPrivateMode } from "@/utils/is-private-mode"

type Props = {
  clearChat: () => void
}

export const NewChat: React.FC<Props> = ({ clearChat }) => {
  const { t } = useTranslation(["option", "common"])

  const { temporaryChat, setTemporaryChat, messages } = useMessageOption()

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={clearChat}
        className="inline-flex items-center gap-1.5 rounded-xl bg-white text-black hover:bg-neutral-200 active:scale-95 font-medium px-4 py-1.5 text-xs transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        <Plus className="size-3.5" />
        <span className="font-medium whitespace-nowrap">{t("newChat")}</span>
      </button>
      <Tooltip title={t("temporaryChat")}>
        <button
          data-istemporary-chat={temporaryChat}
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
          className="inline-flex items-center justify-center rounded-xl p-1.5 border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.12] text-neutral-400 hover:text-white transition-all duration-200 data-[istemporary-chat='true']:bg-white/20 data-[istemporary-chat='true']:text-white">
          <BsIncognito
            className={`size-4 ${
              temporaryChat
                ? "text-white"
                : "text-neutral-400"
            }`}
          />
        </button>
      </Tooltip>
    </div>
  )
}
