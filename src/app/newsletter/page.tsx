"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/Container";
import Image from "next/image";

const HONEYPOT_FIELD = "_gotcha";

export default function NewsletterPage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const honeypot = (e.target as HTMLFormElement)[HONEYPOT_FIELD] as HTMLInputElement | undefined;
    if (honeypot?.value) {
      // Bot filled the hidden field — pretend success without submitting.
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
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
        <div className="mx-auto max-w-xl text-center">
          <Image
            src="/images/cover.png"
            alt="UDL for Little Learners book cover"
            width={100}
            height={132}
            className="mx-auto rounded-xl shadow-lg"
          />
          <h1 className="mt-6 font-display text-3xl font-extrabold text-blue sm:text-4xl">
            Get Free UDL Tips &amp; Updates
          </h1>
          <p className="mt-4 text-lg text-text-light leading-relaxed">
            Join the list for practical early childhood UDL strategies, sneak peeks at bonus
            resources, and updates on the book — straight to your inbox, no purchase required.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
          {status === "success" ? (
            <div className="text-center">
              <p className="font-display text-lg font-bold text-green">You&apos;re on the list!</p>
              <p className="mt-1 text-sm text-text-light">
                Keep an eye on your inbox for the first email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  First name (optional)
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane"
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
              {status === "error" && (
                <p className="text-sm text-pink">
                  Something went wrong — please try again in a moment.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-orange px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark disabled:opacity-60"
              >
                {status === "sending" ? "Joining…" : "Join the List"}
              </button>
            </form>
          )}
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-sm text-text-light">
          Already pre-ordered? <a href="/preorder" className="text-blue underline hover:text-blue-dark">Claim your free bonus content here</a> instead.
        </p>
      </Container>
    </section>
  );
}
