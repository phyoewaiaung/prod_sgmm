<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\MmToSgItem;
use App\Models\SgToMmItem;
use Illuminate\Http\Request;
use App\Models\MmCategoryItem;
use App\Models\SgCategoryItem;
use App\Traits\CommonTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class LogisticController extends Controller
{
    use CommonTrait;

    public function saveSGtoMM(Request $request)
    {
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

                $no = $this->getInvoiceNo(['name' => 'SGMM', 'form' => 1]);

                $logistic = SgToMmItem::create([
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
                    'form' => 1,
                    'note' => $request->note,
                    'created_at' => now(),
                    'updated_at' => null
                ]);

                $items = [];
                foreach ($request->items as $item) {
                    $data['sg_to_mm_id']        = $logistic->id;
                    $data['item_category_id']   = $item;
                    $data['created_at']         = Carbon::now()->format("Y-m-d H:i:s");
                    $data['updated_at']         = Carbon::now()->format("Y-m-d H:i:s");
                    array_push($items, $data);
                }

                $sgCategoryItem = SgCategoryItem::insert($items);

                $getParcelTagFile = $this->createPdf($logistic);

                if ($getParcelTagFile['status'] == "OK") {

                    $sender = [
                        "email" => $logistic->sender_email,
                        "user_name" => $logistic->sender_name,
                        'title' => 'SGMYANMAR SG to MM Pick up acknowledgement',
                        "logistic" => '(SM...)',
                    ];

                    $files = $getParcelTagFile['fileName'];
                    $blade = 'sg_mm_save';

                    $mailSend = $this->mailSend($sender, $files, $blade);
                    if (!$mailSend) {
                        $message = "$message but Send Mail Error";
                    }
                }
            } else {
                return response()->json(['status' => 403, 'message' => 'Aleast one item must be selected'], 403);
            }

            DB::commit();
            return response()->json(['status' => 200, 'message' => $message], 200);
        } catch (\Exception $e) {
            Log::info(' ========================== saveSGtoMM Error Log ============================== ');
            Log::info($e);
            Log::info(' ========================== saveSGtoMM Error Log ============================== ');
            DB::rollback();
            return response()->json(['status' => 500, 'message' => 'Something was Wrong'], 500);
        }
    }

    public function chkCusOrReceiver($data, $flag)
    {
        return Customer::where($data)
            ->where('flag', $flag)
            ->exists();
    }

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
            $lastNo = SgToMmItem::orderBy('created_at', 'desc')->first();
            $default = "SM";

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
                $lastNo = MmToSgItem::where('invoice_no', 'like', '%MS%')->orderBy('created_at', 'desc')->first();
                $default = "MS";
            } else if ($data['form'] == 3) {
                $lastNo = MmToSgItem::where('invoice_no', 'like', '%AS%')->orderBy('created_at', 'desc')->first();
                $default = "AS";
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

    public function saveMMtoSG(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // "sender_email" => "required|email",
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
                $no = $this->getInvoiceNo(['name' => 'MMSG', 'form' => $request->form]);
                $logistic = MmToSgItem::create([
                    'sender_email' => $request->sender_email,
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
                    'form' => $request->form,
                    'additional_instruction' => $request->additional_instruction,
                    'created_at' => now(),
                    'updated_at' => null
                ]);

                $items = [];
                foreach ($request->items as $item) {
                    $data['mm_to_sg_id']        = $logistic->id;
                    $data['item_category_id']   = $item['id'];
                    $data['name']               = $item['name'];
                    $data['weight']             = $item['weight'];
                    $data['created_at']         = Carbon::now()->format("Y-m-d H:i:s");
                    $data['updated_at']         = Carbon::now()->format("Y-m-d H:i:s");
                    // $data['weight']             = null;
                    array_push($items, $data);
                }

                $sgCategoryItem = MmCategoryItem::insert($items);

                $getParcelTagFile = $this->createPdf($logistic, 2);

                if ($getParcelTagFile['status'] == "OK" && $logistic->email != null) {

                    $sender = [
                        "email" => $logistic->sender_email,
                        "user_name" => $logistic->sender_name,
                        'title' => 'SGMYANMAR SG to MM Pick up acknowledgement',
                        "logistic" => '(SM...)',
                    ];

                    $files = $getParcelTagFile['fileName'];
                    $blade = 'sg_mm_save';

                    $mailSend = $this->mailSend($sender, $files, $blade);

                    if (!$mailSend) {
                        $message = "$message but Send Mail Error";
                    }
                }
            } else {
                return response()->json(['status' => 403, 'message' => 'Aleast one item must be selected'], 403);
            }

            DB::commit();
            return response()->json(['status' => 200, 'message' => $message], 200);
        } catch (\Exception $e) {
            Log::info(' ========================== saveMMtoSG Error Log ============================== ');
            Log::info($e);
            Log::info(' ========================== saveMMtoSG Error Log ============================== ');
            DB::rollback();
            return response()->json(['status' => 500, 'message' => 'Something Was Wrong'], 500);
        }
    }

    public function search(Request $request)
    {
        $searchData = [];
        if (!empty($request->invoice_no) || !is_null($request->invoice_no)) {
            $searchData[] = ['invoice_no', $request->invoice_no];
        }

        if (!empty($request->status) || !is_null($request->status)) {
            $searchData[] = ['payment_status', $request->status];
        }

        $returndData = [];
        $SGMM = SgToMmItem::where($searchData)->select('id', 'invoice_no', 'sender_name', 'receiver_name', 'payment_type', 'payment_status', 'estimated_arrival', 'shelf_no', 'total_price', 'created_at')->get();
        $MMSG = MmToSgItem::where($searchData)->select('id', 'invoice_no', 'sender_name', 'receiver_name', 'payment_type', 'payment_status', 'estimated_arrival', 'shelf_no', 'total_price', 'created_at')->get();

        if (!empty($MMSG) || !empty($SGMM)) {
            if (!empty($MMSG)) {
                foreach ($MMSG as $data) {
                    array_push($returndData, $data);
                }
            }
            if (!empty($SGMM)) {
                foreach ($SGMM as $data) {
                    array_push($returndData, $data);
                }
            };
            $returndData = collect($returndData)->sortBy([
                ['created_at', 'desc']
            ]);
            $returndData = $this->paginate($returndData, 5);
            return response()->json(['status' => 200, 'data' => $returndData], 200);
        } else {
            return response()->json(['status' => 404, 'message' => 'Data is Not Found !'], 404);
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
        // $mpdf = LaravelMpdf::loadView('testpdf', ['datas' => 'this is pdf generate'],[
        //     'auto_language_detection' => true,
        //     'author'                  => 'WYK',
        //     'margin_top' => 0
        // ]);

        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;

        $html = View::make('pdf/parcel_tag')
            ->with('data', $data)
            ->with('flag', $flag);
        $html->render();
        $mpdf->WriteHTML($html);
        $fileName = "$invoiceNo.pdf";
        $storagePath = "parcel-tag-file/$flag/";

        // return "$storagePath$fileName";
        // return $mpdf->stream($fileName);
        // return $mpdf->Output($fileName, 'i');

        Storage::disk('public')->put($storagePath . $fileName, $mpdf->Output($fileName, "S"));
        return [
            'status' => 'OK',
            'invoice_no' => $invoiceNo,
            'fileName' =>  "$storagePath$fileName"
        ];
    }

    public function invoiceIssue(Request $request)
    {
        $SGMM = SgToMmItem::where('invoice_no', $request->invoice_no)
            ->with('category', 'category.categoryName:id,name')
            ->first();
        $MMSG = MmToSgItem::where('invoice_no', $request->invoice_no)
            ->with('category', 'category.categoryName:id,name')
            ->first();

        $returndData = [];
        // $returndData['category'] = [];
        if (!empty($MMSG) || !empty($SGMM)) {
            if (!empty($MMSG)) {
                $MMSG = json_decode($MMSG, true);

                $returndData["id"] = 3;
                $returndData["sender_email"]    = $MMSG['sender_email'];
                $returndData["sender_name"]     = $MMSG['sender_name'];
                $returndData["sender_phone"]    = $MMSG['sender_phone'];
                $returndData["sender_address"]  = $MMSG['sender_address'];
                $returndData["transport"]       = $MMSG['transport'];
                $returndData["storage_type"]    = $MMSG['storage_type'];
                $returndData["mm_home_pickup"]  = $MMSG['mm_home_pickup'];
                $returndData["how_in_sg"]       = $MMSG['how_in_sg'];
                $returndData["invoice_no"]      = $MMSG['invoice_no'];
                $returndData["payment_type"]    = $MMSG['payment_type'];
                $returndData["receiver_name"]   = $MMSG['receiver_name'];
                $returndData["receiver_phone"]  = $MMSG['receiver_phone'];
                $returndData["receiver_address"] = $MMSG['receiver_address'];
                $returndData["receiver_postal_code"] = $MMSG['receiver_postal_code'];
                $returndData["handling_fee"]    = $MMSG['handling_fee'];
                $returndData["form"]            = $MMSG['form'];
                $returndData["estimated_arrival"] = $MMSG['estimated_arrival'];
                $returndData["shelf_no"]        = $MMSG['shelf_no'];
                $returndData["payment_status"]  = $MMSG['payment_status'];
                $returndData["additional_instruction"] = $MMSG['additional_instruction'];
                $returndData["created_at"]      = $MMSG['created_at'];
                $returndData["category"]        = [];

                foreach ($MMSG['category'] as $cat) {
                    $data['id']             = $cat['item_category_id'];
                    $data['name']           = $cat['category_name']['name'];
                    $data['weight']         = $cat['weight'];
                    $data['unit_price']     = $cat['unit_price'];
                    $data['total_price']    = $cat['total_price'];
                    array_push($returndData['category'], $data);
                }
            }
            if (!empty($SGMM)) {
                $SGMM = json_decode($SGMM, true);

                $returndData["id"]              = $SGMM['id'];
                $returndData["sender_email"]    = $SGMM['sender_email'];
                $returndData["sender_name"]     = $SGMM['sender_name'];
                $returndData["sender_phone"]    = $SGMM['sender_phone'];
                $returndData["sg_home_pickup"]  = $SGMM['sg_home_pickup'];
                $returndData["sg_address"]      = $SGMM['sg_address'];
                $returndData["shipment_method"] = $SGMM['shipment_method'];
                $returndData["invoice_no"]      = $SGMM['invoice_no'];
                $returndData["how_in_ygn"]      = $SGMM['how_in_ygn'];
                $returndData["payment_type"]    = $SGMM['payment_type'];
                $returndData["receiver_name"]   = $SGMM['receiver_name'];
                $returndData["receiver_address"] = $SGMM['receiver_address'];
                $returndData["receiver_phone"]  = $SGMM['receiver_phone'];
                $returndData["form"]            = $SGMM['form'];
                $returndData["estimated_arrival"] = $SGMM['estimated_arrival'];
                $returndData["shelf_no"]        = $SGMM['shelf_no'];
                $returndData["handling_fee"]    = $SGMM['handling_fee'];
                $returndData["payment_status"]  = $SGMM['payment_status'];
                $returndData["note"]            = $SGMM['note'];
                $returndData["created_at"]      = $SGMM['created_at'];
                $returndData["category"]        = [];

                foreach ($SGMM['category'] as $cat) {
                    $data['id']             = $cat['item_category_id'];
                    $data['name']           = $cat['category_name']['name'];
                    $data['weight']         = $cat['weight'];
                    $data['unit_price']     = $cat['unit_price'];
                    $data['total_price']    = $cat['total_price'];
                    array_push($returndData['category'], $data);
                }
            };
        }
        if ($returndData) {
            return Inertia::render('InvoiceIssueIndex', ['data' => $returndData]);
        } else {
            return abort(404);
        }
    }

    public function saveIssue(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "invoice_no"        => "required",
            "category_data"     => "required|array",
            "handling_fee"      => "required",
            // "pickup"            => "required",
            "pickupAmt"         => "required",
            "collection_type"   => "required",
            "total_weight"      => "required",
            "total_amount"      => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }

        $SGMM = SgToMmItem::where('invoice_no', $request->invoice_no)
            // ->join('sg_category_items', 'sg_category_items.sg_to_mm_id', 'sg_to_mm_items.id')
            // ->join('item_categories', 'item_categories.id', 'sg_category_items.item_category_id')
            // ->select('sg_to_mm_items.*', 'item_categories.name', 'sg_category_items.weight')
            ->with('category:*', 'category.categoryName')
            ->first();

        $MMSG = MmToSgItem::where('invoice_no', $request->invoice_no)
            // ->join('mm_category_items', 'mm_category_items.mm_to_sg_id', 'mm_to_sg_items.id')
            // ->join('item_categories', 'item_categories.id', 'mm_category_items.item_category_id')
            // ->select('mm_to_sg_items.*', 'item_categories.name', 'mm_category_items.weight')
            ->with('category:*', 'category.categoryName')
            ->first();

        if (!empty($MMSG) || !empty($SGMM)) {
            $message = "Update Successfully";
            DB::beginTransaction();
            try {
                if (!empty($MMSG)) {
                    $data = $MMSG;

                    $dbCategoryData =  $data->category->pluck('item_category_id')->sort()->values();
                    $requestCategoryData = collect($request->category_data)->pluck('id')->sort()->values();

                    if ($dbCategoryData != $requestCategoryData) {
                        return response()->json(['status' => 403, 'message' => 'Cataegory Item are not same !'], 403);
                    }
                    foreach ($request->category_data as $updateCat) {
                        $updateData = MmCategoryItem::where('mm_to_sg_id', $data->id)
                            ->where('item_category_id', $updateCat)
                            ->first();

                        $updateData->weight = $updateCat['weight'];
                        $updateData->unit_price = $updateCat['unit_price'];
                        $updateData->total_price = $updateCat['weight'] * $updateCat['unit_price'];
                        $updateData->save();
                    }
                    if ($request->handling_fee) {
                        $data->handling_fee = 1;
                    } else {
                        $data->handling_fee = 2;
                    }
                    $data->total_price = $request->total_amount;
                    $data->save();
                    $generateData = MmToSgItem::where('invoice_no', $request->invoice_no)
                        ->with('category:*', 'category.categoryName')
                        ->first();
                } else if (!empty($SGMM)) {
                    $data = $SGMM;

                    $dbCategoryData =  $data->category->pluck('item_category_id')->sort()->values();
                    $requestCategoryData = collect($request->category_data)->pluck('id')->sort()->values();

                    if ($dbCategoryData != $requestCategoryData) {
                        return response()->json(['status' => 403, 'message' => 'Cataegory Item are not same !'], 403);
                    }
                    foreach ($request->category_data as $updateCat) {
                        $updateData = SgCategoryItem::where('sg_to_mm_id', $data->id)
                            ->where('item_category_id', $updateCat)
                            ->first();

                        $updateData->weight = $updateCat['weight'];
                        $updateData->unit_price = $updateCat['unit_price'];
                        $updateData->total_price = $updateCat['weight'] * $updateCat['unit_price'];
                        $updateData->save();
                        $generateData = SgToMmItem::where('invoice_no', $request->invoice_no)
                            ->with('category:*', 'category.categoryName')
                            ->first();
                    }
                    if ($request->handling_fee) {
                        $data->handling_fee = 1;
                    } else {
                        $data->handling_fee = 2;
                    }
                    $data->total_price = $request->total_amount;
                    $data->save();
                };

                $getInvoiceIssueFile = $this->issuceFileCreate($request, $generateData);

                if ($getInvoiceIssueFile['status'] == "OK" && $request->mail) {

                    $sender = [
                        "email" => $generateData->sender_email,
                        "user_name" => $generateData->sender_name,
                        'title' => 'SGMYANMAR Invoice Issue Notic',
                        "logistic" => '(SM...)',
                    ];

                    $files = $getInvoiceIssueFile['fileName'];
                    $blade = 'invoice_issue';

                    $mailSend = $this->mailSend($sender, $files, $blade);

                    if (!$mailSend) {
                        $message = "$message but Send Mail Error";
                    }
                }

                DB::commit();

                return response()->json(['status' => 200, 'message' => $message], 200);
            } catch (\Exception $e) {
                Log::info(' ========================== Save Issue Error Log ============================== ');
                Log::info($e);
                Log::info(' ========================== Save Issue Error Log ============================== ');
                DB::rollback();
                return response()->json(['status' => 500, 'message' => 'Something Was Wrong'], 500);
            }
        } else {
            return response()->json(['status' => 404, 'message' => 'Data is Not Found !'], 404);
        }
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

    public function updateShelfNo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "invoice_no"    => "required",
            "shelf_no"      => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }
        $data = $this->getInvoiceData($request);

        if (empty($data)) {
            return response()->json(['status' => 404, 'message' => 'Data is Not Found !'], 404);
        }

        $data->shelf_no = $request->shelf_no;
        $data->update();

        return response()->json(['status' => 200, 'message' => 'Update Successfully', 'data' => $data], 200);
    }

    public function setEstimatedArrival(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "invoice_no"    => "required",
            "arrival"       => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }
        $data = $this->getInvoiceData($request);

        if (empty($data)) {
            return response()->json(['status' => 404, 'message' => 'Data is Not Found !'], 404);
        }

        $data->estimated_arrival = $request->arrival;
        $data->update();

        return response()->json(['status' => 200, 'message' => 'Update Successfully', 'data' => $data], 200);
    }

    public function getInvoiceData($request)
    {
        $searchData = [];
        if (!empty($request->invoice_no) || !is_null($request->invoice_no)) {
            $searchData[] = ['invoice_no', $request->invoice_no];
        }
        $data = null;
        $SGMM = SgToMmItem::with('category')->where($searchData)->first();
        $MMSG = MmToSgItem::with('category')->where($searchData)->first();

        if (!empty($MMSG) || !empty($SGMM)) {
            if (!empty($MMSG)) {
                $data = $MMSG;
            }
            if (!empty($SGMM)) {
                $data = $SGMM;
            }
        }
        return $data;
    }

    public function trackParcel(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "invoice_no"    => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }

        $searchData = [];
        if (!empty($request->invoice_no) || !is_null($request->invoice_no)) {
            $searchData[] = ['invoice_no', $request->invoice_no];
        }

        // $returndData = [];
        $SGMM = SgToMmItem::where($searchData)->select('id', 'invoice_no', 'sender_name', 'receiver_name', 'payment_type', 'payment_status as collection_status', 'estimated_arrival', 'shelf_no', 'total_price', 'how_in_ygn as collection_type', 'pay_with', 'updated_at')->first();
        $MMSG = MmToSgItem::where($searchData)->select('id', 'invoice_no', 'sender_name', 'receiver_name', 'payment_type', 'payment_status as collection_status', 'estimated_arrival', 'shelf_no', 'total_price', 'how_in_sg as collection_type', 'pay_with', 'updated_at')->first();

        if (!empty($SGMM) || !empty($MMSG)) {
            if (!empty($MMSG)) {
                $collectionType = ['SG Home Delivery within two days', 'SG Home Delivery within one day', 'Self Collection'];
                $data = $MMSG;
                $data->collection_type = $collectionType[$data->collection_type -  1];
            }
            if (!empty($SGMM)) {
                $collectionType = ['Yangon Home Delivery Downtown', 'Yangon Home Deliver outside', 'Bus Gate', 'Self Collection'];
                $data = $SGMM;
                $data->collection_type = $collectionType[$data->collection_type -  1];
            };
            return response()->json(['status' => 200, 'data' => $data], 200);
        } else {
            return response()->json(['status' => 404, 'message' => "Data is not Found !"], 404);
        }

        return $request;
    }

    public function deleteData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "invoice_no"    => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }

        $data = $this->getInvoiceData($request);
        if (!empty($data)) {
            // if ($data->payment_status == 1) {
            //     return response()->json(['status' => 403, 'message' => "Payment success data can't be delete !"], 403);
            // }
            $data->category()->delete();
            $data->delete();
            return response()->json(['status' => 200, 'message' => 'Delete Successfully', 'data' => $data], 200);
        } else {
            return response()->json(['status' => 404, 'message' => "Data is not Found !"], 404);
        }
    }

    public function paymetUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "invoice_no"    => "required",
            "collection_status" => "required|in:1,2",
            "pay_with" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }
        $data = $this->getInvoiceData($request);
        if (!empty($data)) {
            if ($data->payment_status == 2) {
                return response()->json(['status' => 403, 'message' => "Payment success data can't be update !"], 403);
            }
            $data->payment_status = $request->collection_status;
            $data->pay_with = $request->pay_with;
            $data->update();

            return response()->json(['status' => 200, 'message' => 'Payment Update Successfully', 'data' => $data], 200);
        } else {
            return response()->json(['status' => 404, 'message' => "Data is not Found !"], 404);
        }
    }
}
