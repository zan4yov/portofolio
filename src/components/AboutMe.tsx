import React from "react";
import profilePhoto from "@/assets/profile-2.jpeg"; // ✅ pakai foto lokal kamu

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 mt-10"
    >
      <div className="rounded-2xl border border-[#7B61FF]/40 bg-black/40 backdrop-blur-md p-10 shadow-[0_0_25px_rgba(123,97,255,0.3)] hover:shadow-[0_0_40px_rgba(123,97,255,0.5)] transition-all duration-500">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text Section */}
          <div>
            <p className="text-gray-300 leading-relaxed text-lg">
              I’m{" "}
              <span className="text-[#7B61FF] font-semibold">
                Razan Widya Reswara
              </span>
              , an informatics engineering student who focuses heavily on
              objectivity and rationality, always prioritizing effectiveness
              over social harmony. I am highly imaginative and open-minded,
              often exploring hidden meanings and long-term possibilities. I
              maintain a calm and confident demeanor, remaining composed and
              resilient to stress in stressful situations.
            </p>

            <div className="mt-10 flex flex-wrap gap-10 text-center">
              <div>
                <p className="text-3xl font-bold text-[#7B61FF]">5+</p>
                <p className="text-gray-400 text-sm">Projects Finished</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#7B61FF]">1+</p>
                <p className="text-gray-400 text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#7B61FF]">3.58/4.00</p>
                <p className="text-gray-400 text-sm">GPA</p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center">
            <div className="relative w-72 h-96 md:w-80 md:h-[26rem] rounded-2xl border border-[#7B61FF]/40 bg-gradient-to-br from-[#7B61FF]/20 to-transparent backdrop-blur-sm shadow-[0_0_35px_rgba(123,97,255,0.3)] hover:shadow-[0_0_50px_rgba(123,97,255,0.5)] transition-all duration-500">
              <img
                src={profilePhoto}
                alt="Razan Widya Reswara"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-95"
              />
              <div className="absolute bottom-0 w-full bg-black/70 text-center py-2 rounded-b-2xl">
                <p className="text-[#7B61FF] font-semibold">
                  Computer Science Student
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
