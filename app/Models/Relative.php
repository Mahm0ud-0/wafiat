<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relative extends Model
{
    protected $fillable = [
        "name",
        "last_name",
        "sur_name",
        "relation"
    ];
    public function Naweh()
    {
        return $this->belongsTo(Naweh::class);
    }
}
