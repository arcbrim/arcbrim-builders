#!/bin/bash
set -e

echo "▶ Building site…"
npm run build

echo "▶ Deploying to Hostinger…"
rsync -avz --delete \
  -e "ssh -p 65002 -o IdentitiesOnly=yes -i ~/.ssh/arcbrim_hostinger_ed25519" \
  dist/ \
  u296104006@62.72.50.210:domains/arcbrimbuilders.com/public_html/

echo "✅ Deployment complete."
