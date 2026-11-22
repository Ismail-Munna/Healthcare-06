
import React, { useMemo, useState } from "react";
import {
  Search,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageCircle,
  Calendar,
  Clock,
  User,
  Users,
  FileText,
  Download,
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Send,
  Paperclip,
  Image,
  Stethoscope,
  Heart,
  Activity,
  ShieldCheck,
  Star,
  MapPin,
  Bell,
  Settings,
  Filter,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Monitor,
  ClipboardList,
  Pill,
  AlertCircle,
  CheckCircle,
  XCircle,
  CalendarDays,
  ArrowRight,
  ExternalLink,
  Copy,
  Printer,
  Share2,
  PhoneCall,
  Headphones,
  Wifi,
  WifiOff,
  CircleHelp,
  Eye,
  EyeOff,
  MoreHorizontal,
  Menu,
  Home,
  LayoutDashboard,
  LogOut,
  ChevronUp,
  Sparkles,
  Activity as ActivityIcon,
} from "lucide-react";

// ======================================================
// TYPES
// ======================================================

type ConsultationStatus =
  | "upcoming"
  | "ongoing"
  | "completed"
  | "cancelled";

type ConsultationType = "video" | "audio" | "in-person";

type MessageType = "text" | "file" | "image";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: number;
  hospital: string;
  verified: boolean;
}

interface Patient {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  image: string;
}

interface Consultation {
  id: number;
  doctor: Doctor;
  patient: Patient;
  date: string;
  time: string;
  duration: number;
  type: ConsultationType;
  status: ConsultationStatus;
  reason: string;
  fee: number;
  notes?: string;
}

interface ChatMessage {
  id: number;
  sender: "doctor" | "patient";
  message: string;
  time: string;
  type: MessageType;
}

interface Prescription {
  id: number;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

interface ConsultationCardProps {
  consultation: Consultation;
  onJoin: (consultation: Consultation) => void;
  onDetails: (consultation: Consultation) => void;
  onCancel: (id: number) => void;
}

// ======================================================
// MOCK DATA
// ======================================================

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 4.9,
    experience: 12,
    hospital: "City Medical Center",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 4.8,
    experience: 10,
    hospital: "Green Life Hospital",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Emily Wilson",
    specialty: "Dermatologist",
    image: "https://i.pravatar.cc/150?img=44",
    rating: 4.7,
    experience: 8,
    hospital: "Popular Medical Center",
    verified: true,
  },
  {
    id: 4,
    name: "Dr. James Anderson",
    specialty: "General Physician",
    image: "https://i.pravatar.cc/150?img=13",
    rating: 4.9,
    experience: 15,
    hospital: "United Hospital",
    verified: true,
  },
  {
    id: 5,
    name: "Dr. Olivia Brown",
    specialty: "Psychologist",
    image: "https://i.pravatar.cc/150?img=49",
    rating: 4.8,
    experience: 9,
    hospital: "Wellness Clinic",
    verified: true,
  },
];

const currentPatient: Patient = {
  name: "Badhon Mojumder",
  age: 22,
  gender: "Male",
  bloodGroup: "O+",
  phone: "+880 1700-000000",
  email: "patient@example.com",
  image: "https://i.pravatar.cc/150?img=11",
};

