export default function TradingTabs() {
  return (
    <div className="relative mx-auto max-w-[1520px] px-5 lg:px-20">
      <div className="text-center pt-[20px] lg:pt-[100px] mb-14">
        <h2
          id="choose"
          className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl pt-24 lg:pt-30"
        >
          Why Choose Us?
        </h2>
      </div>
      <div className="space-y-4">
        {/* Card 1 - Regulated */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 bg-white rounded-2xl p-6 lg:px-10 lg:py-6 shadow-sm">
          <div className="flex items-center lg:gap-20 lg:w-[30%]">
            <div className="flex-shrink-0">
              <img
                src="/images/choose/icon-1.png"
                alt="Regulated"
                className="w-20 h-20 lg:w-20 lg:h-20"
              />
            </div>
            <h3 className="text-lg lg:text-xl font-title font-bold text-[#040dbf]">
              Regulated
            </h3>
          </div>
          <div className="flex-1 lg:w-[60%]">
            <p className="text-sm lg:text-base text-gray-700 font-subtitle font-semibold">
              The copy trading platform is regulated. Our technology partner is
              regulated. And so are we, as a brokerage. We operate under strict
              compliance for your peace of mind.
            </p>
          </div>
        </div>

        {/* Card 2 - 0 Commissions */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 bg-white rounded-2xl p-6 lg:px-10 lg:py-6 shadow-sm">
          <div className="flex items-center lg:gap-20 lg:w-[30%]">
            <div className="flex-shrink-0">
              <img
                src="/images/choose/icon-2.png"
                alt="0 Commissions"
                className="w-20 h-20 lg:w-20 lg:h-20"
              />
            </div>
            <h3 className="text-lg lg:text-xl font-title font-bold text-[#040dbf]">
              0 Commissions
            </h3>
          </div>
          <div className="flex-1 lg:w-[60%]">
            <p className="text-sm lg:text-base text-gray-700 font-subtitle font-semibold">
              When investing, the small margins matter. Blackwell Invest offers
              0 commissions investing, and 0 cost to install our app.
            </p>
          </div>
        </div>

        {/* Card 3 - User-friendly */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 bg-white rounded-2xl p-6 lg:px-10 lg:py-6 shadow-sm">
          <div className="flex items-center lg:gap-20 lg:w-[30%]">
            <div className="flex-shrink-0">
              <img
                src="/images/choose/icon-3.png"
                alt="User-friendly"
                className="w-20 h-20 lg:w-20 lg:h-20"
              />
            </div>
            <h3 className="text-lg lg:text-xl font-title font-bold text-[#040dbf]">
              User-friendly
            </h3>
          </div>
          <div className="flex-1 lg:w-[60%]">
            <p className="text-sm lg:text-base text-gray-700 font-subtitle font-semibold">
              With an intuitive interface, easy trade execution, and hassle-free
              management, copying top traders has never been simpler. Trade
              smarter, not harder!
            </p>
          </div>
        </div>

        {/* Card 4 - Tier 1 liquidity */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 bg-white rounded-2xl p-6 lg:px-10 lg:py-6 shadow-sm">
          <div className="flex items-center lg:gap-20 lg:w-[30%]">
            <div className="flex-shrink-0">
              <img
                src="/images/choose/icon-4.png"
                alt="Tier 1 liquidity"
                className="w-20 h-20 lg:w-20 lg:h-20"
              />
            </div>
            <h3 className="text-lg lg:text-xl font-title font-bold text-[#040dbf]">
              Tier 1 liquidity
            </h3>
          </div>
          <div className="flex-1 lg:w-[60%]">
            <p className="text-sm lg:text-base text-gray-700 font-subtitle font-semibold">
              Blackwell Invest sources the best liquidity to provide a deep
              product range and broad market access. Fast order execution and
              transparent pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
