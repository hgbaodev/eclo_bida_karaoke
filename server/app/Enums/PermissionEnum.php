<?php

namespace App\Enums;


enum PermissionEnum: int
{
    case VIEW = 1;
    case CREATE = 2;
    case UPDATE = 3;
    case DELETE = 4;
}