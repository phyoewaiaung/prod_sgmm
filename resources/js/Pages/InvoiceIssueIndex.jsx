import React, { useEffect, useState } from 'react'
import { Link } from '@inertiajs/react'
import { isdigit } from '@/Common/CommonValidation';
import axios from 'axios';
import Loading from '@/Common/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventEmitter from '@/utils/EventEmitter';

const InvoiceIssueIndex = (props) => {
    useEffect(()=> {
        EventEmitter.emit("auth",{
            auth:props.auth.user?true:false
        })
    },[props])
    const [loading, setLoading] = useState(false);
    const [foodWeight, setFoodWeight] = useState("");
    const [clothWeight, setClothWeight] = useState("");
    const [frozenWeight, setFrozenWeight] = useState("");
    const [shoeWeight, setShoeWeight] = useState("");
    const [cosmeticWeight, setCosmeticWeight] = useState("");
    const [electronicWeight, setElectronicWeight] = useState("");
    const [othersWeight, setOthersWeight] = useState(0);
    const [handlingFee, setHandlingFee] = useState(props.data.handling_fee == "1" ? true : false);
    const [categories, setCategories] = useState([]);
    const [foodUnit, setFoodUnit] = useState();
    const [shoeUnit, setShoeUnit] = useState();
    const [frozenUnit, setFronzenUnit] = useState(8.5);
    const [cosmeticUnit, setCosmeticUnit] = useState();
    const [electronicUnit, setElectronicUnit] = useState();
    const [totalFood, setTotalFood] = useState('-');
    const [totalCloth, setTotalCloth] = useState('-');
    const [totalFrozen, setTotalFrozen] = useState('-');
    const [totalShoe, setTotalShoe] = useState('-');
    const [totalCosmetic, setTotalCosmetic] = useState('-');
    const [totalElectronic, setTotalElectronic] = useState('-');
    const [totalOther, setTotalOther] = useState('-');
    const [id, setId] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderPhone, setSenderPhone] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [transport, setTransport] = useState('');
    const [shipMode, setShipMode] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [sgPickup, setSgPickup] = useState('');
    const [howInYgn, setHowInYgn] = useState('');
    const [ygnPickup, setYgnPickup] = useState('');
    const [howInSg, setHowInSg] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [othersUnit, setOthersUnit] = useState(0.00);

    useEffect(() => {
        setCategories(props.data.category);
        props.data.category.map(d => {
            if(d.id == 7){
                setOthersUnit(d.unit_price)
            }
        })
        const foodUnit = props.data.shipment_method ?
            props.data.shipment_method == "1" ?
                "6.00" :
                props.data.shipment_method == "2" ?
                    "8.00" :
                    props.data.shipment_method == "3" ?
                        "3.00" : "8" : props.data.transport == "1" ? parseFloat(foodWeight) > 20 ? "4.00" : "4.50" : "8.00";

        const shoeUnit = props.data.shipment_method ?
            props.data.shipment_method == "1" ?
                "8.00" :
                props.data.shipment_method == "2" ?
                    "10.00" :
                    props.data.shipment_method == "3" ?
                        "4.00" : "12" : "4.5";

        const cosmeticUnit = props.data.shipment_method ?
            props.data.shipment_method == "1" ?
                "9.00" :
                props.data.shipment_method == "2" ?
                    "12.00" :
                    props.data.shipment_method == "3" ?
                        "5.00" : "14" : "4.5";

        const electronicUnit = props.data.shipment_method ?
            props.data.shipment_method == "1" ?
                "10.00" :
                props.data.shipment_method == "2" ?
                    "12.00" :
                    props.data.shipment_method == "3" ?
                        "5.00" : "15" : "4.5";

        props.data.category.map(d => {
            if (d.id == "1" && d.weight != null) {
                setFoodWeight(d.weight);
                setTotalFood(parseFloat(d.weight * foodUnit).toFixed(2))
            }
            if (d.id == "2" && d.weight != null) {
                setClothWeight(d.weight);
                setTotalCloth(parseFloat(d.weight * foodUnit).toFixed(2));
            }
            if (d.id == "3" && d.weight != null) {
                setCosmeticWeight(d.weight);
                setTotalCosmetic(parseFloat(d.weight * cosmeticUnit).toFixed(2));
            }
            if (d.id == "4" && d.weight != null) {
                setShoeWeight(d.weight);
                setTotalShoe(parseFloat(d.weight * shoeUnit).toFixed(2));
            }
            if (d.id == "5" && d.weight != null) {
                setElectronicWeight(d.weight);
                setTotalElectronic(parseFloat(d.weight * electronicUnit).toFixed(2));
            }
            if (d.id == "6" && d.weight != null) {
                setFrozenWeight(d.weight);
                setTotalFrozen(parseFloat(d.weight * frozenUnit).toFixed(2));
            }
            if (d.id == "7" && d.weight != null) {
                setOthersWeight(d.weight);
                setTotalOther(parseFloat(d.weight * d.unit_price).toFixed(2));
            }
        })
        setFoodUnit(foodUnit);
        setShoeUnit(shoeUnit);
        setCosmeticUnit(cosmeticUnit);
        setElectronicUnit(electronicUnit);
        setId(props.data.id);
        setInvoiceNo(props.data.invoice_no);
        setSenderName(props.data.sender_name);
        setSenderAddress(props.data.sender_address ? props.data.sender_address : props.data.sg_address);
        setSenderPhone(props.data.sender_phone);
        setSenderEmail(props.data.sender_email);
        setTransport(props.data.transport);
        setShipMode(props.data.shipment_method);
        setReceiverName(props.data.receiver_name);
        setReceiverAddress(props.data.receiver_address);
        setReceiverPhone(props.data.receiver_phone);
        setSgPickup(props.data.sg_home_pickup);
        setHowInYgn(props.data.how_in_ygn);
        setYgnPickup(props.data.mm_home_pickup);
        setHowInSg(props.data.how_in_sg);
        setPaymentType(props.data.payment_type);
    }, [])

    const foodWeightChange = (e) => {
        if (!e.target.value) {
            setFoodWeight("");
            setTotalFood("-");
        } else if (isdigit(e.target.value)) {
            setFoodWeight(e.target.value);
            setTotalFood((parseFloat(e.target.value) * foodUnit).toFixed(2));
        }
    }
    const clothWeightChange = (e) => {
        if (!e.target.value) {
            setClothWeight("");
            setTotalCloth("-");
        } else if (isdigit(e.target.value)) {
            setClothWeight(e.target.value);
            setTotalCloth((parseFloat(e.target.value) * foodUnit).toFixed(2));
        }
    }
    const frozenWeightChange = (e) => {
        if (!e.target.value) {
            setFrozenWeight("");
            setTotalFrozen("-");
        } else if (isdigit(e.target.value)) {
            setFrozenWeight(e.target.value);
            setTotalFrozen((parseFloat(e.target.value) * frozenUnit).toFixed(2));
        }
    }
    const shoeWeightChange = (e) => {
        if (!e.target.value) {
            setShoeWeight("");
            setTotalShoe("-");
        } else if (isdigit(e.target.value)) {
            setShoeWeight(e.target.value);
            setTotalShoe((parseFloat(e.target.value) * shoeUnit).toFixed(2));
        }
    }
    const cosmeticWeightChange = (e) => {
        if (!e.target.value) {
            setCosmeticWeight("");
            setTotalCosmetic("-");
        } else if (isdigit(e.target.value)) {
            setCosmeticWeight(e.target.value);
            setTotalCosmetic((parseFloat(e.target.value) * cosmeticUnit).toFixed(2));
        }
    }
    const electronicWeightChange = (e) => {
        if (!e.target.value) {
            setElectronicWeight("");
            setTotalElectronic("-");
        } else if (isdigit(e.target.value)) {
            setElectronicWeight(e.target.value);
            setTotalElectronic((parseFloat(e.target.value) * electronicUnit).toFixed(2));
        }
    }
    const othersWeightChange = (e) => {
        if (!e.target.value) {
            setOthersWeight("");
            setTotalOther("-");
        } else if (isdigit(e.target.value)) {
            setOthersWeight(e.target.value);
            setTotalOther((parseFloat(e.target.value) * othersUnit).toFixed(2));
        }
    }
    const othersUnitChange = (e) => {
        if (!e.target.value) {
            setOthersUnit("");
            setTotalOther("-");
        } else if (isdigit(e.target.value)) {
            setOthersUnit(e.target.value);
            setTotalOther((parseFloat(e.target.value) * parseFloat(othersWeight)).toFixed(2));
        }
    }
    const checkboxChange = () => {
        setHandlingFee(!handlingFee);
    }

    const updateClick = (mail) => {
        let data = categories.map(d => {
            if (d.id == "1") {
                d.weight = foodWeight;
                d.unit_price = foodUnit;
            }
            if (d.id == "2") {
                d.weight = clothWeight;
                d.unit_price = foodUnit;
            }
            if (d.id == "3") {
                d.weight = cosmeticWeight;
                d.unit_price = cosmeticUnit;
            }
            if (d.id == "4") {
                d.weight = shoeWeight;
                d.unit_price = shoeUnit;
            }
            if (d.id == "5") {
                d.weight = electronicWeight;
                d.unit_price = electronicUnit;
            }
            if (d.id == "6") {
                d.weight = frozenWeight;
                d.unit_price = frozenUnit;
            }
            if (d.id == "7") {
                d.weight = othersWeight;
                d.unit_price = othersUnit
            }
            return d;
        })

        let params = {
            mail: mail,
            id: id,
            invoice_no: invoiceNo,
            category_data: data,
            handling_fee: handlingFee ? true : false,
            pickup: howInSg == undefined ? (sgPickup == "1" ? true : false) : (ygnPickup == "1" ? true : false),

            pickupAmt: (howInSg == undefined ?
                (
                    sgPickup == "1" &&
                    (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                        ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                        ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                        ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                        ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                        ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) >= 7
                ) ? 4.90 : 7.00 : "3.5"
            ),

            collection_type: (howInSg == undefined ?
                howInYgn == "1" ? "Yangon Home Delivery Downtown ($3.5)" :
                    howInYgn == "2" ? "Yangon Home Deliver outside ($5.0)" :
                        howInYgn == "3" ? "Bus Gate ($3.5)" : "Self Collection" :
                howInSg == "1" ? "SG Home Delivery (S$5.90 within two days)" :
                    howInSg == "2" ? "SG Home Delivery (S$10.0 within one day)" :
                        "Self Collection"
            ),

            collection_amount: (howInSg == undefined ?
                howInYgn == "1" ? "3.50" :
                    howInYgn == "2" ? "5.00" :
                        howInYgn == "3" ? "3.50" : "-" :
                (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                    ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                    ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                    ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                    ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                    ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                    ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) > 20 ? "10.00" :
                    (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                        ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                        ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                        ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                        ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                        ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                        ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) > 15 ? "10.00" : "5.90"
            ),

            total_weight: ((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                ((othersWeight == "") ? 0.0 : parseFloat(othersWeight)),

            total_amount: (parseFloat((totalFood == "-" ? 0 : totalFood)) +
                parseFloat((totalCloth == "-" ? 0 : totalCloth)) +
                parseFloat((totalFrozen == "-" ? 0 : totalFrozen)) +
                parseFloat((totalShoe == "-" ? 0 : totalShoe)) +
                parseFloat((totalCosmetic == "-" ? 0 : totalCosmetic)) +
                parseFloat((totalElectronic == "-" ? 0 : totalElectronic)) +
                parseFloat((totalOther == "-" ? 0 : totalOther)) +
                (handlingFee ? 0.90 : 0) +
                (howInSg == undefined ?
                    ((
                        sgPickup == "1" &&
                        (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                            ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                            ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                            ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                            ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                            ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                            ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) >= 7
                    ) ? 4.90 : 7.00) :
                    0.00
                )
                +
                (ygnPickup == "1" ? 3.50 : 0.00) +
                (howInSg == undefined ?
                    howInYgn == "1" ? 3.50 :
                        howInYgn == "2" ? 5.00 :
                            howInYgn == "3" ? 3.50 : 0 :
                    (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                        ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                        ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                        ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                        ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                        ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                        ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) > 20 ? 10.00 :
                        (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                            ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                            ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                            ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                            ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                            ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                            ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) > 15 ? 10.00 : 5.90
                )
            ).toFixed(2)
        }
        setLoading(true);
        let text = mail ? 'Successfully Sent Email And Update!' : 'Successfully Update!';
        axios.post('/save-issue', params)
            .then(res => {
                setLoading(false);
                toast.success(text, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(e => {
                setLoading(false);
                toast.error('Fail To Update!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
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
                <header className='mt-10 ml-3 mr-3 md:ml-0 md:mr-0 flex flex-col md:flex-row justify-around items-center gap-10'>
                    <div className='md:pl-[100px] md:pr-[100px]'>
                        <Link href='/'>
                            <div className="flex justify-center items-center">
                                <img className="mt-[-70px]" src='images/SGMYANMAR.png' width="250" height="100" alt="sgmyanmar logo" />
                            </div>
                        </Link>
                    </div>
                    <div className='dark:text-gray-400 mt-[-78px] md:mt-0'>
                        {props.data.form == "1" ?
                            <>
                                <h3 className='font-bold mb-2'>Singapore Branch</h3>
                                <h4>111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</h4>
                                <h4>Contact: +65 9325 0329</h4>
                                <div className="flex md:flex-row flex-col justify-center items-start mt-3 divide-y-2 md:divide-x-2 md:divide-y-0">
                                    <div className='md:pr-4 md:pb-0 pb-3'>
                                        <h3 className='font-bold mb-2'>Myanmar Branch(South Okkalapa)</h3>
                                        <h4>No. 642, Thanthumar Street, 10 </h4>
                                        Ward, South Okkalapa, Yangon
                                        <h4>Contact: +959 962 507 694</h4>
                                    </div>
                                    <div className='md:pl-4 md:pt-0 pt-3'>
                                        <h3 className='font-bold mb-2'>Myanmar Branch(Alone)</h3>
                                        <h4>အမှတ် ၂၂ / သိပ္ပံလမ်း / အလုံမြို့နယ်</h4>
                                        <h4>Contact: 09958450219</h4>
                                    </div>
                                </div>
                            </> :
                            props.data.form == "2" ?
                                <>
                                    <h4>111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</h4>
                                    <h4>Contact: +65 9325 0329</h4>
                                    <h4>No.642 Thanthumar Road, 10 Qtr, South Okkalapa, Yangon</h4>
                                    <h4>Contact:  +959 962 507 694</h4>
                                    <br />
                                    <h5>sgmm@sgmyanmar.com / www.sgmyanmar.com</h5>
                                </> :
                                <>
                                    <h4>111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</h4>
                                    <h4>Contact: +65 9325 0329</h4>
                                    <h4>အမှတ် ၂၂ / သိပ္ပံလမ်း / အလုံမြို့နယ် ရန်ကုန်၊၊</h4>
                                    <h4>Contact: +95 9958450219</h4>
                                    <br />
                                    <h5>sgmm@sgmyanmar.com / www.sgmyanmar.com</h5>
                                </>
                        }
                        <div className="flex justify-between">
                            <div>
                                <h2 className='font-bold text-xl mt-3'>Invoice</h2>
                            </div>
                            <div>
                                <h2 className='font-bold text-xl mt-3'>VR- {invoiceNo}</h2>
                            </div>
                        </div>
                    </div>
                </header>
                <main className='md:w-5/6 w-full'>
                    <hr className='border mt-3 h-[15px] bg-gray-400 border-gray-400' />
                    <div className="flex md:flex-row flex-col md:justify-evenly mt-3">
                        <div className='text-center'>
                            <h3 className="font-bold dark:text-gray-400">Date & Time :<span className='text-red-600 font-normal'>{new Date().toLocaleString()}</span></h3>
                            <h3 className='font-bold dark:text-gray-400'>Name :<span className='font-normal'>{senderName}</span></h3>
                        </div>
                        <div>
                            <h3 className='font-bold text-center dark:text-gray-400'>Delievery Mode : <span className='font-normal'>{
                                transport ? (transport == "1" ? "Air" : "Sea") :
                                    shipMode == "1" ?
                                        "Land (2 weeks from shipment)" :
                                        shipMode == "2" ?
                                            "Land Express (7-10 days from shipment)" :
                                            shipMode == "3" ?
                                                "Sea Cargo (3-4 weeks from shipment)" :
                                                "Air Cargo (3-5 days from shipment)"
                            }</span></h3>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col md:justify-evenly mt-3">
                        <div className='md:w-1/2 w-full text-center'>
                            <h3 className="font-bold text-center md:text-start ml-11 dark:text-blue-500">Shipping Information</h3>
                            <textarea className={props.data.form == "1" ? "form1-bg w-5/6" : props.data.form == "2" ? "form2-bg w-5/6" : "form3-bg w-5/6"} value={receiverAddress} readOnly />
                            <h3 className="font-bold dark:text-gray-400">Recipient Name : <span className="font-normal">{receiverName}</span></h3>
                            <h3 className="font-bold dark:text-gray-400">Recipient Contact Number : <span className='font-normal'>{receiverPhone}</span></h3>
                        </div>
                        <div className='md:w-1/2 w-full text-center'>
                            <h3 className="font-bold text-center md:text-start ml-11 dark:text-blue-500">Billing Information</h3>
                            <textarea className={props.data.form == "1" ? "form1-bg w-5/6" : props.data.form == "2" ? "form2-bg w-5/6" : "form3-bg w-5/6"} value={senderAddress} readOnly />
                            <h3 className="font-bold dark:text-gray-400">Sender Name : <span className="font-normal">{senderName}</span></h3>
                            <h3 className="font-bold dark:text-gray-400">Sender Contact Number : <span className='font-normal'>{senderPhone}</span></h3>
                        </div>
                    </div>
                    <div className='mt-4 ml-3 mr-3 md:ml-0 md:mr-0'>
                        <h3 className='dark:text-red-400 font-bold'>{senderEmail}</h3>
                    </div>
                    <div className="mb-3 invoice-issue-container md:mr-0 md:ml-0 ml-3 mr-3">
                        <table className='invoice-issue-table text-center'>
                            <thead className={props.data.form == "1" ? "form1-header" : props.data.form == "2" ? "form2-header" : "form3-header"}>
                                <tr>
                                    <th width={50}>S/N</th>
                                    <th width={300}>Description</th>
                                    <th width={200}>Weight(kg) / Value</th>
                                    <th width={200}>Unit Price / kg (S$)</th>
                                    <th width={200}>Total Price S$</th>
                                </tr>
                            </thead>
                            <tbody className="dark:text-gray-400">
                                {categories.length > 0 &&
                                    categories.map((data, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                {data.id == "1" &&
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Food</td>
                                                        <td>
                                                            <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={foodWeight === 0 ? '' : foodWeight} onChange={foodWeightChange} />
                                                        </td>
                                                        <td>{foodUnit}</td>
                                                        <td>{totalFood}</td>
                                                    </tr>
                                                }
                                                {data.id == "2" &&
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Clothes</td>
                                                        <td>
                                                            <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={clothWeight === 0 ? '' : clothWeight} onChange={clothWeightChange} />
                                                        </td>
                                                        <td>{foodUnit}</td>
                                                        <td>{totalCloth}</td>
                                                    </tr>
                                                }

                                                {data.id == "4" &&
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Shoes / Bag</td>
                                                        <td>
                                                            <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={shoeWeight === 0 ? '' : shoeWeight} onChange={shoeWeightChange} />
                                                        </td>
                                                        <td>{shoeUnit}</td>
                                                        <td>{totalShoe}</td>
                                                    </tr>
                                                }
                                                {data.id == "6" &&
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Frozen Food</td>
                                                        <td>
                                                            <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={frozenWeight === 0 ? '' : frozenWeight} onChange={frozenWeightChange} />
                                                        </td>
                                                        <td>{frozenUnit}</td>
                                                        <td>{totalFrozen}</td>
                                                    </tr>
                                                }
                                                {data.id == "3" &&
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Cosmetics / Medicine/ Supplements</td>
                                                        <td>
                                                            <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={cosmeticWeight === 0 ? '' : cosmeticWeight} onChange={cosmeticWeightChange} />
                                                        </td>
                                                        <td>{cosmeticUnit}</td>
                                                        <td>{totalCosmetic}</td>
                                                    </tr>
                                                }
                                                {data.id == "5" &&
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Electronic Item</td>
                                                        <td>
                                                            <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={electronicWeight === 0 ? '' : electronicWeight} onChange={electronicWeightChange} />
                                                        </td>
                                                        <td>{electronicUnit}</td>
                                                        <td>{totalElectronic}</td>
                                                    </tr>
                                                }
                                                {data.id == "7" &&
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Others - Voltage regulator</td>
                                                        <td>
                                                            <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={othersWeight === 0 ? '' : othersWeight} onChange={othersWeightChange} />
                                                        </td>
                                                        <td>
                                                            <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={othersUnit === 0 ? '' : othersUnit} onChange={othersUnitChange} />
                                                        </td>
                                                        <td>{totalOther}</td>
                                                    </tr>
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
                                <tr>
                                    <td></td>
                                    <td>Total Weight</td>
                                    <td>
                                        {
                                            (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                                            ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                                            ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                                            ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                                            ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                                            ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                                            ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))).toFixed(2)
                                        }
                                    </td>
                                    <td>
                                        <input className='cursor-pointer focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="checkbox" value={handlingFee} onChange={checkboxChange} checked={handlingFee} />
                                        <span className='ms-2'>handling fee 3 kg</span>
                                    </td>
                                    <td>{handlingFee ? 0.90 : "-"}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>{howInSg == undefined ? "SG Home PickUp:" : "Yangon Home Pickup:"}</td>
                                    <td className='text-start' colSpan={2}>{
                                        howInSg == undefined ?
                                            sgPickup == "1" ? "Yes" : "No" :
                                            ygnPickup == "1" ? "Yes" : "No"
                                    }</td>
                                    <td>
                                        {
                                            howInSg == undefined ?
                                                (
                                                    sgPickup == "1" &&
                                                    (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                                                        ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                                                        ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                                                        ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                                                        ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                                                        ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) >= 7
                                                ) ? 4.90 : 7.00
                                                :
                                                "3.50"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>{howInSg == undefined ? "Home/ Bus Station deliver:" : "SG Home Delivery / Self Collection:"}</td>
                                    <td className='text-start' colSpan={2}>
                                        {
                                            howInSg == undefined ?
                                                howInYgn == "1" ? "Yangon Home Delivery Downtown ($3.5)" :
                                                    howInYgn == "2" ? "Yangon Home Deliver outside ($5.0)" :
                                                        howInYgn == "3" ? "Bus Gate ($3.5)" : "Self Collection"
                                                :
                                                howInSg == "1" ? "SG Home Delivery (S$5.90 within two days)" :
                                                    howInSg == "2" ? "SG Home Delivery (S$10.0 within one day)" :
                                                        "Self Collection"
                                        }
                                    </td>
                                    <td>
                                        {
                                            howInSg == undefined ?
                                                howInYgn == "1" ? "3.50" :
                                                    howInYgn == "2" ? "5.00" :
                                                        howInYgn == "3" ? "3.50" : "-"
                                                :
                                                (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                                                    ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                                                    ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                                                    ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                                                    ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                                                    ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                                                    ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) > 20 ? "10.00" :
                                                    (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                                                        ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                                                        ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                                                        ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                                                        ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                                                        ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                                                        ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) > 15 ? "10.00" : "5.90"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}></td>
                                    <td className='text-start'>{paymentType == "1" ? "SG PAY" : "MM PAY"}</td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan={2} className='font-bold'>PayNow to mobile 93250329 or UEN number 53413642K </td>
                                    <td>TOTAL</td>
                                    <td>{
                                        (parseFloat((totalFood == "-" ? 0 : totalFood)) +
                                            parseFloat((totalCloth == "-" ? 0 : totalCloth)) +
                                            parseFloat((totalFrozen == "-" ? 0 : totalFrozen)) +
                                            parseFloat((totalShoe == "-" ? 0 : totalShoe)) +
                                            parseFloat((totalCosmetic == "-" ? 0 : totalCosmetic)) +
                                            parseFloat((totalElectronic == "-" ? 0 : totalElectronic)) +
                                            parseFloat((totalOther == "-" ? 0 : totalOther)) +
                                            (handlingFee ? 0.90 : 0) +
                                            (howInSg == undefined ?
                                                ((
                                                    sgPickup == "1" &&
                                                    (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                                                        ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                                                        ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                                                        ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                                                        ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                                                        ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                                                        ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) >= 7
                                                ) ? 4.90 : 7.00) :
                                                0.00
                                            )
                                            +
                                            (ygnPickup == "1" ? 3.50 : 0.00) +
                                            (howInSg == undefined ?
                                                howInYgn == "1" ? 3.50 :
                                                    howInYgn == "2" ? 5.00 :
                                                        howInYgn == "3" ? 3.50 : 0 :
                                                (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                                                    ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                                                    ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                                                    ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                                                    ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                                                    ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                                                    ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) > 20 ? 10.00 :
                                                    (((foodWeight == "") ? 0.0 : parseFloat(foodWeight)) +
                                                        ((clothWeight == "") ? 0.0 : parseFloat(clothWeight)) +
                                                        ((frozenWeight == "") ? 0.0 : parseFloat(frozenWeight)) +
                                                        ((shoeWeight == "") ? 0.0 : parseFloat(shoeWeight)) +
                                                        ((cosmeticWeight == "") ? 0.0 : parseFloat(cosmeticWeight)) +
                                                        ((electronicWeight == "") ? 0.0 : parseFloat(electronicWeight)) +
                                                        ((othersWeight == "") ? 0.0 : parseFloat(othersWeight))) > 15 ? 10.00 : 5.90
                                            )
                                        ).toFixed(2)
                                    }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="ml-3 mr-3 md:mr-0 md:ml-0 font-bold text-red-600 mt-1">*Any Loss or Damage, we will refund item price OR refund 3 times of shipping fee (item 1 to 5 only), whichever is lower.</h3>
                    <h3 className="ml-3 mr-3 md:mr-0 md:ml-0 font-bold text-red-600">*if require full refund, additional 5% of item value have to pay upfront</h3>
                    <div className="ml-5 mr-5 md:mr-0 md:ml-0 flex md:flex-row flex-col md:justify-between mb-5 items-center">
                        <div className='dark:text-gray-400'>
                            <h4 className="font-bold">Terms & Conditions:</h4>
                            {props.data.form == "1" ?
                                <ol>
                                    <li>All prices stated here are in Singapore Dollars</li>
                                    <li>Any illegal items will not be accepted</li>
                                    <li> Arrival schedule might change due to unforeseen circumstances</li>
                                    <li>We are not responsible for damaged items that are not declared</li>
                                </ol> :
                                <ol>
                                    <li>All prices stated here are in Singapore Dollars</li>
                                    <li>Any illegal items will not be accepted</li>
                                    <li>Flight schedule might change due to unforeseen circumstances</li>
                                    <li>Due to tighter restriction, offload is expected to happen</li>
                                    <li>Please provide full address for SG Home Delivery</li>
                                    <li>ALL FROZEN FOOD to be packed and sealed properly</li>
                                    <li>Any Loss or Damage (except FROZEN FOOD) will be refunded 3 times of shipping fees </li>
                                </ol>
                            }
                            <span>Items Detail:</span>
                            <div>Filters</div>
                            <div>Special Instruction:</div>
                        </div>
                        <div className='md:mr-[80px] md:mt-0 mt-4'>
                            <div>
                                <button onClick={() => updateClick(true)} className='invoice-issue-button'>Send Email</button>
                            </div>
                            <div className='mt-3'>
                                <button onClick={() => updateClick(false)} className='invoice-issue-button'>Update</button>
                            </div>
                        </div>
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
    )
}

export default InvoiceIssueIndex
