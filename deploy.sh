#!/bin/bash
# Usage: ./deploy.sh
# Usage: ./deploy.sh "your commit message"
set -e

VPS_HOST="smart4k-vps"               # SSH alias from ~/.ssh/config — points at srv1622309
VPS_PATH="/var/www/smart4k"
PM2_APP="smart4k"

MSG="${1:-deploy: $(date '+%Y-%m-%d %H:%M')}"

echo ""
echo "▶  Committing and pushing to git..."
git add -A
git diff --cached --quiet && echo "   (nothing new to commit)" || git commit -m "$MSG"
git push origin main

echo ""
echo "▶  Deploying on VPS..."
ssh "$VPS_HOST" bash << ENDSSH
  set -e
  cd "$VPS_PATH"
  echo "   Pulling latest code..."
  git pull origin main
  echo "   Installing dependencies..."
  npm install --omit=dev --silent
  echo "   Building..."
  npm run build
  echo "   Restarting app..."
  pm2 restart "$PM2_APP" 2>/dev/null || pm2 start npm --name "$PM2_APP" -- start
  pm2 save
  echo ""
  echo "✅  Deploy complete! Live at https://orca4ktv.com"
ENDSSH
