import { Link } from "@inertiajs/react";
import EventEmitter from "@/utils/EventEmitter";
import { useEffect } from "react";
export default function Welcome(props) {
    console.log(props)
    useEffect(()=> {
        EventEmitter.emit("auth",{
            auth:props.auth.user?true:false
        })
    },[props])
    return (
        <>
            <div className="relative pt-6 pb-6 sm:flex sm:justify-center flex-col sm:items-center min-h-screen bg-dots-darker  bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <header className="flex justify-center mt-10">
                    <img className="mt-[-70px]" src='images/SGMYANMAR.png' width="250" height="100" alt="sgmyanmar logo" />
                </header>
                <main className="mt-[-35px]">
                    <div className="flex flex-col justify-center align-middle">
                        <h2 className="text-blue-700 text-center text-2xl">WELCOME TO SGMYANMAR LOGISTIC SERVICE</h2>
                        <div className="color ms-[100px] me-[100px] mt-4 dark:text-gray-400">
                            &#10077; Connecting Nations, Delivering Promises.
                            We provide efficient logistics solutions, bridging distances between Myanmar and Singapore,
                            delivering excellence every step of the way. &#10078;
                        </div>
                    </div>
                    {props.auth.user?.role == "1" &&
                        <>
                            <div className="flex mt-6 justify-center">
                                <Link href={route('check-invoice')}>
                                    <div className=" min-h-[165px] ms-4 me-4 max-w-sm cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-400 ">
                                        <div className="p-5">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ont-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-600 hover:to-blue-700">Check Invoices</h5>
                                            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">Click here to access the invoices. Keep track of your invoices and payment status effortlessly.</div>
                                            <Link href={route('check-invoice')}>
                                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                                                    Check Invoices
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <hr className='mt-3 border border-gray-200 dark:border-gray-600' />
                        </>
                    }

                    <div className="mt-6 flex md:flex-row flex-col place-items-center md:justify-center gap-2">
                        <Link href={route('check-parcel')}>
                            <div className=" min-h-[165px] ms-4 me-4 max-w-sm cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-400 ">
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ont-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-600 hover:to-blue-700">Track The Parcel</h5>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">Welcome to our parcel tracking service. To check the status and location of your parcel</div>
                                </div>
                            </div>
                        </Link>
                        <Link href={route('logistic-price-list')}>
                            <div className=" min-h-[165px] ms-4 me-4 max-w-sm cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-400 ">
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ont-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-600 hover:to-blue-700">Logistic Price List</h5>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">Thank you for considering our logistic services. Please check our price list for shipping services to various destinations.</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-6 flex md:flex-row flex-col place-items-center md:justify-center gap-2">
                        <Link href={route('sg-to-mm')}>
                            <div className=" min-h-[165px] ms-4 me-4 max-w-sm cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-400 ">
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ont-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-600 hover:to-blue-700">SG To MM Logistic Form</h5>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">Welcome to our logistics services for shipping from <span className="text-purple-700 font-bold">Singapore</span> to <span className="text-pink-700 font-bold">Myanmar</span>.</div>
                                </div>
                            </div>
                        </Link>
                        <Link href={route('mm-to-sg-okkala')}>
                            <div className=" min-h-[165px] ms-4 me-4 max-w-sm cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out hover:-translate-y-1 hover:scale-110 ">
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ont-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-600 hover:to-blue-700">MM to SG Logistic Form <span>(Okkala)</span></h5>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">Welcome to our logistics services for shipping from <span className="text-pink-700 font-bold">Myanmar</span> to <span className="text-purple-700 font-bold">Singapore</span>.</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="mt-6 flex md:flex-row flex-col place-items-center md:justify-center gap-2">
                        <Link href={route('mm-to-sg-alon')}>
                            <div className=" min-h-[165px] ms-4 me-4 max-w-sm cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out hover:-translate-y-1 hover:scale-110 ">
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ont-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-600 hover:to-blue-700">MM to SG Logistic Form <span>(Alon)</span></h5>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">Welcome to our logistics services for shipping from <span className="text-pink-700 font-bold">Myanmar</span> to <span className="text-purple-700 font-bold">Singapore</span>.</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <section className="bg-gray-100 py-16 dark:bg-gray-900 ">
                        <div className="container mx-auto px-4 ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ms-8 me-8">
                                <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-gray-400">
                                    <h2 className="text-2xl text-blue-700 font-bold mb-4">Singapore Branch</h2>
                                    <div className="mb-4"><span className="font-bold">Address: </span>
                                        Peninsula Plaza, 111 North Bridge Road, #02-02A
                                        <div className="ms-[68px]">
                                            Singapore 179098
                                        </div>
                                    </div>
                                    <div className="mb-4"><span className="font-bold">Phone:</span> +65 9325 0329 / +65 8129 0955</div>
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-gray-400">
                                    <h2 className="text-2xl text-blue-700 font-bold mb-4">Myanmar Branches</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x-2 divide-x-0">
                                        <div className="pr-2">
                                            <h3 className="text-center font-bold mb-2">BRANCH 1</h3>
                                            <div className="mb-4"><span className="font-bold">Address:</span> အမှတ် ၆၄၂၊ သံသုမာလမ်း ၊ ၁၀
                                                ရပ်ကွက် တောင်ဥက္ကလာမြို့နယ်။</div>
                                            <div className="mb-4"><span className="font-bold">Phone:</span> +95 9876 5432</div>
                                        </div>
                                        <div className="pl-2">
                                            <h3 className="text-center font-bold mb-2">BRANCH 2</h3>
                                            <div className="mb-4"><span className="font-bold">Address:</span> အမှတ် ၂၂ ၊ သိပ္ပံလမ်း၊
                                                အလုံမြို့နယ်။</div>
                                            <div className="mb-4"><span className="font-bold">Phone:</span> +95 9876 5432</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="text-center font-medium ms-8 me-8 dark:text-gray-400">
                    © 2023 by SGMyanmar - Myanmar Online Store - Food Delivery - Logistic Service
                </footer>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                .bg-dots-light {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255, 255, 255, 0.07)'/%3E%3C/svg%3E");
                  }
            `}
            </style>
        </>
    );
}
