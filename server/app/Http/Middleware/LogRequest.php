<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Event\SendEvent;
use App\Models\Logger;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        if ($user) {
            $user_id = $user->id;
            $lastLog = Logger::where('user_id', $user_id)
                ->where('functional', 'auth')
                ->where('action', 'Login with token')
                ->orderBy('created_at', 'desc')
                ->first();
            $user_id = auth()->user()->id;
            if (!$lastLog || now()->diffInMinutes($lastLog->created_at) > 10) {
                $loginToken =  Logger::create([
                    'user_id' => $user_id,
                    'functional' => "auth",
                    'action' => "Login with token",
                    'url' => $request->url(),
                    'ip_address' => $request->ip(),
                ]);
                $log = Logger::with(['user.role'])->find($loginToken->id);
                SendEvent::send('loggerEvent', $log);
            }
        }
        Log::info('Request Logged:', [
            'url' => $request->url(),
            'method' => $request->method(),
            'params' => $request->all(),
        ]);

        return $next($request);
    }
}
