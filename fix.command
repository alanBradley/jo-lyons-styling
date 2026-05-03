#!/bin/bash
# Commits and pushes the Sorcha portrait.

cd "$(dirname "$0")" || exit 1

echo "=== Removing stale git locks ==="
find .git -name "*.lock" -print -delete
echo

echo "=== Status ==="
git status --short
echo

echo "=== Staging ==="
git add images/sorcha.jpg

echo "=== Committing ==="
git commit -m "Add Sorcha Gillett portrait for testimonial"
echo

echo "=== Pulling remote ==="
if ! git pull --rebase; then
  echo "Rebase conflict — resolve and run: git rebase --continue && git push"
  exit 1
fi

echo "=== Pushing ==="
git push
echo
echo "Done."
