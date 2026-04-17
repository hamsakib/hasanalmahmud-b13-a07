import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f4f6f5] min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-6xl mb-4">🙈</p>
      <h1 className="text-[2rem] font-extrabold text-[#1a2e22] mb-2">Page Not Found</h1>
      <p className="text-[#5a7a68] text-[15px] mb-8">The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/")}
        className="bg-[#1a3a2a] hover:bg-[#122b1f] text-white font-semibold px-6 py-3 rounded-full transition-colors">
        Back to Home
      </button>
    </div>
  );
}
