<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('Login');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            "email" => "required|email",
            "password" => "required|min:8",
        ]);

        if (! Auth::attempt($data)) {
            throw ValidationException::withMessages([
                'authErr' => 'البريد الالكتروني او كلمة المرور غير صحيحة'
            ]);
        }

        $request->session()->regenerate();

        Inertia::render('Home');
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        Inertia::render('Home');
    }
}
