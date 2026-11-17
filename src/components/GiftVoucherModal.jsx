import React, { useState } from 'react';
import { X, Gift, CheckCircle2, AlertCircle, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function GiftVoucherModal() {
  const { isGiftVoucherOpen, setIsGiftVoucherOpen, applyVoucher, showToast } = useCart();
  const [activeTab, setActiveTab] = useState('check'); // 'check' | 'purchase'

  // Check Balance State
  const [voucherCode, setVoucherCode] = useState('');
  const [checkedVoucher, setCheckedVoucher] = useState(null);
  const [checkError, setCheckError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  // Purchase Voucher State
  const [purchaseForm, setPurchaseForm] = useState({
    recipientName: '',
    recipientEmail: '',
    amount: '50',
    message: ''
  });
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  if (!isGiftVoucherOpen) return null;

  const handleCheckBalance = (e) => {
    e.preventDefault();
    setCheckError('');
    setCheckedVoucher(null);

    const code = voucherCode.trim().toUpperCase();
    if (!code) {
      setCheckError('Please enter a voucher code.');
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      if (code === 'GIFT25') {
        setCheckedVoucher({ code: 'GIFT25', balance: 25.0, status: 'Active', expiry: 'Dec 31, 2026' });
      } else if (code === 'GIFT50') {
        setCheckedVoucher({ code: 'GIFT50', balance: 50.0, status: 'Active', expiry: 'Dec 31, 2026' });
      } else if (code === 'RANGO10' || code === 'RANGO20') {
        setCheckedVoucher({
          code,
          balance: code === 'RANGO10' ? '10% Discount' : '20% Discount',
          status: 'Active Promotional Coupon',
          expiry: 'Valid Today'
        });
      } else {
        setCheckError('Voucher code not found or already redeemed.');
      }
    }, 600);
  };

  const handleApplyChecked = () => {
    if (checkedVoucher) {
      applyVoucher(checkedVoucher.code);
      setIsGiftVoucherOpen(false);
    }
  };

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    if (!purchaseForm.recipientName.trim() || !purchaseForm.recipientEmail.trim()) {
      showToast('Please fill in recipient name and email.');
      return;
    }
    setPurchaseSuccess(true);
    showToast(`Gift voucher for $${purchaseForm.amount} generated!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsGiftVoucherOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl rounded-xs overflow-hidden z-10 my-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-2">
            <Gift size={20} className="text-[#048287]" />
            <h3 className="font-['Lato'] font-bold text-base text-[#222222] tracking-wider uppercase">
              Rango Gift Voucher
            </h3>
          </div>
          <button
            onClick={() => setIsGiftVoucherOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => {
              setActiveTab('check');
              setPurchaseSuccess(false);
            }}
            className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'check'
                ? 'border-[#048287] text-[#048287] bg-white'
                : 'border-transparent text-gray-500 hover:text-[#222222]'
            }`}
          >
            Check Voucher Balance
          </button>
          <button
            onClick={() => {
              setActiveTab('purchase');
              setCheckError('');
            }}
            className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'purchase'
                ? 'border-[#048287] text-[#048287] bg-white'
                : 'border-transparent text-gray-500 hover:text-[#222222]'
            }`}
          >
            Send Digital Gift Card
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'check' ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Check the remaining balance or discount value on your physical or digital Rango gift card.
              </p>

              <form onSubmit={handleCheckBalance} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Enter Voucher or Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="e.g. GIFT25, GIFT50, RANGO10"
                      className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287] uppercase font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isChecking}
                      className="bg-[#048287] hover:bg-[#036b6f] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {isChecking ? 'Checking...' : 'Check'}
                    </button>
                  </div>
                </div>

                {checkError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xs flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{checkError}</span>
                  </div>
                )}
              </form>

              {/* Checked Result Box */}
              {checkedVoucher && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-700">Code: {checkedVoucher.code}</span>
                    <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-xs">
                      {checkedVoucher.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-800 text-sm font-bold pt-1">
                    <span>Available Value:</span>
                    <span>{typeof checkedVoucher.balance === 'number' ? `$${checkedVoucher.balance.toFixed(2)}` : checkedVoucher.balance}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">Expires: {checkedVoucher.expiry}</p>

                  <button
                    type="button"
                    onClick={handleApplyChecked}
                    className="w-full mt-2 bg-[#048287] hover:bg-[#036b6f] text-white py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Tag size={13} />
                    <span>Apply Voucher to Cart</span>
                  </button>
                </div>
              )}

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xs text-[11px] text-gray-500">
                <strong>Try demo codes:</strong> <code className="bg-gray-200 px-1 py-0.5 rounded">GIFT25</code> ($25 off), <code className="bg-gray-200 px-1 py-0.5 rounded">GIFT50</code> ($50 off), or <code className="bg-gray-200 px-1 py-0.5 rounded">RANGO10</code> (10% off).
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {purchaseSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <CheckCircle2 size={40} className="text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-base text-gray-800">Gift Voucher Sent!</h4>
                  <p className="text-xs text-gray-600">
                    A digital gift voucher for <strong>${purchaseForm.amount}</strong> has been emailed to <strong>{purchaseForm.recipientEmail}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPurchaseSuccess(false);
                      setIsGiftVoucherOpen(false);
                    }}
                    className="bg-[#048287] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePurchaseSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Recipient Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={purchaseForm.recipientName}
                      onChange={(e) => setPurchaseForm({ ...purchaseForm, recipientName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Recipient Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={purchaseForm.recipientEmail}
                      onChange={(e) => setPurchaseForm({ ...purchaseForm, recipientEmail: e.target.value })}
                      placeholder="e.g. sarah@example.com"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Gift Amount (USD)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['25', '50', '100', '200'].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setPurchaseForm({ ...purchaseForm, amount: amt })}
                          className={`py-2 text-xs font-bold border rounded-xs cursor-pointer ${
                            purchaseForm.amount === amt
                              ? 'border-[#048287] bg-[#048287] text-white'
                              : 'border-gray-200 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Personal Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={purchaseForm.message}
                      onChange={(e) => setPurchaseForm({ ...purchaseForm, message: e.target.value })}
                      placeholder="Write a warm note for the recipient..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#048287]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#048287] hover:bg-[#036b6f] text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Send ${purchaseForm.amount} Gift Card</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
