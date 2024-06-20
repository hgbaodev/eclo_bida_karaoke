<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Event\SendEvent;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Events\OrderProductRequestEvent;

class DispatchOrderProductRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        //TODO: Validating the request.x
        $data = $request->data;
        SendEvent::send('productOrder.requested', $data);
        return $response;
    }
}
