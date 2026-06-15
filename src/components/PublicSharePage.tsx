/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check, Mail, Phone, Calendar, ArrowLeft, Users, Landmark, Clock, Coffee, Sparkles, ShoppingBag, QrCode } from "lucide-react";
import { Offering, Inquiry } from "../types";

interface PublicSharePageProps {
  offering: Offering;
  onBackToStaff: () => void;
  onSubmitInquiry: (inquiry: Inquiry) => void;
  highContrast: boolean;
}

export default function PublicSharePage({
  offering,
  onBackToStaff,
  onSubmitInquiry,
  highContrast
}: PublicSharePageProps) {
  // Form states
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState<Inquiry["customerType"]>("Individual");
  const [source, setSource] = useState<Inquiry["source"]>("QR Code");
  const [contact, setContact] = useState("");
  const [quantityOrGroupSize, setQuantityOrGroupSize] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !contact) {
      alert("Please fill in Name and Contact Method.");
      return;
    }

    const newInquiry: Inquiry = {
      id: `inq-added-${Date.now()}`,
      offeringId: offering.id,
      source: source || "QR Code",
      inquiryType: offering.type === "PRODUCT" 
        ? "Product Quotation" 
        : offering.type === "CAFE_SERVICE" 
          ? "Cafe Visit Interest" 
          : "CSR Package Request",
      customerName,
      customerType,
      contact,
      quantityOrGroupSize: quantityOrGroupSize || "1",
      preferredDate: preferredDate || undefined,
      message,
      status: "New",
      assignedStaffId: "Staff-Amy",
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSubmitInquiry(newInquiry);
    setSubmitted(true);
  };

  return (
    <div className={`p-1 max-w-4xl mx-auto space-y-8 ${highContrast ? "text-white" : "text-slate-800"}`}>
      {/* Simulation Banner Header */}
      <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-black bg-white text-red-700 px-2.5 py-0.5 rounded animate-pulse">PUBLIC PAGE VIEW SIMULATOR</span>
          <span className="hidden md:inline font-medium">This represents what an external customer captures after tapping our shared LINE post or onsite QR story stand.</span>
        </div>
        <button
          onClick={onBackToStaff}
          className="bg-black/20 hover:bg-black/35 font-bold px-3 py-1.5 rounded-lg border border-white/20 transition-all cursor-pointer text-[10px]"
        >
          Return to Staff Workspace
        </button>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Offering Details - Left 3 cols */}
        <div className="md:col-span-3 space-y-6">
          <div className={`rounded-3xl border overflow-hidden ${
            highContrast ? "bg-black border-white" : "bg-white border-slate-150 shadow-sm"
          }`}>
            {/* Aspect Ratio Header Photo */}
            <div className="relative h-64 w-full bg-slate-100 border-b border-slate-150">
              <img 
                src={offering.imageUrl} 
                alt={offering.altText} 
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] font-bold bg-indigo-600 px-2.5 py-1 rounded-full tracking-widest uppercase mb-1.5 inline-block shadow">
                  {offering.category}
                </span>
                <h1 className="text-xl md:text-2xl font-black leading-tight">
                  {offering.nameEn}
                </h1>
                <p className="text-xs text-slate-150 mt-1">
                  {offering.nameTh}
                </p>
              </div>
            </div>

            {/* General Info list */}
            <div className="p-6 space-y-6 text-xs leading-relaxed">
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Item Overview</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {offering.description}
                </p>
              </div>

              {/* Specific Offerings Field values */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-205">
                <div>
                  <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Unit Price value</span>
                  <span className="text-sm font-black text-slate-800">{offering.price}</span>
                </div>

                {offering.type === "PRODUCT" && (
                  <>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Premium Materials</span>
                      <span className="text-xs font-semibold text-slate-700">{offering.materials}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Production Lead-Time</span>
                      <span className="text-xs font-semibold text-slate-700">{offering.productionTime}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Minimum Order Size</span>
                      <span className="text-xs font-semibold text-slate-700">MOQ: {offering.moq} pc</span>
                    </div>
                  </>
                )}

                {offering.type === "CAFE_SERVICE" && (
                  <>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Physical Location</span>
                      <span className="text-xs font-semibold text-slate-700">{offering.location}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Business Hours</span>
                      <span className="text-xs font-semibold text-slate-700">{offering.openingHours}</span>
                    </div>
                    <div className="col-span-2 mt-1">
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Signature Menus</span>
                      <span className="text-xs font-bold text-indigo-700">{offering.menuHighlights}</span>
                    </div>
                  </>
                )}

                {offering.type === "EVENT_PACKAGE" && (
                  <>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Group Capacity</span>
                      <span className="text-xs font-semibold text-slate-700">{offering.groupSize}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Event Duration</span>
                      <span className="text-xs font-semibold text-slate-700">{offering.duration}</span>
                    </div>
                    <div className="col-span-2 mt-1">
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Activities Included</span>
                      <span className="text-xs font-semibold text-slate-700 leading-relaxed">{offering.activities}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Onsite QR Story Highlight */}
              {offering.storyNotes && (
                <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/50 space-y-2">
                  <h4 className="font-bold text-[10px] text-purple-900 uppercase tracking-widest flex items-center gap-1">
                    <QrCode size={13} />
                    <span>TRAINEE VOCATIONAL INSIGHT / เรื่องเล่าภูมิใจในงานทำมือ</span>
                  </h4>
                  <p className="italic text-slate-600 leading-relaxed font-sans">
                    "{offering.storyNotes}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Inquiry Sidebar Form - Right 2 cols */}
        <div className="md:col-span-2 space-y-6 text-xs">
          {submitted ? (
            <div className={`p-6 rounded-3xl border text-center ${
              highContrast ? "border-white bg-black" : "bg-emerald-50 border-emerald-250 shadow-sm"
            } space-y-4 py-12 animate-fade-in`}>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-900">Inquiry Logged Successfully!</h3>
                <p className="text-slate-600 leading-relaxed">
                  Thank you! Your interest has been submitted into our internal team-dashboard. Trainees and staff will map this demand to task steps soon.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCustomerName("");
                  setContact("");
                  setMessage("");
                }}
                className="text-xs text-indigo-700 font-bold hover:underline cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <div className={`p-5 rounded-3xl border ${
              highContrast ? "bg-black border-white" : "bg-white border-slate-200/80 shadow-md"
            } space-y-4`}>
              <div className="border-b border-slate-100 pb-2.5">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Mail size={15} className="text-indigo-600" />
                  <span>Interactive Contact Request</span>
                </h3>
                <span className="text-[10px] text-slate-400 leading-none block mt-1">Submit interest to help learners capture actual orders.</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Simulated channel referer */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-500 uppercase tracking-widest text-[9px]">Simulated Client Referral</label>
                  <select
                    value={source}
                    onChange={(e: any) => setSource(e.target.value)}
                    className="w-full p-2 rounded border border-slate-205 bg-slate-50"
                  >
                    <option value="Facebook">Facebook Shortlink</option>
                    <option value="LINE">LINE Group Broadcast</option>
                    <option value="QR Code">Onsite QR poster scan</option>
                    <option value="Google Maps">Google Maps link</option>
                  </select>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Somkit (University Student Rep)"
                    required
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  />
                </div>

                {/* Client category */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Your Segment Profile</label>
                  <select
                    value={customerType}
                    onChange={(e: any) => setCustomerType(e.target.value)}
                    className="w-full p-2 rounded border border-slate-305 bg-white"
                  >
                    <option value="Individual">Individual Cafe Hopper</option>
                    <option value="Family">Family Group</option>
                    <option value="Student Group">Student / University Rep</option>
                    <option value="Corporate / CSR Team">Corporate / CSR Planner</option>
                    <option value="School / Teacher">Teacher / Secondary School</option>
                    <option value="Tourist">Tourist</option>
                  </select>
                </div>

                {/* Contact phone/email */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Phone or Email for follow-up *</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="081-XXX-XXXX / somkit.u@line"
                    required
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Quantity requested */}
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Size / Units needed</label>
                    <input
                      type="text"
                      value={quantityOrGroupSize}
                      onChange={(e) => setQuantityOrGroupSize(e.target.value)}
                      placeholder="e.g. 15 participants / 20 units"
                      className="w-full p-2 rounded border border-slate-300 bg-white"
                    />
                  </div>

                  {/* Best Date */}
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Preferred Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full p-2 rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                {/* Message comments */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Special Notes or Questions</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi, we would love to customize wood labels with our university logo if possible."
                    rows={3.5}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-750 hover:bg-indigo-700 text-white font-bold py-3 rounded-full transition-all shadow-md shadow-indigo-200 cursor-pointer text-xs"
                >
                  Send Request to Center Staff
                </button>
              </form>
            </div>
          )}
          </div>
        </div>
      </div>
  );
}
