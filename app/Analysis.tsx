"use client"

import { useTranslation } from "@/hooks/useTranslation"

export default function Analysis() {
  const { t } = useTranslation()

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
        <div className="flex justify-center">
          <div className="relative w-[40vw] max-w-[320px] lg:w-[250px] aspect-[9/19]">
            <img
              src={"/images/analysis/mobile-2.png"}
              alt="Analysis"
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* 用百分比定位，相对于主图片 */}
            <img
              src={"/images/analysis/function-1.png"}
              alt="Overlay 1"
              className="lg:block absolute -top-[10%] -left-[50%] w-full"
            />

            <img
              src={"/images/analysis/function-2.png"}
              alt="Overlay 2"
              className="lg:block absolute top-[17%] -right-[48%] w-full"
            />

            <img
              src={"/images/analysis/function-3.png"}
              alt="Overlay 3"
              className="lg:block absolute top-[33%] -left-[50%] w-full"
            />

            <img
              src={"/images/analysis/function-4.png"}
              alt="Overlay 4"
              className="lg:block absolute top-[45%] -right-[50%] w-full"
            />

            <img
              src={"/images/analysis/function-5.png"}
              alt="Overlay 5"
              className="lg:block absolute -bottom-[5%] -left-[50%] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
