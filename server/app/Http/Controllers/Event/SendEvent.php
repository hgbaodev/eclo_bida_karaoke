<?php

namespace App\Http\Controllers\Event;

use GuzzleHttp\Exception\GuzzleException;
use Pusher\ApiErrorException;
use Pusher\Pusher;
use Pusher\PusherException;

class SendEvent
{
    /**
     * @throws PusherException
     * @throws GuzzleException
     * @throws ApiErrorException
     */
    public static function send($event, $data)
    {
        $options = array(
            'cluster' => env('PUSHER_APP_CLUSTER', 'ap1'),
            'useTLS' => true
        );
        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            $options
        );

        $pusher->trigger('eclo-channel', $event, $data);
    }
}
