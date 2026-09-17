import ApplyButton from "./ApplyButton";

const Programmes = ({
  price1 = "₹29,500",
  priceNote1 = "+ GST, everything included",
  price2 = "₹38,000",
  priceNote2 = "+ GST, everything included",
  scaleLabel = "to pan-India",
}) => (
  <section id="programmes">
    <div className="wrap">
      <h2 style={{fontSize: 'clamp(26px,3.4vw,38px)'}}>Our Programmes</h2>
      <div className="prow">
        <div className="prow-left">
          <div className="plabel">Foundation</div>
          <h3>Global Challenges &amp; Social Justice</h3>
          <div className="du">4 Weeks · Grades 8–12<br />3 group classes/week, 1 hr at a fixed time</div>
          <div className="pr">{price1} <small>{priceNote1}</small></div>
        </div>
        <div className="prow-right">
          <p className="d">For Aspiring Changemakers ready to experience the world of social impact. Explore a diverse range of global issues, from socioeconomic to environmental causes.</p>
          <div className="pick">Pick a theme</div>
          <div className="pthemes">
            <span>Sports &amp; Inclusion</span><span>Finance x Business</span><span>Psychology &amp; Business</span><span>International Relations &amp; Public Policy</span><span>Design Thinking for GOOD</span><span>Tech for GOOD</span><span>Urban Planning &amp; Sustainability</span>
          </div>
          <ul>
            <li>Live project with real communities</li>
            <li>Documented impact report</li>
            <li>Mentor-authored Letter of Recommendation</li>
          </ul>
          <ApplyButton />
        </div>
      </div>
      <div className="prow">
        <div className="prow-left">
          <div className="plabel">Advanced</div>
          <h3>GenZ Incubator &amp; Social Entrepreneurship</h3>
          <div className="ptag">Your first big idea shouldn't wait until college.</div>
          <div className="du">6 Weeks · Grades 10–12<br />3 group classes/week, 1 hr</div>
          <div className="pr">{price2} <small>{priceNote2}</small></div>
        </div>
        <div className="prow-right">
          <p className="d">For students with a passion project or prior impact experience. Six weeks of creative leadership, design thinking and lean data analysis, with incubation and continued support for exceptional projects.</p>
          <div className="pick">Pick a theme</div>
          <div className="pthemes">
            <span>Climate x Finance</span><span>AI x The New Workforce</span><span>Design Thinking for GOOD</span><span>Psychology &amp; Business</span><span>Sports &amp; Inclusion</span>
          </div>
          <ul>
            <li>Your own initiative, scaled {scaleLabel}</li>
            <li>Documented impact report</li>
            <li>Incubation &amp; continued support</li>
            <li>Award pathways, Diana Award, TEDx, funding</li>
          </ul>
          <ApplyButton />
        </div>
      </div>
      </div>
    </section>
);

export default Programmes;
