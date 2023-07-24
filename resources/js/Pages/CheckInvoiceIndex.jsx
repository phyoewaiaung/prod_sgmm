import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const CheckInvoiceIndex = () => {
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceSts, setInvoiceSts] = useState('');

    const invoiceNoChange = (e) => {
        setInvoiceNo(e.target.value);
    }

    const invoiceStsChange = (e) => {
        setInvoiceSts(e.target.value);
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
                <main className='md:w-5/6 w-full'>
                    <h2 className="ont-extrabold text-transparent bg-clip-text bg-gradient-to-r text-blue-700 text-center text-2xl from-purple-700 mb-3 to-pink-600 ">Check Invoices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ml-[100px] mr-[100px]">
                        <div>
                            <div className='mb-3 dark:text-gray-400'>
                                <label htmlFor="">Invoice No:</label>
                            </div>
                            <div>
                                <input className='dark:bg-gray-400 mb-2 w-full' type="text" name="" id="" value={invoiceNo} onChange={invoiceNoChange} />
                            </div>
                        </div>
                        <div>
                            <div className='mb-3 dark:text-gray-400'>
                                <label htmlFor="">Invoice Status:</label>
                            </div>
                            <div>
                                <input className='dark:bg-gray-400 mb-2 w-full' type="text" name="" id="" value={invoiceSts} onChange={invoiceStsChange} />
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-3 mb-3'>
                        <button type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 font-sans">
                            Search
                        </button>
                    </div>
                    <h3 className="font-bold text-xl mb-3 dark:text-gray-400">Check Invoice List</h3>
                    <div className='invoice-list-container mb-5'>
                        <table className='invoice-list-table text-center'>
                            <thead className='text-white'>
                                <th width={50}>No</th>
                                <th width={150}>Invoice ID</th>
                                <th width={150}>Sender Name</th>
                                <th width={150}>Recipient Name</th>
                                <th width={100}>Payment</th>
                                <th width={150}>Invoice Status</th>
                                <th colSpan={4} width={500}>Action</th>
                            </thead>
                            <tbody className='dark:text-gray-400'>
                                <tr>
                                    <td width={50}>1</td>
                                    <td width={200}>AS22-04W2W539</td>
                                    <td width={150}>phyoe wai aung</td>
                                    <td width={150}>mr wyk</td>
                                    <td width={100}>MM</td>
                                    <td width={150}>register</td>
                                    <td width={100}>
                                        <Link href={route('invoice-issue')}>
                                            <button className='bg-gradient-to-r from-green-400 to-green-500 text-white p-2 rounded hover:from-green-500 hover:to-green-600'>Invoice issue</button>
                                        </Link>
                                    </td>
                                    <td width={100}>
                                        <button className='bg-gradient-to-r from-blue-400 to-blue-500 text-white p-2 rounded hover:from-blue-500 hover:to-blue-600'>Received</button>
                                    </td>
                                    <td width={100}>
                                        <button className='bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-2 rounded hover:from-yellow-500 hover:to-yellow-600'>Collected</button>
                                    </td>
                                    <td width={100}>
                                        <button className='bg-gradient-to-r from-red-400 to-red-500 text-white p-2 rounded hover:from-red-500 hover:to-red-600'>Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td width={50}>1</td>
                                    <td width={200}>AS22-04W2W539</td>
                                    <td width={150}>phyoe wai aung</td>
                                    <td width={150}>mr wyk</td>
                                    <td width={100}>MM</td>
                                    <td width={150}>register</td>
                                    <td width={100}>
                                        <button className='bg-gradient-to-r from-green-400 to-green-500 text-white p-2 rounded hover:from-green-500 hover:to-green-600'>Invoice issue</button>
                                    </td>
                                    <td width={100}>
                                        <button className='bg-gradient-to-r from-blue-400 to-blue-500 text-white p-2 rounded hover:from-blue-500 hover:to-blue-600'>Received</button>
                                    </td>
                                    <td width={100}>
                                        <button className='bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-2 rounded hover:from-yellow-500 hover:to-yellow-600'>Collected</button>
                                    </td>
                                    <td width={100}>
                                        <button className='bg-gradient-to-r from-red-400 to-red-500 text-white p-2 rounded hover:from-red-500 hover:to-red-600'>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

export default CheckInvoiceIndex
