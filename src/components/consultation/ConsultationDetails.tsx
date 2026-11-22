
import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  AlertCircle,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Edit,
  Eye,
  File,
  FileCheck,
  FileText,
  Heart,
  History,
  Info,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Pill,
  Plus,
  Printer,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Stethoscope,
  Trash2,
  User,
  UserRound,
  Video,
  X,
  ClipboardList,
  Microscope,
  Thermometer,
  Droplets,
  Weight,
  Ruler,
  CreditCard,
  Receipt,
  RefreshCw,
  Bell,
  ExternalLink,
  Star,
  ChevronLeft,
  Upload,
  Save,
  FilePlus,
  CheckSquare,
  Square,
  CalendarCheck,
  CircleHelp,
  Copy,
  PhoneCall,
  Mail,
  Building2,
  DownloadCloud,
} from "lucide-react";

// =====================================================
// TYPES
// =====================================================

type AppointmentStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled"
  | "In Progress";

type ConsultationMode = "Video" | "Audio" | "In Person";

type MedicineStatus = "Active" | "Completed" | "Stopped";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  hospital: string;
  image: string;
  phone: string;
  email: string;
  verified: boolean;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  phone: string;
  email: string;
  address: string;
  image: string;
  allergies: string[];
}

interface Appointment {
  id: string;
  doctor: Doctor;
  patient: Patient;
  date: string;
  time: string;
  duration: number;
  mode: ConsultationMode;
  status: AppointmentStatus;
  reason: string;
  fee: number;
  paymentStatus: "Paid" | "Pending" | "Refunded";
}

interface Diagnosis {
  id: number;
  name: string;
  description: string;
  date: string;
  doctor: string;
  severity: "Low" | "Medium" | "High";
}

interface Medicine {
  id: number;
  name: string;
  strength: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  status: MedicineStatus;
  startDate: string;
  endDate: string;
}

interface LabReport {
  id: number;
  name: string;
  category: string;
  date: string;
  status: "Available" | "Pending";
  result: string;
  normalRange: string;
  doctor: string;
}

interface Vital {
  id: number;
  label: string;
  value: string;
  unit: string;
  date: string;
  icon: React.ReactNode;
  color: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

interface TabButtonProps {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}

// =====================================================
// MOCK DATA
// =====================================================

const doctor: Doctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  qualification: "MBBS, MD Cardiology",
  experience: 12,
  rating: 4.9,
  hospital: "City Medical Center",
  image: "https://i.pravatar.cc/150?img=47",
  phone: "+880 1700-000001",
  email: "doctor@example.com",
  verified: true,
};

const patient: Patient = {
  id: 100,
  name: "Badhon Mojumder",
  age: 22,
  gender: "Male",
  bloodGroup: "O+",
  height: "172 cm",
  weight: "65 kg",
  phone: "+880 1700-000000",
  email: "patient@example.com",
  address: "Khulna, Bangladesh",
  image: "https://i.pravatar.cc/150?img=11",
  allergies: ["No known drug allergies"],
};

const appointment: Appointment = {
  id: "HC-2026-00125",
  doctor,
  patient,
  date: "2026-11-24",
  time: "10:30 AM",
  duration: 30,
  mode: "Video",
  status: "Completed",
  reason: "Regular heart health checkup",
  fee: 1200,
  paymentStatus: "Paid",
};

const initialDiagnoses: Diagnosis[] = [
  {
    id: 1,
    name: "General health assessment",
    description: "Routine health assessment and consultation.",
    date: "2026-11-18",
    doctor: "Dr. James Anderson",
    severity: "Low",
  },
  {
    id: 2,
    name: "Headache evaluation",
    description: "Patient reported recurring headaches.",
    date: "2026-11-12",
    doctor: "Dr. Michael Chen",
    severity: "Medium",
  },
];

