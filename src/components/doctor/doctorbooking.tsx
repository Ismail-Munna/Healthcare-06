
import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Heart,
  HeartPulse,
  Home,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
  Star,
  Stethoscope,
  User,
  Users,
  X,
  Video,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  BriefcaseMedical,
  ClipboardList,
  CircleHelp,
  Settings,
  LogOut,
  Plus,
  Minus,
  CheckCheck,
} from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  location: string;
  image: string;
  available: boolean;
  nextAvailable: string;
  gender: string;
  languages: string[];
  about: string;
  education: string;
  patients: string;
}

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

interface Booking {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  fee: number;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 12,
    rating: 4.9,
    reviews: 245,
    fee: 800,
    location: "City Medical Center, Khulna",
    image: "https://i.pravatar.cc/300?img=47",
    available: true,
    nextAvailable: "Today, 10:30 AM",
    gender: "Female",
    languages: ["English", "Bengali"],
    about: "Experienced cardiologist specializing in heart health and cardiovascular care.",
    education: "MBBS, MD Cardiology",
    patients: "2,500+",
  },
  {
    id: 2,
    name: "Dr. Michael Smith",
    specialty: "Neurologist",
    experience: 15,
    rating: 4.8,
    reviews: 189,
    fee: 1000,
    location: "Popular Diagnostic Center",
    image: "https://i.pravatar.cc/300?img=12",
    available: true,
    nextAvailable: "Today, 02:00 PM",
    gender: "Male",
    languages: ["English", "Bengali"],
    about: "Specialist in neurological disorders, migraines and brain health.",
    education: "MBBS, FCPS Neurology",
    patients: "3,000+",
  },
  {
    id: 3,
    name: "Dr. Emily Wilson",
    specialty: "Dermatologist",
    experience: 9,
    rating: 4.7,
    reviews: 156,
    fee: 700,
    location: "Khulna Medical Hospital",
    image: "https://i.pravatar.cc/300?img=44",
    available: true,
    nextAvailable: "Tomorrow, 11:00 AM",
    gender: "Female",
    languages: ["English", "Bengali"],
    about: "Focused on skin care, acne treatment and dermatological conditions.",
    education: "MBBS, DDV",
    patients: "1,800+",
  },
  {
    id: 4,
    name: "Dr. James Anderson",
    specialty: "Orthopedic",
    experience: 18,
    rating: 4.9,
    reviews: 312,
    fee: 1200,
    location: "City Medical Center",
    image: "https://i.pravatar.cc/300?img=13",
    available: false,
    nextAvailable: "Nov 25, 2026",
    gender: "Male",
    languages: ["English", "Bengali"],
    about: "Expert in bone, joint and muscle conditions and orthopedic surgery.",
    education: "MBBS, MS Orthopedics",
    patients: "4,000+",
  },
  {
    id: 5,
    name: "Dr. Olivia Brown",
    specialty: "Pediatrician",
    experience: 11,
    rating: 4.8,
    reviews: 201,
    fee: 600,
    location: "Child Care Hospital",
    image: "https://i.pravatar.cc/300?img=45",
    available: true,
    nextAvailable: "Today, 04:00 PM",
    gender: "Female",
    languages: ["English", "Bengali"],
    about: "Dedicated pediatrician providing healthcare for infants and children.",
    education: "MBBS, MD Pediatrics",
    patients: "2,200+",
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Dentist",
    experience: 8,
    rating: 4.6,
    reviews: 98,
    fee: 500,
    location: "Smile Dental Clinic",
    image: "https://i.pravatar.cc/300?img=14",
    available: true,
    nextAvailable: "Tomorrow, 09:30 AM",
    gender: "Male",
    languages: ["English", "Bengali"],
    about: "General dentistry, oral health and cosmetic dental treatments.",
    education: "BDS, FCPS",
    patients: "1,200+",
  },
  {
    id: 7,
    name: "Dr. Sophia Miller",
    specialty: "Gynecologist",
    experience: 14,
    rating: 4.9,
    reviews: 276,
    fee: 900,
    location: "Central Hospital",
    image: "https://i.pravatar.cc/300?img=49",
    available: true,
    nextAvailable: "Today, 12:00 PM",
    gender: "Female",
    languages: ["English", "Bengali"],
    about: "Women's health, pregnancy care and reproductive health specialist.",
    education: "MBBS, FCPS Gynecology",
    patients: "3,500+",
  },
  {
    id: 8,
    name: "Dr. David Wilson",
    specialty: "General Physician",
    experience: 10,
    rating: 4.7,
    reviews: 142,
    fee: 400,
    location: "Health Care Center",
    image: "https://i.pravatar.cc/300?img=15",
    available: true,
    nextAvailable: "Today, 05:00 PM",
    gender: "Male",
    languages: ["English", "Bengali"],
    about: "General healthcare, preventive medicine and routine checkups.",
    education: "MBBS, FCPS Medicine",
    patients: "2,000+",
  },
];

