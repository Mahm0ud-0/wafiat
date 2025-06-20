<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Naweh extends Model
{
    public function relatives()
    {
        return $this->hasMany(Relative::class);
    }
}
