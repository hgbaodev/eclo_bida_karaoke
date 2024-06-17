<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class MarkOrderRequestAsReadEvent
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
        if ($request->has('id')) {
            $notification = DatabaseNotification::find($request->id);

            if ($notification) {
                $notification->markAsRead();
            }
        }
        return $next($request);
    }
}
