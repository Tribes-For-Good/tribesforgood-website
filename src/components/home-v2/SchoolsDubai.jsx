// Real partner-school logos, confirmed against each school's official crest.
const LOGOS = [
  { src: "/assets/home-v2/dubai-college.png", alt: "Dubai College" },
  { src: "/assets/home-v2/gems-wellington-international-school.png", alt: "GEMS Wellington International School" },
  { src: "/assets/home-v2/jumeirah-english-speaking-school-jess.png", alt: "Jumeirah English Speaking School (JESS)" },
  { src: "/assets/home-v2/dubai-international-academy.png", alt: "Dubai International Academy" },
  { src: "/assets/home-v2/gems-modern-academy.png", alt: "GEMS Modern Academy" },
  { src: "/assets/home-v2/brighton-college-abu-dhabi.png", alt: "Brighton College Abu Dhabi" },
  { src: "/assets/home-v2/american-school-of-doha.png", alt: "American School of Doha" },
  { src: "/assets/home-v2/qatar-international-school-qis.png", alt: "Qatar International School (QIS)" },
  { src: "/assets/home-v2/compass-international-school-doha.png", alt: "Compass International School Doha" },
  { src: "/assets/home-v2/acs-doha-international-school.png", alt: "ACS Doha International School" },
  { src: "/assets/home-v2/the-american-british-academy-aba.png", alt: "The American British Academy (ABA)" },
  { src: "/assets/home-v2/muscat-international-school.png", alt: "Muscat International School" },
  // Same brand/crest as Dubai International Academy above, different campus.
  { src: "/assets/home-v2/dubai-international-academy.png", alt: "Dubai International Academy, Emirates Hills" },
];

// The track is rendered twice so the marquee can loop seamlessly.
const SchoolsDubai = () => (
  <section className="schools">
    <div className="wrap">
      <h2>A Community of Ambitious Students</h2>
      <div className="logo-marquee">
        <div className="logo-track">
          {[0, 1].map((pass) =>
            LOGOS.map((l, i) => (
              <div className="glogo" key={pass + "-" + i} aria-hidden={pass === 1 ? true : undefined}>
                <img src={l.src} alt={pass === 1 ? "" : l.alt} loading="lazy" />
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  </section>
);

export default SchoolsDubai;
