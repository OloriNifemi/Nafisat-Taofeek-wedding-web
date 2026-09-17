import { BRIDE, GROOM } from "../Pages/Wedding";
import Logo from "../../assets/MuyiwaLogo-2.png";

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] border-t border-[var(--gold)]/20 py-12 text-center flex justify-center items-center flex-col">
      <img
        src={Logo}
        alt={`${GROOM} & ${BRIDE}`}
       className="w-[250px] h-[250] md:w-[500px] md:h-[500px] object-contain"
      />
      <p className="mt-6 text-white/50 md:text-xs text-[8px]">
        Built by{" "}
        <a
          href="https://gravatar.com/gloriousdelectably1f143b5226?utm_source=qr"
          className="border-[var(--gold)] border-b hover:text-[var(--ivory)]"
        >
          OloriTechSis
        </a>
      </p>
    </footer>
  );
}
