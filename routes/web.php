<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\NawehController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/new-naweh', [NawehController::class, "create"]);
Route::post('/new-naweh', [NawehController::class, "store"]);

// Auth
Route::middleware(['guest'])->group(function () {
    Route::get('/register', [RegisterController::class, 'create']);
    Route::post('/register', [RegisterController::class, 'store']);


    Route::get('login', [LoginController::class, 'create']);
    Route::post('login', [LoginController::class, 'store']);
});
Route::middleware(['auth'])->group(function () {
    Route::delete('logout', [LoginController::class, 'destroy']);
});
