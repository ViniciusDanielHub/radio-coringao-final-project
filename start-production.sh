#!/bin/bash
# Script de inicialização para produção
# Uso: ./start-production.sh

echo "🚀 Iniciando Rádio Coringão em modo produção..."

# Verificar se os builds existem
if [ ! -d "sports-news-api-ts/dist" ]; then
  echo "❌ Build da sports-news-api não encontrado. Execute: cd sports-news-api-ts && npm run build"
  exit 1
fi

if [ ! -d "clube-api/dist" ]; then
  echo "❌ Build da clube-api não encontrado. Execute: cd clube-api && npm run build"
  exit 1
fi

if [ ! -d "radio-coringao-frontend/.next" ]; then
  echo "❌ Build do frontend não encontrado. Execute: cd radio-coringao-frontend && npm run build"
  exit 1
fi

echo "✅ Todos os builds encontrados"

# Iniciar APIs em background
echo "📡 Iniciando sports-news-api na porta 3007..."
cd sports-news-api-ts && node dist/app.js &
SPORTS_PID=$!

echo "📡 Iniciando clube-api na porta 3010..."
cd ../clube-api && node dist/app.js &
CLUBE_PID=$!

cd ..

# Aguardar APIs iniciarem
sleep 3

# Iniciar frontend
echo "🌐 Iniciando frontend na porta 3000..."
cd radio-coringao-frontend && npm start &
FRONTEND_PID=$!

cd ..

echo ""
echo "✅ Todos os serviços iniciados:"
echo "   - Sports News API: http://localhost:3007"
echo "   - Clube API: http://localhost:3010"
echo "   - Frontend: http://localhost:3000"
echo ""
echo "Pressione Ctrl+C para parar todos os serviços"

# Trap para parar todos os processos
trap "echo 'Parando serviços...'; kill $SPORTS_PID $CLUBE_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

wait