const initialMedicines: Medicine[] = [
  {
    id: 1,
    name: "Paracetamol",
    strength: "500 mg",
    dosage: "1 tablet",
    frequency: "Twice daily",
    duration: "5 days",
    instructions: "Take after meals",
    status: "Active",
    startDate: "2026-11-20",
    endDate: "2026-11-25",
  },
  {
    id: 2,
    name: "Vitamin D3",
    strength: "1000 IU",
    dosage: "1 capsule",
    frequency: "Once daily",
    duration: "30 days",
    instructions: "Take with breakfast",
    status: "Active",
    startDate: "2026-11-20",
    endDate: "2026-12-20",
  },
  {
    id: 3,
    name: "Antacid",
    strength: "10 mg",
    dosage: "1 tablet",
    frequency: "Once daily",
    duration: "7 days",
    instructions: "Take as prescribed",
    status: "Completed",
    startDate: "2026-11-01",
    endDate: "2026-11-08",
  },
];

const initialReports: LabReport[] = [
  {
    id: 1,
    name: "Complete Blood Count",
    category: "Blood Test",
    date: "2026-11-18",
    status: "Available",
    result: "Within expected range",
    normalRange: "Lab-specific reference range",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    name: "Blood Glucose",
    category: "Blood Test",
    date: "2026-11-18",
    status: "Available",
    result: "See attached report",
    normalRange: "Lab-specific reference range",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 3,
    name: "Lipid Profile",
    category: "Cardiology",
    date: "2026-11-24",
    status: "Pending",
    result: "Awaiting laboratory report",
    normalRange: "Not available",
    doctor: "Dr. Sarah Johnson",
  },
];

const initialVitals: Vital[] = [
  {
    id: 1,
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    date: "Nov 24, 2026",
    icon: <Activity size={20} />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    date: "Nov 24, 2026",
    icon: <Heart size={20} />,
    color: "bg-red-50 text-red-600",
  },
  {
    id: 3,
    label: "Temperature",
    value: "36.8",
    unit: "°C",
    date: "Nov 24, 2026",
    icon: <Thermometer size={20} />,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: 4,
    label: "Oxygen Saturation",
    value: "98",
    unit: "%",
    date: "Nov 24, 2026",
    icon: <Droplets size={20} />,
    color: "bg-cyan-50 text-cyan-600",
  },
];

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Consultation summary",
    content:
      "Patient attended a routine consultation. Review symptoms and relevant medical history before making any treatment decisions.",
    date: "2026-11-24",
    author: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    title: "Follow-up reminder",
    content:
      "Follow up with the treating doctor as scheduled. Bring previous reports and current medication information.",
    date: "2026-11-24",
    author: "Clinical team",
  },
];

const timeline: TimelineItem[] = [
  {
    id: 1,
    title: "Appointment booked",
    description: "Your consultation was scheduled.",
    date: "Nov 20, 2026 · 09:15 AM",
    completed: true,
  },
  {
    id: 2,
    title: "Payment completed",
    description: "Consultation fee payment confirmed.",
    date: "Nov 20, 2026 · 09:18 AM",
    completed: true,
  },
  {
    id: 3,
    title: "Consultation started",
    description: "Doctor started the consultation session.",
    date: "Nov 24, 2026 · 10:30 AM",
    completed: true,
  },
  {
    id: 4,
    title: "Consultation completed",
    description: "Session marked as completed.",
    date: "Nov 24, 2026 · 11:00 AM",
    completed: true,
  },
  {
    id: 5,
    title: "Follow-up",
    description: "Schedule your next appointment if advised.",
    date: "To be scheduled",
    completed: false,
  },
];

// =====================================================
// HELPERS
// =====================================================

const formatDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatCurrency = (amount: number) => {
  return `৳${amount.toLocaleString("en-BD")}`;
};

const severityColor = (severity: Diagnosis["severity"]) => {
  if (severity === "High") {
    return "bg-red-50 text-red-700";
  }

  if (severity === "Medium") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-green-50 text-green-700";
};

