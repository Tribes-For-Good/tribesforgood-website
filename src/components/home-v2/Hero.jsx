"use client";
import { useEffect, useState } from "react";

export const FACTS = [
  <>Urban cities will heat <b>45% faster</b> than rural India.</>,
  <><b>One in three</b> young people will battle loneliness.</>,
  <>A gig worker will earn <b>less than the bare minimum</b> on most days.</>,
  <>Youth shape <b>70%</b> of digital trends, but hold <b>0%</b> of tech governance.</>,
  <><b>99% of microfinance borrowers</b> will still be women.</>,
];

const Hero = ({ facts = FACTS }) => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % facts.length), 3400);
    return () => clearInterval(t);
  }, [facts]);

  return (
    <section className="dyk">
      <div className="bg-media">
        <img src="/assets/home-v2/asset-aad5c4f2.jpg" alt="" />
        <video
          className="hero-vid"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/home-v2/asset-6087d2e8.jpg"
        >
          <source src="/assets/home-v2/asset-88578598.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="wrap">
        <h2 style={{ textTransform: "uppercase" }}>
          What if your classroom <em>was</em> the real world?
        </h2>
        <div className="by">By 2030 -</div>
        <div className="ticker">
          {facts.map((f, n) => (
            <div key={n} className={"tick" + (n === i ? " on" : "")}>
              <span>{f}</span>
            </div>
          ))}
        </div>
        <div className="real">
          <span className="rl">Real issues. Real people. Real learning.</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
