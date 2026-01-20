import { useState } from "react"
import Image from "next/image"
import PlayStore from "@/components/Store"

export default function Choose() {
  const [activeTab, setActiveTab] = useState("activity")

  const tabs = [
    {
      id: "discover",
      icon: "/images/navigate/icon1.png",
      activeIcon: "/images/navigate/icon1-blue.png",
      content: {
        title: "Discover",
        description:
          "Explore all the investment Masters available on Blackwell Invest. Dive into their profiles and analyse their profitability at a glance.",
      },
    },
    {
      id: "activity",
      icon: "/images/navigate/icon2.png",
      activeIcon: "/images/navigate/icon2-blue.png",
      content: {
        title: "Activity",
        description:
          "See the past trades made by the signals you are copying from the last 30 days or track their open positions. Monitor their strategy, and make informed decisions with timely updates of the trades shaping your portfolio.",
      },
    },
    {
      id: "trade",
      icon: "/images/navigate/icon3.png",
      activeIcon: "/images/navigate/icon3-blue.png",
      content: {
        title: "Trade",
        description:
          "Seamlessly trade oil CFDs, indices, and currency pairs with ease.",
      },
    },
    {
      id: "positions",
      icon: "/images/navigate/icon4.png",
      activeIcon: "/images/navigate/icon4-blue.png",
      content: {
        title: "Positions",
        description:
          "Easily track the status of all your trades and monitor your account metrics in real-time.",
      },
    },
    {
      id: "account",
      icon: "/images/navigate/icon5.png",
      activeIcon: "/images/navigate/icon5-blue.png",
      content: {
        title: "Account",
        description:
          "Access detailed information about your trading account, monitor copier drawdown levels, assess your profitability, and keep track of your trade performance – all in one place!",
      },
    },
  ]

  const currentTab = tabs.find((tab) => tab.id === activeTab)

  return (
    <div className="mx-auto max-w-[1520px] px-5 lg:px-0">
      <div className="text-center mt-6 mb-14">
        <h2 className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl">
          Navigate Our App in 5 Clicks
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
              alt={tab.id}
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
                src="/images/reason/reason-1.png"
                alt="Discover"
                className="w-full h-100 object-contain rounded-xl"
              />
            )}
            {activeTab === "activity" && (
              <img
                src="/images/reason/reason-2.png"
                alt="Activity"
                className="w-full h-100 object-contain rounded-xl"
              />
            )}
            {activeTab === "trade" && (
              <img
                src="/images/reason/reason-3.png"
                alt="Trade"
                className="w-full h-100 object-contain rounded-xl"
              />
            )}
            {activeTab === "positions" && (
              <img
                src="/images/reason/reason-4.png"
                alt="Positions"
                className="w-full h-100 object-contain rounded-xl"
              />
            )}
            {activeTab === "account" && (
              <img
                src="/images/reason/reason-5.png"
                alt="Account"
                className="w-full h-100 object-contain rounded-xl"
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
              src="/images/reason/reason-1.png"
              alt="Discover"
              className="w-full h-auto object-contain rounded-xl"
            />
          )}
          {activeTab === "activity" && (
            <img
              src="/images/reason/reason-2.png"
              alt="Activity"
              className="w-full h-auto object-contain rounded-xl"
            />
          )}
          {activeTab === "trade" && (
            <img
              src="/images/reason/reason-3.png"
              alt="Trade"
              className="w-full h-auto object-contain rounded-xl"
            />
          )}
          {activeTab === "positions" && (
            <img
              src="/images/reason/reason-4.png"
              alt="Positions"
              className="w-full h-auto object-contain rounded-xl"
            />
          )}
          {activeTab === "account" && (
            <img
              src="/images/reason/reason-5.png"
              alt="Account"
              className="w-full h-auto object-contain rounded-xl"
            />
          )}
        </div>
      </div>
      <PlayStore />
    </div>
  )
}
