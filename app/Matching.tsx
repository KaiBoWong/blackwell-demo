"use client"

import PlayStore from "@/components/Store"
import { useState } from "react"

export default function Matching() {
  const items = [
    "Spotlight",
    "Top Strategies",
    "Low Drawdown",
    "Medium Drawdown",
    "High Drawdown",
    "New Strategies",
  ]

  return (
    <div className="mx-auto max-w-[1520px] px-5 lg:px-0">
      <div className="text-center">
        <h2
          id="matching"
          className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl py-14 lg:py-0"
        >
          Fast Matching
        </h2>
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-10 lg:py-14">
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
                <li key={index} className="flex items-center gap-4">
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
