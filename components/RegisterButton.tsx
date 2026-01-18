import { AuthModal, type AuthMode } from "@/app/auth-modal"
import { useState } from "react"
import { showToast } from "@/components/toast"

export default function RegisterButton() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("login")

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
    <>
      {/* AuthModal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() =>
          setAuthMode(authMode === "login" ? "signup" : "login")
        }
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Submit Button */}
      <div className="text-center mt-10">
        <button
          type="button"
          onClick={() => {
            setUserMenuOpen(false)
            openAuth("signup")
          }}
          className="rounded-full bg-[#F37406] font-title px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 active:scale-95"
        >
          Register Now
        </button>
      </div>
    </>
  )
}
