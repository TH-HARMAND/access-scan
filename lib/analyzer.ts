import * as cheerio from "cheerio";

export interface AccessIssue {
  criterion: string;
  wcag: string;
  severity: "critical" | "major" | "minor";
  description: string;
  element: string;
  fix: string;
}

export interface ScanResult {
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

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(short, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function namedColorToHex(name: string): string | null {
  const colors: Record<string, string> = {
    white: "#ffffff", black: "#000000", red: "#ff0000", green: "#008000",
    blue: "#0000ff", yellow: "#ffff00", gray: "#808080", grey: "#808080",
    silver: "#c0c0c0", orange: "#ffa500", purple: "#800080", navy: "#000080",
    lightgray: "#d3d3d3", lightgrey: "#d3d3d3", darkgray: "#a9a9a9",
    darkgrey: "#a9a9a9", whitesmoke: "#f5f5f5",
  };
  return colors[name.toLowerCase().trim()] || null;
}

function parseColor(color: string): { r: number; g: number; b: number } | null {
  if (!color) return null;
  color = color.trim().toLowerCase();
  if (color === "transparent" || color === "inherit" || color === "initial") return null;
  if (color.startsWith("#")) return hexToRgb(color);
  const rgbMatch = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (rgbMatch) {
    return { r: parseInt(rgbMatch[1]), g: parseInt(rgbMatch[2]), b: parseInt(rgbMatch[3]) };
  }
  const hex = namedColorToHex(color);
  if (hex) return hexToRgb(hex);
  return null;
}

function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(
  fg: { r: number; g: number; b: number },
  bg: { r: number; g: number; b: number }
): number {
  const l1 = luminance(fg.r, fg.g, fg.b);
  const l2 = luminance(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function analyzeHtml(html: string, url: string): ScanResult {
  const $ = cheerio.load(html);
  const issues: AccessIssue[] = [];

  // CHECK 1: Images sans attribut alt
  $("img").each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined) {
      const src = $(el).attr("src") || "inconnue";
      const srcShort = src.length > 60 ? src.substring(0, 60) + "..." : src;
      issues.push({
        criterion: "Image sans texte alternatif",
        wcag: "1.1.1",
        severity: "critical",
        description: "Image sans attribut alt détectée",
        element: '<img src="' + srcShort + '">',
        fix: 'Ajouter un attribut alt descriptif : alt="Description de l\'image"',
      });
    }
  });

  // CHECK 2: Contraste insuffisant (styles inline)
  $("[style]").each((_, el) => {
    const style = $(el).attr("style") || "";
    const colorMatch = style.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i);
    const bgMatch = style.match(/background(?:-color)?\s*:\s*([^;]+)/i);
    if (colorMatch && bgMatch) {
      const fg = parseColor(colorMatch[1]);
      const bg = parseColor(bgMatch[1]);
      if (fg && bg) {
        const ratio = contrastRatio(fg, bg);
        if (ratio < 4.5) {
          const text = $(el).text().trim().substring(0, 40);
          issues.push({
            criterion: "Contraste texte insuffisant",
            wcag: "1.4.3",
            severity: "major",
            description: 'Ratio de contraste ' + ratio.toFixed(2) + ':1 (minimum requis : 4.5:1)',
            element: text ? '"' + text + '"' : "Élément avec style inline",
            fix: "Augmenter le contraste entre la couleur du texte et l'arrière-plan",
          });
        }
      }
    }
  });

  // CHECK 3: Champs de formulaire sans label
  $("input, select, textarea").each((_, el) => {
    const type = $(el).attr("type") || "text";
    if (["hidden", "submit", "button", "reset", "image"].includes(type)) return;
    const id = $(el).attr("id");
    const ariaLabel = $(el).attr("aria-label");
    const ariaLabelledby = $(el).attr("aria-labelledby");
    const title = $(el).attr("title");
    const placeholder = $(el).attr("placeholder");
    const hasLabel = id ? $('label[for="' + id + '"]').length > 0 : false;
    const wrappedInLabel = $(el).closest("label").length > 0;
    if (!hasLabel && !wrappedInLabel && !ariaLabel && !ariaLabelledby && !title) {
      const name = $(el).attr("name") || type;
      issues.push({
        criterion: "Label de formulaire manquant",
        wcag: "1.3.1",
        severity: "critical",
        description: 'Champ de formulaire sans label associé' + (placeholder ? ' (placeholder: "' + placeholder + '")' : ''),
        element: '<' + el.tagName + ' type="' + type + '" name="' + name + '">',
        fix: 'Ajouter un <label for="id"> ou un attribut aria-label',
      });
    }
  });

  // CHECK 4: Langue de la page
  const htmlLang = $("html").attr("lang");
  if (!htmlLang || htmlLang.trim() === "") {
    issues.push({
      criterion: "Langue de la page non définie",
      wcag: "3.1.1",
      severity: "major",
      description: "L'attribut lang manque sur la balise <html>",
      element: "<html>",
      fix: 'Ajouter lang="fr" (ou la langue appropriée) sur la balise <html>',
    });
  }

  // CHECK 5: Titre de page
  const pageTitle = $("title").text().trim();
  if (!pageTitle) {
    issues.push({
      criterion: "Titre de page manquant",
      wcag: "2.4.2",
      severity: "major",
      description: "La balise <title> est absente ou vide",
      element: "<head>",
      fix: "Ajouter une balise <title> descriptive dans le <head>",
    });
  }

  // CHECK 6: Liens vides
  $("a").each((_, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr("aria-label");
    const ariaLabelledby = $(el).attr("aria-labelledby");
    const titleAttr = $(el).attr("title");
    const hasImgWithAlt = $(el).find("img[alt]").length > 0;
    if (!text && !ariaLabel && !ariaLabelledby && !titleAttr && !hasImgWithAlt) {
      const href = $(el).attr("href") || "";
      const hrefShort = href.length > 50 ? href.substring(0, 50) + "..." : href;
      issues.push({
        criterion: "Lien sans intitulé",
        wcag: "2.4.4",
        severity: "major",
        description: "Lien sans texte ni alternative accessible",
        element: '<a href="' + hrefShort + '">',
        fix: "Ajouter un texte visible ou un attribut aria-label au lien",
      });
    }
  });

  // Calcul du score
  const penaltyPerCritical = 15;
  const penaltyPerMajor = 8;
  const penaltyPerMinor = 3;

  const criticalCount = issues.filter((i) => i.severity === "critical").length;
  const majorCount = issues.filter((i) => i.severity === "major").length;
  const minorCount = issues.filter((i) => i.severity === "minor").length;

  const totalPenalty =
    criticalCount * penaltyPerCritical +
    majorCount * penaltyPerMajor +
    minorCount * penaltyPerMinor;

  const score = Math.max(0, Math.min(100, 100 - totalPenalty));

  return {
    url,
    timestamp: new Date().toISOString(),
    score,
    totalChecks: $("img").length + $("input, select, textarea").length + $("a").length + 2,
    issuesFound: issues.length,
    issues: issues.sort((a, b) => {
      const order = { critical: 0, major: 1, minor: 2 };
      return order[a.severity] - order[b.severity];
    }),
    summary: {
      critical: criticalCount,
      major: majorCount,
      minor: minorCount,
    },
  };
}
