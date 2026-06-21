#!/bin/bash
# ==========================================
# AUTO-SETUP SCRIPT UNTUK E-COMMERCE UI
# ==========================================
echo "🚀 Memulai inisialisasi environment secara otonom..."
npm install lucide-react --legacy-peer-deps
npx shadcn-ui@latest init -y
mkdir -p components/ui
npm run dev
