"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
      const descLines = doc.splitTextToSize("WCAG " + issue.wcag + " / RGAA " + issue.rgaa + " — " + issue.description, contentW - 20);
      const locLines = doc.splitTextToSize("Localisation : " + issue.location, contentW - 20);
      const elLines = doc.splitTextToSize(issue.element, contentW - 20);
      const fixLines = doc.splitTextToSize(issue.fix, contentW - 20);
      const blockH = 12 + descLines.length * 4 + locLines.length * 4 + elLines.length * 4 + fixLines.length * 4 + 18;

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

      // Localisation
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 180);
      doc.text(locLines, ix, iy);
      iy += locLines.length * 4 + 2;

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
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [credits, setCredits] = useState(0);
  const [email, setEmail] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/credits")
      .then((r) => r.json())
      .then((data) => {
        setLoggedIn(data.logged_in || false);
        setCredits(data.credits || 0);
        setEmail(data.email || "");
      });

    // Check for payment success in URL
    if (typeof window !== "undefined" && window.location.search.includes("payment=success")) {
      setPaymentSuccess(true);
      // Clean URL
      window.history.replaceState({}, "", "/");
      // Refresh credits
      setTimeout(() => {
        fetch("/api/credits")
          .then((r) => r.json())
          .then((data) => setCredits(data.credits || 0));
      }, 1000);
    }
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

  const handlePdf = async () => {
    if (!result) return;
    setPdfLoading(true);

    try {
      const res = await fetch("/api/credits", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setPdfLoading(false);
        return;
      }

      setCredits(data.credits);
      await generatePdf(result);
    } catch {
      // Silent fail
    } finally {
      setPdfLoading(false);
    }
  };

  const handleLogout = async () => {
    const { createClient } = await import("@/lib/supabase-browser");
    const supabase = createClient();
    await supabase.auth.signOut();
    setLoggedIn(false);
    setCredits(0);
    setEmail("");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-blue-600">Access</span>Scan
        </Link>
        <div className="flex items-center gap-3 text-sm">
          {loggedIn === null ? null : loggedIn ? (
            <>
              <Link href="/pricing" className="text-blue-600 hover:underline font-medium">
                {credits} crédit{credits !== 1 ? "s" : ""}
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Mes scans
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
                Connexion
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Payment success banner */}
      {paymentSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
          Paiement réussi ! Vos crédits ont été ajoutés.
        </div>
      )}

      <div className="text-center mb-8">
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

      {!result && !loading && !error && (
        <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-1">Ce que nous vérifions</h2>
          <p className="text-gray-400 text-xs mb-4">
            6 critères basés sur les référentiels WCAG 2.1 (international) et RGAA 4.1 (français)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex gap-3 p-3 rounded-lg bg-red-50">
              <span className="text-red-500 text-lg leading-none mt-0.5">●</span>
              <div>
                <p className="font-semibold text-sm">Images sans texte alternatif</p>
                <p className="text-xs text-gray-500">WCAG 1.1.1 · RGAA 1.1</p>
                <p className="text-xs text-gray-400 mt-0.5">Chaque image doit avoir un attribut alt décrivant son contenu</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-red-50">
              <span className="text-red-500 text-lg leading-none mt-0.5">●</span>
              <div>
                <p className="font-semibold text-sm">Labels de formulaires manquants</p>
                <p className="text-xs text-gray-500">WCAG 1.3.1 · RGAA 11.1</p>
                <p className="text-xs text-gray-400 mt-0.5">Chaque champ de saisie doit avoir un label associé</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-orange-50">
              <span className="text-orange-500 text-lg leading-none mt-0.5">●</span>
              <div>
                <p className="font-semibold text-sm">Contraste texte insuffisant</p>
                <p className="text-xs text-gray-500">WCAG 1.4.3 · RGAA 3.2</p>
                <p className="text-xs text-gray-400 mt-0.5">Ratio minimum de 4.5:1 entre texte et arrière-plan</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-orange-50">
              <span className="text-orange-500 text-lg leading-none mt-0.5">●</span>
              <div>
                <p className="font-semibold text-sm">Langue de la page</p>
                <p className="text-xs text-gray-500">WCAG 3.1.1 · RGAA 8.3</p>
                <p className="text-xs text-gray-400 mt-0.5">La balise html doit indiquer la langue du contenu</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-orange-50">
              <span className="text-orange-500 text-lg leading-none mt-0.5">●</span>
              <div>
                <p className="font-semibold text-sm">Titre de page manquant</p>
                <p className="text-xs text-gray-500">WCAG 2.4.2 · RGAA 8.5</p>
                <p className="text-xs text-gray-400 mt-0.5">Chaque page doit avoir un titre descriptif et unique</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-orange-50">
              <span className="text-orange-500 text-lg leading-none mt-0.5">●</span>
              <div>
                <p className="font-semibold text-sm">Liens sans intitulé</p>
                <p className="text-xs text-gray-500">WCAG 2.4.4 · RGAA 6.1</p>
                <p className="text-xs text-gray-400 mt-0.5">Chaque lien doit avoir un texte ou une alternative accessible</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <span className="font-semibold">WCAG</span> (Web Content Accessibility Guidelines) est le standard international d&apos;accessibilité web.
              <span className="font-semibold"> RGAA</span> (Référentiel Général d&apos;Amélioration de l&apos;Accessibilité) est sa déclinaison française, obligatoire pour les services publics et bientôt pour les entreprises réalisant plus de 250 M€ de CA.
            </p>
          </div>
        </div>
      )}

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

          {/* PDF Button - conditional on auth + credits */}
          {!loggedIn ? (
            <Link
              href="/auth/signup"
              className="block w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-center"
            >
              Créez un compte pour télécharger le PDF
            </Link>
          ) : credits < 1 ? (
            <Link
              href="/pricing"
              className="block w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
            >
              Acheter des crédits pour le rapport PDF
            </Link>
          ) : (
            <button
              onClick={handlePdf}
              disabled={pdfLoading}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {pdfLoading ? "Génération..." : `Télécharger le rapport PDF (1 crédit — ${credits} restant${credits !== 1 ? "s" : ""})`}
            </button>
          )}

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
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold">{issue.criterion}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${sev.color} whitespace-nowrap`}>
                        {sev.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      WCAG {issue.wcag} · RGAA {issue.rgaa}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">{issue.description}</p>
                    <div className="text-xs text-blue-700 bg-blue-50 rounded px-2 py-1.5 mb-2">
                      <span className="font-semibold">📍 Localisation :</span> {issue.location}
                    </div>
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

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t border-gray-200 text-center space-y-2">
        <div className="flex justify-center gap-6 text-xs text-gray-400">
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
          <Link href="/cgv" className="hover:text-gray-600">CGV</Link>
          <Link href="/confidentialite" className="hover:text-gray-600">Confidentialité</Link>
          <a href="mailto:access.scan64@gmail.com" className="hover:text-gray-600">Contact</a>
        </div>
        <p className="text-xs text-gray-300">© {new Date().getFullYear()} AccessScan</p>
      </footer>
    </main>
  );
}
