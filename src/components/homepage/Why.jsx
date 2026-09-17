import AnimatedBox from "@/common/animation/AnimatedBox";
import React from "react";

const data = [
  {
    id: 1,
    title: "Structured Learning Approach",
    description:
      "Students gain foundational skills in creative leadership, social entrepreneurship, design thinking, and mindful activism.",
  },
  {
    id: 2,
    title: "Virtual Awareness Workshops with Real-World Impact",
    description:
      "Students witness real change in just a few weeks, transforming awareness into action.",
  },
  {
    id: 3,
    title: "Partnerships, Sponsorship, and CSR",
    description:
      "By creating impact, they become recognized changemakers in their communities.",
  },
  {
    id: 4,
    title: "Localized Resources and Impact Reporting",
    description:
      "Each project concludes with an impact assessment and a video report, documenting measurable outcomes.",
  },
];

const Why = () => {
  return (
    <AnimatedBox className="lg:bg-none bg-hero-gradient px-5 py-10 lg:py-16 overflow-hidden">
      <h2 className="text-[#1F2937] text-center max-w-3xl mx-auto text-[24px] lg:text-[32px] px-12 font-bold mb-2 lg:mb-5">
        Why - TribesforGOOD&apos;s School of Changemakers?
      </h2>
      <div className="max-w-6xl my-10 lg:my-20 flex gap-10 justify-between md:gap:12 flex-col lg:flex-row-reverse mx-auto">
        <div>
          {/* Mobile cards */}
          <div className="flex w-full md:hidden flex-col gap-5 items-center">
            {data.map((curr, i) => {
              return <CardMobile data={curr} i={i} key={i} />;
            })}
          </div>

          {/* Desktop cards */}
          <div className="hidden md:grid md:grid-cols-2 place-content-center w-max mx-auto lg:ml-auto gap-5">
            {data.map((curr, i) => {
              return <Card data={curr} i={i} key={i} />;
            })}
          </div>
        </div>

        {/* Side content */}
        <div className="max-w-xl">
          <div className="lg:hidden font-mulish text-muted">
            At TribesforGOOD we connect three critical groups: Non-profits,
            Social enterprises, and the Next generation of changemakers,
            creating powerful alliances to address pressing challenges.Our
            participants have earned prestigious awards like The Diana Award
            from 2022-2024, given TEDx talks, and collectively impacted over
            10,000+ lives.
          </div>
          <div className="w-full font-mulish text-[20px] leading-[36px] hidden lg:flex text-muted">
            <div className="tracking-wide">
              <p className="my-4 leading-7">
                At TribesforGOOD we connect three critical groups:{" "}
                <span className="text-[#1F2937]">
                  Non-profits, Social enterprises, and the Next generation of
                  changemakers
                </span>
                , creating powerful alliances to address pressing challenges.
              </p>
              <p className="my-4 leading-7">
                Offering experiential learning across{" "}
                <span className="text-[#1F2937]">10+ impactful themes</span>,
                our School of Changemakers blends conceptual learning with
                hands-on campaigns. These campaigns are curated with social
                impact organisations such that learners are empowered to take
                meaningful action and experience real-time results. These
                experiences leave learners not only skilled but inspired to
                continue making a difference in their communities long after the
                program ends! The impact created by TribesforGOOD participants
                have been recognized in many forums.
              </p>
              <p className="my-4 leading-7">
                Our participants have earned prestigious awards like The{" "}
                <span className="text-[#1F2937]">
                  Diana Award from 2022-2024, given TEDx talks, and collectively
                  impacted over 10,000+ lives.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBox>
  );
};

export default Why;

/* Mobile Card */
/* Mobile Card */
/* Mobile Card */
const CardMobile = ({ data, i }) => {
  return (
    <AnimatedBox
      // Only animate horizontally when >=350px
      initial={{ x: i % 2 === 0 ? -40 : 40 }}
      whileInView={{ x: 0 }}
    >
      <div
        className={`
          rounded-lg bg-[#FFFDF1] border border-gold size-64 p-5
          
          /* Apply zigzag only when >=350px */
          ${i % 2 === 0 ? "min-[350px]:-translate-x-10" : "min-[350px]:translate-x-10"}
        `}
      >
        <div className="w-[50px] h-[40px] mb-4 rounded-full flex bg-[#F1DD7466] items-center justify-center">
          <div className="w-[40px] text-raleway rounded-full font-extrabold text-[24px] h-[40px] flex bg-gold items-center justify-center">
            {data?.id}
          </div>
        </div>
        <div className="my-2 font-raleway font-bold text-[16px]">
          {data?.title}
        </div>
        <div className="font-mulish text-muted text-[14px]">
          {data?.description}
        </div>
      </div>
    </AnimatedBox>
  );
};


/* Desktop Card */
const Card = ({ data, i }) => {
  return (
    <AnimatedBox>
      <div
        className={`${
          i % 2 === 0 ? "-translate-y-5" : "translate-y-5"
        } rounded-lg bg-[#FFFDF1] border border-gold size-60 p-5`}
      >
        <div className="w-[50px] h-[50px] mb-5 rounded-full flex bg-[#F1DD7466] items-center justify-center">
          <div className="w-[40px] text-raleway rounded-full font-extrabold text-[24px] h-[40px] flex bg-gold items-center justify-center">
            {data?.id}
          </div>
        </div>
        <div className="font-raleway font-bold text-[16px]">
          {data?.title}
        </div>
        <div className="font-mulish text-muted text-[12px]">
          {data?.description}
        </div>
      </div>
    </AnimatedBox>
  );
};
