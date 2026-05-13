"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/Container";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "@edtech_jeff",
    href: "https://www.instagram.com/edtech_jeff",
  },
  {
    label: "X (Twitter)",
    handle: "@mrteachersir",
    href: "https://x.com/mrteachersir",
  },
  {
    label: "LinkedIn",
    handle: "Jeff Horwitz",
    href: "https://www.linkedin.com/in/jeff-horwitz-302b1326",
  },
  {
    label: "Bio Site",
    handle: "bio.site/edtech_jeff",
    href: "https://bio.site/edtech_jeff",
  },
];

const REQUEST_TYPES = ["Speaking", "Podcast", "Consulting", "Other"];

export default function ConnectPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-12">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
          Connect with Jeff
        </h1>
        <p className="mt-2 text-text-light">
          Interested in having Jeff speak at your school, conference, or podcast?
          Reach out below.
        </p>

        <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Contact form */}
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-text">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-text">
                  I&apos;m interested in...
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                >
                  <option value="">Select an option</option>
                  {REQUEST_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-blue px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-blue-dark disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "sent" && (
                <p className="text-sm font-medium text-green">
                  Message sent! Jeff will be in touch.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-pink">
                  Something went wrong. Please try again or email Jeff directly.
                </p>
              )}
            </form>
          </div>

          {/* Social links sidebar */}
          <div className="lg:w-72">
            <h2 className="font-display text-xl font-bold text-text">
              Find Jeff Online
            </h2>
            <div className="mt-4 space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 transition hover:border-blue/30 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-text">{link.label}</p>
                    <p className="text-xs text-text-light">{link.handle}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-text">
                Consulting
              </h3>
              <a
                href="https://bio.site/edtech_jeff"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm text-blue hover:underline"
              >
                Horwitz Consulting Group
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
