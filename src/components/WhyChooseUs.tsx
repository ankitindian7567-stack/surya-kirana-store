import React from "react";
import { CheckCircle, Tag, HeartHandshake, Layers, Award, Sparkles } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Quality Products",
      desc: "Our grains, spices, oils, and puja samagri undergo strict quality checks. We do not compromise on the purity of your kitchen staples or festive rituals.",
      icon: <Award className="w-6 h-6 text-orange-600" />,
      tag: "Best in Market"
    },
    {
      title: "Affordable Prices",
      desc: "Enjoy genuine, transparent local rates with direct saving and seasonal discounts. High-end grocery experience shouldn't exhaust your household budget.",
      icon: <Tag className="w-6 h-6 text-amber-600" />,
      tag: "Honest Billing"
    },
    {
      title: "Friendly Service",
      desc: "We are your friendly neighborhood guides. Whether helping you pack festival bundles or arranging rapid doorstep deliveries via WhatsApp, we are always smiling.",
      icon: <HeartHandshake className="w-6 h-6 text-orange-600" />,
      tag: "Local Family Feel"
    },
    {
      title: "Wide Product Range",
      desc: "From premium Basmati and daily pulse essentials to fragrant incense, eco diyas, and kitchen surface detergents—find every single item on your checklist.",
      icon: <Layers className="w-6 h-6 text-amber-600" />,
      tag: "All-In-One Store"
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/15 to-white border-t border-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-display font-extrabold text-sm uppercase tracking-wider block mb-2">
            Why Our Customers Trust Us
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight leading-tight">
            Designed for Reliability, Handpicked with Love
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2.5">
            Surya Kirana Store represents the warmth of a local shop integrated with the standard excellence and quality of a upscale supermarket.
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {points.map((pt, i) => (
            <div
              key={i}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-orange-100/40 shadow-xs hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start group"
            >
              
              {/* Icon Frame */}
              <div className="p-4 rounded-2xl bg-orange-50 text-orange-600 shrink-0 transition-transform duration-300 group-hover:scale-105">
                {pt.icon}
              </div>

              {/* Text Blocks */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <h4 className="font-display font-extrabold text-lg text-gray-950">
                    {pt.title}
                  </h4>
                  <span className="bg-orange-50 text-orange-750 font-semibold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider block border border-orange-100/30">
                    {pt.tag}
                  </span>
                </div>
                <p className="text-gray-650 text-xs sm:text-sm leading-relaxed">
                  {pt.desc}
                </p>
              </div>

              {/* subtle decorative element corner */}
              <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none group-hover:opacity-10 transition">
                <Sparkles className="w-8 h-8 text-amber-500" />
              </div>

            </div>
          ))}
        </div>

        {/* Highlighted Banner Stat overlay */}
        <div className="mt-14 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg shadow-orange-500/15">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="font-display font-black text-xl sm:text-2xl tracking-tight mb-2">Need bulk orders for family functions or festivals?</h4>
            <p className="text-sm text-yellow-50/90 leading-normal">
              We prepare curated festival puja hampers, wedding dry fruit trays, and wholesale monthly grocery supply items at unbelievable custom rates.
            </p>
          </div>
          <a
            href={`https://wa.me/917004410152?text=Hi%20Surya%20Kirana%20Store%2C%20I%20want%20to%2520inquire%20about%20bulk%20hampers%20for%20an%20upcoming%20festival.`}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-orange-600 font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl hover:bg-orange-50 transition transform hover:scale-102 flex items-center justify-center gap-2 block shrink-0 cursor-pointer shadow-md"
            id="btn-bulk-whatsapp"
          >
            Inquire Bulk WhatsApp Rates
          </a>
        </div>

      </div>
    </section>
  );
}
