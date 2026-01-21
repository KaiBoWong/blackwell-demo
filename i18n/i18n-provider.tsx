"use client"

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react"
import i18n, { defaultLocale, type Locale } from "./i18n"

type I18nContextValue = {
  locale: Locale
  t: (key: string, options?: object) => string
  setLanguage: (lang: Locale) => void
}

export const I18nContext = createContext<I18nContextValue | undefined>(
  undefined,
)

interface I18nProviderProps {
  children: ReactNode
  initialLocale?: Locale
}

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    i18n.locale = locale
  }, [locale])

  const setLanguage = useCallback((lang: Locale) => {
    i18n.locale = lang
    setLocale(lang)
  }, [])

  const value = useMemo(
    () => ({
      locale,
      t: (key: string, options?: object) => i18n.t(key, options),
      setLanguage,
    }),
    [locale, setLanguage],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18nContext() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error("useI18nContext must be used within an I18nProvider")
  }

  return context
}
