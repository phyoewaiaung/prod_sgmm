<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        header{
            margin-left: 5px;
            margin-right: 5px;
        }
        h6, h5, h4 {
            margin: 0;
            margin-bottom: 0;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="">
        <header>

            <div align="left" style="width: 45%; float: left;">
                <div style="text-align: center; margin-top: 0;">
                    <img src='images/SGMYANMAR.png' width="150" alt="sgmyanmar logo" />
                </div>
            </div>

            <div align="left" style="width: 55%; float: right;">
                <div style="margin-bottom: 15px;">
                    <h5>111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</h5>
                    <h5>Contact: +65 9325 0329</h5>
                </div>
                <div >
                    <div align="left" style="width: 50%; float: left;">
                        {{-- <h4 class=''>Myanmar Branch(South Okkalapa)</h4> --}}
                        <h5>No. 642, Thanthumar Street, 10 Ward, South Okkalapa, Yangon</h5>                        
                        <h5>Contact: +959 962 507 694</h5>
                    </div>
                    <div align="right" style="width: 50%; float: right;">
                        <h4 class=''>Myanmar Branch(Alone)</h4>
                        <h5>အမှတ် ၂၂ / သိပ္ပံလမ်း / အလုံမြို့နယ်</h5>
                        <h5>Contact: 09958450219</h5>
                    </div>
                </div>

                <div style="margin-top: 15px;">
                    <div align="left" style="width: 50%; float: left;">
                        <h4>INVOICE</h4>
                    </div>
                    <div align="right" style="width: 50%; float: right; text-align: right;">
                        <h4>VR- SM23-07W3006</h4>
                    </div>
                </div>
            </div>
        </header>


        {{-- <main class='md:w-5/6 w-full'>
            <hr class='border h-[15px] bg-gray-400 border-gray-400' />
            <div class="flex md:flex-row flex-col md:justify-evenly mt-3">
                <div class='text-center'>
                    <h3 class="font-bold dark:text-gray-400">Date & Time :<span class='text-red-600 font-normal'>17/07/2023 17:35:30 </span></h3>
                    <h3 class='font-bold dark:text-gray-400'>Name :<span class='font-normal'>PHYOE WAI AUNG</span></h3>
                </div>
                <div>
                    <h3 class='font-bold text-center dark:text-gray-400'>Delievery Mode : <span class='font-normal'>Sea Cargo (3-4 weeks from shipment)</span></h3>
                </div>
            </div>
            <div class="flex md:flex-row flex-col md:justify-evenly mt-3">
                <div class='md:w-1/2 w-full text-center'>
                    <h3 class="font-bold text-center md:text-start ml-11 dark:text-blue-500">Shipping Information</h3>
                    <textarea class='invoice-color-textarea w-5/6' value='No. 21,Block C,Thiri Yadanar Retail and Wholesale Market, Thudhamma Road, North Okkalapa Tsp.Yangon' readOnly />
                    <h3 class="font-bold dark:text-gray-400">Recipient Name : <span class="font-normal">phyoe wai aung</span></h3>
                    <h3 class="font-bold dark:text-gray-400">Recipient Contact Number : <span class='font-normal'>092345673</span></h3>
                </div>
                <div class='md:w-1/2 w-full text-center'>
                    <h3 class="font-bold text-center md:text-start ml-11 dark:text-blue-500">Billing Information</h3>
                    <textarea class='invoice-color-textarea w-5/6' value='No. 21,Block C,Thiri Yadanar Retail and Wholesale Market, Thudhamma Road, North Okkalapa Tsp.Yangon' readOnly />
                    <h3 class="font-bold dark:text-gray-400">Sender Name : <span class="font-normal">phyoe wai aung</span></h3>
                    <h3 class="font-bold dark:text-gray-400">Sender Contact Number : <span class='font-normal'>092345673</span></h3>
                </div>
            </div>
            <div class='mt-4 ml-3 mr-3 md:ml-0 md:mr-0'>
                <h3 class='dark:text-red-400 font-bold'>phyoewaiaung082@gmail.com</h3>
            </div>
            <div class="mb-3 invoice-issue-container md:mr-0 md:ml-0 ml-3 mr-3">
                <table class='invoice-issue-table text-center'>
                    <thead>
                        <tr>
                            <th width={50}>S/N</th>
                            <th width={300}>Description</th>
                            <th width={200}>Weight(kg) / Value</th>
                            <th width={200}>Unit Price / kg (S$)</th>
                            <th width={200}>Total Price S$</th>
                        </tr>
                    </thead>
                    <tbody class="dark:text-gray-400">
                        <tr>
                            <td>1</td>
                            <td>Food and Clothes</td>
                            <td>3.00</td>
                            <td>3</td>
                            <td> $9.00</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Shoes / Bag</td>
                            <td>3.00</td>
                            <td>5</td>
                            <td>$16.00</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Cosmetics / Medicine/ Supplements</td>
                            <td>3.00</td>
                            <td>5</td>
                            <td>$16.00</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Electronic Item</td>
                            <td>3.00</td>
                            <td>5</td>
                            <td>$16.00</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Others - Voltage regulator</td>
                            <td>3.00</td>
                            <td>10%</td>
                            <td>$16.00</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Total Weight</td>
                            <td>7.00</td>
                            <td>handling fee 3 kg</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>SG Home PickUp:</td>
                            <td class='text-start' colSpan={2}>Yes</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Home/ Bus Station deliver:</td>
                            <td class='text-start' colSpan={2}>Yangon Home Delivery Downtown ($3.5)</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                            <td class='text-start'>MM Pay</td>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={2} class='font-bold'>PayNow to mobile 93250329 or UEN number 53413642K </td>
                            <td>TOTAL</td>
                            <td>$45.40</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 class="ml-3 mr-3 md:mr-0 md:ml-0 font-bold text-red-600 mt-1">*Any Loss or Damage, we will refund item price OR refund 3 times of shipping fee (item 1 to 5 only), whichever is lower.</h3>
            <h3 class="ml-3 mr-3 md:mr-0 md:ml-0 font-bold text-red-600">*if require full refund, additional 5% of item value have to pay upfront</h3>
            <div class="ml-5 mr-5 md:mr-0 md:ml-0 flex md:flex-row flex-col md:justify-between mb-5 items-center">
                <div class='dark:text-gray-400'>
                    <h4 class="font-bold">Terms & Conditions:</h4>
                    <ol>
                        <li>All prices stated here are in Singapore Dollars</li>
                        <li>Any illegal items will not be accepted</li>
                        <li> Arrival schedule might change due to unforeseen circumstances</li>
                        <li>We are not responsible for damaged items that are not declared</li>
                    </ol>
                    <span>Items Detail:</span>
                    <div>Filters</div>
                    <div>Special Instruction:</div>
                </div>
                <div class='md:mr-[80px] md:mt-0 mt-4'>
                    <div>
                        <button class='invoice-issue-button'>Send Email</button>
                    </div>
                    <div class='mt-3'>
                        <button class='invoice-issue-button'>Update</button>
                    </div>
                </div>
            </div>
        </main>
        <footer class="text-center font-medium ms-8 me-8 dark:text-gray-400">
            © 2023 by SGMyanmar - Myanmar Online Store - Food Delivery - Logistic Service
        </footer> --}}
    </div>
</body>
</html>