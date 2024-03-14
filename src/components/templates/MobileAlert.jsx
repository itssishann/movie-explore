import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const MobileAlert = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const mobileKeywords = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

        const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
        setIsMobile(isMobileDevice);
    }, []);

    const showMobileAlert = () => {
        Swal.fire({
            icon: 'error',
            title: 'Website Not Available for Mobile',
            text: 'Sorry, this website is not optimized for mobile viewing. Please access it from a desktop or laptop.',
            allowOutsideClick: false, 
            allowEscapeKey: false,
            showConfirmButton:false 
        })
    };

    useEffect(() => {
        if (isMobile) {
            showMobileAlert();
        }
    }, [isMobile]);

    return null;
};

export default MobileAlert;
