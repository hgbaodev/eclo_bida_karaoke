<?php

namespace App\Enums;

enum KitchenOrderEnum: string
{
    case RECEIVED = 'R';
    case PROCESSING = 'P';
    case WAITING = 'W';
    case DONE = 'D';
}
