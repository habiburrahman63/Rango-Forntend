import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Tag,
  RotateCcw,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { paymentApi } from '../services/api';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    clearCart,
    user,
    addOrder,
    showToast
  } = useCart();

  // Stepper: 1: 'shipping', 2: 'payment', 3: 'processing', 4: 'success', 5: 'failure'
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'paypal' | 'cod'

  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : '',
    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });
  const [shippingErrors, setShippingErrors] = useState({});

  // Payment Form State
  const [cardForm, setCardForm] = useState({
    cardholderName: user?.name || '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [cardErrors, setCardErrors] = useState({});

  // Coupon / Promo Code State
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Processing & Result State
  const [processingStatus, setProcessingStatus] = useState('Initiating payment gateway...');
  const [failureReason, setFailureReason] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  // Shipping Calculation
  const shippingCost = shippingMethod === 'express' ? 15.0 : cartSubtotal > 100 ? 0 : 5.0;
  const taxCost = Number(((cartTotal * 0.05).toFixed(2)));
  const finalGrandTotal = Number((cartTotal + shippingCost + taxCost).toFixed(2));

  // Card Number Formatter (adds space every 4 digits)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  // Expiry Date Formatter (MM/YY)
  const formatExpiry = (value) => {
    const clean = value.replace(/[^0-9]/g, '');
    if (clean.length >= 2) {
      return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
    }
    return clean;
  };

  // Step 1 Validation (Shipping)
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!shippingForm.firstName.trim()) errors.firstName = 'First name is required.';
    if (!shippingForm.lastName.trim()) errors.lastName = 'Last name is required.';
    if (!shippingForm.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingForm.email.trim())) {
      errors.email = 'Valid email is required.';
    }
    if (!shippingForm.phone.trim()) errors.phone = 'Phone number is required.';
    if (!shippingForm.address.trim()) errors.address = 'Street address is required.';
    if (!shippingForm.city.trim()) errors.city = 'City is required.';
    if (!shippingForm.postalCode.trim()) errors.postalCode = 'Postal / Zip code is required.';

    if (Object.keys(errors).length > 0) {
      setShippingErrors(errors);
      return;
    }

    setShippingErrors({});
    setStep(2); // Proceed to payment
  };

  // Step 2 Validation & Payment Processing
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (paymentMethod === 'card') {
      if (!cardForm.cardholderName.trim()) {
        errors.cardholderName = 'Cardholder name is required.';
      }
      const rawCard = cardForm.cardNumber.replace(/\s+/g, '');
      if (!rawCard) {
        errors.cardNumber = 'Card number is required.';
      } else if (rawCard.length < 13 || rawCard.length > 19) {
        errors.cardNumber = 'Please enter a valid card number (13-19 digits).';
      }

      if (!cardForm.expiryDate) {
        errors.expiryDate = 'Expiry date is required.';
      } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardForm.expiryDate)) {
        errors.expiryDate = 'Format must be MM/YY.';
      }

      if (!cardForm.cvv) {
        errors.cvv = 'CVV is required.';
      } else if (cardForm.cvv.length < 3 || cardForm.cvv.length > 4) {
        errors.cvv = '3 or 4 digits.';
      }

      if (Object.keys(errors).length > 0) {
        setCardErrors(errors);
        return;
      }
    }

    setCardErrors({});
    setStep(3); // Processing loading step

    // Check for simulated failure trigger (e.g. Card ending in 0000 or CVV 000)
    const rawCard = cardForm.cardNumber.replace(/\s+/g, '');
    const isSimulatedDecline = rawCard.endsWith('0000') || cardForm.cvv === '000';

    setProcessingStatus('Verifying transaction details with payment network...');

    const orderPayload = {
      items: cart,
      shipping: shippingForm,
      shippingMethod,
      shippingCost,
      taxCost,
      subtotal: cartSubtotal,
      discount: discountAmount,
      total: finalGrandTotal,
      paymentMethod,
      paymentDetails:
        paymentMethod === 'card'
          ? {
              cardholder: cardForm.cardholderName,
              cardLast4: rawCard.slice(-4),
              brand: rawCard.startsWith('4') ? 'Visa' : rawCard.startsWith('5') ? 'MasterCard' : 'Credit Card'
            }
          : { method: paymentMethod }
    };

    // 1. Attempt Backend Payment Gateway API integration
    setTimeout(async () => {
      setProcessingStatus('Securing authorization and processing transaction...');

      try {
        const apiResponse = await paymentApi.processPayment(orderPayload);

        // If backend was reachable and returned error or card declined
        if (apiResponse.fromBackend && !apiResponse.success) {
          setFailureReason(apiResponse.error || 'Payment was declined by your financial institution.');
          setStep(5);
          return;
        }

        // Check simulated decline
        if (isSimulatedDecline) {
          setFailureReason('Card declined: Insufficient funds or invalid security code (Simulated Test).');
          setStep(5);
          return;
        }

        // Finalize order
        const createdOrder = addOrder({
          ...orderPayload,
          id: `RNG-${Date.now().toString().slice(-6)}`,
          paymentStatus: 'Paid',
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        });

        setCompletedOrder(createdOrder);
        clearCart();
        setStep(4); // Success screen
        showToast('Payment successful! Order placed.');
      } catch (err) {
        setFailureReason(err.message || 'Payment processing failed. Please try again.');
        setStep(5);
      }
    }, 1800);
  };

  // Coupon Apply
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    const res = applyVoucher(couponInput.trim());
    if (!res.success) {
      setCouponError(res.error || 'Invalid coupon code.');
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (step !== 3) closeCheckout();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-4xl shadow-2xl rounded-xs overflow-hidden z-10 my-6 border border-gray-100 flex flex-col max-h-[92vh] animate-modal-3d preserve-3d">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-[#048287]" />
            <div>
              <h3 className="font-['Lato'] font-bold text-base text-[#222222] tracking-wider uppercase">
                Secure Checkout
              </h3>
              <p className="text-[11px] text-gray-400">256-bit SSL Encrypted Payment</p>
            </div>
          </div>

          {step !== 3 && (
            <button
              onClick={closeCheckout}
              className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Step Progress Indicators */}
        {step < 4 && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider">
            <span
              className={`flex items-center gap-1.5 ${
                step >= 1 ? 'text-[#048287]' : 'text-gray-400'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${
                  step >= 1 ? 'bg-[#048287]' : 'bg-gray-300'
                }`}
              >
                1
              </span>
              Shipping Address
            </span>
            <span className="text-gray-300">&gt;</span>
            <span
              className={`flex items-center gap-1.5 ${
                step >= 2 ? 'text-[#048287]' : 'text-gray-400'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${
                  step >= 2 ? 'bg-[#048287]' : 'bg-gray-300'
                }`}
              >
                2
              </span>
              Payment &amp; Review
            </span>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Shipping Form Left */}
              <form onSubmit={handleShippingSubmit} className="lg:col-span-7 space-y-4" noValidate>
                <div className="flex items-center gap-2 mb-2">
                  <Truck size={18} className="text-[#048287]" />
                  <h4 className="font-['Lato'] font-bold text-sm text-[#222222] uppercase tracking-wider">
                    Customer Information
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingForm.firstName}
                      onChange={(e) => {
                        setShippingForm({ ...shippingForm, firstName: e.target.value });
                        if (shippingErrors.firstName) setShippingErrors({ ...shippingErrors, firstName: '' });
                      }}
                      className={`w-full px-3 py-2 text-xs border rounded-xs outline-none ${
                        shippingErrors.firstName ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                      }`}
                    />
                    {shippingErrors.firstName && (
                      <p className="mt-1 text-[11px] text-red-600">{shippingErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingForm.lastName}
                      onChange={(e) => {
                        setShippingForm({ ...shippingForm, lastName: e.target.value });
                        if (shippingErrors.lastName) setShippingErrors({ ...shippingErrors, lastName: '' });
                      }}
                      className={`w-full px-3 py-2 text-xs border rounded-xs outline-none ${
                        shippingErrors.lastName ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                      }`}
                    />
                    {shippingErrors.lastName && (
                      <p className="mt-1 text-[11px] text-red-600">{shippingErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) => {
                        setShippingForm({ ...shippingForm, email: e.target.value });
                        if (shippingErrors.email) setShippingErrors({ ...shippingErrors, email: '' });
                      }}
                      className={`w-full px-3 py-2 text-xs border rounded-xs outline-none ${
                        shippingErrors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                      }`}
                    />
                    {shippingErrors.email && (
                      <p className="mt-1 text-[11px] text-red-600">{shippingErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={shippingForm.phone}
                      onChange={(e) => {
                        setShippingForm({ ...shippingForm, phone: e.target.value });
                        if (shippingErrors.phone) setShippingErrors({ ...shippingErrors, phone: '' });
                      }}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-3 py-2 text-xs border rounded-xs outline-none ${
                        shippingErrors.phone ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                      }`}
                    />
                    {shippingErrors.phone && (
                      <p className="mt-1 text-[11px] text-red-600">{shippingErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingForm.address}
                    onChange={(e) => {
                      setShippingForm({ ...shippingForm, address: e.target.value });
                      if (shippingErrors.address) setShippingErrors({ ...shippingErrors, address: '' });
                    }}
                    placeholder="House number and street name"
                    className={`w-full px-3 py-2 text-xs border rounded-xs outline-none ${
                      shippingErrors.address ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                    }`}
                  />
                  {shippingErrors.address && (
                    <p className="mt-1 text-[11px] text-red-600">{shippingErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingForm.city}
                      onChange={(e) => {
                        setShippingForm({ ...shippingForm, city: e.target.value });
                        if (shippingErrors.city) setShippingErrors({ ...shippingErrors, city: '' });
                      }}
                      className={`w-full px-3 py-2 text-xs border rounded-xs outline-none ${
                        shippingErrors.city ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                      }`}
                    />
                    {shippingErrors.city && (
                      <p className="mt-1 text-[11px] text-red-600">{shippingErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">State / Province</label>
                    <input
                      type="text"
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287]"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingForm.postalCode}
                      onChange={(e) => {
                        setShippingForm({ ...shippingForm, postalCode: e.target.value });
                        if (shippingErrors.postalCode) setShippingErrors({ ...shippingErrors, postalCode: '' });
                      }}
                      className={`w-full px-3 py-2 text-xs border rounded-xs outline-none ${
                        shippingErrors.postalCode ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                      }`}
                    />
                    {shippingErrors.postalCode && (
                      <p className="mt-1 text-[11px] text-red-600">{shippingErrors.postalCode}</p>
                    )}
                  </div>
                </div>

                {/* Shipping Method Options */}
                <div className="pt-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Delivery Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3 border rounded-xs cursor-pointer flex items-center justify-between transition-colors ${
                        shippingMethod === 'standard'
                          ? 'border-[#048287] bg-[#f0f9f9]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-[#048287]"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-800">Standard Delivery</p>
                          <p className="text-[11px] text-gray-500">3-5 Business Days</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#048287]">
                        {cartSubtotal > 100 ? 'FREE' : '$5.00'}
                      </span>
                    </label>

                    <label
                      className={`p-3 border rounded-xs cursor-pointer flex items-center justify-between transition-colors ${
                        shippingMethod === 'express'
                          ? 'border-[#048287] bg-[#f0f9f9]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-[#048287]"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-800">Express Delivery</p>
                          <p className="text-[11px] text-gray-500">1-2 Business Days</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#048287]">$15.00</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#048287] hover:bg-[#036b6f] text-white py-3 font-['Lato'] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>

              {/* Order Summary Sidebar Right */}
              <div className="lg:col-span-5 bg-gray-50 p-5 rounded-xs border border-gray-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-['Lato'] font-bold text-xs text-[#222222] uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                    Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
                  </h4>

                  <div className="max-h-52 overflow-y-auto space-y-3 pr-1 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-12 object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">{item.title}</p>
                          <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Application */}
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    {appliedVoucher ? (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xs flex items-center justify-between text-xs text-emerald-800">
                        <div className="flex items-center gap-1.5">
                          <Tag size={14} />
                          <span className="font-bold">{appliedVoucher.code}</span>
                          <span>({appliedVoucher.description})</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeVoucher}
                          className="text-red-500 hover:text-red-700 text-[11px] font-semibold underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Promo code (e.g. RANGO10)"
                          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-xs outline-none uppercase font-mono"
                        />
                        <button
                          type="submit"
                          className="bg-[#222222] hover:bg-[#048287] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
                  </div>
                </div>

                {/* Subtotal calculations */}
                <div className="pt-4 border-t border-gray-200 mt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax (5%)</span>
                    <span>${taxCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#048287] pt-2 border-t border-gray-200">
                    <span>Total Due</span>
                    <span>${finalGrandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form onSubmit={handlePaymentSubmit} className="lg:col-span-7 space-y-4" noValidate>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CreditCard size={18} className="text-[#048287]" />
                    <h4 className="font-['Lato'] font-bold text-sm text-[#222222] uppercase tracking-wider">
                      Select Payment Method
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#048287] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Edit Shipping</span>
                  </button>
                </div>

                {/* Payment Options Radio Tabs */}
                <div className="space-y-3">
                  {/* Credit / Debit Card Option */}
                  <label
                    className={`block p-3.5 border rounded-xs cursor-pointer transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#048287] bg-white ring-1 ring-[#048287]'
                        : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-[#048287]"
                        />
                        <span className="text-xs font-bold text-gray-800">Credit or Debit Card</span>
                      </div>
                      <div className="flex gap-1.5 text-[10px] font-semibold text-gray-600">
                        <span className="px-1.5 py-0.5 bg-gray-200 rounded-xs">VISA</span>
                        <span className="px-1.5 py-0.5 bg-gray-200 rounded-xs">MASTERCARD</span>
                        <span className="px-1.5 py-0.5 bg-gray-200 rounded-xs">AMEX</span>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Name on Card <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardForm.cardholderName}
                            onChange={(e) => {
                              setCardForm({ ...cardForm, cardholderName: e.target.value });
                              if (cardErrors.cardholderName) setCardErrors({ ...cardErrors, cardholderName: '' });
                            }}
                            placeholder="e.g. John Doe"
                            className={`w-full px-3 py-2 text-xs border rounded-xs outline-none ${
                              cardErrors.cardholderName ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                            }`}
                          />
                          {cardErrors.cardholderName && (
                            <p className="mt-1 text-[11px] text-red-600">{cardErrors.cardholderName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardForm.cardNumber}
                              maxLength={19}
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                setCardForm({ ...cardForm, cardNumber: formatted });
                                if (cardErrors.cardNumber) setCardErrors({ ...cardErrors, cardNumber: '' });
                              }}
                              placeholder="4242 4242 4242 4242"
                              className={`w-full pl-3 pr-10 py-2 text-xs border rounded-xs outline-none font-mono ${
                                cardErrors.cardNumber ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                              }`}
                            />
                            <CreditCard size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                          </div>
                          {cardErrors.cardNumber && (
                            <p className="mt-1 text-[11px] text-red-600">{cardErrors.cardNumber}</p>
                          )}
                          <p className="text-[10px] text-gray-400 mt-1">
                            For testing card decline, enter card ending in <strong>0000</strong> or CVV <strong>000</strong>.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Expiry Date (MM/YY) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              maxLength={5}
                              value={cardForm.expiryDate}
                              onChange={(e) => {
                                const formatted = formatExpiry(e.target.value);
                                setCardForm({ ...cardForm, expiryDate: formatted });
                                if (cardErrors.expiryDate) setCardErrors({ ...cardErrors, expiryDate: '' });
                              }}
                              placeholder="12/28"
                              className={`w-full px-3 py-2 text-xs border rounded-xs outline-none font-mono ${
                                cardErrors.expiryDate ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                              }`}
                            />
                            {cardErrors.expiryDate && (
                              <p className="mt-1 text-[11px] text-red-600">{cardErrors.expiryDate}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Security Code (CVV) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                maxLength={4}
                                value={cardForm.cvv}
                                onChange={(e) => {
                                  const v = e.target.value.replace(/[^0-9]/g, '');
                                  setCardForm({ ...cardForm, cvv: v });
                                  if (cardErrors.cvv) setCardErrors({ ...cardErrors, cvv: '' });
                                }}
                                placeholder="123"
                                className={`w-full pl-3 pr-8 py-2 text-xs border rounded-xs outline-none font-mono ${
                                  cardErrors.cvv ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#048287]'
                                }`}
                              />
                              <Lock size={14} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
                            </div>
                            {cardErrors.cvv && (
                              <p className="mt-1 text-[11px] text-red-600">{cardErrors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* PayPal Option */}
                  <label
                    className={`block p-3.5 border rounded-xs cursor-pointer transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'border-[#048287] bg-white ring-1 ring-[#048287]'
                        : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="accent-[#048287]"
                        />
                        <span className="text-xs font-bold text-gray-800">PayPal Express Checkout</span>
                      </div>
                      <span className="text-[11px] font-bold text-blue-600">PayPal</span>
                    </div>
                    {paymentMethod === 'paypal' && (
                      <p className="text-xs text-gray-500 mt-2 pl-6">
                        You will authenticate securely with PayPal during order completion.
                      </p>
                    )}
                  </label>

                  {/* Cash On Delivery Option */}
                  <label
                    className={`block p-3.5 border rounded-xs cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#048287] bg-white ring-1 ring-[#048287]'
                        : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="accent-[#048287]"
                        />
                        <span className="text-xs font-bold text-gray-800">Cash On Delivery (COD)</span>
                      </div>
                      <span className="text-[11px] text-gray-500">Pay when delivered</span>
                    </div>
                    {paymentMethod === 'cod' && (
                      <p className="text-xs text-gray-500 mt-2 pl-6">
                        Please prepare the exact cash amount (${finalGrandTotal.toFixed(2)}) for the delivery courier.
                      </p>
                    )}
                  </label>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#048287] hover:bg-[#036b6f] text-white py-3 font-['Lato'] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock size={14} />
                    <span>Pay ${finalGrandTotal.toFixed(2)} Now</span>
                  </button>
                </div>
              </form>

              {/* Review Sidebar Right */}
              <div className="lg:col-span-5 bg-gray-50 p-5 rounded-xs border border-gray-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-['Lato'] font-bold text-xs text-[#222222] uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                    Shipment Destination
                  </h4>
                  <div className="text-xs text-gray-600 space-y-1 mb-4">
                    <p className="font-bold text-gray-800">
                      {shippingForm.firstName} {shippingForm.lastName}
                    </p>
                    <p>{shippingForm.address}</p>
                    <p>
                      {shippingForm.city}, {shippingForm.state} {shippingForm.postalCode}
                    </p>
                    <p>{shippingForm.email} &bull; {shippingForm.phone}</p>
                  </div>

                  <h4 className="font-['Lato'] font-bold text-xs text-[#222222] uppercase tracking-wider mb-2 pb-2 border-b border-gray-200">
                    Summary Breakdown
                  </h4>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount ({appliedVoucher?.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping ({shippingMethod})</span>
                      <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${taxCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="flex justify-between text-base font-bold text-[#048287]">
                    <span>Total Amount</span>
                    <span>${finalGrandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING OVERLAY */}
          {step === 3 && (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-[#048287]/20 border-t-[#048287] rounded-full animate-spin" />
                <Lock size={20} className="absolute inset-0 m-auto text-[#048287]" />
              </div>
              <h3 className="font-['Lato'] font-bold text-lg text-[#222222] uppercase tracking-wider mb-2">
                Processing Secure Payment
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mb-4">{processingStatus}</p>
              <p className="text-[11px] text-gray-400">Please do not close or refresh this window.</p>
            </div>
          )}

          {/* STEP 4: ORDER SUCCESS */}
          {step === 4 && completedOrder && (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={36} />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#048287] mb-1">
                Order Confirmed
              </span>
              <h2 className="font-['Lato'] font-bold text-2xl text-[#222222] mb-2">
                Thank You For Your Purchase!
              </h2>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Your order <strong>#{completedOrder.id}</strong> has been successfully placed. A confirmation email has been dispatched to <strong>{completedOrder.shipping?.email}</strong>.
              </p>

              {/* Order Quick Summary Card */}
              <div className="w-full bg-gray-50 p-4 rounded-xs border border-gray-200 text-left text-xs mb-6 space-y-2">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Order Reference</span>
                  <span className="font-bold text-gray-800">#{completedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Payment Status</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Check size={12} /> Paid (${completedOrder.total?.toFixed(2)})
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Delivery Method</span>
                  <span className="font-semibold text-gray-800 capitalize">
                    {completedOrder.shippingMethod} Delivery
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-500">Estimated Delivery</span>
                  <span className="font-semibold text-gray-800">3-5 Business Days</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => {
                    closeCheckout();
                    window.print();
                  }}
                  className="w-full sm:w-1/2 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
                >
                  Print Receipt
                </button>
                <button
                  type="button"
                  onClick={closeCheckout}
                  className="w-full sm:w-1/2 py-2.5 bg-[#048287] hover:bg-[#036b6f] text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors shadow-xs"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: PAYMENT FAILURE */}
          {step === 5 && (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={36} />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">
                Transaction Declined
              </span>
              <h2 className="font-['Lato'] font-bold text-xl text-[#222222] mb-2">
                Payment Could Not Be Completed
              </h2>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                {failureReason ||
                  'The payment gateway declined this transaction. Please verify your billing information or try another card.'}
              </p>

              <div className="w-full bg-red-50/50 border border-red-200 p-4 rounded-xs text-xs text-red-800 text-left mb-6">
                <p className="font-bold mb-1">Troubleshooting Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-600">
                  <li>Ensure your card number, expiry date and CVV are accurate.</li>
                  <li>Check that your card has sufficient available credit or balance.</li>
                  <li>Alternatively, select Cash on Delivery or another payment option.</li>
                </ul>
              </div>

              <div className="flex items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 bg-[#048287] hover:bg-[#036b6f] text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  <span>Try Again / Change Payment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
