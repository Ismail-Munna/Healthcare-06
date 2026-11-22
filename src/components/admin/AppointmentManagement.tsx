import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";

function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await AdminService.getDashboardData();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Total Doctors: {data.stats.totalDoctors}</h2>
      <h2>Total Patients: {data.stats.totalPatients}</h2>
      <h2>Total Revenue: ৳{data.stats.totalRevenue}</h2>
    </div>
  );
}
import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  User,
  Users,
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
  X,
  Check,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Download,
  RefreshCw,
  CalendarDays,
  CreditCard,
  DollarSign,
  FileText,
  Activity,
  TrendingUp,
  Video,
  Building2,
  ClipboardList,
  ArrowUpDown,
  SlidersHorizontal,
  Ban,
  Printer,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type AppointmentStatus =
  | "Scheduled"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Pending"
  | "No Show";

type PaymentStatus =
  | "Paid"
  | "Unpaid"
  | "Refunded"
  | "Partial";

type AppointmentType =
  | "In-person"
  | "Video Consultation";

type Priority = "Normal" | "Urgent" | "High";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  avatar: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  avatar: string;
  phone: string;
  rating: number;
}

interface Appointment {
  id: string;
  appointmentNumber: string;
  patient: Patient;
  doctor: Doctor;
  date: string;
  time: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  priority: Priority;
  reason: string;
  notes: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

/* =========================================================
   MOCK DATA
========================================================= */

const patients: Patient[] = [
  {
    id: "P-001",
    name: "Rahim Ahmed",
    email: "rahim@gmail.com",
    phone: "+8801712345678",
    age: 28,
    gender: "Male",
    bloodGroup: "O+",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "P-002",
    name: "Nusrat Jahan",
    email: "nusrat@gmail.com",
    phone: "+8801812345678",
    age: 24,
    gender: "Female",
    bloodGroup: "A+",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "P-003",
    name: "Sakib Hasan",
    email: "sakib@gmail.com",
    phone: "+8801912345678",
    age: 32,
    gender: "Male",
    bloodGroup: "B+",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "P-004",
    name: "Mim Akter",
    email: "mim@gmail.com",
    phone: "+8801612345678",
    age: 26,
    gender: "Female",
    bloodGroup: "AB+",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: "P-005",
    name: "Tanvir Islam",
    email: "tanvir@gmail.com",
    phone: "+8801512345678",
    age: 35,
    gender: "Male",
    bloodGroup: "O-",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: "P-006",
    name: "Sadia Rahman",
    email: "sadia@gmail.com",
    phone: "+8801711122233",
    age: 29,
    gender: "Female",
    bloodGroup: "B-",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: "P-007",
    name: "Arif Hossain",
    email: "arif@gmail.com",
    phone: "+8801811122233",
    age: 41,
    gender: "Male",
    bloodGroup: "A-",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "P-008",
    name: "Maliha Islam",
    email: "maliha@gmail.com",
    phone: "+8801911122233",
    age: 22,
    gender: "Female",
    bloodGroup: "O+",
    avatar: "https://i.pravatar.cc/150?img=46",
  },
  {
    id: "P-009",
    name: "Fahim Ahmed",
    email: "fahim@gmail.com",
    phone: "+8801611122233",
    age: 30,
    gender: "Male",
    bloodGroup: "AB-",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: "P-010",
    name: "Jannatul Ferdous",
    email: "jannatul@gmail.com",
    phone: "+8801511122233",
    age: 27,
    gender: "Female",
    bloodGroup: "A+",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
];

const doctors: Doctor[] = [
  {
    id: "D-001",
    name: "Dr. Ahmed Khan",
    specialization: "Cardiologist",
    department: "Cardiology",
    avatar: "https://i.pravatar.cc/150?img=60",
    phone: "+8801712340001",
    rating: 4.9,
  },
  {
    id: "D-002",
    name: "Dr. Sarah Ahmed",
    specialization: "Dermatologist",
    department: "Dermatology",
    avatar: "https://i.pravatar.cc/150?img=49",
    phone: "+8801712340002",
    rating: 4.8,
  },
  {
    id: "D-003",
    name: "Dr. Rakib Hasan",
    specialization: "Neurologist",
    department: "Neurology",
    avatar: "https://i.pravatar.cc/150?img=61",
    phone: "+8801712340003",
    rating: 4.7,
  },
  {
    id: "D-004",
    name: "Dr. Nusrat Jahan",
    specialization: "Pediatrician",
    department: "Pediatrics",
    avatar: "https://i.pravatar.cc/150?img=50",
    phone: "+8801712340004",
    rating: 4.9,
  },
  {
    id: "D-005",
    name: "Dr. Imran Hossain",
    specialization: "Orthopedic",
    department: "Orthopedics",
    avatar: "https://i.pravatar.cc/150?img=62",
    phone: "+8801712340005",
    rating: 4.6,
  },
  {
    id: "D-006",
    name: "Dr. Farhana Islam",
    specialization: "Gynecologist",
    department: "Gynecology",
    avatar: "https://i.pravatar.cc/150?img=51",
    phone: "+8801712340006",
    rating: 4.8,
  },
];

const initialAppointments: Appointment[] = [
  {
    id: "1",
    appointmentNumber: "APT-2026-001",
    patient: patients[0],
    doctor: doctors[0],
    date: "2026-11-22",
    time: "09:00 AM",
    duration: 30,
    type: "In-person",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 1200,
    priority: "Normal",
    reason: "Regular heart checkup",
    notes: "Patient requested morning appointment.",
    location: "Room 101",
    createdAt: "2026-11-18",
    updatedAt: "2026-11-20",
  },
  {
    id: "2",
    appointmentNumber: "APT-2026-002",
    patient: patients[1],
    doctor: doctors[1],
    date: "2026-11-22",
    time: "10:30 AM",
    duration: 30,
    type: "Video Consultation",
    status: "Scheduled",
    paymentStatus: "Unpaid",
    amount: 1000,
    priority: "High",
    reason: "Skin allergy consultation",
    notes: "Video consultation requested.",
    location: "Online",
    createdAt: "2026-11-19",
    updatedAt: "2026-11-19",
  },
  {
    id: "3",
    appointmentNumber: "APT-2026-003",
    patient: patients[2],
    doctor: doctors[2],
    date: "2026-11-23",
    time: "11:00 AM",
    duration: 45,
    type: "In-person",
    status: "Pending",
    paymentStatus: "Unpaid",
    amount: 1500,
    priority: "Urgent",
    reason: "Severe headache",
    notes: "Needs further assessment by the doctor.",
    location: "Room 203",
    createdAt: "2026-11-20",
    updatedAt: "2026-11-20",
  },
  {
    id: "4",
    appointmentNumber: "APT-2026-004",
    patient: patients[3],
    doctor: doctors[3],
    date: "2026-11-21",
    time: "12:00 PM",
    duration: 30,
    type: "In-person",
    status: "Completed",
    paymentStatus: "Paid",
    amount: 900,
    priority: "Normal",
    reason: "Child health checkup",
    notes: "Consultation completed.",
    location: "Room 105",
    createdAt: "2026-11-16",
    updatedAt: "2026-11-21",
  },
  {
    id: "5",
    appointmentNumber: "APT-2026-005",
    patient: patients[4],
    doctor: doctors[4],
    date: "2026-11-24",
    time: "02:00 PM",
    duration: 30,
    type: "In-person",
    status: "Cancelled",
    paymentStatus: "Refunded",
    amount: 1100,
    priority: "Normal",
    reason: "Knee pain",
    notes: "Patient cancelled the appointment.",
    location: "Room 301",
    createdAt: "2026-11-17",
    updatedAt: "2026-11-21",
  },
  {
    id: "6",
    appointmentNumber: "APT-2026-006",
    patient: patients[5],
    doctor: doctors[5],
    date: "2026-11-24",
    time: "03:30 PM",
    duration: 45,
    type: "Video Consultation",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 1300,
    priority: "High",
    reason: "Follow-up consultation",
    notes: "Previous consultation follow-up.",
    location: "Online",
    createdAt: "2026-11-18",
    updatedAt: "2026-11-20",
  },
  {
    id: "7",
    appointmentNumber: "APT-2026-007",
    patient: patients[6],
    doctor: doctors[0],
    date: "2026-11-25",
    time: "09:30 AM",
    duration: 30,
    type: "In-person",
    status: "Scheduled",
    paymentStatus: "Partial",
    amount: 1200,
    priority: "Normal",
    reason: "Blood pressure check",
    notes: "Patient paid an advance amount.",
    location: "Room 101",
    createdAt: "2026-11-19",
    updatedAt: "2026-11-20",
  },
  {
    id: "8",
    appointmentNumber: "APT-2026-008",
    patient: patients[7],
    doctor: doctors[1],
    date: "2026-11-25",
    time: "10:00 AM",
    duration: 30,
    type: "In-person",
    status: "No Show",
    paymentStatus: "Paid",
    amount: 1000,
    priority: "Normal",
    reason: "Skin examination",
    notes: "Patient did not attend.",
    location: "Room 202",
    createdAt: "2026-11-18",
    updatedAt: "2026-11-25",
  },
  {
    id: "9",
    appointmentNumber: "APT-2026-009",
    patient: patients[8],
    doctor: doctors[2],
    date: "2026-11-26",
    time: "01:00 PM",
    duration: 45,
    type: "Video Consultation",
    status: "Pending",
    paymentStatus: "Unpaid",
    amount: 1500,
    priority: "Urgent",
    reason: "Migraine consultation",
    notes: "Patient prefers online consultation.",
    location: "Online",
    createdAt: "2026-11-20",
    updatedAt: "2026-11-20",
  },
  {
    id: "10",
    appointmentNumber: "APT-2026-010",
    patient: patients[9],
    doctor: doctors[3],
    date: "2026-11-26",
    time: "04:00 PM",
    duration: 30,
    type: "In-person",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 900,
    priority: "Normal",
    reason: "Routine consultation",
    notes: "No additional notes.",
    location: "Room 105",
    createdAt: "2026-11-19",
    updatedAt: "2026-11-21",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const currency = (amount: number) =>
  `৳${amount.toLocaleString("en-BD")}`;

const formatDate = (date: string) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusColor = (status: AppointmentStatus) => {
  const styles: Record<AppointmentStatus, string> = {
    Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    Confirmed: "bg-green-50 text-green-700 border-green-200",
    Completed: "bg-purple-50 text-purple-700 border-purple-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    "No Show": "bg-gray-100 text-gray-700 border-gray-200",
  };

  return styles[status];
};

const getPaymentColor = (status: PaymentStatus) => {
  const styles: Record<PaymentStatus, string> = {
    Paid: "bg-green-50 text-green-700",
    Unpaid: "bg-red-50 text-red-700",
    Refunded: "bg-purple-50 text-purple-700",
    Partial: "bg-amber-50 text-amber-700",
  };

  return styles[status];
};

const getPriorityColor = (priority: Priority) => {
  const styles: Record<Priority, string> = {
    Normal: "bg-gray-100 text-gray-600",
    High: "bg-orange-50 text-orange-700",
    Urgent: "bg-red-50 text-red-700",
  };

  return styles[priority];
};

const downloadCSV = (data: Appointment[]) => {
  const headers = [
    "Appointment ID",
    "Patient",
    "Patient Email",
    "Doctor",
    "Department",
    "Date",
    "Time",
    "Type",
    "Status",
    "Payment",
    "Amount",
  ];

  const rows = data.map((item) => [
    item.appointmentNumber,
    item.patient.name,
    item.patient.email,
    item.doctor.name,
    item.doctor.department,
    item.date,
    item.time,
    item.type,
    item.status,
    item.paymentStatus,
    item.amount,
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "appointments.csv";
  link.click();

  URL.revokeObjectURL(url);
};

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  iconColor,
  iconBg,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
          <p className="mt-2 text-xs text-gray-500">{description}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconBg} ${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface StatusBadgeProps {
  status: AppointmentStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(
      status,
    )}`}
  >
    {status}
  </span>
);

interface PaymentBadgeProps {
  status: PaymentStatus;
}

const PaymentBadge: React.FC<PaymentBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getPaymentColor(
      status,
    )}`}
  >
    {status}
  </span>
);

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  children,
  width = "max-w-2xl",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`max-h-[90vh] w-full ${width} overflow-y-auto rounded-2xl bg-white shadow-2xl`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  required,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="mb-4 rounded-full bg-gray-100 p-5">
      <CalendarDays size={30} className="text-gray-400" />
    </div>

    <h3 className="font-semibold text-gray-800">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
  </div>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [toast, setToast] = useState("");

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    duration: 30,
    type: "In-person" as AppointmentType,
    status: "Pending" as AppointmentStatus,
    paymentStatus: "Unpaid" as PaymentStatus,
    amount: 1000,
    priority: "Normal" as Priority,
    reason: "",
    notes: "",
    location: "",
  });

  /* =====================================================
     TOAST
  ===================================================== */

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  /* =====================================================
     STATISTICS
  ===================================================== */

  const stats = useMemo(() => {
    const total = appointments.length;

    const confirmed = appointments.filter(
      (item) => item.status === "Confirmed",
    ).length;

    const pending = appointments.filter(
      (item) => item.status === "Pending",
    ).length;

    const completed = appointments.filter(
      (item) => item.status === "Completed",
    ).length;

    const cancelled = appointments.filter(
      (item) => item.status === "Cancelled",
    ).length;

    const revenue = appointments
      .filter((item) => item.paymentStatus === "Paid")
      .reduce((sum, item) => sum + item.amount, 0);

    const unpaid = appointments
      .filter((item) => item.paymentStatus === "Unpaid")
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      total,
      confirmed,
      pending,
      completed,
      cancelled,
      revenue,
      unpaid,
    };
  }, [appointments]);

