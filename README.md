# Remal Laundry OS — V4

Nouvelle application React + Vite, séparée de Remal Laundry V3.

## Développement
- Installer les dépendances : `npm install`
- Lancer en local : `npm run dev`
- Construire pour production : `npm run build`

## État actuel
Cette première base fournit une interface responsive et des interactions de démonstration. Les commandes et indicateurs visibles sont fictifs et restent en mémoire dans le navigateur. Aucune connexion Supabase n'est activée à ce stade.

## Prochaines étapes
1. Migrer les règles métier, tarifs, reçus, impression par lots, caisse, statuts, stock et intégrations depuis le code V3 fourni.
2. Configurer les variables publiques Supabase de V4 dans Vercel et vérifier les politiques RLS.
3. Tester chaque parcours sur le déploiement de prévisualisation avant toute utilisation réelle.

Ne jamais placer une clé Supabase service-role dans le code client.