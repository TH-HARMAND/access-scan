Quand on audite des sites de PME pour la première fois, les mêmes problèmes d'accessibilité web PME reviennent systématiquement. La bonne nouvelle : la majorité sont simples à corriger. Un audit accessibilité RGAA révèle presque toujours les mêmes non-conformités, quel que soit le secteur d'activité.

Si vous découvrez le sujet, consultez d'abord [notre article sur les obligations 2025](/blog/accessibilite-web-obligatoire-pme-2025).

## Erreur 1 — Images sans alternative textuelle

Critères RGAA 1.1 à 1.3. Quand une image n'a pas d'attribut `alt`, un lecteur d'écran lit le nom du fichier. L'utilisateur ne sait pas ce que représente l'image.

**Avant :**
```html
<img src="equipe-photo.jpg">
<a href="/contact"><img src="icon-email.png"></a>
```

**Après :**
```html
<img src="equipe-photo.jpg" alt="L'équipe AccessScan dans ses bureaux">
<a href="/contact"><img src="icon-email.png" alt="Nous contacter par email"></a>
<img src="decoration-ligne.svg" alt="">
```

**Correction** : image informative → `alt` décrivant le contenu. Image décorative → `alt=""`. Image-lien → `alt` décrivant la destination.

**Comment détecter** : AccessScan, WAVE et axe DevTools signalent automatiquement les images sans attribut alt. Vérifiez manuellement la pertinence des alt existants.

## Erreur 2 — Contrastes insuffisants

Critères RGAA 3.2 et 3.3. Ratio minimum : 4.5:1 pour le texte normal, 3:1 pour les grands textes (à partir de 18px en gras ou 24px). Le problème classique : texte gris clair sur fond blanc.

**Avant :**
```css
/* Ratio 2.5:1 — non conforme */
.subtitle { color: #999999; background: #ffffff; }
```

**Après :**
```css
/* Ratio 4.6:1 — conforme */
.subtitle { color: #767676; background: #ffffff; }
```

**Correction** : utilisez le Colour Contrast Analyser ou l'inspecteur d'accessibilité de Chrome DevTools pour vérifier et ajuster les couleurs.

**Comment détecter** : les outils automatisés (AccessScan, Lighthouse) calculent les ratios de contraste. Attention aux textes sur images de fond et aux états hover/focus qui doivent aussi respecter les ratios.

## Erreur 3 — Structure de titres incohérente

Critère RGAA 9.1. Pages avec plusieurs h1, des h3 après des h1 sans h2, ou des textes en gras codés comme paragraphes. Pour un lecteur d'écran, les titres sont le principal moyen de navigation.

**Avant :**
```html
<h1>Notre entreprise</h1>
<h3>Nos services</h3>        <!-- h2 manquant -->
<p><strong>Contact</strong></p> <!-- devrait être un titre -->
<h1>Actualités</h1>           <!-- second h1 -->
```

**Après :**
```html
<h1>Notre entreprise</h1>
<h2>Nos services</h2>
<h2>Contact</h2>
<h2>Actualités</h2>
```

**Correction** : un seul h1, des h2 pour les sections, des h3 pour les sous-sections, sans sauter de niveau.

**Comment détecter** : l'extension HeadingsMap affiche la hiérarchie des titres. WAVE et axe DevTools signalent les niveaux manquants.

## Erreur 4 — Formulaires sans labels

Critères RGAA 11.1 et 11.2. Les placeholders seuls ne suffisent pas : ils disparaissent à la saisie et ne sont pas toujours restitués par les lecteurs d'écran.

**Avant :**
```html
<input type="email" placeholder="Votre email">
<select>
  <option>Choisir un sujet</option>
</select>
```

**Après :**
```html
<label for="email">Adresse email</label>
<input type="email" id="email" placeholder="exemple@domaine.fr">

<label for="sujet">Sujet de votre demande</label>
<select id="sujet">
  <option value="">Choisir un sujet</option>
</select>
```

**Correction** : ajoutez un `<label>` visible pour chaque champ, avec `for` pointant vers l'`id` du champ.

**Comment détecter** : AccessScan et axe DevTools identifient automatiquement les champs sans label associé.

## Erreur 5 — Navigation impossible au clavier

Critère RGAA 12.13. Menus qui ne s'ouvrent qu'au survol, boutons en `<div>`, carrousels non contrôlables, absence d'indicateur de focus.

**Avant :**
```html
<div class="btn" onclick="submit()">Envoyer</div>
<div onmouseover="openMenu()">Menu</div>
```

**Après :**
```html
<button type="submit">Envoyer</button>
<button aria-expanded="false" aria-haspopup="true">Menu</button>
```

**Correction** : testez avec Tab/Shift+Tab/Entrée/Échap. Chaque élément interactif doit être atteignable. Utilisez des éléments HTML natifs (`<button>`, `<a>`) plutôt que des `<div>` avec des gestionnaires d'événements.

**Comment détecter** : débranchez votre souris et naviguez sur votre site. Si vous êtes bloqué quelque part, c'est une non-conformité critique. Aucun outil automatisé ne peut pleinement tester l'utilisabilité clavier.

## Erreur 6 — Langue non déclarée

Critère RGAA 8.3. Sans `lang="fr"` sur `<html>`, les lecteurs d'écran ne savent pas quelle voix utiliser et prononcent le texte français avec un accent anglais.

**Avant :**
```html
<html>
```

**Après :**
```html
<html lang="fr">
```

**Correction** : vérifiez que `<html lang="fr">` est présent. Pour les passages en langue étrangère, ajoutez `lang="en"` sur l'élément contenant.

