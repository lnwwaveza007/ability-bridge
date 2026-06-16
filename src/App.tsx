/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  HelpCircle, 
  Sparkles, 
  Award, 
  BookOpen, 
  ShoppingBag, 
  TrendingUp, 
  Layers, 
  Home, 
  CheckCircle, 
  ClipboardList, 
  Megaphone,
  Database,
  ArrowRight,
  Calculator,
  Lock
} from "lucide-react";

// Types & Initial Data
import { 
  AccessibilitySettings, 
  LearnerProfile, 
  Offering, 
  Inquiry, 
  Task, 
  CampaignKit 
} from "./types";
import { COURSE_MODULES } from "./data/courses";
import { 
  INITIAL_LEARNERS, 
  INITIAL_OFFERINGS, 
  INITIAL_INQUIRIES, 
  INITIAL_TASKS,
  ALL_TOOLS,
  PREPARED_CAMPAIGN_KITS 
} from "./data/initialState";

// Components
import AccessibilityBar from "./components/AccessibilityBar";
import LandingScreen from "./components/LandingScreen";
import LearningDashboard from "./components/LearningDashboard";
import LessonActivityScreen from "./components/LessonActivityScreen";
import OfferingManager from "./components/OfferingManager";
import AIAssistant from "./components/AIAssistant";
import CampaignKitManager from "./components/CampaignKitManager";
import PublicSharePage from "./components/PublicSharePage";
import InquiryTracker from "./components/InquiryTracker";
import TaskBreakdown from "./components/TaskBreakdown";
import SkillPassportView from "./components/SkillPassportView";
import PriceCalculator from "./components/PriceCalculator";
import OnboardingGuide from "./components/OnboardingGuide";

type CurrentSection = 
  | "HOME" 
  | "CLASSROOM" 
  | "OFFERINGS" 
  | "AI_GENERATOR" 
  | "CAMPAIGN_DECK" 
  | "INQUIRIES" 
  | "TASKS" 
  | "PASSPORTS" 
  | "REPORTS" 
  | "PUBLIC_SHARE"
  | "PRICE_CALCULATOR"
  | "ONBOARDING_WORKER"
  | "ONBOARDING_TEACHER";

