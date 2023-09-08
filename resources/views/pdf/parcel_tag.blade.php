<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        p,
        h5 {
            margin: 0;
            margin-bottom: 0;
        }

        .card {
            width: 100%;
            height: 100px;
            border-radius: 3px;
            border: 0.3px solid black !important;
            display: inline-block;
        }

        .card-header {
            padding: 10px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .card-title {
            font-size: 18px;
            margin: 0;
        }

        .card-subtitle {
            font-size: 14px;
            margin-top: 5px;
        }

        .card-body {
            padding: 10px;
        }

        .card-content {
            font-size: 16px;
        }
    </style>
</head>

<body>

    @if ($flag == 1)
        {{-- Flag 1 is SG to MM --}}
        <div style="width: 100%; border: 1px solid black; padding: 20px; border-radius: 5px;">
            {{-- logo and invoice section --}}
            <div align="left" class="">
                <div align="left" style="width: 25%; float: left;">
                    <img src="images/SGMYANMAR.png" width="150px" alt="">
                </div>
                <div>
                    <div align="left" style="width: 60%; float: left;">
                        <h1>{{ $data->invoice_no }}</h1>
                        @if ($data->shipment_method == 1)
                            <h6>Land (2 weeks from shipment)</h6>
                        @elseif ($data->shipment_method == 2)
                            <h6>Land Express (7-10 days from shipment)</h6>
                        @elseif ($data->shipment_method == 3)
                            <h6>Sea Cargo (3-4 weeks from shipment)</h6>
                        @elseif ($data->shipment_method == 4)
                            <h6>Air Cargo (3-5 days from shipment)</h6>
                        @else
                            <h6></h6>
                        @endif
                    </div>
                    <div align="left" style="width: 35%; float: right;">
                        @if ($data->shipment_method == 1 || $data->shipment_method == 2)
                            <h2>LAND</h2>
                        @elseif ($data->shipment_method == 3)
                            <h2>SEA</h2>
                        @elseif ($data->shipment_method == 4)
                            <h2>AIR</h2>
                        @else
                            <h6></h6>
                        @endif
                        {{-- <h5><strong>Date Time : </strong><span>{{ Carbon::parse($data->created_at)->format('d/m/Y  H:i:s') }}</span></h5> --}}
                        <h5><strong>Date Time : </strong><span>{{ $data->created_at }}</span></h5>
                    </div>
                </div>
            </div>

            {{-- sender section --}}
            <div align="left" style="width: 49%;float: left;">
                <h5>From</h5>
                <div class="card">
                    <div class="card-body">

                        <div class="card-content" style="width:30%; float: left;">
                            Name <br>
                            Phone <br>
                            Address
                        </div>

                        <div class="card-content" style="width:60%; float: right;">
                            : {{ $data->sender_name }} <br>
                            : {{ $data->sender_phone }} <br>
                            : {{ $data->sg_address }}
                        </div>

                    </div>
                </div>
                <p><strong>Special Instruction :</strong> <span>{{ $data->note }}</span></p>
                @if ($data->how_in_ygn == 1)
                    <p>Yangon Home Delivery Downtown ($3.5)</p>
                @elseif ($data->how_in_ygn == 2)
                    <p>Yangon Home Deliver outside ($5.0)</p>
                @elseif ($data->how_in_ygn == 3)
                    <p>Bus Gate ($3.5)</p>
                @elseif ($data->how_in_ygn == 4)
                    <p>Self Collection</p>
                @else
                    <p></p>
                @endif
            </div>

            {{-- receiver section --}}
            <div align="left" style="width: 49%;float: right;">
                <h5>To</h5>
                <div class="card">
                    <div class="card-body">

                        <div class="card-content" style="width:30%; float: left;">
                            Name <br>
                            Phone <br>
                            Address
                        </div>

                        <div class="card-content" style="width:60%; float: right;">
                            : {{ $data->receiver_name }} <br>
                            : {{ $data->receiver_phone }} <br>
                            : {{ $data->receiver_address }}
                        </div>

                    </div>
                </div>
                <p></p>
                <p style="float: right; text-align:right;">{{ $data->sender_email }}</p>
            </div>
        </div>
    @else
        {{-- Flag 2 is MM to SG --}}
        <div style="width: 100%; border: 1px solid black; padding: 20px; border-radius: 5px;">
            {{-- logo and invoice section --}}
            <div align="left" class="">
                <div align="left" style="width: 25%; float: left;">
                    <img src="images/SGMYANMAR.png" width="150px" alt="">
                </div>
                <div>
                    <div align="left" style="width: 60%; float: left;">
                        <h1>{{ $data->invoice_no }}</h1>
                        @if ($data->transport == 1)
                            <h6>Sea Transport</h6>
                        @elseif ($data->transport == 2)
                            <h6>Air Transport</h6>
                        @else
                            <h6></h6>
                        @endif
                    </div>
                    <div align="left" style="width: 35%; float: right;">
                        @if ($data->transport == 1)
                            <h2>SEA</h2>
                        @elseif ($data->transport == 2)
                            <h2>AIR</h2>
                        @else
                            <h6></h6>
                        @endif
                        {{-- <h5><strong>Date Time : </strong><span>{{ Carbon::parse($data->created_at)->format('d/m/Y  H:i:s') }}</span></h5> --}}
                        <h5><strong>Date Time : </strong><span>{{ $data->created_at }}</span></h5>
                    </div>
                </div>
            </div>

            {{-- sender section --}}
            <div align="left" style="width: 49%;float: left;">
                <h5>From</h5>
                <div class="card">
                    <div class="card-body">

                        <div class="card-content" style="width:30%; float: left;">
                            Name <br>
                            Phone <br>
                            Address
                        </div>

                        <div class="card-content" style="width:60%; float: right;">
                            : {{ $data->sender_name }} <br>
                            : {{ $data->sender_phone }} <br>
                            : {{ $data->sender_address }}
                        </div>

                    </div>
                </div>
                <p><strong>Special Instruction :</strong> <span>{{ $data->additional_instruction }}</span></p>
                @if ($data->how_in_sg == 1)
                    <p>SG Home Delivery (S$5.90 within two days)</p>
                @elseif ($data->how_in_sg == 2)
                    <p>SG Home Delivery (S$10.0 within one day)</p>
                @elseif ($data->how_in_sg == 3)
                    <p>Self Collection</p>
                @else
                    <p></p>
                @endif
            </div>

            {{-- receiver section --}}
            <div align="left" style="width: 49%;float: right;">
                <h5>To</h5>
                <div class="card">
                    <div class="card-body">

                        <div class="card-content" style="width:30%; float: left;">
                            Name <br>
                            Phone <br>
                            Address
                        </div>

                        <div class="card-content" style="width:60%; float: right;">
                            : {{ $data->receiver_name }} <br>
                            : {{ $data->receiver_phone }} <br>
                            : {{ $data->receiver_address }}
                        </div>

                    </div>
                </div>
                <p></p>
                <p style="float: right; text-align:right;">{{ $data->sender_email }}</p>
            </div>
        </div>
    @endif
</body>

</html>
