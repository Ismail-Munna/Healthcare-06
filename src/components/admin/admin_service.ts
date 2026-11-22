
import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  CreditCard,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Shield,
  Stethoscope,
  Trash2,
  User,
  UserCheck,
  UserPlus,
  Users,
  X,
  XCircle,
} from "lucide-react";

type AdminTab =
  | "overview"
  | "doctors"
  | "patients"
  | "appointments"
  | "payments"
  | "activity"
  | "settings";

type DoctorStatus = "Active" | "Inactive" | "Pending";
type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

type Doctor = {
  id: number;
  name: string;
  email: string;
  specialty: string;
  phone: string;
  experience: number;
  fee: number;
  status: DoctorStatus;
  rating: number;
  patients: number;
  joined: string;
};

type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  status: "Active" | "Inactive";
  joined: string;
};

type Appointment = {
  id: number;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  fee: number;
  status: AppointmentStatus;
  payment: "Paid" | "Unpaid" | "Refunded";
};

type ActivityItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "doctor" | "patient" | "appointment" | "payment";
};

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    email: "sarah@example.com",
    specialty: "Cardiologist",
    phone: "+8801711000001",
    experience: 12,
    fee: 1200,
    status: "Active",
    rating: 4.9,
    patients: 340,
    joined: "2026-01-12",
  },
  {
    id: 2,
    name: "Dr. Rahim Uddin",
    email: "rahim@example.com",
    specialty: "Neurologist",
    phone: "+8801711000002",
    experience: 9,
    fee: 1000,
    status: "Active",
    rating: 4.8,
    patients: 280,
    joined: "2026-02-08",
  },
  {
    id: 3,
    name: "Dr. Nusrat Jahan",
    email: "nusrat@example.com",
    specialty: "Dermatologist",
    phone: "+8801711000003",
    experience: 7,
    fee: 800,
    status: "Pending",
    rating: 4.7,
    patients: 190,
    joined: "2026-03-10",
  },
  {
    id: 4,
    name: "Dr. Tanvir Hasan",
    email: "tanvir@example.com",
    specialty: "Orthopedic",
    phone: "+8801711000004",
    experience: 15,
    fee: 1500,
    status: "Active",
    rating: 4.9,
    patients: 410,
    joined: "2026-04-15",
  },
  {
    id: 5,
    name: "Dr. Mim Akter",
    email: "mim@example.com",
    specialty: "Pediatrician",
    phone: "+8801711000005",
    experience: 6,
    fee: 700,
    status: "Inactive",
    rating: 4.6,
    patients: 120,
    joined: "2026-05-01",
  },
];

const initialPatients: Patient[] = [
  {
    id: 101,
    name: "Arif Hossain",
    email: "arif@example.com",
    phone: "+8801811000001",
    age: 27,
    gender: "Male",
    bloodGroup: "O+",
    status: "Active",
    joined: "2026-09-10",
  },
  {
    id: 102,
    name: "Nabila Islam",
    email: "nabila@example.com",
    phone: "+8801811000002",
    age: 24,
    gender: "Female",
    bloodGroup: "A+",
    status: "Active",
    joined: "2026-09-12",
  },
  {
    id: 103,
    name: "Sabbir Ahmed",
    email: "sabbir@example.com",
    phone: "+8801811000003",
    age: 32,
    gender: "Male",
    bloodGroup: "B+",
    status: "Inactive",
    joined: "2026-09-15",
  },
  {
    id: 104,
    name: "Maliha Rahman",
    email: "maliha@example.com",
    phone: "+8801811000004",
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    status: "Active",
    joined: "2026-09-18",
  },
  {
    id: 105,
    name: "Fahim Khan",
    email: "fahim@example.com",
    phone: "+8801811000005",
    age: 35,
    gender: "Male",
    bloodGroup: "O-",
    status: "Active",
    joined: "2026-09-20",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 5001,
    patient: "Arif Hossain",
    doctor: "Dr. Sarah Ahmed",
    specialty: "Cardiologist",
    date: "2026-11-22",
    time: "09:30 AM",
    fee: 1200,
    status: "Confirmed",
    payment: "Paid",
  },
  {
    id: 5002,
    patient: "Nabila Islam",
    doctor: "Dr. Rahim Uddin",
    specialty: "Neurologist",
    date: "2026-11-22",
    time: "10:30 AM",
    fee: 1000,
    status: "Pending",
    payment: "Unpaid",
  },
  {
    id: 5003,
    patient: "Sabbir Ahmed",
    doctor: "Dr. Tanvir Hasan",
    specialty: "Orthopedic",
    date: "2026-11-23",
    time: "11:00 AM",
    fee: 1500,
    status: "Completed",
    payment: "Paid",
  },
  {
    id: 5004,
    patient: "Maliha Rahman",
    doctor: "Dr. Nusrat Jahan",
    specialty: "Dermatologist",
    date: "2026-11-23",
    time: "02:00 PM",
    fee: 800,
    status: "Cancelled",
    payment: "Refunded",
  },
  {
    id: 5005,
    patient: "Fahim Khan",
    doctor: "Dr. Sarah Ahmed",
    specialty: "Cardiologist",
    date: "2026-11-24",
    time: "04:00 PM",
    fee: 1200,
    status: "Confirmed",
    payment: "Paid",
  },
];

