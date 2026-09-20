"use client";

import { FiCreditCard } from "react-icons/fi";
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

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 md:py-28">
          <div className="mx-auto w-full max-w-2xl space-y-12">
            
            <div className="text-center space-y-4">
              <h1 className="page-heading">Geef geld!</h1>
            </div>

            <div className="surface-panel">
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
                        className="button-primary w-full sm:w-auto"
                      >
                        <FiCreditCard className="h-5 w-5" />
                        <span className="relative z-10">{buttonText}</span>
                      </a>
                    </>
                  ) : (
                    <div className="text-base text-muted">
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
