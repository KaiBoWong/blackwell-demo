"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import RegisterButton from "@/components/RegisterButton"

export default function StepSlideshow() {
  const slides = [
    {
      id: 1,
      image: "/images/register/step-1.png",
      title: "Install our app, “Blackwell Invest",
    },
    {
      id: 2,
      image: "/images/register/step-2.png",
      title: "Login OR create a new account",
    },
    {
      id: 3,
      image: "/images/register/step-3.png",
      title: "Click “Account” ",
    },
    {
      id: 4,
      image: "/images/register/step-4.png",
      title: "Click “Link an account”",
    },
    {
      id: 5,
      image: "/images/register/step-5.png",
      title: 'Select “BlackwellGlobalAsia-Live” server"',
    },
    {
      id: 6,
      image: "/images/register/step-6.png",
      title:
        "Fill in your Blackwell Global trading account OR create a new account ",
    },
    {
      id: 7,
      image: "/images/register/step-7.png",
      title: "Click “Copy Trades” ",
    },
    {
      id: 8,
      image: "/images/register/step-8.png",
      title: "Click “Done”",
    },
  ]

  return (
    <div className="mx-auto max-w-[1520px] px-5 lg:px-20">
      <div className="text-center mt-6 mb-8">
        <h2 className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl">
          How to Link MT4 Account
        </h2>
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={4}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={700}
        breakpoints={{
          // 响应式设置
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          769: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col items-center relative">
              {/* 箭头 - 桌面端：只在右边，移动端：左右两边 */}

              {/* 桌面端右箭头 - 不是最后一个卡片时显示 */}
              {index < slides.length - 1 && (
                <div className="hidden xl:block absolute top-[250px] -right-[100px] transform -translate-y-1/2 z-10">
                  <img
                    src="/images/arrows/arrow.png"
                    alt="next"
                    className="relative w-40 h-40 drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]"
                  />
                </div>
              )}

              {/* 移动端右箭头 - 不是最后一个卡片时显示 */}
              {index < slides.length - 1 && (
                <div className="xl:hidden absolute top-[50%] lg:-right-[50px] -right-[80px] transform -translate-y-1/2 z-10">
                  <img
                    src="/images/arrows/arrow.png"
                    alt="next"
                    className="relative w-35 h-35 lg:w-30 lg:h-30 drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]"
                  />
                </div>
              )}

              {/* 卡片容器 */}
              <div className="relative rounded-3xl p-4 w-full flex flex-col h-90 lg:h-[500px]">
                {/* 自定义边框 - 上边 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#F37406] rounded-t-3xl"></div>

                {/* 自定义边框 - 下边 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F37406] rounded-b-3xl"></div>

                {/* 自定义边框 - 左边（在箭头位置断开）*/}
                {index > 0 ? (
                  <>
                    {/* 桌面端：左边框上半部分 - 从顶部到箭头上方 */}
                    <div className="hidden xl:block absolute top-0 left-0 w-1 h-[35%] bg-[#F37406] rounded-tl-3xl"></div>
                    {/* 桌面端：左边框下半部分 - 从箭头下方到底部 */}
                    <div className="hidden xl:block absolute bottom-0 left-0 w-1 h-[35%] bg-[#F37406] rounded-bl-3xl"></div>

                    {/* 移动端：左边框断开 */}
                    <div className="xl:hidden absolute top-0 left-0 w-1 h-[35%] bg-[#F37406] rounded-tl-3xl"></div>
                    <div className="xl:hidden absolute bottom-0 left-0 w-1 h-[35%] bg-[#F37406] rounded-bl-3xl"></div>
                  </>
                ) : (
                  /* 第一个卡片完整左边框 */
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#F37406] rounded-l-3xl"></div>
                )}

                {/* 自定义边框 - 右边（在箭头位置断开）*/}
                {index < slides.length - 1 ? (
                  <>
                    {/* 桌面端：右边框上半部分 - 从顶部到箭头上方 */}
                    <div className="hidden xl:block absolute top-0 right-0 w-1 h-[35%] bg-[#F37406] rounded-tr-3xl"></div>
                    {/* 桌面端：右边框下半部分 - 从箭头下方到底部 */}
                    <div className="hidden xl:block absolute bottom-0 right-0 w-1 h-[35%] bg-[#F37406] rounded-br-3xl"></div>

                    {/* 移动端：右边框断开 */}
                    <div className="xl:hidden absolute top-0 right-0 w-1 h-[35%] bg-[#F37406] rounded-tr-3xl"></div>
                    <div className="xl:hidden absolute bottom-0 right-0 w-1 h-[35%] bg-[#F37406] rounded-br-3xl"></div>
                  </>
                ) : (
                  <div className="absolute top-0 bottom-0 right-0 w-1 bg-[#F37406] rounded-r-3xl"></div>
                )}

                {/* 内容 */}
                <div className="lg:h-[350px] flex items-center justify-center overflow-hidden rounded-2xl mb-4">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-auto md:h-[50vh] h-[40vh] lg:w-full lg:h-full lg:object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center lg:flex-1 mt-4">
                  <h3 className="text-xl font-title font-bold text-white text-center px-4">
                    {slide.title}
                  </h3>
                  <span className="text-white/60 text-base mt-2">
                    Step {index + 1}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
