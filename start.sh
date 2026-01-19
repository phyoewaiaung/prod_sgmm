#!/bin/bash
set -e

echo "Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "Installing Node dependencies..."
npm install

echo "Building assets..."
npm run build

echo "Setting up database..."
php artisan migrate --force || true
php artisan cache:clear || true
php artisan config:clear || true

echo "Starting Laravel server on port 5000..."
php artisan serve --host=0.0.0.0 --port=5000
