/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  FileCheck2,
  Megaphone,
  MessageSquareText,
  Route,
  Sparkles,
  UsersRound
} from "lucide-react";

type OnboardingAudience = "WORKER" | "TEACHER";

interface OnboardingGuideProps {
  audience: OnboardingAudience;
  highContrast: boolean;
}

const workerSteps = [
  {
    title: "Start with one lesson",
    body: "Learn one short marketing or work-readiness skill at a time. Use easy words, larger text, and audio support when needed.",
    icon: BookOpenCheck
  },
  {
    title: "Unlock support tools",
    body: "Finish lessons to unlock helpers like price calculator, customer persona, campaign kit, skill passport, and AI prompt support.",
    icon: Sparkles
  },
  {
    title: "Practice with real work",
    body: "Teachers assign confirmed cafe, product, or event requests as small tasks. Each task has clear difficulty, support level, and visual instructions.",
    icon: BriefcaseBusiness
  },
  {
    title: "Get reviewed evidence",
    body: "Teacher checks completed work and adds evidence notes, so skills become visible proof instead of hidden effort.",
    icon: ClipboardCheck
  },
  {
    title: "Show skill passport",
    body: "Completed lessons, reviewed tasks, strengths, support needs, and suitable work are collected into a skill passport.",
    icon: Award
  }
];

const teacherSteps = [
  {
    title: "Register offerings",
    body: "Add products, cafe services, or event packages with real value, price, customer target, story notes, and photos.",
    icon: FileCheck2
  },
  {
    title: "Create campaign kit",
    body: "Generate Facebook captions, LINE messages, poster text, Google Maps copy, QR story, and photo shot list.",
    icon: Megaphone
  },
  {
    title: "Track customer inquiries",
    body: "Log incoming requests from Facebook, LINE, phone, walk-ins, QR codes, or school and CSR contacts.",
    icon: MessageSquareText
  },
  {
    title: "Break demand into tasks",
    body: "Convert confirmed requests into small learner tasks with assigned worker, support level, time estimate, and clear instructions.",
    icon: Route
  },
  {
    title: "Review skills and reports",
    body: "Mark tasks reviewed, write evidence notes, monitor learner passports, and check business impact reports.",
    icon: UsersRound
  }
];

const workerUrls = [
  { label: "Worker onboarding", path: "/onboarding/worker" }
];

const teacherUrls = [
  { label: "Teacher onboarding", path: "/onboarding/teacher" }
];

export default function OnboardingGuide({ audience, highContrast }: OnboardingGuideProps) {
  const isWorker = audience === "WORKER";
  const steps = isWorker ? workerSteps : teacherSteps;
  const urls = isWorker ? workerUrls : teacherUrls;
  const title = isWorker ? "Worker Onboarding" : "Teacher Onboarding";
  const subtitle = isWorker
    ? "Know what to do next: learn, practice, prove skill, and build work readiness."
    : "Know whole delivery process: prepare offerings, create demand, assign work, and review evidence.";

  return (
    <div className={`max-w-6xl mx-auto space-y-6 ${highContrast ? "text-white" : "text-slate-800"}`}>
      <section className={`p-6 rounded-2xl border ${highContrast ? "bg-black border-white" : "bg-white border-slate-200 shadow-sm"}`}>
        <div className="space-y-3">
          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            isWorker ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"
          }`}>
            {isWorker ? "Worker path" : "Teacher path"}
          </span>
          <h1 className={`text-3xl md:text-5xl font-black tracking-tight ${highContrast ? "text-white" : "text-slate-950"}`}>
            {title}
          </h1>
          <p className={`text-base leading-relaxed max-w-3xl font-medium ${highContrast ? "text-white" : "text-slate-600"}`}>
            {subtitle}
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-5 gap-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article
              key={step.title}
              className={`p-4 rounded-xl border min-h-[210px] ${highContrast ? "bg-black border-white" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isWorker ? "bg-indigo-50" : "bg-emerald-50"}`}>
                    <Icon size={20} className={isWorker ? "text-indigo-700" : "text-emerald-700"} />
                  </div>
                  <span className="text-[11px] font-black text-slate-400">Step {index + 1}</span>
                </div>
                <h2 className={`text-base font-black ${highContrast ? "text-white" : "text-slate-950"}`}>{step.title}</h2>
                <p className={`text-xs leading-relaxed font-medium ${highContrast ? "text-white" : "text-slate-600"}`}>{step.body}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className={`p-5 rounded-2xl border ${highContrast ? "bg-black border-white" : "bg-slate-50 border-slate-200"}`}>
        <h2 className={`text-lg font-black mb-3 ${highContrast ? "text-white" : "text-slate-950"}`}>Direct URLs</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {urls.map((url) => (
            <div key={url.label} className={`p-3 rounded-xl border ${highContrast ? "border-white" : "bg-white border-slate-200"}`}>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{url.label}</p>
              <p className={`mt-1 text-sm font-black break-all ${isWorker ? "text-indigo-700" : "text-emerald-700"}`}>
                {url.path}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
