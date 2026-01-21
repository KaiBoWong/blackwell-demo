import { useI18nContext } from "@/i18n/i18n-provider"

export const useTranslation = () => {
  return useI18nContext()
}
