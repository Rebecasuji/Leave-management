import { useState, useEffect } from 'react';
import { User, LeaveRequest, INITIAL_USERS, INITIAL_LEAVES } from './data';

const USERS_KEY = 'knockturn_users';
const LEAVES_KEY = 'knockturn_leaves';

export function getStoredUsers(): User[] {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  return JSON.parse(stored);
}

export function getStoredLeaves(): LeaveRequest[] {
  const stored = localStorage.getItem(LEAVES_KEY);
  if (!stored) {
    localStorage.setItem(LEAVES_KEY, JSON.stringify(INITIAL_LEAVES));
    return INITIAL_LEAVES;
  }
  return JSON.parse(stored);
}

export function addLeaveRequest(leave: LeaveRequest) {
  const leaves = getStoredLeaves();
  leaves.push(leave);
  localStorage.setItem(LEAVES_KEY, JSON.stringify(leaves));
  return leaves;
}

export function updateLeaveStatus(id: string, status: LeaveRequest['status'], actionBy: string, reason?: string) {
  const leaves = getStoredLeaves();
  const index = leaves.findIndex(l => l.id === id);
  if (index !== -1) {
    leaves[index] = {
      ...leaves[index],
      status,
      actionBy,
      reasonForAction: reason,
      actionDate: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem(LEAVES_KEY, JSON.stringify(leaves));
  }
  return leaves;
}

export function addUser(user: User) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users;
}
