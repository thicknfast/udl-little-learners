"use client";

import { useState, useSyncExternalStore, FormEvent } from "react";
import { PREORDER_ROLES } from "@/lib/preorder";

const STORAGE_KEY = "udl-resource-access";
const HONEYPOT_FIELD = "_gotcha";

interface Props {
  title: string;
  downloadFile: string | null;
  externalUrl: string | null;
}

function hasAccess() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberAccess() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Private mode etc. — they'll just see the form again next time.
  }
}

export function ResourceGate({ title, downloadFile, externalUrl }: Props) {
  // "pending" during server render, so returning visitors don't see the form flash.
  const stored = useSyncExternalStore(
    () => () => {},
    () => (hasAccess() ? "yes" : "no"),
    () => "pending",
  );
  const [justUnlocked, setJustUnlocked] = useState(false);
  const unlocked = justUnlocked || stored === "yes";
  const [form, setForm] = useState({ name: "", email: "", role: "", newsletter: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const honeypot = (e.target as HTMLFormElement)[HONEYPOT_FIELD] as HTMLInputElement | undefined;
    if (honeypot?.value) {
      setJustUnlocked(true);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/resource-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, resource: title }),
      });
      if (!res.ok) throw new Error();
      rememberAccess();
      setJustUnlocked(true);
    } catch {
      setStatus("error");
    }
  }

  // Avoid flashing the form for returning visitors.
  if (stored === "pending") return <div className="mt-6 h-12" />;

  if (unlocked) {
    return (
      <div className="mt-6 flex flex-wrap gap-3">
        {downloadFile && (
          <a
            href={downloadFile}
            download
            className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-teal-dark"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        )}
        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-blue/90"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open Resource
          </a>
        )}
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-blue focus:ring-2 focus:ring-blue/20";

  return (
    <div className="mt-6 max-w-xl rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-bold text-text">Get this free resource</h2>
      <p className="mt-1 text-sm text-text-light">
        Tell us a little about yourself and the download unlocks right away. You&apos;ll only
        need to do this once.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="gate-name" className="block text-sm font-medium text-text">Name</label>
            <input id="gate-name" name="name" type="text" required value={form.name}
              onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label htmlFor="gate-email" className="block text-sm font-medium text-text">Email</label>
            <input id="gate-email" name="email" type="email" required value={form.email}
              onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="gate-role" className="block text-sm font-medium text-text">Role</label>
          <select id="gate-role" name="role" required value={form.role}
            onChange={handleChange} className={inputClass}>
            <option value="">Select…</option>
            {PREORDER_ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="text-sm font-medium text-text">
            Would you like Jeff&apos;s newsletter with practical UDL strategies and new resources?
          </legend>
          <div className="mt-2 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-text">
              <input type="radio" name="newsletter" value="yes" required
                checked={form.newsletter === "yes"} onChange={handleChange}
                className="h-4 w-4 text-orange focus:ring-orange/20" />
              Yes, sign me up
            </label>
            <label className="flex items-center gap-2 text-sm text-text">
              <input type="radio" name="newsletter" value="no"
                checked={form.newsletter === "no"} onChange={handleChange}
                className="h-4 w-4 text-orange focus:ring-orange/20" />
              No thanks, just the resource
            </label>
          </div>
        </fieldset>
        {status === "error" && (
          <p className="text-sm text-pink">Something went wrong — please try again in a moment.</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-orange px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {status === "sending" ? "Unlocking…" : "Unlock the Download"}
        </button>
      </form>
    </div>
  );
}
