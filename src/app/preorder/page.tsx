"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/Container";
import Image from "next/image";

const BULK_TIERS = [
  { range: "1–24",    discount: "25%", price: "$24.00" },
  { range: "25–49",   discount: "30%", price: "$22.40" },
  { range: "50–99",   discount: "35%", price: "$20.80" },
  { range: "100–249", discount: "40%", price: "$19.20" },
  { range: "250–499", discount: "45%", price: "$17.60" },
  { range: "500+",    discount: "50%", price: "$16.00" },
];

const RETAILERS = ["Amazon", "Barnes & Noble", "Bookshop.org", "Books-a-Million", "Other"];

export default function PreorderPage() {
  const [form, setForm] = useState({ name: "", email: "", retailer: "", confirmation: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mrevjaze", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: `Pre-order Bonus Claim — ${form.name}`,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-12">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-orange/15 px-4 py-1 text-sm font-bold text-orange">
            Pre-Order Offer
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-blue sm:text-4xl">
            Pre-Order &amp; Get Free Bonus Content
          </h1>
          <p className="mt-4 text-lg text-text-light leading-relaxed">
            Pre-order <em>UDL for Little Learners</em> from any retailer before it launches in
            December, then submit your order confirmation below. Jeff will send your exclusive
            bonus content by email — no strings attached.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
          {/* Book cover + buy links */}
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-white p-8 shadow-sm">
            <Image
              src="/images/cover.png"
              alt="UDL for Little Learners book cover"
              width={200}
              height={265}
              className="rounded-xl shadow-lg"
            />
            <div className="w-full space-y-3">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-text-light">
                Pre-order now at
              </p>
              <a
                href="https://www.amazon.com/UDL-Little-Learners-Practical-Strategies/dp/1394414668/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Amazon
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Barnes &amp; Noble
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Bookshop.org
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Books-a-Million
              </a>
            </div>
          </div>

          {/* Claim form */}
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <h2 className="font-display text-xl font-bold text-text">
                Claim Your Free Bonus Content
              </h2>
              <p className="mt-2 text-sm text-text-light">
                Pre-order from any retailer, then fill out this form with your order
                confirmation number. Jeff will send your bonus content by email before
                launch day.
              </p>

              {status === "success" ? (
                <div className="mt-6 rounded-xl bg-green/10 p-5 text-center">
                  <p className="font-display font-bold text-green">Got it — thank you!</p>
                  <p className="mt-1 text-sm text-text-light">
                    Jeff will send your free bonus content to the email you provided before
                    the book launches in December.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="retailer" className="block text-sm font-medium text-text">
                      Where did you order?
                    </label>
                    <select
                      id="retailer"
                      name="retailer"
                      required
                      value={form.retailer}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                    >
                      <option value="">Select a retailer…</option>
                      {RETAILERS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="confirmation" className="block text-sm font-medium text-text">
                      Order confirmation number
                    </label>
                    <input
                      id="confirmation"
                      name="confirmation"
                      type="text"
                      required
                      value={form.confirmation}
                      onChange={handleChange}
                      placeholder="e.g. 113-4567890-1234567"
                      className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                    />
                    <p className="mt-1 text-xs text-text-light">
                      Found in your order confirmation email from the retailer.
                    </p>
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-pink">
                      Something went wrong — please try again or email Jeff directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-full bg-orange px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Claim My Free Bonus Content"}
                  </button>
                </form>
              )}
            </div>

            {/* Bulk orders */}
            <div className="rounded-2xl border-2 border-dashed border-blue bg-blue/5 p-8">
              <h2 className="font-display text-xl font-bold text-blue">
                Bulk Orders
              </h2>
              <p className="mt-2 text-sm text-text-light">
                Ordering for a school, district, or professional development event? Take
                advantage of significant discounts — plus direct-to-school shipping and
                tailored quotes for large events or districts.
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-blue text-white">
                    <tr>
                      <th className="px-4 py-2 text-left font-display font-bold">Quantity</th>
                      <th className="px-4 py-2 text-left font-display font-bold">Discount</th>
                      <th className="px-4 py-2 text-left font-display font-bold">Price / Copy*</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    {BULK_TIERS.map((tier) => (
                      <tr key={tier.range} className="hover:bg-cream transition-colors">
                        <td className="px-4 py-2 font-medium text-text">{tier.range}</td>
                        <td className="px-4 py-2 font-bold text-green">{tier.discount}</td>
                        <td className="px-4 py-2 text-text">{tier.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-text-light">
                *Does not include applicable tax or shipping.
              </p>

              <a
                href="#"
                className="mt-5 block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Request a Bulk Order Quote
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
