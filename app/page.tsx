"use client"

import Link from "next/link"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { clearUser, getUser, subscribe } from "../store/user"
import { AuthModal, type AuthMode } from "./auth-modal"
import { showToast } from "../components/toast"
import ContactForm from "@/app/ContactForm"
import TradingTabs from "@/app/Trading"
import Choose from "@/app/Choose"
import LinkAccount from "@/app/LinkAccount"
import TradLikePro from "@/app/TradeLikePro"
import Analysis from "@/app/Analysis"
import Matching from "@/app/Matching"
import HeroSection from "@/app/Top"
import RegisterButton from "@/components/RegisterButton"
import { useTranslation } from "@/hooks/useTranslation"
import type { Locale } from "@/i18n/i18n"

const palette = {
  background: "#3A53BA",
  primary: "#01f2f2",
  deepBlue: "#040dbf",
  gold: "#f2df79",
  orange: "#F37406",
}

const languageOptions: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ms", label: "MS" },
  { code: "zh", label: "中文" },
]

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 text-white"
      role="presentation"
    >
      {open ? (
        <path
          d="M6 6l12 12M6 18L18 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 27,
    hours: 23,
    minutes: 45,
    seconds: 7,
  })
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const { t, setLanguage, locale } = useTranslation()
  const currentUser = useSyncExternalStore(subscribe, getUser, getUser)
  const isLoggedIn = Boolean(currentUser)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 240)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        event.target instanceof Node &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickAway)
    return () => document.removeEventListener("mousedown", handleClickAway)
  }, [])

  const handleLogout = () => {
    const name =
      currentUser && "firstName" in currentUser && currentUser.firstName
        ? currentUser.firstName
        : t("auth.genericUser")
    clearUser()
    showToast.success(t("auth.success.logout", { name }))
    setUserMenuOpen(false)
  }

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
    setUserMenuOpen(false)
  }

  const handleAuthSuccess = (
    message: string,
    user?: { firstName?: string; lastName?: string },
  ) => {
    showToast.success(message)
    setAuthModalOpen(false)
    setMenuOpen(false)
    setUserMenuOpen(false)
  }

  return (
    <div
      className="min-h-screen overflow-hidden text-[var(--foreground)] flex flex-col"
      style={{ backgroundColor: palette.background, color: palette.primary }}
    >
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() =>
          setAuthMode(authMode === "login" ? "signup" : "login")
        }
        onAuthSuccess={handleAuthSuccess}
      />

      <header className="fixed inset-x-0 top-0 z-50 bg-[#112A4D] backdrop-blur px-5 lg:px-20">
        <div className="mx-auto flex max-w-[1520px] items-center pt-5">
          <Link
            href="#top"
            className="mb-3"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
              setMenuOpen(false)
            }}
          >
            <img
              src="/images/navigation/logo.png"
              alt="logo"
              className="h-auto w-[150px] h-[34px]"
            />
          </Link>

          <div className="hidden lg:flex flex flex-col text-center xl:ml-30 lg:ml-4 mb-3">
            <span className="text-[12px] font-subtitle uppercase text-white">
              {t("header.promotion")}
            </span>
            <span className="text-[12px] font-subtitle uppercase text-white">
              {t("header.endsIn")}
            </span>
          </div>

          <div className="hidden items-center gap-x-2 lg:flex xl:ml-30 lg:ml-4">
            <div className="flex items-center gap-2">
              {/* Days */}
              <div className="text-center">
                <div className="text-3xl font-light font-subtitle text-white mb-3 tracking-[0.1em]">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white mb-1">
                  {t("header.days")}
                </div>
              </div>

              <span className="text-3xl text-white mb-6 mx-2">:</span>

              {/* Hours */}
              <div className="text-center">
                <div className="text-3xl font-light font-subtitle text-white mb-3 tracking-[0.1em]">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white mb-1">
                  {t("header.hours")}
                </div>
              </div>

              <span className="text-3xl text-white mb-6 mx-2">:</span>

              {/* Minutes */}
              <div className="text-center">
                <div className="text-3xl font-light font-subtitle text-white mb-3 tracking-[0.1em]">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white mb-1">
                  {t("header.minutes")}
                </div>
              </div>

              <span className="text-3xl text-white mb-6 mx-2">:</span>

              {/* Seconds */}
              <div className="text-center">
                <div className="text-3xl font-light font-subtitle text-white mb-3 tracking-[0.1em]">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white mb-1">
                  {t("header.seconds")}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <select
              value={locale}
              onChange={(event) => setLanguage(event.target.value as Locale)}
              className="rounded-lg mb-3 border border-white/20 bg-white/10 px-1 lg:px-3 py-2 ml-4 lg:ml-0 text-xs font-semibold text-white outline-none transition hover:border-[#F37406] hover:bg-white/20"
            >
              {languageOptions.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  className="bg-[#1a2f52] text-white"
                >
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="hidden items-center gap-3 lg:flex mb-3">
              <button
                type="button"
                className="font-subtitle rounded-full bg-[#F37406] px-4 py-3 text-xs font-semibold text-white shadow-[0_10px_40px_-20px_rgba(243,116,6,0.65)] transition-transform hover:-translate-y-0.5"
                onClick={() => {
                  setUserMenuOpen(false)
                  openAuth("signup")
                }}
              >
                {t("header.registerCta")}
              </button>
            </div>

            <div ref={userMenuRef} className="relative hidden lg:flex">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((open) => !open)}
                className="flex h-10 w-10 mb-3 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 transition hover:border-[#F37406] hover:bg-white/20 hover:scale-105"
              >
                <img
                  src={"/images/navigation/avatar_white.png"}
                  alt="User avatar"
                  className="h-8 w-8 object-cover"
                />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-10 w-52 rounded-2xl border border-[#f2df79]/30 bg-[#1a2f52]/95 shadow-[0_20px_60px_-15px_rgba(243,116,6,0.5)] backdrop-blur-xl">
                  <div className="p-2">
                    <div className="mb-2 flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#01f2f2]/10 to-[#F37406]/10 px-3 py-3 border border-[#f2df79]/20">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#F37406] via-[#f2df79] to-[#01f2f2] p-0.5">
                        <div className="h-full w-full rounded-full bg-[#1a2f52] flex items-center justify-center">
                          <svg
                            className="h-5 w-5 text-[#f2df79]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#f2df79]">
                          {t("header.account")}
                        </p>
                        <p className="text-xs text-[#01f2f2]/80">
                          {t("header.manageProfile")}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (isLoggedIn) {
                          handleLogout()
                        } else {
                          openAuth("login")
                        }
                      }}
                      className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-gradient-to-r hover:from-[#F37406]/30 hover:to-[#01f2f2]/20 hover:shadow-lg hover:border hover:border-[#f2df79]/30"
                    >
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-[#01f2f2] group-hover:text-[#f2df79] transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {isLoggedIn ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          )}
                        </svg>
                        <span className="text-[#f2df79]">
                          {isLoggedIn ? t("common.logout") : t("common.login")}
                        </span>
                      </span>
                      <span className="text-[#F37406] group-hover:translate-x-1 group-hover:scale-110 transition-all">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="relative ml-3 mb-3 flex h-11 w-11 items-center justify-center transition lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => {
                setMenuOpen((open) => !open)
                setUserMenuOpen(false)
              }}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`border-t border-white/10 bg-[#112A4D] transition-all duration-300 lg:hidden ${
            menuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-4 px-4 pb-6 pt-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-white">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white">
                {t("header.promoEnds")}
              </p>
              <div className="mt-2 flex items-end justify-center gap-2 font-subtitle">
                <div className="text-center">
                  <div className="text-2xl font-light">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-white/80">
                    {t("header.days")}
                  </div>
                </div>
                <span className="text-xl text-white pb-3">:</span>
                <div className="text-center">
                  <div className="text-2xl font-light">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-white/80">
                    {t("header.hours")}
                  </div>
                </div>
                <span className="text-xl text-white pb-3">:</span>
                <div className="text-center">
                  <div className="text-2xl font-light">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-white/80">
                    {t("header.minutes")}
                  </div>
                </div>
                <span className="text-xl text-white pb-3">:</span>
                <div className="text-center">
                  <div className="text-2xl font-light">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-white/80">
                    {t("header.seconds")}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="block w-full rounded-xl bg-[#F37406] px-4 py-3 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#e56805]"
              onClick={() => {
                openAuth("signup")
                setMenuOpen(false)
              }}
            >
              {t("common.registerNow")}
            </button>
            <button
              type="button"
              onClick={() => {
                if (isLoggedIn) {
                  handleLogout()
                } else {
                  openAuth("login")
                }
                setMenuOpen(false)
              }}
              className="flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {isLoggedIn ? t("common.logout") : t("common.login")}
              <span className="text-[#F37406]">{isLoggedIn ? "↘" : "↗"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20 flex-1">
        <section>
          <HeroSection onRegisterClick={() => openAuth("signup")} />
        </section>

        <section>
          <Matching />
        </section>

        <section>
          <Analysis />
        </section>

        <section className="relative w-full bg-[url('/images/background/bg-1.png')] bg-contain bg-top bg-no-repeat">
          <TradLikePro />
        </section>

        <section className="pb-24">
          <LinkAccount />
          <RegisterButton onRegisterClick={() => openAuth("signup")} />
        </section>

        <section className="relative w-full bg-[url('/images/background/bg-2.png')] bg-contain bg-top bg-no-repeat pb-10 lg:pb-30 ">
          <Choose />
          <RegisterButton onRegisterClick={() => openAuth("signup")} />
        </section>

        <section>
          <TradingTabs />
        </section>

        <section className="relative w-full bg-[url('/images/background/bg-3.png')] bg-cover bg-top bg-no-repeat">
          <ContactForm />
        </section>
      </main>

      <footer className="mt-auto border-t border-[#f2df79]/25 bg-[#112A4D] px-6 py-10 text-sm text-[#01f2f2] backdrop-blur">
        <div className="mx-auto flex max-w-[1520px] flex-col gap-8">
          {/* Mobile View */}
          <div className="flex flex-col lg:hidden gap-6">
            {/* 标题 + 描述 */}
            <div className="space-y-2">
              <h3 className="text-xl font-title font-bold text-white">
                {t("footer.title")}
              </h3>
              <p className="text-white/70 text-sm">{t("footer.description")}</p>
            </div>

            {/* 链接导航 - 垂直显示 */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#matching"
                className="text-white/80 text-sm transition hover:text-[#F37406]"
              >
                {t("nav.matching")}
              </a>
              <a
                href="#analysis"
                className="text-white/80 text-sm transition hover:text-[#F37406]"
              >
                {t("nav.analysis")}
              </a>
              <a
                href="#tradelikepro"
                className="text-white/80 text-sm transition hover:text-[#F37406]"
              >
                {t("nav.quickStart")}
              </a>
              <a
                href="#link"
                className="text-white/80 text-sm transition hover:text-[#F37406]"
              >
                {t("nav.link")}
              </a>
              <a
                href="#choose"
                className="text-white/80 text-sm transition hover:text-[#F37406]"
              >
                {t("nav.choose")}
              </a>
              <a
                href="#trading"
                className="text-white/80 text-sm transition hover:text-[#F37406]"
              >
                {t("nav.trading")}
              </a>
              <a
                href="#enquire"
                className="text-white/80 text-sm transition hover:text-[#F37406]"
              >
                {t("nav.enquire")}
              </a>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="space-y-3">
              <h3 className="text-2xl font-title font-bold text-white">
                {t("footer.title")}
              </h3>
              <p className="text-white/70 max-w-lg">
                {t("footer.description")}
              </p>
            </div>
            <div className="flex items-center gap-6 text-white/80">
              <a href="#matching" className="transition hover:text-[#F37406]">
                {t("nav.matching")}
              </a>
              <a href="#analysis" className="transition hover:text-[#F37406]">
                {t("nav.analysis")}
              </a>
              <a
                href="#tradelikepro"
                className="transition hover:text-[#F37406]"
              >
                {t("nav.quickStart")}
              </a>
              <a href="#link" className="transition hover:text-[#F37406]">
                {t("nav.link")}
              </a>
              <a href="#choose" className="transition hover:text-[#F37406]">
                {t("nav.choose")}
              </a>
              <a href="#trading" className="transition hover:text-[#F37406]">
                {t("nav.trading")}
              </a>
              <a href="#enquire" className="transition hover:text-[#F37406]">
                {t("nav.enquire")}
              </a>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#f2df79]/25 to-transparent" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/60 font-subtitle">
              © {new Date().getFullYear()} Blackwell Auth. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/60">
              <a href="#privacy" className="hover:text-[#01f2f2] transition">
                {t("footer.privacy")}
              </a>
              <a href="#terms" className="hover:text-[#01f2f2] transition">
                {t("footer.terms")}
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="group inline-flex items-center gap-2 hover:text-[#FFD700] transition"
              >
                <span>{t("common.backToTop")}</span>
                <span className="transform group-hover:-translate-y-1 transition-transform">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label={t("common.backToTop")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-br from-[#f2df79] via-[#F37406] to-[#01f2f2] p-3 text-[#040dbf] shadow-[0_18px_60px_-28px_rgba(243,116,6,0.65)] transition-all duration-300 hover:scale-105 ${
          showBackToTop
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-4"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          role="presentation"
          aria-hidden="true"
        >
          <path
            d="M12 5l7 7m-7-7l-7 7m7-7v14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