const specialties = [
  "All",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Dentist",
  "Gynecologist",
  "General Physician",
];

const initialBookings: Booking[] = [
  {
    id: 101,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Nov 25, 2026",
    time: "10:30 AM",
    fee: 800,
    status: "Confirmed",
  },
];

const timeSlots: TimeSlot[] = [
  { id: 1, time: "09:00 AM", available: true },
  { id: 2, time: "09:30 AM", available: false },
  { id: 3, time: "10:00 AM", available: true },
  { id: 4, time: "10:30 AM", available: true },
  { id: 5, time: "11:00 AM", available: true },
  { id: 6, time: "11:30 AM", available: false },
  { id: 7, time: "12:00 PM", available: true },
  { id: 8, time: "02:00 PM", available: true },
  { id: 9, time: "02:30 PM", available: true },
  { id: 10, time: "03:00 PM", available: false },
  { id: 11, time: "04:00 PM", available: true },
  { id: 12, time: "05:00 PM", available: true },
];

const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "Find Doctors", icon: Stethoscope },
  { label: "Appointments", icon: CalendarDays },
  { label: "Medical Records", icon: ClipboardList },
  { label: "Prescriptions", icon: BriefcaseMedical },
  { label: "Health Overview", icon: HeartPulse },
];

function DoctorBooking() {
  const [activeNav, setActiveNav] = useState("Find Doctors");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [maxFee, setMaxFee] = useState(2000);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("Nov 25, 2026");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookings, setBookings] = useState(initialBookings);
  const [showBooking, setShowBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [patientName, setPatientName] = useState("Badhon Mojumder");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [reason, setReason] = useState("");
  const [consultationType, setConsultationType] = useState("In-person");
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialty.toLowerCase().includes(query) ||
          doctor.location.toLowerCase().includes(query)
      );
    }

    if (selectedSpecialty !== "All") {
      result = result.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }

    result = result.filter((doctor) => doctor.fee <= maxFee);

    if (availableOnly) {
      result = result.filter((doctor) => doctor.available);
    }

    if (sortBy === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Lowest Fee") {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === "Most Experienced") {
      result.sort((a, b) => b.experience - a.experience);
    }

    return result;
  }, [search, selectedSpecialty, sortBy, maxFee, availableOnly]);

  const availableDates = [
    "Nov 25",
    "Nov 26",
    "Nov 27",
    "Nov 28",
    "Nov 29",
    "Nov 30",
    "Dec 01",
  ];

  const handleOpenBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedTime("");
    setSelectedDate("Nov 25, 2026");
    setShowBooking(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedTime || !patientName || !patientPhone) {
      alert("Please complete all required booking information.");
      return;
    }

    const newBooking: Booking = {
      id: Date.now(),
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      fee: selectedDoctor.fee,
      status: "Confirmed",
    };

    setBookings((prev) => [newBooking, ...prev]);
    setShowBooking(false);
    setShowSuccess(true);
  };

  const handleCancelBooking = (id: number) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, status: "Cancelled" as const }
          : booking
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-800">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-100 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <HeartPulse size={25} />
            </div>
            <div>
              <h1 className="text-xl font-bold">MediCare</h1>
              <p className="text-xs text-slate-400">Patient Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="mb-4 rounded-2xl bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-blue-700">
              <CircleHelp size={19} />
              <span className="text-sm font-semibold">Need Help?</span>
            </div>
            <p className="mb-3 text-xs leading-5 text-slate-500">
              Our healthcare support team is here to help.
            </p>
            <button className="text-xs font-bold text-blue-600">
              Contact Support →
            </button>
          </div>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-slate-50">
            <Settings size={19} />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50">
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={23} />
            </button>
            <div>
              <h2 className="text-lg font-bold">Doctor Booking</h2>
              <p className="hidden text-xs text-slate-400 sm:block">
                Find and book the right doctor for you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="relative rounded-xl bg-slate-50 p-2.5 text-slate-600">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-3 sm:pl-5">
              <img
                src="https://i.pravatar.cc/100?img=11"
                alt="Patient"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Badhon Mojumder</p>
                <p className="text-xs text-slate-400">Patient</p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-7 p-4 sm:p-8">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-xl">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
                Healthcare made simple
              </span>
              <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
                Find Your Perfect Doctor
              </h1>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                Book appointments with trusted medical professionals.
                Get the care you deserve, whenever you need it.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm">
                  <ShieldCheck size={18} />
                  Verified Doctors
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm">
                  <CalendarCheck size={18} />
                  Easy Booking
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-16 hidden h-72 w-72 rounded-full border-[35px] border-white/10 lg:block" />
            <div className="absolute -bottom-24 right-40 hidden h-64 w-64 rounded-full border-[35px] border-white/10 lg:block" />
            <Stethoscope className="absolute bottom-8 right-12 hidden text-white/20 lg:block" size={130} />
          </section>

          <section>
            <div className="mb-5">
              <h2 className="text-xl font-bold">Find a Doctor</h2>
              <p className="mt-1 text-sm text-slate-400">
                Search by doctor's name, specialty or location
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctor, specialty or location..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 md:hidden"
              >
                <Filter size={18} />
                Filters
              </button>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedSpecialty("All");
                  setMaxFee(2000);
                  setAvailableOnly(false);
                }}
                className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <aside className={`${mobileFilterOpen ? "block" : "hidden"} space-y-5 rounded-2xl border border-slate-100 bg-white p-5 lg:block`}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedSpecialty("All");
                    setMaxFee(2000);
                    setAvailableOnly(false);
                  }}
                  className="text-xs font-semibold text-blue-600"
                >
                  Reset
                </button>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold">Specialty</h4>
                <div className="space-y-2">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                        selectedSpecialty === specialty
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {specialty}
                      {selectedSpecialty === specialty && (
                        <Check size={15} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <h4 className="mb-3 text-sm font-semibold">Consultation Fee</h4>
                <input
                  type="range"
                  min="300"
                  max="2000"
                  step="100"
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>৳300</span>
                  <span className="font-bold text-blue-600">
                    Up to ৳{maxFee}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <h4 className="mb-3 text-sm font-semibold">Availability</h4>
                <label className="flex cursor-pointer items-center gap-3 text-xs text-slate-500">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Available doctors only
                </label>
              </div>
            </aside>

            <div className="space-y-5 lg:col-span-3">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-bold">Available Doctors</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    {filteredDoctors.length} doctors found
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={17} className="text-slate-400" />
                  <span className="text-xs text-slate-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none"
                  >
                    <option>Recommended</option>
                    <option>Highest Rated</option>
                    <option>Lowest Fee</option>
                    <option>Most Experienced</option>
                  </select>
                </div>
              </div>

              {filteredDoctors.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onBook={() => handleOpenBooking(doctor)}
                      onDetails={() => setSelectedDoctor(doctor)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-white p-12 text-center">
                  <Search size={35} className="mx-auto text-slate-300" />
                  <h3 className="mt-4 font-bold">No doctors found</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Try changing your search or filters.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 pt-3">
                <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-blue-50">
                  <ChevronLeft size={17} />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`h-9 w-9 rounded-lg text-sm font-semibold ${
                      page === 1
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-500 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-blue-50">
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Remaining components and booking modal will be added in Part 2 and Part 3. */}
    </div>
  );
}

interface DoctorCardProps {
  doctor: Doctor;
  onBook: () => void;
  onDetails: () => void;
}

function DoctorCard({ doctor, onBook, onDetails }: DoctorCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="h-20 w-20 rounded-2xl object-cover"
          />
          {doctor.available && (
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-800">{doctor.name}</h3>
              <p className="mt-1 text-xs font-medium text-blue-600">
                {doctor.specialty}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-2 py-1 text-xs font-bold text-yellow-600">
              <Star size={13} fill="currentColor" />
              {doctor.rating}
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
            <BriefcaseMedical size={14} />
            {doctor.experience} years experience
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <MapPin size={14} />
            <span className="truncate">{doctor.location}</span>
          </p>
        </div>
      </div>

      <div className="my-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
        <div>
          <p className="text-xs text-slate-400">Consultation Fee</p>
          <p className="mt-1 text-lg font-bold text-slate-800">
            ৳{doctor.fee}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Patient Reviews</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {doctor.reviews} Reviews
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            doctor.available ? "text-green-600" : "text-orange-500"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          {doctor.available ? "Available" : "Currently Busy"}
        </span>
        <span className="text-xs text-slate-400">
          {doctor.nextAvailable}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={onDetails}
          className="rounded-xl border border-blue-200 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View Profile
        </button>
        <button
          onClick={onBook}
          className="rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </div>
    </article>
  );
}

export default DoctorBooking;
