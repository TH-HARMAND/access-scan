"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      if (authError.message.includes("already registered")) {
        setError("Cet email est déjà utilisé. Essayez de vous connecter.");
      } else {
        setError("Erreur lors de l'inscription. Réessayez.");
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Auto-login after signup (if email confirmation is disabled in Supabase)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!loginError) {
      router.push("/");
      router.refresh();
    }
  };

  if (success) {
    return (
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-600">Access</span>Scan
          </Link>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-green-700 text-lg font-medium mb-2">Compte créé !</p>
          <p className="text-green-600 text-sm">
            Si vous n&apos;êtes pas redirigé automatiquement, vérifiez votre email pour confirmer votre compte.
          </p>
          <Link href="/auth/login" className="inline-block mt-4 text-blue-600 hover:underline font-medium">
            Se connecter
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
        <p className="text-gray-500 mt-2">Créer un compte gratuit</p>
      </div>

      <form onSubmit={handleSignup} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

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

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </form>
    </main>
  );
}
