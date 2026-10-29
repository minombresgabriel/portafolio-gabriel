"use client";

import { useRef, useState, type FormEvent } from "react";
import { profile } from "@/data/portfolio";
import { useSpace } from "@/lib/store";
import { SendIcon } from "./icons";

const RECAPTCHA_KEY = "6LenyIArAAAAAPgXu-qESFv2bMmMRBDKMyhsOit2";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// Fetch the token at submit time: v3 tokens expire after two minutes.
const recaptchaToken = () =>
  new Promise<string>((resolve) => {
    const g = window.grecaptcha;
    if (!g) return resolve("");
    const timeout = setTimeout(() => resolve(""), 2500);
    g.ready(() =>
      g
        .execute(RECAPTCHA_KEY, { action: "submit" })
        .then((t) => resolve(t))
        .catch(() => resolve(""))
        .finally(() => clearTimeout(timeout)),
    );
  });

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/35 focus:bg-white/[0.05]";

/** Posts to FormSubmit. In the 3D experience it first launches a light toward Earth. */
export function ContactForm({ launch = false }: { launch?: boolean }) {
  const form = useRef<HTMLFormElement>(null);
  const token = useRef<HTMLInputElement>(null);
  const [sending, setSending] = useState(false);
  const launchMessage = useSpace((s) => s.launchMessage);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || !form.current) return;
    setSending(true);
    if (token.current) token.current.value = await recaptchaToken();
    if (launch) {
      launchMessage();
      await new Promise((r) => setTimeout(r, 1700));
    }
    form.current.submit();
  };

  return (
    <form
      ref={form}
      action={`https://formsubmit.co/${profile.email}`}
      method="POST"
      onSubmit={onSubmit}
      className="grid gap-3"
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://portafolio-gabriel-avq9.vercel.app/gracias" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <input ref={token} type="hidden" name="g-recaptcha-response" />

      <label className="sr-only" htmlFor="cf-name">Name</label>
      <input id="cf-name" type="text" name="name" required placeholder="Name" className={field} />
      <label className="sr-only" htmlFor="cf-email">Email</label>
      <input id="cf-email" type="email" name="email" required placeholder="Email" className={field} />
      <label className="sr-only" htmlFor="cf-message">Message</label>
      <textarea id="cf-message" name="message" rows={4} required placeholder="Message" className={`${field} resize-none`} />
      <button
        type="submit"
        disabled={sending}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-white transition hover:border-white/60 hover:bg-white/[0.06] disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"} <SendIcon />
      </button>
    </form>
  );
}
