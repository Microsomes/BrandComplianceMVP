<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Combination extends Model
{
    protected $guarded = [];

    public function phone()
    {
        return $this->belongsTo(Phone::class);
    }

    public function plans()
    {
        return $this->hasMany(Plans::class);
    }
}
