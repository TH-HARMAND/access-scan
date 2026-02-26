"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [credits, setCredits] = useState(0);
  const [cancelled, setCancelled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/credits")
      .then((r) => r.json())
      .then((data) => {
        setLoggedIn(data.logged_in);
        setCredits(data.credits || 0);
      });

    if (typeof window !== "undefined" && window.location.search.includes("payment=cancel")) {
      setCancelled(true);
    }
  }, []);

  const handleBuy = async (product: string) => {
    if (!loggedIn) {
      router.push("/auth/signup");
      return;
    }

    setLoading(product);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Erreur de paiement");
        setLoading(null);
      }
    } catch {
      setError("Erreur de connexion");
      setLoading(null);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-blue-600">Access</span>Scan
        </Link>
        <h1 className="text-3xl font-bold mt-6 mb-2">Rapports PDF professionnels</h1>
        <p className="text-gray-500 text-lg">
          Le scan est gratuit. Achetez des crédits pour télécharger vos rapports PDF.
        </p>
        {loggedIn && (
          <p className="text-blue-600 font-medium mt-2">
            Vous avez {credits} crédit{credits !== 1 ? "s" : ""} restant{credits !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {cancelled && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-center">
          Paiement annulé. Vous pouvez réessayer quand vous voulez.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Single */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-1">1 rapport</h3>
          <p className="text-gray-500 text-sm mb-4">Idéal pour un audit ponctuel</p>
          <p className="text-4xl font-bold mb-1">4,90 <span className="text-lg text-gray-400 font-normal">€</span></p>
          <p className="text-gray-400 text-sm mb-6">4,90 €/rapport</p>
          <div className="mt-auto">
            <button
              onClick={() => handleBuy("single")}
              disabled={loading === "single"}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {loading === "single" ? "Redirection..." : "Acheter"}
            </button>
          </div>
        </div>

        {/* Pack 10 */}
        <div className="bg-white rounded-xl border-2 border-blue-500 p-6 flex flex-col relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            POPULAIRE
          </div>
          <h3 className="text-lg font-bold mb-1">10 rapports</h3>
          <p className="text-gray-500 text-sm mb-4">Pour les développeurs freelance</p>
          <p className="text-4xl font-bold mb-1">19 <span className="text-lg text-gray-400 font-normal">€</span></p>
          <p className="text-gray-400 text-sm mb-1">1,90 €/rapport</p>
          <p className="text-green-600 text-xs font-medium mb-6">Économisez 61%</p>
          <div className="mt-auto">
            <button
              onClick={() => handleBuy("pack10")}
              disabled={loading === "pack10"}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading === "pack10" ? "Redirection..." : "Acheter"}
            </button>
          </div>
        </div>

        {/* Pack 30 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-1">30 rapports</h3>
          <p className="text-gray-500 text-sm mb-4">Pour les agences web</p>
          <p className="text-4xl font-bold mb-1">39 <span className="text-lg text-gray-400 font-normal">€</span></p>
          <p className="text-gray-400 text-sm mb-1">1,30 €/rapport</p>
          <p className="text-green-600 text-xs font-medium mb-6">Économisez 73%</p>
          <div className="mt-auto">
            <button
              onClick={() => handleBuy("pack30")}
              disabled={loading === "pack30"}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {loading === "pack30" ? "Redirection..." : "Acheter"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center space-y-2">
        <p className="text-gray-400 text-sm">
          Paiement sécurisé par Stripe. Les crédits n&apos;expirent jamais.
        </p>
        {!loggedIn && loggedIn !== null && (
          <p className="text-gray-500 text-sm">
            <Link href="/auth/login" className="text-blue-600 hover:underline">Connectez-vous</Link> ou{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">créez un compte</Link> pour acheter.
          </p>
        )}
      </div>

      <footer className="mt-16 pt-6 border-t border-gray-200 text-center space-y-2">
        <div className="flex justify-center gap-6 text-xs text-gray-400">
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
          <Link href="/cgv" className="hover:text-gray-600">CGV</Link>
          <Link href="/confidentialite" className="hover:text-gray-600">Confidentialité</Link>
          <a href="mailto:access.scan64@gmail.com" className="hover:text-gray-600">Contact</a>
        </div>
      </footer>
    </main>
  );
}
