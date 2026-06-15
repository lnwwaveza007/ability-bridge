/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ClipboardList, PlusCircle, User, Layers, ShieldCheck, CheckSquare, Clock, AlertTriangle, Check, ListTodo } from "lucide-react";
import { Task, Inquiry, Offering, LearnerProfile } from "../types";

interface TaskBreakdownProps {
  tasks: Task[];
  inquiries: Inquiry[];
  offerings: Offering[];
  learners: LearnerProfile[];
  selectedInquiryFromNav?: Inquiry | null;
  onAddTask: (task: Task) => void;
  onUpdateTaskStatus: (taskId: string, status: Task["status"], evidenceNote?: string) => void;
  highContrast: boolean;
  onAnnounce: (text: string) => void;
}

export default function TaskBreakdown({
  tasks,
  inquiries,
  offerings,
  learners,
  selectedInquiryFromNav,
  onAddTask,
  onUpdateTaskStatus,
  highContrast,
  onAnnounce
}: TaskBreakdownProps) {
  // Pick active inquiry context
  const confirmedInquiries = inquiries.filter(i => i.status === "Confirmed" || i.status === "Waiting for confirmation" || i.status === "Completed");
  const [activeInquiryId, setActiveInquiryId] = useState<string>(
    selectedInquiryFromNav?.id || confirmedInquiries[0]?.id || ""
  );

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState<Task["taskCategory"]>("Production");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Task["difficulty"]>("Easy");
  const [supportLevel, setSupportLevel] = useState<Task["supportLevel"]>("Medium");
  const [estimatedTime, setEstimatedTime] = useState("45 mins");
  const [assignedLearnerId, setAssignedLearnerId] = useState(learners[0]?.id || "");
  const [visualRequired, setVisualRequired] = useState(true);

  // Evident logging active trigger dialog
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [tempEvidence, setTempEvidence] = useState("");

  const activeInquiry = inquiries.find(inq => inq.id === activeInquiryId);
  const activeOffering = offerings.find(o => o.id === activeInquiry?.offeringId);

  // Filter tasks belonging to active source
  const currentTasks = tasks.filter(t => t.inquiryId === activeInquiryId);

  const handleInquiryChange = (id: string) => {
    setActiveInquiryId(id);
    setEditingTaskId(null);
  };

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      offeringId: activeInquiry?.offeringId || "unknown-off",
      inquiryId: activeInquiryId,
      taskName,
      taskCategory,
      description,
      difficulty,
      supportLevel,
      estimatedTime,
      visualInstructionRequired: visualRequired,
      assignedLearnerId,
      assignedStaffId: "Staff-Amy",
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    onAddTask(newTask);
    onAnnounce(`Assigned micro-task ${taskName} to trainee.`);
    
    // Clear inputs
    setTaskName("");
    setDescription("");
    setShowAddForm(false);
  };

  // Status transitions
  const handleNextStatus = (task: Task) => {
    if (task.status === "Pending") {
      onUpdateTaskStatus(task.id, "In progress");
      onAnnounce(`Marked ${task.taskName} in-progress.`);
    } else if (task.status === "In progress") {
      // Trigger evidence prompt
      setEditingTaskId(task.id);
      setTempEvidence(
        `Completed task accurately. Followed visual guidelines under ${task.supportLevel.toLowerCase()} support.`
      );
    } else if (task.status === "Done") {
      onUpdateTaskStatus(task.id, "Reviewed");
      onAnnounce(`Approved craftsmanship for ${task.taskName}.`);
    }
  };

  const submitEvidenceDone = (taskId: string) => {
    onUpdateTaskStatus(taskId, "Done", tempEvidence);
    setEditingTaskId(null);
    onAnnounce("Logged vocational evidence, saved into learner's passport portfolio.");
  };

  return (
    <div className={`space-y-6 ${highContrast ? "text-white" : "text-slate-800"}`}>
      {/* Selector ribbon block */}
      <div className={`p-4 rounded-2xl border ${
        highContrast ? "bg-black border-white" : "bg-indigo-50/70 border-indigo-150 text-indigo-955 shadow-sm shadow-indigo-900/5"
      } flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs`}>
        <div className="space-y-1">
          <span className="block text-[10px] uppercase tracking-wider font-extrabold text-indigo-800">
            Current Order Pipeline context (เลือกออเดอร์เพื่อดูงานย่อย)
          </span>
          <label className="font-extrabold text-slate-800">Active Confirmed Demand Entry:</label>
        </div>

        {confirmedInquiries.length === 0 ? (
          <p className="text-slate-500 font-bold italic">No active confirmed orders. Please approve an inquiry inside the tracker to see options here!</p>
        ) : (
          <select
            value={activeInquiryId}
            onChange={(e) => handleInquiryChange(e.target.value)}
            className="p-2.5 border border-indigo-200 bg-white rounded-xl font-bold max-w-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[11px]"
          >
            {confirmedInquiries.map(inq => {
              const matchedO = offerings.find(o => o.id === inq.offeringId);
              return (
                <option key={inq.id} value={inq.id}>
                  {inq.customerName} &bull; {matchedO?.nameEn}
                </option>
              );
            })}
          </select>
        )}
      </div>

      {activeInquiry && (
        <div className="grid lg:grid-cols-5 gap-6 text-xs leading-relaxed font-semibold">
          {/* Active inquiry specifications panel */}
          <div className={`lg:col-span-2 p-5 rounded-2xl border ${
            highContrast ? "bg-black border-white" : "bg-white border-slate-200 shadow-sm"
          } space-y-4`}>
            <div className="border-b border-rose-105 pb-2.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Order Client Spec</span>
              <h3 className="font-black text-slate-900 text-sm">{activeInquiry.customerName}</h3>
              <p className="text-[11px] text-indigo-700 font-bold mt-1">Associated Offering: {activeOffering?.nameEn}</p>
            </div>

            <div className="space-y-2 text-[11px] text-slate-600">
              <p>📍 <strong>Target Channels:</strong> {activeInquiry.source}</p>
              <p>📦 <strong>Fulfillment Size:</strong> {activeInquiry.quantityOrGroupSize}</p>
              <p>💬 <strong>Customer Request Details:</strong> "{activeInquiry.message || "None"}"</p>
            </div>

            <div className="border-t border-slate-100 pt-3.5 space-y-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-full transition-all shadow-md shadow-indigo-150 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlusCircle size={14} />
                <span>Assign New Micro-Task / มอบหมายงานย่อย</span>
              </button>
            </div>

            {/* Sub Form Task generation modal style */}
            {showAddForm && (
              <form 
                onSubmit={handleCreateTaskSubmit}
                className="p-4 border border-indigo-250 border-indigo-200 rounded-xl bg-indigo-50/40 space-y-3 animate-fade-in"
              >
                <h4 className="font-black uppercase text-[10px] text-indigo-850">Assigned Form Parameter</h4>
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10px]">Micro-Task Title *</label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="e.g. Precision Pine Edge Sanding"
                    required
                    className="w-full p-2 bg-white rounded border border-slate-300 text-[11px]"
                  />
                </div>

                {/* Category & Hours */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-[10px]">Category</label>
                    <select
                      value={taskCategory}
                      onChange={(e: any) => setTaskCategory(e.target.value)}
                      className="w-full p-2 bg-white border rounded text-[11px]"
                    >
                      <option value="Preparation">Preparation</option>
                      <option value="Production">Production</option>
                      <option value="Service">Cafe Service</option>
                      <option value="Cleanup">Cleanup</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px]">Est Time</label>
                    <input
                      type="text"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      placeholder="e.g. 45 mins"
                      className="w-full p-2 bg-white rounded border border-slate-300 text-[11px]"
                    />
                  </div>
                </div>

                {/* Trainee selection */}
                <div className="space-y-1">
                  <label className="block text-[10px]">Assign to Scholar Profile *</label>
                  <select
                    value={assignedLearnerId}
                    onChange={(e) => setAssignedLearnerId(e.target.value)}
                    className="w-full p-2 bg-white rounded border text-[11px]"
                  >
                    {learners.map(l => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty & Support Level */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-[10px]">Difficulty Metric</label>
                    <select
                      value={difficulty}
                      onChange={(e: any) => setDifficulty(e.target.value)}
                      className="w-full p-2 bg-white border rounded text-[11px]"
                    >
                      <option value="Easy">Easy (ความเสี่ยงต่ำ)</option>
                      <option value="Medium">Medium (ปานกลาง)</option>
                      <option value="Hard">Hard (ขีดจำกัดสูง)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px]">Teacher Help Level</label>
                    <select
                      value={supportLevel}
                      onChange={(e: any) => setSupportLevel(e.target.value)}
                      className="w-full p-2 bg-white border rounded text-[11px]"
                    >
                      <option value="Low">Low Support</option>
                      <option value="Medium">Medium Guideline</option>
                      <option value="High">High Supervision</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-[10px] text-slate-500 hover:underline cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 font-bold hover:bg-indigo-700 text-white rounded-full px-4 py-2 cursor-pointer text-[10px] shadow-sm shadow-indigo-100"
                  >
                    Save Task Assignment
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Core Tasks Flow list - Right 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-extrabold flex items-center gap-2">
              <ListTodo size={16} className="text-indigo-600" />
              <span>Assigned Active Micro-Tasks ({currentTasks.length})</span>
            </h3>

            {currentTasks.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-slate-200 text-center py-16 text-slate-400 font-normal">
                No micro-tasks assigned for this demand yet. Open the left bar form to delegate sandings or recipes.
              </div>
            ) : (
              <div className="space-y-3">
                {currentTasks.map((task) => {
                  const assignedLearner = learners.find(l => l.id === task.assignedLearnerId);
                  const isTransitioning = editingTaskId === task.id;

                  return (
                    <div 
                      key={task.id}
                      className={`p-4 rounded-xl border transition-all ${
                        task.status === "Reviewed" 
                          ? "bg-emerald-50/50 border-emerald-250 opacity-90 text-slate-600" 
                          : task.status === "Done"
                            ? "bg-amber-50/50 border-amber-250 ring-1 ring-amber-300"
                            : "bg-white border-slate-200"
                      }`}
                    >
                      {/* Top labels */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[12px] text-slate-900 leading-tight">
                            {task.taskName}
                          </span>
                          <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            task.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" : task.difficulty === "Medium" ? "bg-orange-100 text-orange-850" : "bg-red-150 text-red-800"
                          }`}>
                            Diff: {task.difficulty}
                          </span>
                          <span className="text-[8px] font-bold text-slate-400 italic">
                            Help: {task.supportLevel}
                          </span>
                        </div>

                        {/* Status tag */}
                        <span className={`text-[8.5px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                          task.status === "Reviewed" 
                            ? "bg-emerald-550 text-emerald-950 font-bold" 
                            : task.status === "Done" 
                              ? "bg-amber-100 text-amber-850" 
                              : task.status === "In progress" 
                                ? "bg-sky-100 text-sky-800 animate-pulse" 
                                : "bg-slate-100 text-slate-500"
                        }`}>
                          {task.status}
                        </span>
                      </div>

                      {/* Trainee profile bio */}
                      <div className="flex items-center justify-between gap-3 text-[11px] text-slate-500 py-1.5">
                        <div className="flex items-center gap-2">
                          <img 
                            src={assignedLearner?.avatar} 
                            alt={assignedLearner?.name} 
                            referrerPolicy="no-referrer"
                            className="w-5.5 h-5.5 rounded-full object-cover"
                          />
                          <span>Scholar assignee: <strong>{assignedLearner?.name}</strong></span>
                        </div>
                        <span className="text-slate-400 font-mono text-[10px]">({task.estimatedTime} estimate)</span>
                      </div>

                      {/* Evidence note description log */}
                      {task.evidenceNote && (
                        <div className="mt-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-[10.5px] text-emerald-950 italic whitespace-pre-line leading-relaxed">
                          <strong>Verified skill proof:</strong> "{task.evidenceNote}"
                        </div>
                      )}

                      {/* Evidence logging dialogue modal style inline */}
                      {isTransitioning && (
                        <div className="mt-3 p-3 rounded-xl border border-amber-300 bg-amber-50 space-y-3">
                          <label className="block text-[10px] text-amber-955 font-extrabold uppercase">
                            👑 WRITE DIGNIFIED SKILL EVIDENCE (บันทึกหลักฐานความสำเร็จของน้อง)
                          </label>
                          <textarea
                            value={tempEvidence}
                            onChange={(e) => setTempEvidence(e.target.value)}
                            placeholder="Describe how Lek greeted tourists or Nid painted pine wood. Cite exact numbers and supervised parameters."
                            rows={3}
                            className="w-full text-xs p-2 bg-white rounded border border-amber-300 leading-normal"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingTaskId(null)}
                              className="text-[9px] text-slate-500 hover:underline cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => submitEvidenceDone(task.id)}
                              className="bg-amber-550 hover:bg-amber-600 text-white font-extrabold px-3 py-1.5 rounded text-[10px] shadow cursor-pointer"
                            >
                              Log & Submit to Passport
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Status control sequence buttons */}
                      {!isTransitioning && (
                        <div className="mt-3.5 border-t border-slate-100 pt-2.5 flex justify-end">
                          {task.status !== "Reviewed" ? (
                            <button
                              onClick={() => handleNextStatus(task)}
                              className="flex items-center gap-1 bg-slate-900 border border-slate-705 hover:bg-black text-white font-black px-3 py-1.5 rounded-lg text-[10px] cursor-pointer"
                            >
                              <span>Next status: </span>
                              <strong>
                                {task.status === "Pending" && "Start Task →"}
                                {task.status === "In progress" && "Complete & Log Evidence →"}
                                {task.status === "Done" && "Approve & Seal Passport →"}
                              </strong>
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1 py-1">
                              <Check size={14} className="text-emerald-600" /> Locked inside Skill Passport
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
