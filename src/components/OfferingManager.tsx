/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PlusCircle, ShoppingBag, Coffee, Calendar, Info, Check, Image, Sparkles } from "lucide-react";
import { Offering, OfferingType } from "../types";

interface OfferingManagerProps {
  offerings: Offering[];
  onAddOffering: (offering: Offering) => void;
  highContrast: boolean;
  onAnnounce: (text: string) => void;
}

export default function OfferingManager({ offerings, onAddOffering, highContrast, onAnnounce }: OfferingManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [offeringType, setOfferingType] = useState<OfferingType>("PRODUCT");
  
  // Form states
  const [nameEn, setNameEn] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [category, setCategory] = useState("Office Crafts / ของแต่งโต๊ะทำงาน");
  const [description, setDescription] = useState("");
  const [storyNotes, setStoryNotes] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [price, setPrice] = useState("");
  const [altText, setAltText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // Specific states
  const [materials, setMaterials] = useState("Pine wood / ไม้สน");
  const [productionTime, setProductionTime] = useState("1-2 days");
  const [moq, setMoq] = useState("1");
  const [location, setLocation] = useState("20Rai Cafe, Nonthaburi");
  const [openingHours, setOpeningHours] = useState("Wed-Sun 09:00-17:00");
  const [menuHighlights, setMenuHighlights] = useState("Craft Americano, Trainee Matcha Latte");
  const [groupSize, setGroupSize] = useState("10 - 25 persons");
  const [duration, setDuration] = useState("3 Hours");
  const [activities, setActivities] = useState("Wood Sanding, Coffee Drip Workshop");

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTypeChange = (type: OfferingType) => {
    setOfferingType(type);
    if (type === "PRODUCT") {
      setCategory("Office Crafts / ของแต่งโต๊ะทำงาน");
      setImageUrl("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400");
    } else if (type === "CAFE_SERVICE") {
      setCategory("Food & Beverage / เครื่องดื่มและคาเฟ่");
      setImageUrl("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400");
    } else {
      setCategory("Team Building / เวิร์กชอปหมู่คณะ");
      setImageUrl("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn || !nameTh) {
      alert("Please fill in both Thai and English names.");
      return;
    }

    const priceNum = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

    const newOffering: Offering = {
      id: `off-${Date.now()}`,
      type: offeringType,
      nameEn,
      nameTh,
      category,
      description,
      storyNotes,
      targetCustomer,
      price: price || "150 THB",
      priceNum,
      altText: altText || `Realistic photo of our new registered ${offeringType.toLowerCase()} offering.`,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      createdAt: new Date().toISOString(),
      // Specifics
      ...(offeringType === "PRODUCT" ? { materials, productionTime, moq: parseInt(moq) || 1 } : {}),
      ...(offeringType === "CAFE_SERVICE" ? { location, openingHours, menuHighlights } : {}),
      ...(offeringType === "EVENT_PACKAGE" ? { groupSize, duration, activities } : {})
    };

    onAddOffering(newOffering);
    setSaveSuccess(true);
    onAnnounce(`Saved registration for ${nameEn} as ${offeringType}.`);
    
    setTimeout(() => {
      setSaveSuccess(false);
      setShowAddForm(false);
      // Reset variables
      setNameEn("");
      setNameTh("");
      setDescription("");
      setStoryNotes("");
      setTargetCustomer("");
      setPrice("");
      setAltText("");
    }, 1500);
  };

  return (
    <div className={`space-y-6 ${highContrast ? "text-white" : "text-slate-800"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-950">Offering Catalog ({offerings.length})</h2>
          <p className="text-xs text-slate-500">
            Define products, café highlights, or CSR workshop bundles. These drive the AI generators and inquiry breakdowns.
          </p>
        </div>
        
        <button
          id="btn-add-offering-toggle"
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all cursor-pointer shadow-lg shadow-indigo-150"
        >
          <PlusCircle size={15} />
          <span>{showAddForm ? "Close Form" : "Register Offering / ลงทะเบียนงานใหม่"}</span>
        </button>
      </div>

      {/* Renders Registration Form */}
      {showAddForm && (
        <form 
          onSubmit={handleSubmit}
          className={`p-8 rounded-2xl border ${
            highContrast ? "bg-black border-white" : "bg-white border-slate-100 shadow-xl animate-fade-in"
          } space-y-6`}
        >
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm md:text-base text-slate-900 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-600" />
              <span>Register New Inclusive Asset (ขั้นตอนลงทะเบียนสินค้า/บริการ)</span>
            </h3>
          </div>

          {/* Type Selectors */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
              Offering Type (ประเภทรายการ):
            </span>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange("PRODUCT")}
                className={`py-3 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  offeringType === "PRODUCT"
                    ? "bg-orange-50 border-orange-500 text-orange-950 ring-2 ring-orange-500/20"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500"
                }`}
              >
                <ShoppingBag size={18} className={offeringType === "PRODUCT" ? "text-orange-500" : "text-slate-400"} />
                <span className="text-[11px] font-bold">1. Craft Product</span>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange("CAFE_SERVICE")}
                className={`py-3 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  offeringType === "CAFE_SERVICE"
                    ? "bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/20"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500"
                }`}
              >
                <Coffee size={18} className={offeringType === "CAFE_SERVICE" ? "text-indigo-600" : "text-slate-400"} />
                <span className="text-[11px] font-bold">2. Cafe Service</span>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange("EVENT_PACKAGE")}
                className={`py-3 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  offeringType === "EVENT_PACKAGE"
                    ? "bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/20"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500"
                }`}
              >
                <Calendar size={18} className={offeringType === "EVENT_PACKAGE" ? "text-indigo-600" : "text-slate-400"} />
                <span className="text-[11px] font-bold">3. CSR / Visit Group</span>
              </button>
            </div>
          </div>

          {/* Form grid */}
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {/* Title EN */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Offering Title EN *</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Ergonomic Pine Coaster Pack"
                required
                className="w-full p-2.5 rounded-lg border border-slate-250 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Title TH */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">ชื่อรายการสินค้า TH *</label>
              <input
                type="text"
                value={nameTh}
                onChange={(e) => setNameTh(e.target.value)}
                placeholder="เช่น ชุดที่รองแก้วลายไม้สนกันน้ำ"
                required
                className="w-full p-2.5 rounded-lg border border-slate-250 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Price / Estimated value */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Price tag or Price Range</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 150 THB / custom estimate"
                className="w-full p-2.5 rounded-lg border border-slate-250 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Target customer */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Target Audiences</label>
              <input
                type="text"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                placeholder="Students, Families, Cafe workers, B2B planners"
                className="w-full p-2.5 rounded-lg border border-slate-250 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Image Alt Text section - explicitly requested as crucial accessibility parameter */}
            <div className="space-y-1 md:col-span-2">
              <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl flex items-start gap-2 text-[11px] text-indigo-900 mb-1.5">
                <Info size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Accessibility Rule:</strong> Include descriptive <strong>Alt Text</strong>. Screen readers read this description so blind visitors can capture what your craft or cafe patio looks like! Refer to items literally.
                </p>
              </div>
              <label className="block font-bold text-slate-700">Image Description for Screen-Readers (Alt Text) *</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Elegant circular coaster block with detailed lacquer grains sitting beside a fresh warm latte cup on standard pine counter."
                className="w-full p-2.5 rounded-lg border border-slate-250 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-1 md:col-span-2">
              <label className="block font-bold text-slate-700">Brief Offering Description / คำอธิบายโดยย่อ</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this offering? Share details of sizing, flavor profiles, or structured timeline."
                rows={2}
                className="w-full p-2.5 rounded-lg border border-slate-250 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            {/* Story with Dignity hints */}
            <div className="space-y-1 md:col-span-2">
              <label className="block font-bold text-slate-700">
                Learner Story & Dignifying Achievements (เบื้องหลังความพยายามและการฝึกของน้องๆ)
              </label>
              <textarea
                value={storyNotes}
                onChange={(e) => setStoryNotes(e.target.value)}
                placeholder="Describe what training steps Suda or Lek mastered to deliver this (e.g., 'Mastered precise oil coating and 30-day apprenticeship guidelines. Finished with high accuracy.') Avoid pity notes!"
                rows={2}
                className="w-full p-2.5 rounded-lg border border-slate-250 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            {/* ====== Type Specific Fields ====== */}
            {offeringType === "PRODUCT" && (
              <>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Materials Used (วัสดุที่ใช้)</label>
                  <input
                    type="text"
                    value={materials}
                    onChange={(e) => setMaterials(e.target.value)}
                    placeholder="Pine timber blocks, organic non-toxic paint"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Turnaround / Production time</label>
                  <input
                    type="text"
                    value={productionTime}
                    onChange={(e) => setProductionTime(e.target.value)}
                    placeholder="1-2 days per unit, 7 days for batch"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
              </>
            )}

            {offeringType === "CAFE_SERVICE" && (
              <>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Hours of Opening (เวลาเข้าใช้บริการ)</label>
                  <input
                    type="text"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                    placeholder="Wed-Sun 09:00 - 17:00"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Core Highlights (เมนูเด็ดของเด็กๆ)</label>
                  <input
                    type="text"
                    value={menuHighlights}
                    onChange={(e) => setMenuHighlights(e.target.value)}
                    placeholder="Trainee Latte decor, Organic garden lime soda"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
              </>
            )}

            {offeringType === "EVENT_PACKAGE" && (
              <>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Optimal Group Size (ขนาดกลุ่ม)</label>
                  <input
                    type="text"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    placeholder="e.g. 10 - 30 corporate guests"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Duration (เวลาจัดกิจกรรม)</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 Hours"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg font-bold text-slate-500 hover:bg-slate-50 cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveSuccess}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-extrabold text-white text-xs transition-all cursor-pointer ${
                saveSuccess ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-150"
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check size={14} />
                  <span>Item Registered!</span>
                </>
              ) : (
                <span>Register & Save Offering</span>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Catalog Rendered */}
      <div className="grid md:grid-cols-3 gap-6">
        {offerings.map((item) => (
          <div 
            key={item.id}
            className={`rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg ${
              highContrast ? "bg-black border-white" : "bg-white border-slate-150/80 shadow-sm"
            }`}
          >
            {/* Image container with accessibility Alt flag */}
            <div className="relative h-44 w-full bg-slate-100">
              <img 
                src={item.imageUrl} 
                alt={item.altText} 
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full"
              />
              <span className={`absolute top-3 left-3 text-[9px] font-black tracking-wider uppercase text-white px-2.5 py-1 rounded-full shadow ${
                item.type === "PRODUCT" ? "bg-orange-600" : item.type === "CAFE_SERVICE" ? "bg-indigo-650 bg-indigo-600" : "bg-violet-600 font-extrabold"
              }`}>
                {item.type.replace("_", " ")}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="block text-[9.5px] text-indigo-600 font-extrabold tracking-wider uppercase mb-1">
                  {item.category}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                  {item.nameEn}
                </h4>
                <p className="text-xs text-slate-400 font-bold mb-2">
                  {item.nameTh}
                </p>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {item.description || "No description provided."}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between">
                <div className="text-left">
                  <span className="block text-[8.5px] uppercase tracking-widest text-slate-400 font-bold">Standard Price</span>
                  <span className="text-xs font-black text-slate-900">{item.price}</span>
                </div>
                
                <div className="flex items-center gap-1.5" title={item.altText}>
                  <Image size={13} className="text-indigo-600" />
                  <span className="text-[9px] text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full font-bold">Alt Set</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
