import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Rss,
  CheckCircle2
} from 'lucide-react';
import { mockData } from '../data/mockData';
import { useCart } from '../context/CartContext';

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  const { about, contact, newsletter, columns, copyright } = mockData.footer;
  const { showToast } = useCart();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to our newsletter!');
    setEmailInput('');
  };

  return (
    <footer className="w-full bg-[#333333] text-[#aaaaaa] font-['Lato'] text-[13px]">
      {/* Row 1: Top 4 Columns */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Company Description */}
          <div className="flex flex-col">
            <div className="mb-5">
              <img
                src={about.logo}
                alt="Rango"
                className="h-[44px] w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="leading-relaxed text-[#aaaaaa]">
              {about.description}
            </p>
          </div>

          {/* Column 2: Contact Us */}
          <div className="flex flex-col">
            <h4 className="font-['Lato'] font-bold text-[14px] text-white tracking-wider uppercase mb-5">
              {contact.title}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#048287] flex-shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#048287] flex-shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#048287] flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div className="flex flex-col">
            <h4 className="font-['Lato'] font-bold text-[14px] text-white tracking-wider uppercase mb-5">
              FOLLOW US
            </h4>
            <div className="flex flex-wrap gap-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 bg-[#444444] hover:bg-[#048287] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <FacebookIcon />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-9 h-9 bg-[#444444] hover:bg-[#048287] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <TwitterIcon />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 bg-[#444444] hover:bg-[#048287] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <InstagramIcon />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-[#444444] hover:bg-[#048287] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#rss"
                aria-label="RSS Feed"
                className="w-9 h-9 bg-[#444444] hover:bg-[#048287] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <Rss size={16} />
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h4 className="font-['Lato'] font-bold text-[14px] text-white tracking-wider uppercase mb-5">
              {newsletter.title}
            </h4>
            <p className="leading-relaxed mb-4 text-[#aaaaaa]">
              {newsletter.description}
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-white text-[#222222] px-3.5 py-2.5 text-[13px] outline-none focus:ring-1 focus:ring-[#048287]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-[#048287] hover:bg-[#036b6f] text-white px-4 py-2.5 transition-colors cursor-pointer flex items-center justify-center"
              >
                {subscribed ? <CheckCircle2 size={18} /> : <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary 4 Columns Links */}
      <div className="w-full bg-[#2d2d2d] border-t border-[#404040]">
        <div className="max-w-[1200px] mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="font-['Lato'] font-bold text-[13px] text-white tracking-wider uppercase mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-[#999999] hover:text-[#048287] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright and Payment Row */}
      <div className="w-full bg-[#222222] border-t border-[#333333] text-[#888888] text-[12px]">
        <div className="max-w-[1200px] mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div>
            <p>{copyright}</p>
          </div>

          {/* Payment Badges & Language Selector */}
          <div className="flex items-center gap-6">
            <span className="text-[#999999] hover:text-white cursor-pointer transition-colors">
              English | USD
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="bg-[#333333] text-gray-300 px-2 py-0.5 rounded-xs border border-gray-600">
                VISA
              </span>
              <span className="bg-[#333333] text-gray-300 px-2 py-0.5 rounded-xs border border-gray-600">
                MC
              </span>
              <span className="bg-[#333333] text-gray-300 px-2 py-0.5 rounded-xs border border-gray-600">
                AMEX
              </span>
              <span className="bg-[#333333] text-gray-300 px-2 py-0.5 rounded-xs border border-gray-600">
                PAYPAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
