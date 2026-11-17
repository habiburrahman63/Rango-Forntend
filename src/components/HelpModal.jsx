import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown, ChevronUp, Mail, Phone, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function HelpModal() {
  const { isHelpModalOpen, setIsHelpModalOpen, showToast } = useCart();
  const [openFaq, setOpenFaq] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isHelpModalOpen) return null;

  const faqs = [
    {
      q: 'How long does shipping take and what does it cost?',
      a: 'Standard delivery takes 3-5 business days and is FREE on orders over $100 (otherwise $5.00). Express shipping takes 1-2 business days for a flat rate of $15.00.'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We offer a 30-day money-back guarantee. If you are not completely satisfied with your purchase, you can return unworn items in their original condition and packaging for a full refund or exchange.'
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), PayPal Express, and Cash on Delivery (COD) in select areas.'
    },
    {
      q: 'How can I track my existing order?',
      a: 'Once your order is processed, you will receive a tracking number via email. You can also view real-time delivery status by signing into your account and clicking "My Orders" in the top bar.'
    },
    {
      q: 'How do I choose the correct apparel size?',
      a: 'Check our sizing guide available in the Quick View modal of each product. Our garments adhere to standard international sizing (S, M, L, XL).'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) {
      showToast('Please fill in your email and message.');
      return;
    }
    setSubmitted(true);
    showToast('Your inquiry has been received! Our support team will reply within 24 hours.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsHelpModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-2xl shadow-2xl rounded-xs overflow-hidden z-10 my-8 border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-2">
            <HelpCircle size={20} className="text-[#048287]" />
            <h3 className="font-['Lato'] font-bold text-base text-[#222222] tracking-wider uppercase">
              Help &amp; Customer Advice
            </h3>
          </div>
          <button
            onClick={() => setIsHelpModalOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xs flex items-center gap-3">
              <Phone size={18} className="text-[#048287] flex-shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">24/7 Phone Support</p>
                <p className="text-xs font-bold text-gray-800">+1 (800) 123-4567</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xs flex items-center gap-3">
              <Mail size={18} className="text-[#048287] flex-shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">Email Inquiry</p>
                <p className="text-xs font-bold text-gray-800">support@rango.com</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xs flex items-center gap-3">
              <Clock size={18} className="text-[#048287] flex-shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">Business Hours</p>
                <p className="text-xs font-bold text-gray-800">Mon - Sat: 9am - 8pm</p>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div>
            <h4 className="font-['Lato'] font-bold text-xs uppercase tracking-wider text-gray-800 mb-3 pb-2 border-b border-gray-100 flex items-center gap-1.5">
              <MessageSquare size={14} className="text-[#048287]" />
              <span>Frequently Asked Questions</span>
            </h4>

            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xs overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="w-full p-3 text-left text-xs font-bold text-gray-800 flex items-center justify-between bg-gray-50/70 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp size={16} className="text-[#048287]" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="p-3 text-xs text-gray-600 bg-white leading-relaxed border-t border-gray-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Send Message Form */}
          <div className="pt-2">
            <h4 className="font-['Lato'] font-bold text-xs uppercase tracking-wider text-gray-800 mb-3 pb-2 border-b border-gray-100">
              Send Us a Message
            </h4>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs text-center space-y-2">
                <CheckCircle2 size={24} className="text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-emerald-800">Message Received!</p>
                <p className="text-[11px] text-gray-600">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287]"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject (e.g. Order Delivery Query)"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287]"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    placeholder="How can we assist you?"
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#048287] hover:bg-[#036b6f] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Send size={13} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
