import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Calculator, 
  ReceiptText, 
  Send, 
  Trash2, 
  Plus, 
  User, 
  Phone, 
  Coins, 
  FileSpreadsheet, 
  Share2, 
  PlusCircle, 
  RefreshCw, 
  UserCheck, 
  Printer,
  Sparkles
} from "lucide-react";
import { CartItem } from "../types";
import { STORE_INFO } from "../data";

interface BillingDeskProps {
  cartItems: CartItem[];
  coins: number;
}

export default function BillingDesk({ cartItems, coins }: BillingDeskProps) {
  // Calculator Status
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcHistory, setCalcHistory] = useState("");
  const [hasEvaluated, setHasEvaluated] = useState(false);

  // Billing Items tape
  interface CustomBillItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

  const [billItems, setBillItems] = useState<CustomBillItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  
  // Custom manual entry
  const [manualName, setManualName] = useState("");
  const [manualPrice, setManualPrice] = useState("");

  const [extraDiscount, setExtraDiscount] = useState<number>(0);

  // Sync with store checkout cart items initially
  useEffect(() => {
    if (cartItems.length > 0) {
      const parsedItems: CustomBillItem[] = cartItems.map((item) => ({
        id: item.product.id,
        name: `${item.product.name} (${item.product.unit})`,
        price: item.product.price,
        quantity: item.quantity
      }));
      setBillItems(parsedItems);
    }
  }, [cartItems]);

  // Calculator button press handler
  const handleCalcPress = (val: string) => {
    if (val === "C") {
      setCalcDisplay("0");
      setCalcHistory("");
      setHasEvaluated(false);
      return;
    }

    if (val === "DEL") {
      if (calcDisplay.length > 1) {
        setCalcDisplay(calcDisplay.slice(0, -1));
      } else {
        setCalcDisplay("0");
      }
      return;
    }

    if (val === "=") {
      try {
        // Safe evaluation of mathematical expressions using standard JS without eval security issues (only safe operators matched)
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.]/g, "");
        // eslint-disable-next-line no-new-func
        const result = new Function(`return ${sanitized}`)();
        setCalcHistory(calcDisplay + " =");
        setCalcDisplay(Number(result).toFixed(0).toString());
        setHasEvaluated(true);
      } catch (e) {
        setCalcDisplay("Error");
      }
      return;
    }

    // Replace initial zero
    if (calcDisplay === "0" && !["+", "-", "*", "/"].includes(val)) {
      setCalcDisplay(val);
    } else {
      setCalcDisplay(calcDisplay + val);
    }
    setHasEvaluated(false);
  };

  // Add the current calculated figure as a custom checkout item
  const handleAddCalcValueToBill = () => {
    const value = parseFloat(calcDisplay);
    if (isNaN(value) || value <= 0) {
      alert("Invalid calculation total to append of ₹" + calcDisplay);
      return;
    }

    const newItem: CustomBillItem = {
      id: "calc-" + Date.now(),
      name: `Custom Calculator Item (कैलकुलेटर आइटम)`,
      price: Math.round(value),
      quantity: 1
    };

    setBillItems([...billItems, newItem]);
    setCalcDisplay("0");
    setCalcHistory("");
  };

  // Add a fully custom item
  const handleAddManualItem = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(manualPrice);
    if (!manualName.trim() || isNaN(price) || price <= 0) {
      alert("Please fill in descriptive name and valid pricing!");
      return;
    }

    const newItem: CustomBillItem = {
      id: "manual-" + Date.now(),
      name: manualName.trim(),
      price: Math.round(price),
      quantity: 1
    };

    setBillItems([...billItems, newItem]);
    setManualName("");
    setManualPrice("");
  };

  // Delete individual item from active billing
  const handleDeleteItem = (id: string) => {
    setBillItems(billItems.filter(item => item.id !== id));
  };

  // Increment item quantity
  const handleIncrementQty = (id: string) => {
    setBillItems(billItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrement item quantity
  const handleDecrementQty = (id: string) => {
    setBillItems(billItems.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity - 1;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  // Empty bill
  const handleResetBill = () => {
    setBillItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setExtraDiscount(0);
  };

  // Bill totals computation
  const subtotal = billItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // High fidelity calculations
  // Discount is subtracted. Cap discount at the subtotal
  const discountVal = Math.min(extraDiscount, subtotal);
  const totalDue = Math.max(0, subtotal - discountVal);

  const handleWhatsAppBillDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (billItems.length === 0) {
      alert("Billing ledger is currently empty! Add grocery items or custom pricing estimates first.");
      return;
    }

    if (!customerPhone.trim()) {
      alert("Mandatory check: Customer mobile number is required to send bill on WhatsApp!");
      return;
    }

    // Clean customer phone (retained digits)
    const rawDigits = customerPhone.replace(/\D/g, "");
    if (rawDigits.length < 10) {
      alert("Malformed telephone number. Please enter a valid 10-digit Indian WhatsApp number!");
      return;
    }

    // Formulate a beautiful, premium, clean invoice message
    let itemsText = "";
    billItems.forEach((item, index) => {
      itemsText += `${index + 1}. *${item.name}*\n   Qty: ${item.quantity} x ₹${item.price} = ₹${item.price * item.quantity}\n`;
    });

    const liveToday = new Date();
    const formattedDate = liveToday.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) + " " + liveToday.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

    const invoiceText = 
      `🧾 *SURYA KIRANA STORE DIGITAL RECEIPT*\n` +
      `----------------------------------------\n` +
      `*Shop Owner:* ${STORE_INFO.owner}\n` +
      `*Contact:* ${STORE_INFO.phone}\n` +
      `*Bill Timestamp:* ${formattedDate}\n` +
      `----------------------------------------\n` +
      `👤 *CUSTOMER DETAIL:*\n` +
      `- *Name:* ${customerName.trim() || "Valued Neighbor"}\n` +
      `- *Mobile:* +91 ${rawDigits.slice(-10)}\n` +
      `----------------------------------------\n` +
      `🛒 *ITEMS LISTED:*\n` +
      `${itemsText}` +
      `----------------------------------------\n` +
      `💵 *NET STATEMENT BREAKDOWN:*\n` +
      `- Items Subtotal: ₹${subtotal}\n` +
      (discountVal > 0 ? `- Unlocked Discount: -₹${discountVal}\n` : "") +
      `- *GRAND TOTAL PAYABLE: ₹${totalDue}*\n` +
      `----------------------------------------\n` +
      `Thank you for buying fresh from Surya Kirana! 🙏\n` +
      `*Any changes/queries? Ping Owner Ankit at ${STORE_INFO.phone}*`;

    const encodedText = encodeURIComponent(invoiceText);
    
    // Country code prefixing (defaulting to 91 for Indian subscribers)
    const finalizedPhone = rawDigits.startsWith("91") && rawDigits.length > 10 ? rawDigits : `91${rawDigits.slice(-10)}`;
    
    const whatsappLink = `https://wa.me/${finalizedPhone}?text=${encodedText}`;
    
    // Launch secure tab
    window.open(whatsappLink, "_blank");
  };

  const calculatorButtons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C", "DEL"]
  ];

  return (
    <div className="bg-white min-h-[85vh] p-4 sm:p-6" id="digital-billing-system">
      <div className="text-center max-w-3xl mx-auto mb-6">
        <span className="text-orange-600 font-display font-extrabold text-xs uppercase tracking-wider block mb-1">
          Owner Portal & Billing Desk
        </span>
        <h2 className="font-display font-black text-xl sm:text-2xl text-gray-950 tracking-tight leading-none">
          Digital Calculator & WhatsApp Custom Billing (डिजिटल बिल)
        </h2>
        <p className="text-gray-500 text-[11px] mt-1.5 leading-normal">
          Direct calculation desk. Feed custom grocery parameters, add customer's phone number & submit their bills directly to WhatsApp!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMN 1: Digital calculator panel */}
        <div className="lg:col-span-5 bg-gray-50 rounded-3xl p-4 sm:p-5 border border-orange-100/30 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-150">
            <Calculator className="w-5 h-5 text-orange-550" />
            <span className="font-display font-black text-sm text-gray-900 uppercase tracking-tight">
              Aankda Calculator (हिसाब-किताब)
            </span>
          </div>

          {/* Calculator screen display */}
          <div className="bg-gray-950/98 rounded-2xl p-4 text-right font-mono flex flex-col justify-between shadow-inner h-28 border border-gray-800">
            <div className="text-[10px] text-gray-400 font-semibold tracking-wider h-4 overflow-hidden truncate">
              {calcHistory || "Surya calculation record"}
            </div>
            <div className="text-2xl sm:text-3xl text-yellow-400 font-black tracking-tight select-all">
              {calcDisplay}
            </div>
          </div>

          {/* Keyboard Grid */}
          <div className="grid grid-cols-4 gap-2">
            {calculatorButtons.map((row, rIdx) => (
              <React.Fragment key={rIdx}>
                {row.map((btn) => {
                  const isAction = ["C", "DEL"].includes(btn);
                  const isEqual = btn === "=";
                  const isOp = ["+", "-", "*", "/"].includes(btn);
                  
                  return (
                    <button
                      key={btn}
                      onClick={() => handleCalcPress(btn)}
                      className={`py-3.5 sm:py-4 rounded-xl font-mono text-sm font-black transition active:scale-95 cursor-pointer focus:outline-none ${
                        isAction 
                          ? "bg-red-50 hover:bg-red-100 text-red-500 border border-red-100" 
                          : isEqual 
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500 hover:blend text-white col-span-1 shadow-md" 
                          : isOp 
                          ? "bg-orange-105 hover:bg-orange-200 text-orange-700" 
                          : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-150"
                      } ${btn === "C" || btn === "DEL" ? "col-span-2" : ""}`}
                      id={`btn-calc-${btn}`}
                    >
                      {btn}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Add result to Invoice item binder */}
          <button
            onClick={handleAddCalcValueToBill}
            disabled={parseFloat(calcDisplay) <= 0 || isNaN(parseFloat(calcDisplay))}
            className={`w-full py-3 rounded-2xl font-display font-bold text-xs uppercase cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm ${
              parseFloat(calcDisplay) > 0 && !isNaN(parseFloat(calcDisplay))
                ? "bg-orange-600 hover:bg-orange-700 text-white"
                : "bg-gray-100 text-gray-400 border border-gray-150 cursor-not-allowed"
            }`}
            id="btn-add-calculator-val"
          >
            <PlusCircle className="w-4 h-4" /> Add Calculated Price to Bill
          </button>
        </div>

        {/* COLUMN 2: Checkout ledger & bill generator */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-orange-100 shadow-xl shadow-orange-500/5 space-y-4">
          <div className="flex items-center justify-between border-b border-orange-50 pb-3">
            <div className="flex items-center gap-2">
              <ReceiptText className="w-5 h-5 text-orange-550" />
              <span className="font-display font-black text-sm text-gray-900 uppercase tracking-tight">
                Bill Invoice Tape (रसीद पत्र)
              </span>
            </div>
            {billItems.length > 0 && (
              <button
                onClick={handleResetBill}
                className="text-[10px] uppercase font-bold text-red-500 flex items-center gap-1 border border-red-100 bg-red-50/50 px-2.5 py-1 rounded-lg hover:bg-red-50"
                id="btn-reset-invoice-bill"
              >
                <Trash2 className="w-3.5 h-3.5" /> Reset Bill
              </button>
            )}
          </div>

          {/* Ledger items list container */}
          <div className="max-h-52 overflow-y-auto border border-dashed border-gray-200 rounded-2xl p-3 space-y-2 bg-gray-50/30">
            {billItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 flex flex-col items-center justify-center">
                <ReceiptText className="w-8 h-8 text-orange-250 mb-2 animate-pulse" />
                <p className="text-xs font-bold text-gray-500 leading-none">No active billing items listed</p>
                <p className="text-[10px] text-gray-400 mt-1 max-w-[250px] leading-relaxed">
                  Add items from store cart dynamically, or compile mathematical prices on the calculator and tap "Add Calculated Price".
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {billItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-2.5 border border-orange-100/20 flex gap-3 mr-1 items-center justify-between"
                  >
                    <div className="flex-1">
                      <h4 className="font-display font-extrabold text-xs text-gray-950 line-clamp-1 block leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-amber-600 font-bold mt-0.5">
                        ₹{item.price} per unit
                      </p>
                    </div>

                    {/* Quantity controllers */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-gray-200 bg-white text-gray-800 rounded-lg p-1 font-bold shadow-3xs scale-90">
                        <button
                          onClick={() => handleDecrementQty(item.id)}
                          className="p-1 hover:text-red-500 text-xs focus:outline-none"
                          title="Reduce"
                        >
                          -
                        </button>
                        <span className="px-1 text-[11px] min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrementQty(item.id)}
                          className="p-1 hover:text-orange-500 text-xs focus:outline-none"
                          title="Increase"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1 text-red-400 hover:text-red-650 rounded hover:bg-red-50 transition shrink-0"
                        title="Remove Item"
                        id={`btn-del-bill-item-${idx}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Math sum */}
                    <span className="font-display font-black text-xs text-gray-955 self-center min-w-[50px] text-right">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Manual Pricing formulation fields form */}
          <form onSubmit={handleAddManualItem} className="bg-gray-50 rounded-2xl p-3 border border-orange-100/10 flex flex-col sm:flex-row gap-2.5 items-end">
            <div className="flex-1 w-full">
              <label className="text-[9px] uppercase font-bold text-gray-450 block mb-1">Item Name (सामान का नाम)</label>
              <input
                type="text"
                placeholder="e.g. Loose Chana Dal"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-orange-300"
                id="manual-item-name"
              />
            </div>
            <div className="w-full sm:w-28 shrink-0">
              <label className="text-[9px] uppercase font-bold text-gray-450 block mb-1">Price (₹ दाम)</label>
              <input
                type="number"
                placeholder="e.g. 75"
                value={manualPrice}
                onChange={(e) => setManualPrice(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-orange-300"
                id="manual-item-price"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-gray-900 text-white font-display font-medium text-xs px-4 py-1.5 rounded-xl cursor-pointer hover:bg-black uppercase self-end whitespace-nowrap shadow-sm h-[32px] flex items-center justify-center gap-1"
              id="btn-add-manual-bill-item"
            >
              Add Item
            </button>
          </form>

          {/* CUSTOMER INFO AND DISPATCH DETAILS (MANDATORY IN CONTRACT) */}
          <form onSubmit={handleWhatsAppBillDispatch} className="space-y-3 pt-2">
            <div className="bg-amber-50/25 border border-amber-100/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-1.5 pb-2 border-b border-orange-100/10 text-orange-700">
                <UserCheck className="w-4 h-4" />
                <span className="font-display font-black text-xs uppercase tracking-tight">Customer Info (ग्राहक का विवरण)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-gray-500 flex items-center gap-1 leading-none">
                    <User className="w-3 h-3 text-orange-500" /> Customer Name (वैकल्पिक)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shyamlal Soni"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-orange-100/30 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    id="billing-customer-name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-gray-500 flex items-center gap-1 leading-none">
                    <Phone className="w-3 h-3 text-orange-500" /> Customer WhatsApp Number <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7004410152 (10-digit Mobile)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-orange-100/30 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    id="billing-customer-phone"
                  />
                </div>
              </div>

              {/* Extra discount input (unlocked coins discount or direct rebate) */}
              <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-[11px] text-gray-550 leading-relaxed font-semibold">
                  🎁 Apply Discount (Rebate/Coins): 
                  {coins >= 100 && (
                    <span className="text-[10px] text-green-600 block italic">Your coin balance ({coins} SC) allows discounts!</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-bold font-mono">₹</span>
                  <input
                    type="number"
                    min="0"
                    max={subtotal > 0 ? subtotal : 0}
                    placeholder="Discount Amount"
                    value={extraDiscount || ""}
                    onChange={(e) => setExtraDiscount(Number(e.target.value) || 0)}
                    className="w-24 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold font-mono text-center text-green-700 focus:outline-none"
                    id="billing-extra-discount"
                  />
                </div>
              </div>
            </div>

            {/* Calculations subtotals */}
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-150 space-y-1.5 text-xs text-gray-550">
              <div className="flex justify-between items-center">
                <span>Gross Price Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              {discountVal > 0 && (
                <div className="flex justify-between items-center text-green-705 font-bold">
                  <span>Owner Rebate / Promo Discount</span>
                  <span>-₹{discountVal}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-2 font-display text-sm font-black text-gray-950">
                <span className="flex items-center gap-1">
                  Total Payable Due
                </span>
                <span className="text-base text-gray-955">₹{totalDue}</span>
              </div>
            </div>

            {/* Send invoice button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:blend text-white font-display font-black text-xs uppercase rounded-xl tracking-wider shadow-md hover:shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer transition active:scale-99"
              id="btn-whatsapp-invoice-submit"
            >
              <Send className="w-4 h-4" /> Share Premium Bill on WhatsApp
            </button>
            <p className="text-[9.5px] text-gray-400 text-center leading-none italic block mt-1">
              On submit, beautiful itemized receipt content parses and initiates a WhatsApp message automatically!
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
