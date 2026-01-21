"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  signupSchema,
  loginSchema,
  type SignupFormData,
  type LoginFormData,
} from "../schemas/auth.schema"
import { setUser, signIn, signUp } from "../store/user"
import { showToast } from "../components/toast"
import { useTranslation } from "@/hooks/useTranslation"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

export type AuthMode = "login" | "signup"

type Props = {
  isOpen: boolean
  onClose: () => void
  mode: AuthMode
  onSwitchMode: () => void
  onAuthSuccess: (
    message: string,
    user?: { firstName?: string; lastName?: string },
  ) => void
}

export type User = {
  firstName?: string
  lastName?: string
  email: string
  mobile?: string
  country?: string
  password?: string
  createdAt?: string
  lastLoginAt?: string
  emailVerified?: boolean
  authProvider?: string
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onSwitchMode,
  onAuthSuccess,
}: Props) {
  const { t } = useTranslation()
  const isSignup = mode === "signup"
  const countries = t("contact.countries", {
    returnObjects: true,
  }) as unknown as string[]

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
    reset: resetSignup,
    watch: signupWatch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      country: "",
      password: "",
      confirmPassword: "",
    },
  })

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const countryValue = signupWatch("country")
  const [loading, setLoading] = useState(false)
  const fallbackName = t("auth.genericUser")

  if (!isOpen) return null
  const isSubmitting = isSignup ? isSignupSubmitting : isLoginSubmitting
  const isBusy = loading || isSubmitting

  const handleGoogleAuth = async (): Promise<User> => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const userData: User = {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
        emailVerified: user.emailVerified,
        authProvider: "google",
      }

      setUser(userData)
      return userData
    } catch (error) {
      console.error("Social auth error:", error)
      throw error
    }
  }

  const handleSubmit = async (data: SignupFormData | LoginFormData) => {
    setLoading(true)
    try {
      if (mode === "signup") {
        const newUser = await signUp(data as SignupFormData)
        const name =
          `${newUser.firstName || fallbackName} ${newUser.lastName || ""}`.trim()
        onAuthSuccess(
          t("auth.success.signup", {
            name,
          }),
          newUser,
        )
        resetSignup()
      } else {
        const user = await signIn(data as LoginFormData)
        const fullName = `${user.firstName || fallbackName} ${
          user.lastName || ""
        }`.trim()
        onAuthSuccess(t("auth.success.login", { name: fullName }), user)
        resetLogin()
      }
      onClose()
    } catch (error) {
      console.error("Auth error:", error)
      showToast.error(
        error instanceof Error ? error.message : t("auth.error.generic"),
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSocialClick = async () => {
    setLoading(true)
    try {
      const userData = await handleGoogleAuth()
      const fullName = `${userData.firstName || fallbackName} ${
        userData.lastName || ""
      }`.trim()
      onAuthSuccess(
        t("auth.success.social", {
          provider: t("auth.google"),
          name: fullName,
        }),
        userData,
      )
      onClose()
    } catch (error) {
      console.error("Social auth error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-5 lg:px-0 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[95vh] overflow-y-auto rounded-2xl bg-[#3A53BA] p-6 sm:p-8 shadow-2xl ring-1 ring-[#f2df79]/20 scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Glowing effect */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#F37406] via-[#f2df79] to-[#01f2f2] opacity-20 blur-xl"></div>

        <div className="relative">
          <button
            type="button"
            aria-label={t("common.close")}
            onClick={onClose}
            className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#040dbf] text-[#f2df79] ring-1 ring-[#f2df79]/30 transition hover:bg-[#F37406] hover:text-white z-10"
          >
            ×
          </button>

          <div className="mb-6 sm:mb-8 text-center">
            <h2
              className="mb-2 text-2xl sm:text-3xl font-bold text-[#f2df79]"
              style={{ fontFamily: "ATRotisSemiSans-ExtraBold, sans-serif" }}
            >
              {mode === "signup"
                ? t("auth.createAccount")
                : t("auth.welcomeBack")}
            </h2>
            <p
              className="text-xs sm:text-sm text-[#01f2f2]"
              style={{ fontFamily: "ATRotisSemiSans-Light, sans-serif" }}
            >
              {mode === "signup"
                ? t("auth.signupSubtitle")
                : t("auth.loginSubtitle")}
            </p>
          </div>

          {/* Google Login for both login & signup */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSocialClick}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 sm:py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 col-span-1 sm:col-span-2"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>{t("auth.google")}</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#f2df79]/20"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span
                className="bg-[#3A53BA] px-3 sm:px-4 text-[#f2df79]"
                style={{ fontFamily: "ATRotisSemiSans-Light, sans-serif" }}
              >
                {t("auth.orEmail")}
              </span>
            </div>
          </div>

          <form
            onSubmit={
              isSignup
                ? handleSignupSubmit(handleSubmit)
                : handleLoginSubmit(handleSubmit)
            }
            className="space-y-3 sm:space-y-4"
          >
            {mode === "signup" && (
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="signup-first-name"
                    className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                  >
                    {t("auth.firstName")}
                  </label>
                  <input
                    id="signup-first-name"
                    {...signupRegister("firstName")}
                    className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                    placeholder={t("auth.placeholder.firstName")}
                  />
                  {signupErrors.firstName && (
                    <p className="mt-1 text-xs text-red-400">
                      {signupErrors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="signup-last-name"
                    className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                  >
                    {t("auth.lastName")}
                  </label>
                  <input
                    id="signup-last-name"
                    {...signupRegister("lastName")}
                    className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                    placeholder={t("auth.placeholder.lastName")}
                  />
                  {signupErrors.lastName && (
                    <p className="mt-1 text-xs text-red-400">
                      {signupErrors.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="signup-mobile"
                    className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                  >
                    {t("auth.mobile")}
                  </label>
                  <input
                    id="signup-mobile"
                    type="tel"
                    {...signupRegister("mobile")}
                    className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                    placeholder={t("auth.placeholder.mobile")}
                  />
                  {signupErrors.mobile && (
                    <p className="mt-1 text-xs text-red-400">
                      {signupErrors.mobile.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="signup-country"
                    className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                  >
                    {t("auth.country")}
                  </label>
                  <div className="relative">
                    <select
                      id="signup-country"
                      {...signupRegister("country")}
                      className="w-full appearance-none rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                      style={{
                        color: countryValue
                          ? "#ffffff"
                          : "rgba(255, 255, 255, 0.5)",
                      }}
                      defaultValue=""
                    >
                      <option value="" className="bg-[#040dbf]" disabled>
                        {t("auth.placeholder.country")}
                      </option>
                      {countries.map((country) => (
                        <option
                          key={country}
                          value={country}
                          className="bg-[#040dbf] text-white"
                        >
                          {country}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">
                      ▾
                    </span>
                  </div>
                  {signupErrors.country && (
                    <p className="mt-1 text-xs text-red-400">
                      {signupErrors.country.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor={`${mode}-email`}
                className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
              >
                {t("auth.email")}
              </label>
              <input
                type="email"
                id={`${mode}-email`}
                autoComplete="email"
                {...(isSignup
                  ? signupRegister("email")
                  : loginRegister("email"))}
                className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                placeholder={t("auth.placeholder.email")}
              />
              {(isSignup ? signupErrors.email : loginErrors.email) && (
                <p className="mt-1 text-xs text-red-400">
                  {(isSignup ? signupErrors.email : loginErrors.email)?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${mode}-password`}
                className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
              >
                {t("auth.password")}
              </label>
              <input
                type="password"
                id={`${mode}-password`}
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                {...(isSignup
                  ? signupRegister("password")
                  : loginRegister("password"))}
                className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                placeholder={t("auth.placeholder.password")}
              />
              {(isSignup ? signupErrors.password : loginErrors.password) && (
                <p className="mt-1 text-xs text-red-400">
                  {
                    (isSignup ? signupErrors.password : loginErrors.password)
                      ?.message
                  }
                </p>
              )}
            </div>

            {mode === "signup" && (
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                >
                  {t("auth.confirmPassword")}
                </label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  autoComplete="new-password"
                  {...signupRegister("confirmPassword")}
                  className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                  placeholder={t("auth.placeholder.password")}
                />
                {signupErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">
                    {signupErrors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isBusy}
              className="w-full rounded-lg bg-[#F37406] px-4 py-2.5 sm:py-3 font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
            >
              {isBusy
                ? t("auth.submit.processing")
                : mode === "signup"
                  ? t("auth.submit.signup")
                  : t("auth.submit.login")}
            </button>
          </form>

          <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-[#01f2f2]">
            {mode === "signup"
              ? t("auth.switch.haveAccount")
              : t("auth.switch.noAccount")}{" "}
            <button
              type="button"
              onClick={onSwitchMode}
              className="font-semibold text-[#f2df79] transition hover:text-[#F37406] active:scale-95"
            >
              {mode === "signup"
                ? t("auth.switch.signIn")
                : t("auth.switch.signUp")}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
