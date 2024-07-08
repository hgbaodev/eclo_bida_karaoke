<?php

namespace App\Repositories;

use App\Interface\StatisticalRepositoryInterface;
use App\Models\Order;

class StatisticalRepository implements StatisticalRepositoryInterface
{
    public function getStatisticalOverView()
    {
        $todayRevenue = Order::getRevenueToday();
        $yesterdayRevenue = Order::getRevenueYesterday();
        $thisWeekRevenue = Order::getRevenueThisWeek();
        $thisMonthRevenue = Order::getRevenueThisMonth();
        $result = [
            [
                'label' => 'Yesterday Revenue',
                'value' => $yesterdayRevenue,
            ],
            [
                'label' => 'Today Revenue',
                'value' => $todayRevenue,
            ],
            [
                'label' => 'This Week Revenue',
                'value' => $thisWeekRevenue,
            ],
            [
                'label' => 'This Month Revenue',
                'value' => $thisMonthRevenue,
            ],
        ];
        return $result;
    }
    public function getStatisticalTime($request)
    {
        $result = [];
        if ($request->time == 'week') {
            $result = Order::getDailyRevenueThisWeek();
        } else if ($request->time == 'month') {
            $result = Order::getDailyRevenueInCurrentMonth();
        }
        return $result;
    }
}
