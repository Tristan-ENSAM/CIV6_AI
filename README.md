# ⚔ Imperator — Coach CivFR

Coach officiel de la communauté CivFR, calibré sur BBG 7.3, la meta S16 et le règlement des squadrons.

## Fonctionnalités

- **Coach IA** adaptatif avec base de connaissances BBG 7.3 complète + meta S16 réelle (327 parties)
- **Draft 4v4** officiel S16 (séquence 30 étapes : bans maps + bans/picks civs)
- **Reports de parties** avec historique et statistiques
- **Espace admin** pour enrichir le coach avec les corrections et mécaniques cachées découvertes par la communauté

## Déploiement sur Vercel (5 minutes, gratuit)

### Étape 1 — Préparer les fichiers
Téléchargez le dossier `civfr-coach` et déposez-le sur GitHub :
1. Créez un compte [GitHub](https://github.com) si vous n'en avez pas
2. Créez un nouveau repository (bouton "New")
3. Uploadez tous les fichiers du dossier

### Étape 2 — Déployer sur Vercel
1. Créez un compte sur [vercel.com](https://vercel.com) (gratuit)
2. Cliquez "New Project"
3. Importez votre repository GitHub
4. Cliquez "Deploy" — Vercel détecte automatiquement Next.js

### Étape 3 — Configurer les variables d'environnement
Dans votre projet Vercel → Settings → Environment Variables, ajoutez :

| Variable | Valeur |
|----------|--------|
| `ANTHROPIC_API_KEY` | Votre clé API Anthropic (commençant par `sk-ant-...`) |
| `ADMIN_KEY` | Un mot de passe de votre choix pour l'espace admin |

### Étape 4 — Redéployer
Après avoir ajouté les variables, cliquez "Redeploy" dans Vercel.

Votre site est en ligne à l'URL `https://votre-projet.vercel.app` !

## Enrichir le coach

Dans l'onglet **Admin** de l'application :
1. Entrez la clé admin
2. Saisissez votre pseudo
3. Ajoutez une correction ou mécanique découverte
4. Le coach l'intégrera automatiquement dans toutes les conversations

## Structure du projet

```
civfr-coach/
├── pages/
│   ├── index.js          # Interface principale
│   └── api/
│       ├── coach.js       # API Claude (coach IA)
│       ├── knowledge.js   # Gestion des corrections admin
│       ├── drafts.js      # Historique des drafts
│       └── reports.js     # Reports de parties
├── lib/
│   └── knowledge.js       # Base de connaissances BBG 7.3 + meta CivFR
├── data/                  # Créé automatiquement (corrections, reports)
├── next.config.js
└── package.json
```

## Mise à jour de la base de connaissances

Pour mettre à jour les données BBG quand un nouveau patch sort :
1. Modifiez `lib/knowledge.js`
2. Poussez les changements sur GitHub
3. Vercel redéploie automatiquement

## Obtenir une clé API Anthropic

1. Créez un compte sur [console.anthropic.com](https://console.anthropic.com)
2. Allez dans "API Keys" → "Create Key"
3. Copiez la clé (commence par `sk-ant-...`)
4. Ajoutez-la dans les variables Vercel

Le coût est très faible : environ 0.003€ par conversation.
