<?php

use App\Http\Controllers\NawehController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/new-naweh',[NawehController::class, "create"]);
Route::post('/new-naweh', [NawehController::class, "store"]);
