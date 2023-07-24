import React, { useState } from 'react'
import { Link } from '@inertiajs/react'

const CheckParcelIndex = () => {

    const [receiptNo, setReceiptNo] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [estimatedArr, setEstimatedArr] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [collectionType, setCollectionType] = useState('');
    const [shelfNo, setShelfNo] = useState('');
    const [key, setKey] = useState('');

    const receiptNoChange = (e) => {
        setReceiptNo(e.target.value);
    }

    const keyChange = (e) => {
        setKey(e.target.value);
    }

    return (
        <>
            <div className="relative pt-6 pb-6 sm:flex sm:justify-center flex-col sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <Link href='/'>
                    <header>
                        <div className="flex justify-center">
                            <img src='images/logo.png' width="100" height="70" alt="sgmyanmar logo" />
                        </div>
                        <h1 className="text-4xl font-bold text-center text-blue-700 py-4">SGMYANMAR</h1>
                    </header></Link>
                <main className='md:w-5/6 ms-3 me-3'>
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
                        <div className='lg:w-[40%] md:w-[50%] w-[60%] mt-3 relative'>
                            <button className='absolute bg-gray-300 hover:bg-gray-400 p-2 font-bold rounded w-[100px] right-[-113px] top-[23px]'>Track</button>
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
                            <h4 className='w-full font-bold text-red-700'>Invoice issued data:</h4>
                        </div>
                        <div className='mt-3 dark:bg-gray-400 bg-blue-200 p-5 mb-4 font-serif lg:w-[40%] md:w-[50%] w-[100%] overflow-auto'>
                            <h3 className="font-bold text-xl text-center mb-2">Office Use</h3>
                            <hr className='mt-3 border mb-3 border-gray-400' />
                            <div className='grid grid-cols-2 gap-1'>
                                <div>
                                    <label htmlFor="">Collection Status:</label>
                                </div>
                                <div>
                                    <select name="" id="">
                                        <option value="1">Collected</option>
                                        <option value="2">Not Collected</option>
                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-1 mt-3'>
                                <div>
                                    <label htmlFor="">Payment Type:</label>
                                </div>
                                <div>
                                    <select name="" id="">
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
                                    <input type="text" name="" id="" value={key} onChange={keyChange} />
                                </div>
                                <div className='md:mt-0 mt-3'>
                                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 font-sans">
                                        Update
                                    </button>
                                </div>
                            </div>
                            <h5 className='mt-4 font-sm'>Address : 111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</h5>
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

export default CheckParcelIndex
