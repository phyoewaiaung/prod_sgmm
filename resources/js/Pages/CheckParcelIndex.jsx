import React, { useEffect, useState } from 'react'
import { Link } from '@inertiajs/react'
import QrScanner from './QrScanner';
import Loading from '@/Common/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { checkNullOrBlank } from '@/Common/CommonValidation';
import EventEmitter from '@/utils/EventEmitter';

const CheckParcelIndex = (props) => {
    useEffect(()=> {
        EventEmitter.emit("auth",{
            auth:props.auth.user?true:false
        })
    },[props])
    const [loading, setLoading] = useState(false);
    const [receiptNo, setReceiptNo] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [estimatedArr, setEstimatedArr] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [collectionType, setCollectionType] = useState('');
    const [shelfNo, setShelfNo] = useState('');
    const [key, setKey] = useState('');
    const [collectId, setCollectId] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [qrId, setQrId] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {

        if (qrId != "") {
            search();
        }
    }, [qrId]);

    const search = () => {
        setLoading(true);
        axios.post('track-parcel', { invoice_no: receiptNo })
            .then(res => {
                setLoading(false);
                if (res.data.data.estimated_arrival == null && res.data.data.shelf_no == null && res.data.data.total_price == null && res.data.data.collection_type == null) {
                    setReceiptNumber("");
                    setEstimatedArr("");
                    setShelfNo("");
                    setTotalCost("");
                    setQrId("");
                    toast.error('Data is not found!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.success('Data is found! Please Check!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                    setReceiptNumber(receiptNo);
                    setEstimatedArr(res.data.data.estimated_arrival);
                    setShelfNo(res.data.data.shelf_no);
                    setTotalCost(res.data.data.total_price);
                    setCollectionType(res.data.data.collection_type);
                    setCollectId(res.data.data.collection_status);
                    if (res.data.data.updated_at) {
                        setIssueDate(res.data.data.updated_at.slice(0, 10))
                    }
                    setPaymentId(res.data.data.pay_with &&
                        res.data.data.pay_with == "Paynow SGMM" ? "3" :
                        res.data.data.pay_with == "Paynow TZ" ? "2" :
                            res.data.data.pay_with == "Paid" ? "4" : "1"
                    )
                    setStatus(res.data.data.pay_with ? true : false)
                }
            })
            .catch(e => {
                setLoading(false);
                setQrId("");
                toast.error('Something Was Wrong!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }
            )
    }

    const receiptNoChange = (e) => {
        setReceiptNo(e.target.value);
    }

    const keyChange = (e) => {
        setKey(e.target.value);
        if (!checkNullOrBlank(e.target.value)) {
            document.getElementById('key-error').textContent = "";
            document.getElementById('key').style.border = '1px solid #BFDBFE';
        }
    }

    const handelCallBack = (qrResult) => {
        setReceiptNo(qrResult);
        setReceiptNumber(qrResult);
        setQrId(qrResult);
    }

    const collectChange = (e) => {
        setCollectId(e.target.value);
    }

    const paymentChange = (e) => {
        setPaymentId(e.target.value);
    }

    const updateClick = () => {
        if (checkNullOrBlank(key)) {
            document.getElementById('key').style.border = '1px solid red';
            let error = document.getElementById('key-error');
            error.textContent = 'Please Enter Your Key!';
            error.style.color = 'red';
            error.style.marginTop = '10px';
        } else {
            let params = {
                invoice_no: receiptNo,
                collection_status: collectId,
                pay_with: paymentId == "1" ? "Cash" :
                    paymentId == "2" ? "Paynow TZ" :
                        paymentId == "3" ? "Paynow SGMM" :
                            "Paid"
            }
            setLoading(true);
            axios.post('payment', params)
                .then(data => {
                    setLoading(false);
                    toast.success('Successfully Update!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setStatus(true);
                    setKey('');
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
    }

    return (
        <>
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
            <Loading start={loading} />
            <div className="relative pt-6 pb-6 sm:flex sm:justify-center flex-col sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <Link href='/'>
                    <header className="flex justify-center mt-10">
                        <img className="mt-[-70px]" src='images/SGMYANMAR.png' width="250" height="100" alt="sgmyanmar logo" />
                    </header>
                </Link>
                <main className='md:w-5/6 ms-3 me-3 mt-[-35px]'>
                    <div className="flex flex-col justify-center align-middle">
                        <h2 className="ont-extrabold text-transparent bg-clip-text bg-gradient-to-r text-blue-700 text-center text-2xl from-purple-700 to-pink-600 ">TRACK THE PARCEL ( ပစ္စည်းရောက်ရှိမှု စုံစမ်းရန် )</h2>
                    </div>
                    <div className='flex flex-col items-start md:items-center mt-4'>
                        <label htmlFor="" className='font-bold dark:text-gray-400'>ဘောင်ချာနံပါတ် ထည့်၍(Track)ကိုနိုပ်ပါ</label>
                        <h4 className='flex italic dark:text-gray-400 mb-2 items-center mt-3 text-[14px]'>
                            <img className='me-2' src="images/information.png" width={25} height={25} alt="" />
                            <div>
                                Sample: 'AS22-04W2W539' 'MS22-04W2W039' 'ASG-00300'
                            </div>
                        </h4>
                        <QrScanner qrParentCallBack={handelCallBack} />
                        <div className='lg:w-[40%] md:w-[50%] w-[60%] mt-3 relative'>
                            <button onClick={search} className='absolute bg-gray-300 hover:bg-gray-400 p-2 font-bold rounded w-[100px] right-[-113px] top-[23px]'>Track</button>
                            <div className=' dark:text-gray-400'>
                                <label htmlFor="">Enter Receipt No:</label>
                            </div>
                            <input className='mb-2 w-full' type="text" name="" id="" value={receiptNo} onChange={receiptNoChange} />
                            <div className=' dark:text-gray-400'>
                                <label htmlFor="">Receipt Number:</label>
                            </div>
                            <input className='bg-gray-300 mb-2 w-full' type="text" name="" id="" value={receiptNumber} readOnly />
                            <div className=' dark:text-gray-400'>
                                <label htmlFor="">Estimated Arrival:</label>
                            </div>
                            <input className='bg-gray-300 mb-2 w-full' type="text" name="" id="" value={estimatedArr} readOnly />
                            <div className=' dark:text-gray-400'>
                                <label htmlFor="">Total Cost:</label>
                            </div>
                            <input className='bg-gray-300 mb-2 w-full' type="text" name="" id="" value={totalCost} readOnly />
                            <div className=' dark:text-gray-400'>
                                <label htmlFor="">Collection Type:</label>
                            </div>
                            <input className='bg-gray-300 mb-2 w-full' type="text" name="" id="" value={collectionType} readOnly />
                            <div className=' dark:text-gray-400'>
                                <label htmlFor="">Shelf No:</label>
                            </div>
                            <input className='bg-gray-300 mb-2 w-full' type="text" name="" id="" value={shelfNo} readOnly />
                            <h4 className='w-full font-bold text-red-700'>Invoice issued date: <span className='text-indigo-900'>{issueDate}</span></h4>
                        </div>
                        {props.auth.user?.role == "1" ?
                            <div className='mt-3 dark:bg-gray-400 bg-blue-200 p-5 font-serif lg:w-[40%] md:w-[50%] w-[100%] overflow-auto'>
                                <h3 className="font-bold text-xl text-center mb-2">Office Use</h3>
                                <hr className='mt-3 border mb-3 border-gray-400' />
                                <div className='grid grid-cols-2 gap-1'>
                                    <div>
                                        <label htmlFor="">Collection Status:</label>
                                    </div>
                                    <div>
                                        <select disabled={status} value={collectId} onChange={collectChange}>
                                            <option value="1">Not Collected</option>
                                            <option value="2">Collected</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-1 mt-3'>
                                    <div>
                                        <label htmlFor="">Payment Type:</label>
                                    </div>
                                    <div>
                                        <select disabled={status} value={paymentId} onChange={paymentChange}>
                                            <option value="1">Cash</option>
                                            <option value="2">Paynow TZ</option>
                                            <option value="3">Paynow SGMM</option>
                                            <option value="4">Paid</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">Enter Key:</label>
                                </div>
                                <div className="flex md:flex-row flex-col md:items-center md:gap-8">
                                    <div>
                                        {status ?
                                            <input type="text" name="" id="key" disabled /> :
                                            <input type="text" name="" id="key" value={key} onChange={keyChange} />
                                        }
                                        <p id='key-error'></p>
                                    </div>
                                    <div className='md:mt-0 mt-3'>
                                        {status ?
                                            <button disabled type="submit" className="bg-blue-500 cursor-not-allowed text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 font-sans">
                                                Update
                                            </button> :
                                            <button onClick={updateClick} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 font-sans">
                                                Update
                                            </button>
                                        }
                                    </div>
                                </div>
                                <h5 className='mt-4 font-sm'>Address : 111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</h5>
                            </div>
                            : null
                        }
                    </div>
                </main>
                <footer className="text-center mt-4 font-medium ms-8 me-8 dark:text-gray-400">
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

export default CheckParcelIndex
