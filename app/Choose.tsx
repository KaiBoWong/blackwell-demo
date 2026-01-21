"use client"

import { useTranslation } from "@/hooks/useTranslation"
import { useEffect, useRef, useState } from "react"

export default function TradingTabs() {
  const { t } = useTranslation()
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  interface Card {
    title: string
    description: string
  }

  const cards = t("choose.cards", {
    returnObjects: true,
  }) as unknown as Card[]

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, index]))
              observer.disconnect()
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        },
      )

      observer.observe(card)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [cards.length])

  return (
    <div className="relative mx-auto max-w-[1520px] px-5 lg:px-20">
      <div className="text-center pt-[20px] lg:pt-[100px] mb-14">
        <h2
          id="choose"
          className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl pt-24 lg:pt-30"
        >
          {t("choose.title")}
        </h2>
      </div>
      <div className="space-y-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            ref={(el) => {
              cardsRef.current[index] = el
            }}
            className={`
              flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 
              bg-white rounded-2xl p-6 lg:px-10 lg:py-6 shadow-sm
              transition-all duration-500 ease-out
              hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1
              cursor-pointer
              ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }
            `}
            style={{
              transitionDelay: visibleCards.has(index)
                ? `${index * 100}ms`
                : "0ms",
            }}
          >
            <div className="flex items-center lg:gap-20 lg:w-[30%]">
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={`/images/choose/icon-${index + 1}.png`}
                  alt={card.title}
                  className="w-20 h-20 lg:w-20 lg:h-20"
                />
              </div>
              <h3 className="text-lg lg:text-xl font-title font-bold text-[#040dbf] transition-colors duration-300 hover:text-[#F37406]">
                {card.title}
              </h3>
            </div>
            <div className="flex-1 lg:w-[60%]">
              <p className="text-sm lg:text-base text-gray-700 font-subtitle font-semibold">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
