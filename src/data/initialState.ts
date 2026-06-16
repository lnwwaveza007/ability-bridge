/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Offering, Inquiry, Task, LearnerProfile, Tool, CampaignKit } from "../types";

export const INITIAL_LEARNERS: LearnerProfile[] = [
  {
    id: "learner-suda",
    name: "Suda (สุดา)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    abilitySummary: "Excellent hand-eye coordination. Mastered triple-grit sanding. Works persistently with clear visual templates.",
    suitableTasks: ["Wood Sanding", "Product Labeling", "Table Setting", "Greeting Guests"],
    supportNeeds: "Requires a visual sequence checklist and quiet sitting periods after 40-minute blocks.",
    preferredEnvironment: "Quiet workbench with visual sand timer, low environmental clutter.",
    completedModules: [], // Start locked for demo: Suda must progress to unlock tools
    unlockedTools: []
  },
  {
    id: "learner-lek",
    name: "Lek (เล็ก)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    abilitySummary: "Warm, outgoing personality. Excellent verbal speed. Highly motivated to greet guests and serve juices.",
    suitableTasks: ["Customer Greeting", "Juice Serving", "Menu Arranging", "Product Boxing"],
    supportNeeds: "Benefits from standard greeting script cues and support with digital cashier touch interfaces.",
    preferredEnvironment: "Inclusive service counter, lively team surrounding him.",
    completedModules: [0, 1], // Completed Module 1 & 2
    unlockedTools: ["customer_persona"]
  },
  {
    id: "learner-nid",
    name: "Nid (นิด)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    abilitySummary: "Meticulous quality checker, highly structured focus. Exceptional attention to detail in packaging and box labeling.",
    suitableTasks: ["Quality Check", "Precision Coding", "Product Packaging", "Table Prep"],
    supportNeeds: "Thrives with structured touch templates and digital order cards.",
    preferredEnvironment: "Highly ordered desk space, clear item-flow directions.",
    completedModules: [0, 1, 2, 3], // Completed up to Module 4
    unlockedTools: ["customer_persona", "value_builder", "qr_story"]
  },
  {
    id: "learner-somchai",
    name: "Somchai (สมชาย)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    abilitySummary: "Calm, consistent focus. Mastered precision woodworking and edge sanding. Takes great pride in physical crafting metrics.",
    suitableTasks: ["Timber Cutting", "Coarse Sanding", "Stock Counting", "Chair Arranging"],
    supportNeeds: "Uses tactile guidelines and noise-reduction headphones on loud machines.",
    preferredEnvironment: "Woodworking workshop with designated physical safety tracks.",
    completedModules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // Completed all modules
    unlockedTools: [
      "marketing_helper",
      "price_calculator",
      "customer_persona",
      "value_builder",
      "qr_story",
      "campaign_kit",
      "shot_list",
      "inquiry_tracker",
      "task_breakdown",
      "skill_passport",
      "ai_helper"
    ]
  }
];

