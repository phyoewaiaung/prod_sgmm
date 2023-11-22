<?php

namespace App\Logics;

use Carbon\Carbon;

class LogisticLogic
{
    public function prepareDataForExcel($datas)
    {
        $howInSG = ['SG Home Delivery ($5.90 within two days)', 'SG Home Delivery ($10.0 withtin one day)', 'Self Collection'];
        $howInYGN = ['Yangon Home Delivery($3.5)', 'Yangon Home Deliver Outside ($5.0)', 'Bus Gate ($3.5)', 'Self Collection'];
        $storageType = ['Room Temperature', 'In Normal Fridge', 'In Freezer'];
        $ready = [];
        foreach ($datas as $key => $exportData) {
            $ready[$key]['date'] = Carbon::parse($exportData['created_at'])->format('m/d/Y H:m:s');
            $ready[$key]['collection_status'] = 'ma ti tay';
            $ready[$key]['____'] = "-----";
            $ready[$key]['receipt_no'] = $exportData['invoice_no'];
            $ready[$key]['location'] = 'ma ti tay';
            $ready[$key]['box'] = 'ma ti tay';
            $ready[$key]['sender_name'] = $exportData['sender_name'];
            $ready[$key]['sender_address'] = $exportData['sender_address'];
            $ready[$key]['sender_contact_no'] = $exportData['sender_phone'];
            $ready[$key]['what_sending'] = "Accessiores";
            $ready[$key]['payment_type'] =  $exportData['payment_type'] === 1 ? 'SG Pay' : 'MM Pay';
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
                if ($item['item_category_id'] === 1) {
                    $ready[$key]['food_weight'] = $item['weight'];
                    $ready[$key]['food_price'] = $item['total_price'];
                } elseif ($item['item_category_id'] === 2) {
                    $ready[$key]['clothes_weight'] = $item['weight'];
                    $ready[$key]['clothes_price'] = $item['total_price'];
                } elseif ($item['item_category_id'] === 6) {
                    $ready[$key]['frozen_food_weight'] = $item['weight'];
                    $ready[$key]['frozen_food_price'] = $item['total_price'];
                } elseif ($item['item_category_id'] === 7) {
                    $ready[$key]['other_weight'] = $item['weight'];
                    $ready[$key]['other_price'] = $item['total_price'];
                } elseif ($item['item_category_id'] === 3) {
                    $ready[$key]['cosmetic_weight'] = $item['weight'];
                    $ready[$key]['cosmetic_price'] = $item['total_price'];
                }
            }

            $ready[$key]['email'] = $exportData['sender_email'];
            $ready[$key]['total_price'] = collect($exportData['category'])->pluck('total_price')->sum();
            $ready[$key]['total_weight'] = collect($exportData['category'])->pluck('weight')->sum();
            $ready[$key]['no_of_package'] = count($exportData['category']);
            $ready[$key]['received'] = $exportData['payment_status'] === 1 ? 'Pending' : 'Received';
            $ready[$key]['balance'] = 1000;
            $ready[$key]['handling'] = $exportData['handling_fee'];

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
                $ready[$key]['sg_home_pickup'] = $exportData['sg_home_pickup'] === 1 ? 'Yes' : 'No';
            } else {
                $ready[$key]['sea_or_air'] = $exportData['transport'] == 1 ? 'Sea Cargo' : 'Air Cargo';
                $ready[$key]['details_of_cargo'] = '';
                $ready[$key]['weight'] = '';
                $ready[$key]['ygn_home_pickup'] = $exportData['mm_home_pickup'] === 1 ? 'Yes' : 'No';
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
}
