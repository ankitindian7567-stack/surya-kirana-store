import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Coins, 
  Tv, 
  Play, 
  Trophy, 
  Copy, 
  Check, 
  Gift, 
  Zap, 
  Share2, 
  RotateCw, 
  Clock, 
  ThumbsUp, 
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface RewardCenterProps {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  unlockedCoupons: string[];
  onUnlockCoupon: (code: string, cost: number) => void;
}

export default function RewardCenter({
  coins,
  setCoins,
  unlockedCoupons,
  onUnlockCoupon
}: RewardCenterProps) {
  const [adCountdown, setAdCountdown] = useState<number | null>(null);
  const [activeAd, setActiveAd] = useState<boolean>(false);
  const [adMessage, setAdMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  // Check if daily checkin was claimed today (saved in localStorage)
  useEffect(() => {
    const claimedStorage = localStorage.getItem("surya_daily_claimed");
    if (claimedStorage) {
      const claimDate = new Date(claimedStorage);
      const today = new Date();
      if (claimDate.toDateString() === today.toDateString()) {
        setDailyClaimed(true);
      }
    }
  }, []);

  // Daily check in handler
  const handleDailyCheckIn = () => {
    if (dailyClaimed) return;
    
    const newCoins = coins + 20;
    setCoins(newCoins);
    setDailyClaimed(true);
    localStorage.setItem("surya_daily_claimed", new Date().toISOString());
    triggerSuccessConfetti("Daily check-in completed! +20 Surya Coins! 🎉");
  };

  // Simulated Ad play handler
  const handleWatchAd = () => {
    if (activeAd) return;
    setActiveAd(true);
    setAdCountdown(8); // 8 seconds high engagement custom ad simulation
    
    const ads = [
      "Aashirvaad Shudh Chakki Atta - 100% Whole Wheat flour, direct from Indian farms. Taste traditional rotis with pure softness!",
      "Surf Excel Stain Protection - Easy wash technology removes grease and clay stains in 1 stroke. Try now at Ankit Kumar's Surya Store!",
      "Fortune Mustard Oil - Kacchi Ghani cold-pressed mustard oil for aromatic, traditional Indian pickle master recipes.",
      "Amul Taaza Milk & Pure Ghee - Homogenized dairy premium freshness, essential for Puja lamps and delicious desserts!"
    ];
    setAdMessage(ads[Math.floor(Math.random() * ads.length)]);
  };

  // Countdown timer for simulated ads
  useEffect(() => {
    if (adCountdown === null) return;
    if (adCountdown === 0) {
      setAdCountdown(null);
      return;
    }

    const timer = setTimeout(() => {
      setAdCountdown(adCountdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [adCountdown]);

  // Complete ad and claim reward coins
  const handleClaimAdCoins = () => {
    setActiveAd(false);
    setCoins(prev => prev + 35);
    triggerSuccessConfetti("Premium Video Ad completed! +35 Surya Coins credited! 🪙");
  };

  const triggerSuccessConfetti = (msg: string) => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  // Wheel Spin simulation
  const handleSpinWheel = () => {
    if (spinning) return;
    if (coins < 10) {
      alert("Spinning costs 10 Surya Coins! Earn more coins by watching ads or daily check-in!");
      return;
    }

    // Deduct 10 coins first
    setCoins(prev => prev - 10);
    setSpinning(true);
    setSpinResult(null);

    // Spin animation timer
    setTimeout(() => {
      const results = [
        { name: "50 Coins", value: 50 },
        { name: "5 Coins", value: 5 },
        { name: "20 Coins", value: 20 },
        { name: "Try Again", value: 0 },
        { name: "100 Coins Mega Jackpot!", value: 100 },
        { name: "15 Coins", value: 15 }
      ];
      
      const winning = results[Math.floor(Math.random() * results.length)];
      setCoins(prev => prev + winning.value);
      setSpinResult(`You won ${winning.name}!`);
      setSpinning(false);
      
      if (winning.value > 0) {
        triggerSuccessConfetti(`Spin complete! ${winning.name} added! 🎡`);
      }
    }, 2500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  // Offers description
  const couponDeals = [
    { code: "ANKIT50", cost: 100, discount: "₹50 Off", tnc: "On minimum order of ₹399", desc: "Special launch code from Owner Ankit Kumar" },
    { code: "SURYA100", cost: 200, discount: "₹100 Off", tnc: "On minimum order of ₹699", desc: "Super saver premium kirana voucher" },
    { code: "FREEBAG", cost: 350, discount: "Free Eco Cotton Bag", tnc: "With monthly grocery delivery orders", desc: "Environment friendly durable shopping bag" }
  ];

  const handleShareOnWhatsApp = () => {
    const shareMessage = encodeURIComponent(
      "Hey! Earn free groceries and claim huge discount coupons at Surya Kirana Store. Click here to check out owner Ankit Kumar's mobile app storefront: " + window.location.href
    );
    window.open(`https://wa.me/?text=${shareMessage}`, "_blank");
    
    // Reward for sharing (limited simulation)
    setCoins(prev => prev + 50);
    triggerSuccessConfetti("Shared successfully! +50 Surya Coins credited! 📱");
  };

  return (
    <div className="bg-white min-h-[80vh] flex flex-col p-4 pb-12 sm:p-6" id="view-rewards-center">
      {/* Upper celebratory message */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 inset-x-4 bg-gradient-to-r from-green-500 to-emerald-600 border border-green-400 p-4 rounded-2xl shadow-xl text-white font-display text-xs sm:text-sm text-center font-bold z-50 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 animate-pulse text-yellow-300" />
            <span>Success Claimed! Your coin chest balance updated. 🎉</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Header Balance card */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-500/15 relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10">
          <Coins className="w-48 h-48" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="bg-amber-400/30 text-yellow-100 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
              🪙 Surya Rewards Vault
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl mt-2 tracking-tight leading-none">
              My Surya Coins (SC)
            </h2>
            <p className="text-white/80 text-[11px] font-medium tracking-wide mt-1 leading-snug">
              Complete tasks, watch small simulated advertisements & redeem coin balances for massive shopping discounts!
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-white/12 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-inner">
            <Coins className="w-6 h-6 text-yellow-300 animate-bounce" />
            <span className="font-display font-black text-2xl text-yellow-300 tracking-tight">
              {coins} <span className="text-sm font-bold text-white">SC</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tasks and Games Section */}
      <div className="space-y-6">
        
        {/* Step 1: Earn Coins Section */}
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <div className="p-1.5 bg-yellow-100 rounded-lg text-yellow-600">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <h3 className="font-display font-black text-base text-gray-950 uppercase tracking-tight">
              Easy Daily Activities & Tasks (टैस्क / कॉइन कमाएं)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Daily Check in Task card */}
            <div className="bg-orange-50/20 border border-orange-100/40 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-200 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-yellow-100 rounded-xl text-yellow-650 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                    Daily Bonus check-in <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-150">Easy</span>
                  </h4>
                  <p className="text-[11px] text-gray-550 leading-relaxed mt-1">
                    Claim your daily welcome bonus coins simply with one click every single day.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 pt-2 border-t border-orange-100/10">
                <span className="font-display font-black text-xs text-yellow-650 flex items-center gap-1">
                  🪙 +20 SC
                </span>
                <button
                  onClick={handleDailyCheckIn}
                  disabled={dailyClaimed}
                  className={`px-4 py-1.5 rounded-xl font-display font-black text-xs uppercase cursor-pointer transition ${
                    dailyClaimed 
                      ? "bg-gray-100 text-gray-400 border border-gray-150 cursor-not-allowed" 
                      : "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                  }`}
                  id="btn-daily-checkin"
                >
                  {dailyClaimed ? "Checked Today" : "Claim +20 SC"}
                </button>
              </div>
            </div>

            {/* Watch Ad Task card */}
            <div className="bg-orange-50/20 border border-orange-100/40 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-200 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-orange-100 rounded-xl text-orange-650 shrink-0">
                  <Tv className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                    Premium Commercial Ad <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-1.5 py-0.5 rounded border border-orange-150">Ad Watch</span>
                  </h4>
                  <p className="text-[11px] text-gray-550 leading-relaxed mt-1">
                    Watch brief simulated video banner commercials to support Surya Kirana Store and earn extra coins!
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 pt-2 border-t border-orange-100/10">
                <span className="font-display font-black text-xs text-orange-600 flex items-center gap-1">
                  🪙 +35 SC
                </span>
                <button
                  onClick={handleWatchAd}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-xl font-display font-black text-xs uppercase cursor-pointer transition-all shadow-sm flex items-center gap-1"
                  id="btn-watch-ad"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Watch ad
                </button>
              </div>
            </div>

            {/* Lucky Spin Wheel card */}
            <div className="bg-orange-50/20 border border-orange-100/40 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-200 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-yellow-100 rounded-xl text-yellow-650 shrink-0">
                  <RotateCw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-gray-900">
                    Lucky Wheel Spinner
                  </h4>
                  <p className="text-[11px] text-gray-550 leading-relaxed mt-1">
                    Test your luck! Spend 10 SC to spin the wheel of fortune and win up to 100 SC!
                  </p>
                </div>
              </div>

              {spinResult && (
                <div className="mt-2 bg-yellow-50 text-[11px] text-yellow-800 font-bold p-1.5 rounded-lg border border-yellow-100 text-center uppercase">
                  🎡 {spinResult}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between gap-4 pt-2 border-t border-orange-100/10">
                <span className="font-display font-bold text-[10px] text-gray-400">
                  Cost: 10 SC / Spin
                </span>
                <button
                  onClick={handleSpinWheel}
                  disabled={spinning}
                  className={`bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-xl font-display font-black text-xs uppercase cursor-pointer transition ${
                    spinning ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  id="btn-spin-wheel"
                >
                  {spinning ? "Spinning..." : "Wheel Spin"}
                </button>
              </div>
            </div>

            {/* Share on WhatsApp Task card */}
            <div className="bg-orange-50/20 border border-orange-100/40 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-200 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-green-100 rounded-xl text-green-600 shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-gray-900">
                    Share app on WhatsApp
                  </h4>
                  <p className="text-[11px] text-gray-550 leading-relaxed mt-1">
                    Recommend Ankit Kumar's Surya Kirana Store storefront to your friends on WhatsApp.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 pt-2 border-t border-orange-100/10">
                <span className="font-display font-black text-xs text-green-600">
                  🪙 +50 SC
                </span>
                <button
                  onClick={handleShareOnWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-xl font-display font-black text-xs uppercase cursor-pointer transition shadow-sm"
                  id="btn-share-whatsapp"
                >
                  Share & Earn
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Step 2: Redeem Center Coupons list */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600">
              <Gift className="w-4 h-4" />
            </div>
            <h3 className="font-display font-black text-base text-gray-950 uppercase tracking-tight">
              Claim Premium Grocery Coupons (कूपन रिडीम करें)
            </h3>
          </div>

          <div className="space-y-3">
            {couponDeals.map((coupon) => {
              const unlocked = unlockedCoupons.includes(coupon.code);
              
              return (
                <div 
                  key={coupon.code}
                  className={`border rounded-2xl p-4 overflow-hidden relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 ${
                    unlocked 
                      ? "bg-gradient-to-r from-emerald-50 to-green-50/30 border-green-200" 
                      : "bg-white border-gray-150"
                  }`}
                >
                  {/* Coupon left side details */}
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl shrink-0 ${unlocked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {unlocked ? <CheckCircle className="w-6 h-6" /> : <Gift className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-display font-black text-lg ${unlocked ? 'text-green-800' : 'text-gray-900'}`}>
                          {coupon.discount}
                        </span>
                        {!unlocked && (
                          <span className="font-display text-[10px] text-amber-600 font-bold bg-amber-50 rounded px-1.5 border border-amber-100">
                            🪙 Requires {coupon.cost} SC
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 font-semibold text-xs mt-0.5">{coupon.desc}</p>
                      <p className="text-gray-400 text-[10px] leading-relaxed italic">{coupon.tnc}</p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="w-full sm:w-auto flex sm:flex-col items-stretch sm:items-end gap-2 shrink-0">
                    {unlocked ? (
                      <div className="flex flex-1 sm:flex-initial items-center gap-2">
                        <div className="bg-dashed border border-green-300 bg-white px-3 py-1.5 rounded-xl flex items-center justify-between gap-3 text-xs w-full">
                          <code className="font-bold text-green-800 font-mono tracking-wide">{coupon.code}</code>
                          <button
                            onClick={() => handleCopyCode(coupon.code)}
                            className="text-green-600 hover:text-green-800 focus:outline-none"
                            title="Copy Promo Code"
                            id={`btn-copy-${coupon.code}`}
                          >
                            {copiedCode === coupon.code ? (
                              <Check className="w-4 h-4 text-green-800" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {copiedCode === coupon.code && (
                          <span className="text-[10px] text-green-700 font-bold whitespace-nowrap block sm:hidden">
                            Copied!
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (coins >= coupon.cost) {
                            onUnlockCoupon(coupon.code, coupon.cost);
                            triggerSuccessConfetti(`Coupon ${coupon.code} successfully unlocked!`);
                          } else {
                            alert("Insufficient coin balance in your vault! Need more Surya Coins.");
                          }
                        }}
                        disabled={coins < coupon.cost}
                        className={`w-full text-center px-5 py-2 rounded-xl font-display font-black text-xs uppercase cursor-pointer tracking-wider transition ${
                          coins >= coupon.cost
                            ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-400 border border-gray-150 cursor-not-allowed"
                        }`}
                        id={`btn-redeem-${coupon.code}`}
                      >
                        Redeem {coupon.cost} SC
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* AD INTERSTITIAL MODAL COVER */}
      <AnimatePresence>
        {activeAd && adCountdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-200 flex flex-col justify-center items-center p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden border border-orange-100"
            >
              {/* Ad badge corner */}
              <div className="absolute top-0 left-0 bg-orange-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-br-2xl">
                Sponsored Ad
              </div>

              {/* Ad provider branding */}
              <div className="flex items-center justify-between mb-4 mt-2">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-500 animate-bounce" />
                  <span className="font-display font-black text-xs text-orange-600">Surya Ad Network</span>
                </div>
                
                {/* Timer block */}
                <div className="bg-orange-50 text-orange-655 text-xs font-black font-mono px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>0:0{adCountdown}</span>
                </div>
              </div>

              {/* Ad visual simulation container */}
              <div className="bg-gradient-to-tr from-orange-400 via-amber-400 to-yellow-300 aspect-video rounded-2xl w-full flex flex-col justify-center items-center text-center p-4 text-white shadow-inner mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 space-y-2">
                  <Tv className="w-10 h-10 text-yellow-100 animate-pulse mx-auto" />
                  <h4 className="font-display font-black text-sm uppercase italic tracking-wider leading-none">
                    Surya Kirana Premium Deals
                  </h4>
                  <p className="text-[10px] text-yellow-50 leading-snug">
                    Brought to you by Shop Owner Ankit Kumar
                  </p>
                </div>
              </div>

              {/* Ad script line */}
              <p className="text-gray-700 text-xs text-center font-medium leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                "{adMessage}"
              </p>

              {/* Complete & Claim trigger action container */}
              <div className="mt-6">
                {adCountdown > 0 ? (
                  <button
                    disabled
                    className="w-full py-2.5 bg-gray-100 text-gray-400 border border-gray-150 rounded-xl text-xs font-bold uppercase transition"
                  >
                    Hold on: Watching Commercials...
                  </button>
                ) : (
                  <button
                    onClick={handleClaimAdCoins}
                    className="w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl text-xs font-display font-black uppercase transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                    id="btn-claim-add-coins"
                  >
                    <ThumbsUp className="w-4 h-4 fill-current text-white/50" /> Close & Claim 35 SC
                  </button>
                )}
              </div>

              <span className="text-[9px] text-gray-400 text-center block mt-3 leading-none italic">
                Close ad when counter hits 0 to add coins safely.
              </span>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