  /* =====================================================
     FILTERING
  ===================================================== */

  const filteredAppointments = useMemo(() => {
    let result = [...appointments];

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      result = result.filter((item) => {
        return (
          item.appointmentNumber.toLowerCase().includes(query) ||
          item.patient.name.toLowerCase().includes(query) ||
          item.patient.email.toLowerCase().includes(query) ||
          item.patient.phone.toLowerCase().includes(query) ||
          item.doctor.name.toLowerCase().includes(query) ||
          item.doctor.department.toLowerCase().includes(query)
        );
      });
    }

    if (statusFilter !== "All") {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (paymentFilter !== "All") {
      result = result.filter(
        (item) => item.paymentStatus === paymentFilter,
      );
    }

    if (typeFilter !== "All") {
      result = result.filter((item) => item.type === typeFilter);
    }

    if (doctorFilter !== "All") {
      result = result.filter((item) => item.doctor.id === doctorFilter);
    }

    if (priorityFilter !== "All") {
      result = result.filter((item) => item.priority === priorityFilter);
    }

    if (startDate) {
      result = result.filter((item) => item.date >= startDate);
    }

    if (endDate) {
      result = result.filter((item) => item.date <= endDate);
    }

    result.sort((a, b) => {
      let first = "";
      let second = "";

      if (sortField === "date") {
        first = `${a.date} ${a.time}`;
        second = `${b.date} ${b.time}`;
      } else if (sortField === "patient") {
        first = a.patient.name;
        second = b.patient.name;
      } else if (sortField === "doctor") {
        first = a.doctor.name;
        second = b.doctor.name;
      } else if (sortField === "amount") {
        first = String(a.amount).padStart(10, "0");
        second = String(b.amount).padStart(10, "0");
      } else {
        first = a.appointmentNumber;
        second = b.appointmentNumber;
      }

      const comparison = first.localeCompare(second);

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    appointments,
    searchTerm,
    statusFilter,
    paymentFilter,
    typeFilter,
    doctorFilter,
    priorityFilter,
    startDate,
    endDate,
    sortField,
    sortDirection,
  ]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAppointments.length / pageSize),
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedAppointments = filteredAppointments.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const changePage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setTypeFilter("All");
    setDoctorFilter("All");
    setPriorityFilter("All");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  /* =====================================================
     FORM HANDLERS
  ===================================================== */

  const resetForm = () => {
    setFormData({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      duration: 30,
      type: "In-person",
      status: "Pending",
      paymentStatus: "Unpaid",
      amount: 1000,
      priority: "Normal",
      reason: "",
      notes: "",
      location: "",
    });
  };

  const updateForm = (
    field: keyof typeof formData,
    value: string | number,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const getSelectedPatient = (id: string) =>
    patients.find((item) => item.id === id);

  const getSelectedDoctor = (id: string) =>
    doctors.find((item) => item.id === id);

  /* =====================================================
     CREATE APPOINTMENT
  ===================================================== */

  const handleCreateAppointment = (event: React.FormEvent) => {
    event.preventDefault();

    const patient = getSelectedPatient(formData.patientId);
    const doctor = getSelectedDoctor(formData.doctorId);

    if (!patient || !doctor) {
      showToast("Please select a patient and doctor.");
      return;
    }

    if (!formData.date || !formData.time || !formData.reason.trim()) {
      showToast("Please complete all required fields.");
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      appointmentNumber: `APT-${Date.now().toString().slice(-8)}`,
      patient,
      doctor,
      date: formData.date,
      time: formData.time,
      duration: Number(formData.duration),
      type: formData.type,
      status: formData.status,
      paymentStatus: formData.paymentStatus,
      amount: Number(formData.amount),
      priority: formData.priority,
      reason: formData.reason,
      notes: formData.notes,
      location:
        formData.type === "Video Consultation"
          ? "Online"
          : formData.location || "Not assigned",
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setAppointments((previous) => [newAppointment, ...previous]);

    setShowCreateModal(false);
    resetForm();
    setCurrentPage(1);

    showToast("Appointment created successfully.");
  };

  /* =====================================================
     EDIT APPOINTMENT
  ===================================================== */

  const openEditModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);

    setFormData({
      patientId: appointment.patient.id,
      doctorId: appointment.doctor.id,
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
      type: appointment.type,
      status: appointment.status,
      paymentStatus: appointment.paymentStatus,
      amount: appointment.amount,
      priority: appointment.priority,
      reason: appointment.reason,
      notes: appointment.notes,
      location: appointment.location,
    });

    setShowEditModal(true);
  };

  const handleEditAppointment = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedAppointment) return;

    const patient = getSelectedPatient(formData.patientId);
    const doctor = getSelectedDoctor(formData.doctorId);

    if (!patient || !doctor) {
      showToast("Please select a valid patient and doctor.");
      return;
    }

    setAppointments((previous) =>
      previous.map((item) =>
        item.id === selectedAppointment.id
          ? {
              ...item,
              patient,
              doctor,
              date: formData.date,
              time: formData.time,
              duration: Number(formData.duration),
              type: formData.type,
              status: formData.status,
              paymentStatus: formData.paymentStatus,
              amount: Number(formData.amount),
              priority: formData.priority,
              reason: formData.reason,
              notes: formData.notes,
              location:
                formData.type === "Video Consultation"
                  ? "Online"
                  : formData.location,
              updatedAt: new Date().toISOString().slice(0, 10),
            }
          : item,
      ),
    );

    setShowEditModal(false);
    setSelectedAppointment(null);
    resetForm();

    showToast("Appointment updated successfully.");
  };

