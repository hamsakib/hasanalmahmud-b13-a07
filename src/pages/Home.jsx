import { useState, useEffect } from "react";
import FriendCard from "../components/FriendCard";
import allFriends from "../data/friends.json";
import { useTimeline } from "../context/TimelineContext";

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-11 h-11 rounded-full border-[3px] border-[#c8ddd3] border-t-[#1a3a2a] spinner" />
      <p className="text-slate-400 text-sm">Loading your friends…</p>
    </div>
  );
}

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { entries } = useTimeline();

  useEffect(() => {
    const t = setTimeout(() => { setFriends(allFriends); setLoading(false); }, 900);
    return () => clearTimeout(t);
  }, []);

  const total         = friends.length;
  const onTrack       = friends.filter(f => f.status === "on-track").length;
  const needAttention = friends.filter(f => f.status === "overdue" || f.status === "almost due").length;

  const stats = [
    { value: total,           label: "Total Friends"           },
    { value: onTrack,         label: "On Track"                },
    { value: needAttention,   label: "Need Attention"          },
    { value: entries.length,  label: "Interactions This Month" },
  ];

  return (
    <div className="bg-[#f4f6f5] min-h-screen">
      <section className="bg-white border-b border-[#e6ede9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 text-center">
          <h1
            className="font-extrabold text-[#1a2e22] leading-[1.12] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
          >
            Friends to keep close in your life
          </h1>
          <p className="mt-3 text-[#5a7a68] text-[15px] max-w-sm mx-auto leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <button className="mt-7 inline-flex items-center gap-2 bg-[#1a3a2a] hover:bg-[#122b1f] text-white text-[14px] font-semibold px-6 py-3 rounded-full transition-colors duration-200 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add a Friend
          </button>

          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#e6ede9] border border-[#e6ede9] rounded-2xl overflow-hidden mt-10 bg-white shadow-sm">
              {stats.map(({ value, label }) => (
                <div key={label} className="py-6 px-4 flex flex-col items-center gap-1">
                  <span className="text-[2.2rem] font-extrabold text-[#1a2e22] leading-none">{value}</span>
                  <span className="text-[11.5px] font-semibold text-[#5a7a68] uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[1.35rem] font-extrabold text-[#1a2e22]">Your Friends</h2>
            <p className="text-[13px] text-[#5a7a68] mt-0.5">Click a card to view details and log interactions</p>
          </div>
          {!loading && <span className="text-[13px] text-[#5a7a68] font-medium">{friends.length} friends</span>}
        </div>
        {loading ? <Spinner /> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map(f => <FriendCard key={f.id} friend={f} />)}
          </div>
        )}
      </section>
    </div>
  );
}
