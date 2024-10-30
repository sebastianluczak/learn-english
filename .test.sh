#!/usr/bin/sh
echo "Environment is ready for tests :-)";
echo "Starting Frontend tests..."
cd ui && npm install && npm run lint:check && cd ../
echo "Starting Backend tests..."
cd service && npm install && npm run lint:check && cd ../