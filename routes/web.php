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
// Route::get('/logistic/sg-mm', [LogisticController::class, 'toSgMm'])->name('logistic.toSgMm');
Route::post('/logistic/sg-mm-save', [LogisticController::class, 'saveSGtoMM'])->name('logistic.sg-save');

// Route::get('/logistic/mm-sg', [LogisticController::class, 'toMmSG'])->name('logistic.toMmSg');
Route::post('/logistic/mm-sg-save', [LogisticController::class, 'saveMMtoSG'])->name('logistic.mm-save');
Route::post('/logistic/search', [LogisticController::class, 'search'])->name('logistic.search');
Route::get('/load-pdf', [LogisticController::class, 'createPdf'])->name('loadpdf');
// Route::post('/save-issue', [LogisticController::class, 'saveIssue'])->name('save-issue');
Route::post('/save-issue', [LogisticController::class, 'issuceFileCreate'])->name('save-issue');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/**** Pages */
Route::get('/check-parcel', function () {
    return Inertia::render('CheckParcelIndex');
})->name('check-parcel');

Route::get('/mm-to-sg-okkala', function () {
    return Inertia::render('MyanmarToSgOkkala');
})->name('mm-to-sg-okkala');

Route::get('/mm-to-sg-alon', function () {
    return Inertia::render('MyanmarToSgAlon');
})->name('mm-to-sg-alon');

Route::get('/sg-to-mm', function () {
    return Inertia::render('SingaporeToMMIndex');
})->name('sg-to-mm');

Route::get('logistic-price-list', function () {
    return Inertia::render('PriceListIndex');
})->middleware(['auth', 'verified'])->name('logistic-price-list');

Route::get('check-invoice', function () {
    return Inertia::render('CheckInvoiceIndex');
})->middleware(['auth', 'verified'])->name('check-invoice');

Route::get('invoice-issue', [LogisticController::class, 'invoiceIssue'])->name('invoice-issue');

require __DIR__ . '/auth.php';
