import { NextRequest, NextResponse } from "next/server";
import { analyzeHtml } from "@/lib/analyzer";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL requise" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : "https://" + url);
    } catch {
      return NextResponse.json({ error: "URL invalide" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let html: string;
    try {
      const response = await fetch(parsedUrl.toString(), {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AccessScan/1.0)",
          "Accept": "text/html,application/xhtml+xml",
        },
        redirect: "follow",
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Le site a répondu avec le statut " + response.status },
          { status: 422 }
        );
      }

      html = await response.text();
    } catch (fetchError: unknown) {
      const message =
        fetchError instanceof Error && fetchError.name === "AbortError"
          ? "Le site met trop de temps à répondre (>15s)"
          : "Impossible de joindre le site";
      return NextResponse.json({ error: message }, { status: 422 });
    } finally {
      clearTimeout(timeout);
    }

    const result = analyzeHtml(html, parsedUrl.toString());
    return NextResponse.json(result);
  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
