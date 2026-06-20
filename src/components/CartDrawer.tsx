import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBasket, Trash2, Plus, Minus, Send, Share2, Sparkles, Receipt } from "lucide-react";
import { CartItem, Product } from "../types";
import { STORE_INFO } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (product: Product) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onClearCart
}: CartDrawerProps) {
  // Compute calculation totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const savedAmount = cartItems.reduce((total, item) => {
    if (item.product.originalPrice) {
      const savingPerItem = item.product.originalPrice - item.product.price;
      return total + savingPerItem * item.quantity;
    }
    return total;
  }, 0);

  // Delivery Threshold Calculation (Free delivery above ₹200)
  const deliveryCharges = subtotal > 200 || subtotal === 0 ? 0 : 30;

  const totalAmount = subtotal + deliveryCharges;

  // Build the precomposed WhatsApp Message link
  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    let itemsMessage = "";
    cartItems.forEach((item, index) => {
      itemsMessage += `${index + 1}. *${item.product.name}* (${item.product.unit})\n   Qty: ${item.quantity} x ₹${item.product.price} = ₹${item.product.price * item.quantity}\n`;
    });

    const fullMessage =
      `*NEW ORDER FROM SURYA KIRANA STORE WEBSITE*\n` +
      `----------------------------------------\n` +
      `नमस्कार! I'd like to place an order for delivery:\n\n` +
      `🛒 *ORDER DESCRIPTION:*\n${itemsMessage}\n` +
      `💵 *BILL BILL BREAKDOWN:*\n` +
      `- Items Subtotal: ₹${subtotal}\n` +
      `- Delivery Charge: ${deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}\n` +
      `- *Total Amount: ₹${totalAmount}*\n` +
      `- *Total Savings (You Saved): ₹${savedAmount}* 🎉\n` +
      `----------------------------------------\n` +
      `Please confirm the order and dispatch details. Thank you!`;

    const encodedText = encodeURIComponent(fullMessage);
    const whatsappLink = `https://wa.me/917004410152?text=${encodedText}`;
    
    // Open in separate safe tab
    window.open(whatsappLink, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
          ></motion.div>

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header section of Cart Drawer */}
            <div className="p-5 border-b border-orange-50 bg-gradient-to-r from-orange-50 to-amber-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-100 rounded-xl text-orange-600">
                  <ShoppingBasket className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-base text-gray-950">Your Basket</h3>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider block mt-0.5">
                    {cartItems.length} Products Configured
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors focus:outline-none"
                    title="Empty Entire Basket"
                    id="btn-clear-cart"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 bg-white/95 hover:bg-gray-150 text-gray-500 rounded-xl transition border border-gray-100 focus:outline-none"
                  title="Close Basket"
                  id="btn-close-cart-drawer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Scrollable products list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {cartItems.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-orange-100/50">
                    <ShoppingBasket className="w-8 h-8 text-orange-300" />
                  </div>
                  <h4 className="font-display font-bold text-base text-gray-900">Your basket is empty</h4>
                  <p className="text-xs text-gray-550 max-w-xs mt-1 leading-normal">
                    Add standard staples, fine sweets, high fragrant agarbatti, or pure daily milk into your catalog list to start building your order invoices.
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold font-display uppercase tracking-wider transition shadow-sm cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-gray-50/50 rounded-2xl p-3 border border-orange-100/20 flex gap-3.5 items-center justify-between hover:border-orange-100 transition-colors"
                    >
                      {/* Product image mini */}
                      <div className="w-14 h-14 bg-white border border-gray-100 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover referrer-policy"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & controls details */}
                      <div className="flex-1">
                        <span className="text-[10px] text-gray-400 font-semibold bg-white border border-gray-100 px-1.5 py-0.5 rounded-md">
                          {item.product.unit}
                        </span>
                        <h5 className="font-display font-extrabold text-sm text-gray-955 line-clamp-1 mt-1 leading-none">
                          {item.product.name}
                        </h5>
                        <p className="text-xs text-amber-600 font-bold mt-1.5 leading-none">
                          ₹{item.product.price}
                        </p>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center bg-white border border-gray-200 text-gray-800 rounded-xl font-bold p-1 shrink-0 shadow-3xs">
                        <button
                          onClick={() => onRemoveFromCart(item.product)}
                          className="p-1 hover:text-red-500 transition-colors"
                          title="Reduce Volume"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-display text-xs text-gray-900 min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(item.product)}
                          className="p-1 hover:text-orange-500 transition-colors"
                          title="Increase Volume"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bill detail and Whatsapp trigger action */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-orange-50 bg-amber-50/20 space-y-4">
                
                {/* Savings celebratory callouts */}
                {savedAmount > 0 && (
                  <div className="bg-green-100/50 border border-green-200 rounded-xl p-3 text-xs text-green-850 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-600 animate-pulse shrink-0" />
                    <span>Your sunburst discounts saved you <strong>₹{savedAmount}</strong> today!</span>
                  </div>
                )}

                {/* Subtotals table details */}
                <div className="space-y-2 border-b border-dashed border-orange-105 pb-3.5">
                  <div className="flex justify-between items-center text-xs text-gray-500 font-semibold">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 font-semibold">
                    <span>Delivery Charges</span>
                    <span>{deliveryCharges === 0 ? <strong className="text-green-600 font-extrabold uppercase">FREE</strong> : `₹${deliveryCharges}`}</span>
                  </div>
                  {deliveryCharges > 0 && (
                    <p className="text-[10px] text-gray-450 leading-none">
                      Add items worth *₹{200 - subtotal}* more to claim <strong className="text-orange-600">FREE DELIVERY</strong>.
                    </p>
                  )}
                  {subtotal > 200 && (
                    <div className="text-[10px] text-green-600 font-extrabold uppercase flex items-center gap-1">
                      🛡️ Free Local Delivery Level Reached!
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pb-2">
                  <span className="font-display font-extrabold text-sm text-gray-950 flex items-center gap-1">
                    <Receipt className="w-4 h-4 text-orange-500" /> Grand Total
                  </span>
                  <span className="font-display font-black text-xl text-gray-955">
                    ₹{totalAmount}
                  </span>
                </div>

                {/* WhatsApp Place Order CTA button */}
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-display font-bold text-sm rounded-xl cursor-pointer transition shadow-md hover:shadow-orange-500/20 flex items-center justify-center gap-2 uppercase tracking-wide"
                  id="btn-basket-whatsapp-checkout"
                >
                  <Send className="w-4 h-4" /> Place Order via WhatsApp
                </button>
                <p className="text-[10px] text-gray-400 text-center leading-none">
                  Your billing list will be parsed & opened inside secure WhatsApp client instantly.
                </p>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
