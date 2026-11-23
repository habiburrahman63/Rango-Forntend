import React from 'react';
import { X, Package, Clock, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrdersModal() {
  const { isOrdersModalOpen, setIsOrdersModalOpen, orders } = useCart();

  if (!isOrdersModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOrdersModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-2xl shadow-2xl rounded-xs overflow-hidden z-10 my-8 border border-gray-100 flex flex-col max-h-[90vh] animate-modal-3d preserve-3d">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-2">
            <Package size={20} className="text-[#048287]" />
            <h3 className="font-['Lato'] font-bold text-base text-[#222222] tracking-wider uppercase">
              My Orders &amp; Purchases ({orders.length})
            </h3>
          </div>
          <button
            onClick={() => setIsOrdersModalOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-6">
          {orders.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <ShoppingBag size={48} className="stroke-[1.2] mx-auto mb-3 text-gray-300" />
              <p className="text-sm font-medium text-gray-700 mb-1">No Orders Found</p>
              <p className="text-xs text-gray-400 mb-4">
                You haven't placed any orders yet. Discover our collection!
              </p>
              <button
                type="button"
                onClick={() => setIsOrdersModalOpen(false)}
                className="bg-[#048287] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Browse Store
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-xs p-4 bg-gray-50/50 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2 text-xs">
                    <div>
                      <span className="font-bold text-gray-900">Order #{order.id}</span>
                      <span className="text-gray-400 ml-2">&bull; {order.date || 'Recent'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-xs flex items-center gap-1">
                        <CheckCircle2 size={11} />
                        {order.status || 'Processing'}
                      </span>
                      <span className="font-bold text-[#048287] text-sm">
                        ${order.total?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-8 h-10 object-cover border border-gray-200 flex-shrink-0"
                            />
                          )}
                          <span className="text-gray-700 truncate">{item.title}</span>
                          <span className="text-gray-400">x{item.quantity}</span>
                        </div>
                        <span className="font-medium text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery info */}
                  <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center justify-between text-[11px] text-gray-500">
                    <span>
                      Delivery: <strong className="text-gray-700">{order.shipping?.address}, {order.shipping?.city}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-[#048287]">
                      <Clock size={12} />
                      Estimated: 3-5 Business Days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
