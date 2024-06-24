<?php

namespace App\Http\Middleware;

use App\Events\MarkOrderRequestAsReadEvent;
use App\Http\Controllers\Event\SendEvent;
use Closure;
use Illuminate\Http\Request;

class MarkKitchenOrderAsDone
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        //TODO: Validating the request.

        return $response;
    }
}
