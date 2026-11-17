import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../data/mockData';
import { authApi } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initial cart items from mock data
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rango_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse cart from storage:', e);
    }
    return [
      {
        ...mockData.featuredProducts.bestSeller[0],
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Olive'
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('rango_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse wishlist from storage:', e);
    }
    return [mockData.featuredProducts.bestSeller[3]];
  });

  // User Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rango_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse user from storage:', e);
    }
    return null;
  });

  // Registered users database in localStorage for mock persistence
  const getRegisteredUsers = () => {
    try {
      const saved = localStorage.getItem('rango_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('rango_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers Visibility State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin'); // 'signin' | 'signup' | 'forgot'
  const [isGiftVoucherOpen, setIsGiftVoucherOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Voucher / Promo code applied to cart
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  // Synchronize cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rango_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('rango_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [wishlist]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity,
          selectedSize: options.selectedSize || 'M',
          selectedColor: options.selectedColor || 'Default'
        }
      ];
    });
    showToast(`Added "${product.title}" to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed item from cart.');
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
    localStorage.removeItem('rango_cart');
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.title}" from wishlist.`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Added "${product.title}" to wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  // Authentication Handlers
  const openAuthModal = (tab = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async ({ emailOrUsername, password, rememberMe = true }) => {
    // 1. Attempt Backend API integration
    const apiResult = await authApi.login({ email: emailOrUsername, password });

    if (apiResult.success && apiResult.data?.user) {
      const authUser = apiResult.data.user;
      setUser(authUser);
      if (rememberMe) {
        localStorage.setItem('rango_auth_user', JSON.stringify(authUser));
      }
      showToast(`Welcome back, ${authUser.name || authUser.email}!`);
      closeAuthModal();
      return { success: true, user: authUser };
    }

    // 2. Client-side verified fallback (if backend endpoint is unreachable or in demo mode)
    const registeredUsers = getRegisteredUsers();
    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === emailOrUsername.toLowerCase() && u.password === password
    );

    // Default demo account
    const isDemoAdmin =
      emailOrUsername.toLowerCase() === 'admin@rango.com' &&
      password === 'demo123';

    if (existing || isDemoAdmin) {
      const authUser = existing
        ? { id: existing.id, name: existing.name, email: existing.email, role: 'Customer' }
        : { id: 'admin-01', name: 'Demo Admin', email: 'admin@rango.com', role: 'Administrator' };

      setUser(authUser);
      if (rememberMe) {
        localStorage.setItem('rango_auth_user', JSON.stringify(authUser));
      }
      showToast(`Welcome back, ${authUser.name}!`);
      closeAuthModal();
      return { success: true, user: authUser };
    }

    // If backend was reachable and returned invalid credentials
    if (apiResult.fromBackend && !apiResult.success) {
      return { success: false, error: apiResult.error || 'Invalid email or password.' };
    }

    // Fallback: If credentials don't match any registered or demo user
    return {
      success: false,
      error: 'Invalid credentials. Use demo: admin@rango.com / demo123, or create a new account.'
    };
  };

  const register = async ({ name, email, password }) => {
    // 1. Attempt Backend API integration
    const apiResult = await authApi.register({ name, email, password });

    if (apiResult.success && apiResult.data?.user) {
      const newUser = apiResult.data.user;
      setUser(newUser);
      localStorage.setItem('rango_auth_user', JSON.stringify(newUser));
      showToast(`Account created successfully! Welcome, ${newUser.name}.`);
      closeAuthModal();
      return { success: true, user: newUser };
    }

    // 2. Client-side verified fallback: save to localStorage registered users
    const registeredUsers = getRegisteredUsers();
    const alreadyExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password,
      role: 'Customer',
      createdAt: new Date().toISOString()
    };

    registeredUsers.push(newUser);
    localStorage.setItem('rango_registered_users', JSON.stringify(registeredUsers));

    const userProfile = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setUser(userProfile);
    localStorage.setItem('rango_auth_user', JSON.stringify(userProfile));

    showToast(`Account created successfully! Welcome, ${newUser.name}.`);
    closeAuthModal();
    return { success: true, user: userProfile };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rango_auth_user');
    showToast('You have been signed out.');
  };

  // Orders Management
  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: orderData.id || `RNG-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Processing'
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('rango_orders', JSON.stringify(updated));
      return updated;
    });
    return newOrder;
  };

  // Voucher Operations
  const applyVoucher = (code) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'RANGO10' || normalized === 'SAVE10') {
      const v = { code: normalized, type: 'percent', discount: 10, description: '10% Off' };
      setAppliedVoucher(v);
      showToast('Coupon "RANGO10" applied! 10% discount added.');
      return { success: true, voucher: v };
    } else if (normalized === 'RANGO20' || normalized === 'SAVE20') {
      const v = { code: normalized, type: 'percent', discount: 20, description: '20% Off' };
      setAppliedVoucher(v);
      showToast('Coupon "RANGO20" applied! 20% discount added.');
      return { success: true, voucher: v };
    } else if (normalized === 'GIFT25' || normalized === 'GIFT50') {
      const amount = normalized === 'GIFT25' ? 25 : 50;
      const v = { code: normalized, type: 'fixed', discount: amount, description: `$${amount} Gift Voucher` };
      setAppliedVoucher(v);
      showToast(`Gift voucher "${normalized}" applied! $${amount} off.`);
      return { success: true, voucher: v };
    } else {
      return { success: false, error: 'Invalid voucher or promotional code.' };
    }
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    showToast('Voucher removed.');
  };

  // Checkout modal controls
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // Derived Totals
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.type === 'percent') {
      discountAmount = (rawSubtotal * appliedVoucher.discount) / 100;
    } else if (appliedVoucher.type === 'fixed') {
      discountAmount = Math.min(appliedVoucher.discount, rawSubtotal);
    }
  }

  const cartSubtotal = rawSubtotal;
  const cartTotal = Math.max(0, rawSubtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        // Cart
        cart,
        cartCount,
        cartSubtotal,
        cartTotal,
        discountAmount,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,

        // Modals & Drawers
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        isGiftVoucherOpen,
        setIsGiftVoucherOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout,
        closeCheckout,
        isOrdersModalOpen,
        setIsOrdersModalOpen,

        // User Auth
        user,
        login,
        register,
        logout,

        // Orders
        orders,
        addOrder,

        // Toast
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
