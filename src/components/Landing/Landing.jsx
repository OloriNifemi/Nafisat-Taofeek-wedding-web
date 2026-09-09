import Confetti from "../Pages/Confetti";
import Navbar from "../Pages/Navbar";
import Hero from "../Pages/Hero";
// import Welcome from "../Pages/Welcome";
import Story from "../Pages/Story";
import Details from "../Pages/Details";
import GettingThere from "../Pages/GettingThere";
import Gallery from "../Pages/Gallery";
import Registry from "../Pages/Registry";
import Wishes from "../Pages/Wishes";
import Conatact from "../Pages/Contact";
import Footer from "../Pages/Footer";
import BackToTop from "../Pages/BackToTop";
import CashGift from "../Pages/CashGift";
import Promise from "../Pages/Promise";


export default function Landing() {
  return (
    <main className="bg-[var(--ivory)] text-[var(--ink)]">
      <Confetti/>
      <Navbar/>
      <Hero />
      {/* <Welcome /> */}
      <Story />
      <Details />
      <GettingThere />
      <Gallery />
      <Registry />
      <CashGift />
      <Wishes />
      <Promise />
      <Conatact />
      <Footer />
      <BackToTop />
    </main>
  );
}


