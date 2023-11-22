<?php

namespace App\Traits;

use Mpdf\Mpdf;
use Carbon\Carbon;
use App\Models\MmToSgItem;
use App\Models\SgToMmItem;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\Pagination\LengthAwarePaginator;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

trait CommonTrait
{

    # sample format
    # SG        -> SM23-08W3002
    # Okkala    -> MS23-08W3F002
    # Alone     -> MS23-08W3F502
    public function getInvoiceNo($data)
    {
        $date = today();
        $default = "";
        $no = '002';
        $carbonDate = Carbon::parse($date);
        $month = Carbon::parse($date)->format('m');
        $year = Carbon::parse($date)->format('y');
        $Y = Carbon::parse($date)->format('Y');
        $dayAlpha = substr(Carbon::parse($date)->format('D'), 0, 1);
        $weekOfMonth = ceil(($carbonDate->day) / 7);

        $firstDayOfMonth = Carbon::createFromDate($Y, $month, 1)->startOfDay();
        $lastDayOfMonth = Carbon::createFromDate($Y, $month, 1)->endOfMonth()->endOfDay();

        if ($data['name'] === 'SGMM') {
            $default = "SM";
            $lastNo = SgToMmItem::where('invoice_no', 'like', "%$default$year-$month" . "W" . "$weekOfMonth%")->orderBy('created_at', 'desc')->first();

            if (!empty($lastNo)) {
                $dbNo = $lastNo->invoice_no;

                $number = substr($dbNo, 9);
                $incrementedNumber = (int)$number + 1;
                $no = str_pad($incrementedNumber, strlen($number), '0', STR_PAD_LEFT);
            }
            $invoiceNo = "$default$year-$month" . "W" . "$weekOfMonth$no";
            return $invoiceNo;
        } else if ($data['name'] === 'MMSG') {
            if ($data['form'] == 2) {
                $default = "MS";
                $lastNo = MmToSgItem::where('invoice_no', 'like', "%$default$year-$month" . "W" . "$weekOfMonth%")->orderBy('created_at', 'desc')->first();
            } else if ($data['form'] == 3) {
                $default = "AS";
                $lastNo = MmToSgItem::where('invoice_no', 'like', "%$default$year-$month" . "W" . "$weekOfMonth%")->orderBy('created_at', 'desc')->first();
                $no = '502';
            }
            if (!empty($lastNo)) {
                $dbNo = $lastNo->invoice_no;
                $number = substr($dbNo, 10);
                $incrementedNumber = (int)$number + 1;
                $no = str_pad($incrementedNumber, strlen($number), '0', STR_PAD_LEFT);
            }
            $invoiceNo = "$default$year-$month" . "W" . "$weekOfMonth$dayAlpha$no";
            return $invoiceNo;
        }
    }

    public function paginate($items, $perPage = null, $page = null, $options = [])
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

    public function createPdf($data)
    // public function createPdf()
    {
        // $data = SgToMmItem::orderBy('id', 'desc')->first();
        // $data = MmToSgItem::orderBy('id', 'desc')->first();
        $flag = $data->form;
        $invoiceNo = $data->invoice_no;

        $mpdf = new Mpdf([
            'tempDir' => storage_path('app/mpdf/custom/temp/dir/path'),
            'format'  => 'A4',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 15,
            'margin_header' => 10,
            'margin_footer' => 10,

        ]);

        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;

        $html = View::make('pdf/parcel_tag')
            ->with('data', $data)
            ->with('flag', $flag);
        $html->render();
        $mpdf->WriteHTML($html);
        $fileName = "$invoiceNo.pdf";
        $storagePath = "parcel-tag-file/$flag/";

        Storage::disk('public')->put($storagePath . $fileName, $mpdf->Output($fileName, "S"));
        return [
            'status' => 'OK',
            'invoice_no' => $invoiceNo,
            'fileName' =>  "$storagePath$fileName"
        ];
    }

    // public function issuceFileCreate(Request $request)
    public function issuceFileCreate($request, $generateData)
    {
        // $generateData = MmToSgItem::where('invoice_no', $request->invoice_no)
        //     ->with('category:*', 'category.categoryName')
        //     ->first();

        $invoiceNo = $generateData['invoice_no'];
        $form = $generateData['form'];

        $fileName = "$invoiceNo.svg";
        $stpath = storage_path("app/public/qr_code/$fileName");
        $qrCodeData  = QrCode::size(250)->generate($invoiceNo, $stpath);

        $generateData = json_decode($generateData, true);
        $mpdf = new Mpdf([
            'tempDir' => storage_path('app/mpdf/custom/temp/dir/path'),
            'format'  => 'A4',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 15,
            'margin_header' => 10,
            'margin_footer' => 10,
            'default_font_size' => '9',

        ]);
        // $mpdf = LaravelMpdf::loadView('testpdf', ['datas' => 'this is pdf generate'],[
        //     'auto_language_detection' => true,
        //     'author'                  => 'WYK',
        //     'margin_top' => 0
        // ]);

        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;

        $html = View::make('pdf.invoice_issue')
            ->with('form', 2)
            ->with('request', $request)
            ->with('path', $stpath)
            ->with('data', $generateData);
        $html->render();
        $mpdf->WriteHTML($html);

        $fileName = "$invoiceNo.pdf";
        $storagePath = "invoice-issue/$form/";

        // return "$storagePath$fileName";
        // return $mpdf->stream($fileName);
        // return $mpdf->Output($fileName, 'i');

        Storage::disk('public')->put($storagePath . $fileName, $mpdf->Output($fileName, "S"));
        return [
            'status' => 'OK',
            'invoice_no' => $invoiceNo,
            'fileName' =>  "$storagePath$fileName"
        ];
        // return $mpdf->Output($fileName, 'i');
    }
}