const medicineStatusColor = (status: MedicineStatus) => {
  if (status === "Active") {
    return "bg-green-50 text-green-700";
  }

  if (status === "Completed") {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-gray-100 text-gray-600";
};

// =====================================================
// TAB BUTTON
// =====================================================

const TabButton: React.FC<TabButtonProps> = ({
  active,
  children,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
      active
        ? "border-blue-600 text-blue-700"
        : "border-transparent text-gray-500 hover:text-gray-800"
    }`}
  >
    {children}
  </button>
);

// =====================================================
// SECTION CARD
// =====================================================

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  action,
}) => (
  <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
            {icon}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>

      {action}
    </div>

    {children}
  </section>
);

// =====================================================
// INFORMATION ROW
// =====================================================

const InfoRow: React.FC<{
  label: string;
  value: React.ReactNode;
}> = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-3 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-right text-sm font-medium text-gray-900">
      {value}
    </span>
  </div>
);

// =====================================================
// PATIENT PROFILE
// =====================================================

const PatientProfile: React.FC<{
  patient: Patient;
}> = ({ patient }) => {
  return (
    <SectionCard
      title="Patient information"
      subtitle="Personal and contact details"
      icon={<UserRound size={20} />}
    >
      <div className="flex flex-wrap items-center gap-4">
        <img
          src={patient.image}
          alt={patient.name}
          className="h-16 w-16 rounded-2xl object-cover"
        />

        <div>
          <h4 className="font-semibold text-gray-900">
            {patient.name}
          </h4>
          <p className="mt-1 text-sm text-gray-500">
            Patient ID: #{patient.id}
          </p>
          <span className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Verified demo profile
          </span>
        </div>
      </div>

      <div className="mt-5">
        <InfoRow label="Age" value={`${patient.age} years`} />
        <InfoRow label="Gender" value={patient.gender} />
        <InfoRow label="Blood group" value={patient.bloodGroup} />
        <InfoRow label="Height" value={patient.height} />
        <InfoRow label="Weight" value={patient.weight} />
        <InfoRow label="Phone" value={patient.phone} />
        <InfoRow label="Email" value={patient.email} />
        <InfoRow label="Address" value={patient.address} />
      </div>

      <div className="mt-5 rounded-xl bg-amber-50 p-4">
        <div className="flex items-center gap-2 text-amber-800">
          <AlertCircle size={17} />
          <span className="text-sm font-semibold">
            Allergy information
          </span>
        </div>

        {patient.allergies.map((allergy, index) => (
          <p
            key={index}
            className="mt-2 text-sm text-amber-700"
          >
            {allergy}
          </p>
        ))}
      </div>
    </SectionCard>
  );
};

// =====================================================
// DOCTOR PROFILE
// =====================================================

const DoctorProfile: React.FC<{
  doctor: Doctor;
}> = ({ doctor }) => {
  return (
    <SectionCard
      title="Consulting doctor"
      subtitle="Doctor profile and professional details"
      icon={<Stethoscope size={20} />}
    >
      <div className="flex items-center gap-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-16 w-16 rounded-2xl object-cover"
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-semibold text-gray-900">
              {doctor.name}
            </h4>

            {doctor.verified && (
              <ShieldCheck size={16} className="text-blue-600" />
            )}
          </div>

          <p className="mt-1 text-sm text-blue-600">
            {doctor.specialty}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-amber-500">
            <Star size={13} fill="currentColor" />
            {doctor.rating}
            <span className="ml-1 text-gray-400">Rating</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <InfoRow label="Qualification" value={doctor.qualification} />
        <InfoRow
          label="Experience"
          value={`${doctor.experience} years`}
        />
        <InfoRow label="Hospital" value={doctor.hospital} />
        <InfoRow label="Phone" value={doctor.phone} />
        <InfoRow label="Email" value={doctor.email} />
      </div>

      <div className="mt-4 flex gap-2">
        <a
          href={`tel:${doctor.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Phone size={16} />
          Call
        </a>

        <a
          href={`mailto:${doctor.email}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Mail size={16} />
          Email
        </a>
      </div>
    </SectionCard>
  );
};

// =====================================================
// APPOINTMENT SUMMARY
// =====================================================

const AppointmentSummary: React.FC<{
  appointment: Appointment;
}> = ({ appointment }) => {
  return (
    <SectionCard
      title="Appointment summary"
      subtitle={`Reference: ${appointment.id}`}
      icon={<CalendarDays size={20} />}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-blue-50 p-4">
          <Calendar className="text-blue-600" size={19} />
          <p className="mt-3 text-xs text-blue-500">Appointment date</p>
          <p className="mt-1 font-semibold text-blue-900">
            {formatDate(appointment.date)}
          </p>
        </div>

        <div className="rounded-xl bg-purple-50 p-4">
          <Clock className="text-purple-600" size={19} />
          <p className="mt-3 text-xs text-purple-500">Appointment time</p>
          <p className="mt-1 font-semibold text-purple-900">
            {appointment.time}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <InfoRow
          label="Duration"
          value={`${appointment.duration} minutes`}
        />
        <InfoRow label="Consultation mode" value={appointment.mode} />
        <InfoRow label="Reason" value={appointment.reason} />
        <InfoRow
          label="Appointment status"
          value={
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">
              {appointment.status}
            </span>
          }
        />
        <InfoRow
          label="Consultation fee"
          value={formatCurrency(appointment.fee)}
        />
        <InfoRow
          label="Payment status"
          value={appointment.paymentStatus}
        />
      </div>
    </SectionCard>
  );
};

// =====================================================
// VITAL CARD
// =====================================================

const VitalCard: React.FC<{
  vital: Vital;
}> = ({ vital }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-4">
    <div className="flex items-center justify-between">
      <div className={`rounded-xl p-2.5 ${vital.color}`}>
        {vital.icon}
      </div>

      <span className="text-[10px] text-gray-400">
        {vital.date}
      </span>
    </div>

    <p className="mt-4 text-sm text-gray-500">{vital.label}</p>

    <div className="mt-1 flex items-baseline gap-1">
      <span className="text-2xl font-bold text-gray-900">
        {vital.value}
      </span>
      <span className="text-xs text-gray-400">{vital.unit}</span>
    </div>
  </div>
);

// =====================================================
// VITALS SECTION
// =====================================================

const VitalsSection: React.FC<{
  vitals: Vital[];
}> = ({ vitals }) => (
  <SectionCard
    title="Patient vitals"
    subtitle="Sample observations recorded for this consultation"
    icon={<Activity size={20} />}
  >
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {vitals.map((vital) => (
        <VitalCard key={vital.id} vital={vital} />
      ))}
    </div>

    <p className="mt-4 text-xs text-gray-400">
      Demo values only. Confirm actual measurements with a healthcare professional.
    </p>
  </SectionCard>
);

// =====================================================
// DIAGNOSIS CARD
// =====================================================

const DiagnosisCard: React.FC<{
  diagnosis: Diagnosis;
}> = ({ diagnosis }) => (
  <div className="rounded-xl border border-gray-100 p-4 transition hover:border-blue-200">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h4 className="font-semibold text-gray-900">
          {diagnosis.name}
        </h4>
        <p className="mt-1 text-xs text-gray-400">
          {formatDate(diagnosis.date)}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${severityColor(
          diagnosis.severity
        )}`}
      >
        {diagnosis.severity}
      </span>
    </div>

    <p className="mt-3 text-sm leading-6 text-gray-600">
      {diagnosis.description}
    </p>

    <p className="mt-3 text-xs text-gray-400">
      Recorded by {diagnosis.doctor}
    </p>
  </div>
);

// =====================================================
// DIAGNOSIS SECTION
// =====================================================

const DiagnosisSection: React.FC<{
  diagnoses: Diagnosis[];
  onAdd: () => void;
}> = ({ diagnoses, onAdd }) => (
  <SectionCard
    title="Diagnosis history"
    subtitle="Previous recorded assessments"
    icon={<ClipboardList size={20} />}
    action={
      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
      >
        <Plus size={15} />
        Add diagnosis
      </button>
    }
  >
    <div className="space-y-3">
      {diagnoses.length ? (
        diagnoses.map((diagnosis) => (
          <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} />
        ))
      ) : (
        <p className="py-8 text-center text-sm text-gray-400">
          No diagnosis records found.
        </p>
      )}
    </div>
  </SectionCard>
);

// =====================================================
// MEDICINE CARD
// =====================================================

const MedicineCard: React.FC<{
  medicine: Medicine;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}> = ({ medicine, onToggle, onDelete }) => (
  <div className="rounded-xl border border-gray-100 p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
          <Pill size={20} />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">
            {medicine.name}
          </h4>
          <p className="text-xs text-gray-500">
            {medicine.strength}
          </p>
        </div>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${medicineStatusColor(
          medicine.status
        )}`}
      >
        {medicine.status}
      </span>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-3">
      <InfoMini label="Dosage" value={medicine.dosage} />
      <InfoMini label="Frequency" value={medicine.frequency} />
      <InfoMini label="Duration" value={medicine.duration} />
      <InfoMini label="Instructions" value={medicine.instructions} />
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
      <p className="text-xs text-gray-400">
        {medicine.startDate} — {medicine.endDate}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(medicine.id)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          {medicine.status === "Active"
            ? "Mark completed"
            : "Reactivate"}
        </button>

        <button
          onClick={() => onDelete(medicine.id)}
          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
          aria-label="Delete medicine"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  </div>
);

// =====================================================
// MINI INFO
// =====================================================

const InfoMini: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="mt-1 text-sm font-medium text-gray-800">
      {value}
    </p>
  </div>
);

// =====================================================
// MEDICINE SECTION
// =====================================================

const MedicineSection: React.FC<{
  medicines: Medicine[];
  onAdd: () => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}> = ({ medicines, onAdd, onToggle, onDelete }) => (
  <SectionCard
    title="Medication records"
    subtitle="Medicines recorded in this demo profile"
    icon={<Pill size={20} />}
    action={
      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
      >
        <Plus size={15} />
        Add medicine
      </button>
    }
  >
    <div className="space-y-3">
      {medicines.length ? (
        medicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="py-8 text-center text-sm text-gray-400">
          No medicines recorded.
        </p>
      )}
    </div>
  </SectionCard>
);

// =====================================================
// LAB REPORT CARD
// =====================================================

const LabReportCard: React.FC<{
  report: LabReport;
}> = ({ report }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 p-4">
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-cyan-50 p-3 text-cyan-600">
        <Microscope size={20} />
      </div>

      <div>
        <h4 className="font-semibold text-gray-900">
          {report.name}
        </h4>
        <p className="mt-1 text-xs text-gray-400">
          {report.category} · {formatDate(report.date)}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {report.result}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          report.status === "Available"
            ? "bg-green-50 text-green-700"
            : "bg-amber-50 text-amber-700"
        }`}
      >
        {report.status}
      </span>

      <button
        disabled={report.status !== "Available"}
        className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        title="Preview report"
      >
        <Eye size={16} />
      </button>
    </div>
  </div>
);

