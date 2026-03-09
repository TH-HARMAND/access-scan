"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { articles } from "@/lib/blog-articles";

interface AccessIssue {
  criterion: string;
  wcag: string;
  rgaa: string;
  severity: "critical" | "major" | "minor";
  description: string;
  element: string;
  location: string;
  fix: string;
}

interface ScanResult {
  url: string;
  timestamp: string;
  score: number;
  totalChecks: number;
  issuesFound: number;
  issues: AccessIssue[];
  summary: {
    critical: number;
    major: number;
    minor: number;
  };
}

const severityLabels: Record<string, { label: string; color: string; bg: string }> = {
  critical: { label: "Critique", color: "text-red-700", bg: "bg-red-50 border-red-200" },
  major: { label: "Majeur", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  minor: { label: "Mineur", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
};

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-orange-500";
  return "text-red-600";
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Bon";
  if (score >= 60) return "À améliorer";
  if (score >= 40) return "Insuffisant";
  return "Critique";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ScannerClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    fetch("/api/credits")
      .then((r) => r.json())
      .then((data) => {
        setLoggedIn(data.logged_in || false);
        setCredits(data.credits || 0);
      });
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors du scan");
      } else {
        setResult(data);
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1B4F72] no-underline">
            Accessibilité PME
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/outil-accessibilite-web" className="text-gray-700 hover:text-[#1B4F72] no-underline">L&apos;outil</Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#1B4F72] no-underline">Blog</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-[#1B4F72] no-underline">Tarifs</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* SEO heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1B4F72] mb-2">
            Scanner d&apos;accessibilité RGAA gratuit
          </h1>
          <p className="text-gray-500 text-lg">
            Testez la conformité RGAA et WCAG de votre site web en quelques secondes
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Outil d&apos;aide à la démarche — ne constitue pas une certification WCAG
          </p>
        </div>

        {/* Scanner form */}
        <form onSubmit={handleScan} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemple.fr"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-8 py-3 bg-[#1B4F72] text-white rounded-lg text-lg font-medium hover:bg-[#2E86C1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Analyse..." : "Scanner"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500">Analyse en cours...</p>
          </div>
        )}

        {result && (
          <div className="space-y-6 mb-12">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <p className="text-gray-500 mb-2 text-sm">Score d&apos;accessibilité</p>
              <p className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                {result.score}
                <span className="text-2xl text-gray-400">/100</span>
              </p>
              <p className={`text-lg font-medium ${getScoreColor(result.score)}`}>
                {getScoreLabel(result.score)}
              </p>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <span className="text-red-600 font-medium">
                  {result.summary.critical} critique{result.summary.critical !== 1 ? "s" : ""}
                </span>
                <span className="text-orange-600 font-medium">
                  {result.summary.major} majeur{result.summary.major !== 1 ? "s" : ""}
                </span>
                <span className="text-yellow-600 font-medium">
                  {result.summary.minor} mineur{result.summary.minor !== 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-3">
                Analysé le {formatDate(result.timestamp)}
              </p>
            </div>

            {/* PDF / Auth CTA */}
            {!loggedIn ? (
              <Link
                href="/auth/signup"
                className="block w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-center no-underline"
              >
                Créez un compte pour télécharger le PDF
              </Link>
            ) : credits < 1 ? (
              <Link
                href="/pricing"
                className="block w-full py-3 bg-[#1B4F72] text-white rounded-lg font-medium hover:bg-[#2E86C1] transition-colors text-center no-underline"
              >
                Acheter des crédits pour le rapport PDF
              </Link>
            ) : null}

            {result.issues.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-green-700 text-lg font-medium">Aucun problème détecté !</p>
                <p className="text-green-600 text-sm mt-1">Votre page respecte les critères vérifiés.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Corrections prioritaires ({result.issues.length})</h2>
                {result.issues.map((issue, i) => {
                  const sev = severityLabels[issue.severity];
                  return (
                    <div key={i} className={`border rounded-lg p-4 ${sev.bg}`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold">{issue.criterion}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${sev.color} whitespace-nowrap`}>
                          {sev.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">WCAG {issue.wcag} · RGAA {issue.rgaa}</p>
                      <p className="text-sm text-gray-600 mb-1">{issue.description}</p>
                      <p className="text-sm text-green-800 font-medium">→ {issue.fix}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SEO content below scanner */}
        {!result && !loading && !error && (
          <div className="space-y-8 mt-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#1B4F72] mb-3">Qu&apos;est-ce que le RGAA ?</h2>
              <p className="text-sm text-gray-600">
                Le <strong>Référentiel Général d&apos;Amélioration de l&apos;Accessibilité</strong> (RGAA) est le cadre
                français de référence pour l&apos;accessibilité numérique. Basé sur les WCAG 2.1, il comprend 106 critères
                répartis en 13 thématiques. Depuis le 28 juin 2025, les PME de plus de 10 salariés doivent s&apos;y conformer.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#1B4F72] mb-3">Articles sur l&apos;accessibilité web</h2>
              <div className="space-y-3">
                {articles.slice(0, 3).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-[#1B4F72] hover:bg-blue-50/30 transition-colors no-underline"
                  >
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-xs text-gray-500">{article.summary}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/blog" className="text-sm text-[#1B4F72] hover:underline font-medium no-underline">
                  Voir tous les articles →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-500">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link href="/" className="hover:text-[#1B4F72] no-underline">Accueil</Link>
            <Link href="/outil-accessibilite-web" className="hover:text-[#1B4F72] no-underline">L&apos;outil</Link>
            <Link href="/blog" className="hover:text-[#1B4F72] no-underline">Blog</Link>
            <Link href="/pricing" className="hover:text-[#1B4F72] no-underline">Tarifs</Link>
            <Link href="/mentions-legales" className="hover:text-[#1B4F72] no-underline">Mentions légales</Link>
          </div>
          <p className="text-center">© {new Date().getFullYear()} AccessScan</p>
        </div>
      </footer>
    </div>
  );
}