export const ALL_TOOLS: Tool[] = [
  {
    id: "marketing_helper",
    name: "Marketing Helper",
    description: "Guide learners through simple marketing choices: what we sell, who it helps, why it is good, and how to ask customers to act.",
    requiredModuleIndex: 0, // Unlocks with Module 1
    toolType: "Step-by-Step Marketing Coach",
    isAccessibilityFeature: false
  },
  {
    id: "price_calculator",
    name: "Worth & Price Calculator",
    description: "Help learners connect material cost, time, quality, and customer value to a fair price.",
    requiredModuleIndex: 0, // Unlocks with Module 1
    toolType: "Pricing Coach",
    isAccessibilityFeature: false
  },
  {
    id: "customer_persona",
    name: "Customer Persona Helper",
    description: "Build deep profiles showing what students, families, or corporate CSR managers care about.",
    requiredModuleIndex: 1, // Unlocks with Module 2
    toolType: "Persona Generator",
    isAccessibilityFeature: false
  },
  {
    id: "value_builder",
    name: "Value Proposition Builder",
    description: "Extract the exact physical quality, local story, and inclusive impact of your offerings.",
    requiredModuleIndex: 2, // Unlocks with Module 3
    toolType: "Slogan & Hook Craft",
    isAccessibilityFeature: false
  },
  {
    id: "qr_story",
    name: "QR Story Builder",
    description: "Generate beautiful, dignity-first onsite descriptions that scan from tags or table stands.",
    requiredModuleIndex: 3, // Unlocks with Module 4
    toolType: "Dignified Storyteller",
    isAccessibilityFeature: false
  },
  {
    id: "campaign_kit",
    name: "Campaign Kit Generator",
    description: "Produce pre-formatted Facebook, LINE, and Google Maps captions with tailored hashtags.",
    requiredModuleIndex: 4, // Unlocks with Module 5
    toolType: "Post Caption Builder",
    isAccessibilityFeature: false
  },
  {
    id: "shot_list",
    name: "Photo Shot List Generator",
    description: "Get structured shot lists (natural light, close-ups, staff servings) for professional photography.",
    requiredModuleIndex: 5, // Unlocks with Module 6
    toolType: "Visual Director",
    isAccessibilityFeature: false
  },
  {
    id: "inquiry_tracker",
    name: "Customer Inquiry Tracker",
    description: "Track incoming product quotations, coffee shop reservations, and workshop requests in one view.",
    requiredModuleIndex: 6, // Unlocks with Module 7
    toolType: "Lead Dashboard",
    isAccessibilityFeature: false
  },
  {
    id: "task_breakdown",
    name: "Task Breakdown Tool",
    description: "Deconstruct customer orders or reservations into tailored learner goals according to difficulty.",
    requiredModuleIndex: 7, // Unlocks with Module 8
    toolType: "Pacing & Assignment Maker",
    isAccessibilityFeature: false
  },
  {
    id: "skill_passport",
    name: "Skill Passport Export",
    description: "Compile course completions, unlocked features, and workshop tasks into an exportable resume.",
    requiredModuleIndex: 8, // Unlocks with Module 9
    toolType: "Portfolio Builder",
    isAccessibilityFeature: false
  },
  {
    id: "ai_helper",
    name: "Basic AI Using Assistant",
    description: "Learn to command ChatGPT, Gemini, and Claude using easy prompt guides for your social posts.",
    requiredModuleIndex: 9, // Unlocks with Module 10
    toolType: "AI Co-pilot Mode",
    isAccessibilityFeature: false
  }
];

