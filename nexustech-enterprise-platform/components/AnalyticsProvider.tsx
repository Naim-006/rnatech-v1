import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        dataLayer: any[];
        clarity: any;
        fbq: any;
    }
}

const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        // Google Analytics 4 Initialization
        const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (gaId && !window.dataLayer) {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            script.async = true;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }
            gtag('js', new Date());
            gtag('config', gaId);
        }

        // Microsoft Clarity Initialization
        const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;
        if (clarityId && !window.clarity) {
            (function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
                y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", clarityId);
        }

        // Meta Pixel Initialization
        const pixelId = import.meta.env.VITE_FB_PIXEL_ID;
        if (pixelId && !window.fbq) {
            !function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
                if (f.fbq) return; n = f.fbq = function () {
                    n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            window.fbq('init', pixelId);
        }
    }, []);

    // Track Page Views on Location Change
    useEffect(() => {
        const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (gaId && window.dataLayer) {
            // @ts-ignore
            window.gtag('config', gaId, {
                page_path: location.pathname + location.search,
            });
        }

        const pixelId = import.meta.env.VITE_FB_PIXEL_ID;
        if (pixelId && window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, [location]);

    return <>{children}</>;
};

export default AnalyticsProvider;
