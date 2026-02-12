"use client";

import { useState } from "react";

interface AccessIssue {
  criterion: string;
  wcag: string;
  severity: "critical" | "major" | "minor";
  description: string;
  element: string;
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

async function generatePdf(result: ScanResult) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  const checkPage = (needed: number) => {
    if (y + needed > 270) {
      doc.addPage();
      y = 20;
    }
  };

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Rapport AccessScan", pageWidth / 2, y, { align: "center" });
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Audit d'accessibilite web — Outil d'aide a la demarche", pageWidth / 2, y, { align: "center" });
  y += 6;
  doc.text("Ce rapport ne constitue pas une certification WCAG/RGAA", pageWidth / 2, y, { align: "center" });
  y += 12;

  doc.setTextColor(0);
  doc.setFontSize(11);
  const urlDisplay = result.url.length > 70 ? result.url.substring(0, 70) + "..." : result.url;
  doc.text("URL analysee : " + urlDisplay, 14, y);
  y += 6;
  doc.text("Date : " + formatDate(result.timestamp), 14, y);
  y += 10;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const sc: [number, number, number] = result.score >= 80 ? [22, 163, 74] : result.score >= 50 ? [234, 88, 12] : [220, 38, 38];
  doc.setTextColor(sc[0], sc[1], sc[2]);
  doc.text("Score : " + result.score + "/100 — " + getScoreLabel(result.score), 14, y);
  y += 8;

  doc.setTextColor(0);
  doc.setFontSize(10);
  doc.text(
    result.summary.critical + " critique(s) | " + result.summary.major + " majeur(s) | " + result.summary.minor + " mineur(s)",
    14,
    y
  );
  y += 10;

  doc.setDrawColor(200);
  doc.line(14, y, pageWidth - 14, y);
  y += 8;

  if (result.issues.length === 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74);
    doc.text("Aucun probleme detecte. Bonne accessibilite !", 14, y);
  } else {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Corrections prioritaires", 14, y);
    y += 10;

    result.issues.forEach((issue, i) => {
      checkPage(35);

      const sevLabel = issue.severity === "critical" ? "CRITIQUE" : issue.severity === "major" ? "MAJEUR" : "MINEUR";
      const sevColor: [number, number, number] =
        issue.severity === "critical" ? [220, 38, 38] : issue.severity === "major" ? [234, 88, 12] : [202, 138, 4];

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text((i + 1) + ". " + issue.criterion, 14, y);

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(sevColor[0], sevColor[1], sevColor[2]);
      const w = doc.getTextWidth((i + 1) + ". " + issue.criterion + " ");
      doc.text("[" + sevLabel + "]", 14 + w + 2, y);
      y += 5;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text("WCAG " + issue.wcag + " — " + issue.description, 18, y);
      y += 5;

      const elLines = doc.splitTextToSize("Element : " + issue.element, pageWidth - 36);
      doc.text(elLines, 18, y);
      y += elLines.length * 4;

      doc.setTextColor(22, 101, 52);
      const fixLines = doc.splitTextToSize("Correction : " + issue.fix, pageWidth - 36);
      doc.text(fixLines, 18, y);
      y += fixLines.length * 4 + 6;
    });
  }

  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      "AccessScan — " + formatDate(result.timestamp) + " — Page " + p + "/" + pageCount,
      pageWidth / 2,
      290,
      { align: "center" }
    );
  }

  doc.save("accessscan-" + new Date().toISOString().slice(0, 10) + ".pdf");
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");

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
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-blue-600">Access</span>Scan
        </h1>
        <p className="text-gray-500 text-lg">
          Vérifiez l&apos;accessibilité de votre site web en quelques secondes
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Outil d&apos;aide à la démarche — ne constitue pas une certification WCAG
        </p>
      </div>

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
            className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        <div className="space-y-6">
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

          <button
            onClick={() => generatePdf(result)}
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Télécharger le rapport PDF
          </button>

          {result.issues.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p className="text-green-700 text-lg font-medium">
                Aucun problème détecté !
              </p>
              <p className="text-green-600 text-sm mt-1">
                Votre page respecte les critères vérifiés.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-xl font-bold">
                Corrections prioritaires ({result.issues.length})
              </h2>
              {result.issues.map((issue, i) => {
                const sev = severityLabels[issue.severity];
                return (
                  <div key={i} className={`border rounded-lg p-4 ${sev.bg}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold">{issue.criterion}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${sev.color} whitespace-nowrap`}>
                        {sev.label} — WCAG {issue.wcag}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{issue.description}</p>
                    <p className="text-xs text-gray-500 font-mono mb-2 break-all">{issue.element}</p>
                    <p className="text-sm text-green-800 font-medium">→ {issue.fix}</p>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-gray-400 text-xs pt-4 border-t border-gray-200">
            AccessScan est un outil d&apos;aide à la démarche d&apos;accessibilité.
            Il ne remplace pas un audit WCAG/RGAA complet réalisé par un professionnel.
          </p>
        </div>
      )}
    </main>
  );
}
