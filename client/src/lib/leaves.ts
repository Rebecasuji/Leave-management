import { useState, useEffect } from "react";
import { LeaveRequest, INITIAL_LEAVES } from "@/lib/data";

// Simple in-memory store for prototype (persisted to localStorage)
const STORAGE_KEY = "knockturn_leaves";

export function useLeaves() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLeaves(JSON.parse(stored));
    } else {
      setLeaves(INITIAL_LEAVES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEAVES));
    }
  }, []);

  const addLeave = (leave: Omit<LeaveRequest, "id" | "status" | "appliedDate">) => {
    const newLeave: LeaveRequest = {
      ...leave,
      id: Math.random().toString(36).substr(2, 9),
      status: "Pending",
      appliedDate: new Date().toISOString().split('T')[0],
    };
    
    const updated = [newLeave, ...leaves];
    setLeaves(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newLeave;
  };

  const updateLeaveStatus = (id: string, status: LeaveRequest["status"], actionBy: string, reason?: string) => {
    const updated = leaves.map((leave) => {
      if (leave.id === id) {
        return {
          ...leave,
          status,
          actionBy,
          reasonForAction: reason,
          actionDate: new Date().toISOString().split('T')[0],
        };
      }
      return leave;
    });
    setLeaves(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { leaves, addLeave, updateLeaveStatus };
}
