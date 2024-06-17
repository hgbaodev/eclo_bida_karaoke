<?php

use App\Http\Middleware\Auth;
use App\Http\Middleware\LogRequest;
use App\Http\Middleware\LogUserActivity;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(LogRequest::class);
        $middleware->alias([
            'logger' => LogUserActivity::class,
            'mark.orderRequestAsRead.event'=>\App\Http\Middleware\MarkOrderRequestAsReadEvent::class,
            'dispatch.order.event' => \App\Http\Middleware\DispatchOrderProductRequestEvent::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 401);
            }
        });
    })->create();
