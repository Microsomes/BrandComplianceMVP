<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plans extends Model
{
    protected $guarded = [];

    public function combinations()
    {
        return $this->hasMany(Combination::class);
    }

}
