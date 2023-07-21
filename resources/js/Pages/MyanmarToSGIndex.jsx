import { useState } from 'react';

const SingaporeToMMIndex = () => {
    const [pickUpRadio, setPickUpRadio] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [payment, setPayment] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [aggrementCheck, setAggrementCheck] = useState(false);
    const [senderPhone, setSenderPhone] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [transportId, setTransportId] = useState('');
    const [cargoDetail, setCartgoDetail] = useState('');
    const [selfCollectionId, setSelfCollectionid] = useState('');
    const [recipientPostalCode, setRecipientPostalCode] = useState('');
    const [additionalOpt, setAdditionalOpt] = useState('');
    const [weightFood, setWeightFood] = useState('');
    const [weightCloth, setWeightCloth] = useState('');
    const [weightCos, setWeightCos] = useState('');
    const [weightFrozen, setWeightFrozen] = useState('');
    const [weightOther, setWeightOther] = useState('');

    const [cargoData, setCargoData] = useState([
        { id: 1, name: "Food", isChecked: false },
        { id: 2, name: "Clothes", isChecked: false },
        { id: 3, name: "Cosmetics / Medicine / Supplements", isChecked: false },
        { id: 4, name: "Frozen Food", isChecked: false },
        { id: 5, name: "Electronic Goods", isChecked: false },
        { id: 6, name: "Other", isChecked: false }
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

    const selfCollectionChange = (id) => {
        setSelfCollectionid(id);
    }

    const recipientPostalCodeChange = (e) => {
        setRecipientPostalCode(e.target.value);
    }

    const additionalOptChange = (e) => {
        setAdditionalOpt(e.target.value);
    }

    const weightFoodChange = (e) => {
        setWeightFood(e.target.value);
    }

    const weightClothChange = (e) => {
        setWeightCloth(e.target.value);
    }

    const weightCosChange = (e) => {
        setWeightCos(e.target.value);
    }

    const weightFrozenChange = (e) => {
        setWeightFrozen(e.target.value);
    }

    const weightOtherChange = (e) => {
        setWeightOther(e.target.value);
    }

    const pickUpChange = (e) => {
        setPickUpRadio(e.target.value);
    }

    const paymentChange = (e) => {
        setPayment(e.target.value);
    }

    const recipientNameChange = (e) => {
        setRecipientName(e.target.value);
    }

    const cargoOnChage = (id) => {
        let data = cargoData.map(data => {
            if (data.id == id) {
                data.isChecked = !data.isChecked;
            }
            return data;
        })
        setCargoData(data)
    }

    const storageTypeChange = (id) => {
        let data = storageType.map(data => {
            if (data.id == id) {
                data.isChecked = !data.isChecked;
            }
            return data;
        })
        setStorageType(data)
    }

    const senderNameChange = (e) => {
        setSenderName(e.target.value)
    }

    const senderEmailChange = (e) => {
        setSenderEmail(e.target.value);
    }

    const recipientAddressChange = (e) => {
        setRecipientAddress(e.target.value);
    }

    const recipientPhoneChange = (e) => {
        setRecipientPhone(e.target.value);
    }

    const senderPhoneChange = (e) => {
        setSenderPhone(e.target.value);
    }

    const senderAddressChange = (e) => {
        setSenderAddress(e.target.value);
    }

    const transportChange = (e) => {
        setTransportId(e.target.value);
    }

    return (
        <>
            <div className="relative pt-6 pb-6 sm:flex sm:justify-center flex-col sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <header>
                    <div className="flex justify-center">
                        <img src='images/logo.png' width="100" height="70" alt="" />
                    </div>
                    <h1 className="text-4xl font-bold text-center text-blue-700 py-4">SGMYANMAR</h1>
                </header>
                <main className='md:ml-[200px] md:mr-[200px] mt-0 mb-0'>
                    <div className="flex flex-col justify-center align-middle">
                        <h2 className="text-blue-700 text-center text-2xl"> <span className="text-pink-700 font-bold">MYANMAR </span>TO <span className="text-purple-700 font-bold">SINGAPORE</span> LOGISTIC SERVICE</h2>
                        <div className='mt-5 me-4 ms-4'>
                            <h2 className='mb-4 font-bold text-blue-600 text-[20px]' htmlFor="">MM to SG rates:</h2>
                            <div className='mb-3'>
                                <h3 className='font-bold'>Air Freight Only:</h3>
                                <ul className='ms-7'>
                                    <li>Food : S$8.50 /kg</li>
                                    <li>Clothes : S$8.50 /kg</li>
                                    <li> Cosmetics : S$9.00 /kg</li>
                                    <li>Frozen food : S$ 9.00/kg (ALL FROZEN FOOD MUST BE PACKED PROPERLY AND CANNOT PACK WITH DRIED FOODS)</li>
                                    <li>Valuable items : please enquire</li>
                                </ul>
                            </div>
                            <div className="mb-3">
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
                            <div className='mt-3 bg-slate-200 p-3'>
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
                            <div className='flex border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Email</label>
                                <input className='w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="email" name="" id="" value={senderEmail} onChange={senderEmailChange} />
                            </div>
                            <div className='flex border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Sender's Name / ပေးပို့သူအမည်</label>
                                <input className='w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={senderName} onChange={senderNameChange} />
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Sender's Contact Number / ပေးပို့သူ၏ ဖုန်းနံပါတ်</label>
                                <input className='w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={senderPhone} onChange={senderPhoneChange} />
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Sender's Address /ပေးပို့သူ၏ နေရပ်လိပ်စာ (optional)</label>
                                <input className='w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={senderAddress} onChange={senderAddressChange} />
                            </div>
                            <div className='flex border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Sea Transport or Air Transport?</label>
                                <div className='mt-3'>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id="radio1" value="1" onChange={transportChange} checked={transportId === "1" ? true : false} /> <label className=' dark:text-gray-400 cursor-pointer
                                    me-3' htmlFor="radio1">Sea</label>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id='radio2' value="2" onChange={transportChange} checked={transportId === "2" ? true : false} /> <label className='cursor-pointer dark:text-gray-400 cursor-po' htmlFor="radio2">Air</label>
                                </div>
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>What are you sending? (you can select more than 1)</label>
                                ALL FROZEN FOOD must be given to office in frozen state, cannot pack with dried foods
                                <div className='mt-3'>
                                    {cargoData.map(data => {
                                        return (
                                            <div className='mb-2' key={data.id}>
                                                <input className='focus:ring cursor-pointer focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="checkbox" id={data.name} value={data.id} onChange={function () { cargoOnChage(data.id) }} checked={data.isChecked} />
                                                <label htmlFor={data.name} className='ms-2 cursor-pointer'>{data.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Storage Type</label>
                                <div className='mt-3'>
                                    {storageType.map(data => {
                                        return (
                                            <div className='mb-2' key={data.id}>
                                                <input className='focus:ring cursor-pointer focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="checkbox" id={data.name} value={data.id} onChange={function () { storageTypeChange(data.id) }} checked={data.isChecked} />
                                                <label htmlFor={data.name} className='ms-2 cursor-pointer'>{data.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='flex border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 mb-2'>Please provide details for your cargo. (optional)</label>
                                <input className='w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="email" name="" id="" value={cargoDetail} onChange={cargoDetailChange} />
                            </div>
                            <div className='flex border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Choose Yangon Home Pick up at S$3.50?</label>
                                We will contact you to arrange day and time to pickup.
                                <div className='mt-3'>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id="radio1" value="1" name="yes" onChange={pickUpChange} checked={pickUpRadio === "1" ? true : false} /> <label className=' dark:text-gray-400 cursor-pointer
                                    me-3' htmlFor="radio1">Yes</label>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id='radio2' value="2" name="no" onChange={pickUpChange} checked={pickUpRadio === "2" ? true : false} /> <label className='cursor-pointer dark:text-gray-400 cursor-po' htmlFor="radio2">No</label>
                                </div>
                            </div>
                            <div className='flex border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='dark:text-gray-400 required mb-2'>Choose SG Home Delivery / Self Collection?</label>
                                SG Home Delivery is based on driver's schedule, we appreciate your patience
                                <div className='mt-3'>
                                    {sgSelfCollection.map(data => {
                                        return (
                                            <div key={data.id} className='mb-1'>
                                                <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id={data.name} value={data.id} onChange={function () { selfCollectionChange(data.id) }} checked={selfCollectionId === data.id ? true : false} />
                                                <label className='ms-3 dark:text-gray-400 cursor-pointer me-3' htmlFor={data.name}>{data.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Payment in Singapore (SG) or in Myanmar (MM)?</label>
                                ငွေပေးချေမှု ( SG Pay သို့မဟုတ် MM Pay)
                                <div className='mt-4'>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id="payment1" value="1" name="SG Pay" onChange={paymentChange} checked={payment === "1" ? true : false} /> <label className=' cursor-pointer
                                    me-3' htmlFor="payment1">SG Pay</label>
                                    <input className='focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none' type="radio" id='payment2' value="2" name="MM Pay" onChange={paymentChange} checked={payment === "2" ? true : false} /> <label className='cursor-pointer' htmlFor="payment2">MM Pay</label>
                                </div>
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Recipient's Name / လက်ခံမည့်သူ၏ နာမည်</label>
                                <input className='w-1/2 mt-3 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientName} onChange={recipientNameChange} />
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='required mb-2'>Recipient's Contact Number / လက်ခံမည့်သူ၏ ဖုန်းနံပါတ်</label>
                                <input className='w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientPhone} onChange={recipientPhoneChange} />
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Recipient's Postal Code</label>
                                <input className='w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientPostalCode} onChange={recipientPostalCodeChange} />
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Recipient's Address /လက်ခံမည့်သူ၏ နေရပ်လိပ်စာ</label>
                                <input className='w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={recipientAddress} onChange={recipientAddressChange} />
                            </div>
                            <div className='flex dark:text-gray-400 cursor-po border-blue-200 border p-6 flex-col mb-4 rounded'>
                                <label htmlFor="" className='mb-2'>Additional Instructions? (optional)</label>
                                <input className='w-1/2 mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={additionalOpt} onChange={additionalOptChange} />
                            </div>
                            <div className='p-4 bg-gray-200'>
                                <h2 className='font-bold mb-3'>Weight of Cargo (leave blank if not sure)</h2>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className='flex dark:text-gray-400 cursor-po border-blue-300 border p-6 flex-col mb-4 rounded'>
                                        <label htmlFor="" className='mb-2'>Weight Of Food</label>
                                        <input className=' mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightFood} onChange={weightFoodChange} />
                                    </div>
                                    <div className='flex dark:text-gray-400 cursor-po border-blue-300 border p-6 flex-col mb-4 rounded'>
                                        <label htmlFor="" className='mb-2'>Weight Of Clothes</label>
                                        <input className=' mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightCloth} onChange={weightClothChange} />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className='flex dark:text-gray-400 cursor-po border-blue-300 border p-6 flex-col mb-4 rounded'>
                                        <label htmlFor="" className='mb-2'>Weight of Cosmetics/Medicine  / Supplements</label>
                                        <input className=' mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightCos} onChange={weightCosChange} />
                                    </div>
                                    <div className='flex dark:text-gray-400 cursor-po border-blue-300 border p-6 flex-col mb-4 rounded'>
                                        <label htmlFor="" className='mb-2'>Weight of Frozen Food</label>
                                        <input className=' mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightFrozen} onChange={weightFrozenChange} />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className='flex dark:text-gray-400 cursor-po border-blue-300 border p-6 flex-col mb-4 rounded'>
                                        <label htmlFor="" className='mb-2'>Weight of other items</label>
                                        <input className=' mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' type="text" name="" id="" value={weightOther} onChange={weightOtherChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
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

export default SingaporeToMMIndex
