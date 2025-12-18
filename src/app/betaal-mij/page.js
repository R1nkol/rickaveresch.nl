"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SyncedBackground from "@/components/SyncedBackground";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPaymentConfig } from "@/lib/paymentConfig";

// Environment variables - alles kan direct in .env.local worden aangepast
// Zet NEXT_PUBLIC_PAYMENT_SCENARIO op: "donation", "poker", of "default" (of leeg laten)
// Als scenario is ingesteld (en niet "default"), gebruik die teksten
// Als scenario NIET is ingesteld of "default", gebruik NEXT_PUBLIC_PAYMENT_TEXT_NL en NEXT_PUBLIC_PAYMENT_BUTTON_TEXT_NL
const PAYMENT_URL = (process.env.NEXT_PUBLIC_PAYMENT_URL ?? "").trim();
const PAYMENT_SCENARIO = (process.env.NEXT_PUBLIC_PAYMENT_SCENARIO ?? "").trim();
const PAYMENT_TEXT_NL = (process.env.NEXT_PUBLIC_PAYMENT_TEXT_NL ?? "").trim();
const PAYMENT_BUTTON_TEXT_NL = (process.env.NEXT_PUBLIC_PAYMENT_BUTTON_TEXT_NL ?? "").trim();

export default function PaymentPage() {
  const { t } = useLanguage();
  const hasPaymentUrl = Boolean(PAYMENT_URL);
  
  const hasScenario = PAYMENT_SCENARIO && PAYMENT_SCENARIO !== "default";
  
  const scenarioConfigNL = hasScenario ? getPaymentConfig(PAYMENT_SCENARIO, "nl") : null;
  
  const paymentText = hasScenario 
    ? (scenarioConfigNL?.text || t("paymentPage.description"))
    : (PAYMENT_TEXT_NL || t("paymentPage.description"));
  
  const buttonText = hasScenario
    ? (scenarioConfigNL?.buttonText || t("paymentPage.cta"))
    : (PAYMENT_BUTTON_TEXT_NL || t("paymentPage.cta"));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <SyncedBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-black/70"
        aria-hidden="true"
      />
      
      {/* Background decorations similar to other sections */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.2),_rgba(3,7,18,0))]" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 md:py-28">
          <div className="mx-auto w-full max-w-2xl space-y-12">
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold md:text-5xl">
                Betaal{" "}
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                  Mij
                </span>
              </h1>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-[0_4px_10px_rgba(5,6,25,0.15)] backdrop-blur-sm supports-[backdrop-filter]:bg-white/[0.05] transition-all duration-500 hover:border-purple-300/40 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)]">
              {/* Gradient overlay op hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10" />
              </div>
              
              <div className="relative z-10 p-10 sm:p-14 md:p-16 text-center space-y-8">
                <div className="space-y-4">
                  <p className="text-base sm:text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
                    {paymentText}
                  </p>
                </div>

                <div className="pt-4">
                  {hasPaymentUrl ? (
                    <a
                      href={PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-center rounded-2xl border border-purple-400/40 bg-purple-500/20 px-10 py-4 text-lg font-semibold text-white shadow-[0_8px_32px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/60 hover:bg-purple-500/30 hover:shadow-[0_12px_48px_rgba(168,85,247,0.4)] active:translate-y-0"
                    >
                      <span className="relative z-10">{buttonText}</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center rounded-xl border border-gray-400/30 bg-gray-500/10 px-8 py-4 text-base text-gray-300 backdrop-blur-sm">
                      {t("paymentPage.missingLink")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
