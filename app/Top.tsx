"use client"

import PlayStore from "@/components/Store"

interface HeroSectionProps {
  onRegisterClick: () => void
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  return (
    <div className="min-h-screen relative overflow-visible">
      {/* 桌面端手机图片 */}
      <div className="hidden lg:block absolute lg:top-[10vh] lg:-left-[35vw] xl:top-[10vh] xl:-left-[25vw] 2xl:top-[10vh] 2xl:-left-[30vw] z-30 pointer-events-none">
        <img
          src="/images/top/hand.png"
          alt="Phone"
          className="lg:w-[800px] xl:w-[1000px] 2xl:w-[1240px]"
        />
      </div>

      <div
        id="top"
        className="max-w-[1520px] mx-auto px-6 lg:grid lg:pt-40 lg:grid-cols-2 gap-12 lg:items-center"
      >
        {/* 左边 - 手机图片占位 (仅桌面端) */}
        <div className="relative mt-[20%] overflow-visible hidden lg:block"></div>

        {/* 右边 - 内容 */}
        <div className="lg:hidden">
          {/* 移动端布局 */}

          <h1 className="text-4xl md:text-6xl font-regular mb-6 flex flex-col gap-2 text-center pt-20">
            <span className="font-title text-[#01f2f2]">COPY TRADING</span>
            <span className="font-title text-2xl md:text-5xl text-white italic">
              with Blackwell Invest
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
                className="absolute -bottom-2 -right-9 translate-x-1/2 translate-y-1/2 w-30 z-0 pointer-events-none"
              />
            </div>
          </div>

          {/* 移动端手机图片 - 占据上半部分 */}
          <div className="relative w-full min-h-[80vh]">
            <img
              src="/images/top/hand.png"
              alt="Phone"
              className="
      absolute 
      top-[80%] -left-[25%]    /* 小屏默认 */
      md:top-[80%] md:left-[20%] /* 大屏覆盖 */
      -translate-x-1/2 -translate-y-1/2 
      h-auto w-auto max-w-none 
      z-0 pointer-events-none
    "
            />
          </div>

          {/* 移动端内容 - 在下半部分 */}
          <div className="md:pl-48 pl-4 pb-12">
            {/* 副标题 */}
            <h2 className="text-3xl font-semibold mb-4 text-right">
              <span className="font-subtitle text-[#01f2f2]">
                Choose & Trade
              </span>
              <br />
              <span className="font-subtitle text-[#f2df79] italic">
                Ready-To-Go Strategies
              </span>
            </h2>

            {/* 描述 */}
            <p className="text-white text-base mb-6 text-right">
              Browse and copy hundreds of investment strategies developed by
              master traders! Whether you are a pro or beginner, you can now
              trade quicker and more confidently.
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {[
                { name: "Forex", color: "#f2df79" },
                { name: "Precious Metals", color: "#F37406" },
                { name: "Oil", color: "#D94251" },
                { name: "Indices", color: "#01f2f2" },
              ].map((item) => (
                <span
                  key={item.name}
                  className="px-4 py-2 border-2 text-white rounded-xl text-sm"
                  style={{ borderColor: item.color }}
                >
                  {item.name}
                </span>
              ))}
            </div>

            {/* CTA 按钮 */}
            <div className="flex justify-end mb-4">
              <button
                onClick={onRegisterClick}
                className="rounded-lg bg-[#F37406] font-title px-10 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 active:scale-95"
              >
                Register Now
              </button>
            </div>

            {/* 免责声明 */}
            <p className="text-white/60 text-xs italic text-right">
              When you invest, your capital is at risk. Be prudent.
            </p>
          </div>
        </div>

        {/* 桌面端内容 */}
        <div className="hidden lg:block">
          {/* 标题 */}
          <h1 className="text-6xl xl:text-7xl font-regular mb-6 flex flex-col gap-2 text-center">
            <span className="font-title text-[#01f2f2]">COPY TRADING</span>
            <span className="font-title text-4xl xl:text-5xl text-white italic">
              with Blackwell Invest
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

          {/* 副标题 */}
          <h2 className="text-2xl lg:text-4xl font-semibold mt-40">
            <span className="font-subtitle text-[#01f2f2]">Choose & Trade</span>
            <br />
            <span className="font-subtitle text-[#f2df79] italic">
              Ready-To-Go Strategies
            </span>
          </h2>

          <p className="text-white text-lg mb-6">
            Browse and copy hundreds of investment strategies developed by
            master traders! Whether you are a pro or beginner, you can now trade
            quicker and more confidently.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { name: "Forex", color: "#f2df79" },
              { name: "Precious Metals", color: "#F37406" },
              { name: "Oil", color: "#D94251" },
              { name: "Indices", color: "#01f2f2" },
            ].map((item) => (
              <span
                key={item.name}
                className="px-4 py-2 border-2 text-white rounded-xl text-sm"
                style={{ borderColor: item.color }}
              >
                {item.name}
              </span>
            ))}
          </div>

          <button
            onClick={onRegisterClick}
            className="rounded-lg bg-[#F37406] font-title px-10 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 active:scale-95"
          >
            Register Now
          </button>

          <p className="text-white/60 text-sm italic pt-5">
            When you invest, your capital is at risk. Be prudent.
          </p>
        </div>
      </div>
    </div>
  )
}
