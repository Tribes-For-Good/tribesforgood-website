const LOGOS = [
  {
    "src": "/assets/home-v2/dhirubhai-ambani-international-school-489649a6.png",
    "alt": "Dhirubhai Ambani International School"
  },
  {
    "src": "/assets/home-v2/the-british-school-new-delhi-dc0d1c30.png",
    "alt": "The British School New Delhi",
    "scale": true
  },
  {
    "src": "/assets/home-v2/oberoi-international-school-1cfc87a0.png",
    "alt": "Oberoi International School"
  },
  {
    "src": "/assets/home-v2/neerja-modi-school-100e3ed5.png",
    "alt": "Neerja Modi School"
  },
  {
    "src": "/assets/home-v2/american-school-of-bombay-cee756d5.png",
    "alt": "American School of Bombay"
  },
  {
    "src": "/assets/home-v2/the-international-school-bangalore-c0697b4e.png",
    "alt": "The International School Bangalore"
  },
  {
    "src": "/assets/home-v2/cole-mondiale-world-school-797f8751.png",
    "alt": "École Mondiale World School"
  },
  {
    "src": "/assets/home-v2/podar-international-school-00ed0591.png",
    "alt": "Podar International School"
  },
  {
    "src": "/assets/home-v2/pathways-school-gurgaon-2f83798c.png",
    "alt": "Pathways School Gurgaon",
    "scale": true
  },
  {
    "src": "/assets/home-v2/woodstock-school-2e2f36c7.png",
    "alt": "Woodstock School"
  },
  {
    "src": "/assets/home-v2/school-10x-1614a8a6.png",
    "alt": "School 10X"
  },
  {
    "src": "/assets/home-v2/aditya-birla-world-academy-3df30a03.png",
    "alt": "Aditya Birla World Academy"
  },
  {
    "src": "/assets/home-v2/k-r-mangalam-global-school-cff2a4df.png",
    "alt": "K.R. Mangalam Global School"
  },
  {
    "src": "/assets/home-v2/partner-school-010057e7.png",
    "alt": "Partner school"
  }
];

// The track is rendered twice so the marquee can loop seamlessly
// (the original page cloned the markup with a script).
const Schools = () => (
  <section className="schools">
    <div className="wrap">
      <h2>A Community of Ambitious Students</h2>
      <div className="logo-marquee">
        <div className="logo-track">
          {[0, 1].map((pass) =>
            LOGOS.map((l, i) => (
              <div className="glogo" key={pass + "-" + i} aria-hidden={pass === 1 ? true : undefined}>
                <img
                  src={l.src}
                  alt={pass === 1 ? "" : l.alt}
                  loading="lazy"
                  style={l.scale ? { transform: "scale(1.2)" } : undefined}
                />
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  </section>
);

export default Schools;
