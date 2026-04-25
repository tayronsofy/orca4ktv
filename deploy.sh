#!/bin/bash
# Usage: ./deploy.sh
# Usage: ./deploy.sh "your commit message"
set -e

VPS_PATH="/root/smart4k-website"  # ← your actual path
PM2_APP="smart4k"                 # ← your PM2 name from pm2 list

# ─── FILL THESE IN ─────────────────────────────────────────────────
VPS_HOST="smart4k-vps"           # SSH shortcut (set up once, see below)
VPS_PATH="/root/smart4k-website" # ← change to your actual VPS path
PM2_APP="smart4k"                # ← change to your PM2 process name
# ───────────────────────────────────────────────────────────────────

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
  echo "✅  Deploy complete! Live at https://smart4k.io"
ENDSSH
