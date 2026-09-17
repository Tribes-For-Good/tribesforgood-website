#!/bin/bash
# Double-click this file to preview the website locally.
# It opens at http://localhost:3000 — close this window to stop.
cd "$(dirname "$0")"
export PATH="/usr/local/bin:$PATH"
echo "Starting the TribesforGOOD website preview..."
echo "It will open in your browser in a few seconds."
echo "Keep this window open. Close it when you're done."
echo ""
(sleep 6 && open http://localhost:3000) &
npm run dev
