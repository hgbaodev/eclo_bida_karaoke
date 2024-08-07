<?php

namespace App\Http\Middleware;

use App\Events\MarkOrderRequestAsReadEvent;
use App\Http\Controllers\Event\SendEvent;
use Closure;
use Illuminate\Http\Request;

class MarkKitchenOrderAsWaiting
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
        //TODO: Validate the request.
        SendEvent::send('kitchenOrderWaitingEvent', $request->data);
        return $response;
    }
}
