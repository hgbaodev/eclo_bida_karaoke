<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\GeneratesUniqueActive;
use Illuminate\Support\Facades\DB;

class ProductImport extends Model
{

    public $timestamps = false;
    use HasFactory, GeneratesUniqueActive;
    use SoftDeletes;
    protected $fillable = [
        'total_cost',
        'import_day',
        'user_id',
        'active',
    ];
    protected $hidden = [
        'id', 'user_id',
    ];
    public function updateTotalCost()
    {
        // Tính tổng `cost_price` từ `import_detail` và cập nhật `total_cost` trong `import`
        $this->total_cost = $this->productimport()->sum(DB::raw('cost_price * quantity'));
        $this->save();
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->active)) {
                $model->active = self::generateUniqueActive();
            }
        });
    }
    public function productimport()
    {
        return $this->hasMany(ProductImportDetail::class, 'import_id');
    }
    public function user_import()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public static function getRevenueEx($startDay, $endDay)
    {
        return self::whereBetween('receive_time', [$startDay, $endDay])->get();
    }
}
