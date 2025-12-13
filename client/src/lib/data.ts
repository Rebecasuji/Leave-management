// Mock Data and Type Definitions

export type Role = 'Admin' | 'Employee';

export interface User {
  id: string;
  code: string;
  name: string;
  role: Role;
  department?: string;
  email?: string;
  reportingManager?: string;
  hrName?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  type: 'Casual' | 'Sick' | 'Study' | 'LWP' | 'Earned';
  startDate: string;
  endDate: string;
  duration: string; // "Full Day" | "Half Day"
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  attachment?: string;
  reasonForAction?: string;
  actionBy?: string; // Admin Name/Code
  actionDate?: string;
  appliedDate: string;
}

// Initial Users from the prompt
export const INITIAL_USERS: User[] = [
  // Admins
  { id: '1', code: 'A0001', name: 'SAM PARKESH', role: 'Admin' },
  { id: '2', code: 'A0002', name: 'LEO CLESTINE', role: 'Admin' },
  { id: '3', code: 'A0003', name: 'SUJI', role: 'Admin' },
  // Employees
  { id: '4', code: 'E0041', name: 'MOHAN RAJ C', role: 'Employee', department: 'Engineering' },
  { id: '5', code: 'E0042', name: 'YUVARAJ S', role: 'Employee', department: 'Engineering' },
  { id: '6', code: 'E0043', name: 'ATMAKUR RAJESH', role: 'Employee', department: 'Sales' },
  { id: '7', code: 'E0032', name: 'SIVARAM C', role: 'Employee', department: 'Marketing' },
  { id: '8', code: 'E0040', name: 'UMAR FAROOQUE', role: 'Employee', department: 'Operations' },
  { id: '9', code: 'E0028', name: 'KAALIPUSHPA R', role: 'Employee', department: 'HR' },
  { id: '10', code: 'E0035', name: 'DENNIS RAJU', role: 'Employee', department: 'Engineering' },
  { id: '11', code: 'E0009', name: 'RANJITH', role: 'Employee', department: 'Sales' },
  { id: '12', code: 'E0044', name: 'PRIYA P', role: 'Employee', department: 'Marketing' },
  { id: '13', code: 'E0045', name: 'RATCHITHA', role: 'Employee', department: 'Operations' },
  { id: '14', code: 'E0047', name: 'Samyuktha S', role: 'Employee', department: 'HR' },
  { id: '15', code: 'E0046', name: 'Rebecasuji.A', role: 'Employee', department: 'Engineering' },
  { id: '16', code: 'E0048', name: 'DurgaDevi E', role: 'Employee', department: 'Sales' },
  { id: '17', code: 'E0050', name: 'ZAMEELA BEGAM N.', role: 'Employee', department: 'Marketing' },
  { id: '18', code: 'E0051', name: 'ARUN KUMAR V.', role: 'Employee', department: 'Operations' },
  { id: '19', code: 'E0052', name: 'D K JYOTHSNA PRIYA', role: 'Employee', department: 'HR' },
  { id: '20', code: 'E0049', name: 'P PUSHPA', role: 'Employee', department: 'Engineering' },
  { id: '21', code: '-', name: 'FAREETHA', role: 'Employee', department: 'General' },
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: '101',
    employeeId: '4',
    employeeName: 'MOHAN RAJ C',
    employeeCode: 'E0041',
    type: 'Sick',
    startDate: '2025-10-10',
    endDate: '2025-10-12',
    duration: 'Full Day',
    description: 'Viral fever',
    status: 'Approved',
    actionBy: 'A0001 (SAM PARKESH)',
    actionDate: '2025-10-09',
    appliedDate: '2025-10-09'
  },
  {
    id: '102',
    employeeId: '5',
    employeeName: 'YUVARAJ S',
    employeeCode: 'E0042',
    type: 'Casual',
    startDate: '2025-10-15',
    endDate: '2025-10-15',
    duration: 'Full Day',
    description: 'Personal work',
    status: 'Pending',
    appliedDate: '2025-10-13'
  }
];
