import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    message: "",
  })

  const countries = ["Malaysia", "Vietnam", "Thailand", "Others"]

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="relative mx-auto max-w-[1520px] px-6 py-20 lg:py-30">
      <div className="text-center mt-30">
        <h2 className="font-title text-3xl font-semibold text-[#01f2f2] sm:text-4xl mb-12">
          Enquire Now
        </h2>
      </div>

      <div className="mx-auto space-y-6">
        {/* Name and Email Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
              placeholder="Name"
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
              placeholder="Email"
            />
          </div>
        </div>

        {/* Mobile and Country Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full rounded-lg border border-white bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
              placeholder="Mobile No."
            />
          </div>

          <div>
            <div className="relative">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-white bg-transparent px-4 py-3 pr-10 text-white outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20"
                style={{
                  color: formData.country
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.5)",
                }}
              >
                <option
                  value=""
                  className="bg-[#040dbf]"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  Country of Residence
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
                  color: formData.country
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg
                  className={`mr-4 h-3 w-3 ${
                    formData.country ? "text-white" : "text-white/50"
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
          </div>
        </div>

        {/* Message */}
        <div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-lg font-title border border-white bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-[#F37406] focus:ring-2 focus:ring-[#F37406]/20 resize-none"
            placeholder="Enter Your Message"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-full bg-[#F37406] px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#f2df79] hover:text-[#040dbf] hover:shadow-xl hover:shadow-[#F37406]/50 active:scale-95"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