  /* =====================================================
     DELETE APPOINTMENT
  ===================================================== */

  const openDeleteModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDeleteModal(true);
  };

  const handleDeleteAppointment = () => {
    if (!selectedAppointment) return;

    setAppointments((previous) =>
      previous.filter((item) => item.id !== selectedAppointment.id),
    );

    setShowDeleteModal(false);
    setSelectedAppointment(null);

    showToast("Appointment deleted successfully.");
  };

  /* =====================================================
     STATUS UPDATE
  ===================================================== */

  const updateAppointmentStatus = (
    id: string,
    status: AppointmentStatus,
  ) => {
    setAppointments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              updatedAt: new Date().toISOString().slice(0, 10),
            }
          : item,
      ),
    );

    showToast(`Appointment marked as ${status}.`);
  };

  /* =====================================================
     PAYMENT UPDATE
  ===================================================== */

  const updatePaymentStatus = (
    id: string,
    paymentStatus: PaymentStatus,
  ) => {
    setAppointments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              paymentStatus,
              updatedAt: new Date().toISOString().slice(0, 10),
            }
          : item,
      ),
    );

    showToast(`Payment status updated to ${paymentStatus}.`);
  };

  /* =====================================================
     VIEW DETAILS
  ===================================================== */

  const openDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedAppointment(null);
  };

  /* =====================================================
     SORTING
  ===================================================== */

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((previous) =>
        previous === "asc" ? "desc" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  /* =====================================================
     EXPORT
  ===================================================== */

  const handleExport = () => {
    if (filteredAppointments.length === 0) {
      showToast("No appointments available to export.");
      return;
    }

    downloadCSV(filteredAppointments);
    showToast("CSV exported successfully.");
  };

  /* =====================================================
     PRINT
  ===================================================== */

  const handlePrint = () => {
    window.print();
  };

  /* =====================================================
     FORM CONTENT
  ===================================================== */

  const renderAppointmentForm = (
    submitHandler: (event: React.FormEvent) => void,
    submitLabel: string,
  ) => (
    <form onSubmit={submitHandler} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Select Patient" required>
          <select
            className={inputClass}
            value={formData.patientId}
            onChange={(event) =>
              updateForm("patientId", event.target.value)
            }
            required
          >
            <option value="">Choose patient</option>

            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name} — {patient.id}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Select Doctor" required>
          <select
            className={inputClass}
            value={formData.doctorId}
            onChange={(event) =>
              updateForm("doctorId", event.target.value)
            }
            required
          >
            <option value="">Choose doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} — {doctor.department}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Appointment Date" required>
          <input
            type="date"
            className={inputClass}
            value={formData.date}
            onChange={(event) => updateForm("date", event.target.value)}
            required
          />
        </FormField>

        <FormField label="Appointment Time" required>
          <input
            type="time"
            className={inputClass}
            value={formData.time}
            onChange={(event) => updateForm("time", event.target.value)}
            required
          />
        </FormField>

        <FormField label="Duration">
          <select
            className={inputClass}
            value={formData.duration}
            onChange={(event) =>
              updateForm("duration", Number(event.target.value))
            }
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={90}>90 minutes</option>
          </select>
        </FormField>

        <FormField label="Appointment Type">
          <select
            className={inputClass}
            value={formData.type}
            onChange={(event) =>
              updateForm("type", event.target.value)
            }
          >
            <option value="In-person">In-person</option>
            <option value="Video Consultation">
              Video Consultation
            </option>
          </select>
        </FormField>

        <FormField label="Appointment Status">
          <select
            className={inputClass}
            value={formData.status}
            onChange={(event) =>
              updateForm("status", event.target.value)
            }
          >
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
        </FormField>

        <FormField label="Priority">
          <select
            className={inputClass}
            value={formData.priority}
            onChange={(event) =>
              updateForm("priority", event.target.value)
            }
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </FormField>

        <FormField label="Payment Amount (BDT)" required>
          <input
            type="number"
            min="0"
            className={inputClass}
            value={formData.amount}
            onChange={(event) =>
              updateForm("amount", Number(event.target.value))
            }
            required
          />
        </FormField>

        <FormField label="Payment Status">
          <select
            className={inputClass}
            value={formData.paymentStatus}
            onChange={(event) =>
              updateForm("paymentStatus", event.target.value)
            }
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Refunded">Refunded</option>
          </select>
        </FormField>

        <FormField label="Location">
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Room 101"
            value={formData.location}
            onChange={(event) =>
              updateForm("location", event.target.value)
            }
            disabled={formData.type === "Video Consultation"}
          />
        </FormField>
      </div>

      <FormField label="Reason for Appointment" required>
        <input
          type="text"
          className={inputClass}
          placeholder="Enter appointment reason"
          value={formData.reason}
          onChange={(event) => updateForm("reason", event.target.value)}
          required
        />
      </FormField>

      <FormField label="Additional Notes">
        <textarea
          rows={3}
          className={inputClass}
          placeholder="Write additional notes..."
          value={formData.notes}
          onChange={(event) => updateForm("notes", event.target.value)}
        />
      </FormField>

      <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            resetForm();
          }}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );

  /* =====================================================
     TABLE ROW
  ===================================================== */

  const renderAppointmentRow = (appointment: Appointment) => (
    <tr
      key={appointment.id}
      className="border-b border-gray-100 transition hover:bg-gray-50"
    >
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-blue-600">
            {appointment.appointmentNumber}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Created {formatDate(appointment.createdAt)}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={appointment.patient.avatar}
            alt={appointment.patient.name}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-800">
              {appointment.patient.name}
            </p>
            <p className="text-xs text-gray-500">
              {appointment.patient.phone}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={appointment.doctor.avatar}
            alt={appointment.doctor.name}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-800">
              {appointment.doctor.name}
            </p>
            <p className="text-xs text-gray-500">
              {appointment.doctor.department}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={15} className="text-gray-400" />
          <span className="text-sm">{formatDate(appointment.date)}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-gray-500">
          <Clock size={14} />
          <span className="text-xs">{appointment.time}</span>
        </div>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={appointment.status} />
      </td>

      <td className="px-5 py-4">
        <PaymentBadge status={appointment.paymentStatus} />
        <p className="mt-1 text-sm font-semibold text-gray-800">
          {currency(appointment.amount)}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => openDetails(appointment)}
            title="View details"
            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
          >
            <Eye size={17} />
          </button>

          <button
            onClick={() => openEditModal(appointment)}
            title="Edit appointment"
            className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
          >
            <Edit size={17} />
          </button>

          <button
            onClick={() => openDeleteModal(appointment)}
            title="Delete appointment"
            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );

  /* =====================================================
     DETAILS MODAL CONTENT
  ===================================================== */

  const renderDetails = () => {
    if (!selectedAppointment) return null;

    const appointment = selectedAppointment;

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">Appointment Number</p>
            <h3 className="mt-1 text-lg font-bold text-blue-600">
              {appointment.appointmentNumber}
            </h3>
          </div>

          <StatusBadge status={appointment.status} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User size={17} className="text-blue-600" />
              Patient Information
            </div>

            <div className="flex items-center gap-3">
              <img
                src={appointment.patient.avatar}
                alt={appointment.patient.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-gray-900">
                  {appointment.patient.name}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.patient.id}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Mail size={14} />
                {appointment.patient.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} />
                {appointment.patient.phone}
              </p>
              <p>
                Age: {appointment.patient.age} years
              </p>
              <p>
                Blood Group: {appointment.patient.bloodGroup}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Stethoscope size={17} className="text-green-600" />
              Doctor Information
            </div>

            <div className="flex items-center gap-3">
              <img
                src={appointment.doctor.avatar}
                alt={appointment.doctor.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-gray-900">
                  {appointment.doctor.name}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.doctor.specialization}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>Doctor ID: {appointment.doctor.id}</p>
              <p>Department: {appointment.doctor.department}</p>
              <p>Phone: {appointment.doctor.phone}</p>
              <p>Rating: {appointment.doctor.rating}/5</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 p-4">
          <h4 className="mb-4 font-semibold text-gray-800">
            Appointment Information
          </h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="mt-1 text-sm font-medium">
                {formatDate(appointment.date)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="mt-1 text-sm font-medium">
                {appointment.time}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="mt-1 text-sm font-medium">
                {appointment.duration} minutes
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Appointment Type</p>
              <p className="mt-1 text-sm font-medium">
                {appointment.type}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="mt-1 text-sm font-medium">
                {appointment.location}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Priority</p>
              <span
                className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getPriorityColor(
                  appointment.priority,
                )}`}
              >
                {appointment.priority}
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500">Reason</p>
            <p className="mt-1 text-sm text-gray-800">
              {appointment.reason}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500">Notes</p>
            <p className="mt-1 text-sm text-gray-800">
              {appointment.notes || "No additional notes."}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 p-4">
          <h4 className="mb-3 font-semibold text-gray-800">
            Payment Information
          </h4>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Appointment Fee
            </span>
            <span className="text-lg font-bold text-gray-900">
              {currency(appointment.amount)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Payment Status
            </span>
            <PaymentBadge status={appointment.paymentStatus} />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
          <button
            onClick={() => {
              closeDetails();
              openEditModal(appointment);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Edit Appointment
          </button>

          <button
            onClick={() => {
              closeDetails();
              handlePrint();
            }}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>
    );
  };

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* HEADER */}

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Admin</span>
              <ChevronRight size={14} />
              <span className="text-blue-600">Appointments</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Appointment Management
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage patient appointments, schedules and payments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Printer size={17} />
              Print
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download size={17} />
              Export
            </button>

            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Appointment
            </button>
          </div>
        </div>

        {/* STATISTICS */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Appointments"
            value={String(stats.total)}
            description="All registered appointments"
            icon={<CalendarDays size={22} />}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
          />

          <StatCard
            title="Confirmed"
            value={String(stats.confirmed)}
            description="Appointments confirmed"
            icon={<CheckCircle size={22} />}
            iconColor="text-green-600"
            iconBg="bg-green-50"
          />

          <StatCard
            title="Pending"
            value={String(stats.pending)}
            description="Waiting for confirmation"
            icon={<Clock size={22} />}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
          />

          <StatCard
            title="Completed"
            value={String(stats.completed)}
            description="Successfully completed"
            icon={<Check size={22} />}
            iconColor="text-purple-600"
            iconBg="bg-purple-50"
          />
        </div>

        {/* REVENUE SUMMARY */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
            <div>
              <p className="text-sm text-gray-500">Collected Revenue</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {currency(stats.revenue)}
              </h3>
              <p className="mt-1 text-xs text-green-600">
                From paid appointments
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <TrendingUp size={25} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {currency(stats.unpaid)}
              </h3>
              <p className="mt-1 text-xs text-amber-600">
                From unpaid appointments
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <CircleDollarSign size={25} />
            </div>
          </div>
        </div>

        {/* QUICK STATUS FILTERS */}

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              Quick Status Filter
            </h3>

            <button
              onClick={resetFilters}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Reset all
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "Pending",
              "Scheduled",
              "Confirmed",
              "Completed",
              "Cancelled",
              "No Show",
            ].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  statusFilter === status
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {status}
                {status === "All" && (
                  <span className="ml-2 text-xs">
                    {appointments.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH AND FILTER */}

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by appointment ID, patient, doctor, email..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              onClick={() => setShowFilters((previous) => !previous)}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium ${
                showFilters
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={17} />
              Advanced Filters
              <ChevronDown
                size={16}
                className={`transition ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <FormField label="Payment Status">
                <select
                  className={inputClass}
                  value={paymentFilter}
                  onChange={(event) => {
                    setPaymentFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partial">Partial</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </FormField>

              <FormField label="Appointment Type">
                <select
                  className={inputClass}
                  value={typeFilter}
                  onChange={(event) => {
                    setTypeFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Types</option>
                  <option value="In-person">In-person</option>
                  <option value="Video Consultation">
                    Video Consultation
                  </option>
                </select>
              </FormField>

              <FormField label="Doctor">
                <select
                  className={inputClass}
                  value={doctorFilter}
                  onChange={(event) => {
                    setDoctorFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Doctors</option>

                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Priority">
                <select
                  className={inputClass}
                  value={priorityFilter}
                  onChange={(event) => {
                    setPriorityFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Priorities</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </FormField>

              <FormField label="From Date">
                <input
                  type="date"
                  className={inputClass}
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </FormField>

              <FormField label="To Date">
                <input
                  type="date"
                  className={inputClass}
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => {
                    setEndDate(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </FormField>
            </div>
          )}
        </div>

        {/* APPOINTMENT TABLE */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-200 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-gray-900">
                All Appointments
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredAppointments.length} matching appointments
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">Sort by:</label>

              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                value={sortField}
                onChange={(event) => handleSort(event.target.value)}
              >
                <option value="date">Date</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="amount">Amount</option>
                <option value="id">Appointment ID</option>
              </select>

              <button
                onClick={() =>
                  setSortDirection((previous) =>
                    previous === "asc" ? "desc" : "asc",
                  )
                }
                className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                title="Change sort direction"
              >
                <ArrowUpDown size={17} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-gray-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Appointment ID</th>
                  <th className="px-5 py-4">Patient</th>
                  <th className="px-5 py-4">Doctor</th>
                  <th className="px-5 py-4">Schedule</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedAppointments.length > 0 ? (
                  paginatedAppointments.map(renderAppointmentRow)
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState
                        title="No appointments found"
                        description="Try changing your search or filter settings."
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div className="flex flex-col justify-between gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">Rows per page</p>

              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none"
              >
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>

              <p className="text-xs text-gray-500">
                {filteredAppointments.length === 0
                  ? "0 results"
                  : `${(safePage - 1) * pageSize + 1}-${Math.min(
                      safePage * pageSize,
                      filteredAppointments.length,
                    )} of ${filteredAppointments.length}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => changePage(safePage - 1)}
                disabled={safePage === 1}
                className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(
                  Math.max(0, safePage - 3),
                  Math.min(totalPages, safePage + 2),
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
                      safePage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                onClick={() => changePage(safePage + 1)}
                disabled={safePage === totalPages}
                className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* APPOINTMENT SUMMARY */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Appointment Summary
              </h3>
              <ClipboardList size={20} className="text-blue-600" />
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  label: "Completed",
                  value: stats.completed,
                  color: "bg-purple-500",
                },
                {
                  label: "Cancelled",
                  value: stats.cancelled,
                  color: "bg-red-500",
                },
                {
                  label: "Pending",
                  value: stats.pending,
                  color: "bg-amber-500",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-800">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${
                          stats.total
                            ? (item.value / stats.total) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Appointment Types
              </h3>
              <Activity size={20} className="text-green-600" />
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  label: "In-person",
                  value: appointments.filter(
                    (item) => item.type === "In-person",
                  ).length,
                },
                {
                  label: "Video Consultation",
                  value: appointments.filter(
                    (item) => item.type === "Video Consultation",
                  ).length,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <div className="flex items-center gap-2">
                    {item.label === "In-person" ? (
                      <Building2 size={18} className="text-blue-600" />
                    ) : (
                      <Video size={18} className="text-purple-600" />
                    )}
                    <span className="text-sm text-gray-600">
                      {item.label}
                    </span>
                  </div>

                  <span className="font-bold text-gray-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Payment Summary
              </h3>
              <CreditCard size={20} className="text-amber-600" />
            </div>

            <div className="mt-5 space-y-4">
              {(["Paid", "Unpaid", "Partial", "Refunded"] as PaymentStatus[]).map(
                (status) => {
                  const count = appointments.filter(
                    (item) => item.paymentStatus === status,
                  ).length;

                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between"
                    >
                      <PaymentBadge status={status} />
                      <span className="text-sm font-semibold text-gray-800">
                        {count} appointments
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}

        <div className="flex flex-col justify-between gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm sm:flex-row sm:items-center">
          <div className="flex items-start gap-2 text-blue-800">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>
              Appointment changes on this page are currently stored in local
              component state. Connect Firebase or your API to save them
              permanently.
            </p>
          </div>

          <span className="whitespace-nowrap text-xs text-blue-600">
            Admin Panel
          </span>
        </div>
      </div>

      {/* CREATE MODAL */}

      <Modal
        open={showCreateModal}
        title="Create New Appointment"
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        width="max-w-3xl"
      >
        {renderAppointmentForm(
          handleCreateAppointment,
          "Create Appointment",
        )}
      </Modal>

      {/* EDIT MODAL */}

      <Modal
        open={showEditModal}
        title="Edit Appointment"
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        width="max-w-3xl"
      >
        {renderAppointmentForm(
          handleEditAppointment,
          "Save Changes",
        )}
      </Modal>

      {/* DETAILS MODAL */}

      <Modal
        open={showDetails}
        title="Appointment Details"
        onClose={closeDetails}
        width="max-w-3xl"
      >
        {renderDetails()}
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}

      <Modal
        open={showDeleteModal}
        title="Delete Appointment"
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedAppointment(null);
        }}
        width="max-w-md"
      >
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Trash2 size={26} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            Delete this appointment?
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-800">
              {selectedAppointment?.appointmentNumber}
            </span>
            ? This action cannot be undone.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedAppointment(null);
              }}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleDeleteAppointment}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete Appointment
            </button>
          </div>
        </div>
      </Modal>

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-xl bg-gray-900 px-5 py-4 text-sm text-white shadow-xl">
          <CheckCircle size={19} className="shrink-0 text-green-400" />
          <span>{toast}</span>

          <button
            onClick={() => setToast("")}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;