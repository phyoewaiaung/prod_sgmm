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
        p {
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
        
    {{-- <table style="width: 100%">
        </thead>
        <tbody>
            <tr style="border: 1px solid black">
                <td style="width: 50%">
                    <h5>From</h5>
                    <div style="border: 5px solid red">
                        <div class="card-header">
                            <h2 class="card-title">Card Title</h2>
                            <p class="card-subtitle">Subtitle</p>
                        </div>
                        <div class="card-body">
                            <p class="card-content">
                                This is the content of the card. You can add any text or elements here.
                            </p>
                        </div>
                    </div>
                </td>
                <td style="width: 50%;">
                    <h5>To</h5>
                    <div class="card-header">
                        <h2 class="card-title">Card Title</h2>
                        <p class="card-subtitle">Subtitle</p>
                    </div>
                    <div class="card-body">
                        <p class="card-content">
                            This is the content of the card. You can add any text or elements here.
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table> --}}


    <div style="width: 100%; border: 2px solid black; padding: 20px; border-radius: 5px;">
        {{-- logo and invoice section --}}
        <div align="left" class="">
            <div align="left" style="width: 30%; float: left;">
                <img src="images/SGMYANMAR.png" width="100px" alt="">
            </div>
            <div>
                <div align="left" style="width: 30%; float: left;">
                    <h3>{{ $invoiceNo }}</h3>
                </div>
                <div align="left" style="width: 30%; float: right;">
                    <h3>SEA</h3>
                </div>
            </div>
        </div>

        {{-- sender section --}}
        <div align="left" style="width: 45%;float: left;">
            <h5>From</h5>
            <div class="card">
                {{-- <div class="card-header">
                    <h2 class="card-title">Card Title</h2>
                    <p class="card-subtitle">Subtitle</p>
                </div> --}}
                <div class="card-body">
                    <p class="card-content">
                        <span>Name: <span style="text-align: right;">Blah Blah</span></span> <br>
                        Phone: 35346464654646 <br>
                        Address: Him Ywat Ka Soon
                    </p>
                </div>
            </div>
        </div>
      
        {{-- receiver section --}}
        <div align="left" style="width: 45%;float: right;">
            <h5>From</h5>
            <div class="card">
                {{-- <div class="card-header">
                    <h2 class="card-title">Card Title</h2>
                    <p class="card-subtitle">Subtitle</p>
                </div> --}}
                <div class="card-body">
                    <p class="card-content">
                        Name: Blah Blah <br>
                        Phone: 35346464654646 <br>
                        Address: Him Ywat Ka Soon
                    </p>
                </div>
            </div>
        </div>
    </div>


</body>

</html>
