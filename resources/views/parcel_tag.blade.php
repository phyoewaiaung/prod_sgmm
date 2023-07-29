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
        p, h5 {
            margin: 0;
            margin-bottom: 0;
        }
        .card {
            width: 100%;
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
    
    {{-- <h1>{{ $datas }}</h1>

    <p>
        “ မနေ့က အရာတွေကနေ သင်ယူပါ။ <br />
        ဒီနေ့အတွက် ရှင်သန်ပါ။ <br />
        မနက်ဖြန် အတွက် မျှော်လင့်ချက်ထားပါ။ “ <br />
        — Albert Einstein
    </p> --}}

    {{-- <pagebreak>

        <p>This is one page</p>
        <img src="images/logo.png" alt="" width="200px"> --}}
        
    


    <div style="width: 100%; border: 1px solid black; padding: 20px; border-radius: 5px;">
        {{-- logo and invoice section --}}
        <div align="left" class="">
            <div align="left" style="width: 30%; float: left;">
                <img src="images/SGMYANMAR.png" width="100px" alt="">
            </div>
            <div>
                <div align="left" style="width: 50%; float: left;">
                    <h2>{{ $data->invoice_no }}</h2>
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
                <div align="left" style="width: 50%; float: right;">
                    <h2>SEA</h2>                    
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
            <h5>From</h5>
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


</body>

</html>
