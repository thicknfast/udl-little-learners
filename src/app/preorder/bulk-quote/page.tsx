"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/Container";
import Image from "next/image";
import { BULK_ORDER_TIERS } from "@/lib/preorder";

const HONEYPOT_FIELD = "_gotcha";

export default function BulkQuotePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    quantity: "",
    timeline: "",
    location: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const honeypot = (e.target as HTMLFormElement)[HONEYPOT_FIELD] as HTMLInputElement | undefined;
    if (honeypot?.value) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/bulk-quote", {
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
        <div className="mx-auto max-w-2xl text-center">
          <Image
            src="/images/cover.png"
            alt="UDL for Little Learners book cover"
            width={100}
            height={132}
            className="mx-auto rounded-xl shadow-lg"
          />
          <h1 className="mt-6 font-display text-3xl font-extrabold text-blue sm:text-4xl">
            Request a Bulk Order Quote
          </h1>
          <p className="mt-4 text-lg text-text-light leading-relaxed">
            Ordering <em>UDL for Little Learners</em>{" "}
            for a school, district, or PD event? Tell Jeff a bit about your order and
            he&apos;ll follow up with a tailored quote.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-xl overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-blue text-white">
              <tr>
                <th className="px-4 py-2 text-left font-display font-bold">Quantity</th>
                <th className="px-4 py-2 text-left font-display font-bold">Discount</th>
                <th className="px-4 py-2 text-left font-display font-bold">Price / Copy*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {BULK_ORDER_TIERS.map((tier) => (
                <tr key={tier.range} className="hover:bg-cream transition-colors">
                  <td className="px-4 py-2 font-medium text-text">{tier.range}</td>
                  <td className="px-4 py-2 font-bold text-green">{tier.discount}</td>
                  <td className="px-4 py-2 text-text">{tier.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-2 max-w-xl text-xs text-text-light">
          *Does not include applicable tax or shipping.
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-white p-8 shadow-sm">
          {status === "success" ? (
            <div className="text-center">
              <p className="font-display text-lg font-bold text-green">Request received!</p>
              <p className="mt-1 text-sm text-text-light">
                Jeff will follow up by email with a tailored quote.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
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
                <label htmlFor="phone" className="block text-sm font-medium text-text">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 555-5555"
                  className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-text">
                  School / district / organization
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="e.g. Maple Street Elementary"
                  className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-text">
                  Estimated quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  required
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 40 copies"
                  className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-text">
                  Needed by (optional)
                </label>
                <input
                  id="timeline"
                  name="timeline"
                  type="text"
                  value={form.timeline}
                  onChange={handleChange}
                  placeholder="e.g. before our August PD day"
                  className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-text">
                  Shipping location (city, state)
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Austin, TX"
                  className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-text">
                  Anything else Jeff should know? (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Event details, PO requirements, etc."
                  className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>
              <div className="sm:col-span-2">
                {status === "error" && (
                  <p className="mb-3 text-sm text-pink">
                    Something went wrong — please try again or email Jeff directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-blue px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-blue-dark disabled:opacity-60 sm:w-auto sm:px-10"
                >
                  {status === "sending" ? "Sending…" : "Request My Quote"}
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
