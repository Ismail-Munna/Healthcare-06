
interface AdvancedCalendarProps {
  onConfirm: (date: string, time: string) => void;
  onClose: () => void;
}

function AdvancedAppointmentCalendar({
  onConfirm,
  onClose,
}: AdvancedCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedTime, setSelectedTime] = useState("");
  const [period, setPeriod] = useState("Morning");

  const dates = [
    { day: 24, weekday: "Tue", available: true },
    { day: 25, weekday: "Wed", available: true },
    { day: 26, weekday: "Thu", available: true },
    { day: 27, weekday: "Fri", available: false },
    { day: 28, weekday: "Sat", available: true },
    { day: 29, weekday: "Sun", available: true },
    { day: 30, weekday: "Mon", available: true },
  ];

  const slots: Record<string, string[]> = {
    Morning: [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
    ],
    Afternoon: [
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
    ],
    Evening: [
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
    ],
  };

  const unavailableSlots = ["09:30 AM", "11:30 AM", "02:00 PM", "05:30 PM"];

  const handleConfirm = () => {
    if (!selectedTime) {
      alert("Please select an appointment time.");
      return;
    }

    const date = `November ${selectedDate}, 2026`;
    onConfirm(date, selectedTime);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Select Appointment
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Choose your preferred date and time
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 p-2 text-slate-500 hover:bg-red-50 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-7 p-6">

          {/* Month Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">
                November 2026
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Select an available date
              </p>
            </div>

            <div className="flex gap-2">
              <button
                disabled
                className="rounded-lg border border-slate-200 p-2 text-slate-400"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                disabled
                className="rounded-lg border border-slate-200 p-2 text-slate-400"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {dates.map((date) => {
              const active = selectedDate === date.day;

              return (
                <button
                  key={date.day}
                  disabled={!date.available}
                  onClick={() => {
                    setSelectedDate(date.day);
                    setSelectedTime("");
                  }}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition ${
                    active
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : date.available
                      ? "border-slate-100 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                      : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                  }`}
                >
                  <span className="text-xs">{date.weekday}</span>
                  <span className="text-lg font-bold">
                    {date.day}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      !date.available
                        ? "bg-slate-300"
                        : active
                        ? "bg-white"
                        : "bg-green-500"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Availability Legend */}
          <div className="flex flex-wrap gap-5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              Available
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              Unavailable
            </div>
          </div>

          {/* Period Selection */}
          <div>
            <h3 className="mb-4 font-bold text-slate-800">
              Available Time Slots
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Morning", time: "9 AM - 12 PM" },
                { name: "Afternoon", time: "12 PM - 4 PM" },
                { name: "Evening", time: "4 PM - 7 PM" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setPeriod(item.name);
                    setSelectedTime("");
                  }}
                  className={`rounded-xl border p-3 text-left transition ${
                    period === item.name
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-100 text-slate-500 hover:border-blue-200"
                  }`}
                >
                  <Clock size={18} className="mb-2" />
                  <p className="text-sm font-semibold">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[10px]">
                    {item.time}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                {period} Slots
              </h3>
              <span className="text-xs text-slate-400">
                {slots[period].filter(
                  (time) => !unavailableSlots.includes(time)
                ).length}{" "}
                available
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {slots[period].map((time) => {
                const booked = unavailableSlots.includes(time);
                const active = selectedTime === time;

                return (
                  <button
                    key={time}
                    disabled={booked}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      booked
                        ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through"
                        : active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    {time}
                    {active && (
                      <Check size={14} className="ml-2 inline" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selection Summary */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-3 text-blue-600">
                <CalendarDays size={23} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Your selected appointment
                </p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  November {selectedDate}, 2026
                  {selectedTime ? ` · ${selectedTime}` : ""}
                </p>
                {!selectedTime && (
                  <p className="mt-1 text-xs text-orange-500">
                    Please select a time slot
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              disabled={!selectedTime}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm Appointment
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
