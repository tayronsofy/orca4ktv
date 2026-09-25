#!/bin/bash
# Deploy orca4ktv.com
#
#   ./deploy.sh                    commit everything with a timestamped message
#   ./deploy.sh "commit message"   commit everything with your message
#   ./deploy.sh --no-check         skip the local typecheck
#
# Pushing to main triggers .github/workflows/deploy.yml, which SSHes into the
# VPS, pulls main, runs `npm install && npm run build`, and restarts pm2.
set -euo pipefail

cd "$(dirname "$0")"

CHECK=1
MSG=""
for arg in "$@"; do
  case "$arg" in
    --no-check) CHECK=0 ;;
    *) MSG="$arg" ;;
  esac
done
MSG="${MSG:-deploy: $(date '+%Y-%m-%d %H:%M')}"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  echo "✗  You are on '$BRANCH'. Deploys only go out from 'main'." >&2
  exit 1
fi

# Refuse to commit secrets or PII by accident.
BLOCKED="$(git status --porcelain --untracked-files=all \
  | grep -v '^D' \
  | awk '{print $2}' \
  | grep -E '(^|/)\.env(\..*)?$|^exports/|\.zip$' || true)"
if [ -n "$BLOCKED" ]; then
  echo "✗  Refusing to deploy: these files look like secrets or customer data:" >&2
  echo "$BLOCKED" | sed 's/^/     /' >&2
  echo "   Add them to .gitignore or remove them, then retry." >&2
  exit 1
fi

if [ "$CHECK" = 1 ]; then
  echo "▶  Typechecking..."
  npx tsc --noEmit -p tsconfig.json
fi

echo "▶  Syncing with origin/main..."
git fetch origin main
if [ -n "$(git log --oneline HEAD..origin/main)" ]; then
  echo "   Remote has new commits (fixture updates, etc). Rebasing on top..."
  STASHED=0
  if [ -n "$(git status --porcelain --untracked-files=all)" ]; then
    git stash push -q --include-untracked -m "deploy.sh autostash" && STASHED=1
  fi
  git rebase origin/main
  if [ "$STASHED" = 1 ]; then git stash pop -q; fi
fi

echo "▶  Committing..."
git add -A
if git diff --cached --quiet; then
  echo "   (nothing new to commit)"
else
  git status --short
  git commit -q -m "$MSG"
  echo "   committed: $MSG"
fi

if [ -z "$(git log --oneline origin/main..HEAD)" ]; then
  echo "✓  Nothing to push. origin/main is already up to date."
  exit 0
fi

echo "▶  Pushing to origin/main..."
git push origin main

echo ""
echo "✓  Pushed. GitHub Actions is deploying to the VPS."
if command -v gh >/dev/null 2>&1; then
  echo "▶  Watching the deploy run (Ctrl+C to stop watching; the deploy continues)..."
  sleep 5
  RUN_ID="$(gh run list --workflow=deploy.yml --branch=main --limit=1 --json databaseId --jq '.[0].databaseId' 2>/dev/null || true)"
  if [ -n "$RUN_ID" ]; then
    gh run watch "$RUN_ID" --exit-status && echo "✓  Live at https://orca4ktv.com"
  else
    echo "   Could not find the run yet. Check: gh run list --workflow=deploy.yml"
  fi
else
  echo "   Watch it at: https://github.com/tayronsofy/orca4ktv/actions/workflows/deploy.yml"
fi
