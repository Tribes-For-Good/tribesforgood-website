const Difference = () => (
  <section style={{background: 'var(--soft)'}}>
    <div className="wrap">
      <h2 style={{textTransform: 'uppercase'}}><span className="hl">What Makes Us Different</span></h2>
      <p className="sec-sub">Volunteering and Tribes for GOOD are not the same thing. One puts in hours. The other builds a story.</p>
      <div className="vs">
        <div className="vs-h l">Typical Volunteering</div>
        <div className="vs-h r">Tribes for GOOD</div>

        <div className="vs-c l"><span className="ic">✕</span> You show up and participate</div>
        <div className="vs-c r"><span className="ic">✓</span> You design, lead and own a real project</div>

        <div className="vs-c l"><span className="ic">✕</span> A cause someone else assigned</div>
        <div className="vs-c r"><span className="ic">✓</span> A problem you chose to work on</div>

        <div className="vs-c l"><span className="ic">✕</span> Hours logged on a certificate</div>
        <div className="vs-c r"><span className="ic">✓</span> Outcomes you measured yourself</div>

        <div className="vs-c l"><span className="ic">✕</span> "I helped out at an NGO"</div>
        <div className="vs-c r"><span className="ic">✓</span> A documented impact report with your name on it</div>

        <div className="vs-c l"><span className="ic">✕</span> A generic recommendation letter</div>
        <div className="vs-c r"><span className="ic">✓</span> A mentor-authored Letter of Recommendation</div>

        <div className="vs-c l"><span className="ic">✕</span> The same story as every other applicant</div>
        <div className="vs-c r"><span className="ic">✓</span> A university story admissions officers haven't heard</div>
      </div>
    </div>
  </section>
);

export default Difference;
