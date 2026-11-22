import React, { useState } from 'react';
import {
    Stethoscope,
    ShieldCheck,
    Heart,
    Award,
    Users,
    Video,
    Clock,
    FileText,
    CheckCircle2,
    Building2,
    Globe,
    Activity,
    Lock,
    Sparkles,
    ChevronDown,
    ChevronUp,
    ArrowRight,
    UserCheck,
    Microscope,
    PhoneCall,
    Calendar,
    Star,
    Target,
    Eye,
    BookOpen,
} from 'lucide-react';

interface AboutUsProps {
    onNavigate?: (tab: string) => void;
    onOpenApplyDoctor?: () => void;
    onOpenRegister?: () => void;
}

interface CoreValue {
    id: string;
    title: string;
    description: string;
    badge: string;
    icon: React.ElementType;
}

interface Milestone {
    year: string;
    title: string;
    subtitle: string;
    description: string;
}

interface LeadershipMember {
    name: string;
    role: string;
    credentials: string;
    specialty: string;
    experience: string;
    bio: string;
}

interface FaqItem {
    question: string;
    answer: string;
}

const CORE_VALUES: CoreValue[] = [
    {
        id: 'patient-first',
        title: 'Patient-First Clinical Empathy',
        description:
            'Every 20-minute consultation is structured around unhurried listening, clear medical explanations, and personalized follow-up care plans tailored to each patient.',
        badge: 'Care Standard 01',
        icon: Heart,
    },
    {
        id: 'verified-excellence',
        title: '100% Board & BMDC Verified Doctors',
        description:
            'Our credentialing committee manually audits medical degrees, registration numbers, hospital affiliations, and clinical track records before onboarding any physician.',
        badge: 'Care Standard 02',
        icon: UserCheck,
    },
    {
        id: 'data-privacy',
        title: 'Zero-Trust Medical Data Security',
        description:
            'Patient health records, lab uploads, and digital prescriptions are protected with end-to-end 256-bit encryption and strict role-based clinical access controls.',
        badge: 'Care Standard 03',
        icon: Lock,
    },
    {
        id: 'diagnostic-precision',
        title: 'Evidence-Based Telemedicine',
        description:
            'We follow international clinical triage protocols and integrate partner diagnostic labs so doctors can review accurate reports before prescribing medication.',
        badge: 'Care Standard 04',
        icon: Microscope,
    },
    {
        id: 'accessible-care',
        title: '24/7 Borderless Healthcare Access',
        description:
            'Whether you are in a metropolitan city or a remote district, specialist consultations and QR-verified digital prescriptions are accessible within minutes.',
        badge: 'Care Standard 05',
        icon: Globe,
    },
    {
        id: 'continuous-audit',
        title: 'Peer-Reviewed Quality Assurance',
        description:
            'Our internal clinical quality board conducts regular prescription audits and patient outcome reviews to maintain the highest safety benchmarks.',
        badge: 'Care Standard 06',
        icon: ShieldCheck,
    },
];

const MILESTONES: Milestone[] = [
    {
        year: '2022',
        title: 'Clinical Telehealth Foundation',
        subtitle: 'Bridging the Specialist Gap',
        description:
            'Founded by a coalition of senior physicians and healthcare engineers to eliminate long hospital queues and connect patients directly with verified specialists.',
    },
    {
        year: '2023',
        title: 'QR-Verified E-Prescription Engine',
        subtitle: 'Tamper-Proof Digital Rx',
        description:
            'Launched our structured digital prescription system with automated dosage schedules, drug interaction checks, and instant pharmacy verification.',
    },
    {
        year: '2024',
        title: 'Nationwide Diagnostic Integration',
        subtitle: '50+ Partner Lab Centers',
        description:
            'Integrated home sample collection and direct lab report syncing into the patient dashboard for seamless follow-up consultations.',
    },
    {
        year: '2025',
        title: '24/7 Tele-Triage & AI Specialist Matching',
        subtitle: 'Faster Clinical Routing',
        description:
            'Introduced smart symptom routing and round-the-clock emergency tele-triage support, serving over 120,000+ successful consultations.',
    },
];

