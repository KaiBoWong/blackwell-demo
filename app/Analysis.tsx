"use client"

import { useTranslation } from "@/hooks/useTranslation"
import { useEffect, useRef, useState } from "react"

export default function Analysis() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2,
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
  }, [isVisible])

  return (
    <div className="mx-auto max-w-[1520px] px-5 lg:px-0 pb-10 lg:pb-10">
      <div className="text-center mb-14">
        <h2
          id="analysis"
          className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl pt-24 lg:pt-24 mb-6"
        >
          {t("analysis.title")}
        </h2>
        <p className="font-subtitle text-lg lg:text-xl text-[#f2df79] font-bold mb-20">
          {t("analysis.subtitle")}
        </p>
        <div ref={sectionRef} className="flex justify-center">
          <div className="relative w-[40vw] max-w-[320px] lg:w-[250px] aspect-[9/19]">
            {/* 波浪圆环 - 在手机后方 z-0 */}
            <div className="absolute inset-0 z-0">
              <div
                className={`absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#01f2f2] ${isVisible ? "animate-wave-1" : "opacity-0"}`}
              ></div>
              <div
                className={`absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#01f2f2] ${isVisible ? "animate-wave-2" : "opacity-0"}`}
              ></div>
              <div
                className={`absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#01f2f2] ${isVisible ? "animate-wave-3" : "opacity-0"}`}
              ></div>
            </div>

            {/* 手机图片 */}
            <img
              src={"/images/analysis/mobile-2.png"}
              alt="Analysis"
              className="absolute inset-0 w-full h-full object-contain z-10"
            />

            {/* 功能图片 - 在手机前方 */}
            <img
              src={"/images/analysis/function-1.png"}
              alt="Overlay 1"
              className={`lg:block absolute -top-[10%] -left-[50%] w-full z-20 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            />

            <img
              src={"/images/analysis/function-2.png"}
              alt="Overlay 2"
              className={`lg:block absolute top-[17%] -right-[48%] w-full z-20 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            />

            <img
              src={"/images/analysis/function-3.png"}
              alt="Overlay 3"
              className={`lg:block absolute top-[33%] -left-[50%] w-full z-20 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
              style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
            />

            <img
              src={"/images/analysis/function-4.png"}
              alt="Overlay 4"
              className={`lg:block absolute top-[45%] -right-[50%] w-full z-20 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
              style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
            />

            <img
              src={"/images/analysis/function-5.png"}
              alt="Overlay 5"
              className={`lg:block absolute -bottom-[5%] -left-[50%] w-full z-20 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
              style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
