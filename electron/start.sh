#!/bin/bash
# Start Electron with Vite - auto-restarts Vite if it dies
cd "$(dirname "$0")"

cleanup() { pkill -f "vite" 2>/dev/null; pkill -f "electron" 2>/dev/null; exit 0; }
trap cleanup SIGINT SIGTERM

# Kill any existing processes
pkill -f "electron" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 1

start_vite() {
  npx vite --port 5173 > /tmp/electron-vite.log 2>&1 &
  VITE_PID=$!
  # Wait for Vite to be ready
  for i in $(seq 1 15); do
    if curl -s -o /dev/null -w '' http://localhost:5173/ 2>/dev/null; then
      echo "Vite ready"
      return 0
    fi
    sleep 1
  done
  echo "Vite failed to start"
  return 1
}

start_electron() {
  VITE_DEV_SERVER_URL="http://localhost:5173" npx electron . > /tmp/electron-app.log 2>&1 &
  ELECTRON_PID=$!
}

start_vite || exit 1
start_electron

# Monitor loop - restart Vite if it dies
while true; do
  sleep 5
  # Check if Vite is alive
  if ! kill -0 $VITE_PID 2>/dev/null; then
    echo "Vite died, restarting..."
    start_vite
  fi
  # Check if Electron is alive, if not restart it
  if ! kill -0 $ELECTRON_PID 2>/dev/null; then
    echo "Electron died, restarting..."
    start_electron
  fi
  # Quick health check
  if ! curl -s -o /dev/null http://localhost:5173/ 2>/dev/null; then
    echo "Vite unreachable, restarting..."
    pkill -f "vite" 2>/dev/null
    sleep 2
    start_vite
  fi
done
