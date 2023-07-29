<?php

namespace app\Http\Controllers;

use Mpdf\Mpdf;
use Carbon\Carbon;
use Inertia\Inertia;
use app\Models\Customer;
use app\Models\MmToSgItem;
use app\Models\SGtoMMItem;
use Illuminate\Http\Request;
use app\Models\MmCategoryItem;
use app\Models\SgCategoryItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf;

class LogisticController extends Controller
{
    public function index()
    {
        return Inertia::render('Logistic/Index');
    }

    // public function toSgMm()
    // {
    //     return 'SG TO MM';
    // }

    public function saveSGtoMM(Request $request)
    {
        Log::info($request);
        $validator = Validator::make($request->all(), [
            "sender_email" => "required|email",
            "sender_name" => "required",
            "sender_phone" => "required",
            "sg_home_pickup" => "required",
            "sg_address" => "required",
            "shipment_method" => "required",
            "how_in_ygn" => "required|in:1,2,3,4",
            "payment_type" => "required|in:1,2",
            "receiver_name" => "required",
            "receiver_address" => "required",
            "receiver_phone" => "required",
            "note" => "",
            "items"  => "required|Array"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }
        // return $request;
        // $data = SGtoMMItem::first();
        // $mailSend = $this->mailSend($data, 'parcel-tag-file/SM23-07W5001.pdf');
        // // return $mailSend;
        // if($mailSend){
        //     return 'send p par p';
        // }
        // return 'errror';

        $custData['name'] = $request->sender_name;
        $custData['email'] = $request->sender_email;
        $custData['phone'] = $request->sender_phone;

        $receData['name'] = $request->receiver_name;
        $receData['phone'] = $request->receiver_phone;

        $chkCus = $this->chkCusOrReceiver($custData, 1);
        $chkRece = $this->chkCusOrReceiver($receData, 2);
        $message = 'Successfully Insert';
        DB::beginTransaction();

        try {

            if (count($request->items) > 0) {
                if (!$chkCus) {
                    $newCustomer = Customer::create([
                        'name' => $request->sender_name,
                        'email' => $request->sender_email,
                        'phone' => $request->sender_phone,
                        'flag' => 1
                    ]);
                }

                if (!$chkRece) {
                    $newReceiver = Customer::create([
                        'name' => $request->receiver_name,
                        'phone' => $request->receiver_phone,
                        'flag' => 2
                    ]);
                }

                $no = $this->getInvoiceNo(['name'=>'SGMM']);

                $logistic = SGtoMMItem::create([
                    'sender_email' => $request->sender_email,
                    'sender_name' => $request->sender_name,
                    'sender_phone' => $request->sender_phone,
                    'sg_home_pickup' => $request->sg_home_pickup,
                    'sg_address' => $request->sg_address,
                    'shipment_method' => $request->shipment_method,
                    'invoice_no' => $no,
                    'how_in_ygn' => $request->how_in_ygn,
                    'payment_type' => $request->payment_type,
                    'receiver_name' => $request->receiver_name,
                    'receiver_address' => $request->receiver_address,
                    'receiver_phone' => $request->receiver_phone,
                    'note' => $request->note,
                ]);

                $items = [];
                foreach ($request->items as $item) {
                    $data['sg_to_mm_id']        = $logistic->id;
                    $data['item_category_id']   = $item;
                    $data['created_at']         = Carbon::now()->format("Y-m-d H:i:s");
                    $data['updated_at']         = Carbon::now()->format("Y-m-d H:i:s");
                    // $data['weight']             = null;
                    array_push($items, $data);
                }

                $sgCategoryItem = SgCategoryItem::insert($items);

                $getParcelTagFile = $this->createPdf($logistic);

                if($getParcelTagFile['status'] == "OK"){
                    $mailSend = $this->mailSend($logistic, $getParcelTagFile['fileName']);
                    if(!$mailSend){
                        $message = "$message but Send Mail Error";
                    }
                }

            } else {
                return response()->json(['status' => 200, 'message' => 'Aleast one item must be selected']);
            }

            DB::commit();
            return response()->json(['status' => 200, 'message' => $message ]);
        } catch (\Exception $e) {
            Log::info(' ========================== saveSGtoMM Error Log ============================== ');
            Log::info($e);
            Log::info(' ========================== saveSGtoMM Error Log ============================== ');
            DB::rollback();
            return response()->json(['status' => 500, 'message' => 'Something was Wrong']);
        }
    }

    public function getInvoiceNo($data)
    {
        // sample --> SM23-07W3006
        $date = today();
        $default = "";
        $no = '001';
        $carbonDate = Carbon::parse($date);
        $month = Carbon::parse($date)->format('m');
        $year = Carbon::parse($date)->format('y');
        $Y = Carbon::parse($date)->format('Y');
        $weekOfMonth = ceil(($carbonDate->day) / 7);

        $firstDayOfMonth = Carbon::createFromDate($Y, $month, 1)->startOfDay();
        $lastDayOfMonth = Carbon::createFromDate($Y, $month, 1)->endOfMonth()->endOfDay();

        if($data['name'] === 'SGMM'){
            $lastNo = SGtoMMItem::whereBetween('created_at', [$firstDayOfMonth, $lastDayOfMonth])
                ->orderBy('created_at', 'desc')->first();

            $default = "SM";
        }else if($data['name'] === 'MMSG'){
            $lastNo = MmToSgItem::whereBetween('created_at', [$firstDayOfMonth, $lastDayOfMonth])
                ->orderBy('created_at', 'desc')->first();
            $default = "MS";
        }

        if (!empty($lastNo)) {
            $dbNo = $lastNo->invoice_no;
            $number = substr($dbNo, -3);
            $incrementedNumber = (int)$number + 1;
            $no = str_pad($incrementedNumber, strlen($number), '0', STR_PAD_LEFT);
        }
        $invoiceNo = "$default$year-$month" . "W" . "$weekOfMonth$no";
        return $invoiceNo;
    }

    // public function toMmSG()
    // {
    //     return 'mm to sg yout p';
    // }

    public function saveMMtoSG (Request $request)
    {
        return $request;
        $validator = Validator::make($request->all(), [
            "sender_email" => "required|email",
            "sender_name" => "required",
            "sender_phone" => "required",
            "sender_address" => "required",
            "transport" => "required",
            "storage_type" => "required",
            "mm_home_pickup" => "required",
            "how_in_sg" => "required|in:1,2,3,4",
            "payment_type" => "required|in:1,2",
            "receiver_postal_code" => "",
            "receiver_name" => "required",
            "receiver_address" => "required",
            "receiver_phone" => "required",
            "additional_instruction" => "",
            "items"  => "required|Array"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }

        $custData['name'] = $request->sender_name;
        $custData['email'] = $request->sender_email;
        $custData['phone'] = $request->sender_phone;

        $receData['name'] = $request->receiver_name;
        $receData['phone'] = $request->receiver_phone;

        $chkCus = $this->chkCusOrReceiver($custData, 1);
        $chkRece = $this->chkCusOrReceiver($receData, 2);

        DB::beginTransaction();

        try {
            if (count($request->items) > 0) {
                if (!$chkCus) {
                    $newCustomer = Customer::create([
                        'name' => $request->sender_name,
                        'email' => $request->sender_email,
                        'phone' => $request->sender_phone,
                        'flag' => 1
                    ]);
                }

                if (!$chkRece) {
                    $newReceiver = Customer::create([
                        'name' => $request->receiver_name,
                        'phone' => $request->receiver_phone,
                        'flag' => 2
                    ]);
                }
                $no = $this->getInvoiceNo(['name'=>'MMSG']);
                $logistic = MmToSgItem::create([
                    'sender_name' => $request->sender_name,
                    'sender_phone' => $request->sender_phone,
                    'sender_address' => $request->sender_address,
                    'transport' => $request->transport,
                    'storage_type' => $request->storage_type,
                    'mm_home_pickup' => $request->mm_home_pickup,
                    'how_in_sg' => $request->how_in_sg,
                    'invoice_no' => $no,
                    'payment_type' => $request->payment_type,
                    'receiver_name' => $request->receiver_name,
                    'receiver_phone' => $request->receiver_phone,
                    'receiver_address' => $request->receiver_address,
                    'receiver_postal_code' => $request->receiver_postal_code,
                    'additional_instruction' => $request->additional_instruction,
                ]);

                $items = [];
                foreach ($request->items as $item) {
                    $data['mm_to_sg_id']        = $logistic->id;
                    $data['item_category_id']   = $item;
                    $data['created_at']         = Carbon::now()->format("Y-m-d H:i:s");
                    $data['updated_at']         = Carbon::now()->format("Y-m-d H:i:s");
                    // $data['weight']             = null;
                    array_push($items, $data);
                }

                $sgCategoryItem = MmCategoryItem::insert($items);
            } else {
                return response()->json(['status' => 200, 'message' => 'Aleast one item must be selected']);
            }

            DB::commit();
            return response()->json(['status' => 200, 'message' => 'Successfully Insert']);
        } catch (\Exception $e) {
            Log::info(' ========================== saveMMtoSG Error Log ============================== ');
            Log::info($e);
            Log::info(' ========================== saveMMtoSG Error Log ============================== ');
            DB::rollback();
            return response()->json(['status' => 500, 'message' => 'Something Was Wrong']);
        }
    }


    public function chkCusOrReceiver($data, $flag)
    {
        return Customer::where($data)
            ->where('flag', $flag)
            ->exists();
    }

    public function mailSend($data, $file)
    {
        try {
            $approverMailData = [
                "email" => $data->sender_email,
                "user_name" => $data->sender_name,
                'title' => 'SGMYANMAR SG to MM Pick up acknowledgement',
                "logistic" => '(SM...)',
            ];

            $files = [
                public_path("storage/$file")
            ];
            // return $files;
            Mail::send('mail.sg_mm_save', $approverMailData, function ($message) use ($approverMailData, $files) {
                $message->to($approverMailData["email"])
                    ->subject($approverMailData["title"]);

                    foreach ($files as $file){
                        $message->attach($file);
                    }
            });

            return true;
        } catch (\Exception $e) {
            Log::info($e);
            // Log::debug($e->getMessage() . ' error occur in file ' . __FILE__ . ' at line ' . __LINE__ . ' within the class ' . get_class());
            return false;
        }

    }

    public function search (Request $request)
    {

        $SGMM = SGtoMMItem::where('invoice_no', $request->invoice_no)->first();
        $MMSG = MmToSgItem::where('invoice_no', $request->invoice_no)->first();

        if(!empty($MMSG) || !empty($SGMM)){
            if(!empty($MMSG)){
                $data = $MMSG;
            }else if(!empty($SGMM)){
                $data = $SGMM;
            };

            $fileName = "$data->invoice_no.svg";
            $qrCodeData  = QrCode::size(250)->generate($data, "qr_codes/$fileName");

            return Inertia::render('SingaporeToMMIndex', [
                'qr' => "qr_codes/$fileName"
            ]);
        }else {
            return response()->json(['status' => 404, 'message' => 'Data is Not Found !']);
        }

    }

    public function createPdf ($data)
    {
        // $data = SGtoMMItem::first();
        $invoiceNo = $data->invoice_no;
        // return $data;

        $mpdf = new Mpdf([
            'tempDir' => storage_path('app/mpdf/custom/temp/dir/path'),
            'format'  => 'A4',
            // 'orientation' => 'L',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 15,
            'margin_header' => 10,
            'margin_footer' => 10,

        ]);
        // $mpdf = LaravelMpdf::loadView('testpdf', ['datas' => 'this is pdf generate'],[
        //     'auto_language_detection' => true,
        //     'author'                  => 'WYK',
        //     'margin_top' => 0
        // ]);

        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;

        $html = View::make('parcel_tag')
                ->with('datas', 'this is pdf generate')
                ->with('data', $data);
        $html->render();
        $mpdf->WriteHTML($html);
        $fileName = "generate-001.pdf";

        // return $mpdf->stream($fileName);
        // return $mpdf->Output($fileName, 'i');

        $fileName = "$invoiceNo.pdf";
        Storage::disk('public')->put('parcel-tag-file/' . $fileName, $mpdf->Output($fileName, "S"));
        return [
            'status' => 'OK',
            'invoice_no' => $invoiceNo,
            'fileName' =>  "parcel-tag-file/$fileName"
        ];

    }
}
