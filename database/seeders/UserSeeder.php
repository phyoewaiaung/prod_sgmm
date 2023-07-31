<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table("users")->truncate();
        DB::table("users")->insert([
            [
                "name"          =>  "Admin",
                "email"         =>  "admin@gmail.com",
                "password"      =>  Hash::make('password'),
                "role"          =>  1,
                "created_at"    =>  Carbon::now()->format("Y-m-d H:i:s"),
                "updated_at"    =>  Carbon::now()->format("Y-m-d H:i:s")
            ],
        ]);
    }
}