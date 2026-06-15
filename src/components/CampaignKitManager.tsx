/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Copy, Check, ExternalLink, QrCode, ClipboardList, Share2 } from "lucide-react";
import { CampaignKit, Offering } from "../types";

interface CampaignKitManagerProps {
  campaignKits: CampaignKit[];
  offerings: Offering[];
  onOpenPublicPage: (offeringId: string) => void;
  highContrast: boolean;
  onAnnounce: (text: string) => void;
}

export default function CampaignKitManager({
  campaignKits,
  offerings,
  onOpenPublicPage,
  highContrast,
  onAnnounce
}: CampaignKitManagerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const triggerCopy = (idName: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(idName);
    onAnnounce("Copied marketing caption to clipboard.");
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className={`space-y-6 ${highContrast ? "text-white" : "text-slate-800"}`}>
      <div>
        <h2 className="text-xl md:text-2xl font-black text-slate-950">Social Media Campaign Kits ({campaignKits.length})</h2>
        <p className="text-xs text-slate-500">
          These are ready-to-use finalized copy decks that your team can post on local Facebook, LINE, or Google Maps pages to drive physical cafe guests.
        </p>
      </div>

      {campaignKits.length === 0 ? (
        <div className={`p-8 rounded-2xl border text-center ${highContrast ? "border-white bg-black" : "bg-white border-slate-150"} py-16 space-y-3`}>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 font-bold">
            0
          </div>
          <h4 className="font-semibold text-slate-800 text-sm">No Published Campaign Kits</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Get started by going to the <strong>AI Assistant Panel</strong>, generating campaign elements for your offering, and checking the "Approve Draft" check.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {campaignKits.map((kit) => {
            const relatedOffering = offerings.find(o => o.id === kit.offeringId);
            
            return (
              <div 
                key={kit.id}
                className={`p-6 rounded-2xl border transition-all ${
                  highContrast ? "bg-black border-white" : "bg-white border-slate-200 shadow-sm"
                } space-y-5`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-105 pb-3.5 gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-black text-purple-600 bg-purple-50 tracking-wider px-2 py-0.5 rounded border border-purple-100">
                      Approved Kit: {relatedOffering?.type || "OFFERING"}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm md:text-base mt-2">
                      {kit.campaignName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Target Customers: {kit.targetCustomer}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Public page button */}
                    <button
                      onClick={() => onOpenPublicPage(kit.offeringId)}
                      className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-805 border border-indigo-200 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      <ExternalLink size={13} />
                      <span>Open Shared Page</span>
                    </button>
                  </div>
                </div>

                {/* Main Copy Assets Grid */}
                <div className="grid md:grid-cols-2 gap-5 text-xs text-slate-750">
                  {/* FB Card */}
                  <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-200/80 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[10px] text-blue-800 uppercase tracking-wider">Facebook Page Copy</span>
                      <button
                        onClick={() => triggerCopy(`${kit.id}-fb`, kit.facebookCaption)}
                        className="text-[10px] flex items-center gap-1 text-slate-500 hover:text-slate-900 font-extrabold cursor-pointer"
                      >
                        {copiedId === `${kit.id}-fb` ? (
                          <>
                            <Check size={12} className="text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy Caption</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-slate-150">
                      {kit.facebookCaption}
                    </p>
                  </div>

                  {/* LINE Card */}
                  <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-200/80 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[10px] text-green-700 uppercase tracking-wider">LINE Broadcast copy</span>
                      <button
                        onClick={() => triggerCopy(`${kit.id}-line`, kit.lineMessage)}
                        className="text-[10px] flex items-center gap-1 text-slate-500 hover:text-slate-900 font-extrabold cursor-pointer"
                      >
                        {copiedId === `${kit.id}-line` ? (
                          <>
                            <Check size={12} className="text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy Broadcast</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-slate-150 block text-indigo-950 font-medium">
                      {kit.lineMessage}
                    </p>
                  </div>
                </div>

                {/* Sub features row */}
                <div className="grid md:grid-cols-3 gap-4 text-xs">
                  {/* On Site QR description */}
                  <div className="border border-slate-200 p-4 rounded-xl space-y-1.5 md:col-span-2">
                    <span className="font-bold text-[10px] text-purple-600 uppercase tracking-widest flex items-center gap-1">
                      <QrCode size={13} />
                      <span>Table Stand / Tag QR Story Text</span>
                    </span>
                    <p className="text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-150 leading-relaxed">
                      "{kit.qrStory}"
                    </p>
                  </div>

                  {/* Photographer Checklist */}
                  <div className="border border-slate-200 p-4 rounded-xl space-y-2">
                    <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <ClipboardList size={13} className="text-indigo-600" />
                      <span>Photo Shot List</span>
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600 pl-4 list-decimal font-medium">
                      {kit.photoShotList.slice(0, 3).map((shot, idx) => (
                        <li key={idx} className="truncate">{shot}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Shareable campaign link mockup */}
                <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 leading-none">
                    <Share2 size={15} className="text-emerald-600 animate-pulse" />
                    <span>
                      <strong>Interactive QR Endpoint active:</strong> Scan code on leaflets or links cards to visit our customer booking page directly.
                    </span>
                  </div>
                  <span className="font-mono text-[10px] bg-white border border-emerald-200 px-2.5 py-1 rounded text-slate-500 italic select-all select-all">
                    https://academy.abilitybridge/public/{kit.offeringId}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
