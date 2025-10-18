import React, { useEffect, useMemo, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/local/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  CalendarDays,
  EllipsisVertical,
  LayoutGrid,
  Plus,
  Table as TableIcon,
  User,
  FileText,
  Eye,
  Download,
  Share,
  Pencil,
  Trash2,
  Upload,
  Building2,
  ChevronDown,
  ChevronRight,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Star,
  Award,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
  DollarSign,
  BarChart3,
  GraduationCap,
  Calendar,
  Settings,
  LogOut,
  Home,
  Minus,
  ArrowUpDown,
  ChevronDownSquare,
  ChevronRightSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const mockEmployees = [
  {
    id: "1",
    employeeId: "EMP001",
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@company.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Software Engineer",
        department: "Engineering",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
    status: "Active",
    joinedDate: "2023-01-15",
    workEmail: "sarah.mitchell@company.com",
    location: "San Francisco, CA",
    reportingManager: "John Smith",
    employmentType: "Full-time",
    workLocation: "Head Office",
    shiftSchedule: "Day",
    avatar: null,
  },
  {
    id: "2",
    employeeId: "EMP002",
    firstName: "Marcus",
    lastName: "Thompson",
    email: "marcus.thompson@company.com",
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    department: "Product",
    skills: ["Product Strategy", "Agile", "User Research", "Analytics"],
    status: "Active",
    joinedDate: "2022-08-20",
    workEmail: "marcus.thompson@company.com",
    location: "New York, NY",
    reportingManager: "Lisa Chen",
    employmentType: "Full-time",
    workLocation: "Head Office",
    shiftSchedule: "Day",
    avatar: null,
  },
  {
    id: "3",
    employeeId: "EMP003",
    firstName: "Amanda",
    lastName: "Foster",
    email: "amanda.foster@company.com",
    phone: "+1 (555) 345-6789",
    position: "Business Analyst",
    department: "Product",
    skills: ["Business Analysis", "Process Optimization", "Data Analysis"],
    status: "Active",
    joinedDate: "2023-05-30",
    workEmail: "amanda.foster@company.com",
    location: "Austin, TX",
    reportingManager: "Lisa Chen",
    employmentType: "Full-time",
    workLocation: "Remote",
    shiftSchedule: "Day",
    avatar: null,
  },
  {
    id: "4",
    employeeId: "EMP004",
    firstName: "James",
    lastName: "Rodriguez",
    email: "james.rodriguez@company.com",
    phone: "+1 (555) 456-7890",
    position: "ML Engineer",
            department: "Engineering",
    skills: ["Software Development", "Python", "Machine Learning"],
    status: "Active",
    joinedDate: "2023-06-12",
    workEmail: "james.rodriguez@company.com",
    location: "Seattle, WA",
    reportingManager: "John Smith",
    employmentType: "Full-time",
    workLocation: "Head Office",
    shiftSchedule: "Day",
    avatar: null,
  },
  {
    id: "5",
    employeeId: "EMP005",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@company.com",
    phone: "+1 (555) 567-8901",
    position: "Finance Analyst",
    department: "Finance",
    skills: ["Financial Analysis", "Accounting", "Excel"],
    status: "Active",
    joinedDate: "2023-07-08",
    workEmail: "priya.patel@company.com",
    location: "Chicago, IL",
    reportingManager: "David Kim",
    employmentType: "Full-time",
    workLocation: "Head Office",
    shiftSchedule: "Day",
    avatar: null,
  },
];

const mockDocuments = [
  {
    id: "1",
    title: "Employee Handbook 2024",
    category: "Policies",
    department: "Human Resources",
    fileType: "PDF",
    uploadDate: "2024-01-15",
    expirationDate: "2025-01-15",
    uploadedBy: "Sarah Johnson",
    status: "Active",
    downloads: 127,
  },
  {
    id: "2",
    title: "Data Privacy Policy Update",
    category: "Compliance",
    department: "Legal",
    fileType: "PDF",
    uploadDate: "2023-08-22",
    expirationDate: "2024-08-22",
    uploadedBy: "David Park",
    status: "Active",
    downloads: 89,
  },
  {
    id: "3",
    title: "Financial Audit Report 2023",
    category: "Compliance",
    department: "Finance",
    fileType: "PDF",
    uploadDate: "2023-12-15",
    expirationDate: null,
    uploadedBy: "Emily Rodriguez",
    status: "Archived",
    downloads: 45,
  },
  {
    id: "4",
    title: "Performance Review Template",
    category: "Forms & Templates",
    department: "Human Resources",
    fileType: "DOCX",
    uploadDate: "2024-01-10",
    expirationDate: null,
    uploadedBy: "Mike Chen",
    status: "Active",
    downloads: 89,
  },
  {
    id: "5",
    title: "Employee Contract Template",
    category: "Employee Records",
    department: "Human Resources",
    fileType: "DOCX",
    uploadDate: "2024-01-20",
    expirationDate: null,
    uploadedBy: "Sarah Johnson",
    status: "Active",
    downloads: 78,
  },
  {
    id: "6",
    title: "Training Certification Course",
    category: "Training",
    department: "Human Resources",
    fileType: "PDF",
    uploadDate: "2024-01-18",
    expirationDate: "2025-01-18",
    uploadedBy: "Lisa Thompson",
    status: "Active",
    downloads: 156,
  },
  {
    id: "7",
    title: "Code of Conduct Policy",
    category: "Policies",
    department: "All Departments",
    fileType: "PDF",
    uploadDate: "2024-01-12",
    expirationDate: null,
    uploadedBy: "Amanda Foster",
    status: "Active",
    downloads: 203,
  },
  {
    id: "8",
    title: "Leave Request Form",
    category: "Forms & Templates",
    department: "Human Resources",
    fileType: "XLSX",
    uploadDate: "2024-01-08",
    expirationDate: null,
    uploadedBy: "Mike Chen",
    status: "Active",
    downloads: 92,
  },
  {
    id: "9",
    title: "Data Protection Compliance Guide",
    category: "Compliance",
    department: "IT",
    fileType: "PDF",
    uploadDate: "2024-01-03",
    expirationDate: "2024-12-31",
    uploadedBy: "James Rodriguez",
    status: "Active",
    downloads: 134,
  },
  {
    id: "10",
    title: "Onboarding Checklist",
    category: "Training",
    department: "Human Resources",
    fileType: "DOCX",
    uploadDate: "2023-12-15",
    expirationDate: null,
    uploadedBy: "Sarah Johnson",
    status: "Active",
    downloads: 167,
  },
];

// Mock data for employee profile details
const mockEmployeeProfileData = {
  id: "1",
  employeeId: "EMP001",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@company.com",
  phone: "+1 (555) 010-1200",
  department: "Engineering",
  location: "San Francisco, CA",
  joinedDate: "2022-03-15",
  status: "Active",
  
  // Personal Info
  personalInfo: {
    middleName: "Elizabeth",
    dateOfBirth: "1990-05-20",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "American",
    alternatePhone: "+1 (555) 010-1201",
    workEmail: "sarah.j@company.com",
    streetAddress: "123 Tech Street",
    city: "San Francisco",
    state: "California",
    zipCode: "94105",
    emergencyContact: {
      name: "John Johnson",
      phone: "+1 (555) 010-1202",
      relationship: "Father",
      alternatePhone: "+1 (555) 010-1203"
    }
  },
  
  // Work Details
  workDetails: {
    position: "Senior Software Engineer",
    department: "Engineering",
    reportingManager: "Michael Rodriguez",
    employmentStatus: "Active",
    employmentType: "Full-time",
    dateHired: "2022-03-15",
    probationEndDate: "2022-09-15",
    workLocation: "San Francisco Office",
    shiftSchedule: "9:00 AM - 6:00 PM",
    workPhone: "+1 (555) 123-4567",
    positionHistory: [
      {
        position: "Junior Software Engineer",
        duration: "2022-03-15 to 2023-03-15",
        reason: "Promotion"
      },
      {
        position: "Software Engineer",
        duration: "2023-03-15 to 2024-01-15",
        reason: "Performance review"
      }
    ],
    workHistory: [
      {
        companyName: "TechCorp Inc.",
        position: "Software Developer",
        duration: 2,
        location: "New York, NY",
        employmentType: "Full-time",
        reasonForLeaving: "Career advancement"
      }
    ]
  },
  
  // Skills
  skills: [
    { name: "React", experience: 4, level: "Expert" },
    { name: "TypeScript", experience: 3, level: "Advanced" },
    { name: "Node.js", experience: 3, level: "Advanced" },
    { name: "Python", experience: 2, level: "Intermediate" },
    { name: "AWS", experience: 2, level: "Intermediate" }
  ],
  
  // Compensation
  compensation: {
    currentSalary: "******", // Masked
    lastReview: "2024-01-15",
    nextReview: "2025-01-15",
    history: [
      {
        dateOfChange: "2024-01-15",
        salary: "$95,000",
        changePercent: "+8%",
        type: "Merit Increase",
        currency: "USD",
        position: "Senior Software Engineer"
      },
      {
        dateOfChange: "2023-03-15",
        salary: "$88,000",
        changePercent: "+12%",
        type: "Promotion",
        currency: "USD",
        position: "Software Engineer"
      }
    ]
  },
  
  // Performance
  performance: [
    {
      reviewPeriod: "Q4 2023",
      reviewerName: "Michael Rodriguez",
      rating: "4.5/5",
      comments: "Excellent performance, strong technical skills and team collaboration."
    },
    {
      reviewPeriod: "Q3 2023",
      reviewerName: "Michael Rodriguez",
      rating: "4.2/5",
      comments: "Good progress on project deliverables, room for improvement in leadership."
    }
  ],
  
  // Training & Certifications
  training: [
    {
      title: "React Advanced Patterns",
      provider: "Tech Academy",
      dateCompleted: "2023-08-15",
      status: "Completed"
    },
    {
      title: "AWS Cloud Practitioner",
      provider: "Amazon Web Services",
      dateCompleted: "2023-06-20",
      status: "Completed"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      certificationId: "AWS-CSA-12345",
      issuedOrganization: "Amazon Web Services",
      certificateStatus: "Valid",
      issuedDate: "2023-06-20",
      expiryDate: "2026-06-20"
    }
  ],
  
  // Leave & Attendance
  attendance: {
    attendanceRate: 96.5,
    punctualityRate: 94.2,
    leaveBalance: [
      { type: "Annual Leave", taken: 8, balance: 12 },
      { type: "Sick Leave", taken: 3, balance: 7 },
      { type: "Personal Leave", taken: 2, balance: 3 }
    ],
    leaveHistory: [
      {
        type: "Annual Leave",
        duration: "2024-01-15 to 2024-01-22",
        totalDays: 5,
        approver: "Michael Rodriguez",
        status: "Approved"
      },
      {
        type: "Sick Leave",
        duration: "2023-12-10 to 2023-12-12",
        totalDays: 2,
        approver: "Michael Rodriguez",
        status: "Approved"
      }
    ]
  },
  
  // Documents
  documents: [
    {
      title: "Employment Contract",
      fileType: "PDF",
      fileSize: "2.1 MB",
      uploadDate: "2022-03-15"
    },
    {
      title: "Tax Form W-2",
      fileType: "PDF",
      fileSize: "1.5 MB",
      uploadDate: "2023-01-31"
    }
  ],
  
  // Application History
  applicationHistory: {
    jobId: "JOB-2022-001",
    applicationDate: "2022-02-15",
    applicationMethod: "Career Portal",
    screening: {
      dateAdded: "2022-02-16",
      status: "Approved",
      approvedDate: "2022-02-20",
      approvedBy: "HR Team"
    },
    interview: {
      dateAdded: "2022-02-21",
      steps: [
        {
          step: 1,
          type: "Technical Interview",
          date: "2022-02-25",
          interviewerName: "Michael Rodriguez"
        },
        {
          step: 2,
          type: "System Design",
          date: "2022-02-28",
          interviewerName: "David Park"
        }
      ],
      dateMovedToActivation: "2022-03-01",
      approvedBy: "HR Manager"
    },
    activation: {
      dateAdded: "2022-03-02",
      activationConfirmedDate: "2022-03-10",
      approvedBy: "HR Manager"
    },
    hired: {
      dateAdded: "2022-03-15",
      orientationCompletedDate: "2022-03-20",
      integrationCompletedDate: "2022-04-15"
    }
  },
  
  // Access & Security
  accessSecurity: {
    accountActive: true,
    hrAccess: false,
    adminRights: false
  }
};

const mockOrgChart = [
  {
    id: "1",
    name: "Michael Rodriguez",
    title: "Chief Executive Officer",
    department: "Executive",
    directReports: 4,
    status: "Active",
    avatar: null,
    parentId: null,
    level: 1,
    children: ["2", "3", "4", "5"],
  },
  {
    id: "2",
        name: "Sarah Mitchell",
        title: "Chief Technology Officer",
        department: "Engineering",
        directReports: 3,
    status: "Active",
    avatar: null,
    parentId: "1",
    level: 2,
    children: ["6", "7", "8"],
  },
  {
    id: "3",
    name: "David Park",
    title: "Chief Financial Officer",
    department: "Finance",
    directReports: 2,
    status: "Active",
    avatar: null,
    parentId: "1",
    level: 2,
    children: ["9", "10"],
  },
  {
    id: "4",
    name: "Jessica Wang",
    title: "Chief Marketing Officer",
    department: "Marketing",
    directReports: 2,
    status: "Active",
    avatar: null,
    parentId: "1",
    level: 2,
    children: ["11", "12"],
  },
  {
    id: "5",
    name: "Amanda Foster",
    title: "Chief Human Resources Officer",
    department: "Human Resources",
    directReports: 1,
    status: "Active",
    avatar: null,
    parentId: "1",
    level: 2,
    children: ["13"],
  },
  {
    id: "6",
            name: "James Rodriguez",
            title: "Senior Software Engineer",
            department: "Engineering",
    directReports: 0,
    status: "Active",
    avatar: null,
    parentId: "2",
    level: 3,
    children: [],
  },
  {
    id: "7",
            name: "Emily Chen",
            title: "Lead UX Designer",
            department: "Engineering",
    directReports: 0,
    status: "Active",
    avatar: null,
    parentId: "2",
    level: 3,
    children: [],
  },
  {
    id: "8",
            name: "Marcus Thompson",
            title: "DevOps Manager",
            department: "Engineering",
    directReports: 0,
    status: "Active",
    avatar: null,
    parentId: "2",
    level: 3,
    children: [],
  },
  {
    id: "9",
    name: "Priya Patel",
    title: "Finance Manager",
    department: "Finance",
    directReports: 0,
    status: "Active",
    avatar: null,
    parentId: "3",
    level: 3,
    children: [],
  },
  {
    id: "10",
    name: "Robert Kim",
    title: "Senior Accountant",
    department: "Finance",
    directReports: 0,
    status: "Active",
    avatar: null,
    parentId: "3",
    level: 3,
    children: [],
  },
  {
    id: "11",
    name: "Lisa Chang",
    title: "Marketing Manager",
    department: "Marketing",
    directReports: 0,
    status: "Active",
    avatar: null,
    parentId: "4",
    level: 3,
    children: [],
  },
  {
    id: "12",
    name: "Alex Johnson",
    title: "Content Strategist",
    department: "Marketing",
    directReports: 0,
    status: "Active",
    avatar: null,
    parentId: "4",
    level: 3,
    children: [],
  },
  {
    id: "13",
    name: "Maria Garcia",
    title: "HR Business Partner",
    department: "Human Resources",
    directReports: 0,
    status: "Active",
    avatar: null,
    parentId: "5",
    level: 3,
    children: [],
  },
];

type ViewMode = "list" | "grid" | "chart";

// Organizational Chart Visualization Component
function OrgChartVisualization() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["1", "2", "3", "4", "5"])); // All departments expanded by default
  
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Executive": return "bg-red-100 text-red-700 border-red-200";
      case "Engineering": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Finance": return "bg-green-100 text-green-700 border-green-200";
      case "Marketing": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Human Resources": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  
  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleEmployeeClick = (employeeId: string) => {
    // Toggle the expand/collapse state of the chart
    toggleNode(employeeId);
  };


  const getVisibleNodes = () => {
    const visible = new Set<string>();
    
    const addNodeAndChildren = (nodeId: string) => {
      visible.add(nodeId);
      const node = mockOrgChart.find(n => n.id === nodeId);
      if (node && expandedNodes.has(nodeId)) {
        node.children.forEach(childId => addNodeAndChildren(childId));
      }
    };
    
    // Start with CEO
    addNodeAndChildren("1");
    return Array.from(visible).map(id => mockOrgChart.find(n => n.id === id)!);
  };

  const visibleNodes = getVisibleNodes();
  
  const getNodePosition = (node: any) => {
    const level = node.level;
    const nodeWidth = 200; // Card width
    const horizontalSpacing = 320; // Increased spacing between cards horizontally
    const verticalSpacing = 280; // Increased spacing between levels
    
    let x, y;
    
    if (level === 1) {
      // CEO level - center
      x = 600;
      y = 80;
    } else if (level === 2) {
      // Department heads - spread horizontally with more space
      const visibleNodesAtLevel = visibleNodes.filter(n => n.level === level);
      const index = visibleNodesAtLevel.findIndex(n => n.id === node.id);
      const totalWidth = (visibleNodesAtLevel.length - 1) * horizontalSpacing;
      const startX = 600 - (totalWidth / 2);
      x = startX + (index * horizontalSpacing);
      y = level * verticalSpacing;
    } else {
      // Team members - center under their manager with proper spacing
      const manager = mockOrgChart.find(n => n.id === node.parentId);
      if (manager) {
        const managerDirectReports = visibleNodes.filter(n => n.parentId === manager.id && n.level === level);
        const reportIndex = managerDirectReports.findIndex(n => n.id === node.id);
        
        if (managerDirectReports.length > 0) {
          const managerPos = getNodePosition(manager);
          const teamSpacing = 250; // Increased team spacing
          const teamTotalWidth = (managerDirectReports.length - 1) * teamSpacing;
          const teamStartX = managerPos.x - (teamTotalWidth / 2);
          x = teamStartX + (reportIndex * teamSpacing);
        } else {
          x = 600;
        }
      } else {
        x = 600;
      }
      y = level * verticalSpacing;
    }
    
    return { x, y };
  };

  const getConnectionPath = (parentNode: any, childNode: any) => {
    const parentPos = getNodePosition(parentNode);
    const childPos = getNodePosition(childNode);
    
    // Calculate connection points (bottom of parent card to top of child card)
    const parentBottomY = parentPos.y + 80; // Bottom of parent card
    const childTopY = childPos.y; // Top of child card
    
    // Create straight lines with right angles like in the example
    const midY = (parentBottomY + childTopY) / 2;
    
    // Simple L-shaped path: down from parent, then across, then down to child
    return `M ${parentPos.x} ${parentBottomY} 
            L ${parentPos.x} ${midY}
            L ${childPos.x} ${midY}
            L ${childPos.x} ${childTopY}`;
  };


  const maxLevel = Math.max(...visibleNodes.map(n => n.level));
  const containerHeight = (maxLevel + 1) * 280 + 200;
  const containerWidth = 1600;
  
  return (
    <div className="relative w-full overflow-auto bg-white rounded-lg border border-gray-200" style={{ minHeight: `${containerHeight}px`, minWidth: `${containerWidth}px` }}>
      <div className="relative mx-auto" style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}>
        {/* Connection lines between employees - separate for each department */}
        {visibleNodes.map(node => {
          if (node.parentId) {
            const parent = mockOrgChart.find(p => p.id === node.parentId);
            if (parent) {
              const parentPos = getNodePosition(parent);
              const childPos = getNodePosition(node);
              
              // Get department color for line styling
              const departmentColor = getDepartmentColor(node.department).split(' ')[0].replace('bg-', '');
              let lineColor = '#000000'; // Default black
              
              // Map department colors to line colors
              switch (node.department) {
                case 'Engineering': lineColor = '#3b82f6'; break; // Blue
                case 'Finance': lineColor = '#10b981'; break; // Green
                case 'Marketing': lineColor = '#f59e0b'; break; // Orange
                case 'Human Resources': lineColor = '#8b5cf6'; break; // Purple
                case 'Executive': lineColor = '#ef4444'; break; // Red
                default: lineColor = '#6b7280'; break; // Gray
              }
              
              // Calculate line positions for traditional org chart style
              const parentBottomY = parentPos.y + 80; // Bottom of parent card
              const childTopY = childPos.y; // Top of child card
              
              // Get all direct reports of the parent to calculate main horizontal line
              const parentDirectReports = mockOrgChart.filter(n => n.parentId === parent.id);
              const departmentIndex = parentDirectReports.findIndex(n => n.id === node.id);
              
              // Calculate positions for traditional org chart
              const mainVerticalY = parentBottomY + 50; // Main vertical line extends down from parent
              const mainHorizontalY = mainVerticalY + 50; // Horizontal branch line
              
              // Only draw the main vertical line from the first child (to avoid duplicates)
              const isFirstChild = departmentIndex === 0;
              
              return (
                <div key={`${parent.id}-${node.id}`}>
                  {/* Main vertical line from parent (only for first child) */}
                  {isFirstChild && (
                    <div 
                      className="absolute"
                      style={{
                        left: `${parentPos.x}px`,
                        top: `${parentBottomY}px`,
                        width: '3px',
                        height: `${mainVerticalY - parentBottomY}px`,
                        backgroundColor: '#000000',
                        zIndex: 1,
                        transform: 'translateX(-50%)'
                      }}
                    />
                  )}
                  
                  {/* Main horizontal branch line (only for first child) */}
                  {isFirstChild && (
                    <div 
                      className="absolute"
                      style={{
                        left: `${Math.min(...parentDirectReports.map(r => getNodePosition(r).x))}px`,
                        top: `${mainHorizontalY}px`,
                        width: `${Math.max(...parentDirectReports.map(r => getNodePosition(r).x)) - Math.min(...parentDirectReports.map(r => getNodePosition(r).x))}px`,
                        height: '3px',
                        backgroundColor: '#000000',
                        zIndex: 1,
                        transform: 'translateY(-50%)'
                      }}
                    />
                  )}
                  
                  {/* Vertical line down to this specific child */}
                  <div 
                    className="absolute"
                    style={{
                      left: `${childPos.x}px`,
                      top: `${mainHorizontalY}px`,
                      width: '3px',
                      height: `${childTopY - mainHorizontalY}px`,
                      backgroundColor: '#000000',
                      zIndex: 1,
                      transform: 'translateX(-50%)'
                    }}
                  />
                </div>
              );
            }
          }
          return null;
        })}
        
        {/* Employee nodes */}
        <div className="relative" style={{ zIndex: 2 }}>
        {visibleNodes.map(node => {
          const position = getNodePosition(node);
          const hasChildren = node.children.length > 0;
          const isExpanded = expandedNodes.has(node.id);
          
    return (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <Card 
                className="w-60 bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                onClick={() => handleEmployeeClick(node.id)}
                title="Click to expand/collapse direct reports in chart"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                        {node.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">
                {node.name}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
            {node.title}
                      </p>
              </div>
            </div>
                  
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getDepartmentColor(node.department)}`}
          >
            {node.department}
                  </Badge>
                  
                  {hasChildren && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {node.directReports} direct reports
                      </span>
                <Button
                  variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Just toggle the expand/collapse, don't set selected employee
                          toggleNode(node.id);
                        }}
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                        title={isExpanded ? "Collapse direct reports in chart" : "Expand direct reports in chart"}
                      >
                        {isExpanded ? (
                          <Minus className="h-3 w-3" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                </Button>
                            </div>
                  )}
                </CardContent>
              </Card>
                          </div>
                  );
        })}
          </div>
              </div>
    </div>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState("profiles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Executive": return "bg-red-100 text-red-700 border-red-200";
      case "Engineering": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Finance": return "bg-green-100 text-green-700 border-green-200";
      case "Marketing": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Human Resources": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showUploadDocumentModal, setShowUploadDocumentModal] = useState(false);
  const [expandedOrgNodes, setExpandedOrgNodes] = useState<Set<string>>(new Set());
  const [orgChartViewMode, setOrgChartViewMode] = useState<"table" | "chart">("table");
  const [showManageDepartmentModal, setShowManageDepartmentModal] = useState(false);
  const [showOrgChartModal, setShowOrgChartModal] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      const matchesSearch = 
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
      const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [searchQuery, selectedDepartment, selectedStatus]);

  // Calculate metrics according to FR-RM-001
  const metrics = useMemo(() => {
    const totalActiveEmployees = mockEmployees.filter(emp => emp.status === "Active").length;
    const newHiresThisMonth = mockEmployees.filter(emp => {
      const joinDate = new Date(emp.joinedDate);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
    }).length;
    const pendingOffboarding = mockEmployees.filter(emp => emp.status === "Offboarding").length;
    const onLeave = mockEmployees.filter(emp => emp.status === "On Leave").length;

    return {
      totalActiveEmployees,
      newHiresThisMonth,
      pendingOffboarding,
      onLeave,
    };
  }, []);

  
  // Document Center states
  const [documentSearchQuery, setDocumentSearchQuery] = useState("");
  const [documentCategory, setDocumentCategory] = useState("all");
  const [documentDepartment, setDocumentDepartment] = useState("all");
  const [documentFileType, setDocumentFileType] = useState("all");
  const [documentUploadDate, setDocumentUploadDate] = useState("all");
  const [documentSortField, setDocumentSortField] = useState("uploadDate");
  const [documentSortDirection, setDocumentSortDirection] = useState<"asc" | "desc">("desc");
  
  // Employee Profile Management states
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [selectedEmployeeProfile, setSelectedEmployeeProfile] = useState<any>(null);
  const [employeeProfileTab, setEmployeeProfileTab] = useState("personal");

  const handleEmployeeAction = (employeeId: string, action: string) => {
    if (action === "view") {
      const employee = mockEmployees.find(emp => emp.id === employeeId);
      setSelectedEmployeeProfile(employee);
      setShowEmployeeProfile(true);
      setEmployeeProfileTab("personal");
    } else if (action === "documents") {
      setActiveTab("documents");
      toast({
        title: "Navigate to Documents",
        description: `Viewing documents for employee ${employeeId}`,
      });
    } else if (action === "edit") {
      toast({
        title: "Edit Employee",
        description: `Edit functionality for employee ${employeeId}`,
      });
    } else if (action === "delete") {
      toast({
        title: "Delete Employee",
        description: `Delete functionality for employee ${employeeId}`,
      });
    }
  };

  const toggleOrgNode = (nodeId: string) => {
    const newExpanded = new Set(expandedOrgNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedOrgNodes(newExpanded);
  };

  // Document filtering and sorting logic
  const filteredDocuments = useMemo(() => {
    let filtered = mockDocuments.filter((doc) => {
      // Search filter
      if (documentSearchQuery) {
        const searchLower = documentSearchQuery.toLowerCase();
        const matchesSearch = 
          doc.title.toLowerCase().includes(searchLower) ||
          doc.category.toLowerCase().includes(searchLower) ||
          doc.department.toLowerCase().includes(searchLower) ||
          doc.uploadedBy.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (documentCategory !== "all" && doc.category !== documentCategory) {
        return false;
      }

      // Department filter
      if (documentDepartment !== "all" && doc.department !== documentDepartment) {
        return false;
      }

      // File type filter
      if (documentFileType !== "all" && doc.fileType !== documentFileType) {
        return false;
      }

      // Upload date filter
      if (documentUploadDate !== "all") {
        const uploadDate = new Date(doc.uploadDate);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (documentUploadDate) {
          case "30":
            if (daysDiff > 30) return false;
            break;
          case "90":
            if (daysDiff > 90) return false;
            break;
          case "365":
            if (daysDiff > 365) return false;
            break;
        }
      }

      return true;
    });

    // Sort documents
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (documentSortField) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "category":
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case "department":
          aValue = a.department.toLowerCase();
          bValue = b.department.toLowerCase();
          break;
        case "fileType":
          aValue = a.fileType.toLowerCase();
          bValue = b.fileType.toLowerCase();
          break;
        case "uploadDate":
          aValue = new Date(a.uploadDate).getTime();
          bValue = new Date(b.uploadDate).getTime();
          break;
        case "expirationDate":
          aValue = a.expirationDate ? new Date(a.expirationDate).getTime() : 0;
          bValue = b.expirationDate ? new Date(b.expirationDate).getTime() : 0;
          break;
        case "uploadedBy":
          aValue = a.uploadedBy.toLowerCase();
          bValue = b.uploadedBy.toLowerCase();
          break;
        default:
          return 0;
      }

      if (documentSortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [documentSearchQuery, documentCategory, documentDepartment, documentFileType, documentUploadDate, documentSortField, documentSortDirection]);

  const handleDocumentSort = (field: string) => {
    if (documentSortField === field) {
      setDocumentSortDirection(documentSortDirection === "asc" ? "desc" : "asc");
    } else {
      setDocumentSortField(field);
      setDocumentSortDirection("asc");
    }
  };

  const isDocumentExpired = (expirationDate: string | null) => {
    if (!expirationDate) return false;
    return new Date(expirationDate) < new Date();
  };

  const MetricCard = ({ title, value, icon: Icon, trend, color }: {
    title: string;
    value: number;
    icon: any;
    trend?: string;
    color?: string;
  }) => (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-xs text-gray-500 mt-2">{trend}</p>
          )}
            </div>
        <div className={cn("p-4 rounded-xl shadow-lg", color || "bg-gradient-to-br from-blue-500 to-blue-600")}>
          <Icon className={cn("h-7 w-7", color ? "text-white" : "text-white")} />
              </div>
              </div>
    </Card>
  );

  const EmployeeCard = ({ employee }: { employee: any }) => (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Avatar className="h-14 w-14 ring-2 ring-blue-100">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              {employee.firstName[0]}{employee.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-xl text-gray-900 mb-1">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{employee.position}</p>
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                {employee.department}
              </Badge>
              <Badge 
                variant={employee.status === "Active" ? "default" : "secondary"}
            className={cn(
                  "text-xs",
                  employee.status === "Active" 
                    ? "bg-green-100 text-green-700 border-green-200" 
                    : "bg-gray-100 text-gray-700 border-gray-200"
                )}
              >
                {employee.status}
              </Badge>
          </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {employee.skills.slice(0, 3).map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                  {skill}
                </Badge>
              ))}
              {employee.skills.length > 3 && (
                <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                  +{employee.skills.length - 3} more
                </Badge>
              )}
        </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>{employee.email}</span>
                </div>
            </div>
      </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-lg">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-xl border-0 rounded-xl">
            <DropdownMenuItem onClick={() => handleEmployeeAction(employee.id, "view")} className="rounded-lg">
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEmployeeAction(employee.id, "edit")} className="rounded-lg">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => handleEmployeeAction(employee.id, "delete")}
              className="text-red-600 rounded-lg"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );

  const OrgNodeCard = ({ node, level = 0 }: { node: any; level?: number }) => {
    const isExpanded = expandedOrgNodes.has(node.id);
    const hasReports = node.directReports > 0;

  return (
      <Card className={cn("p-4", level > 0 && "ml-8")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {hasReports && (
          <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleOrgNode(node.id)}
                className="h-6 w-6 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
          </Button>
            )}
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {node.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{node.name}</h3>
              <p className="text-sm text-muted-foreground">{node.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {node.department}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {node.directReports} direct reports
                </Badge>
        </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Report
            </Button>
            {level === 0 && (
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Chart Mode
              </Button>
            )}
            </div>
                          </div>
      </Card>
    );
  };

  const DocumentCard = ({ document }: { document: any }) => (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <FileText className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{document.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{document.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Building2 className="h-3 w-3" />
                <span>{document.department}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{document.uploadedDate}</span>
        </div>
          </div>
            <div className="flex items-center space-x-2 mt-3">
              <Badge 
                variant={
                  document.status === "Active" ? "default" : 
                  document.status === "Pending Review" ? "secondary" : 
                  "outline"
                }
                className="text-xs"
              >
                {document.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {document.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {document.fileType} • {document.fileSize}
              </Badge>
              {document.complianceRequired && (
                <Badge variant="secondary" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Compliance Required
                </Badge>
            )}
          </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {document.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
      </div>
              </div>
            </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View
                    </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-poppins">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-6">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Employee Records
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === "profiles" && "Centralized employee records management and organizational tools"}
                {activeTab === "orgchart" && "Organizational Chart • Dynamic organizational structure and hierarchy"}
                {activeTab === "documents" && "Document Center • Secure document storage and retrieval system"}
                {activeTab === "settings" && "System Configuration • Configure system settings and preferences"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
                <Button
              onClick={() => setShowAddEmployeeModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
                </Button>
              </div>
            </div>
        </header>

      {/* Main Content */}
      <main className="p-8">
        {!showEmployeeProfile ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-8">
              <TabsList className="flex w-full bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-sm rounded-xl p-2 min-h-[70px]">
              <TabsTrigger
                  value="profiles" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-3 px-4 text-base font-medium flex-shrink-0 min-w-[160px]"
                >
                  <Users className="h-5 w-5" />
                  <span>Employee Profiles</span>
              </TabsTrigger>
              <TabsTrigger
                  value="orgchart" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-3 px-4 text-base font-medium flex-shrink-0 min-w-[180px]"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Organizational Chart</span>
              </TabsTrigger>
              <TabsTrigger
                  value="documents" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-3 px-4 text-base font-medium flex-shrink-0 min-w-[160px]"
                >
                  <FileText className="h-5 w-5" />
                  <span>Document Center</span>
              </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-3 px-4 text-base font-medium flex-shrink-0 min-w-[180px]"
                >
                  <Settings className="h-5 w-5" />
                  <span>System Configuration</span>
                </TabsTrigger>
          </TabsList>
            </div>

            {/* Employee Profiles Tab */}
            <TabsContent value="profiles" className="space-y-6">
              {/* Metrics Cards - FR-RM-001 Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                  title="Total Active Employees"
                  value={metrics.totalActiveEmployees}
                  icon={Users}
                  trend="Currently active"
                  color="bg-blue-100"
              />
              <MetricCard
                  title="New Hires This Month"
                  value={metrics.newHiresThisMonth}
                  icon={TrendingUp}
                  trend="Joined this month"
                  color="bg-green-100"
              />
              <MetricCard
                  title="Pending Offboarding"
                  value={metrics.pendingOffboarding}
                  icon={AlertCircle}
                  trend="Awaiting completion"
                  color="bg-orange-100"
              />
              <MetricCard
                  title="On Leave"
                  value={metrics.onLeave}
                  icon={Clock}
                  trend="Currently on leave"
                  color="bg-purple-100"
                />
              </div>

              {/* Search and Filters */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                          placeholder="Search by name, email…"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger className="w-48 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                        <SelectContent className="rounded-lg border-0 shadow-xl">
                  <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-36 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                        <SelectContent className="rounded-lg border-0 shadow-xl">
                    <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
                  </div>
                </CardContent>
              </Card>

              {/* Employee Count and View Toggle */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {filteredEmployees.length} employees found
                </p>
                <div className="flex items-center space-x-2">
                        <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300 hover:bg-gray-50"}
                  >
                    <TableIcon className="h-4 w-4 mr-2" />
                    Table View
                        </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300 hover:bg-gray-50"}
                  >
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Card View
                  </Button>
                </div>
              </div>

              {/* Employee List/Grid */}
              {viewMode === "list" ? (
                <Card>
                  <Table>
              <TableHeader>
                      <TableRow>
                        <TableHead>EMPLOYEE ID</TableHead>
                        <TableHead>EMPLOYEE NAME</TableHead>
                        <TableHead>POSITION</TableHead>
                        <TableHead>DEPARTMENT</TableHead>
                        <TableHead>SKILLS</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>JOINED DATE</TableHead>
                        <TableHead>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                      {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-mono text-sm">
                            {employee.employeeId}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs">
                                  {employee.firstName[0]}{employee.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {employee.firstName} {employee.lastName}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                              {employee.department}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {employee.skills.slice(0, 2).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                                  {skill}
                                </Badge>
                              ))}
                              {employee.skills.length > 2 && (
                                <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                                  +{employee.skills.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={employee.status === "Active" ? "default" : "secondary"}
                              className={cn(
                                "text-xs",
                                employee.status === "Active" 
                                  ? "bg-green-100 text-green-700 border-green-200" 
                                  : employee.status === "On Leave"
                                  ? "bg-purple-100 text-purple-700 border-purple-200"
                                  : employee.status === "Offboarding"
                                  ? "bg-orange-100 text-orange-700 border-orange-200"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                              )}
                            >
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(employee.joinedDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                                  <EllipsisVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="shadow-xl border-0 rounded-xl">
                                <DropdownMenuItem onClick={() => handleEmployeeAction(employee.id, "view")} className="rounded-lg">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Manage Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEmployeeAction(employee.id, "documents")} className="rounded-lg">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Documents
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEmployees.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
                            </div>
              )}

              {/* Pagination Controls - FR-RM-001 Requirements */}
              <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-gray-600">
                  Showing {filteredEmployees.length} of {mockEmployees.length} employees
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                              </Button>
                  <div className="flex items-center space-x-1">
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                      1
                                  </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                              </Button>
                            </div>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                          </div>
          </div>
            </TabsContent>

            {/* Organizational Chart Tab - FR-RM-003 Requirements */}
            <TabsContent value="orgchart" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Organizational Chart</h2>
                  <p className="text-gray-600">Dynamic organizational structure and hierarchy management - {mockOrgChart.length} total employees</p>
              </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Chart
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
        </div>
              </div>

              {/* Search and Filter - FR-RM-003 Requirements */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name or position"
                          className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-sm"
                            />
                          </div>
                          </div>
                            <Select>
                      <SelectTrigger className="w-48 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
                      <SelectContent className="rounded-lg border-0 shadow-xl">
                <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
              </SelectContent>
            </Select>
          </div>
                </CardContent>
              </Card>

              {/* Action Buttons - FR-RM-003 Requirements */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                    onClick={() => setShowManageDepartmentModal(true)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Manage Department
                    </Button>
                          </div>
                <div className="flex items-center space-x-2">
                    <Button
                    variant={orgChartViewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOrgChartViewMode("table")}
                    className={orgChartViewMode === "table" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300 hover:bg-gray-50"}
                  >
                    <TableIcon className="h-4 w-4 mr-2" />
                    Table View
                    </Button>
                  <Button
                    variant={orgChartViewMode === "chart" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOrgChartViewMode("chart")}
                    className={orgChartViewMode === "chart" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300 hover:bg-gray-50"}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Chart View
                  </Button>
                  {orgChartViewMode === "chart" && (
                    <div className="flex items-center space-x-1 ml-4">
                      <Button variant="outline" size="sm">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
            </div>

              {/* Table View - FR-RM-003 Requirements */}
              {orgChartViewMode === "table" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">List View</h3>
                    <span className="text-sm text-gray-600">{mockOrgChart.length} employees</span>
                  </div>
                  
                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>EMPLOYEE NAME</TableHead>
                          <TableHead>POSITION</TableHead>
                          <TableHead>DEPARTMENT</TableHead>
                          <TableHead>REPORTING STAFF</TableHead>
                          <TableHead>ACTION</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockOrgChart.map((node) => (
                          <React.Fragment key={node.id}>
                            <TableRow className="hover:bg-gray-50">
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => {
                                      const newExpanded = new Set(expandedOrgNodes);
                                      if (newExpanded.has(node.id)) {
                                        newExpanded.delete(node.id);
                                      } else {
                                        newExpanded.add(node.id);
                                      }
                                      setExpandedOrgNodes(newExpanded);
                                    }}
                                  >
                                    {expandedOrgNodes.has(node.id) ? (
                                      <ChevronDownSquare className="h-4 w-4" />
                                    ) : (
                                      <ChevronRightSquare className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs">
                                      {node.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{node.name}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{node.title}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={getDepartmentColor(node.department)}>
                                  {node.department}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm font-medium">{node.directReports} direct reports</span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Chart Mode
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Pencil className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Report
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            
                            {/* Show direct reports if expanded */}
                            {expandedOrgNodes.has(node.id) && node.children.map((childId) => {
                              const child = mockOrgChart.find(emp => emp.id === childId);
                              if (!child) return null;
                              
                              return (
                                <TableRow key={child.id} className="hover:bg-gray-50 bg-gray-25">
                                  <TableCell className="pl-16">
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs">
                                          {child.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium text-sm">{child.name}</p>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm">{child.title}</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary" className={getDepartmentColor(child.department)}>
                                      {child.department}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <span className="text-sm">{child.directReports} direct reports</span>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center space-x-2">
                                      <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4 mr-1" />
                                        View Chart Mode
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Edit
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Report
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* Pagination Controls */}
                    <div className="bg-white px-6 py-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Showing {mockOrgChart.length} of {mockOrgChart.length} employees
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" disabled>
                            Previous
                          </Button>
                          <Button variant="default" size="sm">
                            1
                          </Button>
                          <Button variant="outline" size="sm">
                            2
                          </Button>
                          <Button variant="outline" size="sm">
                            3
                          </Button>
                          <Button variant="outline" size="sm">
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}


              {/* Chart View - FR-RM-003 Requirements */}
              {orgChartViewMode === "chart" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Organizational Chart</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Zoom: 80% | {mockOrgChart.length} employees</span>
                    </div>
                  </div>
                  
                  <OrgChartVisualization />
                </div>
              )}

              {/* Pagination Controls - FR-RM-003 Requirements */}
              <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-gray-600">
                  Showing {mockOrgChart.length} of {mockOrgChart.length} employees
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <div className="flex items-center space-x-1">
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Document Center Tab - FR-RM-004 Requirements */}
            <TabsContent value="documents" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Document Center</h2>
                  <p className="text-gray-600">Centralized document management and retrieval system</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    onClick={() => setShowUploadDocumentModal(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                          </div>
                        </div>

              {/* Search Bar - FR-RM-004 Requirements */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Search document..."
                          value={documentSearchQuery}
                          onChange={(e) => setDocumentSearchQuery(e.target.value)}
                          className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Category Tabs - FR-RM-004 Requirements */}
              <div className="flex items-center space-x-1 bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-sm rounded-xl p-2">
                          <Button
                  variant={documentCategory === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDocumentCategory("all")}
                  className={documentCategory === "all" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"}
                >
                  All Documents
                          </Button>
                          <Button
                  variant={documentCategory === "Employee Records" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDocumentCategory("Employee Records")}
                  className={documentCategory === "Employee Records" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"}
                >
                  Employee Records
                          </Button>
                  <Button
                  variant={documentCategory === "Policies" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDocumentCategory("Policies")}
                  className={documentCategory === "Policies" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"}
                >
                  Policies
                  </Button>
                <Button
                  variant={documentCategory === "Compliance" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDocumentCategory("Compliance")}
                  className={documentCategory === "Compliance" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"}
                >
                  Compliance
                </Button>
                <Button
                  variant={documentCategory === "Training" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDocumentCategory("Training")}
                  className={documentCategory === "Training" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"}
                >
                  Training
                </Button>
                <Button
                  variant={documentCategory === "Forms & Templates" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDocumentCategory("Forms & Templates")}
                  className={documentCategory === "Forms & Templates" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"}
                >
                  Forms & Templates
                </Button>
              </div>

              {/* Filters - FR-RM-004 Requirements */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <Select value={documentDepartment} onValueChange={setDocumentDepartment}>
                      <SelectTrigger className="w-48 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-0 shadow-xl">
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="All Departments">All Departments</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={documentFileType} onValueChange={setDocumentFileType}>
                      <SelectTrigger className="w-40 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                        <SelectValue placeholder="All File Types" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-0 shadow-xl">
                        <SelectItem value="all">All File Types</SelectItem>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="DOCX">DOCX</SelectItem>
                        <SelectItem value="XLSX">XLSX</SelectItem>
                        <SelectItem value="PPTX">PPTX</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={documentUploadDate} onValueChange={setDocumentUploadDate}>
                      <SelectTrigger className="w-48 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                        <SelectValue placeholder="Any Date" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-0 shadow-xl">
                        <SelectItem value="all">Any Date</SelectItem>
                        <SelectItem value="30">Last 30 Days</SelectItem>
                        <SelectItem value="90">Last 90 Days</SelectItem>
                        <SelectItem value="365">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Document Table - FR-RM-004 Requirements */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                <Table>
                    <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDocumentSort("title")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Document Title</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                        </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDocumentSort("category")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Category</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                        </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDocumentSort("department")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Department</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                        </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDocumentSort("fileType")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>File Type</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                        </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDocumentSort("uploadDate")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Upload Date</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                        </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDocumentSort("expirationDate")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Expiration Date</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                        </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDocumentSort("uploadedBy")}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Uploaded By</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                        </TableHead>
                      <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                            {doc.category}
                          </Badge>
                          </TableCell>
                        <TableCell>{doc.department}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            {doc.fileType}
                          </Badge>
                          </TableCell>
                        <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {doc.expirationDate ? (
                            <span className={isDocumentExpired(doc.expirationDate) ? "text-red-600 font-medium" : "text-gray-600"}>
                              {new Date(doc.expirationDate).toLocaleDateString()}
                              {isDocumentExpired(doc.expirationDate) && " (Expired)"}
                                  </span>
                          ) : (
                            <span className="text-gray-400">No expiration</span>
                          )}
                          </TableCell>
                        <TableCell>{doc.uploadedBy}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="shadow-xl border-0 rounded-xl">
                              <DropdownMenuItem className="rounded-lg">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg">
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </Card>

              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredDocuments.length} of {mockDocuments.length} documents
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                    </Button>
                  <div className="flex items-center space-x-1">
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                      1
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* System Configuration Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">System Configuration</h2>
                <p className="text-gray-600">Configure system settings and preferences</p>
                </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-500">System configuration options will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // Employee Profile Management Page
          <div className="space-y-6">
            {/* Back Button */}
                    <Button
                      variant="outline"
              onClick={() => setShowEmployeeProfile(false)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Employee Records
                    </Button>

            {/* Employee Header */}
            {selectedEmployeeProfile && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-20 w-20 ring-4 ring-blue-100">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold">
                        {selectedEmployeeProfile.firstName?.[0]}{selectedEmployeeProfile.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                          {selectedEmployeeProfile.firstName} {selectedEmployeeProfile.lastName}
                        </h1>
                        <Badge 
                          variant={selectedEmployeeProfile.status === "Active" ? "default" : "secondary"}
                          className={selectedEmployeeProfile.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                        >
                          {selectedEmployeeProfile.status}
                        </Badge>
                  </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="font-medium">{selectedEmployeeProfile.email}</p>
                </div>
                        <div>
                          <p className="text-gray-500">Phone</p>
                          <p className="font-medium">{selectedEmployeeProfile.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Department</p>
                          <p className="font-medium">{selectedEmployeeProfile.department}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Location</p>
                          <p className="font-medium">{selectedEmployeeProfile.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        <p className="text-gray-500 text-sm">Employee ID</p>
                        <p className="font-bold text-lg">{mockEmployeeProfileData.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Joined Date</p>
                        <p className="font-medium">{new Date(selectedEmployeeProfile.joinedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Employee Profile Tabs */}
            <Tabs value={employeeProfileTab} onValueChange={setEmployeeProfileTab}>
              <div className="mb-6">
                <TabsList className="flex w-full bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-sm rounded-xl p-2 overflow-x-auto">
                  <TabsTrigger 
                    value="personal"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <User className="h-4 w-4" />
                    <span>Personal Info</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="work"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Work Details</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="skills"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <Award className="h-4 w-4" />
                    <span>Skills</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="compensation"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>Compensation</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="performance"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Performance</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="training"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Training</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="leave"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Leave & Attendance</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documents"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Documents</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="application"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Application History</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="access"
                    className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-2 px-3 text-sm font-medium flex-shrink-0 min-w-[120px]"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Access & Security</span>
                  </TabsTrigger>
                </TabsList>
                        </div>

              {/* Personal Info Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                        <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium">First Name *</Label>
                          <Input value={mockEmployeeProfileData.firstName} readOnly className="mt-1 text-sm" />
                            </div>
                        <div>
                          <Label className="text-sm font-medium">Middle Name</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.middleName} readOnly className="mt-1 text-sm" />
                          </div>
                        <div>
                          <Label className="text-sm font-medium">Last Name *</Label>
                          <Input value={mockEmployeeProfileData.lastName} readOnly className="mt-1 text-sm" />
                          </div>
                        <div>
                          <Label className="text-sm font-medium">Date of Birth *</Label>
                          <Input value={new Date(mockEmployeeProfileData.personalInfo.dateOfBirth).toLocaleDateString()} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Gender *</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.gender} readOnly className="mt-1 text-sm" />
                      </div>
                        <div>
                          <Label className="text-sm font-medium">Marital Status</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.maritalStatus} readOnly className="mt-1 text-sm" />
                    </div>
                      <div>
                          <Label className="text-sm font-medium">Nationality</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.nationality} readOnly className="mt-1 text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                      <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Contact Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Phone Number *</Label>
                          <Input value={mockEmployeeProfileData.phone} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Alternate Number</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.alternatePhone} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Email Address *</Label>
                          <Input value={mockEmployeeProfileData.email} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                          <Label className="text-sm font-medium">Work Email</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.workEmail} readOnly className="mt-1 text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Address Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-3">
                          <Label className="text-sm font-medium">Street Address *</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.streetAddress} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">City *</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.city} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">State *</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.state} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Zip Code *</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.zipCode} readOnly className="mt-1 text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Contact Name</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.emergencyContact.name} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Contact Number</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.emergencyContact.phone} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Relationship</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.emergencyContact.relationship} readOnly className="mt-1 text-sm" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Alternate Number</Label>
                          <Input value={mockEmployeeProfileData.personalInfo.emergencyContact.alternatePhone} readOnly className="mt-1 text-sm" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Add other tabs here - Work Details, Skills, etc. */}
              <TabsContent value="work" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Work Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Position *</Label>
                        <Input value={mockEmployeeProfileData.workDetails.position} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Department *</Label>
                        <Input value={mockEmployeeProfileData.workDetails.department} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Reporting Manager *</Label>
                        <Input value={mockEmployeeProfileData.workDetails.reportingManager} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Employment Status *</Label>
                        <Input value={mockEmployeeProfileData.workDetails.employmentStatus} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Employment Type *</Label>
                        <Input value={mockEmployeeProfileData.workDetails.employmentType} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Date Hired *</Label>
                        <Input value={new Date(mockEmployeeProfileData.workDetails.dateHired).toLocaleDateString()} readOnly className="mt-1 text-sm" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEmployeeProfileData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{skill.name}</h4>
                            <p className="text-sm text-gray-600">{skill.experience} years experience</p>
                          </div>
                          <Badge variant="secondary">{skill.level}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compensation Tab */}
              <TabsContent value="compensation" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Compensation Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Current Salary *</Label>
                        <Input value={mockEmployeeProfileData.compensation.currentSalary} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Last Review *</Label>
                        <Input value={new Date(mockEmployeeProfileData.compensation.lastReview).toLocaleDateString()} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Next Review *</Label>
                        <Input value={new Date(mockEmployeeProfileData.compensation.nextReview).toLocaleDateString()} readOnly className="mt-1 text-sm" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Performance Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEmployeeProfileData.performance.map((review, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{review.reviewPeriod}</h4>
                            <Badge variant="secondary">{review.rating}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Reviewer: {review.reviewerName}</p>
                          <p className="text-sm">{review.comments}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Training Tab */}
              <TabsContent value="training" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Training and Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Training Section */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Training</h4>
                      <div className="space-y-4">
                        {mockEmployeeProfileData.training.map((training, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{training.title}</h5>
                              <Badge variant="secondary">{training.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Provider: {training.provider}</p>
                            <p className="text-sm text-gray-600">Completed: {new Date(training.dateCompleted).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications Section */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Certifications</h4>
                      <div className="space-y-4">
                        {mockEmployeeProfileData.certifications.map((cert, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{cert.name}</h5>
                              <Badge variant={cert.certificateStatus === "Valid" ? "default" : "secondary"}>
                                {cert.certificateStatus}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600">Organization: {cert.issuedOrganization}</p>
                            <p className="text-sm text-gray-600">Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>
                          </div>
                              ))}
                            </div>
                      </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Leave & Attendance Tab */}
              <TabsContent value="leave" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Leave & Attendance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium">Attendance Rate</Label>
                        <Input value={`${mockEmployeeProfileData.attendance.attendanceRate}%`} readOnly className="mt-1 text-sm" />
                    </div>
                      <div>
                        <Label className="text-sm font-medium">Punctuality Rate</Label>
                        <Input value={`${mockEmployeeProfileData.attendance.punctualityRate}%`} readOnly className="mt-1 text-sm" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Employee Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEmployeeProfileData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{doc.title}</h4>
                            <p className="text-sm text-gray-600">{doc.fileType} • {doc.fileSize}</p>
                          </div>
                          <Badge variant="outline">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</Badge>
                  </div>
                ))}
                    </div>
                  </CardContent>
                </Card>
          </TabsContent>

              {/* Application History Tab */}
              <TabsContent value="application" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Application History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Job ID</Label>
                        <Input value={mockEmployeeProfileData.applicationHistory.jobId} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Application Date</Label>
                        <Input value={new Date(mockEmployeeProfileData.applicationHistory.applicationDate).toLocaleDateString()} readOnly className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Application Method</Label>
                        <Input value={mockEmployeeProfileData.applicationHistory.applicationMethod} readOnly className="mt-1 text-sm" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
          </TabsContent>

              {/* Access & Security Tab */}
              <TabsContent value="access" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Access & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <Label className="text-sm font-medium">Account Active</Label>
                          <p className="text-sm text-gray-600">Indicates whether the user account is currently active or inactive</p>
                </div>
                        <Switch defaultChecked={mockEmployeeProfileData.accessSecurity.accountActive} />
                </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <Label className="text-sm font-medium">HR Access</Label>
                          <p className="text-sm text-gray-600">Determines if the user has permission to access HR-related features</p>
              </div>
                        <Switch defaultChecked={mockEmployeeProfileData.accessSecurity.hrAccess} />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <Label className="text-sm font-medium">Admin Rights</Label>
                          <p className="text-sm text-gray-600">Specifies whether the user has administrative privileges within the system</p>
                        </div>
                        <Switch defaultChecked={mockEmployeeProfileData.accessSecurity.adminRights} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
        </main>

      {/* Add Employee Modal */}
      <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
        <DialogContent className="max-w-2xl">
                  <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
                  </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" placeholder="Enter first name" />
                    </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" placeholder="Enter last name" />
                    </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input id="position" placeholder="Enter position" />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" placeholder="Enter skills (comma separated)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Intern">Intern</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
                    </div>
                    </div>
                  </div>
                  <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEmployeeModal(false)}>
                      Cancel
                    </Button>
            <Button onClick={() => {
              setShowAddEmployeeModal(false);
              toast({
                title: "Employee Added",
                description: "New employee has been added successfully.",
              });
            }}>
              Add Employee
            </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

      {/* Upload Document Modal */}
      <Dialog open={showUploadDocumentModal} onOpenChange={setShowUploadDocumentModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="docTitle">Document Title *</Label>
                <Input id="docTitle" placeholder="Enter document title" />
                </div>
              <div>
                <Label htmlFor="docType">Document Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Policy Document">Policy Document</SelectItem>
                    <SelectItem value="Audit Report">Audit Report</SelectItem>
                    <SelectItem value="Template">Template</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="HR">Human Resources</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter document description" />
                          </div>
            <div>
              <Label htmlFor="file">File Upload *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOCX, DOC, XLS, XLSX files up to 10MB</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="compliance" />
              <Label htmlFor="compliance">This document requires compliance tracking</Label>
            </div>
                  </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDocumentModal(false)}>
              Cancel
              </Button>
            <Button onClick={() => {
              setShowUploadDocumentModal(false);
              toast({
                title: "Document Uploaded",
                description: "Document has been uploaded successfully.",
              });
            }}>
              Upload Document
      </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Department Modal - FR-RM-003 Requirements */}
      <Dialog open={showManageDepartmentModal} onOpenChange={setShowManageDepartmentModal}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Manage Department</span>
            </DialogTitle>
          </DialogHeader>
          
          {/* Department Management Interface */}
          <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by department head name"
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Department Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </div>

            {/* Department Table */}
            <Card>
              <Table>
                  <TableHeader>
                    <TableRow>
                    <TableHead>DEPARTMENT</TableHead>
                    <TableHead>COST CENTER</TableHead>
                    <TableHead>TEAM MEMBERS</TableHead>
                    <TableHead>DEPARTMENT HEAD</TableHead>
                    <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Executive</span>
                      </div>
                          </TableCell>
                    <TableCell>CC-001</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                        </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Engineering</span>
                      </div>
                        </TableCell>
                    <TableCell>CC-002</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>Mike Chen</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                        </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Finance</span>
                      </div>
                        </TableCell>
                    <TableCell>CC-003</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>Emily Rodriguez</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                        </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Marketing</span>
                      </div>
                        </TableCell>
                    <TableCell>CC-004</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>David Kim</TableCell>
                    <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                                  <EllipsisVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Human Resources</span>
                          </div>
                        </TableCell>
                    <TableCell>CC-005</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>Lisa Thompson</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
            </Card>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing 1-5 of 5 departments
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                    1
                  </Button>
            </div>
                <Button variant="outline" size="sm" disabled>
                  Next
              </Button>
            </div>
          </div>
      </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowManageDepartmentModal(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Organizational Chart
      </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
