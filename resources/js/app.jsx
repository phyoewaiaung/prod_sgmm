import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { Link, createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EventEmitter from './utils/EventEmitter';


const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

function AppWrapper({ App, props }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuth,setIsAuth] = useState(false);

    useEffect(()=> {
        const onAuth = (eventData) => {
            setIsAuth(eventData.auth);
        }
        const listener = EventEmitter.addListener("auth", onAuth);
        return () => {
            listener.remove();
        }
    })

    const themeClick = () => {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <BrowserRouter>
            <div className={!isDarkMode ? "z-10 pt-[3px] mr-[60px] w-[30px] h-[30px] md:w-[35px] md:h-[35px] cursor-pointer absolute top-[15px] right-[61px]" : "z-10 pt-[3px] mr-[60px] w-[35px] h-[35px] md:w-[30px] md:h-[30px] cursor-pointer absolute top-[15px] right-[61px]"}>
                <img onClick={themeClick} src={!isDarkMode ? 'images/night-mode.png' : 'images/day-mode.png'} alt="Theme png" />
            </div>
            <div className={!isDarkMode ? "z-10 cursor-pointer absolute top-[15px] right-[24px]" : "z-10 absolute top-[15px] right-[24px]"}>
                {isAuth ?
                    <Link href={route('logout')} method='post'>
                        <button className='bg-gray-300 w-[80px] p-2 rounded hover:bg-gray-500 hover:text-white text-sm'>Sign Out</button>
                    </Link>
                    :
                    <Link href={route('login')}>
                        <button className='bg-gray-300 w-[80px] p-2 rounded hover:bg-gray-500 hover:text-white text-sm'>Sign In</button>
                    </Link>
                }
            </div>
            <div className={isDarkMode ? 'dark' : 'light'}>
                <App {...props} />
            </div>
        </BrowserRouter>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<AppWrapper App={App} props={props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
