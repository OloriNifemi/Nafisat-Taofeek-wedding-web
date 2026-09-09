import { Eyebrow, SectionTitle } from "../../components/Ui/Ui";

export default function Contact() {
  const items = [
    { name: "Esther", contact: "+234 818 497 2312" },
    { name: "Tifeh Events ", contact: "+234 703 855 3990" },
    { name: "Stephen ", contact: "+234 9165529870" },
  ];
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ink)] text-white"
    >
      <div className="max-w-5xl mx-auto text-center">
        <Eyebrow>Get in touch</Eyebrow>
        <SectionTitle dark>Contact</SectionTitle>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {items.map((c) => (
            <div
              key={c.contact}
              className="rounded-2xl border border-[var(--gold)]/30 bg-white/5 backdrop-blur p-8"
            >
              {/* <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">{c.role}</p> */}
              <p className="text-2xl font-light font-display mb-4">{c.name}</p>
              <a
                href={`tel:${c.contact}`}
                className="block text-sm text-white/80 hover:text-[var(--gold)]"
              >
                {c.contact}
              </a>
              {/* <a href={`mailto:${c.email}`} className="block text-sm text-white/80 hover:text-[var(--gold)] mt-1">{c.email}</a> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
