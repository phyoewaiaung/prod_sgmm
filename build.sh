#!/bin/bash
set -e

echo "Building application..."
echo "Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "Installing Node dependencies..."
npm install

echo "Building frontend assets..."
npm run build

echo "Creating database file..."
mkdir -p database
touch database/database.sqlite

echo "Preparing database..."
php artisan migrate:fresh --force
php artisan db:seed --force
php artisan cache:clear
php artisan config:clear

echo "Build complete! Starting server..."
