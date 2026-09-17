"use client";
import { useEffect, useState } from "react";

const SETS = [
  [
    ["11,500+", "Changemakers across 15+ countries"],
    ["71,500+", "Hours of documented social impact work"],
    ["100+", "Partner schools across India & the Middle East"],
  ],
  [
    ["The Diana Award", "Recipients 2022\u20132024"],
    ["5+", "TEDx student speakers"],
    ["Top Universities", "TFG alumni study across the globe"],
  ],
];

const Stats = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SETS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="stats">
      <div className="wrap">
        <div className="stat-stage">
          {SETS.map((set, n) => (
            <div key={n} className={"stat-set" + (n === i ? " on" : "")}>
              {set.map(([big, small]) => (
                <div className="stat" key={big}>
                  <b>{big}</b>
                  <span>{small}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
