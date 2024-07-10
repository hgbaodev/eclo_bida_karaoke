<?php

namespace App\Models;

use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive, Notifiable;

    public $timestamps = true;

    protected $fillable = [
        'active',
        'status',
        'checkin_time',
        'checkout_time',
        'total_price',
        'customer_id',
        'user_id',
        'service_id',
    ];

    protected $hidden = [
        'deleted_at',
        'id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->active)) {
                $model->active = self::generateUniqueActive();
            }
        });
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function customer()
    {
        return $this->hasOne(Customer::class, 'id', 'customer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderdetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function orderdevicedetails()
    {
        return $this->hasMany(OrderDeviceDetail::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_details')->withPivot('quantity');
    }

    public function kitchenOrders()
    {
        return $this->hasMany(KitchenOrder::class);
    }

    public function getActiveAttribute()
    {
        return Arr::get($this->attributes, 'active', null);
    }

    public static function getRevenueToday()
    {
        return self::whereDate('checkout_time', Carbon::today())->sum('total_price');
    }

    public static function getRevenueYesterday()
    {
        return self::whereDate('checkout_time', Carbon::yesterday())->sum('total_price');
    }

    public static function getRevenueThisWeek()
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        return self::whereBetween('checkout_time', [$startOfWeek, Carbon::now()])->sum('total_price');
    }

    public static function getRevenueThisMonth()
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        return self::whereBetween('checkout_time', [$startOfMonth, Carbon::now()])->sum('total_price');
    }

    public static function getWeeklyRevenue()
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        return self::select(
            DB::raw('DATE(checkout_time) as date'),
            DB::raw('SUM(total_price) as total_revenue')
        )
            ->whereBetween('checkout_time', [$startOfWeek, $endOfWeek])
            ->groupBy(DB::raw('DATE(checkout_time)'))
            ->orderBy('date', 'ASC')
            ->get()
            ->pluck('total_revenue', 'date')
            ->toArray();
    }

    public static function getDailyRevenueThisWeek()
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        // Initialize an array to hold the revenue for each day of the week
        $revenueByDay = [];
        $currentDate = $startOfWeek->copy();

        // Iterate through each day of the week
        while ($currentDate->lte($endOfWeek)) {
            $dayOfWeek = $currentDate->format('l'); // Get the name of the day (e.g., Monday, Tuesday)
            $revenueByDay[] = [
                'label' => $dayOfWeek,
                'value' => self::whereDate('created_at', $currentDate)->sum('total_price')
            ];
            $currentDate->addDay();
        }
        return $revenueByDay;
    }

    public static function getDailyRevenueInCurrentMonth()
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Select daily revenue
        $dailyRevenue = self::select(
            DB::raw('DATE(checkout_time) as date'),
            DB::raw('SUM(total_price) as total_revenue')
        )
            ->whereBetween('checkout_time', [$startOfMonth, $endOfMonth])
            ->groupBy(DB::raw('DATE(checkout_time)'))
            ->orderBy('date', 'ASC')
            ->get();

        // Helper function to get the ordinal representation of the day of the month
        function getOrdinalSuffix($day)
        {
            if (in_array(($day % 100), [11, 12, 13])) {
                return $day . 'th';
            }
            switch ($day % 10) {
                case 1:
                    return $day . 'st';
                case 2:
                    return $day . 'nd';
                case 3:
                    return $day . 'rd';
                default:
                    return $day . 'th';
            }
        }

        // Organize the results
        $revenueByDay = [];
        foreach ($dailyRevenue as $revenue) {
            $date = $revenue->date;
            $totalRevenue = $revenue->total_revenue;
            $dayOfMonth = Carbon::parse($date)->day;
            $ordinalDate = getOrdinalSuffix($dayOfMonth);
            $revenueByDay[$ordinalDate] = $totalRevenue;
        }

        $currentDate = $startOfMonth->copy();
        while ($currentDate->lte($endOfMonth)) {
            $dayOfMonth = $currentDate->day;
            $ordinalDate = getOrdinalSuffix($dayOfMonth);
            if (!isset($revenueByDay[$ordinalDate])) {
                $revenueByDay[$ordinalDate] = 0;
            }
            $currentDate->addDay();
        }

        // Convert the array to the desired format
        $result = [];
        $currentDate = $startOfMonth->copy();
        while ($currentDate->lte($endOfMonth)) {
            $dayOfMonth = $currentDate->day;
            $ordinalDate = getOrdinalSuffix($dayOfMonth);
            $result[] = [
                'label' => $ordinalDate,
                'value' => $revenueByDay[$ordinalDate]
            ];
            $currentDate->addDay();
        }

        return $result;
    }

    public static function getRevenueEx($startDay, $endDay)
    {
        return self::with(['user'])->whereBetween('checkout_time', [$startDay, $endDay])->get();
    }
}