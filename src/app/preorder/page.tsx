"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/Container";
import Image from "next/image";
import { ComingSoonButton } from "@/components/ComingSoonButton";
import {
  PREORDER_ROLES,
  PREORDER_SCHOOL_TYPES,
  PREORDER_GRADE_LEVELS,
  PREORDER_HOW_HEARD_OPTIONS,
} from "@/lib/preorder";

const BULK_TIERS = [
  { range: "1–24",    discount: "25%", price: "$24.00" },
  { range: "25–49",   discount: "30%", price: "$22.40" },
  { range: "50–99",   discount: "35%", price: "$20.80" },
  { range: "100–249", discount: "40%", price: "$19.20" },
  { range: "250–499", discount: "45%", price: "$17.60" },
  { range: "500+",    discount: "50%", price: "$16.00" },
];

const RETAILERS = ["Amazon", "Barnes & Noble", "Bookshop.org", "Books-a-Million", "Other"];

// Formspree's own honeypot convention: a field named "_gotcha" is silently
// discarded server-side (still returns success) when filled by a bot.
const HONEYPOT_FIELD = "_gotcha";

function isLikelyRealConfirmation(value: string) {
  const trimmed = value.trim();
  // Retailer confirmation numbers vary in format, but every one we've seen
  // has both letters/digits and some length — this just filters out empty
  // or throwaway junk like "n/a" or "x". It can't verify the order is real.
  return trimmed.length >= 5 && /[0-9]/.test(trimmed);
}

export default function PreorderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    retailer: "",
    confirmation: "",
    role: "",
    location: "",
    schoolName: "",
    schoolType: "",
    gradeLevel: "",
    howHeard: "",
    emailOptIn: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const honeypot = (e.target as HTMLFormElement)[HONEYPOT_FIELD] as HTMLInputElement | undefined;
    if (honeypot?.value) {
      // Bot filled the hidden field — pretend success without submitting.
      setStatus("success");
      return;
    }

    if (!isLikelyRealConfirmation(form.confirmation)) {
      setValidationError(
        "That doesn't look like a real confirmation number — please double check your order confirmation email."
      );
      return;
    }
    setValidationError("");

    setStatus("sending");
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
            Order <em>UDL for Little Learners</em> before it launches in December and Jeff will
            send you exclusive bonus content as a thank-you — no strings attached.
          </p>
        </div>

        {/* Step 1 */}
        <div className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue font-display font-bold text-white">1</span>
            <h2 className="font-display text-xl font-bold text-text">Pre-order from any retailer</h2>
          </div>
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-white p-8 shadow-sm sm:flex-row sm:items-start">
            <Image
              src="/images/cover.png"
              alt="UDL for Little Learners book cover"
              width={140}
              height={185}
              className="shrink-0 rounded-xl shadow-lg"
            />
            <div className="w-full space-y-3">
              <p className="text-sm text-text-light">
                Click any retailer below to place your order. Your order confirmation email will
                include a confirmation number — keep it handy for Step 2.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://www.amazon.com/UDL-Little-Learners-Practical-Strategies/dp/1394414668/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
                >
                  Amazon
                </a>
                <a
                  href="https://www.barnesandnoble.com/w/udl-for-little-learners-jeff-horwitz/1149946557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
                >
                  Barnes &amp; Noble
                </a>
                <ComingSoonButton label="Bookshop.org" />
                <ComingSoonButton label="Books-a-Million" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange font-display font-bold text-white">2</span>
            <h2 className="font-display text-xl font-bold text-text">Submit your order confirmation</h2>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <p className="text-sm text-text-light">
              Fill out the form below with your name, email, and the order confirmation number
              from your retailer confirmation email. Make sure you have your order confirmation
              handy before submitting.
            </p>

            {status === "success" ? (
              <div className="mt-6 rounded-xl bg-green/10 p-6 text-center">
                <p className="font-display text-lg font-bold text-green">Got it — thank you!</p>
                <p className="mt-1 text-sm text-text-light">
                  Your bonus content is ready right now. Click below to access it.
                </p>
                <a
                  href={`/preorder/resources?role=${encodeURIComponent(form.role)}`}
                  className="mt-4 inline-block rounded-full bg-orange px-8 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark"
                >
                  Access My Bonus Content →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Honeypot — hidden from real users, bots tend to fill every field */}
                <input
                  type="text"
                  name={HONEYPOT_FIELD}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
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
                    minLength={5}
                    value={form.confirmation}
                    onChange={handleChange}
                    placeholder="e.g. 113-4567890-1234567"
                    className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                  />
                  <p className="mt-1 text-xs text-text-light">
                    Found in your confirmation email from the retailer.
                  </p>
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-text">
                    Your role
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={form.role}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                  >
                    <option value="">Select your role…</option>
                    {PREORDER_ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-text">
                    Location (city, state/province)
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Austin, TX"
                    className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                  />
                </div>
                <div>
                  <label htmlFor="schoolName" className="block text-sm font-medium text-text">
                    School / organization (optional)
                  </label>
                  <input
                    id="schoolName"
                    name="schoolName"
                    type="text"
                    value={form.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. Maple Street Elementary"
                    className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                  />
                </div>
                <div>
                  <label htmlFor="schoolType" className="block text-sm font-medium text-text">
                    School type (optional)
                  </label>
                  <select
                    id="schoolType"
                    name="schoolType"
                    value={form.schoolType}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                  >
                    <option value="">Select…</option>
                    {PREORDER_SCHOOL_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="gradeLevel" className="block text-sm font-medium text-text">
                    Grade level(s) you work with (optional)
                  </label>
                  <select
                    id="gradeLevel"
                    name="gradeLevel"
                    value={form.gradeLevel}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                  >
                    <option value="">Select…</option>
                    {PREORDER_GRADE_LEVELS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="howHeard" className="block text-sm font-medium text-text">
                    How did you hear about the book? (optional)
                  </label>
                  <select
                    id="howHeard"
                    name="howHeard"
                    value={form.howHeard}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                  >
                    <option value="">Select…</option>
                    {PREORDER_HOW_HEARD_OPTIONS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-start gap-2 sm:col-span-2">
                  <input
                    id="emailOptIn"
                    name="emailOptIn"
                    type="checkbox"
                    checked={form.emailOptIn}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-border text-orange focus:ring-orange/20"
                  />
                  <label htmlFor="emailOptIn" className="text-sm text-text">
                    Yes, send me occasional updates about UDL resources and Jeff&apos;s future books.
                  </label>
                </div>
                <div className="sm:col-span-2">
                  {validationError && (
                    <p className="mb-3 text-sm text-pink">{validationError}</p>
                  )}
                  {status === "error" && (
                    <p className="mb-3 text-sm text-pink">
                      Something went wrong — please try again or email Jeff directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-full bg-orange px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark disabled:opacity-60 sm:w-auto sm:px-10"
                  >
                    {status === "sending" ? "Sending…" : "Claim My Free Bonus Content"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bulk orders */}
        <div className="mt-12 rounded-2xl border-2 border-dashed border-blue bg-blue/5 p-8">
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
            className="mt-5 block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark sm:inline-block sm:px-10"
          >
            Request a Bulk Order Quote
          </a>
        </div>

      </Container>
    </section>
  );
}