// =====================================================
// LAB REPORT SECTION
// =====================================================

const LabReportsSection: React.FC<{
  reports: LabReport[];
}> = ({ reports }) => {
  const [query, setQuery] = useState("");

  const filtered = reports.filter((report) =>
    report.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SectionCard
      title="Laboratory reports"
      subtitle="Available and pending test records"
      icon={<FileCheck size={20} />}
    >
      <div className="relative mb-4">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search laboratory reports..."
          className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-3">
        {filtered.length ? (
          filtered.map((report) => (
            <LabReportCard key={report.id} report={report} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-gray-400">
            No matching reports found.
          </p>
        )}
      </div>
    </SectionCard>
  );
};

// =====================================================
// TIMELINE
// =====================================================

const TimelineSection: React.FC<{
  items: TimelineItem[];
}> = ({ items }) => (
  <SectionCard
    title="Consultation timeline"
    subtitle="Activity history for this appointment"
    icon={<History size={20} />}
  >
    <div className="relative space-y-6 pl-2">
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-4">
          {index !== items.length - 1 && (
            <div className="absolute left-[13px] top-8 h-full w-px bg-gray-200" />
          )}

          <div
            className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              item.completed
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {item.completed ? (
              <Check size={15} />
            ) : (
              <Clock size={15} />
            )}
          </div>

          <div className="pb-2">
            <h4 className="text-sm font-semibold text-gray-900">
              {item.title}
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              {item.description}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {item.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  </SectionCard>
);

// =====================================================
// NOTE CARD
// =====================================================

const NoteCard: React.FC<{
  note: Note;
  onDelete: (id: number) => void;
}> = ({ note, onDelete }) => (
  <div className="rounded-xl border border-gray-100 p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
          <FileText size={17} />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">
            {note.title}
          </h4>
          <p className="text-xs text-gray-400">
            {formatDate(note.date)}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(note.id)}
        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
      >
        <Trash2 size={15} />
      </button>
    </div>

    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
      {note.content}
    </p>

    <p className="mt-3 text-xs text-gray-400">
      Added by {note.author}
    </p>
  </div>
);

// =====================================================
// NOTES SECTION
// =====================================================

const NotesSection: React.FC<{
  notes: Note[];
  onAdd: () => void;
  onDelete: (id: number) => void;
}> = ({ notes, onAdd, onDelete }) => (
  <SectionCard
    title="Consultation notes"
    subtitle="Notes and clinical observations"
    icon={<FileText size={20} />}
    action={
      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
      >
        <Plus size={15} />
        Add note
      </button>
    }
  >
    <div className="space-y-3">
      {notes.length ? (
        notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={onDelete} />
        ))
      ) : (
        <p className="py-8 text-center text-sm text-gray-400">
          No notes have been added.
        </p>
      )}
    </div>
  </SectionCard>
);

