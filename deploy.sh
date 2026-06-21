#!/bin/bash
# Usage: ./deploy.sh
# Usage: ./deploy.sh "your commit message"
set -e

MSG="${1:-deploy: $(date '+%Y-%m-%d %H:%M')}"

echo ""
echo "▶  Committing and pushing to git..."
git add -A
git diff --cached --quiet && echo "   (nothing new to commit)" || git commit -m "$MSG"
git push origin main

echo ""
echo "✅  Code successfully pushed to GitHub (orca4ktv)!"
echo "▶  Render will automatically build and deploy from the main branch."

