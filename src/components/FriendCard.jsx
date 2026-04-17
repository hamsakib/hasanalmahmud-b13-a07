import { useNavigate } from "react-router-dom";

const statusConfig = {
  overdue:      { dot: "bg-red-500",     pill: "bg-red-500 text-white",           label: "Overdue"    },
  "almost due": { dot: "bg-amber-400",   pill: "bg-amber-400 text-white",         label: "Almost Due" },
  "on-track":   { dot: "bg-emerald-500", pill: "bg-emerald-500 text-white",       label: "On Track"   },
};

export default function FriendCard({ friend }) {
  const navigate = useNavigate();
  const cfg = statusConfig[friend.status] || statusConfig["on-track"];

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-2xl border border-[#e6ede9] cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
      style={{ boxShadow: "0 1px 4px rgba(26,58,42,0.07)" }}
    >
      <div className="flex flex-col items-center text-center px-4 pt-6 pb-5 gap-2.5 flex-1">

        {/* Avatar with status dot */}
        <div className="relative">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-[68px] h-[68px] rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1a3a2a&color=fff&size=128`;
            }}
          />
          <span className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${cfg.dot}`} />
        </div>

        {/* Name + days */}
        <div>
          <p className="font-bold text-[#1a2e22] text-[14px] leading-snug">{friend.name}</p>
          <p className="text-[12px] text-slate-400 mt-0.5">{friend.days_since_contact} days ago</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1">
          {friend.tags.map((tag) => (
            <span key={tag} className="text-[10.5px] px-2.5 py-0.5 rounded-full bg-[#f0f5f2] text-[#2d6a4f] font-medium capitalize">
              {tag}
            </span>
          ))}
        </div>

        {/* Status pill — inside the card */}
        <span className={`text-[11px] px-3 py-1 rounded-full font-bold tracking-wide ${cfg.pill}`}>
          {cfg.label}
        </span>

      </div>
    </div>
  );
}
