import Countdown from "../Pages/CountDown";
import Logo from "../../assets/MuyiwaLogo-1.svg";
// import { BRIDE, GROOM, HASHTAG } from "../Pages/Wedding";
import HeroImg from "../../assets/MuyiwaEtDebbyImg15.jpg";

// Centralize target IDs here — update STORY_SECTION_ID to match whatever
// id the "Our Story" section actually uses (check that file if this still
// doesn't scroll after the fix).
const STORY_SECTION_ID = "story";
const CONTACT_SECTION_ID = "contact";
const SCROLL_OFFSET = 80; // adjust to match your sticky header's height, or 0 if none

function smoothScrollTo(id) {
  return (e) => {
    const el = document.getElementById(id);
    if (!el) {
      // Section not found on the page — most likely the id doesn't match.
      console.warn(`smoothScrollTo: no element with id="${id}" found.`);
      return;
    }
    e.preventDefault();
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <img
        src={HeroImg}
        alt="Wedding-Hero-Image"
        className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <p className="text-white text-xl md:text-2xl mb-4 font-script">
          We're getting married
        </p>

        <div className="flex items-center gap-4 md:gap-8 mb-6">
          <span className="h-px w-16 md:w-32 bg-[var(--gold)]/70" />
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white">
            Save the date
          </span>
          <span className="h-px w-16 md:w-32 bg-[var(--gold)]/70" />
        </div>

        <img src={Logo} alt="Wedding Logo" className="size-240" />

        <p className="mt-8 text-white/80 tracking-[0.4em] uppercase text-xs md:text-sm">
          12 · 09 · 2026 · Lagos, Nigeria
        </p>

        <div className="mt-12 w-full flex justify-center cursor-pointer">
          <Countdown />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`#${STORY_SECTION_ID}`}
            onClick={smoothScrollTo(STORY_SECTION_ID)}
            className="px-10 py-4 text-xs tracking-[0.35em] uppercase rounded-md 
            text-[var(--ink)] bg-[var(--ivory)] 
            transition-all duration-500 ease-out 
            hover:bg-[var(--gold-deep)] hover:text-white 
            hover:-translate-y-0.5 hover:shadow-xl"
          >
            Our Story
          </a>

          <a
            href={`#${CONTACT_SECTION_ID}`}
            onClick={smoothScrollTo(CONTACT_SECTION_ID)}
            className="px-10 py-4 text-xs tracking-[0.35em] uppercase rounded-md 
            text-white border border-white/40 
            transition-all duration-500 ease-out 
            hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-white/5 
            hover:-translate-y-0.5 hover:shadow-xl"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