const initialConsultations: Consultation[] = [
  {
    id: 1001,
    doctor: doctors[0],
    patient: currentPatient,
    date: "2026-11-24",
    time: "10:30 AM",
    duration: 30,
    type: "video",
    status: "upcoming",
    reason: "Regular heart health checkup",
    fee: 1200,
  },
  {
    id: 1002,
    doctor: doctors[1],
    patient: currentPatient,
    date: "2026-11-25",
    time: "02:00 PM",
    duration: 45,
    type: "video",
    status: "upcoming",
    reason: "Headache and migraine consultation",
    fee: 1500,
  },
  {
    id: 1003,
    doctor: doctors[2],
    patient: currentPatient,
    date: "2026-11-18",
    time: "11:00 AM",
    duration: 30,
    type: "audio",
    status: "completed",
    reason: "Skin allergy consultation",
    fee: 1000,
    notes: "Follow the prescribed skincare routine.",
  },
  {
    id: 1004,
    doctor: doctors[3],
    patient: currentPatient,
    date: "2026-11-12",
    time: "04:30 PM",
    duration: 30,
    type: "video",
    status: "completed",
    reason: "General health consultation",
    fee: 800,
    notes: "Maintain a balanced diet and regular exercise.",
  },
  {
    id: 1005,
    doctor: doctors[4],
    patient: currentPatient,
    date: "2026-11-08",
    time: "09:30 AM",
    duration: 45,
    type: "audio",
    status: "cancelled",
    reason: "Stress management",
    fee: 1300,
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "doctor",
    message: "Hello! How are you feeling today?",
    time: "10:30 AM",
    type: "text",
  },
  {
    id: 2,
    sender: "patient",
    message: "I have been experiencing headaches recently.",
    time: "10:31 AM",
    type: "text",
  },
  {
    id: 3,
    sender: "doctor",
    message: "How long have you been experiencing this?",
    time: "10:32 AM",
    type: "text",
  },
];

const initialPrescriptions: Prescription[] = [
  {
    id: 1,
    medicine: "Paracetamol 500mg",
    dosage: "1 tablet",
    frequency: "Twice daily",
    duration: "5 days",
    instructions: "Take after meals",
  },
  {
    id: 2,
    medicine: "Vitamin D3",
    dosage: "1 capsule",
    frequency: "Once daily",
    duration: "30 days",
    instructions: "Take with breakfast",
  },
];

// ======================================================
// HELPERS
// ======================================================

