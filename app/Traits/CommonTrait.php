<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Pagination\LengthAwarePaginator;

trait CommonTrait
{
    public function paginate($items, $perPage = null, $page = null,$options = [])
    {
        $paginateLimit  = 10;
        $perPage        = $perPage ? (int)$perPage : $paginateLimit;
        $page           = $page ?: (Paginator::resolveCurrentPage() ?: config('ONE'));
        $items          = $items instanceof Collection ? $items : Collection::make($items);
        $returnData     = [];
        foreach ($items->forPage($page, $perPage) as  $data) {
            array_push($returnData, $data);
        }
        return new LengthAwarePaginator($returnData, $items->count(), $perPage, $page, $options);
    }

    public function mailSend($data, $file, $blade)
    {
        try {
            $files = [
                public_path("storage/$file")
            ];

            Mail::send("mail.$blade", $data, function ($message) use ($data, $files) {
                $message->to($data["email"])
                    ->subject($data["title"]);

                foreach ($files as $file) {
                    $message->attach($file);
                }
            });

            return true;
        } catch (\Exception $e) {
            Log::info($e);
            return false;
        }
    }
}