import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { checkNullOrBlank, emailChk } from '@/Common/CommonValidation';
import Loading from '@/Common/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventEmitter from '@/utils/EventEmitter';

const SingaporeToMMIndex = (props) => {
    useEffect(()=> {
        EventEmitter.emit("auth",{
            auth:props.auth.user?true:false
        })
    },[props])
    const [loading, setLoading] = useState(false);
    const [pickUpRadio, setPickUpRadio] = useState('');
    const [shipModeId, setShipModeId] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [senderPhone, setSenderPhone] = useState('');
    const [ygnDelId, setYgnDelId] = useState('');
    const [payment, setPayment] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [aggrementCheck, setAggrementCheck] = useState(false);
    const [additionalNote, setAdditionalNote] = useState('');
    const [sgPickUpAddress, setSgPickUpAddress] = useState('');
    const [otherCargo, setOtherCargo] = useState('');

    const shipmentMode = [
        { id: 1, name: "Land (2 weeks from shipment)" },
        { id: 2, name: "Land Express (7-10 days from shipment)" },
        { id: 3, name: "Sea Cargo (3-4 weeks from shipment)" },
        { id: 4, name: "Air Cargo (3-5 days from shipment)" }
    ]

    const [cargoData, setCargoData] = useState([
        { id: 1, name: "Food", isChecked: false },
        { id: 2, name: "Clothes", isChecked: false },
        { id: 3, name: "Cosmetics / Medicine / Supplements", isChecked: false },
        { id: 4, name: "Shoes / Bags", isChecked: false },
        { id: 5, name: "Electronic Goods", isChecked: false },
        { id: 7, name: "Other", isChecked: false }
    ])

    const ygnHomeDeli = [
        { id: 1, name: "Yangon Home Delivery Downtown ($3.5)" },
        { id: 2, name: "Yangon Home Deliver outside ($5.0)" },
        { id: 3, name: "Bus Gate ($3.5)" },
        { id: 4, name: "Self Collection" }
    ]

    const shipmodeOnChange = (e) => {
        setShipModeId(e.target.value);
        document.getElementById('error-ship-mode').textContent = "";
        document.getElementById('ship-mode').style.border = '1px solid #BFDBFE';
    }

    const senderEmailChange = (e) => {
        setSenderEmail(e.target.value);
        let error = document.getElementById('error-sender-email');
        if (!emailChk(e.target.value)) {
            error.textContent = 'Please Fill The Valid Email!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        } else {
            error.textContent = '';
            document.getElementById('senderEmail').style.border = '1px solid #BFDBFE';
        }
    }

    const senderPhoneChange = (e) => {
        setSenderPhone(e.target.value);
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('error-sender-phone').textContent = "";
            document.getElementById('senderPhone').style.border = '1px solid #BFDBFE';
        }
    }

    const senderNameChange = (e) => {
        setSenderName(e.target.value)
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('error-sender-name').textContent = "";
            document.getElementById('senderName').style.border = '1px solid #BFDBFE';
        }
    }
    const pickUpChange = (e) => {
        setPickUpRadio(e.target.value);
        document.getElementById('error-sg-home').textContent = "";
        document.getElementById('sg-home-pick').style.border = '1px solid #BFDBFE';
    }
    const cargoOnChage = (id) => {
        let data = cargoData.map(data => {
            if (data.id == id) {
                data.isChecked = !data.isChecked;
            }
            return data;
        })
        setCargoData(data)
        let cargoArr = [];
        cargoData.forEach(d => {
            if (d.isChecked == true) {
                cargoArr.push(d.id)
            }
        })
        if (cargoArr.length > 0) {
            document.getElementById('error-what-send').textContent = "";
            document.getElementById('what-send').style.border = '1px solid #BFDBFE';
        } else {
            document.getElementById('what-send').style.border = '1px solid red';
            let error = document.getElementById('error-what-send');
            error.textContent = 'Please Choose at least one item!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
    }
    const otherCargoChange = (e) => {
        setOtherCargo(e.target.value);
    }
    const ygnHomeDeliChange = (e) => {
        setYgnDelId(e.target.value);
        document.getElementById('error-ygn-home').textContent = "";
        document.getElementById('ygn-home').style.border = '1px solid #BFDBFE';
    }
    const paymentChange = (e) => {
        setPayment(e.target.value);
        document.getElementById('error-payment').textContent = "";
        document.getElementById('payment').style.border = '1px solid #BFDBFE';
    }
    const recipientNameChange = (e) => {
        setRecipientName(e.target.value);
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('error-rec-name').textContent = "";
            document.getElementById('rec-name').style.border = '1px solid #BFDBFE';
        }
    }
    const recipientAddressChange = (e) => {
        setRecipientAddress(e.target.value);
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('error-rec-add').textContent = "";
            document.getElementById('rec-add').style.border = '1px solid #BFDBFE';
        }
    }
    const recipientPhoneChange = (e) => {
        setRecipientPhone(e.target.value);
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('error-rec-ph').textContent = "";
            document.getElementById('rec-ph').style.border = '1px solid #BFDBFE';
        }
    }
    const aggrementCheckChange = (e) => {
        setAggrementCheck(!aggrementCheck);
        if (e.target.checked) {
            document.getElementById('aggre-chk').textContent = "";
        }
    }

    const additionNoteChange = (e) => {
        setAdditionalNote(e.target.value);
    }

    const sgPickUpAddressChange = (e) => {
        setSgPickUpAddress(e.target.value);
    }

    const submitClick = () => {
        let cargoArr = [];
        cargoData.forEach(d => {
            if (d.isChecked == true) {
                cargoArr.push(d.id)
            }
        })
        // let errArr = [];
        if (checkNullOrBlank(senderEmail)) {
            document.getElementById('senderEmail').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('senderEmail').style.border = '1px solid red';
            let error = document.getElementById('error-sender-email');
            error.textContent = 'Please Fill Sender Email!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(senderName)) {
            document.getElementById('senderName').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('senderName').style.border = '1px solid red';
            let error = document.getElementById('error-sender-name');
            error.textContent = 'Please Fill Sender Name!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(senderPhone)) {
            document.getElementById('senderPhone').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('senderPhone').style.border = '1px solid red';
            let error = document.getElementById('error-sender-phone');
            error.textContent = 'Please Fill Sender Phone Number!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(pickUpRadio)) {
            document.getElementById('sg-home-pick').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('sg-home-pick').style.border = '1px solid red';
            let error = document.getElementById('error-sg-home');
            error.textContent = 'Please Choose Yes or No!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(shipModeId)) {
            document.getElementById('ship-mode').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('ship-mode').style.border = '1px solid red';
            let error = document.getElementById('error-ship-mode');
            error.textContent = 'Please Choose Shipment Mode!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (cargoArr.length == 0) {
            document.getElementById('what-send').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('what-send').style.border = '1px solid red';
            let error = document.getElementById('error-what-send');
            error.textContent = 'Please Choose at least one item!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(ygnDelId)) {
            document.getElementById('ygn-home').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('ygn-home').style.border = '1px solid red';
            let error = document.getElementById('error-ygn-home');
            error.textContent = 'Please Choose Yangon Home Delivery!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(payment)) {
            document.getElementById('payment').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('payment').style.border = '1px solid red';
            let error = document.getElementById('error-payment');
            error.textContent = 'Please Choose Payment!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(recipientName)) {
            document.getElementById('rec-name').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('rec-name').style.border = '1px solid red';
            let error = document.getElementById('error-rec-name');
            error.textContent = 'Please Fill Recipient Name!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(recipientAddress)) {
            document.getElementById('rec-add').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('rec-add').style.border = '1px solid red';
            let error = document.getElementById('error-rec-add');
            error.textContent = 'Please Fill Recipient Address!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(recipientPhone)) {
            document.getElementById('rec-ph').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('rec-ph').style.border = '1px solid red';
            let error = document.getElementById('error-rec-ph');
            error.textContent = 'Please Fill Recipient Contact Number!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (!aggrementCheck) {
            let error = document.getElementById('aggre-chk');
            error.textContent = 'Please Check The Aggrementx!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else {
            setLoading(true);
            let params = {
                "sender_email": senderEmail,
                "sender_name": senderName,
                "sender_phone": senderPhone,
                "sg_home_pickup": pickUpRadio,
                "sg_address": sgPickUpAddress,
                "shipment_method": shipModeId,
                "how_in_ygn": ygnDelId,
                "payment_type": payment,
                "receiver_name": recipientName,
                "receiver_address": recipientAddress,
                "receiver_phone": recipientPhone,
                "note": additionalNote,
                "other_cargo":otherCargo,
                "items": cargoArr
            }
            axios.post('/logistic/sg-mm-save', params)
                .then(data => {
                    setLoading(false);
                    toast.success('Successfully Registered!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setSenderEmail("");
                    setSenderName("");
                    setSenderPhone("");
                    setPickUpRadio("");
                    setSgPickUpAddress("");
                    setShipModeId("");
                    setYgnDelId("");
                    setPayment("");
                    setRecipientName("");
                    setRecipientAddress("");
                    setRecipientPhone("");
                    setAdditionalNote("");
                    setOtherCargo('')
                    cargoData.map(d => d.isChecked = false);
                    setAggrementCheck("");
                })
                .catch((e) => {
                    setLoading(false);
                    toast.error('Fail To Register!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                });
        }
    }

    return (
        <>
            <Loading start={loading} />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="relative pt-6 pb-6 sm:flex sm:justify-center flex-col sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <Link href='/'>
                    <header className="flex justify-center mt-10">
                        <img className="mt-[-70px]" src='images/SGMYANMAR.png' width="250" height="100" alt="sgmyanmar logo" />
                    </header>
                </Link>
                <main className='md:ml-[200px] mt-[-35px] md:mr-[200px] mb-0'>
                    <div className="flex flex-col justify-center align-middle">
                        <h2 className="text-blue-700 text-center text-2xl"><span className="text-purple-700 font-bold">SINGAPORE</span> TO <span className="text-pink-700 font-bold">MYANMAR</span> LOGISTIC SERVICE</h2>
                        <div className='mt-5 me-4 ms-4'>
                            <h4 className='flex dark:text-gray-400 mb-2 items-center'>
                                <img className='me-2' src="images/information.png" width={25} height={25} alt="" />
                                <div>
                                    <span className="font-bold me-1">NO</span> pickup on <span className="font-bold me-1 ms-1"> Thursdays </span> and <span className="font-bold ms-1 me-1">Sundays</span>as those 2 days are for cargo consolidation and submission
                                </div>
                            </h4>
                            <h4 className='flex dark:text-gray-400 mb-2 items-center'>
                                <img className=' me-2' src="images/information.png" width={25} height={25} alt="" />
                                Please fill in form when your parcel is ready for pick up
                            </h4>
                            <h4 className='flex dark:text-gray-400 mb-2 items-center'>
                                <img className=' me-2' src="images/information.png" width={25} height={25} alt="" />
                                Invoice is sent via email. Please provide a valid email address
                            </h4>
                            <h4 className='flex dark:text-gray-400 mb-2 items-center'>
                                <img className=' me-2' src="images/information.png" width={25} height={25} alt="" />
                                Shipping fee for TV is ~ $120.00 - $160.00 (depends on size of TV). Please enquire before send
                            </h4>
                            <h4 className='flex dark:text-gray-400 mb-2 items-center'>
                                <img className=' me-2' src="images/information.png" width={25} height={25} alt="" />
                                All Document = $10.00 (flat fee), pickup ($7.0) and MM delivery charges applies
                            </h4>
                            <div className='mt-3 bg-slate-200 p-3 dark:bg-gray-400'>
                                <h4 className='flex mb-2 items-center'>
                                    <span className="font-bold">Singapore Office</span> : 111 North Bridge Road, #02-02A, Peninsula Plaza, S179098
                                </h4>
                                <h4>
                                    <span className="font-bold"> Contact number</span>: 93250329 / 81290955
                                </h4>
                            </div>
                        </div>
                    </div>

                    <h3 id="" className='dark:text-gray-400 font-bold mt-7 mb-3 me-4 ms-4'>Please provide the following details to avail of our logistics services:</h3>
                    <div className=' pt-4 pb-4'>
                        <div className='me-4 ms-4'>
                            <div id='senderEmail' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Email</label>
                                <input className='dark:bg-gray-400 w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="email" name="" id="" value={senderEmail} onChange={senderEmailChange} />
                                <span id='error-sender-email'></span>
                            </div>
                            <div id='senderName' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Sender's Name / ပေးပို့သူအမည်</label>
                                <input className='w-1/2 mt-3 dark:bg-gray-400  border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={senderName} onChange={senderNameChange} />
                                <span id="error-sender-name"></span>
                            </div>
                            <div id='senderPhone' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Sender's Contact Number / ပေးပို့သူ၏ ဖုန်းနံပါတ်</label>
                                <input className='dark:bg-gray-400 w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={senderPhone} onChange={senderPhoneChange} />
                                <span id="error-sender-phone"></span>
                            </div>
                            <div id='sg-home-pick' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Choose SG Home Pick up? </label>
                                <div className='mt-3'>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id="radio1" value="1" name="yes" onChange={pickUpChange} checked={pickUpRadio === "1" ? true : false} /> <label className=' dark:text-gray-400 cursor-pointer
                                    me-3' htmlFor="radio1">Yes</label>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id='radio2' value="2" name="no" onChange={pickUpChange} checked={pickUpRadio === "2" ? true : false} /> <label className='cursor-pointer dark:text-gray-400 cursor-po' htmlFor="radio2">No</label>
                                </div>
                                <div className='mt-2 dark:text-gray-400'>
                                    <div>($4.9 for more than 5kg, $7.0 for less than 5kg)</div>
                                    <div className='font-bold'>
                                        NO pickup on Thursdays and Sundays, please indicate under "Additional notes" if you have odd shape items or your items weigh more than 50kg.
                                    </div>
                                </div>
                                <span id="error-sg-home"></span>
                            </div>
                            <div className='flex  cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2 dark:text-gray-400'>Singapore Address for SG Home Pick Up</label>
                                <input className='dark:bg-gray-400 w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={sgPickUpAddress} onChange={sgPickUpAddressChange} />
                            </div>
                            <div id='ship-mode' className='flex dark:text-gray-400 cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Shipment Mode / ကုန်ပစ္စည်း ပို့ဆောင်မှု ပုံစံများ</label>
                                <div className='mt-3'>
                                    {shipmentMode.map(data => {
                                        return (
                                            <div className='mb-2' key={data.id}>
                                                <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none cursor-pointer' type="radio" id={data.id + 'ship'} value={data.id} onChange={shipmodeOnChange} checked={shipModeId == data.id ? true : false} />
                                                <label htmlFor={data.id + 'ship'} className='ms-2 cursor-pointer'>{data.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='mt-2'>
                                    <div className='font-bold'>
                                        Last day for Land cargo is Thursday / Last day for Land express & Air Cargo is Sunday / Last day for Sea Cargo is Sunday
                                    </div>
                                </div>
                                <span id="error-ship-mode"></span>
                            </div>
                            <div id='what-send' className='flex dark:text-gray-400 cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>What are you sending? ပေးပို့မည့်ပစ္စည်း အမျိုးအစားများ</label>
                                <div className='mt-3'>
                                    {cargoData.map(data => {
                                        return (
                                            <div className='mb-2' key={data.id}>
                                                <input className='focus:ring cursor-pointer focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="checkbox" id={data.name} value={data.id} onChange={function () { cargoOnChage(data.id) }} checked={data.isChecked} />
                                                <label htmlFor={data.name} className='ms-2 cursor-pointer'>
                                                    {data.name}
                                                </label>
                                                {data.id == 7 &&
                                                <input className='dark:bg-gray-400 dark:text-black w-1/2 ml-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={otherCargo} onChange={otherCargoChange} />
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='mt-2'>
                                    <div className='font-bold'>
                                        Last day for Land cargo is Thursday / Last day for Land express & Air Cargo is Sunday / Last day for Sea Cargo is Sunday
                                    </div>
                                </div>
                                <span id="error-what-send"></span>
                            </div>
                            <div id='ygn-home' className='flex dark:text-gray-400 cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Choose Yangon Home Delivery / Send to Bus Gate (bus terminal) / Self Collection?
                                </label>
                                ရန်ကုန် အိမ်အရောက် ပို့ဆောင်ပေးခြင်း/ ကားဂိတ် တင်ပေးခြင်း/ ကိုယ်တိုင် ဆိုင်သို့လာရောက် ထုတ်ယူခြင်း
                                <div className='mt-4'>
                                    {ygnHomeDeli.map(data => {
                                        return (
                                            <div className='mb-2' key={data.id}>
                                                <input className='cursor-pointer focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id={data.id + 'ygn-home'} value={data.id} onChange={ygnHomeDeliChange} checked={ygnDelId == data.id ? true : false} />
                                                <label htmlFor={data.id + 'ygn-home'} className='ms-2 cursor-pointer'>{data.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='mt-2'>
                                    <div className='font-bold'>
                                        Last day for Land cargo is Thursday / Last day for Land express & Air Cargo is Sunday / Last day for Sea Cargo is Sunday
                                    </div>
                                </div>
                                <span id="error-ygn-home"></span>
                            </div>
                            <div id='payment' className='flex dark:text-gray-400 cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Payment in Singapore (SG) or in Myanmar (MM)?</label>
                                ငွေပေးချေမှု ( SG Pay သို့မဟုတ် MM Pay)
                                <div className='mt-4'>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id="payment1" value="1" name="SG Pay" onChange={paymentChange} checked={payment === "1" ? true : false} /> <label className=' cursor-pointer
                                    me-3' htmlFor="payment1">SG Pay</label>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id='payment2' value="2" name="MM Pay" onChange={paymentChange} checked={payment === "2" ? true : false} /> <label className='cursor-pointer' htmlFor="payment2">MM Pay</label>
                                </div>
                                <span id="error-payment"></span>
                            </div>
                            <div id='rec-name' className='flex cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Recipient's Name / လက်ခံမည့်သူ၏ နာမည်</label>
                                <input className='dark:bg-gray-400 w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientName} onChange={recipientNameChange} />
                                <span id="error-rec-name"></span>
                            </div>
                            <div id='rec-add' className='flex dark:text-gray-400 cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Recipient's Address /လက်ခံမည့်သူ၏ နေရပ်လိပ်စာ</label>
                                Please fill in 'NA' or 'Yangon' if self collection
                                <input className='dark:bg-gray-400 dark:text-black w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientAddress} onChange={recipientAddressChange} />
                                <span id="error-rec-add"></span>
                            </div>
                            <div id='rec-ph' className='flex dark:text-gray-400 cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Recipient's Contact Number / လက်ခံမည့်သူ၏ ဖုန်းနံပါတ်</label>
                                you can fill in more than 1 contact number
                                <input className='dark:bg-gray-400 dark:text-black w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientPhone} onChange={recipientPhoneChange} />
                                <span id="error-rec-ph"></span>
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label className='font-bold'>
                                    Additional Notes For SG Home Pick Up
                                </label>
                                <label className='mb-2' htmlFor="">
                                    Please enter the estimated weight of your cargo. သင့်ကုန်တင်၏ ခန့်မှန်းအလေးချိန်ကို ထည့်ပါ။
                                </label>
                                <label className='mb-2' htmlFor="">
                                    Please declare odd-shape cargo (wheelchair, bed frame, TV etc) ကျေးဇူးပြု၍ ပုံသဏ္ဍာန်ကုန်တင်ကြောင်းကြေငြာပါ။
                                </label>
                                <label className='mb-2' htmlFor="">
                                    Pls indicate here for Van pickup if your item is longer than 1.2m and more than 50kg
                                    Van pickup is $25.00 per trip
                                </label>
                                <label className='mb-2' htmlFor="">
                                    please note we may charge base on volumetric weight (LxWxH/6000 = kg) if item is too light.
                                </label>
                                <input className='dark:bg-gray-400 dark:text-black w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={additionalNote} onChange={additionNoteChange} />
                            </div>
                            <div className='flex bg-blue-100 dark:bg-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Terms and Conditions (Please Read)</label>
                                <ol>
                                    <li className='mb-2'>
                                        No restricted items (alcohol, chemicals, explosive items etc) are to be included in the parcel
                                    </li>
                                    <li className='font-bold mb-2'>
                                        ALL items in parcel MUST be declared. We are not responsible for the damages and loss of undeclared items. Especially for FRAGILE items, please declare upon sending to us.
                                    </li>
                                    <li className="mb-2">
                                        Perfumes are not allowed for Land Express cargo as these items cannot go on flights. Parcels with perfume will be automatically shipped by land cargo.
                                    </li>
                                    <li className='mb-2'>
                                        For any damage or loss, we will compensate for item cost OR 3 times of shipping fee, whichever is LOWER. For full amount refund, 5% of item cost need to be paid upfront (Pickup fee or delivery fee, if any, is non-refundable)
                                    </li>
                                    <li className='mb-2'>
                                        There could be delays in shipment due to unexpected circumstances, such as weather, regional stability and custom clearances.
                                    </li>
                                    <li className='font-bold mb-2'>
                                        We may repack your items into hardened box if we deem your box not suitable for shipment. Please inform us if you do not want us to repack your items. We will not be
                                    </li>
                                    <li className='font-bold mb-2'>
                                        We may charge based on volumetric weight  (LxWxH/6000 =kg) OR actual weight, whichever is higher
                                    </li>
                                </ol>
                                <div className='bg-white p-6 mt-3 dark:bg-gray-300'>
                                    <label className='required font-bold' htmlFor="">Aggrement</label>
                                    <div className='flex justify-center items-center mt-3'>
                                        <input className='focus:ring cursor-pointer me-3 focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="checkbox" id='aggre' value={aggrementCheck} onChange={aggrementCheckChange} checked={aggrementCheck} />
                                        <label htmlFor='aggre' className='ms-2 cursor-pointer'>I have READ and AGREE with the Terms and Conditions above and that cargo may be charged based on  volumetric weight  (LxWxH/6000 =kg) OR actual weight, whichever is higher</label>
                                    </div>
                                    <span id="aggre-chk"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button onClick={submitClick} type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Submit
                        </button>
                    </div>
                </main>
                <footer className="text-center font-medium ms-8 me-8 dark:text-gray-400">
                    © 2023 by SGMyanmar - Myanmar Online Store - Food Delivery - Logistic Service
                </footer>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
            `}
            </style>
        </>
    );
}

export default SingaporeToMMIndex
