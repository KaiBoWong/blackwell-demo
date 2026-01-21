"use client"

import toast, { Toaster, Toast } from "react-hot-toast"
import { useEffect, useState, useRef } from "react"

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "",
        duration: 4000,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
        },
        success: {
          duration: 4000,
        },
        error: {
          duration: 4000,
        },
      }}
      containerStyle={{
        top: 20,
      }}
    >
      {(t) => {
        const isSuccess = t.type === "success"
        const isError = t.type === "error"

        return <ToastContent t={t} isSuccess={isSuccess} isError={isError} />
      }}
    </Toaster>
  )
}

interface ToastContentProps {
  t: Toast
  isSuccess: boolean
  isError: boolean
}

function ToastContent({ t, isSuccess, isError }: ToastContentProps) {
  const DURATION = 4000
  const [progress, setProgress] = useState(100)
  const containerRef = useRef<HTMLDivElement>(null)

  // Animate progress bar
  useEffect(() => {
    if (!t.visible) return

    setProgress(100)
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100)
      setProgress(remaining)

      if (remaining > 0) {
        requestAnimationFrame(animate)
      } else {
        // Auto dismiss when progress completes
        toast.dismiss(t.id)
      }
    }

    const rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [t.visible, t.id])

  // Get container width for progress bar
  const containerWidth = containerRef.current?.offsetWidth || 400

  // Determine background color based on type
  const backgroundColor = isSuccess
    ? "#10b981"
    : isError
      ? "#ef4444"
      : "#0d9488"

  return (
    <div
      ref={containerRef}
      className={`
        relative
        transform transition-all duration-300 ease-out
        ${t.visible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}
        w-[92vw] sm:w-[400px] max-w-md
        rounded-xl p-5
        shadow-lg
      `}
      style={{
        backgroundColor,
      }}
    >
      {/* Content */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          {isSuccess && (
            <svg
              className="h-7 w-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          )}
          {isError && (
            <svg
              className="h-7 w-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          )}
          {!isSuccess && !isError && (
            <svg
              className="h-7 w-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          )}
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-[15px] leading-tight">
            {typeof t.message === "string" ? t.message : "Notification"}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 p-1.5 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Progress Track */}
      <div
        className="absolute left-0 right-0 bottom-0 h-1 overflow-hidden rounded-b-xl"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
      >
        {/* Progress Fill */}
        <div
          className="h-full bg-white transition-none"
          style={{
            width: `${(progress / 100) * containerWidth}px`,
          }}
        />
      </div>
    </div>
  )
}
