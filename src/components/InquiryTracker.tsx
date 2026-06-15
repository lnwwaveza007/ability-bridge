/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ListFilter, MessageCircle, RefreshCw, ClipboardCheck, ArrowRight, PlusCircle, Check, MapPin, PhoneCall } from "lucide-react";
import { Inquiry, Offering } from "../types";

interface InquiryTrackerProps {
  inquiries: Inquiry[];
  offerings: Offering[];
  onUpdateInquiryStatus: (inquiryId: string, status: Inquiry["status"]) => void;
  onNavigateToBreakdown: (inquiry: Inquiry) => void;
  onAddInquiry: (inquiry: Inquiry) => void;
  highContrast: boolean;
  onAnnounce: (text: string) => void;
}

export default function InquiryTracker({
  inquiries,
  offerings,
  onUpdateInquiryStatus,
  onNavigateToBreakdown,
  onAddInquiry,
  highContrast,
  onAnnounce
}: InquiryTrackerProps) {
  const [activeSourceFilter, setActiveSourceFilter] = useState<string>("ALL");
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("ALL");
  const [selectedInqId, setSelectedInqId] = useState<string | null>(inquiries[0]?.id || null);

  // New inquiry logger panel
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [source, setSource] = useState<Inquiry["source"]>("Facebook");
  const [inquiryType, setInquiryType] = useState<Inquiry["inquiryType"]>("Product Inquiry");
  const [customerType, setCustomerType] = useState<Inquiry["customerType"]>("Individual");
  const [size, setSize] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedOffId, setSelectedOffId] = useState(offerings[0]?.id || "");

  // Filters
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSource = activeSourceFilter === "ALL" || inq.source === activeSourceFilter;
    const matchesStatus = activeStatusFilter === "ALL" || inq.status === activeStatusFilter;
    return matchesSource && matchesStatus;
  });

  const selectedInq = inquiries.find(q => q.id === selectedInqId);
  const selectedOffering = offerings.find(o => o.id === selectedInq?.offeringId);

  const handleManualInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !contact) return;
    
    const newInq: Inquiry = {
      id: `inq-added-${Date.now()}`,
      offeringId: selectedOffId,
      source,
      inquiryType,
      customerName,
      customerType,
      contact,
      quantityOrGroupSize: size || "1",
      createdAt: new Date().toISOString().split('T')[0],
      message: notes,
      status: "New",
      assignedStaffId: "Staff-Teacher"
    };

    onAddInquiry(newInq);
    onAnnounce(`Logged new manual inquiry for ${customerName}.`);
    
    // reset form
    setCustomerName("");
    setContact("");
    setNotes("");
    setShowForm(false);
    setSelectedInqId(newInq.id);
  };

  return (
    <div className={`space-y-6 ${highContrast ? "text-white" : "text-slate-800"}`}>
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-950">Inquiry Tracker ({inquiries.length})</h2>
          <p className="text-xs text-slate-500">
            Monitor client orders, café bookings, or CSR enquiries logged across Facebook, LINE, and walk-ins.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2.5 px-5.5 rounded-full text-xs transition-all cursor-pointer shadow-lg shadow-indigo-150"
        >
          <PlusCircle size={15} />
          <span>{showForm ? "Hide Form" : "Log Manual Inquiry / ลงบันทึกผู้ติดต่อ"}</span>
        </button>
      </div>

      {showForm && (
        <form 
          onSubmit={handleManualInquirySubmit}
          className={`p-5 rounded-2xl border ${
            highContrast ? "bg-black border-white" : "bg-white border-slate-200 shadow-lg animate-fade-in"
          } space-y-4`}
        >
          <h3 className="font-extrabold text-xs uppercase text-slate-500">Add Customer Record Dialog</h3>
          
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {/* Customer name */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-705">Customer Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Khun Jiraporn"
                required
                className="w-full p-2 rounded border border-slate-300"
              />
            </div>

            {/* Contact details */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-705">Phone / Email / Social tag *</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="jiraporn@egat.eg / 089-XXXX"
                required
                className="w-full p-2 rounded border border-slate-300"
              />
            </div>

            {/* Source */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-705">Referral Channel</label>
              <select
                value={source}
                onChange={(e: any) => setSource(e.target.value)}
                className="w-full p-2 bg-white rounded border border-slate-300"
              >
                <option value="Facebook">Facebook Direct</option>
                <option value="LINE">LINE Group</option>
                <option value="Phone">Phone Call</option>
                <option value="Walk-in">Onsite Walk-In</option>
                <option value="CSR Contact">CSR Business Specialist</option>
              </select>
            </div>

            {/* Selected asset */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-705">Requested Catalog Asset</label>
              <select
                value={selectedOffId}
                onChange={(e) => setSelectedOffId(e.target.value)}
                className="w-full p-2 bg-white rounded border border-slate-300"
              >
                {offerings.map(o => (
                  <option key={o.id} value={o.id}>{o.nameEn}</option>
                ))}
              </select>
            </div>

            {/* Inquiry Category */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-705">Inquiry Type Category</label>
              <select
                value={inquiryType}
                onChange={(e: any) => setInquiryType(e.target.value)}
                className="w-full p-2 bg-white rounded border border-slate-300"
              >
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Product Quotation">Product Quotation</option>
                <option value="Cafe Visit Interest">Cafe Visit Interest</option>
                <option value="Group Visit Request">Group Visit Request</option>
                <option value="CSR Package Request">CSR Package Request</option>
              </select>
            </div>

            {/* Customer Category */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-705">Customer Segment Category</label>
              <select
                value={customerType}
                onChange={(e: any) => setCustomerType(e.target.value)}
                className="w-full p-2 bg-white rounded border border-slate-300"
              >
                <option value="Individual">Individual</option>
                <option value="Student Group">Student Group</option>
                <option value="Corporate / CSR Team">Corporate / CSR Team</option>
                <option value="School / Teacher">School Field Trip</option>
              </select>
            </div>

            {/* Units */}
            <div className="space-y-1 md:col-span-1">
              <label className="block font-bold text-slate-705">Size / Quantity needed</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="25 members / 30 stands"
                className="w-full p-2 rounded border border-slate-300"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1 md:col-span-2">
              <label className="block font-bold text-slate-705">Special Customer Message requests</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Needs visual table setups for wheelchair entries."
                className="w-full p-2 rounded border border-slate-300"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded text-slate-500 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition shadow-md shadow-indigo-100 cursor-pointer"
            >
              Add Record
            </button>
          </div>
        </form>
      )}

      {/* Main Board Grid */}
      <div className="grid lg:grid-cols-5 gap-6 text-xs font-semibold">
        {/* Left Side: Filter Rails & List list - 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          {/* Channel buttons filters */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
            {["ALL", "Facebook", "LINE", "Phone", "Walk-in", "QR Code"].map((src) => (
              <button
                key={src}
                onClick={() => setActiveSourceFilter(src)}
                className={`px-3 py-1.5 rounded-lg border text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  activeSourceFilter === src
                    ? "bg-indigo-605 bg-indigo-600 text-white border-indigo-600 shadow shadow-indigo-100"
                    : "bg-slate-50 hover:bg-slate-100/90 border-slate-205 text-slate-600"
                }`}
              >
                {src === "ALL" ? "All Sources" : src}
              </button>
            ))}
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap gap-1 border-b border-slate-100 pb-3">
            {["ALL", "New", "Waiting for confirmation", "Confirmed", "Completed"].map((st) => (
              <button
                key={st}
                onClick={() => setActiveStatusFilter(st)}
                className={`px-2 py-1 rounded text-[9px] uppercase font-bold transition-all cursor-pointer ${
                  activeStatusFilter === st
                    ? "bg-slate-800 text-white border-slate-800 shadow-sm"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                {st === "ALL" ? "All Statuses" : st.replace("Waiting for confirmation", "Wait")}
              </button>
            ))}
          </div>

          {/* Inquiries matching filters */}
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredInquiries.length === 0 ? (
              <p className="text-slate-400 text-center py-10 font-normal">No enquiries match those filters.</p>
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = selectedInqId === inq.id;
                
                return (
                  <button
                    key={inq.id}
                    onClick={() => setSelectedInqId(inq.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-300"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-extrabold text-[11px] text-slate-900 truncate max-w-[130px]">
                        {inq.customerName}
                      </span>
                      <span className={`text-[8.5px] tracking-wider uppercase font-black px-1.5 py-0.5 rounded ${
                        inq.status === "New" 
                          ? "bg-amber-100 text-amber-805 font-bold" 
                          : inq.status === "Confirmed" 
                            ? "bg-emerald-100 text-emerald-800" 
                            : inq.status === "Completed"
                              ? "bg-slate-100 text-slate-500"
                              : "bg-sky-100 text-sky-800"
                      }`}>
                        {inq.status.replace("Waiting for confirmation", "Wait")}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded uppercase text-[9px] font-black">{inq.source}</span>
                      <span className="truncate">&bull; {inquiries.length > 0 && offerings.find(o => o.id === inq.offeringId)?.nameEn}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Details & Action pane - 3 cols */}
        <div className="lg:col-span-3">
          {!selectedInq ? (
            <div className={`p-8 rounded-2xl border text-center h-full flex flex-col items-center justify-center ${
              highContrast ? "border-white bg-black" : "bg-white border-slate-150"
            } py-16`}>
              <span className="text-3xl">👤</span>
              <h4 className="font-bold text-slate-800 text-xs mt-2">No Selected Customer Entry</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Tick a request from the left list to review detailed messages, adjust bookings, and create lesson workshops.
              </p>
            </div>
          ) : (
            <div className={`p-5 rounded-2xl border ${
              highContrast ? "bg-black border-white" : "bg-white border-slate-200 shadow-sm"
            } space-y-6 animate-fade-in text-xs`}>
              
              {/* Header section details */}
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                      Referral from {selectedInq.source}
                    </span>
                    <span className="text-[10px] font-bold text-purple-700">Logged on {selectedInq.createdAt}</span>
                  </div>
                  <h3 className="font-black text-slate-950 text-sm md:text-base leading-none">
                    {selectedInq.customerName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <PhoneCall size={12} className="text-slate-400" />
                    <span>Contact Info: {selectedInq.contact}</span>
                  </p>
                </div>

                {/* Dropdown status update */}
                <div className="space-y-1 self-start">
                  <label className="block text-[9px] uppercase text-slate-400 font-black">Control Status</label>
                  <select
                    value={selectedInq.status}
                    onChange={(e: any) => {
                      onUpdateInquiryStatus(selectedInq.id, e.target.value);
                      onAnnounce(`Updated inquiry status to ${e.target.value}.`);
                    }}
                    className="p-1.5 font-bold border border-slate-250 bg-white rounded-lg cursor-pointer"
                  >
                    <option value="New">New (ใหม่)</option>
                    <option value="Contacted">Contacted (ติดต่อกลับแล้ว)</option>
                    <option value="Waiting for confirmation">Waiting for confirmation (รอการยืนยัน)</option>
                    <option value="Confirmed">Confirmed (ยืนยัน/รับยอด)</option>
                    <option value="Completed">Completed (จบงานสำเรฺจ)</option>
                    <option value="Cancelled">Cancelled (ยกเลิก)</option>
                  </select>
                </div>
              </div>

              {/* Interest specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-100 pb-4 bg-slate-50/50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Target Segment</span>
                  <span className="text-slate-700 font-bold">{selectedInq.customerType}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Requested Offering</span>
                  <span className="text-slate-705 font-black truncate max-w-[150px] inline-block" title={selectedOffering?.nameEn}>
                    {selectedOffering?.nameEn}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Yield Scale / size</span>
                  <span className="text-slate-700 font-bold">{selectedInq.quantityOrGroupSize}</span>
                </div>
                {selectedInq.preferredDate && (
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Booking Date</span>
                    <span className="text-slate-700 font-bold">{selectedInq.preferredDate}</span>
                  </div>
                )}
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Lead Officer</span>
                  <span className="text-slate-700 font-bold">{selectedInq.assignedStaffId || "Unassigned"}</span>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Customer Letter / Message notes</span>
                <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/30 p-3 rounded-lg border border-slate-150 whitespace-pre-line font-medium italic">
                  "{selectedInq.message || "No custom message logged."}"
                </p>
              </div>

              {/* ACTION: Turn demand into Tasks */}
              <div className="p-4 rounded-xl border bg-gradient-to-r from-indigo-900 to-slate-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow shadow-indigo-900/10">
                <div className="space-y-1">
                  <span className="block text-[9px] uppercase tracking-wider font-extrabold text-indigo-300">
                    LEARNER VOCATIONAL OPPORTUNITY
                  </span>
                  <h4 className="font-extrabold text-xs text-white">
                    Convert Confirmed Demand to Work Tasks
                  </h4>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Break this request into specialized micro-tasks suited for Suda, Lek, or Somchai's pacing goals.
                  </p>
                </div>

                <button
                  onClick={() => onNavigateToBreakdown(selectedInq)}
                  disabled={selectedInq.status !== "Confirmed" && selectedInq.status !== "Waiting for confirmation"}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                    selectedInq.status === "Confirmed" || selectedInq.status === "Waiting for confirmation"
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow shadow-indigo-300"
                      : "bg-slate-720 text-slate-400 cursor-not-allowed border border-white/10"
                  }`}
                  title="Only available for Confirmed or Waiting entries"
                >
                  <span>Deconstruct Into Tasks</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
