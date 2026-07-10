#!/bin/bash
# Inicia as duas APIs do Radio Coringão
# Uso: ./start-apis.sh

DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Radio Coringao - APIs ==="

# Verificar builds
[ ! -d "$DIR/sports-news-api-ts/dist" ] && echo "Build sports-news-api nao encontrado. Rode: cd sports-news-api-ts && npm run build" && exit 1
[ ! -d "$DIR/clube-api/dist" ] && echo "Build clube-api nao encontrado. Rode: cd clube-api && npm run build" && exit 1

# Iniciar sports-news-api
echo "Iniciando sports-news-api (porta 3007)..."
cd "$DIR/sports-news-api-ts" && node dist/server.js &
PID1=$!

# Iniciar clube-api
echo "Iniciando clube-api (porta 3010)..."
cd "$DIR/clube-api" && node dist/server.js &
PID2=$!

cd "$DIR"

echo ""
echo "APIs rodando:"
echo "  sports-news-api: http://localhost:3007"
echo "  clube-api:       http://localhost:3010"
echo ""
echo "Ctrl+C para parar"

trap "kill $PID1 $PID2 2>/dev/null" INT TERM
wait
