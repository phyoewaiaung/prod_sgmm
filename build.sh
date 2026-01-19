#!/bin/bash
set -e

echo "Building application..."
echo "Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "Installing Node dependencies..."
npm install

echo "Building frontend assets..."
npm run build

echo "Preparing database..."
php artisan migrate --force || true
php artisan cache:clear || true
php artisan config:clear || true

echo "Build complete! Starting server..."
