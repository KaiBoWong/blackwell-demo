import Image from "next/image"
export default function PlayStore() {
  return (
    <div className="flex justify-center gap-3 mt-10">
      <div className="h-12 flex items-center overflow-hidden">
        <Image
          src="/images/playstore/google-play.jpg"
          alt="Google Play"
          width={393}
          height={118}
          className="h-full w-auto object-contain rounded-xl"
        />
      </div>

      <div className="h-12 flex items-center overflow-hidden">
        <Image
          src="/images/playstore/app-store.jpg"
          alt="App Store"
          width={393}
          height={118}
          className="h-full w-auto object-contain rounded-xl"
        />
      </div>
    </div>
  )
}
