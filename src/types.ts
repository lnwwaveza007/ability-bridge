/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = "LEARNER" | "STAFF" | "ADMIN";

export interface AccessibilitySettings {
  highContrast: boolean;
  simpleLanguage: boolean;
  textSize: "normal" | "large" | "extra-large";
  voiceEnabled: boolean;
}

export type OfferingType = "PRODUCT" | "CAFE_SERVICE" | "EVENT_PACKAGE";

export interface Offering {
  id: string;
  type: OfferingType;
  nameEn: string;
  nameTh: string;
  category: string;
  description: string;
  storyNotes: string;
  targetCustomer: string;
  price: string;
  priceNum: number;
  altText: string;
  imageUrl: string;
  // Specific fields
  materials?: string; // Product
  productionTime?: string; // Product
  moq?: number; // Product
  location?: string; // Cafe Service
  openingHours?: string; // Cafe Service
  menuHighlights?: string; // Cafe Service
  groupSize?: string; // Event Package
  duration?: string; // Event Package
  activities?: string; // Event Package
  createdAt: string;
}

export interface Inquiry {
  id: string;
  offeringId: string;
  source: "Facebook" | "LINE" | "Phone" | "Walk-in" | "Google Maps" | "QR Code" | "University Network" | "CSR Contact" | "Other";
  inquiryType: "Product Inquiry" | "Product Quotation" | "Cafe Visit Interest" | "Group Visit Request" | "CSR Package Request" | "Workshop Request" | "General Contact";
  customerName: string;
  customerType: "Individual" | "Family" | "School / Teacher" | "Student Group" | "Office Worker Group" | "Corporate / CSR Team" | "Tourist";
  contact: string;
  quantityOrGroupSize: string;
  preferredDate?: string;
  message: string;
  status: "New" | "Contacted" | "Waiting for confirmation" | "Confirmed" | "Completed" | "Cancelled";
  assignedStaffId: string;
  followUpDate?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  offeringId: string;
  inquiryId?: string;
  taskName: string;
  taskCategory: "Preparation" | "Production" | "Service" | "Cleanup" | "Logistics" | "Marketing";
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  supportLevel: "Low" | "Medium" | "High";
  estimatedTime: string;
  visualInstructionRequired: boolean;
  assignedLearnerId: string;
  assignedStaffId: string;
  status: "Pending" | "In progress" | "Done" | "Reviewed";
  evidenceNote?: string;
  createdAt: string;
}

export interface SkillEvidence {
  id: string;
  learnerId: string;
  taskId: string;
  taskName: string;
  evidenceType: string;
  evidenceNote: string;
  approvedByStaffId: string;
  createdAt: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  requiredModuleIndex: number; // Unlocks after Module index (e.g. completes Module 2 -> index 1)
  toolType: string;
  isAccessibilityFeature: boolean;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[]; // lessonIds
  completedActivities: string[]; // lessonIds / moduleIds
}

export interface LearnerProfile {
  id: string;
  name: string;
  avatar: string;
  abilitySummary: string;
  suitableTasks: string[];
  supportNeeds: string;
  preferredEnvironment: string;
  completedModules: number[]; // index of modules
  unlockedTools: string[]; // toolIds
}

export interface CampaignKit {
  id: string;
  offeringId: string;
  campaignName: string;
  targetCustomer: string;
  valueProposition: string;
  facebookCaption: string;
  lineMessage: string;
  posterText: string;
  googleMapsDescription: string;
  qrStory: string;
  photoShotList: string[];
  inquiryLink: string;
  status: "DRAFT" | "APPROVED" | "SHARED";
  createdAt: string;
}
