<?php

use App\Http\Controllers\LogisticController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/logistic', [LogisticController::class, 'index'])->name('logistic.index');
Route::get('/logistic/sg-mm', [LogisticController::class, 'toSgMm'])->name('logistic.toSgMm');
Route::get('/logistic/sg-mm-save', [LogisticController::class, 'saveSGtoMM'])->name('logistic.sg-save');

Route::get('/logistic/mm-sg', [LogisticController::class, 'toMmSG'])->name('logistic.toMmSg');
Route::get('/logistic/mm-sg-save', [LogisticController::class, 'saveMMtoSG'])->name('logistic.mm-save');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/**** Pages */
Route::get('/check-parcel', function() {
    return Inertia::render('CheckParcelIndex');
})->name('check-parcel');

Route::get('/mm-to-sg', function() {
    return Inertia::render('MyanmarToSGIndex');
})->name('mm-to-sg');

Route::get('/sg-to-mm', function() {
    return Inertia::render('SingaporeToMMIndex');
})->name('sg-to-mm');

Route::get('logistic-price-list', function() {
    return Inertia::render('PriceListIndex');
})->name('logistic-price-list');

require __DIR__.'/auth.php';