const initialActivities: ActivityItem[] = [
  {
    id: 1,
    title: "New doctor registered",
    description: "Dr. Nusrat Jahan submitted a registration.",
    time: "10 minutes ago",
    type: "doctor",
  },
  {
    id: 2,
    title: "New patient registered",
    description: "A new patient created an account.",
    time: "25 minutes ago",
    type: "patient",
  },
  {
    id: 3,
    title: "Appointment confirmed",
    description: "Appointment #5001 was confirmed.",
    time: "1 hour ago",
    type: "appointment",
  },
  {
    id: 4,
    title: "Payment received",
    description: "Payment of ৳1,200 was received.",
    time: "2 hours ago",
    type: "payment",
  },
];

const money = (amount: number) =>
  `৳${amount.toLocaleString("en-BD")}`;

const formatDate = (date: string) =>
  new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-green-50 text-green-700",
    Inactive: "bg-gray-100 text-gray-600",
    Pending: "bg-amber-50 text-amber-700",
    Confirmed: "bg-blue-50 text-blue-700",
    Completed: "bg-green-50 text-green-700",
    Cancelled: "bg-red-50 text-red-700",
    Paid: "bg-green-50 text-green-700",
    Unpaid: "bg-amber-50 text-amber-700",
    Refunded: "bg-purple-50 text-purple-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-2xl font-bold text-slate-800">
            {value}
          </h3>
          <p className="mt-2 flex items-center gap-1 text-xs text-green-600">
            <ArrowUpRight size={14} />
            {change}
          </p>
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex min-w-[220px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
      <Search size={17} className="text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function OverviewPage({
  doctors,
  patients,
  appointments,
  activities,
}: {
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  activities: ActivityItem[];
}) {
  const revenue = appointments
    .filter((item) => item.payment === "Paid")
    .reduce((sum, item) => sum + item.fee, 0);

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  const pending = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const bars = [35, 52, 43, 68, 56, 78, 61, 88, 72, 95, 68, 82];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Doctors"
          value={doctors.length.toString()}
          change="+12% this month"
          icon={Stethoscope}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Total Patients"
          value={patients.length.toString()}
          change="+18% this month"
          icon={Users}
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Appointments"
          value={appointments.length.toString()}
          change="+8% this month"
          icon={CalendarCheck}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Total Revenue"
          value={money(revenue)}
          change="+15% this month"
          icon={CreditCard}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">
                Revenue Overview
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Monthly revenue performance
              </p>
            </div>
            <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 30 days</option>
            </select>
          </div>

          <div className="flex h-64 items-end gap-2 border-b border-slate-100 pb-2">
            {bars.map((height, index) => (
              <div
                key={index}
                className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full rounded-t-md bg-blue-500 transition hover:bg-blue-700"
                  style={{ height: `${height}%` }}
                  title={`${height}%`}
                />
                <span className="text-[10px] text-slate-400">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ][index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-slate-500">Collected revenue</p>
              <p className="mt-1 font-bold text-slate-800">
                {money(revenue)}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Completed appointments</p>
              <p className="mt-1 font-bold text-slate-800">{completed}</p>
            </div>
            <div>
              <p className="text-slate-500">Pending appointments</p>
              <p className="mt-1 font-bold text-slate-800">{pending}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-slate-800">
            Appointment Summary
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Current appointment status
          </p>

          <div className="my-7 flex justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[18px] border-blue-100">
              <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-t-blue-600 border-r-blue-600 rotate-45" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-800">
                  {appointments.length}
                </p>
                <p className="text-xs text-slate-500">Total</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Confirmed",
                color: "bg-blue-500",
                count: appointments.filter(
                  (item) => item.status === "Confirmed"
                ).length,
              },
              {
                label: "Completed",
                color: "bg-green-500",
                count: completed,
              },
              {
                label: "Pending",
                color: "bg-amber-500",
                count: pending,
              },
              {
                label: "Cancelled",
                color: "bg-red-500",
                count: appointments.filter(
                  (item) => item.status === "Cancelled"
                ).length,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2 text-slate-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  {item.label}
                </div>
                <span className="font-semibold text-slate-800">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <SectionHeading
            title="Recent Appointments"
            subtitle="Latest patient bookings"
          />
          <div className="space-y-4">
            {appointments.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-50 pb-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.patient}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.doctor}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={item.status} />
                  <p className="mt-1 text-xs text-slate-400">
                    {formatDate(item.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <SectionHeading
            title="Recent Activities"
            subtitle="Latest system events"
          />
          <div className="space-y-5">
            {activities.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  {item.type === "doctor" && <Stethoscope size={18} />}
                  {item.type === "patient" && <UserPlus size={18} />}
                  {item.type === "appointment" && <Calendar size={18} />}
                  {item.type === "payment" && <CreditCard size={18} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DoctorsPage({
  doctors,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  doctors: Doctor[];
  onAdd: () => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: DoctorStatus) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.email.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || doctor.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <SectionHeading
        title="Doctor Management"
        subtitle="Manage registered doctors and their accounts"
        action={
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={17} /> Add Doctor
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search doctor..."
        />
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Doctor</th>
                <th className="px-5 py-4">Specialty</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Consultation Fee</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                        {doctor.name
                          .split(" ")
                          .slice(1)
                          .map((word) => word[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {doctor.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {doctor.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {doctor.specialty}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {doctor.experience} years
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    {money(doctor.fee)}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={doctor.status}
                      onChange={(event) =>
                        onStatusChange(
                          doctor.id,
                          event.target.value as DoctorStatus
                        )
                      }
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Pending</option>
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(doctor)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        title="Edit doctor"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(doctor.id)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        title="Delete doctor"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PatientsPage({
  patients,
  onDelete,
  onStatusChange,
}: {
  patients: Patient[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Patient["status"]) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = patients.filter((patient) => {
    const text = `${patient.name} ${patient.email} ${patient.phone}`;
    return (
      text.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || patient.status === filter)
    );
  });

  return (
    <div>
      <SectionHeading
        title="Patient Management"
        subtitle="View and manage registered patients"
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search patient..."
        />
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Age / Gender</th>
                <th className="px-5 py-4">Blood Group</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {patient.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {patient.email}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {patient.phone}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                      {patient.bloodGroup}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {formatDate(patient.joined)}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={patient.status}
                      onChange={(event) =>
                        onStatusChange(
                          patient.id,
                          event.target.value as Patient["status"]
                        )
                      }
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => onDelete(patient.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AppointmentsPage({
  appointments,
  onStatusChange,
  onDelete,
}: {
  appointments: Appointment[];
  onStatusChange: (id: number, status: AppointmentStatus) => void;
  onDelete: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = appointments.filter((appointment) => {
    const text = `${appointment.patient} ${appointment.doctor} ${appointment.id}`;
    return (
      text.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || appointment.status === filter)
    );
  });

  return (
    <div>
      <SectionHeading
        title="Appointment Management"
        subtitle="Track and manage all patient appointments"
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search appointment..."
        />
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm"
        >
          <option>All</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Booking ID</th>
                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Doctor</th>
                <th className="px-5 py-4">Date / Time</th>
                <th className="px-5 py-4">Fee</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold text-blue-600">
                    #{appointment.id}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {appointment.patient}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-800">
                      {appointment.doctor}
                    </p>
                    <p className="text-xs text-slate-500">
                      {appointment.specialty}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700">
                      {formatDate(appointment.date)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {appointment.time}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold">
                    {money(appointment.fee)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={appointment.payment} />
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={appointment.status}
                      onChange={(event) =>
                        onStatusChange(
                          appointment.id,
                          event.target.value as AppointmentStatus
                        )
                      }
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                    >
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => onDelete(appointment.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PaymentsPage({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const paidAppointments = appointments.filter(
    (item) => item.payment === "Paid"
  );

  const total = paidAppointments.reduce(
    (sum, item) => sum + item.fee,
    0
  );

  const refunded = appointments
    .filter((item) => item.payment === "Refunded")
    .reduce((sum, item) => sum + item.fee, 0);

  return (
    <div>
      <SectionHeading
        title="Payments & Revenue"
        subtitle="Monitor payments and consultation revenue"
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Collected"
          value={money(total)}
          change="Paid appointments"
          icon={CreditCard}
          color="bg-green-50 text-green-600"
        />
        <StatCard
          title="Transactions"
          value={paidAppointments.length.toString()}
          change="Successful payments"
          icon={CheckCircle}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Refunded"
          value={money(refunded)}
          change="Refund records"
          icon={ArrowDownRight}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-bold text-slate-800">
            Payment Transactions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Transaction</th>
                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Appointment</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    TXN-{item.id}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium">
                    {item.patient}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    #{item.id}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold">
                    {money(item.fee)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={item.payment} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ActivityPage({ activities }: { activities: ActivityItem[] }) {
  return (
    <div>
      <SectionHeading
        title="Activity Logs"
        subtitle="Review recent admin and system activities"
      />

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="space-y-6">
          {activities.map((item, index) => (
            <div key={item.id} className="relative flex gap-4">
              {index !== activities.length - 1 && (
                <div className="absolute bottom-[-24px] left-5 top-12 w-px bg-slate-100" />
              )}
              <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {item.type === "doctor" && <Stethoscope size={18} />}
                {item.type === "patient" && <UserPlus size={18} />}
                {item.type === "appointment" && <Calendar size={18} />}
                {item.type === "payment" && <CreditCard size={18} />}
              </div>
              <div className="flex-1 border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {item.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [name, setName] = useState("System Administrator");
  const [email, setEmail] = useState("admin@healthcare.com");
  const [phone, setPhone] = useState("+8801700000000");
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveSettings = (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl">
      <SectionHeading
        title="Admin Settings"
        subtitle="Manage administrator profile and system preferences"
      />

      <form onSubmit={saveSettings} className="space-y-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">
                Administrator Profile
              </h3>
              <p className="text-xs text-slate-500">
                Update your account information
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Full Name"
              value={name}
              onChange={setName}
              required
            />
            <FormField
              label="Email Address"
              value={email}
              onChange={setEmail}
              type="email"
              required
            />
            <FormField
              label="Phone Number"
              value={phone}
              onChange={setPhone}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="mb-5 font-bold text-slate-800">
            Notification Preferences
          </h3>

          {[
            {
              label: "Push notifications",
              description: "Receive important system notifications",
              value: notifications,
              change: setNotifications,
            },
            {
              label: "Email alerts",
              description: "Receive updates through email",
              value: emailAlerts,
              change: setEmailAlerts,
            },
            {
              label: "Maintenance mode",
              description: "Display maintenance status on the platform",
              value: maintenance,
              change: setMaintenance,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => item.change(!item.value)}
                className={`relative h-6 w-11 rounded-full transition ${
                  item.value ? "bg-blue-600" : "bg-slate-300"
                }`}
                aria-label={`Toggle ${item.label}`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    item.value ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          {saved && (
            <p className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle size={17} /> Settings saved locally.
            </p>
          )}
          <button
            type="submit"
            className="ml-auto rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

function DoctorForm({
  doctor,
  onSubmit,
  onClose,
}: {
  doctor: Doctor | null;
  onSubmit: (data: Omit<Doctor, "id" | "rating" | "patients" | "joined">) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(doctor?.name || "");
  const [email, setEmail] = useState(doctor?.email || "");
  const [specialty, setSpecialty] = useState(
    doctor?.specialty || "Cardiologist"
  );
  const [phone, setPhone] = useState(doctor?.phone || "");
  const [experience, setExperience] = useState(
    String(doctor?.experience || 1)
  );
  const [fee, setFee] = useState(String(doctor?.fee || 500));
  const [status, setStatus] = useState<DoctorStatus>(
    doctor?.status || "Pending"
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      name,
      email,
      specialty,
      phone,
      experience: Number(experience),
      fee: Number(fee),
      status,
    });
  };

  return (
    <Modal
      title={doctor ? "Edit Doctor" : "Add New Doctor"}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-4">
        <FormField
          label="Doctor Name"
          value={name}
          onChange={setName}
          placeholder="Enter doctor name"
          required
        />
        <FormField
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="doctor@example.com"
          required
        />
        <FormField
          label="Phone"
          value={phone}
          onChange={setPhone}
          placeholder="+8801XXXXXXXXX"
          required
        />

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Specialty
          </span>
          <select
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
          >
            <option>Cardiologist</option>
            <option>Neurologist</option>
            <option>Dermatologist</option>
            <option>Orthopedic</option>
            <option>Pediatrician</option>
            <option>General Physician</option>
            <option>Gynecologist</option>
            <option>Psychiatrist</option>
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Experience (years)"
            value={experience}
            onChange={setExperience}
            type="number"
            required
          />
          <FormField
            label="Consultation Fee"
            value={fee}
            onChange={setFee}
            type="number"
            required
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Account Status
          </span>
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as DoctorStatus)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </label>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {doctor ? "Update Doctor" : "Create Doctor"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle size={27} />
        </div>
        <p className="text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

const navigation = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "doctors",
    label: "Doctors",
    icon: Stethoscope,
  },
  {
    id: "patients",
    label: "Patients",
    icon: Users,
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: CalendarCheck,
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    id: "activity",
    label: "Activity Logs",
    icon: ClipboardList,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
] as const;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [doctors, setDoctors] = useState(initialDoctors);
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activities, setActivities] = useState(initialActivities);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "doctor" | "patient" | "appointment";
    id: number;
  } | null>(null);

  const [toast, setToast] = useState("");

  const activeDoctors = useMemo(
    () => doctors.filter((doctor) => doctor.status === "Active").length,
    [doctors]
  );

  const activePatients = useMemo(
    () => patients.filter((patient) => patient.status === "Active").length,
    [patients]
  );

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const addActivity = (
    title: string,
    description: string,
    type: ActivityItem["type"]
  ) => {
    setActivities((previous) => [
      {
        id: Date.now(),
        title,
        description,
        time: "Just now",
        type,
      },
      ...previous,
    ]);
  };

  const saveDoctor = (
    data: Omit<Doctor, "id" | "rating" | "patients" | "joined">
  ) => {
    if (editingDoctor) {
      setDoctors((previous) =>
        previous.map((doctor) =>
          doctor.id === editingDoctor.id
            ? { ...doctor, ...data }
            : doctor
        )
      );
      addActivity(
        "Doctor information updated",
        `${data.name}'s profile was updated.`,
        "doctor"
      );
      showToast("Doctor updated successfully.");
    } else {
      const newDoctor: Doctor = {
        ...data,
        id: Date.now(),
        rating: 0,
        patients: 0,
        joined: new Date().toISOString().slice(0, 10),
      };
      setDoctors((previous) => [newDoctor, ...previous]);
      addActivity(
        "New doctor added",
        `${data.name} was added by admin.`,
        "doctor"
      );
      showToast("New doctor added successfully.");
    }

    setDoctorModalOpen(false);
    setEditingDoctor(null);
  };

  const changeDoctorStatus = (id: number, status: DoctorStatus) => {
    setDoctors((previous) =>
      previous.map((doctor) =>
        doctor.id === id ? { ...doctor, status } : doctor
      )
    );
    showToast("Doctor status updated.");
  };

  const changePatientStatus = (
    id: number,
    status: Patient["status"]
  ) => {
    setPatients((previous) =>
      previous.map((patient) =>
        patient.id === id ? { ...patient, status } : patient
      )
    );
    showToast("Patient status updated.");
  };

  const changeAppointmentStatus = (
    id: number,
    status: AppointmentStatus
  ) => {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );
    addActivity(
      "Appointment status updated",
      `Appointment #${id} changed to ${status}.`,
      "appointment"
    );
    showToast("Appointment status updated.");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    const { type, id } = deleteTarget;

    if (type === "doctor") {
      setDoctors((previous) =>
        previous.filter((doctor) => doctor.id !== id)
      );
      showToast("Doctor deleted.");
    }

    if (type === "patient") {
      setPatients((previous) =>
        previous.filter((patient) => patient.id !== id)
      );
      showToast("Patient deleted.");
    }

    if (type === "appointment") {
      setAppointments((previous) =>
        previous.filter((appointment) => appointment.id !== id)
      );
      showToast("Appointment deleted.");
    }

    setDeleteTarget(null);
  };

  const exportAppointments = () => {
    const headers = [
      "ID",
      "Patient",
      "Doctor",
      "Date",
      "Time",
      "Fee",
      "Status",
      "Payment",
    ];

    const rows = appointments.map((item) => [
      item.id,
      item.patient,
      item.doctor,
      item.date,
      item.time,
      item.fee,
      item.status,
      item.payment,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "healthcare-appointments.csv";
    link.click();

    URL.revokeObjectURL(url);
    showToast("Appointment report exported.");
  };

  const pageTitle =
    navigation.find((item) => item.id === activeTab)?.label || "Overview";

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewPage
            doctors={doctors}
            patients={patients}
            appointments={appointments}
            activities={activities}
          />
        );

      case "doctors":
        return (
          <DoctorsPage
            doctors={doctors}
            onAdd={() => {
              setEditingDoctor(null);
              setDoctorModalOpen(true);
            }}
            onEdit={(doctor) => {
              setEditingDoctor(doctor);
              setDoctorModalOpen(true);
            }}
            onDelete={(id) =>
              setDeleteTarget({ type: "doctor", id })
            }
            onStatusChange={changeDoctorStatus}
          />
        );

      case "patients":
        return (
          <PatientsPage
            patients={patients}
            onDelete={(id) =>
              setDeleteTarget({ type: "patient", id })
            }
            onStatusChange={changePatientStatus}
          />
        );

      case "appointments":
        return (
          <AppointmentsPage
            appointments={appointments}
            onStatusChange={changeAppointmentStatus}
            onDelete={(id) =>
              setDeleteTarget({ type: "appointment", id })
            }
          />
        );

      case "payments":
        return <PaymentsPage appointments={appointments} />;

      case "activity":
        return <ActivityPage activities={activities} />;

      case "settings":
        return <SettingsPage />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white shadow-sm transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Heart size={22} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-800">
              MediCare
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-600">
              Admin Portal
            </p>
          </div>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const selected = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    selected
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                  {item.id === "appointments" && (
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${
                        selected
                          ? "bg-white/20 text-white"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {appointments.filter(
                        (item) => item.status === "Pending"
                      ).length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              SA
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">
                System Admin
              </p>
              <p className="truncate text-xs text-slate-500">
                Super Administrator
              </p>
            </div>
          </div>

          <button
            onClick={() => showToast("Connect your logout action here.")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {pageTitle}
              </h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Healthcare Management System / {pageTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={exportAppointments}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 md:flex"
            >
              <Download size={16} />
              Export
            </button>

            <button
              onClick={() => setActiveTab("activity")}
              className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
              title="View activity logs"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <button
              onClick={() => setActiveTab("settings")}
              className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                SA
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold text-slate-800">
                  Admin
                </p>
                <p className="text-[10px] text-slate-500">
                  Administrator
                </p>
              </div>
              <ChevronDown
                size={15}
                className="hidden text-slate-400 sm:block"
              />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">
                Welcome back, Admin
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-800">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
              <Calendar size={15} />
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          {renderContent()}

          <footer className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
            © 2026 MediCare Admin Dashboard. All rights reserved.
          </footer>
        </main>
      </div>

      {doctorModalOpen && (
        <DoctorForm
          doctor={editingDoctor}
          onSubmit={saveDoctor}
          onClose={() => {
            setDoctorModalOpen(false);
            setEditingDoctor(null);
          }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Confirm Delete"
          message="Are you sure you want to delete this record? This action cannot be undone."
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-sm text-white shadow-xl">
          <CheckCircle size={18} className="text-green-400" />
          {toast}
          <button onClick={() => setToast("")}>
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
