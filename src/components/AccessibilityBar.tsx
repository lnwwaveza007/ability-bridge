/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Eye, BookOpen, Type, Volume2, HelpCircle } from "lucide-react";
import { AccessibilitySettings } from "../types";

interface AccessibilityBarProps {
  settings: AccessibilitySettings;
  onChange: (newSettings: AccessibilitySettings) => void;
  onAnnounce: (text: string) => void;
}

export default function AccessibilityBar({ settings, onChange, onAnnounce }: AccessibilityBarProps) {
  const toggleHighContrast = () => {
    onChange({ ...settings, highContrast: !settings.highContrast });
    onAnnounce(!settings.highContrast ? "High contrast mode enabled." : "High contrast mode disabled.");
  };

  const toggleSimpleLanguage = () => {
    onChange({ ...settings, simpleLanguage: !settings.simpleLanguage });
    onAnnounce(!settings.simpleLanguage ? "Simple language mode enabled. Using easy words." : "Standard language mode enabled.");
  };

  const cycleTextSize = () => {
    const sizes: Array<"normal" | "large" | "extra-large"> = ["normal", "large", "extra-large"];
    const currentIndex = sizes.indexOf(settings.textSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    const nextSize = sizes[nextIndex];
    onChange({ ...settings, textSize: nextSize });
    onAnnounce(`Text size set to ${nextSize}.`);
  };

  const toggleVoice = () => {
    onChange({ ...settings, voiceEnabled: !settings.voiceEnabled });
    onAnnounce(!settings.voiceEnabled ? "Voice guidance activated. Click megaphone buttons to hear text." : "Voice guidance deactivated.");
  };

  return (
    <div 
      id="accessibility-bar" 
      className={`border-b transition-colors py-2.5 px-4 flex flex-wrap items-center justify-between gap-3 text-xs font-medium ${
        settings.highContrast 
          ? "bg-black border-white text-white" 
          : "bg-slate-50 border-slate-200/80 text-slate-700"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
          settings.highContrast ? "bg-white text-black" : "bg-indigo-600 text-white shadow-sm shadow-indigo-100"
        }`}>
          ACCESSIBILITY BAR / แถบสิ่งอำนวยความสะดวก
        </span>
        <span className="hidden md:inline text-slate-400 font-semibold" title="These toggles are always unlocked and adapt the system for all learners.">
          <HelpCircle size={14} className="inline mr-1" /> Always Active
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Contrast Toggle */}
        <button
          id="btn-accessibility-contrast"
          onClick={toggleHighContrast}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
            settings.highContrast 
              ? "bg-white text-black border-white hover:bg-slate-200" 
              : "bg-white text-slate-750 border-slate-200 hover:bg-slate-50 shadow-sm"
          } ${settings.highContrast ? "underline" : ""}`}
        >
          <Eye size={14} className={settings.highContrast ? "text-slate-900" : "text-indigo-600"} />
          <span>{settings.highContrast ? "Standard Contrast (สีปกติ)" : "High Contrast (เพิ่มความต่างสี)"}</span>
        </button>

        {/* Simple Language Toggle */}
        <button
          id="btn-accessibility-simple"
          onClick={toggleSimpleLanguage}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
            settings.simpleLanguage
              ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-750 shadow-sm"
              : "bg-white text-slate-750 border-slate-200 hover:bg-slate-50 shadow-sm"
          }`}
        >
          <BookOpen size={14} className={settings.simpleLanguage ? "text-white" : "text-indigo-600"} />
          <span>{settings.simpleLanguage ? "Standard Language (ภาษาทางการ)" : "Simple Language (ภาษาเข้าใจง่าย)"}</span>
        </button>

        {/* Text Size Cycle */}
        <button
          id="btn-accessibility-text"
          onClick={cycleTextSize}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-white text-slate-755 border-slate-200 hover:bg-slate-50 transition-all text-xs font-semibold focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
        >
          <Type size={14} className="text-indigo-600" />
          <span className="capitalize">
            Text: {settings.textSize.replace("-", " ")}
            {settings.textSize === "normal" && " (A)"}
            {settings.textSize === "large" && " (A+)"}
            {settings.textSize === "extra-large" && " (A++)"}
          </span>
        </button>

        {/* Voice Toggle */}
        <button
          id="btn-accessibility-voice"
          onClick={toggleVoice}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
            settings.voiceEnabled
              ? "bg-violet-650 bg-violet-600 text-white border-violet-550 hover:bg-violet-750 shadow-sm"
              : "bg-white text-slate-755 border-slate-200 hover:bg-slate-50 shadow-sm"
          }`}
        >
          <Volume2 size={14} className={settings.voiceEnabled ? "animate-pulse text-white" : "text-indigo-600"} />
          <span>{settings.voiceEnabled ? "Voice: Enabled (เปิดเสียง)" : "Voice / บรรยายเสียง"}</span>
        </button>
      </div>
    </div>
  );
}
