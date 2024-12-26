import ContactUsForm from "@/components/frontend/ContactUsForm";
import Footer from "@/components/frontend/Footer";
import Hero from "@/components/frontend/Hero";
import Nav from "@/components/frontend/Nav";
import Products from "@/components/frontend/Product";
import ShowAll from "@/components/frontend/Trust";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[100vw] flex flex-col ">
      <Nav />
      <Hero />
      {/* <ShowAll /> */}
      <div className="w-[100vw]">
        <Products />
      </div>
      <ContactUsForm />
      <Footer />
    </div>
  );
}
