"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Listen for PASSWORD_RECOVERY event (fired after code exchange)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
        setChecking(false);
      }
    });

    // Handle the code in URL (PKCE flow) — Supabase adds ?code=... to redirectTo
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error: exchangeError }) => {
        if (exchangeError) {
          // Code invalid or expired
          setChecking(false);
        }
        // If success, onAuthStateChange will fire PASSWORD_RECOVERY
        // Clean URL
        window.history.replaceState({}, "", "/auth/update-password");
      });
    } else {
      // No code — check if user already has a session (e.g. page refresh)
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setReady(true);
        }
        setChecking(false);
      });
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError("Erreur lors de la mise à jour. Demandez un nouveau lien.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 2000);
  };

  if (checking) {
    return (
      <main className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm mt-4">Vérification du lien...</p>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-600">Access</span>Scan
          </Link>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
          <p className="text-orange-700 text-lg font-medium mb-2">Lien expiré ou invalide</p>
          <p className="text-orange-600 text-sm">
            Demandez un nouveau lien de réinitialisation.
          </p>
          <Link
            href="/auth/reset-password"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Nouveau lien
          </Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-600">Access</span>Scan
          </Link>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-green-700 text-lg font-medium mb-2">Mot de passe mis à jour !</p>
          <p className="text-green-600 text-sm">Redirection en cours...</p>
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
        <p className="text-gray-500 mt-2">Nouveau mot de passe</p>
      </div>

      <form onSubmit={handleUpdate} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Minimum 6 caractères"
            required
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Retapez le mot de passe"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
        </button>
      </form>
    </main>
  );
}
