<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Event\SendEvent;
use App\Models\Logger;
use Closure;
use Illuminate\Http\Request;

class LogUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $functional, $action)
    {
        $response = $next($request);
        $user_id = auth()->user()->id;
        $logger = Logger::create([
            'user_id' => $user_id,
            'functional' => $functional,
            'action' => $action,
            'url' => $request->url(),
            'ip_address' => $request->ip(),
        ]);
        $log = Logger::with(['user.role'])->find($logger->id);
        SendEvent::send('loggerEnvent', $log);

        return $response;
    }
}
