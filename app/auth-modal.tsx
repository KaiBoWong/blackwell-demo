"use client"

import { useState } from "react"
import { setUser, signIn, signUp } from "../store/user"
import { showToast } from "../components/toast"

export type AuthMode = "login" | "signup"

type AuthFormData = {
  firstName: string
  lastName: string
  email: string
  mobile: string
  country: string
  password: string
  confirmPassword: string
}

type AuthErrors = Partial<Record<keyof AuthFormData, string>>

type Props = {
  isOpen: boolean
  onClose: () => void
  mode: AuthMode
  onSwitchMode: () => void
  onAuthSuccess: (
    message: string,
    user?: { firstName?: string; lastName?: string }
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
  const [formData, setFormData] = useState<AuthFormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    country: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<AuthErrors>({})
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const validateSignUp = (): AuthErrors => {
    const newErrors: AuthErrors = {}
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid"
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"
    return newErrors
  }

  const validateLogin = (): AuthErrors => {
    const newErrors: AuthErrors = {}
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    return newErrors
  }

  const handleSignUp = (): Promise<User> => {
    return new Promise(async (resolve, reject) => {
      const validationErrors = validateSignUp()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        reject(new Error("Validation failed"))
        return
      }

      try {
        const userData = await signUp(formData)
        resolve(userData)
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleLogin = (): Promise<User> => {
    return new Promise(async (resolve, reject) => {
      const validationErrors = validateLogin()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        reject(new Error("Validation failed"))
        return
      }

      try {
        const userData = await signIn({
          email: formData.email,
          password: formData.password,
        })
        resolve(userData)
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleSocialAuth = (provider: "google" | "facebook"): Promise<User> => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        const userData: User = {
          firstName: provider === "google" ? "Google" : "Facebook",
          lastName: "User",
          email: `user@${provider}.com`,
          emailVerified: true,
          authProvider: provider,
        }

        setUser(userData)
        resolve(userData)
      }, 1000)
    })
  }

  const handleSubmit = async () => {
    setErrors({})
    setLoading(true)

    try {
      let user
      if (mode === "signup") {
        const newUser = await handleSignUp()
        onAuthSuccess(
          `Hi ${newUser.firstName || "User"} ${
            newUser.lastName || ""
          }, welcome to Blackwell, please verify your email immediately.`,
          newUser
        )
      } else {
        user = await handleLogin()
        const fullName = `${user.firstName || "User"} ${
          user.lastName || ""
        }`.trim()
        onAuthSuccess(
          `Login successful! Welcome to Blackwell, ${fullName}`,
          user
        )
      }
      onClose()
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        country: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Auth error:", error)
      showToast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSocialClick = async (provider: "google" | "facebook") => {
    setLoading(true)
    try {
      const userData = await handleSocialAuth(provider)
      const fullName = `${userData.firstName || "User"} ${
        userData.lastName || ""
      }`.trim()
      onAuthSuccess(
        `${
          provider === "google" ? "Google" : "Facebook"
        } login successful! Welcome, ${fullName}`,
        userData
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[95vh] overflow-y-auto rounded-2xl bg-[#3A53BA] p-6 sm:p-8 shadow-2xl ring-1 ring-[#f2df79]/20 scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {/* Glowing effect */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#F37406] via-[#f2df79] to-[#01f2f2] opacity-20 blur-xl"></div>

        <div className="relative">
          <button
            type="button"
            aria-label="Close"
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
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p
              className="text-xs sm:text-sm text-[#01f2f2]"
              style={{ fontFamily: "ATRotisSemiSans-Light, sans-serif" }}
            >
              {mode === "signup"
                ? "Sign up to get started with Blackwell"
                : "Log in to continue your journey"}
            </p>
          </div>

          {/* Social Login Buttons - Only show in login mode */}
          {mode === "login" && (
            <>
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialClick("google")}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 sm:py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
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
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialClick("facebook")}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2.5 sm:py-3 text-sm font-medium text-white transition hover:bg-[#166FE5] disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
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
                    Or continue with email
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="space-y-3 sm:space-y-4">
            {mode === "signup" && (
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="signup-first-name"
                    className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                  >
                    First Name
                  </label>
                  <input
                    id="signup-first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="signup-last-name"
                    className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                  >
                    Last Name
                  </label>
                  <input
                    id="signup-last-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="signup-mobile"
                    className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                  >
                    Mobile
                  </label>
                  <input
                    id="signup-mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-xs text-red-400">{errors.mobile}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="signup-country"
                    className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                  >
                    Country
                  </label>
                  <input
                    id="signup-country"
                    name="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.country}
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
                Email
              </label>
              <input
                type="email"
                id={`${mode}-email`}
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${mode}-password`}
                className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
              >
                Password
              </label>
              <input
                type="password"
                id={`${mode}-password`}
                name="password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {mode === "signup" && (
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-[#f2df79]"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#01f2f2]/30 bg-[#040dbf]/30 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-[#01f2f2]/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-lg bg-[#F37406] px-4 py-2.5 sm:py-3 font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
            >
              {loading
                ? "Processing..."
                : mode === "signup"
                ? "Register"
                : "Login"}
            </button>
          </div>

          <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-[#01f2f2]">
            {mode === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={onSwitchMode}
              className="font-semibold text-[#f2df79] transition hover:text-[#F37406] active:scale-95"
            >
              {mode === "signup" ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