const formatDate = (date: string) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusColor = (status: ConsultationStatus) => {
  const colors: Record<ConsultationStatus, string> = {
    upcoming: "bg-blue-50 text-blue-700",
    ongoing: "bg-green-50 text-green-700",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return colors[status];
};

const getTypeIcon = (type: ConsultationType) => {
  if (type === "video") return <Video size={16} />;
  if (type === "audio") return <Phone size={16} />;
  return <MapPin size={16} />;
};

// ======================================================
// STAT CARD
// ======================================================

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h3>
          <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// ======================================================
// STATUS BADGE
// ======================================================

const StatusBadge: React.FC<{
  status: ConsultationStatus;
}> = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

// ======================================================
// CONSULTATION CARD
// ======================================================

const ConsultationCard: React.FC<ConsultationCardProps> = ({
  consultation,
  onJoin,
  onDetails,
  onCancel,
}) => {
  const isUpcoming = consultation.status === "upcoming";
  const isCompleted = consultation.status === "completed";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <StatusBadge status={consultation.status} />

        <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <img
          src={consultation.doctor.image}
          alt={consultation.doctor.name}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900">
            {consultation.doctor.name}
          </h3>
          <p className="text-sm text-gray-500">
            {consultation.doctor.specialty}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-amber-500">
            <Star size={13} fill="currentColor" />
            {consultation.doctor.rating}
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={15} />
            <span className="text-xs">Date</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {formatDate(consultation.date)}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={15} />
            <span className="text-xs">Time</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {consultation.time}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Consultation fee</p>
          <p className="font-bold text-gray-900">
            ৳{consultation.fee.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDetails(consultation)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            Details
          </button>

          {isUpcoming && (
            <>
              <button
                onClick={() => onCancel(consultation.id)}
                className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Cancel
              </button>

              {consultation.type !== "in-person" && (
                <button
                  onClick={() => onJoin(consultation)}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                >
                  Join
                </button>
              )}
            </>
          )}

          {isCompleted && (
            <button
              onClick={() => onDetails(consultation)}
              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
            >
              View report
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ======================================================
// CONSULTATION DETAILS MODAL
// ======================================================

const ConsultationDetailsModal: React.FC<{
  consultation: Consultation;
  onClose: () => void;
}> = ({ consultation, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Consultation details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <img
            src={consultation.doctor.image}
            alt={consultation.doctor.name}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-gray-900">
              {consultation.doctor.name}
            </h3>
            <p className="text-sm text-gray-500">
              {consultation.doctor.specialty}
            </p>
            <StatusBadge status={consultation.status} />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <DetailRow
            label="Consultation ID"
            value={`#${consultation.id}`}
          />
          <DetailRow
            label="Date"
            value={formatDate(consultation.date)}
          />
          <DetailRow label="Time" value={consultation.time} />
          <DetailRow
            label="Duration"
            value={`${consultation.duration} minutes`}
          />
          <DetailRow
            label="Consultation type"
            value={consultation.type}
          />
          <DetailRow
            label="Reason"
            value={consultation.reason}
          />
          <DetailRow
            label="Fee"
            value={`৳${consultation.fee}`}
          />
        </div>

        {consultation.notes && (
          <div className="mt-5 rounded-xl bg-blue-50 p-4">
            <h4 className="font-semibold text-blue-900">
              Doctor's notes
            </h4>
            <p className="mt-2 text-sm text-blue-800">
              {consultation.notes}
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Close details
        </button>
      </div>
    </div>
  );
};

// ======================================================
// DETAIL ROW
// ======================================================

const DetailRow: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-right text-sm font-medium capitalize text-gray-900">
      {value}
    </span>
  </div>
);

// ======================================================
// VIDEO CONSULTATION ROOM
// ======================================================

const VideoConsultationRoom: React.FC<{
  consultation: Consultation;
  onClose: () => void;
}> = ({ consultation, onClose }) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [elapsed, setElapsed] = useState(0);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "patient",
      message: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const formatElapsed = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-gray-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Video size={20} />
          </div>

          <div>
            <h2 className="font-semibold">Video consultation</h2>
            <p className="text-xs text-gray-400">
              {consultation.doctor.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
            ● Connected
          </span>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-300 hover:bg-white/10"
          >
            <Minimize size={20} />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <main className="relative flex flex-1 items-center justify-center p-5">
          <div className="relative flex h-full max-h-[650px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center">
              <img
                src={consultation.doctor.image}
                alt={consultation.doctor.name}
                className="mx-auto h-32 w-32 rounded-full border-4 border-white/20 object-cover"
              />

              <h3 className="mt-5 text-xl font-semibold">
                {consultation.doctor.name}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {consultation.doctor.specialty}
              </p>

              <p className="mt-3 text-xs text-gray-500">
                Demo consultation interface
              </p>
            </div>

            <div className="absolute bottom-5 right-5 h-36 w-28 overflow-hidden rounded-2xl border border-white/20 bg-gray-800">
              <div className="flex h-full items-center justify-center">
                {cameraEnabled ? (
                  <img
                    src={currentPatient.image}
                    alt="Patient"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <VideoOff size={28} className="text-gray-400" />
                )}
              </div>
              <span className="absolute bottom-2 left-2 text-xs">
                You
              </span>
            </div>

            <div className="absolute left-5 top-5 rounded-xl bg-black/40 px-3 py-2 text-sm">
              <Clock className="mr-2 inline" size={15} />
              {formatElapsed(elapsed)}
            </div>
          </div>
        </main>

        {chatOpen && (
          <aside className="flex w-full max-w-sm flex-col border-l border-white/10 bg-gray-900">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h3 className="font-semibold">Consultation chat</h3>

              <button
                onClick={() => setChatOpen(false)}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`flex ${
                    item.sender === "patient"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 ${
                      item.sender === "patient"
                        ? "bg-blue-600"
                        : "bg-gray-800"
                    }`}
                  >
                    <p className="text-sm">{item.message}</p>
                    <span className="mt-2 block text-right text-[10px] text-gray-300">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Write a message..."
                className="min-w-0 flex-1 rounded-xl bg-gray-800 px-3 py-2 text-sm outline-none"
              />

              <button
                onClick={sendMessage}
                className="rounded-xl bg-blue-600 p-3 hover:bg-blue-700"
              >
                <Send size={17} />
              </button>
            </div>
          </aside>
        )}
      </div>

      <footer className="flex flex-wrap items-center justify-center gap-3 border-t border-white/10 px-4 py-5">
        <ControlButton
          active={micEnabled}
          icon={micEnabled ? <Mic /> : <MicOff />}
          label="Microphone"
          onClick={() => setMicEnabled(!micEnabled)}
        />

        <ControlButton
          active={cameraEnabled}
          icon={cameraEnabled ? <Video /> : <VideoOff />}
          label="Camera"
          onClick={() => setCameraEnabled(!cameraEnabled)}
        />

        <ControlButton
          active={speakerEnabled}
          icon={speakerEnabled ? <Volume2 /> : <VolumeX />}
          label="Speaker"
          onClick={() => setSpeakerEnabled(!speakerEnabled)}
        />

        <ControlButton
          active={chatOpen}
          icon={<MessageCircle />}
          label="Chat"
          onClick={() => setChatOpen(!chatOpen)}
        />

        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold hover:bg-red-700"
        >
          <PhoneOff size={18} />
          End call
        </button>
      </footer>
    </div>
  );
};

// ======================================================
// CONTROL BUTTON
// ======================================================

const ControlButton: React.FC<{
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 rounded-xl px-4 py-2 transition ${
      active
        ? "bg-gray-800 text-white hover:bg-gray-700"
        : "bg-red-600/20 text-red-400 hover:bg-red-600/30"
    }`}
  >
    {icon}
    <span className="text-[10px]">{label}</span>
  </button>
);

// ======================================================
// PRESCRIPTION MODAL
// ======================================================

const PrescriptionModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [prescriptions] = useState(initialPrescriptions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Prescription
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Prescription preview for your consultation
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-blue-700">
                HealthCare+
              </h3>
              <p className="text-xs text-gray-500">
                Digital prescription
              </p>
            </div>

            <div className="text-right text-xs text-gray-500">
              <p>Prescription date</p>
              <p className="mt-1 font-semibold text-gray-800">
                November 2026
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Patient</p>
              <p className="font-semibold text-gray-900">
                {currentPatient.name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Age</p>
              <p className="font-semibold text-gray-900">
                {currentPatient.age} years
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Blood group</p>
              <p className="font-semibold text-gray-900">
                {currentPatient.bloodGroup}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Doctor</p>
              <p className="font-semibold text-gray-900">
                Dr. Sarah Johnson
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900">
              Prescribed medicines
            </h4>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[500px] text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500">
                    <th className="p-3">Medicine</th>
                    <th className="p-3">Dosage</th>
                    <th className="p-3">Frequency</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>

                <tbody>
                  {prescriptions.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100"
                    >
                      <td className="p-3 font-medium">
                        {item.medicine}
                      </td>
                      <td className="p-3">{item.dosage}</td>
                      <td className="p-3">{item.frequency}</td>
                      <td className="p-3">{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-blue-50 p-4">
            <h4 className="font-semibold text-blue-900">
              Instructions
            </h4>

            {prescriptions.map((item) => (
              <p
                key={item.id}
                className="mt-2 text-sm text-blue-800"
              >
                • {item.medicine}: {item.instructions}
              </p>
            ))}
          </div>

          <p className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-400">
            Demo prescription data. Follow only a prescription
            verified and issued by your treating doctor.
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Printer size={16} />
            Print
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// FILTER BUTTON
// ======================================================

const FilterButton: React.FC<{
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}> = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
      active
        ? "bg-blue-600 text-white"
        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

// ======================================================
// EMPTY STATE
// ======================================================

const EmptyState: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
      <CalendarDays size={28} />
    </div>

    <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
    <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
      {description}
    </p>
  </div>
);

// ======================================================
// MAIN CONSULTATION COMPONENT
// ======================================================

const Consultation: React.FC = () => {
  const [consultations, setConsultations] =
    useState<Consultation[]>(initialConsultations);

  const [activeTab, setActiveTab] = useState<
    "all" | ConsultationStatus
  >("all");

  const [search, setSearch] = useState("");
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);

  const [activeCall, setActiveCall] =
    useState<Consultation | null>(null);

  const [showPrescription, setShowPrescription] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">(
    "newest"
  );

  const [selectedType, setSelectedType] = useState<
    "all" | ConsultationType
  >("all");

  const [showCancelConfirm, setShowCancelConfirm] = useState<
    number | null
  >(null);

  const [toast, setToast] = useState("");

  // ----------------------------------------------------
  // FILTERED CONSULTATIONS
  // ----------------------------------------------------

  const filteredConsultations = useMemo(() => {
    let result = [...consultations];

    if (activeTab !== "all") {
      result = result.filter(
        (item) => item.status === activeTab
      );
    }

    if (selectedType !== "all") {
      result = result.filter(
        (item) => item.type === selectedType
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.doctor.name.toLowerCase().includes(query) ||
          item.doctor.specialty.toLowerCase().includes(query) ||
          item.reason.toLowerCase().includes(query) ||
          String(item.id).includes(query)
      );
    }

    result.sort((a, b) => {
      const first = new Date(a.date).getTime();
      const second = new Date(b.date).getTime();

      return sortOrder === "newest"
        ? second - first
        : first - second;
    });

    return result;
  }, [
    consultations,
    activeTab,
    selectedType,
    search,
    sortOrder,
  ]);

  // ----------------------------------------------------
  // STATISTICS
  // ----------------------------------------------------

  const statistics = useMemo(() => {
    return {
      total: consultations.length,
      upcoming: consultations.filter(
        (item) => item.status === "upcoming"
      ).length,
      completed: consultations.filter(
        (item) => item.status === "completed"
      ).length,
      cancelled: consultations.filter(
        (item) => item.status === "cancelled"
      ).length,
    };
  }, [consultations]);

  // ----------------------------------------------------
  // CANCEL CONSULTATION
  // ----------------------------------------------------

  const cancelConsultation = (id: number) => {
    setConsultations((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, status: "cancelled" }
          : item
      )
    );

    setShowCancelConfirm(null);
    setToast("Consultation cancelled successfully.");

    window.setTimeout(() => setToast(""), 3000);
  };

  // ----------------------------------------------------
  // JOIN CONSULTATION
  // ----------------------------------------------------

  const joinConsultation = (consultation: Consultation) => {
    if (consultation.status !== "upcoming") return;

    setActiveCall(consultation);
  };

  // ----------------------------------------------------
  // CLOSE CALL
  // ----------------------------------------------------

  const closeCall = () => {
    setActiveCall(null);
    setToast("Consultation session ended.");

    window.setTimeout(() => setToast(""), 3000);
  };

  // ----------------------------------------------------
  // OPEN DETAILS
  // ----------------------------------------------------

  const openDetails = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
  };

  // ----------------------------------------------------
  // RESET FILTERS
  // ----------------------------------------------------

  const resetFilters = () => {
    setSearch("");
    setSelectedType("all");
    setActiveTab("all");
    setSortOrder("newest");
  };

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* MOBILE SIDEBAR OVERLAY */}

      {showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-100 bg-white transition-transform lg:translate-x-0 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-gray-100 px-6">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <Heart size={23} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              HealthCare+
            </h1>
            <p className="text-[10px] tracking-wide text-gray-400">
              PATIENT PORTAL
            </p>
          </div>

          <button
            onClick={() => setShowSidebar(false)}
            className="ml-auto rounded-lg p-2 text-gray-400 hover:bg-gray-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Main menu
          </p>

          <nav className="space-y-1">
            {[
              { name: "Dashboard", icon: LayoutDashboard },
              { name: "Appointments", icon: Calendar },
              { name: "Consultations", icon: Video },
              { name: "Doctors", icon: Stethoscope },
              { name: "Medical records", icon: FileText },
              { name: "Prescriptions", icon: Pill },
              { name: "Messages", icon: MessageCircle },
            ].map((item) => {
              const Icon = item.icon;
              const active = item.name === "Consultations";

              return (
                <button
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    active
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}

                  {active && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </nav>

          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Preferences
          </p>

          <nav className="space-y-1">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-500 hover:bg-gray-50">
              <Settings size={18} />
              Settings
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-500 hover:bg-gray-50">
              <CircleHelp size={18} />
              Help center
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 hover:bg-red-50">
              <LogOut size={18} />
              Sign out
            </button>
          </nav>
        </div>

        <div className="absolute bottom-5 left-4 right-4 rounded-2xl bg-blue-50 p-4">
          <div className="flex items-center gap-2 text-blue-700">
            <ShieldCheck size={20} />
            <span className="text-sm font-semibold">
              Need help?
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-blue-700/70">
            Contact our support team for assistance with your
            consultation.
          </p>

          <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700">
            Contact support
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}

      <main className="min-h-screen lg:ml-64">
        {/* TOP HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Consultations
              </h2>
              <p className="hidden text-xs text-gray-400 sm:block">
                Manage your online doctor consultations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
                className="relative rounded-xl border border-gray-100 p-3 text-gray-500 hover:bg-gray-50"
              >
                <Bell size={19} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                  <h3 className="font-semibold">
                    Notifications
                  </h3>

                  <p className="mt-3 text-sm text-gray-600">
                    Your next consultation is scheduled for
                    November 24.
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    Demo notification
                  </p>
                </div>
              )}
            </div>

            <div className="hidden items-center gap-3 border-l border-gray-100 pl-4 sm:flex">
              <img
                src={currentPatient.image}
                alt="Patient"
                className="h-10 w-10 rounded-full object-cover"
              />

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {currentPatient.name}
                </p>
                <p className="text-xs text-gray-400">Patient</p>
              </div>

              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <div className="mx-auto max-w-7xl space-y-7 p-4 md:p-8">
          {/* WELCOME BANNER */}

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-600 p-6 text-white md:p-8">
            <div className="relative z-10 max-w-2xl">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                Your health matters
              </span>

              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                Your consultations, all in one place
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100">
                Connect with qualified doctors, manage appointments,
                and review your consultation history.
              </p>

              <button
                onClick={() => {
                  setToast("Connect this button to your doctor booking page.");
                  window.setTimeout(() => setToast(""), 3000);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Find a doctor
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="absolute -right-10 -top-16 hidden h-72 w-72 rounded-full border-[35px] border-white/10 md:block" />
            <div className="absolute -bottom-24 right-28 hidden h-64 w-64 rounded-full bg-white/10 md:block" />
          </section>

          {/* STATISTICS */}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total consultations"
              value={statistics.total}
              subtitle="All recorded sessions"
              icon={<Video size={22} />}
              color="bg-blue-50 text-blue-600"
            />

            <StatCard
              title="Upcoming"
              value={statistics.upcoming}
              subtitle="Scheduled sessions"
              icon={<Calendar size={22} />}
              color="bg-purple-50 text-purple-600"
            />

            <StatCard
              title="Completed"
              value={statistics.completed}
              subtitle="Finished consultations"
              icon={<CheckCircle size={22} />}
              color="bg-green-50 text-green-600"
            />

            <StatCard
              title="Cancelled"
              value={statistics.cancelled}
              subtitle="Cancelled sessions"
              icon={<XCircle size={22} />}
              color="bg-red-50 text-red-600"
            />
          </section>

          {/* NEXT CONSULTATION */}

          {consultations.some(
            (item) => item.status === "upcoming"
          ) && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Your next consultation
                </h2>

                <span className="text-xs text-blue-600">
                  Upcoming session
                </span>
              </div>

              {(() => {
                const next = consultations
                  .filter((item) => item.status === "upcoming")
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() -
                      new Date(b.date).getTime()
                  )[0];

                return (
                  <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={next.doctor.image}
                          alt={next.doctor.name}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-gray-900">
                              {next.doctor.name}
                            </h3>

                            {next.doctor.verified && (
                              <ShieldCheck
                                size={16}
                                className="text-blue-600"
                              />
                            )}
                          </div>

                          <p className="text-sm text-gray-500">
                            {next.doctor.specialty}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {next.doctor.hospital}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <div className="rounded-xl bg-blue-50 px-4 py-3">
                          <p className="text-xs text-blue-500">
                            Date
                          </p>
                          <p className="mt-1 text-sm font-semibold text-blue-900">
                            {formatDate(next.date)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-blue-50 px-4 py-3">
                          <p className="text-xs text-blue-500">
                            Time
                          </p>
                          <p className="mt-1 text-sm font-semibold text-blue-900">
                            {next.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {getTypeIcon(next.type)}
                        <span className="capitalize">
                          {next.type} consultation
                        </span>
                        <span>·</span>
                        <span>{next.duration} minutes</span>
                      </div>

                      <button
                        onClick={() => joinConsultation(next)}
                        disabled={next.type === "in-person"}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        <Video size={17} />
                        Join consultation
                      </button>
                    </div>
                  </div>
                );
              })()}
            </section>
          )}

          {/* CONSULTATION HISTORY */}

          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Consultation history
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  View and manage all your sessions
                </p>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Filter size={16} />
                Filters
                <ChevronDown size={15} />
              </button>
            </div>

            {/* SEARCH */}

            <div className="mt-5 flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctor, specialty, reason or ID..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>

            {/* FILTER PANEL */}

            {showFilters && (
              <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">
                    Filter consultations
                  </h3>

                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <RefreshCw size={14} />
                    Reset filters
                  </button>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Consultation type
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(
                      ["all", "video", "audio", "in-person"] as const
                    ).map((type) => (
                      <FilterButton
                        key={type}
                        active={selectedType === type}
                        onClick={() => setSelectedType(type)}
                      >
                        {type === "all"
                          ? "All types"
                          : type.replace("-", " ")}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STATUS TABS */}

            <div className="mt-5 flex flex-wrap gap-2">
              {(
                [
                  "all",
                  "upcoming",
                  "completed",
                  "cancelled",
                ] as const
              ).map((tab) => (
                <FilterButton
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="capitalize">
                    {tab === "all" ? "All consultations" : tab}
                  </span>

                  <span className="ml-2 opacity-70">
                    {tab === "all"
                      ? consultations.length
                      : consultations.filter(
                          (item) => item.status === tab
                        ).length}
                  </span>
                </FilterButton>
              ))}
            </div>

            {/* CONSULTATION CARDS */}

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((consultation) => (
                  <ConsultationCard
                    key={consultation.id}
                    consultation={consultation}
                    onJoin={joinConsultation}
                    onDetails={openDetails}
                    onCancel={(id) => setShowCancelConfirm(id)}
                  />
                ))
              ) : (
                <EmptyState
                  title="No consultations found"
                  description="Try changing your search or filters to find a consultation."
                />
              )}
            </div>
          </section>

          {/* HEALTH TIPS */}

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-50 p-3 text-green-600">
                  <Activity size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Before your consultation
                  </h3>
                  <p className="text-xs text-gray-400">
                    Prepare for your doctor visit
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 text-green-500"
                  />
                  Keep your previous medical reports ready.
                </li>

                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 text-green-500"
                  />
                  Write down your symptoms and questions.
                </li>

                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 text-green-500"
                  />
                  Check your microphone and camera.
                </li>

                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 text-green-500"
                  />
                  Join from a quiet and private place.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                  <FileText size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Medical documents
                  </h3>
                  <p className="text-xs text-gray-400">
                    Review your prescription preview
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                Access the sample prescription interface and
                review the medication information stored in
                this demo.
              </p>

              <button
                onClick={() => setShowPrescription(true)}
                className="mt-5 flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                <FileText size={17} />
                View prescription
                <ArrowRight size={15} />
              </button>
            </div>
          </section>

          {/* FOOTER */}

          <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400">
            © 2026 HealthCare+. All rights reserved.
          </footer>
        </div>
      </main>

      {/* DETAILS MODAL */}

      {selectedConsultation && (
        <ConsultationDetailsModal
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
        />
      )}

      {/* VIDEO ROOM */}

      {activeCall && (
        <VideoConsultationRoom
          consultation={activeCall}
          onClose={closeCall}
        />
      )}

      {/* PRESCRIPTION */}

      {showPrescription && (
        <PrescriptionModal
          onClose={() => setShowPrescription(false)}
        />
      )}

      {/* CANCEL CONFIRMATION */}

      {showCancelConfirm !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertCircle size={27} />
            </div>

            <h3 className="mt-4 text-center text-lg font-bold text-gray-900">
              Cancel consultation?
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-gray-500">
              Are you sure you want to cancel this consultation?
              This demo will update its status immediately.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Keep appointment
              </button>

              <button
                onClick={() =>
                  cancelConsultation(showCancelConfirm)
                }
                className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-4 text-sm text-white shadow-xl">
          <CheckCircle size={18} className="text-green-400" />
          {toast}
          <button onClick={() => setToast("")}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Consultation;
