import React from "react";
import { ShieldCheck, HeartHandshake, Smile, Receipt, Gem } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column Image Collages */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border-4 border-amber-50/50">
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800"
                alt="Inside Store Fresh Selection"
                className="w-full h-full object-cover matches-theme referrer-policy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <p className="absolute bottom-4 left-4 text-white font-display font-bold text-sm tracking-wide">
                Fresh Stock Sourced Daily
              </p>
            </div>
          </div>

          {/* Right Column Text Narrative */}
          <div className="lg:col-span-7">
            <span className="text-orange-500 font-display font-extrabold text-sm uppercase tracking-wider block mb-3">
              Serving Happiness Since 2005
            </span>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight mb-6">
              Empowering Every Indian Household with Choice, Trust and Quality
            </h3>
            <p className="text-gray-700 leading-relaxed text-base mb-6">
              Welcome to <strong>Surya Kirana Store</strong>—your beloved one-stop supermarket for daily essentials, pure kitchen staples, and high-quality ritual items. For over two decades, our core promise has remained unchanged: bringing absolute freshness, premium quality, and affordable prices into your home.
            </p>
            <p className="text-gray-750 leading-relaxed text-sm mb-8">
              We handpick all grocery staples, assuring unadulterated whole wheat, select aromatic basmati rices, and pure organic ghee. Alongside your daily pantry needs, we curate authentic <strong>Puja Samagri</strong>, offering organic camphor, temple-quality sandalwood agarbatti, and hand-rolled cotton diyas so your sacred moments are celebrated with divine perfection.
            </p>

            {/* Quick stats indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-orange-100/50">
              <div className="text-center md:text-left">
                <span className="block font-display font-extrabold text-3xl md:text-4xl text-orange-600">20+</span>
                <span className="text-xs text-gray-500 font-semibold uppercase mt-1 block">Years of Trust</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block font-display font-extrabold text-3xl md:text-4xl text-orange-600">10,000+</span>
                <span className="text-xs text-gray-500 font-semibold uppercase mt-1 block">Happy Families</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block font-display font-extrabold text-3xl md:text-4xl text-orange-600">100%</span>
                <span className="text-xs text-gray-500 font-semibold uppercase mt-1 block">Pure Staple</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block font-display font-extrabold text-3xl md:text-4xl text-orange-600">Quick</span>
                <span className="text-xs text-gray-500 font-semibold uppercase mt-1 block">WhatsApp Order</span>
              </div>
            </div>

          </div>

        </div>

        {/* Pillars / Values Grid */}
        <div className="bg-amber-50/50 rounded-3xl p-8 sm:p-12 border border-orange-100/50">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h4 className="font-display font-bold text-2xl text-gray-900">What Defines Our Mission</h4>
            <p className="text-sm text-gray-600 mt-2">Putting your family's health, health staples, and traditional values at the heart of our operations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Core Pillar 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-orange-100/30 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <h5 className="font-display font-bold text-lg text-gray-950 mb-2">Pure Quality Sourced Directly</h5>
              <p className="text-sm text-gray-650 leading-relaxed">
                Zero adulteration guarantee. Our grains, oils, and puja ingredients undergo thorough inspection before hitting our modern storage.
              </p>
            </div>

            {/* Core Pillar 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-orange-100/30 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Receipt className="w-6 h-6 stroke-[2]" />
              </div>
              <h5 className="font-display font-bold text-lg text-gray-950 mb-2">Affordable Local Rates</h5>
              <p className="text-sm text-gray-650 leading-relaxed">
                No inflated prices or hidden margins. Enjoy special discounts, seasonal offers, and wholesale-level value with absolute honesty.
              </p>
            </div>

            {/* Core Pillar 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-orange-100/30 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-yellow-105 text-yellow-700 flex items-center justify-center mb-4">
                <Smile className="w-6 h-6 stroke-[2]" />
              </div>
              <h5 className="font-display font-bold text-lg text-gray-950 mb-2">Friendly Neighborhood Care</h5>
              <p className="text-sm text-gray-650 leading-relaxed">
                Our local roots keep us connected. Expect a heartwarming welcome, customizable bag configurations, and quick responses on WhatsApp.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
