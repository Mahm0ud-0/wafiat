<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/new-naweh', function () {
    return Inertia::render('Form');
});

Route::post('/new-naweh', function (Request $request) {
    return redirect()->back()->with('success', 'form submitted!');
});