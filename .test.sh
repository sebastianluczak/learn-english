echo "Environment is ready for tests :-)";
echo "Starting Frontend tests..."
cd ui && npm ci && npm run lint:check && cd ../
echo "Starting Backend tests..."
cd service && npm ci && npm run lint:check && cd ../