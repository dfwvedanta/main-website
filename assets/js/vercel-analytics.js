// Centralized Vercel web analytics loader
window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };

// optional: you can send an initial event or config here

const script = document.createElement('script');
script.defer = true;
script.src = '/_vercel/speed-insights/script.js';
document.head.appendChild(script);
