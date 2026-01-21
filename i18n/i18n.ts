import { I18n } from "i18n-js"
import en from "./locales/en"
import ms from "./locales/ms"
import zh from "./locales/zh"

export type Locale = "en" | "ms" | "zh"

export const supportedLocales: Locale[] = ["en", "ms", "zh"]
export const defaultLocale: Locale = "en"

const i18n = new I18n({
  en,
  zh,
  ms,
})

// 设置默认语言
i18n.defaultLocale = defaultLocale
i18n.locale = defaultLocale

// 当翻译缺失时，使用默认语言
i18n.enableFallback = true

export default i18n
