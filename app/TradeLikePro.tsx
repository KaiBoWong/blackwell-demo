"use client"

import PlayStore from "@/components/Store"
import { useState } from "react"

export default function InteractiveSteps() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 1,
      number: "1",
      title: "Install our app, ”Blackwell Invest“",
      image: "/images/guide/guide-1.png",
      color: "border-[#FFD700]", // 金色
    },
    {
      id: 2,
      number: "2",
      title: "Choose a signal Master and click ”Copy”",
      image: "/images/guide/guide-2.png",
      color: "border-[#F37406]", // 橙色
    },
    {
      id: 3,
      number: "3",
      title: "Set your trade size preferences",
      image: "/images/guide/guide-3.png",
      color: "border-[#FFD700]", // 金色
    },
    {
      id: 4,
      number: "4",
      title: "Click ”Agree and Copy“",
      image: "/images/guide/guide-4.png",
      color: "border-[#F37406]", // 橙色
    },
  ]

  return (
    <div className="relative mx-auto max-w-[1520px] pt-20 lg:py-20 px-5 lg:px-20">
      <div className="text-center pt-[20px] lg:pt-[100px] mb-14">
        <h2
          id="tradelikepro"
          className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl pt-24 lg:pt-30"
        >
          Trade Like a Pro in Minutes
        </h2>
      </div>

      {/* 桌面版 */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* 左侧：步骤卡片 */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`w-full text-left rounded-xl border-2 p-6 transition-all duration-300 ${
                activeStep === index
                  ? `${step.color} bg-[#1e3a8a]/20 scale-105`
                  : "border-white/30 bg-transparent hover:border-white/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`text-4xl font-bold ${
                    index === 0 || index === 2
                      ? "text-[#FFD700]"
                      : "text-[#F37406]"
                  }`}
                >
                  {step.number}
                </span>
                <h3
                  className={`text-lg lg:text-xl font-title font-semibold ${
                    activeStep === index ? "text-[#01f2f2]" : "text-white"
                  }`}
                >
                  {step.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* 右侧：手机截图 */}
        <div
          className={`relative h-[450px] flex justify-center items-center border-2 rounded-2xl p-8 transition-colors duration-300 ${steps[activeStep].color}`}
        >
          <div className="relative w-full max-w-[350px] aspect-[9/16]">
            {steps.map((step, index) => (
              <img
                key={step.id}
                src={step.image}
                alt={step.title}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                  activeStep === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 移动版 - 手风琴式 */}
      <div className="lg:hidden space-y-6">
        {steps.map((step, index) => (
          <div key={step.id}>
            {/* 步骤按钮和照片在同一个容器内 */}
            <div
              className={`rounded-xl border-2 p-6 transition-all duration-300 ${
                activeStep === index
                  ? `${step.color} bg-[#1e3a8a]/20`
                  : "border-white/30 bg-transparent"
              }`}
            >
              {/* 步骤标题 */}
              <button
                onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                className="w-full text-left"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-4xl font-bold ${
                      index === 0 || index === 2
                        ? "text-[#FFD700]"
                        : "text-[#F37406]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <h3
                    className={`text-lg font-title font-semibold ${
                      activeStep === index ? "text-[#01f2f2]" : "text-white"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              </button>

              {/* 照片 - 在同一个 border 内展开 */}
              {activeStep === index && (
                <div>
                  <div className="flex justify-center items-center h-[400px]">
                    <div className="relative w-full max-w-[370px] aspect-[9/16]">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <PlayStore />
    </div>
  )
}
