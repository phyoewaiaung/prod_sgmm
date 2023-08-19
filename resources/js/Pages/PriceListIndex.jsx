import React, { useEffect } from 'react'
import { Link } from '@inertiajs/react'
import EventEmitter from '@/utils/EventEmitter'
const PriceListIndex = (props) => {
    useEffect(()=> {
        EventEmitter.emit("auth",{
            auth:props.auth.user?true:false
        })
    },[props])
    return (
        <>
            <div className="relative pt-6 pb-6 sm:flex sm:justify-center flex-col sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <Link href='/'>
                    <header className="flex justify-center mt-10">
                        <img className="mt-[-70px]" src='images/SGMYANMAR.png' width="250" height="100" alt="sgmyanmar logo" />
                    </header>
                </Link>
                <main className='md:w-5/6 mt-[-35px]'>
                    <div className="flex flex-col justify-center align-middle">
                        <h2 className="ont-extrabold text-transparent bg-clip-text bg-gradient-to-r text-blue-700 text-center text-2xl from-purple-700 to-pink-600 ">LOGISTIC PRICE LIST</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 mt-4 divide-x-2 mb-5'>
                        <div className="left-col pr-4">
                            <h2 className="text-blue-700 text-center text-2xl"><span className="text-purple-700 font-bold">MYANMAR</span> TO <span className="text-pink-700 font-bold">SINGAPORE</span></h2>
                            <div className='mt-3'>
                                <h3 className="font-bold text-lg dark:text-gray-400">Air Cargo</h3>
                                <label htmlFor="" className='text-red-700 font-bold font-serif'> Tuesday | Wednesday | Thursday |   Friday   |   Saturday</label>
                            </div>
                            <h4 className='flex italic dark:text-gray-400 mb-2 items-center mt-3 text-[14px]'>
                                <img className='me-2' src="images/information.png" width={25} height={25} alt="" />
                                <div>
                                    Flight schedule subject to change due to airport schedule or unforeseen circumstances. Parcels should be given at least one day in advance before flight day
                                </div>
                            </h4>
                            <div className="mt-4 dark:text-gray-400">
                                <h3 className="font-bold mb-2">Charges</h3>
                                <ul className='ml-6'>
                                    <li>Food / Clothes / Cosmetics : S$8.00 /kg</li>
                                    <li>Frozen food : S$ 8.50/kg</li>
                                    <li>Medicine : based on cards or boxes (please enquire)</li>
                                    <li>Valuable items : please enquire</li>
                                </ul>
                            </div>
                            <hr className='mt-3 border border-gray-400' />
                            <div className='font-bold mt-4 text-lg dark:text-gray-400'>
                                SEA CARGO
                            </div>
                            <h3 className='text-red-700 font-bold font-serif'>please check with Yangon Office for schedule</h3>
                            <div className="mt-4 dark:text-gray-400">
                                <h3 className="font-bold mb-2">Charges</h3>
                                <ul className='ml-6'>
                                    <li>Food/Clothes : S$4.50 /kg   (less than 20 kg)</li>
                                    <li>Food/Clothes : S$4.00 /kg   (more than 20 kg)</li>
                                    <li>Valuable items : please enquire (for more than 20 kg)</li>
                                </ul>
                                <div className='bg-gray-200 dark:bg-gray-400 p-6 mt-2 rounded dark:text-black'>
                                    <ul>
                                        <li>Handling fee -  S$ 0.90 for parcel less than 3 kg of weight</li>
                                        <li>Yangon Home Pickup : S$3.50 per trip (within Yangon)</li>
                                    </ul>
                                </div>
                            </div>
                            <hr className='mt-3 border border-gray-400' />
                            <div className="mt-4 dark:text-gray-400">
                                <h3 className="font-bold mb-2">SG Home Delievery</h3>
                                <ul className='ml-6'>
                                    <li>Less than 15 kg, delivery fee : S$ 5.90</li>
                                    <li>More than 15 kg, delivery fee : S$ 10.00</li>
                                    <li>More than 20 kg, delivery fee : S$ 16.00</li>
                                </ul>
                            </div>
                            <div className="mt-4 bg-gradient-to-r from-gray-200 to-blue-200 rounded hover:bg-graient-to-l dark:bg-gradient-to-r dark:from-blue-300 dark:to-black hover:from-blue-200 hove:to-gray-200 p-4">
                                <h3 className="font-bold mb-2">Address: Yangon Office</h3>
                                <h4>No. 642, Thanthumar Street, Ward 10, South Okkalapa</h4>
                                <h4>Contact number: <span className="text-red-700 dark:text-red dark:bg-gray-100 font-bold">+959 962 507 694</span> </h4>
                                <hr className='mt-3 border border-gray-400' />
                                <div className='mt-4'>
                                    <h3 className="font-bold mb-2">Address: Ahlone Yangon Office </h3>
                                    <h4>အမှတ် ၂၂ / သိပ္ပံလမ်း / အလုံမြို့နယ်</h4>
                                    <h4>contact number: <span className="text-red-700  dark:text-red dark:bg-gray-100 font-bold">09958450219</span></h4>
                                </div>
                            </div>
                        </div>
                        <div className="right-col pl-4">
                            <h2 className="text-blue-700 text-center text-2xl"><span className="text-pink-700 font-bold">SINGAPORE</span> TO <span className="text-purple-700 font-bold">MYANMAR</span></h2>
                            <div className='mt-3 dark:text-gray-400'>
                                <h3 className="font-bold text-lg">Air Cargo <span className="text-[15px]">(3-5 days from shipment)</span></h3>
                                <ul className='ml-6'>
                                    <li>Food / Clothes / Cosmetics : S$8.00 /kg</li>
                                    <li>Frozen food : S$ 8.50/kg</li>
                                    <li>Medicine : based on cards or boxes (please enquire)</li>
                                    <li>Valuable items : please enquire</li>
                                </ul>
                            </div>
                            <hr className='mt-3 border border-gray-400' />
                            <div className='mt-3'>
                                <h3 className="font-bold text-lg dark:text-gray-400">LAND EXPRESS <span className="text-[15px]">(7 to 10 Days from Wednesdays)</span></h3>
                                <label htmlFor="" className='text-red-700 font-bold font-serif'>
                                    NO PERFUMES ALLOWED FOR LAND EXPRESS
                                </label>
                                <ul className='ml-6 dark:text-gray-400'>
                                    <li>Food/Clothes  : S$8.00 /kg</li>
                                    <li>Shoes & Bags : S$10.00 /kg</li>
                                    <li>Cosmetic / Medicine / Supplements : S$12.00 /kg</li>
                                    <li>Electronic / Valuable items: S$12.00 /kg OR 10% of value whichever is higher</li>
                                </ul>
                                <h4 className='flex italic ml-2 dark:text-gray-400 mb-2 items-center mt-2 text-[14px]'>
                                    <img className='me-2' src="images/information.png" width={25} height={25} alt="" />
                                    <div>
                                        (Last day to submit by Sunday)
                                    </div>
                                </h4>
                            </div>
                            <hr className='mt-3 border border-gray-400' />
                            <div className='mt-3 dark:text-gray-400'>
                                <h3 className="font-bold text-lg">LAND CARGO <span className="text-[15px]">(2 weeks from Saturdays)</span></h3>
                                <ul className='ml-6'>
                                    <li>Food/Clothes  : S$6.00 /kg </li>
                                    <li>Shoes & Bags : S$8.00 /kg</li>
                                    <li>Cosmetic / Medicine / Supplements : S$9.00 /kg</li>
                                    <li>Electronic / Valuable items: S$10.00 /kg OR  8% of item whichever is higher</li>
                                </ul>
                                <h4 className='flex italic ml-2 dark:text-gray-400 mb-2 items-center mt-2 text-[14px]'>
                                    <img className='me-2' src="images/information.png" width={25} height={25} alt="" />
                                    <div>
                                        (Last day to submit by Thursday)
                                    </div>
                                </h4>
                            </div>
                            <hr className='mt-3 border border-gray-400' />
                            <div className='mt-3 dark:text-gray-400'>
                                <h3 className="font-bold text-lg">SEA CARGO <span className="text-[15px]">(3 to 4  weeks from Wednesdays)</span></h3>
                                <ul className='ml-6'>
                                    <li>Food/Clothes  : S$3.00 /kg</li>
                                    <li>Shoes & Bags : S$4.00 /kg</li>
                                    <li>Cosmetic / Medicine / Supplements : S$5.00 /kg</li>
                                    <li>Electronic : S$5.00/kg</li>
                                </ul>
                                <h4 className='flex italic ml-2 dark:text-gray-400 mb-2 items-center mt-2 text-[14px]'>
                                    <img className='me-2' src="images/information.png" width={25} height={25} alt="" />
                                    <div>
                                        <label htmlFor="">Valuable items: Not Available</label>
                                        (Last day to submit by <span className='text-red-700'>Sunday</span>)
                                    </div>
                                </h4>
                            </div>
                            <hr className='mt-3 border border-gray-400' />
                            <div className='bg-gray-200 dark:bg-gray-400 p-6 mt-2 rounded'>
                                <h4 className='font-bold mb-2'>For light and Bulky item</h4>
                                <ul>
                                    <li>Handling fee -  S$ 0.90 for parcel less than 3 kg of weight</li>
                                    <li>Yangon Home Pickup : S$3.50 per trip (within Yangon)</li>
                                </ul>
                                <label htmlFor="" className='text-red-700 font-bold'>Shipping fee for TV = minimum $120
                                </label>
                            </div>
                            <div className='mt-3 dark:text-gray-400'>
                                <h3 className="font-bold text-lg">SG Home Pick up</h3>
                                <ul className='ml-6'>
                                    <li>Less than 5 kg : S$7.00</li>
                                    <li>More than 7 kg : S$ 4.90</li>
                                </ul>
                                <h3 className="font-bold mt-3 text-lg">Within Yangon Delivery</h3>
                                <ul className='ml-6'>
                                    <li>Yangon Home Delivery: S$5.00</li>
                                    <li>Yangon Downtown Delivery : S$3.50</li>
                                    <li>Bus Gate: S$3.50</li>
                                </ul>
                            </div>
                            <div className="mt-4 bg-gradient-to-r dark:bg-gradient-to-r dark:from-blue-300 dark:to-black from-gray-200 to-blue-200 rounded hover:bg-graient-to-l hover:from-blue-200 hove:to-gray-200 p-4">
                                <h3 className="font-bold mb-2">Address: Singapore Office SGMyanmar</h3>
                                <h4>111 North Bridge Road, #02-02A</h4>
                                <h4>Singapore 179098</h4>
                                <h4>Contact number: <span className="text-red-700 dark:text-red-500 dark:bg-gray-100 font-bold">+65 9325 0329 / +65 8129 0955</span></h4>
                                <hr className='mt-3 border border-gray-400' />
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

export default PriceListIndex
