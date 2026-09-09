// import { useEffect, useRef, useState } from "react";
// import Image from "../../assets/MuyiwaEtDebbyImg8.jpeg";
// import { GROOM, BRIDE } from "../Pages/Wedding";

// const LINES = [
//   "Two souls, one direction.",
//   "What God has joined, let love hold.",
//   "Every heartbeat, a promise kept.",
//   "Not the end of a search, it's the beginning of forever.",
// ];

// export default function RSVP() {
//   const [activeLine, setActiveLine] = useState(0);
//   const sectionRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   // Start / stop the ticker based on visibility
//   useEffect(() => {
//     if (!isVisible) return;
//     const id = setInterval(
//       () => setActiveLine((prev) => (prev + 1) % LINES.length),
//       3000
//     );
//     return () => clearInterval(id);
//   }, [isVisible]);

//   // IntersectionObserver to pause when scrolled away
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsVisible(entry.isIntersecting),
//       { threshold: 0.4 }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="rsvp"
//       className="relative h-screen overflow-hidden"
//     >
//       {/* Background image */}
//       <img
//         src={Image}
//         alt={`${GROOM} & ${BRIDE}`}
//         className="absolute inset-0 h-full w-full object-cover object-[center_28%] select-none pointer-events-none"
//       />

//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5" />

//       {/* Bottom content */}
//       <div className="relative z-10 flex h-full items-end justify-center px-6 pb-16 md:pb-24">
//         <div className="w-full max-w-2xl text-center">

//           {/* Gold rule */}
//           <div className="mb-8 flex items-center justify-center gap-4">
//             <span className="h-px w-16 bg-[var(--gold)]/70" />
//             <span className="text-lg text-[var(--gold)]">✦</span>
//             <span className="h-px w-16 bg-[var(--gold)]/70" />
//           </div>

//           {/*
//             Fixed-height stage — lines are absolute so they never
//             push each other around or cause layout shift.
//           */}
//           <div className="relative h-20 md:h-24 mb-10">
//             {LINES.map((line, index) => (
//               <p
//                 key={line}
//                 className="
//                   absolute inset-0
//                   flex items-center justify-center
//                   font-display font-light
//                   text-2xl md:text-4xl
//                   text-white
//                   transition-all duration-1000 ease-in-out
//                 "
//                 style={{
//                   opacity: index === activeLine ? 1 : 0,
//                   transform: index === activeLine
//                     ? "translateY(0)"
//                     : index < activeLine
//                     ? "translateY(-12px)"
//                     : "translateY(12px)",
//                   pointerEvents: index === activeLine ? "auto" : "none",
//                 }}
//               >
//                 {line}
//               </p>
//             ))}
//           </div>

//           {/* Progress dots */}
//           <div className="mb-10 flex justify-center gap-2">
//             {LINES.map((_, i) => (
//               <button
//                 key={i}
//                 aria-label={`Line ${i + 1}`}
//                 onClick={() => setActiveLine(i)}
//                 className="transition-all duration-500"
//                 style={{
//                   width: i === activeLine ? "24px" : "6px",
//                   height: "6px",
//                   borderRadius: "9999px",
//                   background: i === activeLine
//                     ? "var(--gold)"
//                     : "rgba(255,255,255,0.35)",
//                 }}
//               />
//             ))}
//           </div>

//           {/* Couple names */}
//           <h2 className="font-display text-4xl md:text-6xl font-light text-white tracking-wide">
//             {GROOM}
//             <span className="mx-3 text-[var(--gold)]">&amp;</span>
//             {BRIDE}
//           </h2>

//         </div>
//       </div>
//     </section>
//   );
// }
