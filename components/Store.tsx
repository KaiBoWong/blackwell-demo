export default function PlayStore() {
  return (
    <div className="flex justify-center gap-3 mt-10">
      <div className="h-12 flex items-center overflow-hidden">
        <img
          src="/images/playstore/google-play.jpg"
          alt="Google Play"
          className="h-full w-auto object-contain rounded-xl"
        />
      </div>

      <div className="h-12 flex items-center overflow-hidden">
        <img
          src="/images/playstore/app-store.jpg"
          alt="App Store"
          className="h-full w-auto object-contain rounded-xl"
        />
      </div>
    </div>
  )
}
