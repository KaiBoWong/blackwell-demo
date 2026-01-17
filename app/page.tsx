"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { clearUser, getUser, subscribe } from "../store/user"
import { AuthModal, type AuthMode } from "./auth-modal"
import { showToast } from "../components/toast"
import ContactForm from "@/components/ContactForm"
import TradingTabs from "@/components/Trading"

const palette = {
  background: "#3A53BA",
  primary: "#01f2f2",
  deepBlue: "#040dbf",
  gold: "#f2df79",
  orange: "#F37406",
}

const stats = [
  { label: "Avg. verification", value: "42s" },
  { label: "Uptime", value: "99.99%" },
  { label: "Countries live", value: "37" },
]

const features = [
  {
    title: "Adaptive trust",
    copy: "Blend SSO, passkeys, and MFA behind one decision engine so your users never see friction unless risk spikes.",
    tag: "Risk aware",
  },
  {
    title: "Policy as code",
    copy: "Ship rules with versioned blueprints. Simulate before rollout to catch edge cases without blocking revenue.",
    tag: "Predictable",
  },
  {
    title: "Fastest path in",
    copy: "Prebuilt flows for magic links, SMS, and OAuth that you can swap live without rewriting a single callback.",
    tag: "Flexible",
  },
  {
    title: "Observability",
    copy: "Deep traces on every auth hop, plus live health so incidents get contained before customers notice.",
    tag: "Transparent",
  },
  {
    title: "Privacy by default",
    copy: "Data scoped to the tenant, encrypted at rest and in flight with automated key rotation every 24 hours.",
    tag: "Secure",
  },
  {
    title: "Drop-in widgets",
    copy: "Ship polished login, consent, and recovery views that inherit your brand tokens in minutes.",
    tag: "Brand ready",
  },
]

