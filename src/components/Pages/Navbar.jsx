import { useEffect, useState } from "react";
import Logo from "../../assets/MuyiwaLogo-2.svg";

const links = [
  { label: "Story", id: "story" },
  { label: "Details", id: "details" },
  { label: "Gallery", id: "gallery" },
  { label: "Registry", id: "registry" },
  { label: "Cash Gift", id: "cashgift" },
  { label: "Our Promise", id: "promise" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("story");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = links.map((item) => document.getElementById(item.id));

      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        if (!section) continue;

        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActive(section.id);
        }
      }
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      setOpen(false);
    }, 250);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/65 backdrop-blur-2xl shadow-xl border-b border-white/10 py-2"
          : "bg-black/20 backdrop-blur-xl border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="font-script text-2xl text-[var(--gold-deep)] transition hover:scale-105"
        >
          <img src={Logo} alt="Wedding Logo" className="w-20 h-8" />
          {/* A &amp; O */}
        </button>

        {/* Desktop */}

        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em]">
          {links.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative transition-all duration-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:h-px after:bg-[var(--gold)] after:transition-all after:duration-300
              ${
                active === item.id
                  ? "text-[var(--gold)] after:w-full"
                  : "text-white/50 hover:text-[var(--gold)] after:w-0 hover:after:w-full"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile button */}

        <button
          className="md:hidden text-[var(--ivory)] text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Backdrop */}

        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/50 backdrop-blur-md md:hidden transition-all duration-500 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />

        {/* Mobile Menu */}

        <div
          className={`fixed top-0 right-0 h-screen w-72 bg-black/90 backdrop-blur-3xl border-l border-white/10 shadow-2xl flex flex-col justify-center items-end px-10 gap-10 md:hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {links.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative text-sm uppercase tracking-[0.35em] transition-all duration-300 after:absolute after:left-0 after:-bottom-2 after:h-px after:bg-[var(--gold)] after:transition-all after:duration-300
              ${
                active === item.id
                  ? "text-[var(--gold)] after:w-full"
                  : "text-white/50 hover:text-[var(--gold)] after:w-0 hover:after:w-full"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
