/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Headphones
} from "lucide-react";

interface LandingScreenProps {
  onStartLearner: () => void;
  onStartStaff: () => void;
  onStartTask: () => void;
  onShowPassport: () => void;
  highContrast: boolean;
}

export default function LandingScreen({
  onStartLearner,
  onStartStaff,
  onStartTask,
  onShowPassport,
  highContrast
}: LandingScreenProps) {
  const actionCards = [
    {
      title: "Learn one skill",
      subtitle: "Short lesson with easy words, audio support, and one clear win.",
      note: "Start here if you want to build confidence first.",
      icon: BookOpen,
      button: "Start learning",
      onClick: onStartLearner,
      style: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
    },
    {
      title: "Do a real task",
      subtitle: "Practice with work cards from customer orders, cafe service, or product prep.",
      note: "Best when you are ready to turn learning into work evidence.",
      icon: BriefcaseBusiness,
      button: "Open tasks",
      onClick: onStartTask,
      style: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
    },
    {
      title: "Show my skill passport",
      subtitle: "See proof of your lessons, support needs, strengths, and reviewed work.",
      note: "Use this to explain what job support helps you succeed.",
      icon: Award,
      button: "View passport",
      onClick: onShowPassport,
      style: "bg-slate-900 hover:bg-black text-white shadow-slate-200"
    }
  ];

  return (
    <div className={`max-w-7xl mx-auto space-y-8 transition-all ${highContrast ? "text-white" : "text-slate-800"}`}>
      <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 border border-emerald-100 rounded-full">
            <BadgeCheck size={14} />
            Job skills from real work
          </div>

          <div className="space-y-4">
            <h1 className={`text-4xl md:text-6xl font-black tracking-tight leading-tight ${highContrast ? "text-white" : "text-slate-950"}`}>
              Build skills. Do real tasks. Show proof for jobs.
            </h1>
            <p className={`text-base md:text-lg max-w-2xl leading-relaxed font-medium ${highContrast ? "text-white" : "text-slate-600"}`}>
              AbilityBridge helps disabled learners practice one clear skill at a time, use support tools when needed, and collect verified work evidence for a strength-based skill passport.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-2 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3">
              <Headphones size={18} className="text-indigo-700 shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-indigo-950">Listen, read easy words, or use bigger text.</span>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
              <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-emerald-950">Finish small steps without penalty.</span>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50/70 p-3">
              <Eye size={18} className="text-amber-700 shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-amber-950">See how each task supports job readiness.</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[340px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=900"
            alt="Team learning practical work skills together at a table"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-3">
            <span className="inline-flex px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[10px] font-black uppercase tracking-widest">
              Today path
            </span>
            <div className="grid grid-cols-3 gap-2 text-[11px] font-bold">
              <div className="rounded-xl bg-white/10 border border-white/15 p-3">1. Learn</div>
              <div className="rounded-xl bg-white/10 border border-white/15 p-3">2. Practice</div>
              <div className="rounded-xl bg-white/10 border border-white/15 p-3">3. Prove</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-5">
        {actionCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className={`p-5 rounded-2xl border transition-all ${
                highContrast ? "bg-black border-white" : "bg-white border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${highContrast ? "bg-white" : "bg-slate-100"}`}>
                    <Icon size={22} className="text-slate-900" />
                  </div>
                  <ArrowRight size={18} className="text-slate-300" />
                </div>

                <div className="space-y-2 flex-1">
                  <h2 className={`text-xl font-black ${highContrast ? "text-white" : "text-slate-950"}`}>{card.title}</h2>
                  <p className={`text-sm leading-relaxed font-medium ${highContrast ? "text-white" : "text-slate-600"}`}>{card.subtitle}</p>
                  <p className={`text-xs leading-relaxed ${highContrast ? "text-white" : "text-slate-400"}`}>{card.note}</p>
                </div>

                <button
                  onClick={card.onClick}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-black text-sm cursor-pointer transition-all shadow-lg ${card.style}`}
                >
                  <span>{card.button}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className={`p-5 rounded-2xl border ${highContrast ? "bg-black border-white" : "bg-slate-50 border-slate-200"}`}>
        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div className="space-y-2">
            <h2 className={`text-lg font-black ${highContrast ? "text-white" : "text-slate-950"}`}>Teacher workspace still available</h2>
            <p className={`text-sm ${highContrast ? "text-white" : "text-slate-600"}`}>
              Staff can register offerings, generate campaign kits, track inquiries, review tasks, and prepare business reports.
            </p>
          </div>
          <button
            id="btn-landing-staff"
            onClick={onStartStaff}
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-black px-5 py-3 rounded-xl text-sm cursor-pointer transition-all"
          >
            <ClipboardCheck size={17} />
            <span>Open teacher desk</span>
          </button>
        </div>
      </section>
    </div>
  );
}
