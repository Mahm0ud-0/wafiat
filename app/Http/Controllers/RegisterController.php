<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('Register');
    }

    public function store(Request $request)
    {
        // validate
        $data = $request->validate([
            "email" => "required|email",
            "password" => "required|min:8",
            "confirmPassword" => "required|same:password",
        ]);

        // store
        $user = User::create($data);

        // authenticate
        Auth::login($user);

        // redirect
        Inertia::render('Home');
    }
}
