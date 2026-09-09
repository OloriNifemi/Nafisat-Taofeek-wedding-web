import { Eyebrow, SectionTitle } from "../Ui/Ui";
import Img1 from "../../assets/MuyiwaEtDebbyImg13.jpeg";
import Img2 from "../../assets/MuyiwaEtDebbyImg6.jpeg";
import Img4 from "../../assets/Proposal.jpeg";
import { motion } from "framer-motion";

const STORY = [
  {
    title: "Where it began",
    text: "We met at the University of Lagos while pursuing our MBA, brought together by study sessions, exam preparations, and the shared determination to succeed. What started as friendship grew naturally as we discovered shared values, common dreams, and an effortless connection that extended far beyond the classroom. Somewhere between the lectures, case studies, and countless conversations, friendship blossomed into love. Today, we’re grateful that a journey that began as classmates has led us here.",
    img: Img1,
    scale: "100%",
  },
  {
    title: "First Date",
    text: "  After sharing moments at the beach and over lunch with mutual friends, our first private outing was an ice cream date. ",
    img: Img2,
    scale: "100%",
  },
  {
    title: "The proposal",
    text: "It was just the two of us, sharing a beautiful evening together. We cooked dinner, laughed, and enjoyed good food while soft music played in the background, completely unaware that the night was about to become one we'd cherish forever. After dinner, I asked her to check her email. Waiting in her inbox was a letter from me. As she read each line, I quietly reached for the ring. Before she got to the final paragraph, I was ready to ask the most important question of my life.In that moment, an ordinary evening became the beginning of our forever.",
    img: Img4,
    scale: "70%",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideLeft = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const slideRight = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

export default function Story() {
  return (
    <section
      id="story"
      className="overflow-x-hidden py-24 md:py-32 px-6 md:px-10 max-w-6xl mx-auto scroll-mt-20"
    >
      <motion.div
        className="text-center mb-16 md:mb-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Eyebrow>Our Journey</Eyebrow>
        <SectionTitle>Our Love Story</SectionTitle>
        <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed font-display">
          We are so excited to celebrate our special day with the people we love
          most. Every quiet moment, every long laugh, every small kindness
          brought us here, and we cannot imagine doing it without you.
        </p>
      </motion.div>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--gold)]/50 to-transparent" />{" "}
        <div className="space-y-16 md:space-y-24">
          {STORY.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className="relative grid md:grid-cols-2 gap-8 items-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ staggerChildren: 0.2 }}
              >
                <motion.div
                  variants={fadeUp}
                  className={`text-center md:text-left ${
                    left ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"
                  }`}
                >
                  <p className="text-xs tracking-[0.35em] uppercase text-[var(--gold-deep)] mb-3">
                    {s.date}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-light mb-4 font-display">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{s.text}</p>
                </motion.div>
                <motion.div
                  variants={left ? slideRight : slideLeft}
                  className={`flex justify-center md:block ${
                    left ? "md:order-2 md:pl-16" : "md:pr-16"
                  }`}
                >
                  <div className="w-full max-w-sm md:max-w-none aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-luxe)]">
                    <div
                      className={`w-full h-full ${
                        i === 2 ? "p-4 bg-[#f5f2ed]" : ""
                      }`}
                    >
                      <img
                        src={s.img}
                        alt={s.title}
                        className={`w-full h-full transition-transform duration-[1800ms] ease-out hover:scale-105 ${
                          i === 2 ? "object-contain" : "object-cover"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
