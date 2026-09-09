// import { useState } from "react";
// import { Eyebrow, SectionTitle } from "../Ui/Ui";

// const GIFTS = [
//   { id: "g1", name: "KitchenAid Stand Mixer", description: "For Sunday mornings and shared aprons.", price: "$449", image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=800", url: "https://amazon.com" },
//   { id: "g2", name: "Le Creuset Dutch Oven", description: "Cast-iron heirloom for slow afternoons.", price: "$380", image: "https://images.unsplash.com/photo-1585670210693-ec0c5b4f0d76?w=800", url: "https://amazon.com" },
//   { id: "g3", name: "Egyptian Cotton Linens", description: "Soft sheets for soft landings.", price: "$220", image: "https://images.unsplash.com/photo-1592789705501-f9ae4287c4cf?w=800", url: "https://etsy.com" },
//   { id: "g4", name: "Crystal Champagne Flutes", description: "Set of six — for every toast.", price: "$140", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800", url: "https://amazon.com" },
//   { id: "g5", name: "Smart Espresso Machine", description: "Because forever begins with a cup.", price: "$799", image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800", url: "https://jumia.com.ng" },
//   { id: "g6", name: "Weekender Travel Set", description: "For the honeymoon and beyond.", price: "$520", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", url: "https://etsy.com" },
// ];

// export default function Registry() {
//   const [bought, setBought] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("purchased") || "{}");
//     } catch {
//       return {};
//     }
//   });
//     const buy = (g) => {
//     const next = { ...bought, [g.id]: true };
//     setBought(next);
//     localStorage.setItem("purchased", JSON.stringify(next));
//     window.open(g.url, "_blank", "noopener,noreferrer");
//     };
//     return (
//     <section id="registry" className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ivory)]">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16"><Eyebrow>With gratitude</Eyebrow><SectionTitle>Gift Registry</SectionTitle></div>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {GIFTS.map((g) => {
//             const taken = bought[g.id];
//             return (
//               <div key={g.id} className="group rounded-2xl overflow-hidden bg-white border border-[var(--gold)]/20 shadow-sm hover:shadow-[var(--shadow-luxe)] transition">
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img src={g.image} alt={g.name} className={`w-full h-full object-cover group-hover:scale-105 transition duration-700 ${taken ? "grayscale opacity-60" : ""}`} />
//                   {taken && <div className="absolute top-3 right-3 bg-[var(--ink)] text-[var(--gold)] text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full">Purchased</div>}
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between gap-4 mb-2">
//                     <h3 className="text-xl font-light font-display">{g.name}</h3>
//                     <span className="text-sm text-[var(--gold-deep)] font-medium">{g.price}</span>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-5">{g.description}</p>
//                   <button disabled={taken} onClick={() => buy(g)} className="w-full py-3 text-[11px] tracking-[0.35em] uppercase border border-[var(--gold)] text-[var(--gold-deep)] hover:bg-[var(--gold)] hover:text-white disabled:opacity-50">
//                     {taken ? "Already gifted" : "Gift this"}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
