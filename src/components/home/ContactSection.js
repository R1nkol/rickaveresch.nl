"use client";

import { useCallback, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

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

  return (
    <section id="contact" className="section-shell contact-section">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <h2 className="section-heading max-w-[10ch]">{t("contact.heading")}</h2>
          <p className="max-w-md text-base leading-relaxed text-muted">
            {t("contact.description")}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="contact-form p-5 sm:p-8"
        >
          <div className="relative grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-gray-200">
              {t("contact.form.name.label")}
              <div className="relative mt-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  required
                  autoComplete="name"
                  className="form-field"
                  placeholder={t("contact.form.name.placeholder")}
                />
              </div>
            </label>
            <label className="text-sm font-medium text-gray-200">
              {t("contact.form.email.label")}
              <div className="relative mt-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  required
                  autoComplete="email"
                  className="form-field"
                  placeholder={t("contact.form.email.placeholder")}
                />
              </div>
            </label>
          </div>
          <label className="relative mt-5 block text-sm font-medium text-gray-200">
            {t("contact.form.message.label")}
            <div className="relative mt-2">
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={updateField("message")}
                required
                className="form-field"
                placeholder={t("contact.form.message.placeholder")}
              ></textarea>
            </div>
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="button-primary mt-6 w-full md:w-auto"
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
