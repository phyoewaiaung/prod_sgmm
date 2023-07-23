import React from 'react'
import { Link } from '@inertiajs/react'

const InvoiceIssueIndex = () => {
    return (
        <>
            <div className="relative pt-6 pb-6 sm:flex sm:justify-center flex-col sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <header className='flex justify-around items-center gap-10'>
                    <div className='md:pl-[100px] md:pr-[100px]'>
                        <Link href='/'>
                            <div className="flex justify-center items-center">
                                <img src='images/logo.png' width="100" height="70" alt="sgmyanmar logo" />
                            </div>
                            <h1 className="text-4xl font-bold text-center text-blue-700 py-4">SGMYANMAR</h1>
                        </Link>
                    </div>
                    <div>
                        <h3>Singapore Branch</h3>
                        <h4>111 North Bridge Road, #02-02A, Peninsula Plaza, Singapore 179098</h4>
                        <h4>Contact: +65 9325 0329</h4>
                        <div className="flex justify-center items-start gap-3 mt-3">
                            <div>
                                <h3>Myanmar Branch(South Okkalapa)</h3>
                                <h4>No. 642, Thanthumar Street, 10 </h4>
                                Ward, South Okkalapa, Yangon
                                <h4>Contact: +959 962 507 694</h4>
                            </div>
                            <div>
                                <h3>Myanmar Branch(Alone)</h3>
                                <h4>အမှတ် ၂၂ / သိပ္ပံလမ်း / အလုံမြို့နယ်</h4>
                                <h4>Contact: 09958450219</h4>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <h2 className='font-bold text-xl mt-3'>Invoice</h2>
                            </div>
                            <div>
                                <h2 className='font-bold text-xl mt-3'>VR- SM23-07W3006</h2>
                            </div>
                        </div>
                    </div>
                </header>
                <main className='md:w-5/6'>
                    <hr className='border h-[20px] bg-gray-400 border-gray-400' />
                    <div className="flex justify-evenly mt-3">
                        <div>
                            <h3 className="font-bold">Date & Time :<span className='text-red-600 font-normal'>17/07/2023 17:35:30 </span></h3>
                            <h3 className='font-bold'>Name :<span className='font-normal'>PHYOE WAI AUNG</span></h3>
                        </div>
                        <div>
                            <h3 className='font-bold'>Delievery Mode : <span className='font-normal'>Sea Cargo (3-4 weeks from shipment)</span></h3>
                        </div>
                    </div>
                    <div className="flex justify-evenly mt-3">
                        <div className='w-1/2 text-center'>
                            <h3 className="font-bold text-start ml-11">Shipping Information</h3>
                            <textarea className='invoice-color-textarea w-5/6'>No. 21,Block C,Thiri Yadanar Retail and Wholesale
                                Market, Thudhamma Road, North Okkalapa Tsp.
                                Yangon
                            </textarea>
                            <h3 className="font-bold">Recipient Name : <span className="font-normal">phyoe wai aung</span></h3>
                            <h3 className="font-bold">Recipient Contact Number : <span className='font-normal'>092345673</span></h3>
                        </div>
                        <div className='w-1/2 text-center'>
                            <h3 className="font-bold text-start ml-11">Billing Information</h3>
                            <textarea className='invoice-color-textarea w-5/6'>No. 21,Block C,Thiri Yadanar Retail and Wholesale
                                Market, Thudhamma Road, North Okkalapa Tsp.
                                Yangon
                            </textarea>
                            <h3 className="font-bold">Sender Name : <span className="font-normal">phyoe wai aung</span></h3>
                            <h3 className="font-bold">Sender Contact Number : <span className='font-normal'>092345673</span></h3>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h3>phyoewaiaung082@gmail.com</h3>
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