const LEADERSHIP_TEAM: LeadershipMember[] = [
    {
        name: 'Dr. Mahmudul Hasan Chowdhury',
        role: 'Chief Medical Officer (CMO)',
        credentials: 'MBBS, FCPS (Medicine), MD (Cardiology)',
        specialty: 'Interventional Cardiology & Tele-Triage',
        experience: '18+ Years Clinical Experience',
        bio: 'Leads clinical governance, doctor credentialing audits, and telemedicine treatment protocols across all medical departments.',
    },
    {
        name: 'Dr. Farhana Yasmin Siddiqui',
        role: 'Director of Clinical Quality & Pediatrics',
        credentials: 'MBBS, DCH, FCPS (Pediatrics)',
        specialty: 'Child Health & Preventive Medicine',
        experience: '14+ Years Clinical Experience',
        bio: 'Oversees patient safety standards, maternal and child telehealth workflows, and continuous physician training programs.',
    },
    {
        name: 'Dr. Tanvir Ahmed Siddique',
        role: 'Head of Diagnostics & Internal Medicine',
        credentials: 'MBBS, MRCP (UK), MACP',
        specialty: 'Internal Medicine & Chronic Care',
        experience: '15+ Years Clinical Experience',
        bio: 'Spearheads partner diagnostic lab integration, chronic disease management pathways, and digital prescription accuracy.',
    },
    {
        name: 'Prof. Dr. Nazmul Huda',
        role: 'Chair of Ethics & Compliance Board',
        credentials: 'MBBS, PhD (Public Health), FRCP',
        specialty: 'Healthcare Ethics & Neuro-Medicine',
        experience: '22+ Years Clinical Experience',
        bio: 'Ensures strict adherence to international patient privacy laws, HIPAA-aligned data handling, and ethical medical practices.',
    },
];

const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'How are doctors verified before joining Healthcare System?',
        answer:
            'Every physician undergoes a 4-stage verification process: national medical council (BMDC) license validation, postgraduate degree authentication, identity KYC verification, and a clinical onboarding review by our Chief Medical Officer.',
    },
    {
        question: 'Are digital prescriptions valid at pharmacies and diagnostic centers?',
        answer:
            'Yes. Every prescription generated after a consultation carries the physician’s digital signature, registration number, timestamp, and a unique QR verification code accepted by pharmacies and partner diagnostic labs.',
    },
    {
        question: 'How long is a standard video consultation session?',
        answer:
            'Each scheduled appointment allocates a dedicated 20-minute clinical window so your doctor can review your symptoms, inspect uploaded lab reports, and explain your treatment plan without rushing.',
    },
    {
        question: 'What happens if I need a follow-up after receiving lab test results?',
        answer:
            'You can upload your diagnostic reports directly to your patient portal and book a follow-up slot with the same specialist, who will have full access to your previous consultation notes and prescription history.',
    },
    {
        question: 'How is my personal health and consultation data protected?',
        answer:
            'All video calls use encrypted WebRTC channels, and medical records are stored using 256-bit AES encryption. Only you and the physician you book an appointment with can access your clinical files.',
    },
];

