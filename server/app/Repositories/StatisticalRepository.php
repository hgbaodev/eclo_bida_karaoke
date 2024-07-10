<?php

namespace App\Repositories;

use App\Interface\StatisticalRepositoryInterface;
use App\Models\Order;
use App\Models\ProductImport;

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

    public function getStatisticalRevenueEx($validated)
    {
        $beginOrder = Order::where('checkout_time', '<=', $validated['start_day'])->sum('total_price');
        $beginImport = ProductImport::where('receive_time', '<=', $validated['start_day'])->sum('total_cost');
        $initialTotal = $beginOrder - $beginImport;
        $endTotal = $initialTotal;

        $order = Order::getRevenueEx($validated['start_day'], $validated['end_day']);
        $import = ProductImport::getRevenueEx($validated['start_day'], $validated['end_day']);

        $listRevenueEx = [];

        foreach ($order as $item) {
            $value = $item->total_price;
            $endTotal += $value;
            $listRevenueEx[] = [
                'time' => $item->checkout_time,
                'customer' => $item->user->first_name . ' ' . $item->user->last_name,
                'revenue' => $value,
                'expenditure' => 0,
                'remaining' => $endTotal,
            ];
        }

        foreach ($import as $item) {
            $value = $item->total_cost;
            $endTotal -= $value;
            $listRevenueEx[] = [
                'time' => $item->receive_time,
                'customer' => 'Nguyễn Văn A',
                'revenue' => 0,
                'expenditure' => $value,
                'remaining' => $endTotal,
            ];
        }

        // Sort the array by time in ascending order
        usort($listRevenueEx, function ($a, $b) {
            return strtotime($a['time']) - strtotime($b['time']);
        });

        // Recalculate the remaining amount correctly after sorting
        $sortedEndTotal = $initialTotal;
        foreach ($listRevenueEx as &$entry) {
            if ($entry['revenue'] > 0) {
                $sortedEndTotal += $entry['revenue'];
            } else {
                $sortedEndTotal -= $entry['expenditure'];
            }
            $entry['remaining'] = $sortedEndTotal;
        }

        $result = [
            'beginTotal' => $initialTotal,
            'endTotal' => $sortedEndTotal,
            'listRevenueEx' => $listRevenueEx,
        ];

        return $result;
    }
}
