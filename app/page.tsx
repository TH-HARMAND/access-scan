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
  const pw = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentW = pw - margin * 2;
  let y = 20;

  const checkPage = (needed: number) => {
    if (y + needed > 272) {
      doc.addPage();
      y = 20;
    }
  };

  // === EN-TETE avec bande bleue ===
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pw, 40, "F");

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("AccessScan", margin, 18);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 220, 255);
  doc.text("Rapport d'audit d'accessibilite web", margin, 27);

  doc.setFontSize(8);
  doc.text("Outil d'aide a la demarche — Ne constitue pas une certification WCAG/RGAA", margin, 35);

  y = 52;

  // === INFOS ===
  doc.setTextColor(100);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const urlDisplay = result.url.length > 80 ? result.url.substring(0, 80) + "..." : result.url;
  doc.text("URL :  " + urlDisplay, margin, y);
  y += 5;
  doc.text("Date :  " + formatDate(result.timestamp), margin, y);
  y += 10;

  // === BLOC SCORE avec fond gris ===
  const scoreBoxH = 32;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentW, scoreBoxH, 3, 3, "FD");

  const scoreColor: [number, number, number] = result.score >= 80 ? [22, 163, 74] : result.score >= 50 ? [234, 88, 12] : [220, 38, 38];

  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(result.score + "/100", margin + 10, y + 14);

  doc.setFontSize(14);
  doc.text(getScoreLabel(result.score), margin + 10, y + 24);

  // Compteurs a droite
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const rx = pw - margin - 10;

  doc.setTextColor(220, 38, 38);
  doc.text(result.summary.critical + " critique" + (result.summary.critical !== 1 ? "s" : ""), rx, y + 10, { align: "right" });
  doc.setTextColor(234, 88, 12);
  doc.text(result.summary.major + " majeur" + (result.summary.major !== 1 ? "s" : ""), rx, y + 17, { align: "right" });
  doc.setTextColor(180, 140, 20);
  doc.text(result.summary.minor + " mineur" + (result.summary.minor !== 1 ? "s" : ""), rx, y + 24, { align: "right" });

  y += scoreBoxH + 10;

  // === TITRE SECTION ===
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin + 40, y);
  y += 6;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text(result.issues.length === 0 ? "Resultat" : "Corrections prioritaires (" + result.issues.length + ")", margin, y);
  y += 8;

  if (result.issues.length === 0) {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(margin, y, contentW, 16, 2, 2, "FD");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74);
    doc.text("Aucun probleme detecte. Bonne accessibilite !", margin + 6, y + 10);
  } else {
    result.issues.forEach((issue, i) => {
      checkPage(42);

      // Couleurs par severite
      const isC = issue.severity === "critical";
      const isM = issue.severity === "major";
      const barColor: [number, number, number] = isC ? [220, 38, 38] : isM ? [234, 88, 12] : [202, 138, 4];
      const bgColor: [number, number, number] = isC ? [254, 242, 242] : isM ? [255, 247, 237] : [254, 252, 232];
      const sevLabel = isC ? "CRITIQUE" : isM ? "MAJEUR" : "MINEUR";

      // Calcul hauteur du bloc
      const descLines = doc.splitTextToSize("WCAG " + issue.wcag + " — " + issue.description, contentW - 20);
      const elLines = doc.splitTextToSize(issue.element, contentW - 20);
      const fixLines = doc.splitTextToSize(issue.fix, contentW - 20);
      const blockH = 12 + descLines.length * 4 + elLines.length * 4 + fixLines.length * 4 + 14;

      checkPage(blockH + 4);

      // Fond du bloc
      doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      doc.setDrawColor(230, 230, 230);
      doc.roundedRect(margin, y, contentW, blockH, 2, 2, "FD");

      // Barre de couleur a gauche
      doc.setFillColor(barColor[0], barColor[1], barColor[2]);
      doc.rect(margin, y, 3, blockH, "F");

      // Numero + titre
      const ix = margin + 8;
      let iy = y + 7;

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text((i + 1) + ". " + issue.criterion, ix, iy);

      // Badge severite (a droite)
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      const badgeW = doc.getTextWidth(sevLabel) + 6;
      const badgeX = pw - margin - badgeW - 6;
      doc.setFillColor(barColor[0], barColor[1], barColor[2]);
      doc.roundedRect(badgeX, iy - 4.5, badgeW, 6, 1.5, 1.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.text(sevLabel, badgeX + 3, iy);

      iy += 7;

      // Description
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(descLines, ix, iy);
      iy += descLines.length * 4 + 2;

      // Element concerne
      doc.setFontSize(8);
      doc.setFont("courier", "normal");
      doc.setTextColor(120, 120, 120);
      doc.text(elLines, ix, iy);
      iy += elLines.length * 4 + 2;

      // Correction
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(22, 101, 52);
      doc.text(fixLines.map((l: string, li: number) => li === 0 ? "-> " + l : "   " + l), ix, iy);

      y += blockH + 4;
    });
  }

  // === PIED DE PAGE sur chaque page ===
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    // Ligne fine
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(margin, 285, pw - margin, 285);
    // Texte
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(160);
    doc.text("AccessScan — " + formatDate(result.timestamp), margin, 290);
    doc.text("Page " + p + "/" + pageCount, pw - margin, 290, { align: "right" });
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
