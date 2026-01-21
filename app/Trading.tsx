"use client"

import { useState } from "react"
import Image from "next/image"
import PlayStore from "@/components/Store"
import { useTranslation } from "@/hooks/useTranslation"

export default function Choose() {
  const [activeTab, setActiveTab] = useState("activity")
  const { t } = useTranslation()

  const tabs = [
    {
      id: "discover",
      icon: "/images/navigate/icon1.png",
      activeIcon: "/images/navigate/icon1-blue.png",
      content: {
        title: t("trading.tabs.discover.title"),
        description: t("trading.tabs.discover.description"),
      },
    },
    {
      id: "activity",
      icon: "/images/navigate/icon2.png",
      activeIcon: "/images/navigate/icon2-blue.png",
      content: {
        title: t("trading.tabs.activity.title"),
        description: t("trading.tabs.activity.description"),
      },
    },
    {
      id: "trade",
      icon: "/images/navigate/icon3.png",
      activeIcon: "/images/navigate/icon3-blue.png",
      content: {
        title: t("trading.tabs.trade.title"),
        description: t("trading.tabs.trade.description"),
      },
    },
    {
      id: "positions",
      icon: "/images/navigate/icon4.png",
      activeIcon: "/images/navigate/icon4-blue.png",
      content: {
        title: t("trading.tabs.positions.title"),
        description: t("trading.tabs.positions.description"),
      },
    },
    {
      id: "account",
      icon: "/images/navigate/icon5.png",
      activeIcon: "/images/navigate/icon5-blue.png",
      content: {
        title: t("trading.tabs.account.title"),
        description: t("trading.tabs.account.description"),
      },
    },
  ]

  const currentTab = tabs.find((tab) => tab.id === activeTab)

  return (
    <div className="mx-auto max-w-[1520px] px-5 lg:px-20 pb-24">
      <div className="text-center pt-[20px] lg:pt-2 mb-14">
        <h2
          id="trading"
          className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl pt-24 lg:pt-30"
        >
          {t("trading.title")}
        </h2>
      </div>
      {/* Tabs Navigation */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center rounded-t-2xl w-24 h-16 transition-all ${
              activeTab === tab.id
                ? "bg-[#F2DF79] text-[#4A5FC1]"
                : "bg-white text-[#F37406] hover:bg-white"
            }`}
          >
            <img
              src={activeTab === tab.id ? tab.activeIcon : tab.icon}
              alt={tab.content.title}
              className="w-16 h-16 mb-1 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="rounded-b-xl rounded-tr-xl bg-[#F2DF79] pt-10 min-h-[200px]">
        {/* Desktop View */}
        <div className="hidden lg:flex flex-row justify-start lg:justify-between">
          {/* 左半屏文字 */}
          <div className="w-1/2 flex flex-col justify-center pl-10">
            <h2 className="font-title text-2xl font-bold text-[#040dbf] mb-4">
              {currentTab?.content.title}
            </h2>
            <p className="font-subtitle text-lg font-semibold text-gray-700">
              {currentTab?.content.description}
            </p>
          </div>

          {/* 右半屏图片 */}
          <div className="flex-shrink-0 self-end md:self-end">
            {activeTab === "discover" && (
              <img
                key="discover"
                src="/images/reason/reason-1.png"
                alt={tabs.find((tab) => tab.id === "discover")?.content.title}
                className="w-full h-100 object-contain rounded-xl animate-image-enter"
              />
            )}
            {activeTab === "activity" && (
              <img
                key="activity"
                src="/images/reason/reason-2.png"
                alt={tabs.find((tab) => tab.id === "activity")?.content.title}
                className="w-full h-100 object-contain rounded-xl animate-image-enter"
              />
            )}
            {activeTab === "trade" && (
              <img
                key="trade"
                src="/images/reason/reason-3.png"
                alt={tabs.find((tab) => tab.id === "trade")?.content.title}
                className="w-full h-100 object-contain rounded-xl animate-image-enter"
              />
            )}
            {activeTab === "positions" && (
              <img
                key="positions"
                src="/images/reason/reason-4.png"
                alt={tabs.find((tab) => tab.id === "positions")?.content.title}
                className="w-full h-100 object-contain rounded-xl animate-image-enter"
              />
            )}
            {activeTab === "account" && (
              <img
                key="account"
                src="/images/reason/reason-5.png"
                alt={tabs.find((tab) => tab.id === "account")?.content.title}
                className="w-full h-100 object-contain rounded-xl animate-image-enter"
              />
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col lg:hidden w-full gap-4">
          <h2 className="font-title text-2xl font-bold text-[#040dbf] mb-2 px-10">
            {currentTab?.content.title}
          </h2>
          <p className="font-subtitle text-lg font-bold text-gray-700 px-10">
            {currentTab?.content.description}
          </p>

          {activeTab === "discover" && (
            <img
              key="discover-mobile"
              src="/images/reason/reason-1.png"
              alt={tabs.find((tab) => tab.id === "discover")?.content.title}
              className="w-full h-auto object-contain rounded-xl animate-image-enter"
            />
          )}
          {activeTab === "activity" && (
            <img
              key="activity-mobile"
              src="/images/reason/reason-2.png"
              alt={tabs.find((tab) => tab.id === "activity")?.content.title}
              className="w-full h-auto object-contain rounded-xl animate-image-enter"
            />
          )}
          {activeTab === "trade" && (
            <img
              key="trade-mobile"
              src="/images/reason/reason-3.png"
              alt={tabs.find((tab) => tab.id === "trade")?.content.title}
              className="w-full h-auto object-contain rounded-xl animate-image-enter"
            />
          )}
          {activeTab === "positions" && (
            <img
              key="positions-mobile"
              src="/images/reason/reason-4.png"
              alt={tabs.find((tab) => tab.id === "positions")?.content.title}
              className="w-full h-auto object-contain rounded-xl animate-image-enter"
            />
          )}
          {activeTab === "account" && (
            <img
              key="account-mobile"
              src="/images/reason/reason-5.png"
              alt={tabs.find((tab) => tab.id === "account")?.content.title}
              className="w-full h-auto object-contain rounded-xl animate-image-enter"
            />
          )}
        </div>
      </div>
      <PlayStore />
    </div>
  )
}