export const AboutUs: React.FC<AboutUsProps> = ({
    onNavigate,
    onOpenApplyDoctor,
    onOpenRegister,
}) => {
    const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'standards'>('mission');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="bg-slate-50 text-slate-800">
            {/* 1. Hero Section */}
            <div className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-950/80 via-slate-900 to-slate-950 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Trusted Digital Healthcare & Telemedicine Network</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                                Reimagining Clinical Care with{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                                    Verified Specialists
                                </span>{' '}
                                & Precision Technology
                            </h1>

                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                                Healthcare System connects patients directly with board-certified doctors for
                                structured 20-minute video consultations, seamless diagnostic coordination, and
                                instant QR-verified digital prescriptions—anytime, anywhere.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button
                                    onClick={() => onNavigate && onNavigate('doctors')}
                                    className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold transition-all shadow-lg shadow-teal-950/60 flex items-center gap-2"
                                >
                                    <span>Explore Verified Doctors</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => onOpenRegister && onOpenRegister()}
                                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-sm font-semibold transition-all"
                                >
                                    Create Patient Account
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                                    <span>BMDC & Board Verified Physicians</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                                    <span>HIPAA-Aligned 256-Bit Encryption</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                                    <span>24/7 Emergency Tele-Triage</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Clinical Overview Card */}
                        <div className="lg:col-span-5">
                            <div className="bg-slate-800/70 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                                            <Stethoscope className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-white">Clinical Excellence</h3>
                                            <p className="text-xs text-teal-400">Live Telemedicine Infrastructure</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono">
                                        ACTIVE 24/7
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                                        <div className="text-2xl font-extrabold text-white">120K+</div>
                                        <div className="text-xs text-slate-400 mt-1">Consultations Completed</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                                        <div className="text-2xl font-extrabold text-teal-400">450+</div>
                                        <div className="text-xs text-slate-400 mt-1">Verified Specialists</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                                        <div className="text-2xl font-extrabold text-emerald-400">98.7%</div>
                                        <div className="text-xs text-slate-400 mt-1">Patient Satisfaction</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                                        <div className="text-2xl font-extrabold text-white">&lt; 8 Min</div>
                                        <div className="text-xs text-slate-400 mt-1">Avg. Triage Response</div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-800/60 flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        Every consultation includes structured clinical notes, digital vitals
                                        tracking, and instant access to downloadable PDF prescriptions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Interactive Mission, Vision & Clinical Standards Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                                Who We Are
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                                Built by Physicians & Health Technologists
                            </h2>
                        </div>

                        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 self-start">
                            <button
                                onClick={() => setActiveTab('mission')}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'mission'
                                    ? 'bg-teal-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <Target className="w-3.5 h-3.5" />
                                Our Mission
                            </button>
                            <button
                                onClick={() => setActiveTab('vision')}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'vision'
                                    ? 'bg-teal-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <Eye className="w-3.5 h-3.5" />
                                Our Vision
                            </button>
                            <button
                                onClick={() => setActiveTab('standards')}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'standards'
                                    ? 'bg-teal-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <BookOpen className="w-3.5 h-3.5" />
                                Clinical Protocol
                            </button>
                        </div>
                    </div>

                    <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-4">
                            {activeTab === 'mission' && (
                                <>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        Democratizing Specialist Healthcare Without Geographical Barriers
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Our mission is to make trustworthy, specialist-led healthcare accessible to
                                        every household. By eliminating travel bottlenecks and crowded waiting rooms,
                                        we empower patients to consult experienced physicians from the safety of their
                                        homes while preserving rigorous clinical accuracy.
                                    </p>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        We equip doctors with a structured digital consultation workspace—complete
                                        with patient history timelines, lab report viewers, and standardized
                                        e-prescription builders—so clinical decisions remain thorough and accountable.
                                    </p>
                                </>
                            )}

                            {activeTab === 'vision' && (
                                <>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        A Connected Ecosystem of Preventive & Continuous Care
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        We envision a healthcare future where episodic clinic visits are replaced by
                                        continuous, longitudinal health records. Every prescription, diagnostic test,
                                        and specialist follow-up works together seamlessly in one secure patient-owned
                                        portal.
                                    </p>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Through responsible clinical decision support and nationwide diagnostic lab
                                        partnerships, we aim to detect chronic conditions earlier and improve
                                        long-term patient outcomes across urban and rural communities alike.
                                    </p>
                                </>
                            )}

                            {activeTab === 'standards' && (
                                <>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        Strict Adherence to Evidence-Based Telemedicine Guidelines
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Every consultation follows a standardized clinical checklist: symptom triage,
                                        allergy and medication reconciliation, live video assessment, and clear
                                        red-flag escalation protocols when in-person hospital care is required.
                                    </p>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Controlled substances are strictly regulated under national telemedicine laws,
                                        and all digital prescriptions include verifiable physician credentials and
                                        dosage instructions.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-teal-50/70 border border-teal-100 space-y-2">
                                <Video className="w-6 h-6 text-teal-600" />
                                <h4 className="text-sm font-bold text-slate-900">20-Min Dedicated Slots</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Structured video consultations with zero overlapping bookings.
                                </p>
                            </div>
                            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                                <FileText className="w-6 h-6 text-emerald-600" />
                                <h4 className="text-sm font-bold text-slate-900">Instant QR Rx</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Downloadable PDF prescriptions with medicine timing & dosage guides.
                                </p>
                            </div>
                            <div className="p-5 rounded-xl bg-slate-100 border border-slate-200 space-y-2">
                                <Building2 className="w-6 h-6 text-slate-700" />
                                <h4 className="text-sm font-bold text-slate-900">50+ Diagnostic Labs</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Direct lab report uploads and home sample collection coordination.
                                </p>
                            </div>
                            <div className="p-5 rounded-xl bg-cyan-50/70 border border-cyan-100 space-y-2">
                                <Clock className="w-6 h-6 text-cyan-700" />
                                <h4 className="text-sm font-bold text-slate-900">7-Day Free Follow-Up</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Quick report review window with your consulting specialist.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Six Core Clinical Values Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                        Our Core Principles
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Six Pillars of Clinical Trust & Patient Safety
                    </h2>
                    <p className="text-sm text-slate-600">
                        Every feature on our platform is engineered around medical accountability, patient
                        privacy, and clinical clarity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CORE_VALUES.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-teal-400 hover:shadow-md transition-all space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                                        {item.badge}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 4. Journey & Milestones Timeline */}
            <div className="bg-slate-900 text-white py-20 border-y border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                                Our Growth & Impact
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                                Milestones in Digital Healthcare Delivery
                            </h2>
                        </div>
                        <p className="text-xs text-slate-400 max-w-md">
                            From our first tele-consultation room to a nationwide specialist network, see how we
                            have evolved to serve patients better.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MILESTONES.map((milestone) => (
                            <div
                                key={milestone.year}
                                className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-3 relative"
                            >
                                <div className="inline-block px-3 py-1 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono text-sm font-bold">
                                    {milestone.year}
                                </div>
                                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                                    {milestone.subtitle}
                                </div>
                                <h3 className="text-base font-bold text-white">{milestone.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{milestone.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Medical Advisory & Leadership Board */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                        Clinical Governance
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Medical Advisory & Leadership Board
                    </h2>
                    <p className="text-sm text-slate-600">
                        Our platform protocols, physician verification standards, and telemedicine safety rules
                        are governed by senior medical specialists.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {LEADERSHIP_TEAM.map((member) => (
                        <div
                            key={member.name}
                            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col sm:flex-row gap-5 items-start hover:shadow-md transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                                {member.name
                                    .replace('Dr. ', '')
                                    .replace('Prof. ', '')
                                    .split(' ')
                                    .slice(0, 2)
                                    .map((n) => n[0])
                                    .join('')}
                            </div>
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                                    <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-[11px] font-semibold">
                                        {member.role}
                                    </span>
                                </div>
                                <p className="text-xs font-mono text-slate-500">{member.credentials}</p>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-0.5">
                                    <span className="flex items-center gap-1">
                                        <Award className="w-3.5 h-3.5 text-teal-600" />
                                        {member.specialty}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 text-amber-500" />
                                        {member.experience}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed pt-1">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. FAQ Accordion & Bottom CTA Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left FAQ List */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="mb-6">
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                                Frequently Asked Questions
                            </span>
                            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                                Everything You Need to Know About Our Care
                            </h2>
                        </div>

                        {FAQ_ITEMS.map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div
                                    key={faq.question}
                                    className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="text-sm font-bold text-slate-900">{faq.question}</span>