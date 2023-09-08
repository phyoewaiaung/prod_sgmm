import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { checkNullOrBlank, emailChk, isdigit } from '@/Common/CommonValidation';
import Loading from '@/Common/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventEmitter from '@/utils/EventEmitter';


const MyanmarToSgOkkala = (props) => {
    useEffect(()=> {
        EventEmitter.emit("auth",{
            auth:props.auth.user?true:false
        })
    },[props])
    const [loading, setLoading] = useState(false);
    const [pickUpRadio, setPickUpRadio] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [payment, setPayment] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [senderPhone, setSenderPhone] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [transportId, setTransportId] = useState('');
    const [cargoDetail, setCartgoDetail] = useState('');
    const [selfCollectionId, setSelfCollectionId] = useState('');
    const [recipientPostalCode, setRecipientPostalCode] = useState('');
    const [additionalOpt, setAdditionalOpt] = useState('');
    const [weightFood, setWeightFood] = useState('');
    const [weightCloth, setWeightCloth] = useState('');
    const [weightCos, setWeightCos] = useState('');
    const [weightFrozen, setWeightFrozen] = useState('');
    const [weightOther, setWeightOther] = useState('');
    const [storageTypeId, setStorageTypeId] = useState('');
    const [otherCargo, setOtherCargo] = useState('');

    const [cargoData, setCargoData] = useState([
        { id: 1, name: "Food", isChecked: false },
        { id: 2, name: "Clothes", isChecked: false },
        { id: 6, name: "Frozen Food", isChecked: false },
        { id: 3, name: "Cosmetics / Medicine / Supplements", isChecked: false },
        { id: 5, name: "Electronic Goods", isChecked: false },
        { id: 7, name: "Other", isChecked: false }
    ])

    const [storageType, setStorageType] = useState([
        { id: 1, name: 'Room Temperature', isChecked: false },
        { id: 2, name: 'In Normal Fridge', isChecked: false },
        { id: 3, name: 'In Freezer', isChecked: false }
    ])

    const sgSelfCollection = [
        { id: 1, name: 'SG Home Delivery (S$5.90 within two days)', isChecked: false },
        { id: 2, name: 'SG Home Delivery (S$10.0 within one day)', isChecked: false },
        { id: 3, name: 'Self Collection', isChecked: false }
    ]

    const cargoDetailChange = (e) => {
        setCartgoDetail(e.target.value);
    }

    const recipientPostalCodeChange = (e) => {
        setRecipientPostalCode(e.target.value);
    }

    const additionalOptChange = (e) => {
        setAdditionalOpt(e.target.value);
    }

    const weightFoodChange = (e) => {
        if (!e.target.value) {
            setWeightFood("");
        } else if (isdigit(e.target.value)) {
            setWeightFood(e.target.value);
        }
    }

    const weightClothChange = (e) => {
        if (!e.target.value) {
            setWeightCloth("");
        } else if (isdigit(e.target.value)) {
            setWeightCloth(e.target.value);
        }
    }

    const weightCosChange = (e) => {
        if (!e.target.value) {
            setWeightCos("");
        } else if (isdigit(e.target.value)) {
            setWeightCos(e.target.value);
        }
    }

    const weightFrozenChange = (e) => {
        if (!e.target.value) {
            setWeightFrozen("");
        } else if (isdigit(e.target.value)) {
            setWeightFrozen(e.target.value);
        }
    }

    const weightOtherChange = (e) => {
        if (!e.target.value) {
            setWeightOther("");
        } else if (isdigit(e.target.value)) {
            setWeightOther(e.target.value);
        }
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

    const senderNameChange = (e) => {
        setSenderName(e.target.value);
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('error-sender-name').textContent = "";
            document.getElementById('senderName').style.border = '1px solid #BFDBFE';
        }
    }

    const senderPhoneChange = (e) => {
        setSenderPhone(e.target.value);
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('error-sender-phone').textContent = "";
            document.getElementById('senderPhone').style.border = '1px solid #BFDBFE';
        }
    }

    const senderAddressChange = (e) => {
        setSenderAddress(e.target.value);
    }

    const transportChange = (e) => {
        setTransportId(e.target.value);
        document.getElementById('error-transport').textContent = "";
        document.getElementById('transportId').style.border = '1px solid #BFDBFE';
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

    const storageTypeChange = (id) => {
        setStorageTypeId(id);
        document.getElementById('error-storage').textContent = "";
        document.getElementById('storage').style.border = '1px solid #BFDBFE';
    }

    const pickUpChange = (e) => {
        setPickUpRadio(e.target.value);
        document.getElementById('error-ygn-pickup').textContent = "";
        document.getElementById('yangon-pickup').style.border = '1px solid #BFDBFE';
    }

    const selfCollectionChange = (id) => {
        setSelfCollectionId(id);
        document.getElementById('error-sg-home').textContent = "";
        document.getElementById('sg-home').style.border = '1px solid #BFDBFE';
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

    const recipientPhoneChange = (e) => {
        setRecipientPhone(e.target.value);
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('error-rec-phone').textContent = "";
            document.getElementById('rec-phone').style.border = '1px solid #BFDBFE';
        }
    }

    const recipientAddressChange = (e) => {
        setRecipientAddress(e.target.value);
    }

    const submitClick = () => {
        let cargoArr = [];
        cargoData.forEach(d => {
            if (d.isChecked == true) {
                cargoArr.push({
                    id:d.id,
                    weight: d.id == 1 ? weightFood :
                    d.id == 2 ? weightCloth :
                    d.id == 3 ? weightCos :
                    d.id == 6 ? weightFrozen :  weightOther,
                    name: d.id == 7 ? otherCargo : ""
                })
            }
        })

        // if (checkNullOrBlank(senderEmail)) {
        //     document.getElementById('senderEmail').scrollIntoView({ behavior: 'smooth', block: 'center' });
        //     document.getElementById('senderEmail').style.border = '1px solid red';
        //     let error = document.getElementById('error-sender-email');
        //     error.textContent = 'Please Fill Sender Email!';
        //     error.style.color = 'red';
        //     error.style.marginTop = '10px';
        // }
        if (checkNullOrBlank(senderName)) {
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
        else if (checkNullOrBlank(transportId)) {
            document.getElementById('transportId').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('transportId').style.border = '1px solid red';
            let error = document.getElementById('error-transport');
            error.textContent = 'Please Choose Transport!';
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
        else if (checkNullOrBlank(storageTypeId)) {
            document.getElementById('storage').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('storage').style.border = '1px solid red';
            let error = document.getElementById('error-storage');
            error.textContent = 'Please Choose Storage Type!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(pickUpRadio)) {
            document.getElementById('yangon-pickup').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('yangon-pickup').style.border = '1px solid red';
            let error = document.getElementById('error-ygn-pickup');
            error.textContent = 'Please Choose Yes or No!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(selfCollectionId)) {
            document.getElementById('sg-home').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('sg-home').style.border = '1px solid red';
            let error = document.getElementById('error-sg-home');
            error.textContent = 'Please Choose SG Home Delivery!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else if (checkNullOrBlank(payment)) {
            document.getElementById('payment').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('payment').style.border = '1px solid red';
            let error = document.getElementById('error-payment');
            error.textContent = 'Please Choose at least one item!';
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
        else if (checkNullOrBlank(recipientPhone)) {
            document.getElementById('rec-phone').scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('rec-phone').style.border = '1px solid red';
            let error = document.getElementById('error-rec-phone');
            error.textContent = 'Please Fill Recipient Phone Number!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        }
        else {
            setLoading(true);
            let params = {
                "sender_email": senderEmail,
                "sender_name": senderName,
                "sender_phone": senderPhone,
                "sender_address": senderAddress,
                "transport": transportId,
                "storage_type": storageTypeId,
                "mm_home_pickup": pickUpRadio,
                "how_in_sg": selfCollectionId,
                "payment_type": payment,
                "receiver_postal_code": recipientPostalCode,
                "receiver_name": recipientName,
                "receiver_address": recipientAddress,
                "receiver_phone": recipientPhone,
                "additional_instruction": additionalOpt,
                "items": cargoArr,
                "weight_food": weightFood,
                "weight_cloth": weightCloth,
                "weight_cosmetic": weightCos,
                "weight_frozen": weightFrozen,
                "weight_other": weightOther,
                "other_cargo": otherCargo,
                "form": "2"
            }
            axios.post('/logistic/mm-sg-save', params)
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
                    setSenderAddress("");
                    setTransportId("");
                    setStorageTypeId("");
                    setPickUpRadio("");
                    setSelfCollectionId("");
                    setPayment("");
                    setRecipientPostalCode("");
                    setRecipientName("");
                    setRecipientAddress("");
                    setRecipientPhone("");
                    setAdditionalOpt("");
                    setWeightFood("");
                    setWeightCloth("");
                    setWeightCos("");
                    setWeightFrozen("");
                    setWeightOther("");
                    setOtherCargo("")
                    cargoData.map(d => d.isChecked = false);
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
                <Link href="/">
                    <header className="flex justify-center mt-10">
                        <img className="mt-[-70px]" src='images/SGMYANMAR.png' width="250" height="100" alt="sgmyanmar logo" />
                    </header>
                </Link>
                <main className='md:ml-[200px] mt-[-35px] md:mr-[200px] mb-0'>
                    <div className="flex flex-col justify-center align-middle">
                        <h2 className="text-blue-700 text-center text-2xl"> <span className="text-pink-700 font-bold">MYANMAR </span>TO <span className="text-purple-700 font-bold">SINGAPORE</span> LOGISTIC SERVICE</h2>
                        <h3 className='text-blue-700 font-bold text-center text-xl'>( Okkala Branch )</h3>
                        <div className='mt-5 me-4 ms-4'>
                            <h2 className='mb-4 font-bold text-blue-600 text-[20px]' htmlFor="">MM to SG rates:</h2>
                            <div className='mb-3 dark:text-gray-400'>
                                <h3 className='font-bold'>Air Freight Only:</h3>
                                <ul className='ms-7'>
                                    <li>Food : S$8.50 /kg</li>
                                    <li>Clothes : S$8.50 /kg</li>
                                    <li> Cosmetics : S$9.00 /kg</li>
                                    <li>Frozen food : S$ 9.00/kg (ALL FROZEN FOOD MUST BE PACKED PROPERLY AND CANNOT PACK WITH DRIED FOODS)</li>
                                    <li>Valuable items : please enquire</li>
                                </ul>
                            </div>
                            <div className="mb-3 dark:text-gray-400">
                                <h3 className='font-bold'>General rate for Medicine:</h3>
                                <ul className='ms-7'>
                                    <li>1 card: $1 to $1.50 (limit to 15 cards per trip)</li>
                                    <li>1 small box: $ 1.50 to $2.00</li>
                                    <li>1 big box : $2.50 to $3.00 (limit to 2 boxes per trip)</li>
                                </ul>
                            </div>
                            <h4 className='flex dark:text-gray-400 mb-2 items-center'>
                                <img className='me-2' src="images/information.png" width={25} height={25} alt="" />
                                <div>
                                    <span>Yangon Home Pickup : S$3.50 per trip (with area restrictions)</span>
                                </div>
                            </h4>
                            <h4 className='flex dark:text-gray-400 mb-2 items-center'>
                                <img className='me-2' src="images/information.png" width={25} height={25} alt="" />
                                <div>
                                    <span>SG Home Delivery : S$5.90 per trip </span>
                                </div>
                            </h4>
                            <div className='mt-3 bg-slate-200 p-3 dark:bg-gray-400'>
                                <h4 className='flex mb-2 items-center'>
                                    <span className="font-bold">Yangon Office (Shwe Mon)</span>No. 642, Thanthumar Street, 10 Ward, South Okkalapa
                                </h4>
                                <h4>
                                    <span className="font-bold"> Contact number</span>: +959 962 507 694
                                </h4>
                            </div>
                        </div>
                    </div>

                    <h3 className='dark:text-gray-400 font-bold mt-7 mb-3 me-4 ms-4'>Please provide the following details to avail of our logistics services:</h3>
                    <div className=' pt-4 pb-4'>
                        <div className='me-4 ms-4'>
                            <div id='senderEmail' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 mb-2'>Sender's Email</label>
                                <input className=' dark:bg-gray-400 w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="email" name="" id="" value={senderEmail} onChange={senderEmailChange} />
                                <span id="error-sender-email"></span>
                            </div>
                            <div id='senderName' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Sender's Name / ပေးပို့သူအမည်</label>
                                <input className=' dark:bg-gray-400 w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={senderName} onChange={senderNameChange} />
                                <span id="error-sender-name"></span>
                            </div>
                            <div id='senderPhone' className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Sender's Contact Number / ပေးပို့သူ၏ ဖုန်းနံပါတ်</label>
                                <input className=' dark:bg-gray-400 dark:text-black w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={senderPhone} onChange={senderPhoneChange} />
                                <span id="error-sender-phone"></span>
                            </div>
                            <div className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Sender's Address /ပေးပို့သူ၏ နေရပ်လိပ်စာ (optional)</label>
                                <input className=' dark:bg-gray-400 dark:text-black w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={senderAddress} onChange={senderAddressChange} />
                            </div>
                            <div id='transportId' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Sea Transport or Air Transport?</label>
                                <div className='mt-3'>
                                    <input className=' dark:bg-gray-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id="radio1" value="1" onChange={transportChange} checked={transportId === "1" ? true : false} /> <label className=' dark:text-gray-400 cursor-pointer
                                    me-3' htmlFor="radio1">Sea</label>
                                    <input className=' dark:bg-gray-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id='radio2' value="2" onChange={transportChange} checked={transportId === "2" ? true : false} /> <label className='cursor-pointer dark:text-gray-400' htmlFor="radio2">Air</label>
                                </div>
                                <span id="error-transport"></span>
                            </div>
                            <div id='what-send' className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>What are you sending? (you can select more than 1)</label>
                                ALL FROZEN FOOD must be given to office in frozen state, cannot pack with dried foods
                                <div className='mt-3'>
                                    {cargoData.map(data => {
                                        return (
                                            <div className='mb-2' key={data.id}>
                                                <input className=' dark:bg-gray-400 focus:ring cursor-pointer focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="checkbox" id={data.name} value={data.id} onChange={function () { cargoOnChage(data.id) }} checked={data.isChecked} />
                                                <label htmlFor={data.name} className='ms-2 cursor-pointer'>{data.name}</label>
                                                {data.id == 7 &&
                                                    <input className='dark:text-black dark:bg-gray-400 w-1/2 ml-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={otherCargo} onChange={otherCargoChange} />
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                                <span id="error-what-send"></span>
                            </div>
                            <div id='storage' className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Storage Type</label>
                                <div className='mt-3'>
                                    {storageType.map(data => {
                                        return (
                                            <div className='mb-2' key={data.id}>
                                                <input className=' dark:bg-gray-400 focus:ring cursor-pointer focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id={data.name} value={data.id} onChange={function () { storageTypeChange(data.id) }} checked={data.id == storageTypeId ? true : false} />
                                                <label htmlFor={data.name} className='ms-2 cursor-pointer'>{data.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <span id="error-storage"></span>
                            </div>
                            <div className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 mb-2'>Please provide details for your cargo. (optional)</label>
                                <input className=' dark:bg-gray-400 w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="email" name="" id="" value={cargoDetail} onChange={cargoDetailChange} />
                            </div>
                            <div id='yangon-pickup' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded dark:text-gray-400'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Choose Yangon Home Pick up at S$3.50?</label>
                                We will contact you to arrange day and time to pickup.
                                <div className='mt-3'>
                                    <input className=' dark:bg-gray-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id="ygnp1" value="1" name="yes" onChange={pickUpChange} checked={pickUpRadio === "1" ? true : false} /> <label className=' dark:text-gray-400 cursor-pointer
                                    me-3' htmlFor="ygnp1">Yes</label>
                                    <input className=' dark:bg-gray-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id='ygnp2' value="2" name="no" onChange={pickUpChange} checked={pickUpRadio === "2" ? true : false} /> <label className='cursor-pointer dark:text-gray-400' htmlFor="ygnp2">No</label>
                                </div>
                                <span id="error-ygn-pickup"></span>
                            </div>
                            <div id='sg-home' className='flex border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded dark:text-gray-400'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Choose SG Home Delivery / Self Collection?</label>
                                SG Home Delivery is based on driver's schedule, we appreciate your patience
                                <div className='mt-3'>
                                    {sgSelfCollection.map(data => {
                                        return (
                                            <div key={data.id} className='mb-1'>
                                                <input className=' dark:bg-gray-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id={data.name} value={data.id} onChange={function () { selfCollectionChange(data.id) }} checked={selfCollectionId === data.id ? true : false} />
                                                <label className='ms-3 dark:text-gray-400 cursor-pointer me-3' htmlFor={data.name}>{data.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <span id="error-sg-home"></span>
                            </div>
                            <div id='payment' className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Payment in Singapore (SG) or in Myanmar (MM)?</label>
                                ငွေပေးချေမှု ( SG Pay သို့မဟုတ် MM Pay)
                                <div className='mt-4'>
                                    <input className=' dark:bg-gray-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id="payment1" value="1" name="SG Pay" onChange={paymentChange} checked={payment === "1" ? true : false} /> <label className=' cursor-pointer
                                    me-3' htmlFor="payment1">SG Pay</label>
                                    <input className=' dark:bg-gray-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id='payment2' value="2" name="MM Pay" onChange={paymentChange} checked={payment === "2" ? true : false} /> <label className='cursor-pointer' htmlFor="payment2">MM Pay</label>
                                </div>
                                <span id="error-payment"></span>
                            </div>
                            <div id='rec-name' className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Recipient's Name / လက်ခံမည့်သူ၏ နာမည်</label>
                                <input className='dark:text-black dark:bg-gray-400 w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientName} onChange={recipientNameChange} />
                                <span id="error-rec-name"></span>
                            </div>
                            <div id='rec-phone' className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Recipient's Contact Number / လက်ခံမည့်သူ၏ ဖုန်းနံပါတ်</label>
                                <input className='dark:text-black dark:bg-gray-400 w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientPhone} onChange={recipientPhoneChange} />
                                <span id="error-rec-phone"></span>
                            </div>
                            <div className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Recipient's Postal Code</label>
                                <input className='dark:text-black dark:bg-gray-400 w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientPostalCode} onChange={recipientPostalCodeChange} />
                            </div>
                            <div className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Recipient's Address /လက်ခံမည့်သူ၏ နေရပ်လိပ်စာ</label>
                                <input className='dark:text-black dark:bg-gray-400 w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientAddress} onChange={recipientAddressChange} />
                            </div>
                            <div className='flex dark:text-gray-400 border-blue-200 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Additional Instructions? (optional)</label>
                                <input className='dark:text-black dark:bg-gray-400 w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={additionalOpt} onChange={additionalOptChange} />
                            </div>
                            <div className='p-4 bg-gray-200 dark:bg-gray-900 dark:text-gray-400'>
                                <h2 className='font-bold mb-3'>Weight of Cargo (leave blank if not sure)</h2>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    {cargoData[0].isChecked ?
                                        <div className='flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight Of Food</label>
                                            <input className='dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightFood} onChange={weightFoodChange} />
                                        </div> :
                                        <div className='flex bg-gray-400 dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight Of Food</label>
                                            <input className='bg-gray-200 cursor-not-allowed dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" disabled />
                                        </div>
                                    }
                                    {cargoData[1].isChecked ?
                                        <div className='flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight Of Clothes</label>
                                            <input className='dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightCloth} onChange={weightClothChange} />
                                        </div> :
                                        <div className='bg-gray-400 flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight Of Clothes</label>
                                            <input className='bg-gray-200 cursor-not-allowed dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" disabled />
                                        </div>
                                    }
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    {cargoData[3].isChecked ?
                                        <div className='flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight of Cosmetics/Medicine  / Supplements</label>
                                            <input className='dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightCos} onChange={weightCosChange} />
                                        </div> :
                                        <div className='bg-gray-400 flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight of Cosmetics/Medicine  / Supplements</label>
                                            <input className='bg-gray-200 cursor-not-allowed dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" disabled />
                                        </div>
                                    }
                                    {cargoData[2].isChecked ?
                                        <div className='flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight of Frozen Food</label>
                                            <input className='dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightFrozen} onChange={weightFrozenChange} />
                                        </div> :
                                        <div className='bg-gray-400 flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight of Frozen Food</label>
                                            <input className='bg-gray-200 cursor-not-allowed dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" disabled />
                                        </div>
                                    }
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    {cargoData[5].isChecked ?
                                        <div className='flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight of other items</label>
                                            <input className='dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightOther} onChange={weightOtherChange} />
                                        </div> :
                                        <div className='bg-gray-400 flex dark:text-gray-400 border-blue-300 dark:border-blue-500 border p-6 flex-col mb-4 rounded'>
                                            <label htmlFor="" className='mb-2'>Weight of other items</label>
                                            <input className='bg-gray-200 cursor-not-allowed dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" disabled />
                                        </div>
                                    }
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

export default MyanmarToSgOkkala
