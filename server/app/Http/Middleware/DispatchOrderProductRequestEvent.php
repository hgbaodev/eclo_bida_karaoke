<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Events\OrderProductRequestEvent;

class DispatchOrderProductRequestEvent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        //TODO: Validating the request.
        $order = $request->order;
        $products = $request->requestedProducts;

        event(new OrderProductRequestEvent($order, $products));

        return $response;
    }
}
