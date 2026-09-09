import { Eyebrow } from "../Ui/Ui";

export default function Welcome() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 max-w-4xl mx-auto text-center">
      <Eyebrow>Welcome</Eyebrow>
      <p className="text-4xl md:text-5xl text-[var(--gold-deep)] font-script">
        With joyful hearts
      </p>
      <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed font-display">
        We are so excited to celebrate our special day with the people we love
        most. Every quiet moment, every long laugh, every small kindness brought
        us here — and we cannot imagine doing it without you.
      </p>
    </section>
  );
}
