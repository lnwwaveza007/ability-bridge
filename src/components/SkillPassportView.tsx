/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, FileText, CheckCircle, Smartphone, Tag, User, MapPin, Sparkles, Send, Download } from "lucide-react";
import { LearnerProfile, Task, Tool } from "../types";
import { COURSE_MODULES } from "../data/courses";
import { ALL_TOOLS } from "../data/initialState";

interface SkillPassportViewProps {
  learners: LearnerProfile[];
  tasks: Task[];
  highContrast: boolean;
  onAnnounce: (text: string) => void;
}

export default function SkillPassportView({
  learners,
  tasks,
  highContrast,
  onAnnounce
}: SkillPassportViewProps) {
  const [selectedLearnerId, setSelectedLearnerId] = useState(learners[0]?.id || "");
  const [showPdfMock, setShowPdfMock] = useState(false);

  const activeLearner = learners.find(l => l.id === selectedLearnerId);
  const learnerTasks = tasks.filter(t => t.assignedLearnerId === selectedLearnerId && t.status === "Reviewed");

  const triggerPdfExport = () => {
    setShowPdfMock(true);
    onAnnounce(`Triggered skill passport export for ${activeLearner?.name}. Preparing resume card.`);
  };

  return (
    <div className={`space-y-6 ${highContrast ? "text-white" : "text-slate-800"}`}>
      {/* Top Selector bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-950">Inclusive Skill Passports</h2>
          <p className="text-xs text-slate-500">
            Strength-based digital resumes logging verified abilities, completed crafts, and certified coaching tasks.
          </p>
        </div>

        {/* Picker */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label className="text-xs font-black text-slate-500">View Trainee Passport: </label>
          <select
            value={selectedLearnerId}
            onChange={(e) => {
              setSelectedLearnerId(e.target.value);
              setShowPdfMock(false);
            }}
            className="p-2 border border-slate-205 bg-white font-bold rounded-xl text-xs cursor-pointer"
          >
            {learners.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {activeLearner && (
        <div className="grid lg:grid-cols-3 gap-6 text-xs font-semibold leading-relaxed">
          {/* Left Column: Profile Card & Ability Badges */}
          <div className="space-y-6 lg:col-span-1">
            {/* Main bio */}
            <div className={`p-5 rounded-3xl border shadow-sm text-center space-y-4 ${
              highContrast ? "bg-black border-white" : "bg-white border-slate-200"
            }`}>
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-indigo-500 shadow shadow-indigo-200">
                <img 
                  src={activeLearner.avatar} 
                  alt={activeLearner.name} 
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <h3 className="font-black text-[16px] text-slate-900 leading-none">
                  {activeLearner.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mt-1.5">
                  ID: AB-{activeLearner.id.toUpperCase().split("-")[1] || "992"}
                </span>
              </div>

              <div className="text-left bg-slate-50 p-3.5 rounded-xl border border-slate-150 space-y-2">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-black">Coaching Summary</span>
                <p className="text-slate-600 text-[11px] leading-relaxed font-sans font-medium">
                  "{activeLearner.abilitySummary}"
                </p>
              </div>

              {/* PDF Exporter trigger */}
              <button
                onClick={triggerPdfExport}
                className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-black text-white font-extrabold py-2.5 rounded-xl transition-all cursor-pointer shadow-sm text-[11px]"
              >
                <Download size={14} />
                <span>Export Strength Portfolio</span>
              </button>
            </div>

            {/* Accessibility environmental guidelines */}
            <div className={`p-4 rounded-2xl border ${
              highContrast ? "bg-black border-white" : "bg-indigo-50/40 border-indigo-100"
            } space-y-3`}>
              <h4 className="text-[10px] font-bold text-indigo-850 uppercase tracking-widest flex items-center gap-1">
                <Smartphone size={13} />
                <span>Support Cues & environment (คำแนะนำดูแลสุขภาวะ)</span>
              </h4>

              <div className="space-y-2 text-[11px] text-slate-705 leading-relaxed font-medium">
                <div>
                  <span className="block text-[9px] text-indigo-800 uppercase font-bold">Workspace Preferences:</span>
                  <p>{activeLearner.preferredEnvironment}</p>
                </div>
                <div>
                  <span className="block text-[9px] text-indigo-800 uppercase font-bold">Assistance Guidelines:</span>
                  <p>{activeLearner.supportNeeds}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns: Core Learning Progress & Task Evidence logs */}
          <div className="space-y-6 lg:col-span-2">
            {/* Syllabus completions & Unlocked tools */}
            <div className={`p-5 rounded-2xl border ${
              highContrast ? "bg-black border-white" : "bg-white border-slate-180"
            } space-y-4`}>
              <h3 className="font-black text-slate-950 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <Award size={16} className="text-purple-650" />
                <span>Academic & Tool Milestones</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Lessons badges list */}
                <div className="space-y-2">
                  <span className="block text-[10px] tracking-wider text-slate-400 uppercase font-black">Completed Lessons</span>
                  <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {activeLearner.completedModules.map((indexIdx) => {
                      const mod = COURSE_MODULES[indexIdx];
                      return (
                        <span 
                          key={indexIdx}
                          className="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-150 text-emerald-805 text-[10px] font-bold"
                        >
                          ✓ Mod {indexIdx + 1}: {mod.standardContent.title}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Unlocked tools list */}
                <div className="space-y-2">
                  <span className="block text-[10px] tracking-wider text-slate-400 uppercase font-black">Unlocked Toolbox Capabilities</span>
                  <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {activeLearner.unlockedTools.length === 0 ? (
                      <span className="text-slate-400 text-[10px] font-normal">No toolboxes unlocked yet.</span>
                    ) : (
                      activeLearner.unlockedTools.map((toolId) => {
                        const toolName = ALL_TOOLS.find(t => t.id === toolId)?.name || toolId;
                        return (
                          <span 
                            key={toolId}
                            className="px-2 py-1 rounded-lg bg-purple-50 border border-purple-150 text-purple-805 text-[10px] font-bold"
                          >
                            ⭐ {toolName}
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Verified tasks evidence log - MOST CRITICAL FEATURE */}
            <div className={`p-5 rounded-2xl border ${
              highContrast ? "bg-black border-white" : "bg-white border-slate-180"
            } space-y-4`}>
              <h3 className="font-black text-slate-950 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <FileText size={16} className="text-indigo-600 animate-pulse" />
                <span>Verified Practical Work Experience ({learnerTasks.length})</span>
              </h3>

              {learnerTasks.length === 0 ? (
                <div className="p-10 border border-dashed border-slate-180 rounded-xl text-center text-slate-400 font-normal py-16">
                  No fully completed or reviewed catalog tasks logged. Once tasks on the <strong>Task Breakdown Board</strong> are marked "Reviewed" by teachers, their physical metrics and verified support details will log here automatically!
                </div>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {learnerTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="p-3 bg-emerald-50/40 border border-emerald-150 rounded-xl space-y-2 text-[11px] leading-relaxed"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-xs">{task.taskName}</span>
                        <span className="text-[9px] uppercase font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                          QUALITY PASS
                        </span>
                      </div>
                      
                      <p className="text-slate-500 font-medium">Difficulty Level: <strong>{task.difficulty}</strong> &bull; Support Needed: <strong>{task.supportLevel}</strong></p>
                      
                      {task.evidenceNote && (
                        <div className="p-2 border border-emerald-200 bg-white rounded text-[10px] text-slate-700 italic">
                          "{task.evidenceNote}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export display PDF simulation popup modal */}
      {showPdfMock && activeLearner && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border-4 border-slate-900 relative">
            {/* Simulation Header watermark */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 justify-between">
              <div className="flex items-center gap-1 text-indigo-700">
                <Award size={18} />
                <span className="font-black text-sm uppercase tracking-wider">SECURE DIGITAL PASSPORT SYSTEM</span>
              </div>
              <button 
                onClick={() => setShowPdfMock(false)}
                className="text-xs font-bold text-slate-400 hover:text-red-600 cursor-pointer"
              >
                Close Print Preview
              </button>
            </div>

            {/* Printable Frame wrapper */}
            <div className="p-5 border border-slate-300 rounded-2xl bg-white space-y-5 shadow-inner">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <img 
                  src={activeLearner.avatar} 
                  alt={activeLearner.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div className="text-left font-sans space-y-0.5 text-xs">
                  <h4 className="font-black text-sm leading-none text-slate-900">{activeLearner.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Classification: Trained Crafts Associate</p>
                  <p className="text-[9px] text-slate-400">Academy Seal ID: AB-{activeLearner.id.split("-")[1].toUpperCase()}</p>
                </div>
              </div>

              {/* Bio summary */}
              <div className="space-y-1 text-xs">
                <span className="block text-[8.5px] uppercase text-slate-400 font-extrabold tracking-widest">ABILITIES STATEMENT</span>
                <p className="text-slate-750 font-sans italic bg-slate-50 p-3 rounded-lg border border-slate-150 leading-relaxed font-bold">
                  "{activeLearner.abilitySummary}"
                </p>
              </div>

              {/* Completed segments log */}
              <div className="space-y-1.5 text-xs">
                <span className="block text-[8.5px] uppercase text-slate-400 font-extrabold tracking-widest">COMPLETED TRAINING SYLLABI</span>
                <ul className="space-y-1 pl-4 list-disc text-slate-600 text-[10.5px]">
                  {activeLearner.completedModules.map(x => (
                    <li key={x}>Course Mod {x + 1}: {COURSE_MODULES[x]?.standardContent.title}</li>
                  ))}
                </ul>
              </div>

              {/* Task Evidence log */}
              <div className="space-y-2 text-xs">
                <span className="block text-[8.5px] uppercase text-slate-400 font-extrabold tracking-widest">VERIFIED QUALITY EXPERIENCES ({learnerTasks.length})</span>
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                  {learnerTasks.map(t => (
                    <div key={t.id} className="p-2 rounded bg-emerald-50 border border-emerald-100 text-[10px]">
                      <span className="block font-black text-emerald-950 truncate">{t.taskName}</span>
                      <p className="text-slate-550 truncate mt-0.5">Reviewed under {t.supportLevel.toLowerCase()} help. "{t.evidenceNote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA action bar */}
            <div className="text-center">
              <p className="text-[10px] text-slate-400 italic mb-3">Verified on-chain via AbilityBridge Academy, 2026 Nonthaburi Center.</p>
              <button
                onClick={() => {
                  alert("Simulating Print Action. Secure signature generated!");
                  setShowPdfMock(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-full text-xs hover:shadow-indigo-100 shadow-md shadow-indigo-150 transition-all cursor-pointer"
              >
                Send to Printer / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
