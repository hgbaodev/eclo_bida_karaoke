<?php

namespace App\Providers;

use App\Interface\AreaRepositoryInterface;
use App\Interface\CustomerRepositoryInterface;
use App\Interface\DeviceRepositoryInterface;
use App\Interface\KitchenOrderRepositoryInterface;
use App\Interface\LoggerRepositoryInterface;
use App\Interface\AttendanceRepositoryInterface;
use App\Interface\CompanyRepositoryInterface;
use App\Interface\OrderDetailRepositoryInterface;
use App\Interface\OrderRepositoryInterface;
use App\Interface\PositionRepositoryInterface;
use App\Interface\PriceRepositoryInterface;
use App\Interface\ProductImportInterface;
use App\Interface\ProductImpDetailInterface;
use App\Interface\RoleFunctionalPermissionRepositoryInterface;
use App\Interface\RoleRepositoryInterface;
use App\Interface\ServiceDeviceDetailRepositoryInterface;
use App\Interface\ServiceTypeRepositoryInterface;
use App\Interface\ShiftRepositoryInterface;
use App\Interface\StaffRepositoryInterface;
use App\Interface\ProductRepositoryInterface;
use App\Interface\ProductTypeRepositoryInterface;
use App\Interface\SalaryRepositoryInterface;
use App\Interface\ServiceRepositoryInterface;
use App\Interface\ShiftDetailRepositoryInterface;
use App\Interface\ShiftUserDetailRepositoryInterface;
use App\Interface\SupplierRepositoryInterface;
use App\Interface\UserRepositoryInterface;
use App\Interface\WorkShiftRepositoryInterface;
use App\Interface\DayOffRepositoryInterface;
use App\Interface\FunctionalRepositoryInterface;
use App\Interface\StatisticalRepositoryInterface;
use App\Repositories\AreaRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\DeviceRepository;
use App\Repositories\KitchenOrderRepository;
use App\Repositories\LoggerRepository;
use App\Repositories\AttendanceRepository;
use App\Repositories\CompanyRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PositionRepository;
use App\Repositories\PriceRepository;
use App\Repositories\ProductImportRepository;
use App\Repositories\RoleFunctionalPermissionRepository;
use App\Repositories\RoleRepository;
use App\Repositories\ServiceDeviceDetailRepository;
use App\Repositories\SupplierRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\ServiceTypeRepository;
use App\Repositories\ShiftRepository;
use App\Repositories\StaffRepository;
use App\Repositories\ProductImpDetailRepository;
use App\Repositories\ProductRepository;
use App\Repositories\ProductTypeRepository;
use App\Repositories\SalaryRepository;
use App\Repositories\ServiceReposirory;
use App\Repositories\ShiftDetailRepository;
use App\Repositories\ShiftUserDetailRepository;
use App\Repositories\WorkShiftRepository;
use App\Repositories\DayOffRepository;
use App\Repositories\FunctionalRepository;
use App\Repositories\StatisticalRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(RoleFunctionalPermissionRepositoryInterface::class, RoleFunctionalPermissionRepository::class);
        $this->app->bind(CustomerRepositoryInterface::class, CustomerRepository::class);
        $this->app->bind(SupplierRepositoryInterface::class, SupplierRepository::class);
        $this->app->bind(AreaRepositoryInterface::class, AreaRepository::class);
        $this->app->bind(DeviceRepositoryInterface::class, DeviceRepository::class);
        $this->app->bind(ServiceTypeRepositoryInterface::class, ServiceTypeRepository::class);
        $this->app->bind(StaffRepositoryInterface::class, StaffRepository::class);
        $this->app->bind(ShiftRepositoryInterface::class, ShiftRepository::class);
        $this->app->bind(PositionRepositoryInterface::class, PositionRepository::class);
        $this->app->bind(LoggerRepositoryInterface::class, LoggerRepository::class);
        $this->app->bind(ProductImportInterface::class, ProductImportRepository::class);
        $this->app->bind(ProductImpDetailInterface::class, ProductImpDetailRepository::class);
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(PriceRepositoryInterface::class, PriceRepository::class);
        $this->app->bind(OrderRepositoryInterface::class, OrderRepository::class);
        $this->app->bind(ServiceRepositoryInterface::class, ServiceReposirory::class);
        $this->app->bind(ShiftDetailRepositoryInterface::class, ShiftDetailRepository::class);
        $this->app->bind(ShiftUserDetailRepositoryInterface::class, ShiftUserDetailRepository::class);
        $this->app->bind(WorkShiftRepositoryInterface::class, WorkShiftRepository::class);
        $this->app->bind(AttendanceRepositoryInterface::class, AttendanceRepository::class);
        $this->app->bind(ProductTypeRepositoryInterface::class, ProductTypeRepository::class);
        $this->app->bind(KitchenOrderRepositoryInterface::class, KitchenOrderRepository::class);
        $this->app->bind(ServiceDeviceDetailRepositoryInterface::class, ServiceDeviceDetailRepository::class);
        $this->app->bind(OrderDetailRepositoryInterface::class, OrderDetailRepository::class);
        $this->app->bind(SalaryRepositoryInterface::class, SalaryRepository::class);
        $this->app->bind(DayOffRepositoryInterface::class, DayOffRepository::class);
        $this->app->bind(StatisticalRepositoryInterface::class, StatisticalRepository::class);
        $this->app->bind(FunctionalRepositoryInterface::class, FunctionalRepository::class);
        $this->app->bind(CompanyRepositoryInterface::class, CompanyRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
