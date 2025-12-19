"use client";

import { FiCreditCard, FiShield } from "react-icons/fi";
import { useEffect } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SyncedBackground from "@/components/SyncedBackground";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPaymentConfig } from "@/lib/paymentConfig";

const PAYMENT_URL = (process.env.NEXT_PUBLIC_PAYMENT_URL ?? "").trim();
const PAYMENT_SCENARIO = (process.env.NEXT_PUBLIC_PAYMENT_SCENARIO ?? "").trim();
const PAYMENT_TEXT_NL = (process.env.NEXT_PUBLIC_PAYMENT_TEXT ?? "").trim();
const PAYMENT_BUTTON_TEXT_NL = (process.env.NEXT_PUBLIC_PAYMENT_BUTTON_TEXT ?? "").trim();

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

useEffect(() => {
  if (!hasPaymentUrl || !PAYMENT_URL) return;

  try {
    window.location.replace(PAYMENT_URL);
  } catch {
    try {
      window.location.href = PAYMENT_URL;
    } catch {
      console.log("Redirect faalt, gebruiker kan alsnog op de knop klikken");
    }
  }
}, [hasPaymentUrl]);


  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <SyncedBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-black/70"
        aria-hidden="true"
      />
      
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
                Geef{" "}
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                  geld
                </span>
                !
              </h1>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm supports-[backdrop-filter]:bg-white/[0.03] transition-all duration-700 hover:backdrop-blur-lg animate-fade-in-up">
              <div className="relative z-10 flex flex-col items-center px-10 sm:px-12 md:px-14 py-7 sm:py-8 md:py-9 text-center space-y-4">

              <div className="max-w-md">
                <p className="text-lg sm:text-xl md:text-xl font-semibold text-gray-100 leading-relaxed">
                  {paymentText}
                </p>
              </div>

                <div className="pt-1 w-full flex flex-col items-center gap-3">
                  {hasPaymentUrl ? (
                    <>
                      <a
                        href={PAYMENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-lg border border-purple-400/40 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 px-10 sm:px-12 py-4 text-base sm:text-lg font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/60 hover:from-purple-500/30 hover:to-indigo-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] active:translate-y-0"
                      >
                        <FiCreditCard className="h-5 w-5 text-purple-200 transition-transform group-hover/btn:rotate-12" />
                        <span className="relative z-10">{buttonText}</span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/10 to-indigo-400/10 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                      </a>
                      
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400/60 uppercase tracking-wider">
                        <FiShield className="h-3 w-3" />
                        <span>Secure Payment Link</span>
                      </div>
                    </>
                  ) : (
                    <div className="inline-flex items-center justify-center rounded-lg border border-gray-400/30 bg-gray-500/10 px-8 py-4 text-base text-gray-300 backdrop-blur-sm">
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
