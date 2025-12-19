"use client";

import { useCallback, useState } from "react";
import { FiArrowUpRight, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((field) => (event) => {
    const { value } = event.target;
    setFormData((previous) => ({ ...previous, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const name = formData.name.trim();
      const email = formData.email.trim();
      const message = formData.message.trim();

      if (!name || !email || !message) {
        setStatus({ type: "error", message: t("contact.form.feedback.validation") });
        return;
      }

      setIsSubmitting(true);
      setStatus({ type: null, message: "" });

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        setStatus({ type: "success", message: t("contact.form.feedback.success") });
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.error("Unable to submit contact form", error);
        setStatus({ type: "error", message: t("contact.form.feedback.error") });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, t],
  );

  const heading = t("contact.heading");
  const headingParts = heading.split(" ");
  const highlight = headingParts.pop();
  const prefix = headingParts.join(" ");

  return (
    <section id="contact" className="relative px-4 pb-32">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_rgba(3,7,18,0))]" />
      <div className="absolute right-6 top-16 -z-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="mx-auto grid w-full max-w-6xl items-start gap-16 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold md:text-5xl text-white">
            {prefix ? `${prefix} ` : ""}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
              {highlight}
            </span>
          </h2>
          <p className="max-w-xl text-base text-gray-200">
            {t("contact.description")}
          </p>
          <div className="grid gap-3 text-sm text-gray-300"></div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] p-8 shadow-[0_6px_12px_-4px_rgba(79,70,229,0.25)] supports-[backdrop-filter]:bg-white/[0.12]"
        >
          <div className="absolute -top-24 left-0 h-44 w-44 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-0 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-gray-200">
              {t("contact.form.name.label")}
              <div className="relative mt-2">
                <FiUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  required
                  autoComplete="name"
                  className="block w-full rounded-xl border border-white/15 bg-white/10 pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  placeholder={t("contact.form.name.placeholder")}
                />
              </div>
            </label>
            <label className="text-sm font-medium text-gray-200">
              {t("contact.form.email.label")}
              <div className="relative mt-2">
                <FiMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  required
                  autoComplete="email"
                  className="block w-full rounded-xl border border-white/15 bg-white/10 pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  placeholder={t("contact.form.email.placeholder")}
                />
              </div>
            </label>
          </div>
          <label className="relative mt-5 block text-sm font-medium text-gray-200">
            {t("contact.form.message.label")}
            <div className="relative mt-2">
              <FiMessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={updateField("message")}
                required
                className="block w-full rounded-2xl border border-white/15 bg-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder={t("contact.form.message.placeholder")}
              ></textarea>
            </div>
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-200/40 bg-purple-500/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-purple-200/60 hover:bg-purple-500/40 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
            <FiArrowUpRight className="text-base" />
          </button>
          {status.message ? (
            <p
              className={`mt-4 text-sm ${
                status.type === "success" ? "text-emerald-200" : "text-rose-200"
              }`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
