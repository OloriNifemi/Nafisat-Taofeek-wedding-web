import { useState } from "react";
import { Eyebrow, SectionTitle } from "../Ui/Ui";
import Img1 from "../../assets/MuyiwaEtDebbyImg1.jpeg";
import Img2 from "../../assets/MuyiwaEtDebbyImg2.jpeg";
import Img3 from "../../assets/MuyiwaEtDebbyImg3.jpeg";
import Img4 from "../../assets/MuyiwaEtDebbyImg4.jpeg";
import Img7 from "../../assets/MuyiwaEtDebbyImg7.jpeg";
import Img14 from "../../assets/MuyiwaEtDebbyImg14.jpeg";
import Img9 from "../../assets/MuyiwaEtDebbyImg9.jpeg";
import Img10 from "../../assets/MuyiwaEtDebbyImg10.jpeg";
import Img11 from "../../assets/MuyiwaEtDebbyImg11.jpeg";
import Img12 from "../../assets/MuyiwaEtDebbyImg12.jpeg";
import Img13 from "../../assets/MuyiwaEtDebbyImg13.jpeg";
import Img15 from "../../assets/MuyiwaEtDebbyImg15.jpg";
import Img16 from "../../assets/MuyiwaEtDebbyImg16.jpeg";

const IMAGES = [
  {
    src: Img1,
    position: "center 25%",
    tall: true,
  },
  {
    src: Img13,
    position: "center top",
    tall: false,
  },
  {
    src: Img3,
    position: "center",
    tall: false,
  },
  {
    src: Img15,
    position: "center 35%",
    tall: true,
  },
  {
    src: Img14,
    position: "center center",
    tall: true,
  },
  {
    src: Img12,
    position: " center 70% ",
    tall: true,
  },
  {
    src: Img4,
    position: "top center ",
    tall: false,
  },
  {
    src: Img9,
    position: "center center",
    tall: false,
  },
  {
    src: Img2,
    position: "center 20%",
    tall: true,
  },
  {
    src: Img11,
    position: "center top",
    tall: false,
  },
  {
    src: Img7,
    position: "center center",
    tall: true,
  },
  {
    src: Img10,
    position: "top center",
    tall: true,
  },
  {
    src: Img16,
    position: "center 25%",
    tall: false,
  },
];

export default function Gallery() {
  const [open, setOpen] = useState(null);
  return (
    <section
      id="gallery"
      className="py-24 border-none md:py-32 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16 border-none">
        <Eyebrow>Moments</Eyebrow>
        <SectionTitle>Through Our Lens</SectionTitle>
      </div>
      <div className="grid grid-cols-2 border-none md:grid-cols-4 gap-2 md:gap-4 auto-rows-[170px] sm:auto-rows-[210px] md:auto-rows-[300px]">
        {IMAGES.map((image, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className={`group  relative overflow-hidden rounded-xl ${
              image.tall ? "row-span-2" : ""
            }`}
          >
            <img
              src={image.src}
              alt={`Wedding ${i + 1}`}
              style={{ objectPosition: image.position }}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 "
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
            <div className="absolute inset-0 pointer-events-none transition duration-500 group-hover:ring-1 group-hover:ring-inset group-hover:ring-[var(--gold)]/60" />{" "}
          </button>
        ))}
      </div>
      {open !== null && (
        <div
          className="fixed border-none inset-0 z-[90] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl border-none"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(null);
            }}
          >
            ×
          </button>
          <button
            className="absolute left-4 border-none text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + IMAGES.length - 1) % IMAGES.length);
            }}
          >
            ‹
          </button>
          <img
            src={IMAGES[open].src}
            alt="Gallery image"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            border-none
          />
          <button
            className="absolute right-4 border-none text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % IMAGES.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
