import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import Loading from '@/Common/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@/Common/Modal';
import Pagination from './Pagination';
import EventEmitter from '@/utils/EventEmitter';

const CheckInvoiceIndex = (props) => {

    useEffect(() => {
        EventEmitter.emit("auth", {
            auth: props.auth.user ? true : false
        })
    }, [props])

    const [loading, setLoading] = useState(false);
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceSts, setInvoiceSts] = useState('');
    const [invoiceList, setInvoiceList] = useState([]);
    const [show, setShow] = useState(false);
    const [modalInvoice, setModalInvoice] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [shelfNo, setShelfNo] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRow, setTotalRow] = useState('');
    const [deleteStatus, setDeleteStatus] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [indexNumber, setIndexNumber] = useState('0');

    const invoiceNoChange = (e) => {
        setInvoiceNo(e.target.value);
    }

    const invoiceStsChange = (e) => {
        setInvoiceSts(e.target.value);
    }
    useEffect(() => {
        setLoading(true);

        formload();
    }, [])

    const formload = () => {
        axios.post('/logistic/search?page=1')
            .then(res => {
                setLoading(false);
                setInvoiceList(res.data.data.data);
                setTotalPages(res.data.data.last_page);
                setCurrentPage(res.data.data.current_page);
                setTotalRow(res.data.data.total);
                setIndexNumber((res.data.data.current_page - 1) * 5);
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

    const searchClick = (page = 1) => {
        setLoading(true);
        let params = {
            invoice_no: invoiceNo,
            status: invoiceSts
        }
        axios.post('/logistic/search?page=' + page, params)
            .then(res => {
                setLoading(false);
                setInvoiceList(res.data.data.data);
                setTotalPages(res.data.data.last_page);
                setCurrentPage(res.data.data.current_page);
                setIndexNumber((res.data.data.current_page - 1) * 5)
                setTotalRow(res.data.data.total);
                if (res.data.data.data.length == 0) {
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

    const setClick = (type, data) => {
        setDeleteStatus(false);
        setShow(true);
        setModalInvoice(data.invoice_no);
        setLocation(data.estimated_arrival);
        setShelfNo(data.shelf_no);
        setType(type);
    }

    const deleteClick = (id) => {
        setShow(true);
        setDeleteStatus(true);
        setDeleteId(id);
    }

    const locationChange = (e, id) => {
        setModalInvoice(id);
        let data = invoiceList.map(d => {
            if (d.invoice_no == id) {
                d.estimated_arrival = e.target.value;
                setLocation(e.target.value);
            }
            return d;
        })
        setInvoiceList(data);
    }
    const shelfNoChange = (e, id) => {
        setModalInvoice(id);
        let data = invoiceList.map(d => {
            if (d.invoice_no == id) {
                d.shelf_no = e.target.value;
            }
            return d;
        })
        setInvoiceList(data);
    }

    const saveOK = () => {
        setShow(false);
        setLoading(true);
        let url = type == "1" ? "/set-arrival" : "/update-shelf";
        let params = type == "1" ? { invoice_no: modalInvoice, arrival: location } : { invoice_no: modalInvoice, shelf_no: shelfNo }
        let text = type == "1" ? "LOCATION" : "SHELF NO";
        axios.post(url, params)
            .then(data => {
                setLoading(false);
                toast.success('Successfully Update ' + text + '!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                searchClick(currentPage);
            })
            .catch(e => {
                setLoading(false);
                toast.error('Fail To Update ' + text + '!', {
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

    const deleteOK = () => {
        setShow(false);
        setLoading(true);
        let text = type == "1" ? "LOCATION" : "SHELF NO";
        axios.post('delete', { invoice_no: deleteId })
            .then(data => {
                setLoading(false);
                toast.success('Successfully Deleted!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                searchClick(currentPage);
            })
            .catch(e => {
                setLoading(false);
                toast.error('Fail To Delete!', {
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        searchClick(pageNumber);
    };
    return (
        <>
            <Modal
                show={show}
                invoiceNo={modalInvoice}
                type={type}
                onClose={() => setShow(false)}
                saveOK={saveOK}
                deleteOK={deleteOK}
                deleteStatus={deleteStatus}
            />
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
                                    <option value="1">Not Collected</option>
                                    <option value="2">Collected</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-3 mb-3'>
                        <button onClick={() => searchClick()} type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 font-sans">
                            Search
                        </button>
                    </div>
                    {invoiceList.length > 0 &&
                        <>
                            <div className='flex flex-row justify-between'>
                                <h3 className="ml-3 mr-3 md:ml-0 md:mr-0 font-bold text-xl mb-3 dark:text-gray-400">Check Invoice List</h3>
                                <p>Total Row(s): {totalRow}</p>
                            </div>
                            <div className='md:ml-0 md:mr-0 ml-3 mr-3 invoice-list-container  bg-blue-100 rounded border border-gray-400 mb-5'>
                                <table className='invoice-list-table text-center break-all'>
                                    <thead className='text-white'>
                                        <tr>
                                            <th width={50}>No</th>
                                            <th width={120}>Invoice ID</th>
                                            <th width={160}>Sender Name</th>
                                            <th width={160}>Recipient Name</th>
                                            <th width={100}>Payment</th>
                                            <th width={150}>Invoice Status</th>
                                            <th width={200}>Location</th>
                                            <th width={200}>Shelf No</th>
                                            <th colSpan={2} width={210}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='dark:text-gray-400'>
                                        {invoiceList.length > 0 &&
                                            invoiceList.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='dark:text-black' width={50}>{parseInt(indexNumber) + index + 1}</td>
                                                        <td className='dark:text-black' width={120}>{data.invoice_no}</td>
                                                        <td className='dark:text-black' width={160}>{data.sender_name}</td>
                                                        <td className='dark:text-black' width={160}>{data.receiver_name}</td>
                                                        <td className='dark:text-black' width={100}>{data.payment_type == "1" ? "SG" : "MM"}</td>
                                                        <td className='dark:text-black' width={150}>{data.payment_status == "1" ? "Not Collected" : "Collected"}</td>
                                                        <td width={200}>
                                                            <div className='flex justify-center'>
                                                                <input className='dark:text-black w-[120px]' type="text" value={data.estimated_arrival == null ? "" : data.estimated_arrival} onChange={(e) => locationChange(e, data.invoice_no)} />
                                                                <button onClick={() => setClick(1, data)} className='set-btn'>Set</button>
                                                            </div>
                                                        </td>
                                                        <td width={200}>
                                                            <div className='flex justify-center'>
                                                                <input className='dark:text-black w-[120px]' type="text" value={data.shelf_no == null ? "" : data.shelf_no} onChange={(e) => shelfNoChange(e, data.invoice_no)} />
                                                                <button onClick={() => setClick(2, data)} className='set-btn'>Set</button>
                                                            </div>
                                                        </td>
                                                        <td width={120}>
                                                            <Link href={route('invoice-issue')} method='get' data={{ invoice_no: data.invoice_no }}
                                                                preserveState={true}>
                                                                <button className='bg-gradient-to-r from-green-400 to-green-500 text-white p-2 rounded hover:from-green-500 hover:to-green-600'>Invoice issue</button>
                                                            </Link>
                                                        </td>
                                                        <td width={90}>
                                                            <button onClick={() => deleteClick(data.invoice_no)} className='bg-gradient-to-r from-red-400 to-red-500 text-white p-2 rounded hover:from-red-500 hover:to-red-600'>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {totalRow > 5 &&
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            }
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
