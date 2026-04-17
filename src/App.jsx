import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TimelineProvider } from "./context/TimelineContext";
import Navbar    from "./components/Navbar";
import Footer    from "./components/Footer";
import Home        from "./pages/Home";
import FriendDetail from "./pages/FriendDetail";
import Timeline    from "./pages/Timeline";
import Stats       from "./pages/Stats";
import NotFound    from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <TimelineProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"           element={<Home />}         />
              <Route path="/friend/:id" element={<FriendDetail />} />
              <Route path="/timeline"   element={<Timeline />}     />
              <Route path="/stats"      element={<Stats />}        />
              <Route path="*"           element={<NotFound />}     />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </TimelineProvider>
    </BrowserRouter>
  );
}