export const INITIAL_OFFERINGS: Offering[] = [
  {
    id: "off-wooden-stand",
    type: "PRODUCT",
    nameEn: "Premium Wooden Phone Stand",
    nameTh: "ที่วางมือถือไม้สนพรีเมียมทำมือ",
    category: "Office Crafts / ของแต่งโต๊ะทำงาน",
    description: "An elegant, double-sanded tabletop companion made from solid recovered wood blocks. Suited for all phone weights and charging cords.",
    storyNotes: "Suda spent 4 weeks mastering exact sanding to ensure zero splinters. Hand-finished with food-safe protective oil and stamped with pride.",
    targetCustomer: "Office workers, students, corporate gifts, desk decoration seekers.",
    price: "150 THB",
    priceNum: 150,
    altText: "Handmade wooden card and phone stand styled elegantly with a phone resting on a polished clean light wooden surface surrounded by succulents.",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400",
    materials: "Recovered solid pine wood, food-safe oil coating.",
    productionTime: "1-2 days per piece",
    moq: 1,
    createdAt: "2026-06-15"
  },
  {
    id: "off-cafe-experience",
    type: "CAFE_SERVICE",
    nameEn: "20Rai Inclusive Cafe Experience",
    nameTh: "ประสบการณ์คาเฟ่เพื่อการเรียนรู้ที่ 20Rai",
    category: "Food & Beverage / เครื่องดื่มและคาเฟ่",
    description: "A calming cafe environment located in a rich forest garden. Sip our single-origin dark roast blends served and prepared by our professional trainees.",
    storyNotes: "Lek trained for 3 weeks to master customer greeting standards and ice ratio weighing, bringing heartwarming confidence to service delivery.",
    targetCustomer: "Weekend family groups, digital nomads, local tourists.",
    price: "45-80 THB (per drink)",
    priceNum: 60,
    altText: "A warm, sun-lit wooden cafe counter with professional espresso machine, single origins beans, with a friendly trainee smile and clean cup set.",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400",
    location: "20Rai Green Center, Nonthaburi",
    openingHours: "Wed - Sun (09:00 - 17:00)",
    menuHighlights: "Organic Strawberry Lemon Juice Soda, Signature Creamy Matcha, Trainee Latte Deco",
    createdAt: "2026-06-15"
  },
  {
    id: "off-csr-package",
    type: "EVENT_PACKAGE",
    nameEn: "20Rai CSR Group Visit Package",
    nameTh: "แพ็กเกจจัดกิจกรรม CSR สถาบันและองค์กร",
    category: "Team Building / เเวิร์กชอปหมู่คณะ",
    description: "A structured, 3-hour team workshop featuring hands-on wooden-sanding activity, a barista masterclass led by learners, and beautiful inclusive hospitality.",
    storyNotes: "Our trainees lead segments of the woodworking workshop, demonstrating skills and guiding visitors in creating custom souvenirs.",
    targetCustomer: "Corporate CSR teams, University clubs, private charity planners.",
    price: "350 THB (per participant)",
    priceNum: 350,
    altText: "A joyful group of corporate team visitors sitting around a clean woodworking table laughing and learning under the guidance of smiling trainers.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    groupSize: "10 - 30 guests",
    duration: "3 Hours",
    activities: "Barista show-making, custom coaster sanding, team-building storytelling game, hot cafe lunch",
    createdAt: "2026-06-15"
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq-001",
    offeringId: "off-csr-package",
    source: "Facebook",
    inquiryType: "CSR Package Request",
    customerName: "Khun Panida (PTT Chemical CSR Committee)",
    customerType: "Corporate / CSR Team",
    contact: "panida.p@pttgc.com / 081-345-XXXX",
    quantityOrGroupSize: "25 participants",
    preferredDate: "2026-07-10",
    message: "Hi, our team of 25 wants to experience the hands-on coaster sanding workshop + coffee training. Can we get a custom quote and book a morning session on Friday July 10th?",
    status: "Waiting for confirmation",
    assignedStaffId: "Staff-Amy",
    followUpDate: "2026-06-20",
    createdAt: "2026-06-12"
  },
  {
    id: "inq-002",
    offeringId: "off-wooden-stand",
    source: "LINE",
    inquiryType: "Product Quotation",
    customerName: "Achara (Kasetsart Business Association)",
    customerType: "Student Group",
    contact: "achara_ku_line / 082-990-XXXX",
    quantityOrGroupSize: "50 units",
    preferredDate: "2026-06-30",
    message: "Hello! We are interested in ordering 50 Premium Wooden Phone Stands with our university logo laser-engraved. Is it possible, and what is the turnaround time?",
    status: "New",
    assignedStaffId: "Staff-Kittisak",
    followUpDate: "2026-06-16",
    createdAt: "2026-06-14"
  },
  {
    id: "inq-003",
    offeringId: "off-cafe-experience",
    source: "Phone",
    inquiryType: "Cafe Visit Interest",
    customerName: "Ajan Somphot",
    customerType: "School / Teacher",
    contact: "somphot.k@school.ac.th / 086-112-XXXX",
    quantityOrGroupSize: "12 highschool youngsters",
    preferredDate: "2026-06-25",
    message: "Called to enquire about hosting a social studies field trip for 12 outstanding students to learn single-origin farming and service equality. Confirmed date. Need table setups.",
    status: "Confirmed",
    assignedStaffId: "Staff-Amy",
    followUpDate: "2026-06-18",
    createdAt: "2026-06-15"
  },
  {
    id: "inq-004",
    offeringId: "off-wooden-stand",
    source: "Walk-in",
    inquiryType: "Product Inquiry",
    customerName: "Khun Nattawut (Niche Cafe Owner)",
    customerType: "Individual",
    contact: "nattawut.niche@gmail.com / Walk-in buy",
    quantityOrGroupSize: "4 units",
    preferredDate: "2026-06-15",
    message: "Walked-in to check phone stand finishes. Loved the pine wood design. Purchased 4 directly, and wants to stay updated on future items.",
    status: "Completed",
    assignedStaffId: "Staff-Kittisak",
    createdAt: "2026-06-15"
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-001",
    offeringId: "off-wooden-stand",
    inquiryId: "inq-002",
    taskName: "Coarse and Medium Timber Sanding",
    taskCategory: "Production",
    description: "Sanding the rough-cut recovered pine blocks through 120 and 240 grit sheets until corners are completely safe.",
    difficulty: "Medium",
    supportLevel: "Medium",
    estimatedTime: "2 hours",
    visualInstructionRequired: true,
    assignedLearnerId: "learner-suda",
    assignedStaffId: "Staff-Kittisak",
    status: "In progress",
    createdAt: "2026-06-14"
  },
  {
    id: "task-002",
    offeringId: "off-wooden-stand",
    inquiryId: "inq-002",
    taskName: "Waterproof Oil Finish and Polish",
    taskCategory: "Production",
    description: "Apply food-safe oil with smooth rag, wait for drying, and wipe clean to highlight rich golden pine grains.",
    difficulty: "Easy",
    supportLevel: "Low",
    estimatedTime: "1 hour",
    visualInstructionRequired: true,
    assignedLearnerId: "learner-somchai",
    assignedStaffId: "Staff-Kittisak",
    status: "Pending",
    createdAt: "2026-06-14"
  },
  {
    id: "task-003",
    offeringId: "off-cafe-experience",
    inquiryId: "inq-003",
    taskName: "12-Guest Table Grid Arrangement",
    taskCategory: "Preparation",
    description: "Clean forest courtyard tables, arrange menus on top right, place custom coasters centered, with nice chairs lined.",
    difficulty: "Easy",
    supportLevel: "Medium",
    estimatedTime: "30 mins",
    visualInstructionRequired: true,
    assignedLearnerId: "learner-suda",
    assignedStaffId: "Staff-Amy",
    status: "Done",
    evidenceNote: "Suda arranged three separate courtyard tables perfectly. Table grids were aligned, and coasters centered precisely. Confirmed by Amy.",
    createdAt: "2026-06-15"
  },
  {
    id: "task-04",
    offeringId: "off-cafe-experience",
    inquiryId: "inq-003",
    taskName: "Welcome Greeting & Juice Serve",
    taskCategory: "Service",
    description: "Stand at the welcoming counter, perform a warm Wai gesture, recite greeting scripts, and walk juice sodas to school tables.",
    difficulty: "Medium",
    supportLevel: "High",
    estimatedTime: "1 hour",
    visualInstructionRequired: false,
    assignedLearnerId: "learner-lek",
    assignedStaffId: "Staff-Amy",
    status: "Pending",
    createdAt: "2026-06-15"
  }
];