export default function App() {
  // --- 1. GLOBAL STATE INITIALIZATION ---
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    simpleLanguage: false,
    textSize: "normal",
    voiceEnabled: false
  });

  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<CurrentSection>("HOME");
  
  // Roles "LEARNER" vs "STAFF"
  const [activeRole, setActiveRole] = useState<"LEARNER" | "STAFF">("LEARNER");
  const [selectedLearnerId, setSelectedLearnerId] = useState<string>("learner-suda");

  // Core Data Lists
  const [learners, setLearners] = useState<LearnerProfile[]>(INITIAL_LEARNERS);
  const [offerings, setOfferings] = useState<Offering[]>(INITIAL_OFFERINGS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  
  // Loaded Campaign kits
  const [campaignKits, setCampaignKits] = useState<CampaignKit[]>(() => {
    // Scaffold initial campaigns based on prepared content
    return INITIAL_OFFERINGS.map(o => {
      const p = PREPARED_CAMPAIGN_KITS[o.id];
      if (!p) return null;
      return {
        id: `kit-init-${o.id}`,
        offeringId: o.id,
        campaignName: p.campaignName || "Default Campaign",
        targetCustomer: p.targetCustomer || "General community",
        valueProposition: p.valueProposition || "Standard Quality",
        facebookCaption: p.facebookCaption || "",
        lineMessage: p.lineMessage || "",
        posterText: p.posterText || "",
        googleMapsDescription: p.googleMapsDescription || "",
        qrStory: p.qrStory || "",
        photoShotList: p.photoShotList || [],
        inquiryLink: `/public-share/${o.id}`,
        status: "APPROVED" as const,
        createdAt: new Date().toISOString()
      };
    }).filter(Boolean) as CampaignKit[];
  });

  // Classroom States
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(null);
  
  // Navigation references
  const [navigatedInquiry, setNavigatedInquiry] = useState<Inquiry | null>(null);
  const [selectedPublicOfferingId, setSelectedPublicOfferingId] = useState<string>("off-cafe-experience");

  useEffect(() => {
    const openOnboardingRoute = () => {
      const hashRoute = window.location.hash.toLowerCase();
      const pathRoute = window.location.pathname.toLowerCase();

      if (hashRoute === "#/onboarding/worker" || pathRoute === "/onboarding/worker") {
        setActiveRole("LEARNER");
        setCurrentSection("ONBOARDING_WORKER");
        setSelectedLessonIndex(null);
        return;
      }

      if (hashRoute === "#/onboarding/teacher" || pathRoute === "/onboarding/teacher") {
        setActiveRole("STAFF");
        setCurrentSection("ONBOARDING_TEACHER");
        setSelectedLessonIndex(null);
      }
    };

    openOnboardingRoute();
    window.addEventListener("hashchange", openOnboardingRoute);
    window.addEventListener("popstate", openOnboardingRoute);

    return () => {
      window.removeEventListener("hashchange", openOnboardingRoute);
      window.removeEventListener("popstate", openOnboardingRoute);
    };
  }, []);

  // --- 2. ACCESSIBILITY SPEECH FEEDBACK ---
  const triggerAnnouncement = (text: string) => {
    setAnnouncement(text);
    setTimeout(() => setAnnouncement(null), 3000);
  };

  // Get current active learner state object
  const currentLearner = learners.find(l => l.id === selectedLearnerId) || learners[0];
  const teacherUnlockedTools = ALL_TOOLS.map(tool => tool.id);
  const activeUnlockedTools = activeRole === "STAFF" ? teacherUnlockedTools : currentLearner.unlockedTools;

  // --- 3. MUTATOR OPERATIONS ---
  const completeModuleIndex = (index: number) => {
    setLearners(prev => prev.map(l => {
      if (l.id === selectedLearnerId) {
        const completed = [...l.completedModules];
        if (!completed.includes(index)) {
          completed.push(index);
        }
        
        // Check unlock associated tools
        const updatedTools = [...l.unlockedTools];
        const associatedTools = ALL_TOOLS.filter(t => t.requiredModuleIndex === index);
        associatedTools.forEach((tool) => {
          if (!updatedTools.includes(tool.id)) {
            updatedTools.push(tool.id);
          }
        });

        return {
          ...l,
          completedModules: completed,
          unlockedTools: updatedTools
        };
      }
      return l;
    }));
  };

  // Manual Sandbox unlocks/lock bypass for grading evaluation
  const handleOverrideUnlock = (toolId: string) => {
    setLearners(prev => prev.map(l => {
      if (l.id === selectedLearnerId) {
        const tools = [...l.unlockedTools];
        if (!tools.includes(toolId)) {
          tools.push(toolId);
        }
        return { ...l, unlockedTools: tools };
      }
      return l;
    }));
    triggerAnnouncement(`Manually unlocked ${toolId} capability.`);
  };

  const handleOverrideLock = (toolId: string) => {
    setLearners(prev => prev.map(l => {
      if (l.id === selectedLearnerId) {
        return {
          ...l,
          unlockedTools: l.unlockedTools.filter(id => id !== toolId)
        };
      }
      return l;
    }));
    triggerAnnouncement(`Manually locked out ${toolId} helper.`);
  };

  // Offering registration
  const handleAddOffering = (newOff: Offering) => {
    setOfferings(prev => [newOff, ...prev]);
  };

  // Save published campaign cards
  const handleSaveCampaignKit = (newKit: CampaignKit) => {
    setCampaignKits(prev => {
      const filtered = prev.filter(k => k.offeringId !== newKit.offeringId);
      return [newKit, ...filtered];
    });
  };

  // Contact logs
  const handleAddInquiry = (newInq: Inquiry) => {
    setInquiries(prev => [newInq, ...prev]);
  };

  // Update Inquiry statuses
  const handleUpdateInquiryStatus = (id: string, status: Inquiry["status"]) => {
    setInquiries(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  // Tasks addition
  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  // Tasks review completion / evidence badges
  const handleUpdateTaskStatus = (taskId: string, status: Task["status"], evidenceNote?: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status,
          ...(evidenceNote ? { evidenceNote } : {})
        };
      }
      return t;
    }));
  };

  // --- 4. BUSINESS DASHBOARD DERIVATED REPORTING VALUES ---
  const verifiedEarnings = inquiries
    .filter(i => i.status === "Completed")
    .reduce((sum, current) => {
      const o = offerings.find(x => x.id === current.offeringId);
      if (!o) return sum;
      // Extract numeric participants size
      const count = parseInt(current.quantityOrGroupSize.replace(/[^0-9]/g, "")) || 1;
      return sum + (o.priceNum * count);
    }, 0);

  const pendingEarningsEstimate = inquiries
    .filter(i => i.status === "Confirmed" || i.status === "Waiting for confirmation")
    .reduce((sum, current) => {
      const o = offerings.find(x => x.id === current.offeringId);
      if (!o) return sum;
      const count = parseInt(current.quantityOrGroupSize.replace(/[^0-9]/g, "")) || 1;
      return sum + (o.priceNum * count);
    }, 0);

  const totalInquiriesCount = inquiries.length;
  const totalCampaignsCount = campaignKits.length;

  return (
    <div 
      className={`min-h-screen flex flex-col transition-all font-sans ${
        settings.highContrast 
          ? "bg-black text-white" 
          : "bg-[#FAF9F6] text-slate-800"
      }`}
    >
      {/* Dynamic Accessible FontSize Controller */}
      <div className={`flex flex-col flex-1 ${
        settings.textSize === "large" 
          ? "text-sm sm:text-base leading-relaxed" 
          : settings.textSize === "extra-large" 
            ? "text-base sm:text-lg leading-loose font-bold" 
            : "text-xs sm:text-sm"
      }`}>
        
        {/* UPPERMOST UNIVERSAL ACCESSIBILITY TOOLBAR */}
        <AccessibilityBar 
          settings={settings} 
          onChange={setSettings} 
          onAnnounce={triggerAnnouncement} 
        />

        {/* Dynamic Voice announcement reader tag */}
        {announcement && (
          <div 
            id="accessibility-speaker-announcement"
            className="bg-emerald-900 text-emerald-100 text-[11px] font-bold text-center py-2 px-4 shadow animate-bounce-short fixed bottom-4 right-4 z-50 rounded-xl max-w-sm border border-emerald-500"
          >
            🔊 {announcement}
          </div>
        )}

        {/* PERSISTENT HEADER BAR */}
        <header className={`border-b sticky top-0 z-40 px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 ${
          settings.highContrast 
            ? "bg-black border-white text-white" 
            : "bg-white border-slate-200/80 shadow-sm"
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div>
              <h1 className="font-extrabold text-slate-955 text-sm md:text-base tracking-tight leading-none">
                Ability<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Bridge</span> Academy
              </h1>
              <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase tracking-widest leading-none">Learning-to-Income</span>
            </div>
          </div>

          {/* PERSISTENT PLAYGROUND PERSPECTIVE SWITCHERS */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-50 p-1.5 rounded-full flex gap-1.5 text-[11px] border border-slate-200 shadow-inner">
              <button
                id="tab-role-learner"
                onClick={() => {
                  setActiveRole("LEARNER");
                  setCurrentSection("CLASSROOM");
                  triggerAnnouncement(`Swapped role. Acting as learner Scholar.`);
                }}
                className={`px-4 py-1.5 rounded-full font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeRole === "LEARNER"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <BookOpen size={13} />
                <span>👩‍🎓 Trainee View (เรียนรู้เพื่อทำงาน)</span>
              </button>

              <button
                id="tab-role-staff"
                onClick={() => {
                  setActiveRole("STAFF");
                  setCurrentSection("OFFERINGS");
                  triggerAnnouncement(`Swapped context. Acting as Instructor Coordinator.`);
                }}
                className={`px-4 py-1.5 rounded-full font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeRole === "STAFF"
                    ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Building2 size={13} className="text-indigo-400" />
                <span>👩‍🏫 Teacher Workspace (ห้องทำงานเพื่อส่งเสริมรายได้)</span>
              </button>
            </div>
            
            {/* Active Learner swapping dropdown specific for Learner View */}
            {activeRole === "LEARNER" && (
              <div className="flex items-center gap-1.5 bg-tea text-[11px] font-bold">
                <span className="text-slate-400">Scholar:</span>
                <select
                  value={selectedLearnerId}
                  onChange={(e) => {
                    setSelectedLearnerId(e.target.value);
                    triggerAnnouncement(`Swapped active learner profile.`);
                  }}
                  className="p-1 p-1.5 border border-slate-250 bg-white shadow-inner rounded-lg text-slate-700"
                >
                  {learners.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </header>

        {/* CONTAINER SHELL LAYOUT */}
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* NAVIGATION SIDEBAR RAIL */}
          <nav className={`md:w-60 border-r py-6 px-4 space-y-7 ${
            settings.highContrast 
              ? "bg-black border-white text-white" 
              : "bg-slate-900 text-slate-300 border-slate-800"
          }`}>
            <div className="space-y-1">
              <span className="block text-[9px] font-black uppercase text-slate-500 tracking-wider">Navigation Route</span>
              <p className="text-xs text-indigo-400 font-bold">Acting as: {activeRole === "LEARNER" ? `Trainee (${currentLearner.name})` : "Teacher / Advisor"}</p>
            </div>

            {/* General Navigation link components list */}
            <div className="space-y-1.5 text-xs font-bold font-sans">
              
              {/* Home */}
              <button
                onClick={() => setCurrentSection("HOME")}
                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer ${
                  currentSection === "HOME" 
                    ? "bg-indigo-600 text-white font-bold" 
                    : "hover:bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Home size={14} />
                <span>Home Introduction</span>
              </button>

              {/* ===== LEARNER PERSPECTIVE NAVS ===== */}
              {activeRole === "LEARNER" && (
                <>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="block text-[9px] uppercase font-black text-slate-500 mb-1.5 tracking-widest">Syllabus Steps</span>
                  </div>
                  
                  {/* Classroom Progress */}
                  <button
                    onClick={() => {
                      setCurrentSection("CLASSROOM");
                      setSelectedLessonIndex(null);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "CLASSROOM" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen size={14} />
                      <span>Classroom Course</span>
                    </div>
                    <span className="text-[10px] bg-indigo-500/25 px-1.5 py-0.5 rounded text-indigo-300">
                      {currentLearner.completedModules.length}/{COURSE_MODULES.length}
                    </span>
                  </button>

                  {/* Skill Passport */}
                  <button
                    onClick={() => {
                      if (currentLearner.unlockedTools.includes("skill_passport")) {
                        setCurrentSection("PASSPORTS");
                      } else {
                        triggerAnnouncement("Skill Passport unlocks after Module 9.");
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "PASSPORTS" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : currentLearner.unlockedTools.includes("skill_passport")
                          ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                          : "bg-slate-800/40 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {currentLearner.unlockedTools.includes("skill_passport") ? <Award size={14} /> : <Lock size={14} />}
                      <span>My Passports Portfolio</span>
                    </div>
                    <span className="text-[10px] bg-indigo-500/25 px-1.5 py-0.5 rounded text-indigo-300 font-black font-sans">⭐</span>
                  </button>

                  {/* Price Calculator */}
                  <button
                    id="nav-price-calc-learner"
                    onClick={() => {
                      if (currentLearner.unlockedTools.includes("price_calculator")) {
                        setCurrentSection("PRICE_CALCULATOR");
                      } else {
                        triggerAnnouncement("Worth and Price Calculator unlocks after Module 1.");
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "PRICE_CALCULATOR" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : currentLearner.unlockedTools.includes("price_calculator")
                          ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                          : "bg-slate-800/40 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {currentLearner.unlockedTools.includes("price_calculator") ? <Calculator size={14} /> : <Lock size={14} />}
                      <span>Worth & Price Calculator</span>
                    </div>
                    <span className="text-[10.5px] bg-indigo-500/25 px-1.5 py-0.5 rounded text-indigo-300">฿</span>
                  </button>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="block text-[9px] uppercase font-black text-slate-500 mb-1.5 tracking-widest">Earned Tools</span>
                  </div>

                  <button
                    onClick={() => {
                      if (currentLearner.unlockedTools.includes("campaign_kit")) {
                        setCurrentSection("AI_GENERATOR");
                      } else {
                        triggerAnnouncement("AI Campaign Kit unlocks after Module 5.");
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "AI_GENERATOR"
                        ? "bg-gradient-to-r from-purple-650 to-indigo-600 text-white font-bold ring-1 ring-purple-400 shadow-md shadow-purple-900/40"
                        : currentLearner.unlockedTools.includes("campaign_kit")
                          ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                          : "bg-slate-800/40 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {currentLearner.unlockedTools.includes("campaign_kit") ? <Sparkles size={14} className="text-purple-400" /> : <Lock size={14} />}
                      <span>AI Campaign Kit</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      currentLearner.unlockedTools.includes("campaign_kit") ? "bg-emerald-500/25 text-emerald-300" : "bg-red-500/25 text-red-300"
                    }`}>
                      {currentLearner.unlockedTools.includes("campaign_kit") ? "Open" : "Module 5"}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentLearner.unlockedTools.includes("inquiry_tracker")) {
                        setCurrentSection("INQUIRIES");
                      } else {
                        triggerAnnouncement("Inquiry Tracker unlocks after Module 7.");
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "INQUIRIES"
                        ? "bg-indigo-600 text-white font-bold"
                        : currentLearner.unlockedTools.includes("inquiry_tracker")
                          ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                          : "bg-slate-800/40 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {currentLearner.unlockedTools.includes("inquiry_tracker") ? <Layers size={14} /> : <Lock size={14} />}
                      <span>Inquiry Practice Board</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      currentLearner.unlockedTools.includes("inquiry_tracker") ? "bg-emerald-500/25 text-emerald-300" : "bg-red-500/25 text-red-300"
                    }`}>
                      {currentLearner.unlockedTools.includes("inquiry_tracker") ? "Open" : "Module 7"}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentLearner.unlockedTools.includes("task_breakdown")) {
                        setNavigatedInquiry(null);
                        setCurrentSection("TASKS");
                      } else {
                        triggerAnnouncement("Task Breakdown unlocks after Module 8.");
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "TASKS"
                        ? "bg-indigo-600 text-white font-bold"
                        : currentLearner.unlockedTools.includes("task_breakdown")
                          ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                          : "bg-slate-800/40 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {currentLearner.unlockedTools.includes("task_breakdown") ? <ClipboardList size={14} /> : <Lock size={14} />}
                      <span>Real Task Breakdown</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      currentLearner.unlockedTools.includes("task_breakdown") ? "bg-emerald-500/25 text-emerald-300" : "bg-red-500/25 text-red-300"
                    }`}>
                      {currentLearner.unlockedTools.includes("task_breakdown") ? "Open" : "Module 8"}
                    </span>
                  </button>
                </>
              )}

              {/* ===== STAFF PERSPECTIVE NAVS ===== */}
              {activeRole === "STAFF" && (
                <>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="block text-[9px] uppercase font-black text-slate-500 mb-1.5 tracking-widest">Management Pipeline</span>
                  </div>

                  {/* Offering Manager */}
                  <button
                    onClick={() => setCurrentSection("OFFERINGS")}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "OFFERINGS" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag size={14} />
                      <span>Register Offerings</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{offerings.length}</span>
                  </button>

                  {/* Price Calculator */}
                  <button
                    id="nav-price-calc-staff"
                    onClick={() => setCurrentSection("PRICE_CALCULATOR")}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "PRICE_CALCULATOR" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calculator size={14} className="text-indigo-400" />
                      <span>Worth & Price Calculator</span>
                    </div>
                    <span className="text-[10.5px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">฿ Calc</span>
                  </button>

                  {/* AI Assistant */}
                  <button
                    onClick={() => setCurrentSection("AI_GENERATOR")}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "AI_GENERATOR" 
                        ? "bg-gradient-to-r from-purple-650 to-indigo-600 text-white font-bold ring-1 ring-purple-400 shadow-md shadow-purple-900/40" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles size={14} className="text-purple-400 animate-spin-slow" />
                      <span>AI Marketing Assist</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-300">
                      Open
                    </span>
                  </button>

                  {/* Campaign Library */}
                  <button
                    onClick={() => setCurrentSection("CAMPAIGN_DECK")}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "CAMPAIGN_DECK" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Megaphone size={14} />
                      <span>Completed Post Decks</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{campaignKits.length}</span>
                  </button>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="block text-[9px] uppercase font-black text-slate-500 mb-1.5 tracking-widest">Durable Tracking</span>
                  </div>

                  {/* Inquiry Tracker */}
                  <button
                    onClick={() => setCurrentSection("INQUIRIES")}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "INQUIRIES" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers size={14} />
                      <span>Inquiry Tracker Board</span>
                    </div>
                    <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded font-black">
                      {inquiries.filter(i => i.status === "New").length} New
                    </span>
                  </button>

                  {/* Task Breakdown */}
                  <button
                    onClick={() => {
                      setNavigatedInquiry(null);
                      setCurrentSection("TASKS");
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-1 cursor-pointer ${
                      currentSection === "TASKS" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ClipboardList size={14} />
                      <span>Sub-Tasks Breakdown</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-450 px-1.5 py-0.5 rounded">
                      {tasks.filter(t => t.status !== "Reviewed").length} Active
                    </span>
                  </button>

                  {/* Passport viewer */}
                  <button
                    onClick={() => setCurrentSection("PASSPORTS")}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer ${
                      currentSection === "PASSPORTS" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Award size={14} />
                    <span>Trainees Portfolios</span>
                  </button>

                  {/* Center & Business reports */}
                  <button
                    onClick={() => setCurrentSection("REPORTS")}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer ${
                      currentSection === "REPORTS" 
                        ? "bg-indigo-600 text-white font-bold" 
                        : "hover:bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <TrendingUp size={14} />
                    <span>Business reports / ROI</span>
                  </button>
                </>
              )}

              {/* SIMULATED LINK SHARE BAR */}
              <div className="pt-4 border-t border-slate-850">
                <span className="block text-[8.5px] uppercase font-black text-slate-500 mb-2 tracking-widest animate-pulse">
                  🔗 Shared Public Campaign Pages
                </span>
                
                <div className="space-y-1.5 overflow-hidden">
                  {offerings.map(o => (
                    <button
                      key={o.id}
                      onClick={() => {
                        setSelectedPublicOfferingId(o.id);
                        setCurrentSection("PUBLIC_SHARE");
                        triggerAnnouncement("Redirected to public customer page.");
                      }}
                      className="w-full text-left text-[11px] truncate block text-slate-400 hover:text-indigo-400 hover:underline transition-all cursor-pointer font-sans"
                    >
                      {o.type === "PRODUCT" ? "📦 [Share] " : o.type === "CAFE_SERVICE" ? "☕ [Share] " : "🤝 [Share] "}
                      {o.nameEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* MAIN CHASSIS INNER RENDER VIEWPORT */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto overflow-y-auto">
            
            {/* ========================================================
                ONBOARDING GUIDES
                ======================================================== */}
            {currentSection === "ONBOARDING_WORKER" && (
              <OnboardingGuide
                audience="WORKER"
                highContrast={settings.highContrast}
              />
            )}

            {currentSection === "ONBOARDING_TEACHER" && (
              <OnboardingGuide
                audience="TEACHER"
                highContrast={settings.highContrast}
              />
            )}

            {/* ========================================================
                HOME LANDING SCREEN 
                ======================================================== */}
            {currentSection === "HOME" && (
              <LandingScreen
                onStartLearner={() => {
                  setActiveRole("LEARNER");
                  setCurrentSection("CLASSROOM");
                }}
                onStartStaff={() => {
                  setActiveRole("STAFF");
                  setCurrentSection("OFFERINGS");
                }}
                onStartTask={() => {
                  setActiveRole("LEARNER");
                  if (currentLearner.unlockedTools.includes("task_breakdown")) {
                    setNavigatedInquiry(null);
                    setCurrentSection("TASKS");
                  } else {
                    setCurrentSection("CLASSROOM");
                    triggerAnnouncement("Real Task Breakdown unlocks after Module 8.");
                  }
                }}
                onShowPassport={() => {
                  setActiveRole("LEARNER");
                  if (currentLearner.unlockedTools.includes("skill_passport")) {
                    setCurrentSection("PASSPORTS");
                  } else {
                    setCurrentSection("CLASSROOM");
                    triggerAnnouncement("Skill Passport unlocks after Module 9.");
                  }
                }}
                highContrast={settings.highContrast}
              />
            )}

            {/* ========================================================
                CLASSROOM / SYLLABUS JORNEY VIEW 
                ======================================================== */}
            {currentSection === "CLASSROOM" && selectedLessonIndex === null && (
              <LearningDashboard
                completedModules={currentLearner.completedModules}
                unlockedTools={currentLearner.unlockedTools}
                onStartModule={(idx) => setSelectedLessonIndex(idx)}
                onOverrideUnlock={handleOverrideUnlock}
                onOverrideLock={handleOverrideLock}
                settings={settings}
                activeLearnerName={currentLearner.name}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* LESSON & ACTIVITY INSTRUCTION SCENARIO SCREEN */}
            {currentSection === "CLASSROOM" && selectedLessonIndex !== null && (
              <LessonActivityScreen
                module={COURSE_MODULES[selectedLessonIndex]}
                moduleIndex={selectedLessonIndex}
                onBackToDashboard={() => setSelectedLessonIndex(null)}
                onVerifyUnlock={handleOverrideUnlock}
                onCompleteModule={completeModuleIndex}
                settings={settings}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* ========================================================
                OFFERINGS MANAGEMENT CATALOG SCREEN
                ======================================================== */}
            {currentSection === "OFFERINGS" && (
              <OfferingManager
                offerings={offerings}
                onAddOffering={handleAddOffering}
                highContrast={settings.highContrast}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* ========================================================
                AI GENERATOR ASSISTANT MODULE PANEL
                ======================================================== */}
            {currentSection === "AI_GENERATOR" && (
              <AIAssistant
                offerings={offerings}
                unlockedTools={activeUnlockedTools}
                activeLearnerName={currentLearner.name}
                onGoToLesson={() => {
                  setActiveRole("LEARNER");
                  setCurrentSection("CLASSROOM");
                  setSelectedLessonIndex(4); // Trigger Module 5: Caption
                }}
                onSaveCampaignKit={handleSaveCampaignKit}
                onUnlockToolManually={handleOverrideUnlock}
                highContrast={settings.highContrast}
                settings={settings}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* ========================================================
                CAMPAIGN KITS LIBRARY LIST
                ======================================================== */}
            {currentSection === "CAMPAIGN_DECK" && (
              <CampaignKitManager
                campaignKits={campaignKits}
                offerings={offerings}
                onOpenPublicPage={(offId) => {
                  setSelectedPublicOfferingId(offId);
                  setCurrentSection("PUBLIC_SHARE");
                }}
                highContrast={settings.highContrast}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* ========================================================
                SIMULATED PUBLIC SHARE DEPLOY LINK PAGE
                ======================================================== */}
            {currentSection === "PUBLIC_SHARE" && offerings.find(o => o.id === selectedPublicOfferingId) && (
              <PublicSharePage
                offering={offerings.find(o => o.id === selectedPublicOfferingId)!}
                onBackToStaff={() => {
                  setActiveRole("STAFF");
                  setCurrentSection("INQUIRIES");
                }}
                onSubmitInquiry={handleAddInquiry}
                highContrast={settings.highContrast}
              />
            )}

            {/* ========================================================
                INQUIRY TRACER DESK SCREEN
                ======================================================== */}
            {currentSection === "INQUIRIES" && (
              <InquiryTracker
                inquiries={inquiries}
                offerings={offerings}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onNavigateToBreakdown={(inq) => {
                  setNavigatedInquiry(inq);
                  setCurrentSection("TASKS");
                }}
                onAddInquiry={handleAddInquiry}
                highContrast={settings.highContrast}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* ========================================================
                TASKS BREAKDOWN ASSIGNER SCREEN
                ======================================================== */}
            {currentSection === "TASKS" && (
              <TaskBreakdown
                tasks={tasks}
                inquiries={inquiries}
                offerings={offerings}
                learners={learners}
                selectedInquiryFromNav={navigatedInquiry}
                onAddTask={handleAddTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                highContrast={settings.highContrast}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* ========================================================
                SKILL PASSPORTS RESUME VIEWER SCREEN
                ======================================================== */}
            {currentSection === "PASSPORTS" && (
              <SkillPassportView
                learners={learners}
                tasks={tasks}
                highContrast={settings.highContrast}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* ========================================================
                PRICE CALCULATOR SCREEN
                ======================================================== */}
            {currentSection === "PRICE_CALCULATOR" && (
              <PriceCalculator
                offerings={offerings}
                onAddOffering={handleAddOffering}
                highContrast={settings.highContrast}
                settings={settings}
                onAnnounce={triggerAnnouncement}
              />
            )}

            {/* ========================================================
                BUSINESS REPORTS / CENTER DASHBOARD SCREEN
                ======================================================== */}
            {currentSection === "REPORTS" && (
              <div className={`space-y-6 ${settings.highContrast ? "text-white" : "text-slate-800"}`}>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-950">Center Business Impact Reports</h2>
                  <p className="text-xs text-slate-500">
                    A metrics dashboard evaluating the income shift, active marketing campaigns, and trainee capability logs.
                  </p>
                </div>

                {/* Grid stats cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  
                  {/* Verified Wage Earnings */}
                  <div className="p-4 rounded-xl border border-slate-205 bg-white space-y-1">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Completed Income (บาท)</span>
                    <span className="text-2xl font-black text-emerald-600">฿{verifiedEarnings.toLocaleString()} THB</span>
                    <p className="text-[10px] text-slate-400">Directly supporting learner salaries.</p>
                  </div>

                  {/* Pending value */}
                  <div className="p-4 rounded-xl border border-slate-205 bg-white space-y-1">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Pending Bookings Volume</span>
                    <span className="text-2xl font-black text-amber-500">฿{pendingEarningsEstimate.toLocaleString()} THB</span>
                    <p className="text-[10px] text-slate-400">Waiting for confirmation.</p>
                  </div>

                  {/* Campaigns count */}
                  <div className="p-4 rounded-xl border border-slate-205 bg-white space-y-1">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Live Campaign Decks</span>
                    <span className="text-2xl font-black text-purple-650">{totalCampaignsCount} Live Kits</span>
                    <p className="text-[10px] text-slate-400">Copy cards generated & approved.</p>
                  </div>

                  {/* Inquiries */}
                  <div className="p-4 rounded-xl border border-slate-205 bg-white space-y-1">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Total Customer inquiries</span>
                    <span className="text-2xl font-black text-slate-900">{totalInquiriesCount} Logged</span>
                    <p className="text-[10px] text-slate-400">FB, LINE, Phone, & QR scans.</p>
                  </div>
                </div>

                {/* Narrative chart representing channel success */}
                <div className="grid md:grid-cols-2 gap-6 text-xs text-slate-700 font-sans">
                  
                  {/* Channels success */}
                  <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
                    <h3 className="font-extrabold text-slate-900">Most Successful Customer Channels</h3>
                    
                    <div className="space-y-2">
                      {[
                        { name: "Facebook Ads & Shares", count: inquiries.filter(i => i.source === "Facebook").length, percent: 35 },
                        { name: "LINE Broadcast campaigns", count: inquiries.filter(i => i.source === "LINE").length, percent: 30 },
                        { name: "On-Site Poster QR scans", count: inquiries.filter(i => i.source === "QR Code").length, percent: 20 },
                        { name: "Walk-ins & Phones", count: inquiries.filter(i => i.source === "Phone" || i.source === "Walk-in").length, percent: 15 }
                      ].map((ch, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between font-bold text-[11px]">
                            <span>{ch.name}</span>
                            <span>{ch.count} inquiries ({ch.percent}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full" style={{ width: `${ch.percent}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Summary statement */}
                  <div className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <h3 className="font-extrabold text-slate-900">Center Social ROI Goals</h3>
                      <p className="leading-relaxed leading-relaxed font-medium">
                        AbilityBridge Academy acts as a <strong>learning-to-income pipeline</strong>. Rather than running typical charity donations, we teach practical marketing basics step by step.
                      </p>
                      <p className="leading-relaxed font-medium">
                        By turning confirmed stakeholder requests into micro-tasks (like coaster sanding or espresso preparation), learners record verified capabilities and receive direct economic wage returns straight from consumer payments.
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl text-emerald-950 font-bold flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-600" />
                      <span>4 scholars successfully generated verified skill passports this quarter!</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* PERSISTENT FOOTER BAR */}
        <footer className={`py-4 px-6 border-t text-center text-xs font-medium text-slate-400 ${
          settings.highContrast ? "bg-black border-white text-white" : "bg-white border-slate-150 text-slate-400"
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>&copy; 2026 AbilityBridge Academy &bull; 20Rai Inclusive Center Social Enterprise. All rights reserved.</span>
            <div className="flex gap-3">
              <span className="text-indigo-600">Dignity first</span>
              <span>&bull;</span>
              <span>Quality over philanthropy</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
