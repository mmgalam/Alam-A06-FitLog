import Image from "next/image";
import Link from "next/link";
import BannarImg from "@/assets/banner.png";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
});

const Banner = () => {
  return (
    <section className="container mx-auto my-8 px-4 sm:my-10">
      <div className="flex min-h-125 flex-col-reverse items-center justify-between gap-10 rounded-2xl bg-[#15171D] px-6 py-10 sm:px-10 lg:flex-row lg:px-14">

        {/* Content */}
        <div className="w-full lg:w-1/2">

          {/* Eyebrow */}
          <p className="mb-3 text-sm font-semibold tracking-[3px] text-[#C2F800]">
            WORKOUT LIBRARY
          </p>

          {/* Heading */}
          <h1
            className={`${oswald.className} text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl`}
          >
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* CTA */}
          <Link
            href="#library"
            className="mt-7 inline-flex items-center rounded-md bg-[#C2F800] px-6 py-3 font-bold text-black transition hover:bg-[#b5eb00]"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        {/* Image */}
        <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
          <Image
            src={BannarImg}
            alt="FitLog workout banner"
            className="w-full max-w-md rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;