// Rich prepared marketing configurations/AI outputs for the 3 concrete initial offerings
export const PREPARED_CAMPAIGN_KITS: Record<string, Partial<CampaignKit>> = {
  "off-wooden-stand": {
    campaignName: "Sustainable Pine Desktop Companion",
    targetCustomer: "Desk workers, remote coders, corporate CSR souvenir purchasers",
    valueProposition: "Durable, splinter-free recovered solid pine, sanded meticulously with 3 manual grades. Splendid desk ergonomics combined with high inclusive impact.",
    facebookCaption: "🪵 Upgrade your workspace with the elegant Premium Wooden Phone Stand! Hand-carved and triple-sanded for a beautiful water-safe touch. Fits all phone dimensions with charging access. By choosing our crafts, you are directly reinforcing the vocation and pride of disabled trainees at 20Rai center. Let's make every purchase count! ✨👇",
    lineMessage: "💼 Premium Wooden Phone Stand back in stock! Smooth solid pine touch. Only 150 THB. Click to order or request custom corporate laser engraving logos: [Link]",
    posterText: "SOLID PINE. METICULOUS MANUALLY SANDED. ZERO PITINESS: JUST QUALITY COMPANION.",
    googleMapsDescription: "Authentic, hand-painted and polished office desk crafts. Stop by to inspect the tactile finish on our wood stands, made with pride by learners.",
    qrStory: "This coaster was crafted by Suda. She spent 30 hours of continuous learning to perfect horizontal timber sanding gradients. Every fiber tells a story of patience, power, and vocational capability.",
    photoShotList: [
      "Product resting with phone on desk in warm sunlight",
      "Close-up of laser stamps on the base wood",
      "Learner smiling at their finished workbench holding a piece"
    ]
  },
  "off-cafe-experience": {
    campaignName: "Relaxing Weekend at 20Rai Garden Cafe",
    targetCustomer: "Local cafe-hoppers, organic drink seekers, family weekend escapees",
    valueProposition: "Quiet timber cottage nested in Nonthaburi forest garden, serving certified single-origins, run with heartwarming hospitality by capable apprentices.",
    facebookCaption: "🍃 Find your weekend peace at 20Rai Cafe. Our coffee is brewed with local single-origin beans, served by our proud inclusive crew. Sip refreshing Organic Strawberry Soda on our green patio. Every visit provides Lek and other trainees the canvas to practice real hospitality skills with dignity. Treat yourself to a meaningful cup! ☕🍰",
    lineMessage: "☕ Open this Wed-Sun from 09:00 - 17:00! Try our Signature Organic Matcha Latte and look around the forest conservatory. Reply 'RESERVE' to book a quiet working desk.",
    posterText: "20RAI GARDEN CAFE. REST YOUR SOUL, EXPAND THEIR WORK READINESS.",
    googleMapsDescription: "Scenic inclusive garden cafe serving local roasted beans and pastries. Ramps available, highly spacious and calm.",
    qrStory: "Every single-origin roast here is brewed using exact digital thermometers. Trainees weigh, grind, and pour with extreme dedication. Your visit helps Lek build lifelong autonomy.",
    photoShotList: [
      "Aerial view of garden table layouts with forest green",
      "Golden hour shot of Single Origin Trainee Latte Deco",
      "Lek giving a warm greeting smile at the counter"
    ]
  },
  "off-csr-package": {
    campaignName: "Interactive Team Sanding and Barista CSR Package",
    targetCustomer: "Corporate companies, university associations, corporate HR coordinators",
    valueProposition: "An unforgettable 3-hour team-building day with hands-on coaster crafting, learner-led coffee workshops, and tangible social return on investment metrics.",
    facebookCaption: "🤝 Looking for a CSR activity that isn't just about writing checks? Bring your team to 20Rai for our Interactive Group Visit Package! Participate in timber sanding beside our expert makers, learn coffee brewing secrets from our barista apprentices, and enjoy beautiful courtyard food. Give your team a story to remember while boosting community income! 💼✨",
    lineMessage: "🌟 Host your next team building at 20Rai! Includes custom sanded coaster gifts, meal package, and storytelling sessions. Download proposal deck here: [Link]",
    posterText: "HANDS-ON EMPOWERMENT: B2B CO-CREATION DAY WITH 20RAI TRAINEES.",
    googleMapsDescription: "High-yield Social Enterprise Workshop space. Equipped for up to 30 corporate guests with parking facilities.",
    qrStory: "Our corporate sessions are led directly by our learners. They co-sand timber side-by-side with managers, rewriting societal expectations around ability, team spirit, and equality.",
    photoShotList: [
      "Visitors laughing and co-sanding pine with trainee partners",
      "Barista presentation line showing high engagement",
      "Finished custom engraved coaster in the corporate bag"
    ]
  }
};
