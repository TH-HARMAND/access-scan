"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

interface ScanRecord {
  id: string;
  url: string;
  score: number;
  issues_count: number;
  created_at: string;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-orange-500";
  return "text-red-600";
}

export default function Dashboard() {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [credits, setCredits] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();

      setCredits(profile?.credits || 0);

      const { data: scanData } = await supabase
        .from("scans")
        .select("id, url, score, issues_count, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      setScans(scanData || []);
      setLoading(false);
    };

    loadData();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-600">Access</span>Scan
          </Link>
          <p className="text-gray-500 text-sm mt-1">{email}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-sm text-blue-600 hover:underline font-medium">
            {credits} crédit{credits !== 1 ? "s" : ""}
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-gray-500 text-sm">Crédits PDF</p>
          <p className="text-3xl font-bold text-blue-600">{credits}</p>
          <Link href="/pricing" className="text-xs text-blue-600 hover:underline">Acheter des crédits</Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-gray-500 text-sm">Scans effectués</p>
          <p className="text-3xl font-bold text-gray-900">{scans.length}</p>
          <Link href="/" className="text-xs text-blue-600 hover:underline">Nouveau scan</Link>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Historique des scans</h2>

      {scans.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4">Aucun scan effectué pour le moment</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lancer un scan
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {scans.map((scan) => (
            <div key={scan.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{scan.url}</p>
                <p className="text-xs text-gray-400">
                  {new Date(scan.created_at).toLocaleString("fr-FR")} — {scan.issues_count} problème{scan.issues_count !== 1 ? "s" : ""}
                </p>
              </div>
              <div className={`text-2xl font-bold ml-4 ${getScoreColor(scan.score)}`}>
                {scan.score}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
