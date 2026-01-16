"use client"

import { Toaster } from "react-hot-toast"

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className:
          "font-subtitle text-white bg-[#F37406] px-3 py-2 sm:px-4 sm:py-3 rounded shadow-lg !w-[90vw] sm:!w-auto sm:!max-w-md md:!max-w-lg",
        duration: 4000,
      }}
    />
  )
}
