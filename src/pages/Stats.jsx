import { useTimeline } from "../context/TimelineContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import friendsData from "../data/friends.json";

const PIE_COLORS = { Call: "#10b981", Text: "#3b82f6", Video: "#8b5cf6" };
const RADIAN = Math.PI / 180;

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function Stats() {
  const { entries } = useTimeline();

  const counts = { Call: 0, Text: 0, Video: 0 };
  entries.forEach(e => { if (counts[e.type] !== undefined) counts[e.type]++; });
  const pieData = Object.entries(counts).map(([name, value]) => ({ name, value })).filter(d => d.value > 0);

  const statusCounts = { overdue: 0, "almost due": 0, "on-track": 0 };
  friendsData.forEach(f => { if (statusCounts[f.status] !== undefined) statusCounts[f.status]++; });

  const totalInteractions = entries.length;
  const avgDays = friendsData.length > 0
    ? Math.round(friendsData.reduce((sum, f) => sum + f.days_since_contact, 0) / friendsData.length)
    : 0;

  return (
    <div className="bg-[#f4f6f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="mb-8">
          <h1 className="text-[1.75rem] font-extrabold text-[#1a2e22]">Friendship Analytics</h1>
          <p className="text-[#5a7a68] mt-1 text-[13px]">An overview of your friendship activity</p>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#e6ede9] border border-[#e6ede9] rounded-2xl overflow-hidden mb-8 bg-white"
          style={{ boxShadow: "0 1px 4px rgba(26,58,42,0.07)" }}>
          {[
            { label: "Total Friends",         value: friendsData.length,      color: "text-[#1a3a2a]" },
            { label: "Total Interactions",     value: totalInteractions,       color: "text-blue-600"  },
            { label: "Avg Days Since Contact", value: avgDays,                 color: "text-amber-600" },
            { label: "Overdue",                value: statusCounts["overdue"], color: "text-red-600"   },
          ].map(s => (
            <div key={s.label} className="py-6 px-4 text-center">
              <p className={`text-[2.1rem] font-extrabold leading-none ${s.color}`}>{s.value}</p>
              <p className="text-[11px] font-semibold text-[#5a7a68] uppercase tracking-wide mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl border border-[#e6ede9] p-7"
            style={{ boxShadow: "0 1px 4px rgba(26,58,42,0.06)" }}>
            <h2 className="text-[15px] font-bold text-[#1a2e22] mb-1">Interaction Breakdown</h2>
            <p className="text-[12.5px] text-[#5a7a68] mb-6">Distribution of calls, texts, and video chats</p>
            {pieData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-3">
                <p className="text-slate-400 text-sm font-medium text-center">No interactions logged yet.<br />Log a Call, Text, or Video to see the chart.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={105}
                    paddingAngle={3} dataKey="value" labelLine={false} label={CustomLabel}>
                    {pieData.map(entry => (
                      <Cell key={entry.name} fill={PIE_COLORS[entry.name] || "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} interaction${v !== 1 ? "s" : ""}`, n]}
                    contentStyle={{ borderRadius: "10px", fontSize: "13px", border: "1px solid #e2e8f0" }} />
                  <Legend iconType="circle" iconSize={10}
                    formatter={v => <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 600 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Friend Status */}
          <div className="bg-white rounded-2xl border border-[#e6ede9] p-7"
            style={{ boxShadow: "0 1px 4px rgba(26,58,42,0.06)" }}>
            <h2 className="text-[15px] font-bold text-[#1a2e22] mb-1">Friend Status Overview</h2>
            <p className="text-[12.5px] text-[#5a7a68] mb-6">How well you're keeping up with everyone</p>
            <div className="flex flex-col gap-5">
              {[
                { label: "On Track",   count: statusCounts["on-track"],  bar: "bg-emerald-500", tc: "text-emerald-700" },
                { label: "Almost Due", count: statusCounts["almost due"], bar: "bg-amber-400",   tc: "text-amber-600"  },
                { label: "Overdue",    count: statusCounts["overdue"],    bar: "bg-red-500",     tc: "text-red-600"    },
              ].map(({ label, count, bar, tc }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[13px] font-semibold text-[#1a2e22]">{label}</span>
                    <span className={`text-[13px] font-bold ${tc}`}>{count} / {friendsData.length}</span>
                  </div>
                  <div className="w-full bg-[#e6ede9] rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full transition-all duration-500 ${bar}`}
                      style={{ width: `${(count / friendsData.length) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 pt-6 border-t border-[#e6ede9]">
              <h3 className="text-[13px] font-bold text-[#1a2e22] mb-4">Interaction Totals</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: "Call",  bg: "bg-[#eaf5f0]", text: "text-[#1a3a2a]" },
                  { type: "Text",  bg: "bg-blue-50",   text: "text-blue-700"  },
                  { type: "Video", bg: "bg-purple-50", text: "text-purple-700"},
                ].map(({ type, bg, text }) => (
                  <div key={type} className={`${bg} rounded-xl p-4 text-center`}>
                    <p className={`text-[1.8rem] font-extrabold leading-none ${text}`}>{counts[type]}</p>
                    <p className={`text-[11px] font-semibold ${text} mt-1`}>{type}s</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 