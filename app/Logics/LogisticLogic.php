<?php

namespace App\Logics;

use Carbon\Carbon;
use App\Models\Customer;
use App\Models\MmToSgItem;
use App\Models\SgToMmItem;
use App\Traits\CommonTrait;
use App\Exports\InvoiceExport;
use App\Models\MmCategoryItem;
use App\Models\SgCategoryItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use PhpParser\Node\Stmt\TryCatch;

class LogisticLogic
{
    use CommonTrait;

    public function saveSGtoMM($request)
    {
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

    public function saveMMtoSG($request)
    {
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

                if ($getParcelTagFile['status'] == "OK" && $logistic->sender_email != null) {

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

    public function chkCusOrReceiver($data, $flag)
    {
        return Customer::where($data)
            ->where('flag', $flag)
            ->exists();
    }

    public function searchInvoice($request)
    {
        $searchData = [];
        if (!empty($request->invoice_no) || !is_null($request->invoice_no)) {
            $searchData[] = ['invoice_no', $request->invoice_no];
        }

        if (!empty($request->status) || !is_null($request->status)) {
            $searchData[] = ['payment_status', $request->status];
        }

        $returndData = [];
        $SGMM = SgToMmItem::with('category', 'category.categoryName:id,name')->where($searchData)->select('id', 'invoice_no', 'sender_name', 'receiver_name', 'payment_type', 'payment_status', 'estimated_arrival', 'total_price', 'created_at', 'deleted_at')->withTrashed()->get();
        $MMSG = MmToSgItem::with('category', 'category.categoryName:id,name')->where($searchData)->select('id', 'invoice_no', 'sender_name', 'receiver_name', 'payment_type', 'payment_status', 'estimated_arrival', 'total_price', 'created_at', 'deleted_at')->withTrashed()->get();

        if (!empty($MMSG) || !empty($SGMM)) {
            if (!empty($MMSG)) {
                $MMSG = json_decode($MMSG, true);
                foreach ($MMSG as $data) {
                    foreach ($data['category'] as $key => $modify) {
                        $modify['category_name']['location'] = $modify['location'];
                        $modify['category_name']['shelf_no'] = $modify['shelf_no'];
                        $data['category'][$key]['category_name'] = $modify['category_name'];
                    }
                    array_push($returndData, $data);
                }
            }
            if (!empty($SGMM)) {
                $SGMM = json_decode($SGMM, true);
                foreach ($SGMM as $data) {
                    foreach ($data['category'] as $key => $modify) {
                        $modify['category_name']['location'] = $modify['location'];
                        $modify['category_name']['shelf_no'] = $modify['shelf_no'];
                        $data['category'][$key]['category_name'] = $modify['category_name'];
                    }
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

    public function invoiceDetails($request)
    {
        $SGMM = SgToMmItem::where('invoice_no', $request->invoice_no)
            ->with('category', 'category.categoryName:id,name')
            ->first();
        $MMSG = MmToSgItem::where('invoice_no', $request->invoice_no)
            ->with('category', 'category.categoryName:id,name')
            ->first();

        $returndData = [];

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
                // $returndData["shelf_no"]        = $MMSG['shelf_no'];
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
                // $returndData["shelf_no"]        = $SGMM['shelf_no'];
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
        return $returndData;
    }

    public function saveIssue($request)
    {
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

    public function trackParcel($request)
    {
        $searchData = [];
        if (!empty($request->invoice_no) || !is_null($request->invoice_no)) {
            $searchData[] = ['invoice_no', $request->invoice_no];
        }

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

    public function exportExcel($request)
    {
        $firstDayOfMonth = Carbon::createFromDate($request->month, 1)->startOfDay();
        $lastDayOfMonth = Carbon::createFromDate($request->month, 1)->endOfMonth()->endOfDay();

        $exportDatas = [];
        $SGMM = SgToMmItem::with('category', 'category.categoryName:id,name')->whereBetween('created_at', [$firstDayOfMonth, $lastDayOfMonth])->get();
        $MMSG = MmToSgItem::with('category', 'category.categoryName:id,name')->whereBetween('created_at', [$firstDayOfMonth, $lastDayOfMonth])->get();


        if (count($MMSG) || count($SGMM)) {
            if (!empty($MMSG)) {
                foreach ($MMSG as $data) {
                    array_push($exportDatas, $data);
                }
            }
            if (!empty($SGMM)) {
                foreach ($SGMM as $data) {
                    array_push($exportDatas, $data);
                }
            };
            $exportDatas = collect($exportDatas)->sortBy([
                ['created_at', 'desc']
            ]);
        } else {
            return response()->json(['status' => 404, 'message' => 'Data is Not Found !'], 404);
        }

        $ready = $this->prepareDataForExcel($exportDatas);

        $fileName = "$request->month-invoice.xlsx";
        $tableHeader = ['Receipt number', 'Date', 'Collection Status', 'Location', 'Box', 'Sender Name', 'Sender Address', 'Sender Contact No', 'Sea Transpoart or Air Transport', 'Please provide details of your cargo (optional)', 'Weight', 'Yangon Home Pickup S$3.50?', 'What are you sending ?', 'Choose SG Home Delivery / Self Collection?', 'Payment in Singapore (SG) or in Myanmar (MM)?', "Recipient's Name", "Recipient's Address ", "Recipient's Postal code", "Recipient's Contact Number", "Weight of Food ", "price", "Weight of Clothes", "price", "Weight of Frozen Food", "price", "Weight of other items", "price", "Weight of Cosmetics/Medicine / Supplements", "price", "Email Address", "Additional Instructions? (optional) ", "Storage type", "Ygn Pick up", "SG home dilvery", "Total Price (category)", "Total Weight (kg)", "No. of Packages", "Recieved", "Handling Fee", "Balance"];
        return Excel::download(new InvoiceExport($ready, $tableHeader), $fileName);
    }

    public function prepareDataForExcel($datas)
    {
        $howInSG = ['SG Home Delivery ($5.90 within two days)', 'SG Home Delivery ($10.0 withtin one day)', 'Self Collection'];
        $howInYGN = ['Yangon Home Delivery($3.5)', 'Yangon Home Deliver Outside ($5.0)', 'Bus Gate ($3.5)', 'Self Collection'];
        $storageType = ['Room Temperature', 'In Normal Fridge', 'In Freezer'];
        $ready = [];
        foreach ($datas as $key => $exportData) {
            $data = json_decode($exportData, true);

            $ready[$key]['date'] = Carbon::parse($exportData['created_at'])->format('m/d/Y H:m:s');
            $ready[$key]['collection_status'] = $exportData['payment_status'] == 1 ? 'Pending' : 'Collected';;
            $ready[$key]['receipt_no'] = $exportData['invoice_no'];
            $ready[$key]['location'] = collect($exportData['category'])->pluck('location')->filter()->implode(', ');
            $ready[$key]['box'] = collect($exportData['category'])->pluck('shelf_no')->filter()->implode(', ');
            $ready[$key]['sender_name'] = $exportData['sender_name'];
            $ready[$key]['sender_address'] = $exportData['sender_address'];
            $ready[$key]['sender_contact_no'] = $exportData['sender_phone'];
            $ready[$key]['what_sending'] = collect($data['category'])->pluck('category_name')->pluck('name')->implode(', ');
            $ready[$key]['payment_type'] =  $exportData['payment_type'] == 1 ? 'SG Pay' : 'MM Pay';
            $ready[$key]['receiver_name'] = $exportData['receiver_name'];
            $ready[$key]['receiver_address'] = $exportData['receiver_address'];
            $ready[$key]['receiver_contact_no'] = $exportData['receiver_phone'];

            // weight and price for items
            $ready[$key]['food_weight'] = '';
            $ready[$key]['food_price'] = '';

            $ready[$key]['clothes_weight'] = '';
            $ready[$key]['clothes_price'] = '';

            $ready[$key]['frozen_food_weight'] = '';
            $ready[$key]['frozen_food_price'] = '';

            $ready[$key]['other_weight'] = '';
            $ready[$key]['other_price'] = '';

            $ready[$key]['cosmetic_weight'] = '';
            $ready[$key]['cosmetic_price'] = '';

            foreach ($exportData['category'] as $item) {
                if ($item['item_category_id'] == 1) {
                    $ready[$key]['food_weight'] = $item['weight'];
                    $ready[$key]['food_price'] = $item['total_price'];
                } elseif ($item['item_category_id'] == 2) {
                    $ready[$key]['clothes_weight'] = $item['weight'];
                    $ready[$key]['clothes_price'] = $item['total_price'];
                } elseif ($item['item_category_id'] == 6) {
                    $ready[$key]['frozen_food_weight'] = $item['weight'];
                    $ready[$key]['frozen_food_price'] = $item['total_price'];
                } elseif ($item['item_category_id'] == 7) {
                    $ready[$key]['other_weight'] = $item['weight'];
                    $ready[$key]['other_price'] = $item['total_price'];
                } elseif ($item['item_category_id'] == 3) {
                    $ready[$key]['cosmetic_weight'] = $item['weight'];
                    $ready[$key]['cosmetic_price'] = $item['total_price'];
                }
            }

            $ready[$key]['email'] = $exportData['sender_email'];
            $ready[$key]['total_price'] = collect($exportData['category'])->pluck('total_price')->sum();
            $ready[$key]['total_weight'] = collect($exportData['category'])->pluck('weight')->sum();
            $ready[$key]['no_of_package'] = count($exportData['category']);
            $ready[$key]['received'] = $exportData['payment_status'] == 1 ? 'Pending' : 'Received';
            $ready[$key]['balance'] = $exportData['total_price'];
            $ready[$key]['handling'] = $exportData['handling_fee'] == 1 ? 'Yes' : 'No';

            if ($exportData['form'] === 1) {
                $ready[$key]['sea_or_air'] = '';
                $ready[$key]['details_of_cargo'] = $exportData['note'];
                $ready[$key]['weight'] = '';
                $ready[$key]['ygn_home_pickup'] = '';
                $ready[$key]['how_in_sg'] = '';
                $ready[$key]['receiver_postalcode'] = '';
                $ready[$key]['addational_instruction'] = '';
                $ready[$key]['storage_type'] = '';
                $ready[$key]['how_in_ygn'] = $howInYGN[$exportData['how_in_ygn'] - 1];
                $ready[$key]['sg_home_pickup'] = $exportData['sg_home_pickup'] == 1 ? 'Yes' : 'No';
            } else {
                $ready[$key]['sea_or_air'] = $exportData['transport'] == 1 ? 'Sea Cargo' : 'Air Cargo';
                $ready[$key]['details_of_cargo'] = '';
                $ready[$key]['weight'] = '';
                $ready[$key]['ygn_home_pickup'] = $exportData['mm_home_pickup'] == 1 ? 'Yes' : 'No';
                $ready[$key]['how_in_sg'] =  $howInSG[$exportData['how_in_sg'] - 1];
                $ready[$key]['receiver_postalcode'] = $exportData['receiver_postal_code'];
                $ready[$key]['addational_instruction'] = $exportData['additional_instruction'];
                $ready[$key]['storage_type'] = $storageType[$exportData['storage_type'] - 1];
                $ready[$key]['how_in_ygn'] = '';
                $ready[$key]['sg_home_pickup'] = '';
            }
        }

        return $ready;
    }

    public function updateLocationAndShelf($data, $request)
    {
        try {
            foreach ($request->items as $updateData) {
                foreach ($data['category'] as $dbData) {
                    if ($dbData['item_category_id'] === $updateData['item_category_id'] && $dbData['id'] === $updateData['category_id']) {
                        $dbData['location'] = $updateData['location'];
                        $dbData['shelf_no'] = $updateData['shelf_no'];
                        $dbData->save();
                    }
                }
            }
            return true;
        } catch (\Throwable $th) {
            Log::info($th);
            return false;
        }
    }
}
