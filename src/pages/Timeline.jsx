import { useState } from "react";
import { useTimeline } from "../context/TimelineContext";

const typeConfig = {
  Call:  { icon: "/icon-call.png",  bg: "bg-amber-50",  ring: "ring-amber-200"  },
  Text:  { icon: "/icon-text.png",  bg: "bg-slate-50",  ring: "ring-slate-200"  },
  Video: { icon: "/icon-video.png", bg: "bg-purple-50", ring: "ring-purple-200" },
};

export default function Timeline() {
  const { entries } = useTimeline();
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder]       = useState("newest");

  const filtered = entries
    .filter(e => activeFilter === "All" || e.type === activeFilter)
    .sort((a, b) => sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp);

  return (
    <div className="bg-[#f4f6f5] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10">
        <h1 className="text-[1.75rem] font-extrabold text-[#1a2e22] mb-6">Timeline</h1>

        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-[#e6ede9] px-5 py-3 flex items-center justify-between mb-3"
          style={{ boxShadow: "0 1px 3px rgba(26,58,42,0.05)" }}>
          <span className="text-[13px] font-semibold text-[#5a7a68]">Filter timeline</span>
          <div className="flex items-center gap-2">
            <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)}
              className="text-[12.5px] border border-[#d4e4db] rounded-full px-3 py-1.5 bg-white text-[#1a2e22] font-medium focus:outline-none">
              <option value="All">All Types</option>
              <option value="Call">Call</option>
              <option value="Text">Text</option>
              <option value="Video">Video</option>
            </select>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}
              className="text-[12.5px] border border-[#d4e4db] rounded-full px-3 py-1.5 bg-white text-[#1a2e22] font-medium focus:outline-none">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-[#e6ede9] flex flex-col items-center justify-center py-20 gap-3 text-center">
            <p className="text-[#1a2e22] font-semibold text-[14px]">No interactions yet</p>
            <p className="text-[#a0b8ac] text-[12.5px]">Go to a friend's page and log a Call, Text, or Video.</p>
          </div>
        )}

        {/* List */}
        {filtered.length > 0 && (
          <div className="bg-white rounded-xl border border-[#e6ede9] overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(26,58,42,0.05)" }}>
            {filtered.map((entry, i) => {
              const cfg = typeConfig[entry.type] || typeConfig.Call;
              return (
                <div key={entry.id}
                  className={`flex items-center gap-4 px-5 py-[13px] ${i < filtered.length - 1 ? "border-b border-[#f0f5f2]" : ""}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ring-1 ${cfg.bg} ${cfg.ring}`}>
                    <img src={cfg.icon} alt={entry.type} className="w-[15px] h-[15px] object-contain" />
                  </div>
                  <div>
                    <p className="text-[13.5px] leading-snug">
                      <span className="font-bold text-[#1a2e22]">{entry.type}</span>
                      <span className="text-[#5a7a68]"> with {entry.friendName}</span>
                    </p>
                    <p className="text-[11.5px] text-[#a0b8ac] mt-0.5">{entry.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
