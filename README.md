# Abdoul-raouf Sonhouin — Portfolio

Portfolio personnel d'Abdoul-raouf Sonhouin, développeur full-stack & étudiant en Master 1 IA & Big Data à l'ESGIS (Lomé, Togo).

## Stack technique

- **HTML5** sémantique avec ARIA pour l'accessibilité
- **CSS3** (custom properties, Grid, Flexbox, `clamp()`, `color-mix()`, animations)
- **Vanilla JavaScript** (ES5, IIFE, `IntersectionObserver`) — aucune dépendance
- **Fonts** : Space Grotesk, Inter, JetBrains Mono (Google Fonts)
- **Hébergement** : site statique (prêt pour Vercel, Netlify, GitHub Pages)

## Lancer le projet en local

```bash
# Python
python3 -m http.server 8080

# ou Node.js
npx serve
```

Ouvrir http://localhost:8080.

## Structure

```
├── index.html
├── css/style.css
├── js/script.js
├── cv/CV_Abdoul-raouf_Sonhouin.pdf
├── images/
│   ├── favicon.svg
│   └── og-cover.svg
├── fichier.MD
└── README.md
```

## Fonctionnalités

- Thème sombre / clair avec `localStorage` et `prefers-color-scheme`
- Navigation sticky, burger menu mobile, liens actifs au scroll
- Typewriter animé dans le hero
- Animations au scroll (`IntersectionObserver`)
- Barres de progression des compétences animées
- Filtre des projets par catégorie (Tous / Professionnels / Personnels / Académiques)
- Carousel de témoignages avec autoplay
- Formulaire de contact avec validation client-side
- Back-to-top, loader, footer dynamique

## Contact — Formulaire Formspree

Le formulaire de contact est connecté à [Formspree](https://formspree.io) pour recevoir les messages par email.

### Configuration

1. Créer un compte gratuit sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Copier l'endpoint (ex: `https://formspree.io/f/abc123`) dans `index.html` ligne 971, remplacer `REPLACE_WITH_YOUR_FORM_ID`
4. Le formulaire envoie automatiquement le nom, email, sujet et message

## Personnalisation

- **Projets** : modifier les cartes dans `index.html` (section `#projects`) et mettre à jour les URLs GitHub / démo
- **Compétences** : ajuster les `data-width` des barres dans `index.html`
- **Témoignages** : ajouter des `<figure>` dans `#testimonials`
- **Réseaux** : mettre à jour les liens GitHub / LinkedIn dans le footer et le hero
- **Contact** : connecter le formulaire à Formspree, EmailJS ou Web3Forms dans `js/script.js` et `index.html`

## SEO

- Données structurées JSON-LD (`Person` schema) dans `<head>`
- Canonical URL + balises `hreflang` (FR / EN)
- Open Graph tags + favicon SVG
- `robots.txt` + `sitemap.xml`

## Licence

© Abdoul-raouf Sonhouin — Tous droits réservés.