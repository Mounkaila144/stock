<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Modules\Task\Database\Factories\TaskFactory;

class Task extends Model
{

    
    protected $dates = ['deleted_at','remind_at','created_at','updated_at'];

    /**
     * Fillable columns.
     *
     * @var string[]
     */
    protected $fillable = ['title', 'description', 'remind_at','expire_at', 'priority', 'status'];
}