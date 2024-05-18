<?php

namespace App\Providers;

use App\Interface\AreaRepositoryInterface;
use App\Interface\CustomerRepositoryInterface;
use App\Interface\DeviceRepositoryInterface;
use App\Interface\RoleFunctionalPermissionRepositoryInterface;
use App\Interface\RoleRepositoryInterface;
use App\Interface\SupplierRepositoryInterface;
use App\Interface\UserRepositoryInterface;
use App\Repositories\AreaRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\DeviceRepository;
use App\Repositories\RoleFunctionalPermissionRepository;
use App\Repositories\RoleRepository;
use App\Repositories\SupplierRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(RoleFunctionalPermissionRepositoryInterface::class,RoleFunctionalPermissionRepository::class);
        $this->app->bind(CustomerRepositoryInterface::class, CustomerRepository::class);
        $this->app->bind(SupplierRepositoryInterface::class, SupplierRepository::class);
        $this->app->bind(AreaRepositoryInterface::class, AreaRepository::class);
        $this->app->bind(DeviceRepositoryInterface::class, DeviceRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