// =====================================================
// ADD RECORD MODAL
// =====================================================

const AddRecordModal: React.FC<{
  type: "medicine" | "diagnosis" | "note";
  onClose: () => void;
  onSave: (value: string, description: string) => void;
}> = ({ type, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const titles = {
    medicine: "Add medicine",
    diagnosis: "Add diagnosis",
    note: "Add consultation note",
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !description.trim()) return;

    onSave(name.trim(), description.trim());
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {titles[type]}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        <label className="mt-5 block text-sm font-medium text-gray-700">
          {type === "medicine"
            ? "Medicine name"
            : type === "diagnosis"
              ? "Diagnosis name"
              : "Note title"}
        </label>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          placeholder="Enter title..."
        />

        <label className="mt-4 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          placeholder="Enter details..."
        />

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save record
          </button>
        </div>
      </form>
    </div>
  );
};

// =====================================================
// PAYMENT SECTION
// =====================================================

const PaymentSection: React.FC<{
  appointment: Appointment;
}> = ({ appointment }) => (
  <SectionCard
    title="Payment information"
    subtitle="Consultation billing details"
    icon={<CreditCard size={20} />}
  >
    <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 p-5 text-white">
      <div className="flex items-center justify-between">
        <span className="text-sm text-blue-100">
          Total consultation fee
        </span>
        <Receipt size={22} />
      </div>

      <h3 className="mt-3 text-3xl font-bold">
        {formatCurrency(appointment.fee)}
      </h3>

      <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
        <span className="text-sm text-blue-100">
          Payment status
        </span>

        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
          {appointment.paymentStatus}
        </span>
      </div>
    </div>

    <div className="mt-4">
      <InfoRow label="Reference ID" value={appointment.id} />
      <InfoRow label="Payment method" value="Demo payment record" />
      <InfoRow
        label="Payment date"
        value={formatDate(appointment.date)}
      />
      <InfoRow label="Currency" value="BDT" />
    </div>

    <button
      onClick={() => window.print()}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
    >
      <Printer size={16} />
      Print payment summary
    </button>
  </SectionCard>
);

