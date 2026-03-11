"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [expiredWarning, setExpiredWarning] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (searchParams.get("error") === "expired") {
      setExpiredWarning(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleReset = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;
    setLoading(true);
    setError("");
    setExpiredWarning(false);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur lors de l'envoi. Réessayez plus tard.");
        setLoading(false);
        return;
      }
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion et réessayez.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
    setCooldown(60);
  }, [email, cooldown]);

  if (sent) {
    return (
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-600">Access</span>Scan
          </Link>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-green-700 text-lg font-medium mb-2">Email envoyé !</p>
          <p className="text-green-600 text-sm">
            Si un compte existe avec l&apos;adresse <span className="font-medium">{email}</span>, vous recevrez un lien pour réinitialiser votre mot de passe.
          </p>
          <p className="text-gray-400 text-xs mt-4">Pensez à vérifier vos spams.</p>
          <Link href="/auth/login" className="inline-block mt-4 text-blue-600 hover:underline font-medium text-sm">
            Retour à la connexion
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-blue-600">Access</span>Scan
        </Link>
        <p className="text-gray-500 mt-2">Réinitialiser votre mot de passe</p>
      </div>

      {expiredWarning && (
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl text-center">
          <p className="text-orange-700 font-medium">Votre lien a expiré ou est invalide.</p>
          <p className="text-orange-600 text-sm mt-1">Demandez-en un nouveau ci-dessous.</p>
        </div>
      )}

      <form onSubmit={handleReset} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <p className="text-sm text-gray-600">
          Entrez votre adresse email. Vous recevrez un lien pour créer un nouveau mot de passe.
        </p>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="vous@exemple.fr"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || cooldown > 0}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Envoi..." : cooldown > 0 ? `Réessayer dans ${cooldown}s` : "Envoyer le lien"}
        </button>

        <p className="text-center text-sm text-gray-500">
          <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
            Retour à la connexion
          </Link>
        </p>
      </form>
    </main>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <main className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm mt-4">Chargement...</p>
      </main>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
