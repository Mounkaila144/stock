<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Storage;

class Authenticate extends Middleware
{

    //add an array of routes to skip santize check

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {



            if ($request->is('store') || $request->is('store/*')) {
                return route('store.login');
            }

            if (! $request->expectsJson()) {
                return route('login');
            }

    }
}
