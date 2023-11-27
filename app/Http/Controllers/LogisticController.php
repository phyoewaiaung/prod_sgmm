<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use App\Logics\LogisticLogic;
use Illuminate\Support\Facades\Validator;

class LogisticController extends Controller
{
    use CommonTrait;

    protected $logisticLogic;

    public function __construct(LogisticLogic $logisticLogic)
    {
        $this->logisticLogic = $logisticLogic;
    }

    public function saveSGtoMM(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "sender_email" => "required|email",
            "sender_name" => "required",
            "sender_phone" => "required",
            "sg_home_pickup" => "required",
            // "sg_address" => "required",
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

        return $this->logisticLogic->saveSGtoMM($request);
    }

    public function saveMMtoSG(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // "sender_email" => "required|email",
            "sender_name" => "required",
            "sender_phone" => "required",
            // "sender_address" => "required",
            "transport" => "required",
            "storage_type" => "required",
            "mm_home_pickup" => "required",
            "how_in_sg" => "required|in:1,2,3,4",
            "payment_type" => "required|in:1,2",
            "receiver_postal_code" => "",
            "receiver_name" => "required",
            // "receiver_address" => "required",
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

        return $this->logisticLogic->saveMMtoSG($request);
    }

    public function search(Request $request)
    {
        return $this->logisticLogic->searchInvoice($request);
    }

    public function invoiceIssue(Request $request)
    {
        $returndData = $this->logisticLogic->invoiceDetails($request);

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

        return $this->logisticLogic->saveIssue($request);
    }

    public function updateShelfNo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "invoice_no"    => "required",
            "items"      => "required|array",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }
        $data = $this->logisticLogic->getInvoiceData($request);
        // return $data;
        if (empty($data)) {
            return response()->json(['status' => 404, 'message' => 'Data is Not Found !'], 404);
        }
        $updateData =  $this->logisticLogic->updateLocationAndShelf($data, $request);
        if (!$updateData) {
            return response()->json(['status' => 500, 'message' => 'Something Was Wrong'], 500);
        }

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
        $data = $this->logisticLogic->getInvoiceData($request);

        if (empty($data)) {
            return response()->json(['status' => 404, 'message' => 'Data is Not Found !'], 404);
        }

        $data->estimated_arrival = $request->arrival;
        $data->update();

        return response()->json(['status' => 200, 'message' => 'Update Successfully', 'data' => $data], 200);
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

        return $this->logisticLogic->trackParcel($request);
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

        $data = $this->logisticLogic->getInvoiceData($request);
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
        $data = $this->logisticLogic->getInvoiceData($request);
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

    public function monthlyInvoice(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "month"    => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'    =>  'NG',
                'message'   =>  $validator->errors()->all(),
            ], 422);
        }

        return $this->logisticLogic->exportExcel($request);
    }
}
