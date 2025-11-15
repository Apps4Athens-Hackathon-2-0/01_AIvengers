#!/bin/bash

# PolisPraxis Quick Start Script
# Double-click this file to run!

cd "$(dirname "$0")"

echo "🚀 PolisPraxis - Starting Your Hackathon Project!"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install it from: https://nodejs.org/"
    echo ""
    read -p "Press Enter to exit..."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first time only)..."
    echo "⏱️  This will take 2-3 minutes..."
    echo ""
    npm install
    echo ""
    echo "✅ Dependencies installed!"
    echo ""
fi

echo "🔥 Starting development server..."
echo ""
echo "================================================"
echo "🌐 Your server will be available at:"
echo "   http://localhost:3000"
echo ""
echo "🎯 Test the pledge system at:"
echo "   http://localhost:3000/test"
echo ""
echo "================================================"
echo ""
echo "⚠️  Keep this window open while using the app"
echo "❌ To stop the server, press Ctrl+C"
echo ""
echo "================================================"
echo ""

# Start the server
npm run dev