// =====================================================
// FOLLOW-UP SECTION
// =====================================================

const FollowUpSection: React.FC<{
  onSchedule: (date: string) => void;
}> = ({ onSchedule }) => {
  const [date, setDate] = useState("2026-12-01");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!date) {
      setMessage("Please select a date.");
      return;
    }

    onSchedule(date);
    setMessage("Follow-up request saved in this demo.");
  };

  return (
    <SectionCard
      title="Follow-up appointment"
      subtitle="Request a future appointment"
      icon={<CalendarCheck size={20} />}
    >
      <p className="text-sm leading-6 text-gray-500">
        Select a preferred date for a follow-up request. The date
        will be stored locally in this demo interface.
      </p>

      <label className="mt-4 block text-sm font-medium text-gray-700">
        Preferred date
      </label>

      <input
        type="date"
        value={date}
        min="2026-11-22"
        onChange={(event) => setDate(event.target.value)}
        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
      />

      <button
        onClick={submit}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        <Calendar size={16} />
        Request follow-up
      </button>

      {message && (
        <p className="mt-3 text-center text-xs text-green-600">
          {message}
        </p>
      )}
    </SectionCard>
  );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

const ConsultationDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [diagnoses, setDiagnoses] =
    useState<Diagnosis[]>(initialDiagnoses);

  const [medicines, setMedicines] =
    useState<Medicine[]>(initialMedicines);

  const [reports] = useState<LabReport[]>(initialReports);

  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const [modalType, setModalType] = useState<
    "medicine" | "diagnosis" | "note" | null
  >(null);

  const [toast, setToast] = useState("");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "medical", label: "Medical records" },
    { id: "medicines", label: "Medicines" },
    { id: "reports", label: "Lab reports" },
    { id: "notes", label: "Notes" },
    { id: "billing", label: "Billing" },
  ];

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  // ---------------------------------------------------
  // MEDICINE STATUS
  // ---------------------------------------------------

  const toggleMedicine = (id: number) => {
    setMedicines((previous) =>
      previous.map((medicine) => {
        if (medicine.id !== id) return medicine;

        return {
          ...medicine,
          status:
            medicine.status === "Active"
              ? "Completed"
              : "Active",
        };
      })
    );

    showToast("Medicine status updated.");
  };

  // ---------------------------------------------------
  // DELETE MEDICINE
  // ---------------------------------------------------

  const deleteMedicine = (id: number) => {
    setMedicines((previous) =>
      previous.filter((medicine) => medicine.id !== id)
    );

    showToast("Medicine removed from this demo record.");
  };

  // ---------------------------------------------------
  // DELETE NOTE
  // ---------------------------------------------------

  const deleteNote = (id: number) => {
    setNotes((previous) =>
      previous.filter((note) => note.id !== id)
    );

    showToast("Note deleted.");
  };

  // ---------------------------------------------------
  // SAVE NEW RECORD
  // ---------------------------------------------------

  const saveRecord = (name: string, description: string) => {
    if (modalType === "medicine") {
      const newMedicine: Medicine = {
        id: Date.now(),
        name,
        strength: "Not specified",
        dosage: "Not specified",
        frequency: "Not specified",
        duration: "Not specified",
        instructions: description,
        status: "Active",
        startDate: new Date().toISOString().slice(0, 10),
        endDate: "Not specified",
      };

      setMedicines((previous) => [
        newMedicine,
        ...previous,
      ]);
    }

    if (modalType === "diagnosis") {
      const newDiagnosis: Diagnosis = {
        id: Date.now(),
        name,
        description,
        date: new Date().toISOString().slice(0, 10),
        doctor: doctor.name,
        severity: "Low",
      };

      setDiagnoses((previous) => [
        newDiagnosis,
        ...previous,
      ]);
    }

    if (modalType === "note") {
      const newNote: Note = {
        id: Date.now(),
        title: name,
        content: description,
        date: new Date().toISOString().slice(0, 10),
        author: "Current user",
      };

      setNotes((previous) => [newNote, ...previous]);
    }

    setModalType(null);
    showToast("New record saved.");
  };

  // ---------------------------------------------------
  // SUMMARY DATA
  // ---------------------------------------------------

  const summary = useMemo(
    () => ({
      medicines: medicines.length,
      activeMedicines: medicines.filter(
        (item) => item.status === "Active"
      ).length,
      diagnoses: diagnoses.length,
      reports: reports.length,
      notes: notes.length,
    }),
    [medicines, diagnoses, reports, notes]
  );

  // ---------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
              aria-label="Go back"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Consultation details
              </h1>
              <p className="text-xs text-gray-400">
                Medical record and appointment information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 sm:flex"
            >
              <Printer size={16} />
              Print
            </button>

            <button
              onClick={() =>
                showToast("Share feature requires backend integration.")
              }
              className="rounded-xl border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50"
              aria-label="Share consultation"
            >
              <Share2 size={17} />
            </button>

            <button
              onClick={() =>
                showToast("Demo record refreshed.")
              }
              className="rounded-xl border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50"
              aria-label="Refresh"
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-7 md:px-8">
        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Dashboard</span>
          <ChevronRight size={13} />
          <span>Consultations</span>
          <ChevronRight size={13} />
          <span className="font-medium text-blue-600">
            {appointment.id}
          </span>
        </div>

        {/* PAGE TITLE */}

        <section className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Consultation overview
              </h2>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {appointment.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Review appointment, medical history and clinical records.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setModalType("note")}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Plus size={16} />
              Add note
            </button>

            <button
              onClick={() =>
                showToast("Download requires a document-generation service.")
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </section>

        {/* SUMMARY CARDS */}

        <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            {
              label: "Medicines",
              value: summary.medicines,
              icon: <Pill size={19} />,
              color: "text-purple-600 bg-purple-50",
            },
            {
              label: "Active medicines",
              value: summary.activeMedicines,
              icon: <CheckCircle size={19} />,
              color: "text-green-600 bg-green-50",
            },
            {
              label: "Diagnoses",
              value: summary.diagnoses,
              icon: <ClipboardList size={19} />,
              color: "text-blue-600 bg-blue-50",
            },
            {
              label: "Lab reports",
              value: summary.reports,
              icon: <Microscope size={19} />,
              color: "text-cyan-600 bg-cyan-50",
            },
            {
              label: "Notes",
              value: summary.notes,
              icon: <FileText size={19} />,
              color: "text-orange-600 bg-orange-50",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className={`inline-flex rounded-xl p-2 ${item.color}`}>
                {item.icon}
              </div>

              <p className="mt-3 text-xs text-gray-500">
                {item.label}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-gray-900">
                {item.value}
              </h3>
            </div>
          ))}
        </section>

        {/* TABS */}

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex gap-1 overflow-x-auto border-b border-gray-100 px-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>

          <div className="p-4 md:p-6">
            {/* OVERVIEW TAB */}

            {activeTab === "overview" && (
              <div className="space-y-6">
                <AppointmentSummary appointment={appointment} />

                <VitalsSection vitals={initialVitals} />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <DoctorProfile doctor={doctor} />
                  <PatientProfile patient={patient} />
                </div>

                <TimelineSection items={timeline} />
              </div>
            )}

            {/* MEDICAL TAB */}

            {activeTab === "medical" && (
              <div className="space-y-6">
                <VitalsSection vitals={initialVitals} />

                <DiagnosisSection
                  diagnoses={diagnoses}
                  onAdd={() => setModalType("diagnosis")}
                />

                <PatientProfile patient={patient} />
              </div>
            )}

            {/* MEDICINES TAB */}

            {activeTab === "medicines" && (
              <MedicineSection
                medicines={medicines}
                onAdd={() => setModalType("medicine")}
                onToggle={toggleMedicine}
                onDelete={deleteMedicine}
              />
            )}

            {/* REPORTS TAB */}

            {activeTab === "reports" && (
              <LabReportsSection reports={reports} />
            )}

            {/* NOTES TAB */}

            {activeTab === "notes" && (
              <NotesSection
                notes={notes}
                onAdd={() => setModalType("note")}
                onDelete={deleteNote}
              />
            )}

            {/* BILLING TAB */}

            {activeTab === "billing" && (
              <PaymentSection appointment={appointment} />
            )}
          </div>
        </section>

        {/* LOWER GRID */}

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FollowUpSection
            onSchedule={(date) =>
              showToast(`Follow-up requested for ${date}`)
            }
          />

          <SectionCard
            title="Important information"
            subtitle="Patient record guidance"
            icon={<ShieldCheck size={20} />}
          >
            <div className="space-y-4">
              <div className="flex gap-3 rounded-xl bg-blue-50 p-4">
                <Info
                  size={19}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                <p className="text-sm leading-6 text-blue-800">
                  This page contains sample patient information.
                  Replace it with authenticated data from your
                  healthcare backend before deployment.
                </p>
              </div>

              <div className="flex gap-3 rounded-xl bg-amber-50 p-4">
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <p className="text-sm leading-6 text-amber-800">
                  Medication and diagnosis records must be
                  reviewed and confirmed by an authorized
                  healthcare professional.
                </p>
              </div>

              <div className="flex gap-3 rounded-xl bg-green-50 p-4">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-green-600"
                />
                <p className="text-sm leading-6 text-green-800">
                  Protect patient data with authentication,
                  role-based permissions and secure storage.
                </p>
              </div>
            </div>
          </SectionCard>
        </section>

        {/* FOOTER */}

        <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400">
          HealthCare+ · Consultation management · Demo interface
        </footer>
      </main>

      {/* ADD RECORD MODAL */}

      {modalType && (
        <AddRecordModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSave={saveRecord}
        />
      )}

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] flex max-w-sm items-center gap-3 rounded-xl bg-gray-900 px-5 py-4 text-sm text-white shadow-xl">
          <CheckCircle size={18} className="shrink-0 text-green-400" />
          <span>{toast}</span>

          <button
            onClick={() => setToast("")}
            className="ml-2"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultationDetails;
