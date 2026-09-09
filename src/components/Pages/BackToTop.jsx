import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50
        flex h-11 w-11 md:h-14 md:w-14
        items-center justify-center
        rounded-full
        border border-[var(--gold)]/40
        bg-white/15
        backdrop-blur-xl
        shadow-lg
        text-[var(--gold)]
        transition-all duration-500
        hover:scale-110
        hover:bg-[var(--gold)]
        hover:text-white
        ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-10 opacity-0"
        }`}
    >
      <ChevronUp size={24} />
    </button>
  );
}
