"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-blue-600">Access</span>Scan
        </Link>
        <p className="text-gray-500 mt-2">Connexion à votre compte</p>
      </div>

      <form onSubmit={handleLogin} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
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
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
            Créer un compte
          </Link>
        </p>
      </form>
    </main>
  );
}
