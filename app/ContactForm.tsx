"use client"

import { showToast } from "@/components/toast"
import { useForm } from "react-hook-form"
import { useTranslation } from "@/hooks/useTranslation"

export default function ContactForm() {
  const { t } = useTranslation()
  const countries = t("contact.countries", {
    returnObjects: true,
  }) as string[]
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      country: "",
      message: "",
    },
  })

  const countryValue = watch("country")

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // Add your form submission logic here

    // Show success toast
    showToast.success(t("contact.success"))

    // Reset form
    reset()
  }

  return (
    <div className="relative mx-auto max-w-[1520px] pb-20 lg:pb-30 px-5 lg:px-20">
      <div className="text-center pt-[20px] lg:pt-[100px]">
        <h2
          id="enquire"
          className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl mb-12 pt-24 lg:pt-30"
        >
          {t("contact.enquire")}
        </h2>
      </div>

      <div className="mx-auto space-y-6">
        {/* Name and Email Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: t("contact.errors.nameRequired"),
              })}
              className="w-full rounded-lg border border-white bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
              placeholder={t("contact.name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: t("contact.errors.emailRequired"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("contact.errors.emailInvalid"),
                },
              })}
              className="w-full rounded-lg border border-white bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
              placeholder={t("contact.email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Mobile and Country Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <input
              type="tel"
              id="mobile"
              {...register("mobile", {
                required: t("contact.errors.mobileRequired"),
                pattern: {
                  value: /^[0-9+\-\s()]+$/,
                  message: t("contact.errors.mobileInvalid"),
                },
              })}
              className="w-full rounded-lg border border-white bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
              placeholder={t("contact.mobile")}
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-400">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <select
                id="country"
                {...register("country", {
                  required: t("contact.errors.countryRequired"),
                })}
                className="w-full appearance-none rounded-lg border border-white bg-transparent px-4 py-3 pr-10 text-white outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                style={{
                  color: countryValue ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                }}
              >
                <option
                  value=""
                  className="bg-[#040dbf]"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  {t("contact.country")}
                </option>
                {countries.map((country) => (
                  <option
                    key={country}
                    value={country}
                    className="bg-[#040dbf] text-white"
                  >
                    {country}
                  </option>
                ))}
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3"
                style={{
                  color: countryValue ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg
                  className={`mr-4 h-3 w-3 ${
                    countryValue ? "text-white" : "text-white/50"
                  }`}
                  viewBox="0 0 12 8"
                  fill="none"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="currentColor"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {errors.country && (
              <p className="mt-1 text-sm text-red-400">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        {/* Message (Optional) */}
        <div>
          <textarea
            id="message"
            {...register("message")}
            rows={6}
            className="w-full rounded-lg font-title border border-white bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20 resize-none"
            placeholder={t("contact.messageOptional")}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="rounded-lg bg-[#F37406] px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 active:scale-95"
          >
            {t("contact.submit")}
          </button>
        </div>
      </div>
    </div>
  )
}
