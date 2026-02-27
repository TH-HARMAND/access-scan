"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });

    if (resetError) {
      setError("Erreur lors de l'envoi. Vérifiez votre email.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

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
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Envoi..." : "Envoyer le lien"}
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
