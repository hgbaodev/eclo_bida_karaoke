<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MigrateFreshWithPassport extends Command
{
    protected $signature = 'migrate:refreshPassport';

    protected $description = 'Fresh migrate the database and install Passport';

    public function handle()
    {
        $this->call('migrate:fresh', [
            '--seed' => true,
            '--force' => true
        ]);
        $this->call('jwt:secret');
        $this->info('Database fresh migrated with Passport installed.');
    }
}