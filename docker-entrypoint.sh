#!/bin/bash
set -e

echo "Running migrations..."
php artisan migrate --force || true

echo "Clearing cache..."
php artisan cache:clear || true
php artisan config:clear || true

echo "Starting Apache..."
exec apache2-foreground