const steps = [
  {
    title: "Shape the journey",
    body: "Define the entry, backup, and recovery options you want. We build the safest path dynamically.",
  },
  {
    title: "Plug into your stack",
    body: "SDKs for web and mobile, webhooks for everything else. OAuth, OIDC, SAML all ship together.",
  },
  {
    title: "Ship and observe",
    body: "Roll out gradually, monitor live metrics, and adjust policies without redeploying your app.",
  },
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
  const ctaHref = "#contact"
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
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
        : "User"
    clearUser()
    showToast.success(`Bye, ${name}! See you next time.`)
    setUserMenuOpen(false)
  }

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
    setUserMenuOpen(false)
  }

  const handleAuthSuccess = (
    message: string,
    user?: { firstName?: string; lastName?: string }
  ) => {
    showToast.success(message)
    setAuthModalOpen(false)
    setMenuOpen(false)
    setUserMenuOpen(false)
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden text-[var(--foreground)]"
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

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#f2df79]/30 blur-3xl" />
        <div className="absolute right-0 top-48 h-72 w-72 rounded-full bg-[#01f2f2]/25 blur-[120px]" />
        <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-[#F37406]/20 blur-[140px]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 bg-[#112A4D] backdrop-blur">
        <div className="mx-auto flex max-w-[1520px] items-center px-6 pt-5">
          <Link
            href="#top"
            className="mb-3"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
              setMenuOpen(false)
            }}
          >
            <Image
              src="/navigation/logo.png"
              alt="logo"
              width={150}
              height={34}
              priority
              className="h-auto"
            />
          </Link>

          <div className="hidden md:flex flex flex-col text-center ml-30 mb-3">
            <span className="text-[12px] font-subtitle uppercase text-white">
              Promotion
            </span>
            <span className="text-[12px] font-subtitle uppercase text-white">
              ends in
            </span>
          </div>

          <div className="hidden items-center gap-x-2 md:flex ml-30">
            <div className="flex items-center gap-2">
              {/* Days */}
              <div className="text-center">
                <div className="text-3xl font-light font-subtitle text-white mb-3 tracking-[0.1em]">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white mb-1">
                  Days
                </div>
              </div>

              <span className="text-3xl text-white mb-6 mx-2">:</span>

              {/* Hours */}
              <div className="text-center">
                <div className="text-3xl font-light font-subtitle text-white mb-3 tracking-[0.1em]">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white mb-1">
                  Hours
                </div>
              </div>

              <span className="text-3xl text-white mb-6 mx-2">:</span>

              {/* Minutes */}
              <div className="text-center">
                <div className="text-3xl font-light font-subtitle text-white mb-3 tracking-[0.1em]">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white mb-1">
                  Minutes
                </div>
              </div>

              <span className="text-3xl text-white mb-6 mx-2">:</span>

              {/* Seconds */}
              <div className="text-center">
                <div className="text-3xl font-light font-subtitle text-white mb-3 tracking-[0.1em]">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white mb-1">
                  Seconds
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <div className="hidden items-center gap-3 md:flex mb-3">
              <button
                type="button"
                className="font-subtitle rounded-full bg-[#F37406] px-4 py-3 text-xs font-semibold text-white shadow-[0_10px_40px_-20px_rgba(243,116,6,0.65)] transition-transform hover:-translate-y-0.5"
                onClick={() => {
                  setUserMenuOpen(false)
                  openAuth("signup")
                }}
              >
                REGISTER NOW
              </button>
            </div>

            <div ref={userMenuRef} className="relative hidden md:flex">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((open) => !open)}
                className="flex h-10 w-10 mb-3 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 transition hover:border-[#F37406] hover:bg-white/20 hover:scale-105"
              >
                <Image
                  src={"/navigation/avatar_white.png"}
                  alt="User avatar"
                  width={44}
                  height={44}
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
                          Account
                        </p>
                        <p className="text-xs text-[#01f2f2]/80">
                          Manage your profile
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
                          {isLoggedIn ? "Logout" : "Login"}
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
              className="relative ml-3 mb-3 flex h-11 w-11 items-center justify-center transition md:hidden"
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
          className={`border-t border-white/10 bg-[#112A4D] transition-all duration-300 md:hidden ${
            menuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-4 px-4 pb-6 pt-4">
            <button
              type="button"
              className="block w-full rounded-xl bg-[#F37406] px-4 py-3 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#e56805]"
              onClick={() => {
                openAuth("signup")
                setMenuOpen(false)
              }}
            >
              Register Now
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
              {isLoggedIn ? "Logout" : "Login"}
              <span className="text-[#F37406]">{isLoggedIn ? "↘" : "↗"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        <section
          id="#top"
          className="mx-auto flex max-w-[1520px] flex-col gap-12 px-6 pb-24 pt-8 lg:flex-row lg:items-center lg:pt-16"
        >
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#f2df79]/30 bg-[#01f2f2]/10 px-4 py-2 text-sm text-[#01f2f2] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#F37406]" />
              Adaptive access for modern teams
            </div>
            <div className="space-y-4">
              <h1 className="font-title text-4xl font-semibold leading-tight text-[#f2df79] sm:text-5xl lg:text-6xl">
                Authenticate without dragging growth.
              </h1>
              <p className="font-subtitle max-w-2xl text-lg text-[#01f2f2]">
                Blackwell keeps your users safe with risk-aware login, live
                health, and instant rollback. Design flows once and ship them
                everywhere — web, mobile, and service-to-service.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f2df79] via-[#F37406] to-[#01f2f2] px-6 py-3 text-base font-semibold text-[#040dbf] shadow-[0_18px_60px_-28px_rgba(243,116,6,0.65)] transition hover:-translate-y-0.5"
              >
                Launch a demo
                <span aria-hidden="true" className="text-lg">
                  →
                </span>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f2df79]/60 px-6 py-3 text-base font-semibold text-[#f2df79] transition hover:border-[#F37406] hover:bg-[#F37406]/15"
              >
                See how it works
              </a>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#f2df79]/30 bg-[#040dbf]/20 px-4 py-3 backdrop-blur"
                >
                  <p className="text-sm uppercase tracking-[0.16em] text-[#01f2f2]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#f2df79]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 lg:max-w-[480px]">
            <div className="relative overflow-hidden rounded-3xl border border-[#f2df79]/25 bg-[#040dbf]/20 p-6 shadow-2xl backdrop-blur">
              <div className="absolute right-6 top-6 h-12 w-12 rounded-full bg-gradient-to-br from-[#f2df79]/40 via-[#F37406]/40 to-[#01f2f2]/40 blur-2xl" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#01f2f2]">
                      Live traffic
                    </p>
                    <p className="text-xl font-semibold text-[#f2df79]">
                      Access snapshot
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#F37406]">
                    <span className="h-2 w-2 rounded-full bg-[#F37406]" />
                    Stable
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  {["Passkey", "Magic link", "SSO", "Recovery"].map(
                    (label, idx) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-[#f2df79]/25 bg-[#01f2f2]/10 px-3 py-3"
                      >
                        <p className="text-xs uppercase tracking-[0.1em] text-[#040dbf]">
                          {label}
                        </p>
                        <p className="mt-2 text-xl font-semibold text-[#f2df79]">
                          {idx === 0
                            ? "58%"
                            : idx === 1
                            ? "23%"
                            : idx === 2
                            ? "14%"
                            : "5%"}
                        </p>
                        <p className="text-xs text-[#040dbf]">
                          Share of logins
                        </p>
                      </div>
                    )
                  )}
                </div>

                <div className="rounded-2xl border border-[#f2df79]/25 bg-[#040dbf]/20 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#f2df79]">
                      Decision engine
                    </p>
                    <span className="rounded-full bg-[#01f2f2]/20 px-2 py-1 text-xs font-semibold text-[#01f2f2]">
                      Risk normal
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-[#01f2f2]">
                    <div className="flex items-center justify-between">
                      <span>Bot shield</span>
                      <span className="text-[#f2df79]">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Device trust</span>
                      <span className="text-[#F37406]">Reviewing</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Location insight</span>
                      <span className="text-[#f2df79]">Clear</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#f2df79]/35 bg-gradient-to-r from-[#f2df79]/20 via-[#F37406]/15 to-[#01f2f2]/15 p-4 text-sm text-[#f2df79]">
                  <p className="font-semibold">Zero downtime upgrades</p>
                  <p className="mt-1 text-[#01f2f2]">
                    Swap auth patterns live. If conversion dips, one-click
                    rollback restores the previous flow instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-20">
          <div className="mx-auto flex max-w-[1520px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="font-subtitle text-xs uppercase tracking-[0.28em] text-[#01f2f2]">
                What ships with Blackwell
              </p>
              <h2 className="font-title text-3xl font-semibold text-[#f2df79] sm:text-4xl">
                Everything you need to sign in without slowing down.
              </h2>
            </div>
            <p className="font-subtitle max-w-xl text-base text-[#01f2f2]">
              Configure flows, observability, and policies from one place. Every
              part is built to scale with your compliance and uptime standards.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1520px] gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-[#f2df79]/25 bg-[#040dbf]/25 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-[#F37406]/50"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#f2df79]/25 via-[#F37406]/25 to-[#01f2f2]/25 blur-3xl transition duration-300 group-hover:scale-125" />
                <div className="relative flex items-center gap-3">
                  <span className="rounded-full bg-[#01f2f2]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f2df79]">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="relative mt-4 text-xl font-semibold text-[#f2df79]">
                  {feature.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-[#01f2f2]">
                  {feature.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="flow"
          className="mx-auto max-w-[1520px] px-6 py-20 lg:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="font-subtitle text-xs uppercase tracking-[0.28em] text-[#01f2f2]">
                End-to-end control
              </p>
              <h2 className="font-title text-3xl font-semibold text-[#f2df79] sm:text-4xl">
                Design your flow once. We keep it stable everywhere.
              </h2>
              <p className="font-subtitle text-base text-[#01f2f2]">
                Blackwell connects your identity layer, risk signals, and
                observability so you can focus on building features. No more
                juggling vendors for each touchpoint.
              </p>
            </div>
            <div className="rounded-3xl border border-[#f2df79]/25 bg-[#040dbf]/20 p-6 backdrop-blur">
              <div className="flex flex-col gap-4">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-[#f2df79]/25 bg-[#040dbf]/30 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f2df79]/25 via-[#F37406]/25 to-[#01f2f2]/25 text-base font-semibold text-[#040dbf]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#f2df79]">
                        {step.title}
                      </p>
                      <p className="text-sm text-[#01f2f2]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-16">
          <div className="mx-auto max-w-[1520px] py-16">
            <div className="text-center mt-6 mb-14">
              <h2 className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl">
                Navigate Our App in 5 Clicks
              </h2>
            </div>

            <TradingTabs />

            <div className="flex justify-center gap-3 mt-10">
              <div className="h-12 flex items-center overflow-hidden">
                <Image
                  src="/playstore/google-play.jpg"
                  alt="Google Play"
                  width={393}
                  height={118}
                  className="h-full w-auto object-contain rounded-xl"
                />
              </div>

              <div className="h-12 flex items-center overflow-hidden">
                <Image
                  src="/playstore/app-store.jpg"
                  alt="App Store"
                  width={393}
                  height={118}
                  className="h-full w-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative w-screen bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: "url(/background/bg-3.png)",
          }}
        >
          {/* 内容容器 */}
          <ContactForm />
        </section>
      </main>

      <footer className="border-t border-[#f2df79]/25 bg-[#3A53BA]/90 px-6 py-4 text-sm text-[#01f2f2] backdrop-blur">
        <div className="mx-auto flex max-w-[1520px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-subtitle">
            Blackwell Auth © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="transition hover:text-[#F37406]"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              Back to top
            </a>
            <a href="#features" className="transition hover:text-[#F37406]">
              Product
            </a>
            <a
              href="mailto:team@blackwell.dev"
              className="transition hover:text-[#F37406]"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Back to top"
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
