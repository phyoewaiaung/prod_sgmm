import React, { useState } from 'react';

const Modal = (props) => {
    let { show, invoiceNo, type, onClose } = props;
    if (!show) return null;

    return (
        <div id="modal">
           <div className="modal-content">
            <div className='flex justify-center flex-col items-center bg-white w-[400px] h-[250px] rounded'>
                <div className='p-4 text-center'>
                    <h3 className='font-bold text-xl mb-3'>Invoice No  <span className='text-blue-700 bg-slate-200'>{invoiceNo}</span></h3>
                    <hr />
                </div>
                <h4>{type == "1" ? "Are you sure want to update LOCATION?" : "Are you sure want to update SHELF NO?"}</h4>
                <div>
                    <button>YES</button>
                    <button>CANCEL</button>
                </div>
            </div>
           </div>
        </div>
    );
};

export default Modal;