**Comment détecter** : tous les outils automatisés (AccessScan, WAVE, Lighthouse, axe DevTools) détectent l'absence de l'attribut lang.

## Erreur 7 — Liens non explicites

Critère RGAA 6.1. "Cliquez ici" et "En savoir plus" sans contexte sont des non-conformités.

**Avant :**
```html
<p>Pour découvrir nos tarifs, <a href="/pricing">cliquez ici</a>.</p>
<a href="/blog/rgaa">En savoir plus</a>
```

**Après :**
```html
<p><a href="/pricing">Découvrir nos tarifs d'audit accessibilité</a></p>
<a href="/blog/rgaa">Lire notre guide RGAA vs WCAG</a>
```

**Correction** : remplacez par des intitulés descriptifs. Si le contexte rend le lien explicite (dans une phrase), c'est acceptable — mais les intitulés autonomes sont préférables.

**Comment détecter** : WAVE signale les liens avec des intitulés génériques. Pour une vérification complète, relisez chaque lien isolé de son contexte : l'intitulé seul doit avoir un sens.

## Erreur 8 — Titres de page non pertinents

Critère RGAA 8.5. Beaucoup de sites ont le même `<title>` sur toutes les pages, ou un titre qui ne décrit pas le contenu de la page.

**Avant :**
```html
<title>Mon entreprise</title> <!-- même titre partout -->
```

**Après :**
```html
<title>Tarifs audit accessibilité web — Mon entreprise</title>
```

**Correction** : chaque page doit avoir un titre unique et descriptif, commençant par le contenu spécifique de la page suivi du nom du site.

**Comment détecter** : AccessScan et Lighthouse vérifient la présence et l'unicité du titre. Un crawl avec Screaming Frog identifie les titres dupliqués sur l'ensemble du site.

## Erreur 9 — Contenus en mouvement non contrôlables

Critère RGAA 13.8. Carrousels automatiques et vidéos en autoplay sans possibilité de pause.

**Correction** : ajoutez un bouton pause visible. Désactivez l'autoplay ou coupez le son par défaut. Les animations CSS qui durent plus de 5 secondes doivent aussi pouvoir être arrêtées.

**Comment détecter** : test manuel uniquement. Parcourez votre site et identifiez tout contenu qui bouge automatiquement.

## Erreur 10 — Absence de lien d'accès rapide

Critère RGAA 12.7. Sans skip link, un utilisateur clavier doit parcourir tout le menu à chaque page.

**Avant :**
```html
<body>
  <nav><!-- 20 liens de navigation --></nav>
  <main>...</main>
</body>
```

**Après :**
```html
<body>
  <a href="#contenu" class="skip-link">Aller au contenu principal</a>
  <nav><!-- 20 liens de navigation --></nav>
  <main id="contenu">...</main>
</body>
```

**Correction** : ajoutez un lien en haut de page pointant vers le contenu principal. Ce lien peut être masqué visuellement et apparaître au focus clavier.

**Comment détecter** : appuyez sur Tab dès le chargement de la page. Le premier élément focusable devrait être le lien d'accès rapide.

## Matrice de priorisation

| Erreur | Impact utilisateur | Difficulté de correction | Priorité |
|---|---|---|---|
| Langue non déclarée | Élevé | Très facile (1 ligne) | 1 |
| Titres de page | Élevé | Facile | 2 |
| Images sans alt | Élevé | Facile | 3 |
| Labels formulaires | Élevé | Facile | 4 |
| Contrastes | Moyen | Facile | 5 |
| Liens non explicites | Moyen | Facile | 6 |
| Structure de titres | Moyen | Moyen | 7 |
| Skip link | Moyen | Facile | 8 |
| Contenus en mouvement | Moyen | Moyen | 9 |
| Navigation clavier | Très élevé | Complexe | 10 |

## Erreurs spécifiques aux CMS

### WordPress

Les thèmes WordPress sont souvent responsables de non-conformités structurelles : hiérarchie de titres imposée par le thème, images de mise en page sans alt vide, formulaires de recherche sans label. Les plugins de formulaires (Contact Form 7, Gravity Forms) génèrent parfois du HTML non conforme. Vérifiez la configuration de votre thème et testez les formulaires générés par vos plugins.

### Shopify

Les boutiques Shopify partagent des problèmes récurrents : images produit sans alt (le champ existe dans l'admin mais n'est pas renseigné), navigation par filtres inaccessible au clavier, modales de panier non conformes. Utilisez le champ "texte alternatif" dans l'interface d'administration pour chaque image produit.

### Wix et éditeurs visuels

Les sites construits avec Wix, Squarespace ou d'autres éditeurs visuels ont des limitations techniques : structure HTML générée automatiquement et parfois non optimale, landmarks ARIA absents, navigation clavier limitée par le framework. L'accessibilité dépend en grande partie de l'éditeur lui-même, ce qui limite les corrections possibles.

## Comment prioriser

Commencez par les corrections sans code complexe : langue, titres de pages, alt des images. Puis contrastes et labels. Terminez par la navigation clavier. Chaque audit accessibilité RGAA PME révèle un profil similaire : 60 % des non-conformités sont corrigeables en quelques heures.

Testez votre site gratuitement avec [AccessScan](/) pour un premier diagnostic instantané.

Un pré-diagnostic automatisé localise ces erreurs immédiatement. Pour la méthodologie complète, consultez [notre guide audit RGAA](/blog/comment-faire-audit-accessibilite-rgaa). Pour le budget, consultez [notre article sur les coûts](/blog/cout-audit-accessibilite-web-alternatives).
