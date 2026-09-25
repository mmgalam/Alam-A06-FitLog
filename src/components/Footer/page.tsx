import Image from "next/image";
import Link from "next/link";
import FooterLogo from "@/assets/FooterLogo.png";
import { oswald } from "@/app/layout";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="">
      <div className="container mx-auto py-10 flex justify-between">
        <Link href="/" className="flex gap-2">
          <Image src={FooterLogo} alt="Footer Logo" />
          <span className={`${oswald.className}`}>FITLOG</span>
        </Link>
        <p className="flex items-center gap-2 text-[#6B7280]"><FaRegCopyright /> 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </div>
  );
};

export default Footer;
