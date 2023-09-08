<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        header {
            margin-left: 5px;
            margin-right: 5px;
            margin-bottom: 0;
            margin-top: 0;
        }

        h6,
        h5,
        h4,
        p,
        hr {
            margin: 0;
            margin-bottom: 0;
            margin-top: 0;
        }

        table {
            margin: 0;
            padding: 0;
            border-spacing: 0px;
        }

        td {
            padding: 6px;
        }

        td:nth-child(2) {
            text-align: start !important;
        }
    </style>
</head>

<body>
    <div class="">
        <header style="margin-bottom: 0;">
            <div align="left" style="width: 45%; float: left;">
                <div style="text-align: center; margin-top: 0;">
                    <img src='images/SGMYANMAR.png' width="150" alt="sgmyanmar logo" />
                </div>
            </div>

            <div align="left" style="width: 55%; float: right;">

                @if ($data['form'] == 1)
                    <div style="margin-bottom: 15px;">
                        <p>111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</p>
                        <p>Contact: +65 9325 0329</p>
                    </div>
                    <div>
                        <div align="left" style="width: 48%; float: left; margin-right: 10px">
                            {{-- <h4 class=''>Myanmar Branch(South Okkalapa)</h4> --}}
                            <p>No. 642, Thanthumar Street, 10 Ward, South Okkalapa, Yangon</p>
                            <p>Contact: +959 962 507 694</p>
                        </div>
                        <div align="right" style="width: 48%; float: right;">
                            <p class=''>Myanmar Branch(Alone)</p>
                            <p>အမှတ် ၂၂ / သိပ္ပံလမ်း / အလုံမြို့နယ်</p>
                            <p>Contact: 09958450219</p>
                        </div>
                    </div>
                @elseif ($data['form'] == 2)
                    <div style="margin-bottom: 15px;">
                        <p>111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</p>
                        <p>Contact: +65 9325 0329</p>
                        <p>No. 642, Thanthumar Street, 10 Ward, South Okkalapa, Yangon</p>
                        <p>Contact: +959 962 507 694</p>

                        <p style="margin-top: 5px"> sgmm@sgmyanmar.com / www.sgmyanmar.com "</p>
                    </div>
                @elseif ($data['form'] == 3)
                    <div style="margin-bottom: 15px;">
                        <p>111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</p>
                        <p>Contact: +65 9325 0329</p>
                        <p>အမှတ် ၂၂ / သိပ္ပံလမ်း / အလုံမြို့နယ်</p>
                        <p>Contact: 09958450219</p>

                        <p style="margin-top: 5px"> sgmm@sgmyanmar.com / www.sgmyanmar.com "</p>
                    </div>
                @endif

                <div style="margin-top: 15px;">
                    <div align="left" style="width: 50%; float: left;">
                        <h4>INVOICE</h4>
                    </div>
                    <div align="right" style="width: 50%; float: right; text-align: right;">
                        <h4>VR- {{ $data['invoice_no'] }}</h4>
                    </div>
                </div>

            </div>
        </header>

        <main style=''>
            <hr style='margin-bottom: 5px; height: 15px; background-color: grey' />

            <div>
                <div align="left" style="width: 30%; float: left; text-align: center">
                    <p><strong>Date & Time :</strong><span
                            style='color: red'>{{ \Carbon\Carbon::now()->format('d-m-Y H:i:s') }}
                        </span></p>
                    <p class='font-bold dark:text-gray-400'>
                        <strong>Name :</strong>
                        <span>{{ $data['sender_name'] }}</span>
                    </p>
                </div>
                <div align="right" style="width: 70%; float: right; text-align: right;">
                    <p class='font-bold text-center dark:text-gray-400'>
                        <strong>Delievery Mode :</strong>
                        @if ($data['form'] > 1)
                            @if ($data['transport'] == 1)
                                <span>Sea Cargo</span>
                            @else
                                <span>Air Cargo</span>
                            @endif
                            <span>Sea Cargo (3-4 weeks from shipment)</span>
                        @else
                            @if ($data['shipment_method'] == 1)
                                <h6>Land (2 weeks from shipment)</h6>
                            @elseif ($data['shipment_method'] == 2)
                                <h6>Land Express (7-10 days from shipment)</h6>
                            @elseif ($data['shipment_method'] == 3)
                                <h6>Sea Cargo (3-4 weeks from shipment)</h6>
                            @elseif ($data['shipment_method'] == 4)
                                <h6>Air Cargo (3-5 days from shipment)</h6>
                            @else
                                <h6></h6>
                            @endif
                        @endif
                    </p>
                </div>
            </div>

            <div style="margin-top: 5px">
                <div align="left" style="width: 50%; float: left; text-align: center;">
                    <div style="margin: auto; width: 80%">
                        <p style="font-weight: bolder; text-align: start">Shipping Information</p>
                        @if ($data['form'] == 1)
                            <p
                                style='background-color: #B6E0CC; padding: 5px 10px; text-align: start; border: 1px solid black'>
                                {{ $data['receiver_address'] }}
                            </p>
                        @elseif ($data['form'] == 2)
                            <p
                                style='background-color: #abe2cf; padding: 5px 10px; text-align: start; border: 1px solid black'>
                                {{ $data['receiver_address'] }}
                            </p>
                        @elseif ($data['form'] == 3)
                            <p
                                style='background-color: #9ec6e9; padding: 5px 10px; text-align: start; border: 1px solid black'>
                                {{ $data['receiver_address'] }}
                            </p>
                        @endif
                        <p><strong>Recipient Name :</strong> <span>{{ $data['receiver_name'] }}</span></p>
                        <p><strong>Recipient Contact Number :</strong> <span
                                class=''>{{ $data['receiver_phone'] }}</span></p>

                        <p style='font-weight: bold; margin-top: 3px; text-align: start;'>{{ $data['sender_email'] }}
                        </p>
                    </div>
                </div>
                <div align="right" style="width: 50%; float: right; text-align: center;">
                    <div style="margin: auto; width: 80%">
                        <p style="font-weight: bolder; text-align: start">Billing Information</p>
                        @if ($data['form'] == 1)
                            <p
                                style='background-color: #B6E0CC; padding: 5px 10px; text-align: start; border: 1px solid black'>
                                {{ $data['form'] == 1 ? $data['sg_address'] : $data['sender_address'] }}
                            </p>
                        @elseif ($data['form'] == 2)
                            <p
                                style='background-color: #abe2cf; padding: 5px 10px; text-align: start; border: 1px solid black'>
                                {{ $data['form'] == 1 ? $data['sg_address'] : $data['sender_address'] }}
                            </p>
                        @elseif ($data['form'] == 3)
                            <p
                                style='background-color: #9ec6e9; padding: 5px 10px; text-align: start; border: 1px solid black'>
                                {{ $data['form'] == 1 ? $data['sg_address'] : $data['sender_address'] }}
                            </p>
                        @endif
                        <p><strong>Sender Name :</strong> <span class="font-normal">{{ $data['sender_name'] }}</span>
                        </p>
                        <p><strong>Sender Contact Number :</strong> <span
                                class=''>{{ $data['sender_phone'] }}</span></p>
                    </div>
                </div>
            </div>


            <div style="overflow: auto; margin-bottom: 5px; margin-top: 5px; padding: 0; border: 1px solid black;">
                <table style='width: 100%; text-align: center;'>
                    <thead>
                        <tr style="background-color: #FFF2CC;">
                            <th width='3%' style="border: none; padding: 6px;">S/N</th>
                            <th width='30%' style="border: none; padding: 6px;">Description</th>
                            <th width='30%' style="border: none; padding: 6px;">Weight(kg) / Value</th>
                            <th width='20%' style="border: none; padding: 6px;">Unit Price / kg (S$)</th>
                            <th width='20%' style="border: none; padding: 6px;">Total Price S$</th>
                        </tr>
                    </thead>
                    <tbody class="dark:text-gray-400">
                        @foreach ($data['category'] as $key => $cat)
                            <tr>
                                <td style="border-bottom: 1px solid black;">{{ $key + 1 }}</td>
                                <td style="border-bottom: 1px solid black;">{{ $cat['category_name']['name'] }}</td>
                                <td style="border-bottom: 1px solid black;">{{ $cat['weight'] }}</td>
                                <td style="border-bottom: 1px solid black;">{{ $cat['unit_price'] }}</td>
                                <td style="border-bottom: 1px solid black;"> $ {{ $cat['total_price'] }}</td>
                            </tr>
                        @endforeach

                        <tr>
                            <td style="border-bottom: 1px solid black;"></td>
                            <td style="border-bottom: 1px solid black;">Total Weight</td>
                            <td style="border-bottom: 1px solid black;">{{ $request->total_weight }}</td>
                            <td style="border-bottom: 1px solid black;">handling fee 3 kg</td>
                            <td style="border-bottom: 1px solid black;">
                                {{ $data['handling_fee'] == 1 ? '$ 0.9' : '-' }}
                            </td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid black;"></td>
                            <td style="border-bottom: 1px solid black;">
                                {{ $data['form'] == 1 ? 'SG Home PickUp :' : 'Yangon Home PickUp' }}
                            </td>
                            <td style="border-bottom: 1px solid black; text-align: start;" colSpan='2'>
                                {{ $request->pickup ? 'Yes' : 'No' }}
                            </td>
                            <td style="border-bottom: 1px solid black;">
                                $ {{ $request->pickupAmt }}
                            </td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid black;"></td>
                            <td style="border-bottom: 1px solid black;">
                                {{ $data['form'] == 1 ? 'SG Home Delivery / Self Collection:' : 'Home/ Bus Station deliver:' }}
                            </td>
                            <td style="border-bottom: 1px solid black; text-align: start;" colSpan='2'>
                                {{ $request->collection_type }}
                            </td>
                            <td style="border-bottom: 1px solid black;">$ {{$request->collection_amount}}</td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid black;" colSpan='2'></td>
                            <td style="border-bottom: 1px solid black; text-align: start;">
                                {{ $data['payment_type'] == 1 ? 'SG Pay' : 'MM Pay' }}</td>
                            <td style="border-bottom: 1px solid black;" colSpan='2'></td>
                        </tr>
                        <tr>
                            <td></td>
                            @if ($data['form'] == 1)
                                <td colSpan='2'><b>PayNow to mobile 93250329 or UEN number 53413642K</b></td>
                            @elseif ($data['form'] == 2)
                                <td colSpan='2'><b>PayNow to SGMYANMAR UEN 53413642K or 93250329</b></td>
                            @elseif ($data['form'] == 3)
                                <td colSpan='2'><b>PayNow to UEN 53413642K or 93250329</b></td>
                            @endif
                            <td><strong>TOTAL</strong></td>
                            <td>$ {{ $request->total_amount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {{-- <p class="ml-3 mr-3 md:mr-0 md:ml-0 font-bold text-red-600 mt-1">*Any Loss or Damage, we will refund item price OR refund 3 times of shipping fee (item 1 to 5 only), whichever is lower.</p> --}}
            <p style="margin: 0 5px; color: red; margin-top: 5px;">*Any Loss or Damage, we will refund item price OR
                refund 3 times of shipping fee (item 1 to 5 only), whichever is lower.</p>
            <p style="margin: 0 5px; color: red; margin-top: 5px;">*if require full refund, additional 5% of item value
                have to pay upfront</p>

            <div style="margin-top: 10px;">
                <div align="left" style="width: 70%; float: left;">
                    <h4 style="margin-bottom: 5px;">Terms & Conditions:</h4>
                    @if ($data['form'] == 1)
                        <p>1. All prices stated here are in Singapore Dollars</p>
                        <p>2. Any illegal items will not be accepted</p>
                        <p>3. Arrival schedule might change due to unforeseen circumstances</p>
                        <p>4. We are not responsible for damaged items that are not declared</p>
                    @else
                        <p>1. All prices stated here are in Singapore Dollars</p>
                        <p>2. Any illegal items will not be accepted</p>
                        <p>3. Flight schedule might change due to unforeseen circumstances</p>
                        <p>4. Due to tighter restriction, offload is expected to happen</p>
                        <p>5. Please provide full address for SG Home Delivery</p>
                        <p>6. ALL FROZEN FOOD to be packed and sealed properly</p>
                        <p>7. Any Loss or Damage (except FROZEN FOOD) will be refunded 3 times of shipping fees</p>
                    @endif
                    <span>Items Detail:</span>
                    <div>Filters</div>
                    <div>Special Instruction:</div>
                </div>
                <div align="right" style="width: 30%; float: right;">
                    {{-- <h1>QR CODE</h1> --}}
                    <img src={{ $path }} width="100px" alt="">
                </div>
            </div>
        </main>
        {{-- <footer class="text-center font-medium ms-8 me-8 dark:text-gray-400">
            © 2023 by SGMyanmar - Myanmar Online Store - Food Delivery - Logistic Service
        </footer> --}}
    </div>
</body>

</html>
