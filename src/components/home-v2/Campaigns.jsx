"use client";
import { useEffect, useState } from "react";
import { CARDS, CAMPAIGNS } from "./campaignData";
import ApplyButton from "./ApplyButton";

const Campaigns = () => {
  const [openKey, setOpenKey] = useState(null);
  const active = openKey ? CAMPAIGNS[openKey] : null;

  useEffect(() => {
    document.body.style.overflow = openKey ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpenKey(null);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openKey]);

  return (
    <section className="campaigns" id="campaigns">
      <div className="wrap">
        <h2>Could You Solve One Real Problem in Your City?</h2>
        <p className="sec-sub">
          Every campaign opens with a question that has no answer at the back of the book. You
          investigate the problem, speak to the people living it, build a solution and measure
          whether it worked.
        </p>

        <div className="cgrid">
          {CARDS.map((c) => (
            <div
              key={c.key}
              className="ccard"
              role="button"
              tabIndex={0}
              onClick={() => setOpenKey(c.key)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpenKey(c.key)}
            >
              <div className="cimg">
                <img src={c.img} alt={c.alt} loading="lazy" />
              </div>
              <div className="cbody">
                <div className="th" dangerouslySetInnerHTML={{ __html: c.theme }} />
                <div className="q">{c.hook}</div>
                <div className="mr">
                  <span>Learn more &rarr;</span>
                  <div className="spots">
                    <span className="dot" />
                    {c.spots}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className="modal-bg open" onClick={(e) => e.target === e.currentTarget && setOpenKey(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={active.title}>
            <button className="modal-x" onClick={() => setOpenKey(null)} aria-label="Close">
              &times;
            </button>
            <div className="th">{active.theme}</div>
            <h3>{active.title}</h3>
            <p className="d">{active.desc}</p>

            <div className="blk">
              <b>What the student investigates</b>
              <ul>
                {active.examines.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="blk qs">
              <b>Questions this campaign opens</b>
              <ul>
                {active.questions.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="mc">
              <ApplyButton beforeOpen={() => setOpenKey(null)}>Apply</ApplyButton>
              <a className="btn btn-line" href="#programmes" onClick={() => setOpenKey(null)}>
                See the Programme
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Campaigns;
