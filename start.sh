#!/bin/bash
set -e

echo "Starting Laravel server on port 8080..."
php artisan serve --host=0.0.0.0 --port=8080
