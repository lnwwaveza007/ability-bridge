/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Calculator, 
  Plus, 
  Trash2, 
  DollarSign, 
  Sparkles, 
  HeartHandshake, 
  Info, 
  Volume2, 
  Copy, 
  Check, 
  Share2, 
  Tag, 
  TrendingUp, 
  Layers,
  ArrowRight
} from "lucide-react";
import { Offering, AccessibilitySettings, OfferingType } from "../types";

interface PriceCalculatorProps {
  offerings: Offering[];
  onAddOffering: (offering: Offering) => void;
  highContrast: boolean;
  settings: AccessibilitySettings;
  onAnnounce: (text: string) => void;
}

interface MaterialItem {
  id: string;
  name: string;
  cost: number;
}

export default function PriceCalculator({
  offerings,
  onAddOffering,
  highContrast,
  settings,
  onAnnounce
}: PriceCalculatorProps) {
  // 1. CHOOSE ACTIVE CALCULATOR
  const [calcType, setCalcType] = useState<OfferingType>("PRODUCT");

  // State lists for custom calculators
  const [materialItems, setMaterialItems] = useState<MaterialItem[]>([]);
  const [newMatName, setNewMatName] = useState("");
  const [newMatCost, setNewMatCost] = useState("");

  // Labor Settings
  const [traineeHours, setTraineeHours] = useState<number>(2.5);
  const [traineeHourlyWage, setTraineeHourlyWage] = useState<number>(120); // THB per hour (good fair wage)
  
  // Batch volume (for CAFE_SERVICE)
  const [batchSize, setBatchSize] = useState<number>(12); // e.g., 12 cups brewed in one bulk pot
  
  // Expected group attendees (for EVENT_PACKAGE)
  const [eventAttendees, setEventAttendees] = useState<number>(15);
  const [venueDirectCost, setVenueDirectCost] = useState<number>(500); // flat rent helper

  // Markup & Margins
  const [overheadPercent, setOverheadPercent] = useState<number>(15); // coordinator/jig depreciation
  const [seContributionPercent, setSeContributionPercent] = useState<number>(20); // SE reinvestment fund

  // Market comparison prices
  const [cheapMarketComparison, setCheapMarketComparison] = useState<number>(45);
  
  // Status feedback
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string>("pine-stand");

  // AI-advisor voice coaching text
  const [isCoaching, setIsCoaching] = useState(false);
  const [advisorAnalysisText, setAdvisorAnalysisText] = useState("");
  
  // Offering Quick Add fields
  const [exportNameEn, setExportNameEn] = useState("");
  const [exportNameTh, setExportNameTh] = useState("");
  const [exportCategory, setExportCategory] = useState("Office Crafts / ของแต่งโต๊ะทำงาน");

  // PRESETS CONFIG
  const PRESETS = {
    PRODUCT: [
      {
        id: "pine-stand",
        label: "Premium Wooden Phone Stand (ที่วางมือถือไม้สนพรีเมียม)",
        materials: [
          { id: "1", name: "Reclaimed Pine Solid Block", cost: 35 },
          { id: "2", name: "Anti-slip Silicon Feet Pads", cost: 10 },
          { id: "3", name: "Premium Water-Resistant Wood Seal", cost: 15 },
          { id: "4", name: "Cotton Dust Bag & Tag casing", cost: 20 }
        ],
        hours: 2,
        hourlyWage: 120,
        overhead: 15,
        sePercent: 20,
        comparison: 50,
        nameEn: "Custom Polished Pine Phone Holder",
        nameTh: "ที่วางโทรศัพท์ไม้สนขัดเงาพิเศษ",
        category: "Office Crafts / ของแต่งโต๊ะทำงาน"
      },
      {
        id: "cedar-coaster",
        label: "Ergonomic Wood Coasters Set of 4 (ชุดรองแก้วไม้หอม 4 ชิ้น)",
        materials: [
          { id: "1", name: "Cedar Wood Rounds x 4", cost: 80 },
          { id: "2", name: "Tactile EVA base pads x 4", cost: 16 },
          { id: "3", name: "Food-safe beeswax finishing", cost: 25 },
          { id: "4", name: "Raffia ribbon & craft box packaging", cost: 30 }
        ],
        hours: 3.5,
        hourlyWage: 120,
        overhead: 20,
        sePercent: 15,
        comparison: 70,
        nameEn: "Dual-sanded Cedar Coaster Set of 4",
        nameTh: "ชุดจานรองแก้วไม้ซีดาร์ขัดพรีเมียม 4 ชิ้น",
        category: "Office Crafts / ของแต่งโต๊ะทำงาน"
      }
    ],
    CAFE_SERVICE: [
      {
        id: "cold-brew",
        label: "Eco-Glass Rosehibiscus Cold Brew Batch (ชาสกัดเย็นผสมสมุนไพร 12 ขวด)",
        materials: [
          { id: "1", name: "Organic Hibiscus & Rose tea bag leaves", cost: 110 },
          { id: "2", name: "Purified Alkaline Ice Water", cost: 20 },
          { id: "3", name: "Glass Swing-Top Bottles x 12", cost: 180 },
          { id: "4", name: "Hand-stamped waterproof paper stickers", cost: 50 },
          { id: "5", name: "Citrus lemon rings & honey essence", cost: 40 }
        ],
        batchSize: 12,
        hours: 1.5,
        hourlyWage: 125,
        overhead: 10,
        sePercent: 15,
        comparison: 40,
        nameEn: "Organic Rose Hibiscus Cold Brew (Bottled)",
        nameTh: "ชากุหลาบกระเจี๊ยบสกัดเย็นขวดแก้วอินทรีย์",
        category: "Food & Beverage / เครื่องดื่มและคาเฟ่"
      },
      {
        id: "espresso-catering",
        label: "Signature Matcha Latte Blend (กลุ่มชาเขียวถ้วยพรีเมียม 20 แก้ว)",
        materials: [
          { id: "1", name: "Uji Ceremonial Matcha powder", cost: 250 },
          { id: "2", name: "Organic Pasteurised Whole Milk 4L", cost: 160 },
          { id: "3", name: "Biodegradable sugarcane fiber cups x 20", cost: 80 },
          { id: "4", name: "Hand-sanded customized wooden cup sleeves", cost: 120 },
          { id: "5", name: "Organic coconut sugar syrup digest", cost: 50 }
        ],
        batchSize: 20,
        hours: 2.5,
        hourlyWage: 130,
        overhead: 15,
        sePercent: 20,
        comparison: 55,
        nameEn: "Ceremonial Kraft Matcha Latte (Group Catering)",
        nameTh: "มัทฉะลาเต้พรีเมียมถ้วยใยอ้อยอินทรีย์",
        category: "Food & Beverage / เครื่องดื่มและคาเฟ่"
      }
    ],
    EVENT_PACKAGE: [
      {
        id: "workshop-drip",
        label: "15-Person Slow Coffee Drip & Sanding Workshop (เวิร์กชอปดริปกาแฟ)",
        materials: [
          { id: "1", name: "Fresh Specialty Coffee Roasted Beans", cost: 350 },
          { id: "2", name: "Paper Cone Filters & brewing gear hire", cost: 150 },
          { id: "3", name: "Fresh-baked homemade gluten-free cookies", cost: 400 },
          { id: "4", name: "Wooden Coaster Blank kits to sand on-site", cost: 350 },
          { id: "5", name: "Tactile handbook with sensory translation steps", cost: 200 }
        ],
        attendees: 15,
        venueCost: 600,
        hours: 5,
        hourlyWage: 150, // Higher facilitator pay
        overhead: 15,
        sePercent: 25,
        comparison: 350,
        nameEn: "Specialty Sensory Coffee & Tactile Craft Workshop",
        nameTh: "เวิร์กชอปสัมผัสเรียนรู้ดริปกาแฟช้าและงานฝีมือไม้",
        category: "Event Modules / คอร์สและกิจกรรมเรียนรู้"
      }
    ]
  };

  // Initialize form first preset on load or calcType swap
  useEffect(() => {
    loadPreset(PRESETS[calcType][0]?.id || "");
  }, [calcType]);

  const loadPreset = (presetId: string) => {
    const list = PRESETS[calcType];
    const item = list.find(p => p.id === presetId);
    if (!item) return;

    setActivePresetId(presetId);
    setMaterialItems(item.materials.map(m => ({ ...m })));
    setTraineeHours(item.hours);
    setTraineeHourlyWage(item.hourlyWage);
    setOverheadPercent(item.overhead);
    setSeContributionPercent(item.sePercent);
    setCheapMarketComparison(item.comparison);
    
    // Quick add fields
    setExportNameEn(item.nameEn);
    setExportNameTh(item.nameTh);
    setExportCategory(item.category);

    if ("batchSize" in item) {
      setBatchSize(item.batchSize);
    }
    if ("attendees" in item) {
      setEventAttendees(item.attendees);
    }
    if ("venueCost" in item) {
      setVenueDirectCost(item.venueCost);
    }

    setAdvisorAnalysisText("");
  };

  // Calculations
  const materialsSubtotal = materialItems.reduce((acc, curr) => acc + curr.cost, 0);
  
  // Trainee Labor Subtotal
  const directTraineeWageTotal = traineeHours * traineeHourlyWage;

  // Let's compute Base Costs per unit:
  let rawMaterialCostPerUnit = 0;
  let laborWageCostPerUnit = 0;
  let flatVenueCostPerUnit = 0;

  if (calcType === "PRODUCT") {
    rawMaterialCostPerUnit = materialsSubtotal;
    laborWageCostPerUnit = directTraineeWageTotal;
  } else if (calcType === "CAFE_SERVICE") {
    rawMaterialCostPerUnit = materialsSubtotal / (batchSize || 1);
    laborWageCostPerUnit = directTraineeWageTotal / (batchSize || 1);
  } else if (calcType === "EVENT_PACKAGE") {
    rawMaterialCostPerUnit = materialsSubtotal / (eventAttendees || 1);
    laborWageCostPerUnit = directTraineeWageTotal / (eventAttendees || 1);
    flatVenueCostPerUnit = venueDirectCost / (eventAttendees || 1);
  }

  const baseCostPerUnit = rawMaterialCostPerUnit + laborWageCostPerUnit + flatVenueCostPerUnit;
  
  // Markup computations
  const overheadAmountPerUnit = baseCostPerUnit * (overheadPercent / 100);
  const seContributionAmountPerUnit = baseCostPerUnit * (seContributionPercent / 100);
  
  // Total Suggested Price per unit
  const suggestedPricePerUnit = baseCostPerUnit + overheadAmountPerUnit + seContributionAmountPerUnit;
  const finalPriceRounded = Math.ceil(suggestedPricePerUnit);

  // Material item handlers
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatName.trim() || !newMatCost) return;
    const costNum = parseFloat(newMatCost);
    if (isNaN(costNum) || costNum < 0) return;

    const newItem: MaterialItem = {
      id: `mat-${Date.now()}`,
      name: newMatName.trim(),
      cost: costNum
    };

    setMaterialItems([...materialItems, newItem]);
    setNewMatName("");
    setNewMatCost("");
    onAnnounce(`Added raw material: ${newItem.name} costing ${newItem.cost} THB`);
  };

  const handleDeleteMaterial = (id: string) => {
    const item = materialItems.find(m => m.id === id);
    setMaterialItems(materialItems.filter(m => m.id !== id));
    if (item) {
      onAnnounce(`Removed raw material: ${item.name}`);
    }
  };

  // Advisor Feedback script generator
  const triggerPriceSpeechCoaching = () => {
    setIsCoaching(true);
    onAnnounce("Advisor Coach is calculating value pillars and analyzing pricing sustainability...");

    // Generate specific text recommendations based on math variables
    const wagePremiumRatio = (laborWageCostPerUnit / suggestedPricePerUnit) * 100;
    const targetValueTh = calcType === "PRODUCT" 
      ? "โต๊ะทำงานสร้างสรรค์แบบมินิมอล มีเรื่องราวการขัดละเอียดของ Suda" 
      : calcType === "CAFE_SERVICE" 
        ? "เครื่องดื่มสกัดออร์แกนิกพิเศษที่เสิร์ฟพร้อมที่สวมถ้วยไม้ขัดละเอียดโดยผู้พิการ" 
        : "กระบวนการสื่้อสารเพื่อความเท่าเทียมผ่านประสาทสัมผัสและเมล็ดกาแฟแท้";

    const feedbackText = `Pricing analysis completed for: "${exportNameEn}". 
      The calculated fair-dignity price is ฿${finalPriceRounded} THB per unit. 
      Compared to low-cost mass alternatives of ฿${cheapMarketComparison} THB, this price has a premium of ฿${Math.max(0, finalPriceRounded - cheapMarketComparison)} THB. 
      Why is this premium completely justified? 
      FIRST, ${wagePremiumRatio.toFixed(0)}% of this total price goes directly into the learner's pocket as fair wages. That is ฿${laborWageCostPerUnit.toFixed(0)} THB per client, which supports Suda and Lek towards sustainable independent living. 
      SECOND, rather than asking for charitable handouts which strips away dignity, we justify the ฿${finalPriceRounded} THB rate by providing professional value: Hand-crafted, multi-grit sanded cedar, food-grade coatings, and customized story packaging tags. 
      Advisor coach recommends using the slogan: 'Elegance with High Social ROI'.
    `;

    setTimeout(() => {
      setAdvisorAnalysisText(feedbackText);
      setIsCoaching(false);
      onAnnounce("Coaching advice generated. You can play back or copy the social story cards!");
      
      // Voice synthesis read back
      if (settings.voiceEnabled && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          `Analysis is ready. Proposed price is ${finalPriceRounded} Baht. Trainee wage share is ${wagePremiumRatio.toFixed(0)} percent. This is sustainable value.`
        );
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
      }
    }, 1200);
  };

  // Copy specs sheet to clipboard
  const handleCopySpecs = () => {
    const specsSheet = `
ABILITYBRIDGE ACADEMY - DIGNITY PRICING SPECIFICATION SHEET
---------------------------------------------------------
Offering Name (EN): ${exportNameEn}
Offering Name (TH): ${exportNameTh}
Category: ${exportCategory}
Calculator Profile: ${calcType}

1. DIRECT PRIME PRODUCTION COSTS
- Raw Materials Subtotal: ฿${materialsSubtotal.toFixed(2)} THB
${calcType !== "PRODUCT" ? `- Unit Base Batch Allocator: ฿${rawMaterialCostPerUnit.toFixed(2)} THB per unit` : ""}
- Trainee Productive Labor: ${traineeHours} hrs @ ฿${traineeHourlyWage}/hr (Total: ฿${directTraineeWageTotal.toFixed(2)} THB)
- Direct Trainee Labor Per Unit: ฿${laborWageCostPerUnit.toFixed(2)} THB
${calcType === "EVENT_PACKAGE" ? `- Allocated Venue & Prep: ฿${flatVenueCostPerUnit.toFixed(2)} THB` : ""}
- Combined Direct Cost Per Unit: ฿${baseCostPerUnit.toFixed(2)} THB

2. DURABLE SYSTEM OVERHEADS
- Workspace & Adaptive Equip Support Rate (${overheadPercent}%): ฿${overheadAmountPerUnit.toFixed(2)} THB per unit
- 20Rai SE Reinvestment Growth Fund (${seContributionPercent}%): ฿${seContributionAmountPerUnit.toFixed(2)} THB per unit

3. FINAL INTENDED PRICING PROJECTION
- Suggested Dignity-Model Price: ฿${suggestedPricePerUnit.toFixed(2)} THB
- Final Clean Rounded Price tag: ฿${finalPriceRounded} THB
- Trainee Direct Wage share: ${(laborWageCostPerUnit / suggestedPricePerUnit * 100).toFixed(0)}% of total customer payment
- Cheaper Market Charity Comparison: ฿${cheapMarketComparison} THB (Dignity-based index: ${(finalPriceRounded / (cheapMarketComparison || 1) * 100).toFixed(0)}% of market rate)

Generated: ${new Date().toLocaleDateString()}
"Quality over philanthropy & Dignity first!"
`;

    navigator.clipboard.writeText(specsSheet);
    setCopiedStatus(true);
    onAnnounce("Copied pricing specifications sheet to your system clipboard!");
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  // Submit calculated offering to the parent offerings state
  const handleExportToOfferings = () => {
    if (!exportNameEn.trim() || !exportNameTh.trim()) {
      alert("Please fill in both English and Thai names for register.");
      return;
    }

    const payload: Offering = {
      id: `off-calc-${Date.now()}`,
      type: calcType,
      nameEn: exportNameEn.trim(),
      nameTh: exportNameTh.trim(),
      category: exportCategory,
      description: `Premium sustainable offering priced transparently using our Dignity-first model. Trainees received fair living wages directly during workshop operations.`,
      storyNotes: `Produced during professional trainee workshops. Trainee received direct wages based on ${traineeHours} hours of meticulous craftsmanship.`,
      targetCustomer: "Corporate CSR, local eco-shoppers and conscious corporate teams.",
      price: `${finalPriceRounded} THB`,
      priceNum: finalPriceRounded,
      altText: `Eco-premium craft item ${exportNameEn} beautifully styled with natural elements showing high social impact.`,
      imageUrl: calcType === "PRODUCT" 
        ? "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300"
        : calcType === "CAFE_SERVICE"
          ? "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300"
          : "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=300",
      materials: materialItems.map(m => m.name).join(", ") || "Conscious organic ingredients",
      productionTime: `${traineeHours} hours of dedicated trainee craft`,
      moq: calcType === "PRODUCT" ? 10 : 1,
      createdAt: new Date().toISOString().split("T")[0]
    };

    onAddOffering(payload);
    setExportSuccess(true);
    onAnnounce(`Success! Added ${exportNameEn} to offerings with a tag price of ฿${finalPriceRounded} THB`);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div className={`space-y-6 ${highContrast ? "text-white" : "text-slate-800"}`}>
      {/* HEADER BANNER */}
      <div className={`p-6 rounded-2xl border transition-all ${
        highContrast 
          ? "bg-black border-white" 
          : "bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-lg shadow-indigo-900/15"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              Dignity Valuation Engine (เครื่องมือคำนวณและตั้งราคาสินค้า)
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              {settings.simpleLanguage 
                ? "Dignity Pricing Calculator" 
                : "Inclusive Worth & Price Formulation Engine"}
            </h2>
            <p className="text-sm text-indigo-100/95 max-w-2xl">
              {settings.simpleLanguage
                ? "Input raw material costs and work hours to compute beautiful, sustainable prices where learners earn high direct wages."
                : "Step away from sympathy-based pricing. Calculate accurate rates that cover direct student wages, supportive overheads, and reinvestments fairly."}
            </p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <Calculator size={36} className="text-indigo-400 shrink-0" />
            <div className="text-left font-mono">
              <span className="block text-[10px] text-indigo-300 uppercase font-bold tracking-widest">Pricing Strategy</span>
              <span className="text-xs text-white font-extrabold">Value over Sympathy</span>
            </div>
          </div>
        </div>
      </div>

      {/* CALCULATOR TYPE SELECTOR TABS */}
      <div className="flex gap-2">
        {(["PRODUCT", "CAFE_SERVICE", "EVENT_PACKAGE"] as OfferingType[]).map((type) => {
          const isActive = calcType === type;
          let label = "Handicrafts (งานมือ)";
          if (type === "CAFE_SERVICE") label = "Cafe Portions (เครื่องดื่ม/เบเกอรี)";
          if (type === "EVENT_PACKAGE") label = "Corporate Seminars (เวิร์กชอป/กลุ่ม)";

          return (
            <button
              key={type}
              onClick={() => setCalcType(type)}
              className={`px-4 py-2 text-xs font-black transition-all cursor-pointer border rounded-full ${
                isActive
                  ? "bg-indigo-600 border-indigo-600 text-white shadow"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {type === "PRODUCT" ? "📦 " : type === "CAFE_SERVICE" ? "☕ " : "🤝 "}
              {label}
            </button>
          )}
        )}
      </div>

      {/* TWO COLUMNS CHASSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CONTROL PANEL - INPUT CARDS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* PRESET LOAD RIBBON */}
          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm space-y-2.5">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Tag size={14} className="text-indigo-505 text-indigo-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Load Quick Presets (ตัวอย่างสินค้าเพื่อคำนวณเบื้องต้น)</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {PRESETS[calcType].map((p) => (
                <button
                  key={p.id}
                  onClick={() => loadPreset(p.id)}
                  className={`text-left text-xs p-2.5 rounded-xl border transition-all flex-1 font-semibold ${
                    activePresetId === p.id
                      ? "border-indigo-500 bg-indigo-50/60 text-indigo-900 font-extrabold"
                      : "border-slate-150 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="block text-[10px] text-slate-450 uppercase mb-0.5">Preset Profile</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC FORM */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-5">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Step 1: Raw Material Costs (ต้นทุนวัตถุดิบและบรรจุภัณฑ์)
            </h3>
            
            {/* Materials List Table */}
            <div className="space-y-3">
              {materialItems.length === 0 ? (
                <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                  No materials recorded. Add items below to calculate physical cost.
                </div>
              ) : (
                <div className="border border-slate-150 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-50 p-2 font-bold text-slate-500 grid grid-cols-12 gap-2 border-b border-slate-155">
                    <div className="col-span-8">Ingredient / Wrapper Item Name</div>
                    <div className="col-span-3 text-right">Cost (THB)</div>
                    <div className="col-span-1 text-center">Delete</div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {materialItems.map((item) => (
                      <div key={item.id} className="p-2.5 grid grid-cols-12 gap-2 hover:bg-slate-50/60 items-center font-medium">
                        <div className="col-span-8 text-slate-800">{item.name}</div>
                        <div className="col-span-3 text-right font-mono font-bold text-slate-900">฿{item.cost.toFixed(2)}</div>
                        <div className="col-span-1 text-center">
                          <button
                            onClick={() => handleDeleteMaterial(item.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 inline-block cursor-pointer"
                            title="Remove cost item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="bg-slate-50/70 p-2.5 grid grid-cols-12 gap-2 font-extrabold text-slate-700">
                      <div className="col-span-8">Materials Subtotal:</div>
                      <div className="col-span-3 text-right font-mono border-t border-slate-300">฿{materialsSubtotal.toFixed(2)}</div>
                      <div className="col-span-1"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Material quick-form */}
              <form onSubmit={handleAddMaterial} className="flex gap-2 items-end">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-slate-505 text-slate-500 uppercase font-extrabold">Item Name (EN/TH)</label>
                  <input
                    type="text"
                    placeholder="e.g., Waterproof protective coating"
                    value={newMatName}
                    onChange={(e) => setNewMatName(e.target.value)}
                    className="w-full border border-slate-200 text-xs p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-24 space-y-1">
                  <label className="text-[10px] text-slate-505 text-slate-500 uppercase font-extrabold">Cost (THB)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="฿ 15"
                    value={newMatCost}
                    onChange={(e) => setNewMatCost(e.target.value)}
                    className="w-full border border-slate-200 text-xs p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-right font-mono font-bold"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMatName.trim() || !newMatCost}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold p-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Plus size={14} />
                  <span>Add Line</span>
                </button>
              </form>
            </div>
          </div>

          {/* SERVICE OR EVENT BATCH PARAMETERS IF RELEVANT */}
          {calcType === "CAFE_SERVICE" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
                Batch Allocation Settings (ตั้งค่าการแบ่งจำหน่ายต่อชุด)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Expected Batch Vol. (จำนวนแก้ว/ขวด):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={batchSize}
                    onChange={(e) => setBatchSize(Math.max(1, parseInt(e.target.value) || 1))}
                    className="p-2 border border-slate-200 rounded-lg w-full font-mono font-bold text-xs"
                  />
                  <span className="block text-[10px] text-slate-450">
                    Calculates single portion raw material cost: <strong>฿{(materialsSubtotal / (batchSize || 1)).toFixed(1)}</strong> THB/unit.
                  </span>
                </div>
                <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl text-[11px] font-medium leading-relaxed self-center">
                  ☕ <strong>Batch Math:</strong> We buy ingredients in packages but sell individually. Dividing the total packet cost keeps product tracking robust!
                </div>
              </div>
            </div>
          )}

          {calcType === "EVENT_PACKAGE" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
                Event & Workshop Settings (การกระจายทุนต่อรอบกิจกรรม)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Minimum Participants (จำนวนคน):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={eventAttendees}
                    onChange={(e) => setEventAttendees(Math.max(1, parseInt(e.target.value) || 1))}
                    className="p-2 border border-slate-200 rounded-lg w-full font-mono font-bold text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Flat Venue Rent / Prep (ค่าสถานศึกษา):
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={venueDirectCost}
                    onChange={(e) => setVenueDirectCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="p-2 border border-slate-200 rounded-lg w-full font-mono font-bold text-xs"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-400">
                Spreads flat expenses: ฿{(venueDirectCost / eventAttendees).toFixed(1)} THB flat rate added to each participant's ticket price.
              </p>
            </div>
          )}

          {/* STEP 2: TRAINEE LABOR AND DIRECT WAGES */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">
                Step 2: Fair Scholar Learning Wage (ส่วนแบ่งค่าจ้างนักเรียน)
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full uppercase">
                Dignity-Driven
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Rather than standard commercial minimum wages, we can reward meticulous, adaptive efforts directly in the pricing formula.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hours Taken */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-705 text-slate-700">
                  <span>Craft Time / Prep (ชั่วโมงการทำ):</span>
                  <span className="font-mono text-indigo-600 underline font-black">{traineeHours} hours</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={traineeHours}
                  onChange={(e) => setTraineeHours(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="block text-[10px] text-slate-400">
                  Total direct labor spend: <strong>{traineeHours * 60} mins</strong> of dedicated work.
                </span>
              </div>

              {/* Wage Rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-705 text-slate-700">
                  <span>Target Hour Wage (บาท/ชม.):</span>
                  <span className="font-mono text-emerald-600 underline font-black">฿{traineeHourlyWage}/hr</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="5"
                  value={traineeHourlyWage}
                  onChange={(e) => setTraineeHourlyWage(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <span className="block text-[10px] text-slate-400">
                  Thailand minimum equivalent: ฿350-360 daily (avg ฿45/hr). We pay <strong>฿{traineeHourlyWage}</strong> for skilled output.
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-medium">
              <div className="flex items-center gap-1.5">
                <HeartHandshake size={15} className="text-emerald-600" />
                <span>Computed Learner wage return:</span>
              </div>
              <strong className="font-mono text-emerald-700 text-sm">
                ฿{directTraineeWageTotal.toFixed(0)} THB per cycle {calcType !== "PRODUCT" && `(${laborWageCostPerUnit.toFixed(1)}/unit)`}
              </strong>
            </div>
          </div>

          {/* STEP 3: MARKUPS & SYSTEM REINVESTMENT */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Step 3: Sustainability Overheads & Social Impact Funds (การอุดหนุนส่วนปฎิบัติการ)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Coordinator support rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Adaptive Workstation Overhead:</span>
                  <span className="font-mono text-indigo-600 underline font-black">{overheadPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  step="5"
                  value={overheadPercent}
                  onChange={(e) => setOverheadPercent(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-450 leading-relaxed text-slate-400">
                  Covers coordinator guides, adaptive tactile templates, jigs, and utility power.
                </p>
              </div>

              {/* SE development fund */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Social Enterprise Growth Fund:</span>
                  <span className="font-mono text-purple-600 underline font-black">{seContributionPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="5"
                  value={seContributionPercent}
                  onChange={(e) => setSeContributionPercent(parseInt(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-450 leading-relaxed text-slate-400">
                  Reinvestment fund dedicated to welcoming and training new differently-abled schlolars.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PRICE ANALYSIS & STORIES EXPORT (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* PRICING BREAKDOWN SPECS BOARD */}
          <div className={`p-5 rounded-2xl border ${
            highContrast ? "bg-black border-white" : "bg-slate-900 text-white shadow-xl shadow-slate-950/20"
          } space-y-5 relative overflow-hidden`}>
            
            {/* Watermark decors */}
            <div className="absolute right-0 top-0 text-slate-800 font-extrabold tracking-tighter text-6xl opacity-10 pointer-events-none select-none font-mono">
              ฿THB
            </div>

            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] text-amber-400 font-black tracking-widest uppercase">
                CALCULATED WORTH (สรุปการวิเคราะห์มูลค่า)
              </span>
              <h3 className="text-lg font-extrabold text-white">Suggested Intended Price</h3>
            </div>

            {/* Giant Price Box */}
            <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-5 my-2">
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest">Recommended Value Tag</span>
              <div className="text-4xl sm:text-5xl font-black text-indigo-400 font-mono tracking-tight my-1">
                ฿{finalPriceRounded} <span className="text-lg text-white font-sans font-normal">THB</span>
              </div>
              <span className="block text-[10.5px] text-emerald-400 font-medium">
                {calcType === "PRODUCT" && "Per hand-finished physical product"}
                {calcType === "CAFE_SERVICE" && `Per cup portion (Batch of ${batchSize})`}
                {calcType === "EVENT_PACKAGE" && `Per head rate (For minimum ${eventAttendees} group)`}
              </span>
            </div>

            {/* Sub-itemized details */}
            <div className="space-y-2 text-[11px] font-sans">
              
              {/* Materials share */}
              <div className="flex justify-between border-b border-white/5 pb-1 text-slate-300">
                <span>Raw Materials Allocated Cost:</span>
                <span className="font-mono font-bold text-white">฿{rawMaterialCostPerUnit.toFixed(1)}</span>
              </div>

              {/* Wage share */}
              <div className="flex justify-between border-b border-white/5 pb-1 text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Direct Trainee Wage Share:</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">฿{laborWageCostPerUnit.toFixed(1)}</span>
              </div>

              {/* Venue */}
              {calcType === "EVENT_PACKAGE" && (
                <div className="flex justify-between border-b border-white/5 pb-1 text-slate-300">
                  <span>Space & Workshop Prep Allocated:</span>
                  <span className="font-mono font-bold text-white">฿{flatVenueCostPerUnit.toFixed(1)}</span>
                </div>
              )}

              {/* Overheads */}
              <div className="flex justify-between border-b border-white/5 pb-1 text-slate-300">
                <span>Adaptive Workspace Overhead ({overheadPercent}%):</span>
                <span className="font-mono font-bold text-white">฿{overheadAmountPerUnit.toFixed(1)}</span>
              </div>

              {/* SE fund */}
              <div className="flex justify-between border-b border-white/5 pb-1 text-slate-300 font-semibold">
                <span>Academy Growth Reinvestment (${seContributionPercent}%):</span>
                <span className="font-mono text-purple-300">฿{seContributionAmountPerUnit.toFixed(1)}</span>
              </div>

              {/* Combined base before markup */}
              <div className="flex justify-between pt-1.5 text-xs font-extrabold text-white">
                <span>Combined Prime Cost Base:</span>
                <span className="font-mono">฿{baseCostPerUnit.toFixed(1)}</span>
              </div>
            </div>

            {/* Direct Wage Percentage gauge */}
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-black tracking-wider text-slate-300">
                <span>Trainee Payback Sourcing Rate:</span>
                <span className="text-emerald-400 font-mono">
                  {((laborWageCostPerUnit / suggestedPricePerUnit) * 100).toFixed(0)}% direct return
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300" 
                  style={{ width: `${(laborWageCostPerUnit / suggestedPricePerUnit) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">
                Conscious buyers see this metric as a direct guarantee of social return on investment!
              </p>
            </div>

            {/* Actions Panel */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleCopySpecs}
                className="flex-1 flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold p-2 px-3 rounded-lg text-xs cursor-pointer transition border border-white/10"
              >
                {copiedStatus ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedStatus ? "Copied" : "Copy Specs Sheet"}</span>
              </button>

              <button
                onClick={triggerPriceSpeechCoaching}
                disabled={isCoaching}
                className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 px-3 rounded-lg text-xs cursor-pointer transition shadow shadow-indigo-900/30 font-sans"
              >
                <Volume2 size={13} />
                <span>Coach Analysis</span>
              </button>
            </div>

          </div>

          {/* DIGNITY STORY VS SYMPATHY BUYING BLOCK */}
          <div className="bg-white border border-slate-200/85 p-5 rounded-2xl shadow-sm space-y-4 text-xs font-sans text-slate-700 leading-relaxed font-medium">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <HeartHandshake size={15} className="text-indigo-600 shrink-0" />
              <span>Dignity-first Storyboard Guide</span>
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-rose-50 border border-rose-150 rounded-xl space-y-1">
                <span className="font-bold text-[10px] text-rose-800 block uppercase font-mono">⚠️ Cheap Sympathy Model (Unhelpful)</span>
                <p className="text-[11px] leading-relaxed">
                  "Please help support disabled orphans... Buy this simple pine widget for just 50 Baht."
                </p>
                <div className="text-[10px] text-rose-900 font-bold italic">
                  Creates dependency, burns out Suda's effort, and yields only ฿22 hourly. Unsustainable!
                </div>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl space-y-1">
                <span className="font-bold text-[10px] text-indigo-850 block uppercase font-mono">🌟 Premium Value Model (Dignity)</span>
                <p className="text-[11px] leading-relaxed">
                  "Certified solid salvaged cedar desk coaster. Double hand-sanded with water-resistant beeswax. Included personalized capability voice-recordings tag. ฿{finalPriceRounded} Baht."
                </p>
                <div className="text-[10px] text-indigo-950 font-bold italic">
                  Guarantees ฿{traineeHourlyWage} direct student wage. Corporate guests respect premium quality over charity handouts.
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400">
              * The pricing advisor generated this layout to empower staff and scholars to market with head-high confidence.
            </p>
          </div>

          {/* QUICK EXPORT TO LIVE OFFERINGS */}
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Share2 size={14} className="text-indigo-500" />
              <span>Step 4: Register as Academy Offering</span>
            </h3>

            {exportSuccess ? (
              <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-xl text-center text-emerald-950 animate-fade-in space-y-1">
                <Check size={20} className="text-emerald-600 mx-auto" />
                <h5 className="font-black text-xs">Registered Successfully!</h5>
                <p className="text-[10px]">Your custom calculations is added to the live catalogs.</p>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs font-medium">
                <p className="text-[11px] text-slate-500">
                  Save this formula pricing profile directly to set live item rates in your registry, allowing customers to send orders instantly!
                </p>

                {/* English Name input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Product/Service Name (English):</label>
                  <input
                    type="text"
                    value={exportNameEn}
                    onChange={(e) => setExportNameEn(e.target.value)}
                    placeholder="e.g., Luxury Sanded Pine Laptop Riser"
                    className="w-full border border-slate-200 p-2 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-bold"
                  />
                </div>

                {/* Thai Name Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">ชื่อภาษาไทย (Thai Name):</label>
                  <input
                    type="text"
                    value={exportNameTh}
                    onChange={(e) => setExportNameTh(e.target.value)}
                    placeholder="e.g., แท่นวางแล็ปท็อปไม้สนขัดพรีเมียม"
                    className="w-full border border-slate-200 p-2 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Section selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-450 uppercase font-bold">Offer Category:</label>
                  <select
                    className="p-2 border border-slate-200 rounded-lg w-full text-xs font-sans"
                    value={exportCategory}
                    onChange={(e) => setExportCategory(e.target.value)}
                  >
                    <option value="Office Crafts / ของแต่งโต๊ะทำงาน">Office Crafts / ของแต่งโต๊ะทำงาน</option>
                    <option value="Food & Beverage / เครื่องดื่มและคาเฟ่">Food & Beverage / เครื่องดื่มและคาเฟ่</option>
                    <option value="Event Modules / คอร์สและกิจกรรมเรียนรู้">Event Modules / คอร์สและกิจกรรมเรียนรู้</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleExportToOfferings}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-full transition shadow-md shadow-indigo-150 text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Export & Post Live Offering</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* SPEECH OVER COACHING NARRATIVE BOARD */}
          {advisorAnalysisText && (
            <div className="p-4 bg-indigo-950 border border-indigo-900 rounded-2xl text-white space-y-2 animate-fade-in text-left">
              <span className="block text-[9px] uppercase tracking-wider font-extrabold text-indigo-300">
                Advisor Pitch Coach (เสียงผู้ช่วยบรูว์):
              </span>
              <p className="text-[11px] leading-relaxed text-slate-200">
                {advisorAnalysisText}
              </p>
              <button
                onClick={() => {
                  if ("speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(advisorAnalysisText);
                    utterance.lang = "en-US";
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="text-[10px] font-extrabold text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Volume2 size={12} />
                <span>Play voice translation readout</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
