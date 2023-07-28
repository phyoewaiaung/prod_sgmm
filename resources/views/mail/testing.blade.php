<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    {{-- <h4>Hello,</h4>

    <p>Please let us know if you are requesting a home pick up.</p>
    <p>Based on the information, it's questionable.</p>

    <p>Please provide name, phone number, and SG home address so that we can contact you.</p>

    <p>Thank you.</p> --}}

    <p>
        Hi, Thank you for requesting our pick up service. We will contact you for pick up arrangement. Please find the attached file 
        for your Parcel Tag. You may print out the tags and paste it on the parcel or you can write parcel tag number {{$logistic}}. 
        Please note that the pickup fee has changed to $4.90 (for more than 5kg) and $7.00 (for less than 5kg). 
        There is also a handling fee of $0.90 for parcels less than 3 kg. Thank you for using SGMYANMAR services.
    </p>



    <p>Best Regards,</p>
    <img src="{{ $message->embed('images/SGMYANMAR.png') }}" width="120px">



</body>
</html>