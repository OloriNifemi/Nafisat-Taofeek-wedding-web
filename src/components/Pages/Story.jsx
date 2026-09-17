import { Eyebrow, SectionTitle } from "../Ui/Ui";
import Img1 from "../../assets/MuyiwaEtDebbyImg13.webp";
import Img2 from "../../assets/MuyiwaEtDebbyImg6.webp";
import Img4 from "../../assets/Proposal.webp";
import { motion } from "framer-motion";

const STORY = [
  {
    title: "Where it began",
    text: " They say a journey of a thousand miles begins with a single step, and ours began at Adekunle Ajasin University. What started with two people who were barely friends gradually grew into a beautiful friendship, and eventually into a love we now proudly call Together forever. From the very first time I met Nafisat, something in my heart told me she was the woman of my dreams. And as they say, when you find your dream, you pursue it until it becomes your reality. We first met at the Senate Building, during registration screening.. From attending classes together to sharing conversations and spending quality time with one another, our friendship grew naturally. With every moment we shared, we became closer, and the bond between us grew stronger. ",
    img: Img1,
    scale: "100%",
  },
  {
    title: "First Date",
    text: "  After spending so much time together at university, our first date came during our semester holiday. We chose to escape the routine, visit the beach, and simply enjoy each other’s company. It was a beautiful day filled with laughter, meaningful conversations, and precious moments that brought us even closer.It was more than our first date, it was the beginning of many beautiful memories we would create together. ",
    img: Img2,
    scale: "100%",
  },
  {
    title: "The proposal",
    text: " Our proposal was simple, intimate, and beautiful surrounded by a few close friends, good food, laughter, and unforgettable moments. But beneath all the celebration was something much more meaningful: the most important question of my life, and she said yes.Today, we celebrate the love that began with a simple step and has brought us to together forever. And we are truly happy to have you here to celebrate this beautiful chapter with us. ❤️",
    img: Img4,
    scale: "100%",
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
          It has been a beautiful year of friendship, love, growth, and unforgettable memories.
          What began as a simple connection has blossomed into a love built on friendship, understanding, laughter, and shared dreams. 
          Today, we celebrate not just where we are, but the journey that brought us here. 
          We are deeply grateful to our beautiful family and friends for sharing in this special chapter of our lives.
          Ourjourney has brought us here, and we can’t wait to begin forever together.
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
                      className="w-full h-full "
                    >
                      <img
                        src={s.img}
                        alt={s.title}
                        className="w-full h-full transition-transform duration-[1800ms] ease-out hover:scale-105 object-cover"
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
