export default function RegisterButton({
  onRegisterClick,
}: {
  onRegisterClick: () => void
}) {
  return (
    <div className="text-center pt-10">
      <button
        type="button"
        onClick={onRegisterClick}
        className="rounded-lg bg-[#F37406] font-title px-10 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 active:scale-95"
      >
        Register Now
      </button>
    </div>
  )
}
