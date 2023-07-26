import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = (props) => {
    const [scanResult, setScanResult] = useState();

    useEffect(() => {
        const success = (result) => {
            setScanResult(result);
            props.qrParentCallBack(result);
        }

        const error = (e) => {
            console.log(e);
        }
        let scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 'auto', height: 'auto' } },
            /* verbose= */ false);
        scanner.render(success, error);

    }, [])

    return (
        <>
            <div id="reader" className='dark:text-gray-400 qr-style'>
            </div>
        </>
    )
}

export default QrScanner
