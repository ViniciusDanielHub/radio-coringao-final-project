#!/bin/bash
cd "$(dirname "$0")"
exec ./node_modules/.bin/electron dist/main.js --no-sandbox --disable-gpu --disable-gpu-compositing --use-gl=swiftshader --in-process-gpu
