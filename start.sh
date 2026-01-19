#!/bin/bash
set -e

echo "Starting Laravel server on port 5000..."
php artisan serve --host=0.0.0.0 --port=5000
