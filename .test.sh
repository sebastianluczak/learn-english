#!/bin/bash

UI_PATH="$(pwd)/ui"
SERVICE_PATH="$(pwd)/service"

ui_tests() {
    echo "Navigating to ${UI_PATH}..."
    cd "$UI_PATH" || { echo "Failed to navigate to UI path"; exit 1; }
    echo "Installing dependencies..."
    npm install || { echo "npm install failed"; exit 1; }
    echo "Linting code..."
    npm run lint:check || { echo "Linting failed"; exit 1; }
}

service_tests() {
    echo "Navigating to ${SERVICE_PATH}..."
    cd "$SERVICE_PATH" || { echo "Failed to navigate to Service path"; exit 1; }
    echo "Installing dependencies..."
    npm install || { echo "npm install failed"; exit 1; }
    echo "Linting code..."
    npm run lint:check || { echo "Linting failed"; exit 1; }
    echo "Executing Unit tests..."
    npm run test:cov || { echo "Unit tests failed"; exit 1; }
}

echo "Environment is ready for tests :-)"
echo "Starting Frontend tests..."
ui_tests
echo "Starting Backend tests..."
service_tests
echo "Tests script is done."
