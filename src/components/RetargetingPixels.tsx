import { useEffect } from "react";

declare global {
  interface Window {
    fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}

const RetargetingPixels = () => {
  useEffect(() => {
    // Facebook Pixel
    const initFacebookPixel = () => {
      if (typeof window !== 'undefined' && !window.fbq) {
        (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if (f.fbq) return;
          n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = '2.0';
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        window.fbq('init', 'YOUR_FACEBOOK_PIXEL_ID'); // Replace with actual pixel ID
        window.fbq('track', 'PageView');
      }
    };

    // Google Analytics/Google Ads
    const initGoogleAnalytics = () => {
      if (typeof window !== 'undefined' && !window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID'; // Replace with actual GA ID
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'YOUR_GA_ID'); // Replace with actual GA ID
      }
    };

    initFacebookPixel();
    initGoogleAnalytics();
  }, []);

  return null; // This component doesn't render anything
};

// Tracking functions for various funnel events
export const trackEvent = (eventName: string, eventData?: any) => {
  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
  }
  
  // Google Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
  
  console.log('Event tracked:', eventName, eventData);
};

// Specific tracking functions for our funnels
export const trackQuizStarted = () => {
  trackEvent('QuizStarted', {
    content_category: 'ai_assessment',
    value: 0
  });
};

export const trackQuizCompleted = (results: any) => {
  trackEvent('CompleteRegistration', {
    content_category: 'ai_assessment',
    value: 356 // Potential consultation value
  });
};

export const trackWebinarSignup = () => {
  trackEvent('Lead', {
    content_category: 'webinar',
    value: 356
  });
};

export const trackMiniCourseSignup = () => {
  trackEvent('Lead', {
    content_category: 'mini_course',
    value: 356
  });
};

export const trackCaseStudyDownload = () => {
  trackEvent('Lead', {
    content_category: 'case_study',
    value: 356
  });
};

export const trackROICalculatorUsed = (savings: number) => {
  trackEvent('AddToCart', {
    content_category: 'roi_calculator',
    value: Math.min(savings, 1999) // Cap at masterclass price
  });
};

export const trackConsultationBooked = () => {
  trackEvent('Purchase', {
    content_category: 'consultation',
    value: 356,
    currency: 'AED'
  });
};

export const trackMasterclassRegistration = () => {
  trackEvent('Purchase', {
    content_category: 'masterclass',
    value: 1999,
    currency: 'AED'
  });
};

export const trackPageView = (pageName: string) => {
  trackEvent('PageView', {
    page_title: pageName,
    page_location: window.location.href
  });
};

export default RetargetingPixels;