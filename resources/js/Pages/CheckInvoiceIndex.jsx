import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import Loading from '@/Common/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckInvoiceIndex = () => {
    const [loading, setLoading] = useState(false);
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceSts, setInvoiceSts] = useState('');
    const [invoiceList, setInvoiceList] = useState([]);

    const invoiceNoChange = (e) => {
        setInvoiceNo(e.target.value);
    }

    const invoiceStsChange = (e) => {
        setInvoiceSts(e.target.value);
    }
    useEffect(() => {
        setLoading(true);
        axios.post('/logistic/search')
            .then(res => {
                setLoading(false);
                setInvoiceList(res.data.data)
            })
            .catch(e => {
                setLoading(false);
                toast.error('Fail To Load Invoice Data!', {
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
    }, [])

    const searchClick = () => {
        setLoading(true);
        let params = {
            invoice_no: invoiceNo,
            status: invoiceSts
        }
        axios.post('/logistic/search', params)
            .then(res => {
                setLoading(false);
                setInvoiceList(res.data.data)
                if (res.data.data.length == 0) {
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
                }
            })
            .catch(e => {
                setLoading(false);
                toast.error('Fail To Load Invoice Data!', {
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
                <main className='md:w-5/6 w-full mt-[-70px]'>
                    <h2 className="ont-extrabold text-transparent bg-clip-text bg-gradient-to-r text-blue-700 text-center text-2xl from-purple-700 mb-3 mt-4 to-pink-600 ">Check Invoices</h2>
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
                                {/* <input className='dark:bg-gray-400 mb-2 w-full' type="text" name="" id="" value={invoiceSts} onChange={invoiceStsChange} /> */}
                                <select className='dark:bg-gray-400 mb-2 w-full cursor-pointer' onChange={invoiceStsChange} value={invoiceSts}>
                                    <option value="">Select Invoice Status</option>
                                    <option value="1">Register</option>
                                    <option value="2">Collected</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-3 mb-3'>
                        <button onClick={searchClick} type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 font-sans">
                            Search
                        </button>
                    </div>
                    {invoiceList.length > 0 &&
                        <>
                            <h3 className="ml-3 mr-3 md:ml-0 md:mr-0 font-bold text-xl mb-3 dark:text-gray-400">Check Invoice List</h3>
                            <div className='md:ml-0 md:mr-0 ml-3 mr-3 invoice-list-container mb-5'>
                                <table className='invoice-list-table text-center break-all'>
                                    <thead className='text-white'>
                                        <tr>
                                            <th width={50}>No</th>
                                            <th width={120}>Invoice ID</th>
                                            <th width={160}>Sender Name</th>
                                            <th width={160}>Recipient Name</th>
                                            <th width={100}>Payment</th>
                                            <th width={150}>Invoice Status</th>
                                            <th colSpan={2} width={210}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='dark:text-gray-400'>
                                        {invoiceList.length > 0 &&
                                            invoiceList.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td width={50}>{index + 1}</td>
                                                        <td width={120}>{data.invoice_no}</td>
                                                        <td width={160}>{data.sender_name}</td>
                                                        <td width={160}>{data.receiver_name}</td>
                                                        <td width={100}>{data.payment_type == "1" ? "SG" : "MM"}</td>
                                                        <td width={150}>register</td>
                                                        <td width={120}>
                                                            <Link href={route('invoice-issue')} method='get' data={{ invoice_no: data.invoice_no }}
                                                                preserveState={true}>
                                                                <button className='bg-gradient-to-r from-green-400 to-green-500 text-white p-2 rounded hover:from-green-500 hover:to-green-600'>Invoice issue</button>
                                                            </Link>
                                                        </td>
                                                        <td width={90}>
                                                            <button className='bg-gradient-to-r from-red-400 to-red-500 text-white p-2 rounded hover:from-red-500 hover:to-red-600'>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
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

export default CheckInvoiceIndex
