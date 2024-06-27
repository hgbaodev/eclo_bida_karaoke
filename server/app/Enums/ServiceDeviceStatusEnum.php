<?php

namespace App\Enums;


enum ServiceDeviceStatusEnum: string
{
//    Đang sử dụng
    case IN_USE = "in_use";
//    Khả dụng
    case AVAILABLE = "available";
//    Bảo trì
    case MAINTENANCE = "maintenance";
//    Không hoạt động
    case OUT_OF_ORDER = "out_of_order";
}
