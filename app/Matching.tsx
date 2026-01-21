"use client"

import { useTranslation } from "@/hooks/useTranslation"
import { useEffect, useRef, useState } from "react"

export default function Matching() {
  const { t } = useTranslation()
  const items = t("matching.items", {
    returnObjects: true,
  }) as unknown as string[]

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2, // 当20%的元素可见时触发
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div className="mx-auto max-w-[1520px] px-5 lg:px-0">
      <div className="text-center pt-[20px] lg:pt-2">
        <h2
          id="matching"
          className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl pb-5 pt-24 lg:pt-24"
        >
          {t("matching.title")}
        </h2>
        <div
          ref={sectionRef}
          className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-10 lg:py-14"
        >
          <div className="relative lg:w-80 lg:h-[600px] w-auto h-[350px] bg-black lg:rounded-3xl rounded-xl shadow-2xl flex-shrink-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover lg:rounded-3xl rounded-2xl"
            >
              <source src="/video/mobile-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* 右边的列表 */}
          <div className="max-w-md lg:-mt-28">
            <ul className="lg:space-y-5 space-y-3">
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 opacity-0 ${
                    isVisible ? "animate-fade-in-up" : ""
                  }`}
                  style={{
                    animationDelay: isVisible ? `${index * 250}ms` : "0ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <img
                    src="/images/matching/list-icon.png"
                    alt=""
                    className="w-auto h-3 lg:h-5 object-contain flex-shrink-0"
                  />
                  <span className="text-white text-xl lg:text-2xl font-light font-title">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
