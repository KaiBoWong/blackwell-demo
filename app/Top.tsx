"use client"

import PlayStore from "@/components/Store"
import { useTranslation } from "@/hooks/useTranslation"

interface HeroSectionProps {
  onRegisterClick: () => void
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const { t } = useTranslation()

  const tags = [
    { name: t("hero.tags.forex"), color: "#f2df79" },
    { name: t("hero.tags.metals"), color: "#F37406" },
    { name: t("hero.tags.oil"), color: "#D94251" },
    { name: t("hero.tags.indices"), color: "#01f2f2" },
  ]

  return (
    <div className="min-h-screen relative overflow-visible">
      {/* 桌面端手机图片 - 原始大小 */}

      <div
        id="top"
        className="max-w-[1520px] mx-auto px-6 lg:grid lg:grid-cols-2 gap-12 lg:items-center lg:-mt-20"
      >
        {/* 左边 - 手机图片占位 (仅桌面端) */}
        <div className="relative xl:-left-[50%] top-[15%] lg:-left-[120%] hidden lg:block">
          <img
            src="/images/top/hand.png"
            alt="Phone"
            className="h-auto w-auto max-w-none"
          />
        </div>

        {/* 右边 - 内容 */}
        <div>
          {/* 移动端内容 */}
          <div className="lg:hidden">
            {/* 移动端标题 */}
            <div className="relative flex flex-col items-center mb-8">
              {/* h1 - 在 regular 前面 */}
              <h1 className="text-5xl md:text-8xl font-regular mb-6 flex flex-col gap-2 text-center pt-20 z-10 relative">
                <span className="font-title text-[#01f2f2]">
                  {t("hero.headline1")}
                </span>
                <span className="font-title text-3xl md:text-6xl text-white italic">
                  {t("hero.headline2")}
                </span>
              </h1>

              {/* PlayStore */}
              <div className="relative z-10">
                <PlayStore />
              </div>

              {/* 装饰图 regular.png */}
              <img
                src="/images/top/regular.png"
                alt="decoration"
                className="absolute md:bottom-[-25px] md:right-[10px] bottom-[10px] right-[-10px] w-[200px] md:w-[300px] z-0 pointer-events-none"
              />
            </div>

            {/* 移动端手机图片 */}
            <div className="relative w-full min-h-[800px]">
              <img
                src="/images/top/hand.png"
                alt="Phone"
                className="
                  absolute 
                  top-[80%] -left-[25%]  /* 小屏默认 */
                  md:top-[80%] md:left-[20%] /* 大屏覆盖 */
                  -translate-x-1/2 -translate-y-1/2
                  h-auto w-auto max-w-none
                  z-0 pointer-events-none
                "
              />
            </div>

            {/* 移动端文字内容 */}
            <div className="md:pl-60 pl-4 pb-12">
              <h2 className="text-3xl font-semibold mb-4 text-right">
                <span className="font-subtitle text-[#01f2f2]">
                  {t("hero.chooseTrade")}
                </span>
                <br />
                <span className="font-subtitle text-[#f2df79] italic">
                  {t("hero.readyStrategies")}
                </span>
              </h2>

              <p className="text-white text-base mb-6 text-right">
                {t("hero.description")}
              </p>

              <div className="flex flex-wrap gap-3 mb-6 justify-center">
                {tags.map((item) => (
                  <span
                    key={item.name}
                    className="px-4 py-2 border-2 text-white rounded-xl text-sm"
                    style={{ borderColor: item.color }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>

              <div className="flex justify-end mb-4">
                <button
                  onClick={onRegisterClick}
                  className="rounded-lg bg-[#F37406] font-title px-10 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 active:scale-95"
                >
                  {t("common.registerNow")}
                </button>
              </div>

              <p className="text-white/60 text-xs italic text-right">
                {t("hero.disclaimer")}
              </p>
            </div>
          </div>

          {/* 桌面端内容 */}
          <div className="hidden lg:block">
            <h1 className="text-6xl xl:text-7xl font-regular mb-6 flex flex-col gap-2 text-center">
              <span className="font-title text-[#01f2f2]">
                {t("hero.headline1")}
              </span>
              <span className="font-title text-4xl xl:text-5xl text-white italic">
                {t("hero.headline2")}
              </span>
            </h1>

            <div className="flex justify-center mb-8">
              <div className="relative inline-block">
                <div className="relative z-10">
                  <PlayStore />
                </div>
                <img
                  src="/images/top/regular.png"
                  alt="decoration"
                  className="absolute xl:-bottom-6 xl:-right-16 lg:-bottom-2 lg:-right-10 translate-x-1/2 translate-y-1/2 w-24 xl:w-[60%] lg:w-[30%] z-0 pointer-events-none"
                />
              </div>
            </div>

            <h2 className="text-2xl lg:text-4xl font-semibold mt-40">
              <span className="font-subtitle text-[#01f2f2]">
                {t("hero.chooseTrade")}
              </span>
              <br />
              <span className="font-subtitle text-[#f2df79] italic">
                {t("hero.readyStrategies")}
              </span>
            </h2>

            <p className="text-white text-lg mb-6">{t("hero.description")}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {tags.map((item) => (
                <span
                  key={item.name}
                  className="px-4 py-2 border-2 text-white rounded-xl text-sm"
                  style={{ borderColor: item.color }}
                >
                  {item.name}
                </span>
              ))}
            </div>

            <div className="flex justify-start mb-4">
              <button
                onClick={onRegisterClick}
                className="rounded-lg bg-[#F37406] font-title px-10 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 active:scale-95"
              >
                {t("common.registerNow")}
              </button>
            </div>

            <p className="text-white/60 text-sm italic pt-5">
              {t("hero.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
