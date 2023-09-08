import React from 'react'

const Modal = (props) => {
    return (
        <>
            {props.show &&
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto w-[400px]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    {!props.deleteStatus ?
                                        <h6 className="text-2xl font-semibold">
                                            Invoice No <span className='ms-3 bg-blue-200 text-indigo-900'>{props.invoiceNo}</span>
                                        </h6> :
                                        <h6 className="text-2xl font-semibold text-red-800">
                                            Delete Confirmation
                                        </h6>
                                    }
                                </div>
                                {/*body*/}
                                <div className="relative pl-6 pr-6 pt-2 pb-2 flex-auto">
                                    <p className="my-4 leading-relaxed">
                                        {!props.deleteStatus ?
                                        props.type == "1" ? "Are you sure want to update LOCATION?" : "Are you sure want to update SHELF NO?"
                                        :
                                        "Are you sure you want to delete this invoice!"
                                    }
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end pl-6 pr-6 pt-3 pb-3">
                                    <button
                                        className="bg-red-400 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={props.onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={!props.deleteStatus ? props.saveOK : props.deleteOK}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }
        </>
    )
}

export default Modal
