import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { numberChk } from '@/Common/CommonValidation';

const InvoiceIssueIndex = () => {
    const [foodWeight, setFoodWeight] = useState(0);
    const [shoeWeight, setShoeWeight] = useState(0);
    const [cosmeticWeight, setCosmeticWeight] = useState(0);
    const [electronicWeight, setElectronicWeight] = useState(0);
    const [othersWeight, setOthersWeight] = useState(0);


    const foodWeightChange = (e) => {
        if (numberChk(e.target.value)) {
            setFoodWeight(e.target.value);
        } else {
            setFoodWeight('');
        }
    }
    const shoeWeightChange = (e) => {
        if (numberChk(e.target.value)) {
            setShoeWeight(e.target.value);
        } else {
            setShoeWeight('');
        }
    }
    const cosmeticWeightChange = (e) => {
        if (numberChk(e.target.value)) {
            setCosmeticWeight(e.target.value);
        } else {
            setCosmeticWeight('');
        }
    }
    const electronicWeightChange = (e) => {
        if (numberChk(e.target.value)) {
            setElectronicWeight(e.target.value);
        } else {
            setElectronicWeight('');
        }
    }
    const othersWeightChange = (e) => {
        if (numberChk(e.target.value)) {
            setOthersWeight(e.target.value);
        } else {
            setOthersWeight('');
        }
    }
    return (
        <>
            <div className="relative pt-6 pb-6 sm:flex sm:justify-center flex-col sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <header className='ml-3 mr-3 md:ml-0 md:mr-0 flex flex-col md:flex-row justify-around items-center gap-10'>
                    <div className='md:pl-[100px] md:pr-[100px]'>
                        <Link href='/'>
                            <div className="flex justify-center items-center">
                                <img className="mt-[-70px]" src='images/SGMYANMAR.png' width="250" height="100" alt="sgmyanmar logo" />
                            </div>
                        </Link>
                    </div>
                    <div className='dark:text-gray-400 mt-[-78px] md:mt-0'>
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
                <main className='md:w-5/6 w-full'>
                    <hr className='border h-[15px] bg-gray-400 border-gray-400' />
                    <div className="flex md:flex-row flex-col md:justify-evenly mt-3">
                        <div className='text-center'>
                            <h3 className="font-bold dark:text-gray-400">Date & Time :<span className='text-red-600 font-normal'>17/07/2023 17:35:30 </span></h3>
                            <h3 className='font-bold dark:text-gray-400'>Name :<span className='font-normal'>PHYOE WAI AUNG</span></h3>
                        </div>
                        <div>
                            <h3 className='font-bold text-center dark:text-gray-400'>Delievery Mode : <span className='font-normal'>Sea Cargo (3-4 weeks from shipment)</span></h3>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col md:justify-evenly mt-3">
                        <div className='md:w-1/2 w-full text-center'>
                            <h3 className="font-bold text-center md:text-start ml-11 dark:text-blue-500">Shipping Information</h3>
                            <textarea className='invoice-color-textarea w-5/6' value='No. 21,Block C,Thiri Yadanar Retail and Wholesale Market, Thudhamma Road, North Okkalapa Tsp.Yangon' readOnly />
                            <h3 className="font-bold dark:text-gray-400">Recipient Name : <span className="font-normal">phyoe wai aung</span></h3>
                            <h3 className="font-bold dark:text-gray-400">Recipient Contact Number : <span className='font-normal'>092345673</span></h3>
                        </div>
                        <div className='md:w-1/2 w-full text-center'>
                            <h3 className="font-bold text-center md:text-start ml-11 dark:text-blue-500">Billing Information</h3>
                            <textarea className='invoice-color-textarea w-5/6' value='No. 21,Block C,Thiri Yadanar Retail and Wholesale Market, Thudhamma Road, North Okkalapa Tsp.Yangon' readOnly />
                            <h3 className="font-bold dark:text-gray-400">Sender Name : <span className="font-normal">phyoe wai aung</span></h3>
                            <h3 className="font-bold dark:text-gray-400">Sender Contact Number : <span className='font-normal'>092345673</span></h3>
                        </div>
                    </div>
                    <div className='mt-4 ml-3 mr-3 md:ml-0 md:mr-0'>
                        <h3 className='dark:text-red-400 font-bold'>phyoewaiaung082@gmail.com</h3>
                    </div>
                    <div className="mb-3 invoice-issue-container md:mr-0 md:ml-0 ml-3 mr-3">
                        <table className='invoice-issue-table text-center'>
                            <thead>
                                <tr>
                                    <th width={50}>S/N</th>
                                    <th width={300}>Description</th>
                                    <th width={200}>Weight(kg) / Value</th>
                                    <th width={200}>Unit Price / kg (S$)</th>
                                    <th width={200}>Total Price S$</th>
                                </tr>
                            </thead>
                            <tbody className="dark:text-gray-400">
                                <tr>
                                    <td>1</td>
                                    <td>Food and Clothes</td>
                                    <td>
                                        <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={foodWeight === 0 ? '' : foodWeight} onChange={foodWeightChange} />
                                    </td>
                                    <td>3</td>
                                    <td> $9.00</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Shoes / Bag</td>
                                    <td>
                                        <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={shoeWeight === 0 ? '' : shoeWeight} onChange={shoeWeightChange} />
                                    </td>
                                    <td>5</td>
                                    <td>$16.00</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Cosmetics / Medicine/ Supplements</td>
                                    <td>
                                        <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={cosmeticWeight === 0 ? '' : cosmeticWeight} onChange={cosmeticWeightChange} />
                                    </td>
                                    <td>5</td>
                                    <td>$16.00</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Electronic Item</td>
                                    <td>
                                        <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={electronicWeight === 0 ? '' : electronicWeight} onChange={electronicWeightChange} />
                                    </td>
                                    <td>5</td>
                                    <td>$16.00</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Others - Voltage regulator</td>
                                    <td>
                                        <input className="w-1/2 dark:bg-gray-400 dark:text-white" type="text" value={othersWeight === 0 ? '' : othersWeight} onChange={othersWeightChange} />
                                    </td>
                                    <td>10%</td>
                                    <td>$16.00</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Total Weight</td>
                                    <td>
                                        {(parseFloat(foodWeight) + parseFloat(shoeWeight) + parseFloat(cosmeticWeight) + parseFloat(electronicWeight) + parseFloat(othersWeight)) === 0 ? '' : (parseFloat(foodWeight) + parseFloat(shoeWeight) + parseFloat(cosmeticWeight) + parseFloat(electronicWeight) + parseFloat(othersWeight))}
                                    </td>
                                    <td>handling fee 3 kg</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>SG Home PickUp:</td>
                                    <td className='text-start' colSpan={2}>Yes</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Home/ Bus Station deliver:</td>
                                    <td className='text-start' colSpan={2}>Yangon Home Delivery Downtown ($3.5)</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}></td>
                                    <td className='text-start'>MM Pay</td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan={2} className='font-bold'>PayNow to mobile 93250329 or UEN number 53413642K </td>
                                    <td>TOTAL</td>
                                    <td>$45.40</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 className="ml-3 mr-3 md:mr-0 md:ml-0 font-bold text-red-600 mt-1">*Any Loss or Damage, we will refund item price OR refund 3 times of shipping fee (item 1 to 5 only), whichever is lower.</h3>
                    <h3 className="ml-3 mr-3 md:mr-0 md:ml-0 font-bold text-red-600">*if require full refund, additional 5% of item value have to pay upfront</h3>
                    <div className="ml-5 mr-5 md:mr-0 md:ml-0 flex md:flex-row flex-col md:justify-between mb-5 items-center">
                        <div className='dark:text-gray-400'>
                            <h4 className="font-bold">Terms & Conditions:</h4>
                            <ol>
                                <li>All prices stated here are in Singapore Dollars</li>
                                <li>Any illegal items will not be accepted</li>
                                <li> Arrival schedule might change due to unforeseen circumstances</li>
                                <li>We are not responsible for damaged items that are not declared</li>
                            </ol>
                            <span>Items Detail:</span>
                            <div>Filters</div>
                            <div>Special Instruction:</div>
                        </div>
                        <div className='md:mr-[80px] md:mt-0 mt-4'>
                            <div>
                                <button className='invoice-issue-button'>Send Email</button>
                            </div>
                            <div className='mt-3'>
                                <button className='invoice-issue-button'>Update</button>
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
