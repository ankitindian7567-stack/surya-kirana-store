import React, { useState } from "react";
import { Phone, MapPin, Calendar, Mail, Compass, Copy, Check, MessageSquare } from "lucide-react";
import { STORE_INFO } from "../data";

export default function Contact() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 200);
  };

  const handleSendWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) return;

    const formattedText = encodeURIComponent(
      `Hi Surya Kirana Store,\nMy name is *${inquiryName || "Customer"}*.\nInquiry:\n${inquiryMessage}`
    );
    // WhatsApp direct link
    window.open(`https://wa.me/917004410152?text=${formattedText}`, "_blank");
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-display font-extrabold text-sm uppercase tracking-wider block mb-2">
            Get In Touch
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight leading-tight">
            Visit Our Store or Order From Home
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Our priority is keeping your kitchen stocked with luxury whole staples and puja ingredients. We are available via Call, WhatsApp, and in-person.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Block: Information Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Address Pack */}
            <div className="bg-amber-50/40 p-6 rounded-3xl border border-orange-100/40 flex items-start gap-4 shadow-2xs">
              <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                <MapPin className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-extrabold text-base text-gray-950 mb-1">Store Address</h4>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
                  {STORE_INFO.address}
                </p>
                <button
                  onClick={handleCopyAddress}
                  className="px-4 py-2 font-display font-bold text-[10px] uppercase rounded-xl border border-orange-200 bg-white hover:bg-orange-50 text-orange-600 flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  title="Copy Full Address"
                  id="btn-copy-address"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      Address Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Address Coordinates
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-amber-50/40 p-6 rounded-3xl border border-orange-100/40 flex items-start gap-4 shadow-2xs">
              <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                <Calendar className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-extrabold text-base text-gray-950 mb-2.5">Business Hours</h4>
                <div className="space-y-1.5">
                  {STORE_INFO.hours.map((h, index) => (
                    <div key={index} className="flex justify-between items-center text-xs sm:text-sm border-b border-orange-100/20 pb-1 last:border-none last:pb-0">
                      <span className="font-semibold text-gray-500">{h.days}</span>
                      <span className="font-bold text-gray-800">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact & WhatsApp Form Inquiry */}
            <div className="bg-amber-50/40 p-6 rounded-3xl border border-orange-100/40 shadow-2xs flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-extrabold text-base text-gray-955 mb-2.5 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-500" /> WhatsApp Quick Inquiry
                </h4>
                <p className="text-xs text-gray-550 mb-4">
                  Have a question about product availability or custom price packages? Compose a message below to launch WhatsApp instantly.
                </p>
              </div>

              <form onSubmit={handleSendWhatsAppInquiry} className="space-y-3.5">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-orange-100 rounded-xl text-xs sm:text-sm text-gray-850 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  id="inquiry-name"
                />
                <textarea
                  required
                  placeholder="Type your message (e.g. Do you have fresh paneer or gangajal in stock?)"
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  rows={2}
                  className="w-full p-3 bg-white border border-orange-100 rounded-xl text-xs sm:text-sm text-gray-850 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  id="inquiry-msg"
                ></textarea>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-display font-bold text-xs uppercase cursor-pointer"
                    id="btn-send-whatsapp-inquiry"
                  >
                    Send on WhatsApp
                  </button>
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="px-3.5 py-2.5 rounded-xl border border-orange-200 bg-white hover:bg-orange-50 text-orange-600 text-xs font-bold block text-center"
                    title="Call Store directly"
                    id="link-call-contact"
                  >
                    Call Instead
                  </a>
                </div>
              </form>
            </div>

          </div>

          {/* Right Block: Active Google Maps Embed Frame */}
          <div className="lg:col-span-7 rounded-3xl bg-amber-50/20 border border-orange-100/40 p-3 h-full min-h-[380px] lg:min-h-auto flex flex-col justify-between">
            <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-orange-100/60 shadow-inner">
              
              {/* Actual Dynamic Maps Frame Integration */}
              <iframe
                title="Surya Kirana Store Google Location Directions"
                src={STORE_INFO.embedMapSrc}
                className="absolute inset-0 w-full h-full border-0 rounded-2xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                id="maps-iframe-widget"
              ></iframe>

            </div>
            
            {/* Directions Bar below iframe maps */}
            <div className="px-3 py-3 mt-2 font-sans flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-white rounded-xl border border-orange-105">
              <span className="text-xs text-gray-600 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: "12s" }} />
                Gandhinagar sector temple circle neighborhood landing points
              </span>
              <a
                href={STORE_INFO.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="bg-orange-50 hover:bg-orange-500 hover:text-white border border-orange-100 text-orange-600 transition font-display font-bold text-xs px-4 py-2 rounded-lg text-center cursor-pointer block shrink-0"
                id="btn-get-directions"
              >
                Launch Google Directions Map
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
