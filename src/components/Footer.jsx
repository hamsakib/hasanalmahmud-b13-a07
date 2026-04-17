export default function Footer() {
  return (
    <footer className="bg-[#1a3a2a] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="py-12 flex flex-col items-center text-center gap-3">
          <p className="text-[1.9rem] font-extrabold tracking-tight leading-none">KeenKeeper</p>
          <p className="text-[13px] text-white/55 leading-relaxed max-w-[340px]">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mt-4 mb-2">
            Social Links
          </p>
          <div className="flex items-center gap-2.5">
            {[
              { src: "/icon-facebook.png",  alt: "Facebook"  },
              { src: "/icon-x.png",         alt: "X"         },
              { src: "/icon-instagram.png", alt: "Instagram" },
            ].map(({ src, alt }) => (
              <a
                key={alt}
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ background: "rgba(255,255,255,0.12)" }}
                onMouseEnter={e => e.currentTarget.style.background = "#2d6a4f"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              >
                <img src={src} alt={alt} className="w-[16px] h-[16px] object-contain brightness-0 invert" />
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/35">
          <p>© {new Date().getFullYear()} keenkeeper. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors">Donate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
