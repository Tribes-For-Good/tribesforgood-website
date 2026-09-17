import ApplyButton from "./ApplyButton";

const Cohorts = () => (
  <section className="cohorts" id="cohorts">
    <div className="wrap">
      <h2>Upcoming Cohorts</h2>
      <p className="sec-sub">Rolling winter cohorts. Applications close 3 weeks before each start date.</p>
      <div className="ccards">
        <div className="cohcard next">
          <span className="badge">NEXT COHORT</span>
          <div className="lbl">October Batch</div>
          <div className="starts">Starts</div>
          <div className="sdate">15 October</div>
          <div className="dl"><div className="dlab">Apply by</div><div className="dval">24 September</div></div>
        </div>
        <div className="cohcard">
          <div className="lbl">November Batch I</div>
          <div className="starts">Starts</div>
          <div className="sdate">1 November</div>
          <div className="dl"><div className="dlab">Apply by</div><div className="dval">11 October</div></div>
        </div>
        <div className="cohcard">
          <div className="lbl">November Batch II</div>
          <div className="starts">Starts</div>
          <div className="sdate">15 November</div>
          <div className="dl"><div className="dlab">Apply by</div><div className="dval">25 October</div></div>
        </div>
        <div className="cohcard">
          <div className="lbl">December Batch I</div>
          <div className="starts">Starts</div>
          <div className="sdate">1 December</div>
          <div className="dl"><div className="dlab">Apply by</div><div className="dval">10 November</div></div>
        </div>
        <div className="cohcard">
          <div className="lbl">December Batch II</div>
          <div className="starts">Starts</div>
          <div className="sdate">10 December</div>
          <div className="dl"><div className="dlab">Apply by</div><div className="dval">19 November</div></div>
        </div>
        <div className="cohcard">
          <div className="lbl">January Batch I</div>
          <div className="starts">Starts</div>
          <div className="sdate">5 January</div>
          <div className="dl"><div className="dlab">Apply by</div><div className="dval">15 December</div></div>
        </div>
        <div className="cohcard">
          <div className="lbl">January Batch II</div>
          <div className="starts">Starts</div>
          <div className="sdate">15 January</div>
          <div className="dl"><div className="dlab">Apply by</div><div className="dval">25 December</div></div>
        </div>
      </div>
      <div className="scoping">
        <span className="si">🎯</span>
        <p><b>Admission is strictly via application and a mandatory Project Scoping Call</b> to ensure cohort quality. <b>Limited seats per batch.</b></p>
      </div>
      <div className="cohort-cta">
        <ApplyButton />
      </div>
    </div>
  </section>
);

export default Cohorts;
