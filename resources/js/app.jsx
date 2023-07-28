import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

function AppWrapper({ App, props }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const themeClick = () => {
        setIsDarkMode(!isDarkMode);
    }


    return (
        <BrowserRouter>
            <img onClick={themeClick} className="z-10 w-[30px] h-[30px] md:w-[40px] md:h-[40px] cursor-pointer absolute top-[15px] right-[21px]" src={isDarkMode ? 'images/night-mode.png' : 'images/day-mode.png'} alt="Theme png" />
            <div className={isDarkMode ? 'dark' : 'light'}>
                <App {...props}/>
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
