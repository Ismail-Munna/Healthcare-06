import React, { useState } from 'react';
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  Heart,
  ChevronRight,
  Award,
  Video,
  Globe,
  Share2,
  Send,
  CheckCircle2,
  FileText,
  Users,
  Activity,
  Lock,
  Smartphone,
  Building2,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenApplyDoctor: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenApplyDoctor,
  onOpenRegister,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Emergency & Quick Action Banner */}
      <div className="bg-gradient-to-r from-teal-900/60 via-slate-900 to-emerald-900/50 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    24/7 Clinical Support
                  </span>
                  <span className="text-xs text-slate-400">Immediate Tele-Triage Available</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  Need Urgent Medical Guidance or Prescription Assistance?
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => onNavigate('doctors')}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-all shadow-lg shadow-teal-950/50 flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Book Instant Consultation
              </button>
              <button
                onClick={onOpenApplyDoctor}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-teal-400" />
                Join as a Specialist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          {/* Column 1: Brand, Mission & Social Links (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block">
                  Healthcare System
                </span>
                <span className="text-xs text-teal-400 font-medium block">
                  Digital Telemedicine & Clinical Prescriptions
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Providing compassionate, high-quality healthcare services with board-certified
              physicians. Book 20-minute live video consultations, manage clinical records,
              and receive verified digital prescriptions around the clock.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-2.5 text-xs text-slate-300 pt-1">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  Clinical HQ: 123 Health Avenue, Suite 1200, Medical District, Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  24/7 Hotline: <strong className="text-white font-mono">+880 1234 567890</strong> /{' '}
                  <strong className="text-white font-mono">+1 (800) 456-MEDIC</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  Support: <strong className="text-white font-mono">support@healthcare.org</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Consultation Hours: Mon – Sun (24/7 Active Slots)</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  { label: 'Website', href: 'https://healthcare.org', icon: Globe },
                  { label: 'Community', href: 'https://facebook.com', icon: Users },
                  { label: 'Updates', href: 'https://x.com', icon: Share2 },
                  { label: 'Health Network', href: 'https://linkedin.com', icon: Activity },
                ].map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:bg-teal-600 hover:text-white hover:border-teal-500 flex items-center justify-center transition-all"
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Medical Specialties (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Medical Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {[
                'Cardiology & Hypertension',
                'Internal Medicine & Geriatrics',
                'Neurology & Brain Health',
                'Pediatrics & Child Care',
                'Dermatology & Skin Care',
                'Orthopedics & Joint Care',
                'Gynecology & Women Health',
                'Preventive Wellness',
              ].map((specialty) => (
                <li key={specialty}>
                  <button
                    onClick={() => onNavigate('specialties')}
                    className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                    <span>{specialty}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Patient Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Patient Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>Find a Doctor Today</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how_it_works')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>How Consultation Works</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my_prescriptions')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>E-Prescription Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>Diagnostics & Lab Tests</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how_it_works')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>Cancellation & Refunds</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRegister}
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-teal-400 shrink-0" />
                  <span>Patient Registration</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: For Physicians & Organization (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              For Physicians
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenApplyDoctor}
                  className="text-teal-400 hover:text-teal-300 font-semibold transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-400 shrink-0" />
                  <span>Apply as a Doctor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how_it_works')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>Doctor Verification</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>Clinical Quality Standards</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>About Healthcare</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                  <span>Administrative Helpdesk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Health Newsletter & Compliance (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Health Bulletin
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe for clinical wellness tips, specialist availability updates, and health guides.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-teal-950/70 border border-teal-700/50 text-teal-300 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Subscribed! You will receive our clinical updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </form>
            )}

            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                Compliance & Security
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 rounded bg-slate-900 text-[10px] text-teal-400 border border-slate-800 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> HIPAA
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 text-[10px] text-teal-400 border border-slate-800 font-mono flex items-center gap-1">
                  <Lock className="w-3 h-3" /> 256-bit SSL
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 text-[10px] text-emerald-400 border border-slate-800 font-mono flex items-center gap-1">
                  <Award className="w-3 h-3" /> ISO 27001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Trust & Platform Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-b border-slate-800/80">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">100% Verified Doctors</h5>
              <p className="text-[11px] text-slate-400">BMDC & board-certified specialists</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <FileText className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">Digital Prescriptions</h5>
              <p className="text-[11px] text-slate-400">Instant PDF & QR-verified Rx</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Building2 className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">Partner Diagnostics</h5>
              <p className="text-[11px] text-slate-400">Nationwide lab & home sample pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Smartphone className="w-6 h-6 text-teal-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">Seamless Telehealth</h5>
              <p className="text-[11px] text-slate-400">HD video & encrypted patient chat</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center lg:text-left">
            © {currentYear} Healthcare System. All rights reserved. Confidential and secure telehealth services.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[11px]">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('how_it_works')} className="hover:text-slate-300 transition-colors">
              Terms of Consultation
            </button>
            <button onClick={() => onNavigate('how_it_works')} className="hover:text-slate-300 transition-colors">
              Refund Policy
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Emergency Protocol
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Help Center
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for better healthcare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};