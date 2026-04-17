import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTimeline } from "../context/TimelineContext";
import friendsData from "../data/friends.json";

const statusConfig = {
  overdue:      { bg: "bg-red-100",     text: "text-red-600",     dot: "bg-red-500",     bar: "bg-red-400",     label: "Overdue"    },
  "almost due": { bg: "bg-amber-100",   text: "text-amber-600",   dot: "bg-amber-400",   bar: "bg-amber-400",   label: "Almost Due" },
  "on-track":   { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500", bar: "bg-emerald-500", label: "On Track"   },
};

const CallIcon  = () => <img src="/icon-call.png"  alt="Call"  className="w-5 h-5 object-contain" />;
const TextIcon  = () => <img src="/icon-text.png"  alt="Text"  className="w-5 h-5 object-contain" />;
const VideoIcon = () => <img src="/icon-video.png" alt="Video" className="w-5 h-5 object-contain" />;

export default function FriendDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { addEntry } = useTimeline();

  const friend = friendsData.find(f => f.id === Number(id));
  if (!friend) { navigate("/404"); return null; }

  const cfg = statusConfig[friend.status] || statusConfig["on-track"];

  function handleCheckin(type) {
    addEntry(friend.name, type);
    toast.success(`${type} with ${friend.name} logged!`, {
      icon: type === "Call" ? "📞" : type === "Text" ? "💬" : "🎥",
    });
  }

  const nextDue = new Date(friend.next_due_date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div className="bg-[#f4f6f5] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#5a7a68] hover:text-[#1a2e22] text-[13px] font-semibold mb-7 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Friends
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">

          {/* ─── LEFT: Simple profile card ─── */}
          <div
            className="bg-white rounded-2xl border border-[#e6ede9] p-6 flex flex-col items-center text-center h-fit"
            style={{ boxShadow: "0 1px 5px rgba(26,58,42,0.07)" }}
          >
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-[80px] h-[80px] rounded-full object-cover border-4 border-[#e6ede9] mb-3"
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1a3a2a&color=fff&size=128`; }}
            />
            <h1 className="text-[1.05rem] font-extrabold text-[#1a2e22] leading-snug">{friend.name}</h1>
            <span className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold ${cfg.bg} ${cfg.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>

            <p className="text-[12.5px] text-[#5a7a68] leading-relaxed mt-4 mb-3">{friend.bio}</p>

            <div className="flex flex-wrap justify-center gap-1.5 mb-3">
              {friend.tags.map(tag => (
                <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#f0f5f2] text-[#2d6a4f] font-semibold capitalize">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={`mailto:${friend.email}`}
              className="text-[12px] text-[#2d6a4f] hover:text-[#1a3a2a] font-medium break-all transition-colors mb-4"
            >
              {friend.email}
            </a>

            {/* Action buttons */}
            <div className="w-full flex flex-col gap-2 border-t border-[#e6ede9] pt-4">
              <button className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-[#e6ede9] text-[#1a2e22] hover:bg-[#f0f5f2] text-[12.5px] font-semibold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Snooze 2 Weeks
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-[#e6ede9] text-[#1a2e22] hover:bg-[#f0f5f2] text-[12.5px] font-semibold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                Archive
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 text-[12.5px] font-semibold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Delete
              </button>
            </div>
          </div>

          {/* ─── RIGHT: Stats + Goal + Check-In ─── */}
          <div className="flex flex-col gap-4">

            {/* Stat boxes */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Days Since Contact", value: friend.days_since_contact },
                { label: "Due Count",           value: friend.goal              },
                { label: "Next Due",            value: nextDue                  },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-[#e6ede9] p-5 text-center"
                  style={{ boxShadow: "0 1px 4px rgba(26,58,42,0.06)" }}
                >
                  <p className="text-[11px] font-semibold text-[#5a7a68] uppercase tracking-wide mb-2">{label}</p>
                  <p className="text-[1.6rem] font-extrabold text-[#1a2e22] leading-none">{value}</p>
                </div>
              ))}
            </div>

            {/* Relationship Goal */}
            <div
              className="bg-white rounded-2xl border border-[#e6ede9] p-5"
              style={{ boxShadow: "0 1px 4px rgba(26,58,42,0.06)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[14px] font-bold text-[#1a2e22]">Relationship Goal</p>
                <button className="text-[12px] font-semibold text-[#2d6a4f] border border-[#c8ddd3] hover:bg-[#f0f5f2] px-3 py-1 rounded-full transition-colors">
                  Edit
                </button>
              </div>
              <p className="text-[13px] text-[#5a7a68] mb-3">
                Connect every <span className="font-bold text-[#1a2e22]">{friend.goal} days</span>
              </p>
              <div className="w-full bg-[#e6ede9] rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${cfg.bar}`}
                  style={{ width: `${Math.min((friend.days_since_contact / friend.goal) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Quick Check-In */}
            <div
              className="bg-white rounded-2xl border border-[#e6ede9] p-5"
              style={{ boxShadow: "0 1px 4px rgba(26,58,42,0.06)" }}
            >
              <p className="text-[14px] font-bold text-[#1a2e22] mb-1">Quick Check-In</p>
              <p className="text-[12.5px] text-[#5a7a68] mb-4">Log an interaction with {friend.name.split(" ")[0]}</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: "Call",  Icon: CallIcon,  bg: "hover:bg-[#f0f5f2]",  border: "border-[#d4e4db]", text: "text-[#1a3a2a]"  },
                  { type: "Text",  Icon: TextIcon,  bg: "hover:bg-blue-50",    border: "border-blue-100",  text: "text-blue-700"   },
                  { type: "Video", Icon: VideoIcon, bg: "hover:bg-purple-50",  border: "border-purple-100",text: "text-purple-700" },
                ].map(({ type, Icon, bg, border, text }) => (
                  <button
                    key={type}
                    onClick={() => handleCheckin(type)}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl border bg-white ${bg} ${border} transition-all duration-200`}
                  >
                    <Icon />
                    <span className={`text-[12.5px] font-semibold ${text}`}>{type}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
