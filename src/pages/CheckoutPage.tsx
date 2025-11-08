/**
 * CheckoutPage Component
 *
 * Multi-step checkout process with elegant design.
 * Steps: Cart Review → Shipping → Payment → Confirmation
 *
 * @component
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Truck, CreditCard, CheckCircle, X } from 'lucide-react';
import { storage } from '../utils/storage';
import type { CartItem } from '../types';

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    setCartItems(storage.getCart());
    
    const handleUpdate = () => {
      setCartItems(storage.getCart());
    };

    window.addEventListener('cart-updated', handleUpdate);
    return () => window.removeEventListener('cart-updated', handleUpdate);
  }, []);

  const steps = [
    { id: 'cart' as CheckoutStep, label: 'Cart', icon: ShoppingBag },
    { id: 'shipping' as CheckoutStep, label: 'Shipping', icon: Truck },
    { id: 'payment' as CheckoutStep, label: 'Payment', icon: CreditCard },
    { id: 'confirmation' as CheckoutStep, label: 'Complete', icon: CheckCircle },
  ];

  const getCurrentStepIndex = () => steps.findIndex((s) => s.id === currentStep);

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  const shipping = subtotal >= 75 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleRemoveItem = (id: string, size?: string) => {
    storage.removeFromCart(id, size);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number, size?: string) => {
    storage.updateCartQuantity(id, newQuantity, size);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('confirmation');
    // Clear cart after successful order
    storage.clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="text-2xl md:text-3xl font-light tracking-wider">
            LUXE
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCurrent = step.id === currentStep;
              const isCompleted = index < getCurrentStepIndex();
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-black text-white'
                          : isCurrent
                          ? 'bg-black text-white ring-4 ring-gray-200'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isCurrent ? 'text-black' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-colors duration-300 ${
                        isCompleted ? 'bg-black' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Step Content */}
          <div className="lg:col-span-2">
            {/* Cart Step */}
            {currentStep === 'cart' && (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-light mb-6">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Link
                      to="/catalog"
                      className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.id}-${item.size || 'default'}`}
                          className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded overflow-hidden flex-shrink-0">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                LUXE
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm mb-1 truncate">{item.name}</h3>
                            {item.size && <p className="text-xs text-gray-500 mb-2">{item.size}</p>}
                            <div className="flex items-center gap-3">
                              <select
                                value={item.quantity}
                                onChange={(e) =>
                                  handleUpdateQuantity(item.id, parseInt(e.target.value), item.size)
                                }
                                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                              <span className="text-sm font-medium">${item.price}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.size)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentStep('shipping')}
                      disabled={cartItems.length === 0}
                      className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Proceed to Shipping
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Shipping Step */}
            {currentStep === 'shipping' && (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-light mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        Country
                      </label>
                      <select
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('cart')}
                      className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-light mb-6">Payment Information</h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                      }
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      required
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                        }
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mt-6">
                    <p className="text-xs text-gray-600">
                      Your payment information is encrypted and secure. We never store your full credit card details.
                    </p>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Complete Order
                      <CheckCircle size={20} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Confirmation Step */}
            {currentStep === 'confirmation' && (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-light mb-3">Order Complete!</h2>
                <p className="text-gray-600 mb-8">
                  Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-700">Order Number</span>
                    <span className="text-sm font-mono">#LUXE{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Confirmation Email</span>
                    <span className="text-sm text-gray-600">{shippingInfo.email}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/"
                    className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="flex-1 bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          {currentStep !== 'confirmation' && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-2xl font-light">${total.toFixed(2)}</span>
                </div>
                {subtotal < 75 && (
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

