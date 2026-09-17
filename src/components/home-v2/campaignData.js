// Card fronts and popup content for the six campaigns.
// Copy lives here so it can be edited without touching layout.
export const CARDS = [
  {
    "key": "sports",
    "img": "/assets/home-v2/campaign-sports-v2.jpg",
    "alt": "The Invisible Athlete, Sports x Inclusion campaign",
    "spots": "Only 9 spots left",
    "theme": "Sports &amp; Inclusion",
    "hook": "Talent doesn't check your zip code. Opportunity does."
  },
  {
    "key": "media",
    "img": "/assets/home-v2/campaign-media-v2.jpg",
    "alt": "Misinformation vs Disinformation campaign",
    "spots": "Only 12 spots left",
    "theme": "International Relations &amp; Public Policy",
    "hook": "How many of today's 50 posts were built to make you feel something?"
  },
  {
    "key": "gigcredit",
    "img": "/assets/home-v2/campaign-gigcredit-v2.jpg",
    "alt": "Credit Score for Gig Workers campaign",
    "spots": "Only 6 spots left",
    "theme": "Finance &amp; Economics",
    "hook": "Inflation hits everyone. It doesn't hit everyone the same."
  },
  {
    "key": "microfin",
    "img": "/assets/home-v2/campaign-microfin-v2.jpg",
    "alt": "How Microfinance Got It Wrong campaign",
    "spots": "Only 8 spots left",
    "theme": "Finance x Business",
    "hook": "Heat costs her a day's earnings. The only answer on offer is a loan."
  },
  {
    "key": "brain",
    "img": "/assets/home-v2/campaign-brain-v2.jpg",
    "alt": "Neuroscience and Brain Health campaign",
    "spots": "Only 11 spots left",
    "theme": "Psychology &amp; Business",
    "hook": "Your heart races before the exam starts. That's biology, not weakness."
  },
  {
    "key": "ai",
    "img": "/assets/home-v2/campaign-ai-v2.jpg",
    "alt": "AI x Economics x The New Workforce campaign",
    "spots": "Only 7 spots left",
    "theme": "Design Thinking for GOOD",
    "hook": "Every toy, classroom and AI model was designed by someone. Why not you?"
  }
];

export const CAMPAIGNS = {
  "sports": {
    "theme": "Sports & Inclusion",
    "title": "Talent doesn't check your zip code. Opportunity does.",
    "desc": "Who gets scouted, funded and coached, and who gets left on the sidelines? Students dig into unequal access to grounds and coaching, funding disparities and the gaps in grassroots talent identification, to ask why going pro is a real option for some kids and a fantasy for others.",
    "examines": [
      "How access to grounds, coaching and funding decides who ever gets seen",
      "Where grassroots talent identification quietly breaks down",
      "What happens to athletes beyond the field, once the game ends"
    ],
    "questions": [
      "Who gets to play, and who gets left out?",
      "What does an athlete become when the career ends early?"
    ]
  },
  "media": {
    "theme": "International Relations & Public Policy",
    "title": "How many of today's 50 posts were built to make you feel something?",
    "desc": "Most people cannot separate misinformation from disinformation, let alone spot who is behind it and what they gain. Students learn to trace intent, then apply that lens to something concrete: how governments answer inflation and shortages, and why a false story travels fastest exactly when people are most afraid.",
    "examines": [
      "How to tell misinformation from disinformation, and trace who benefits",
      "How states answer the same crisis differently: subsidies, rationing, or nothing at all",
      "Why fear is the fuel that moves a false story fastest"
    ],
    "questions": [
      "Free speech or hate speech, and who gets to draw the line?",
      "Mental health, the right wing and digital hygiene",
      "Why do world leaders matter, and to whom?"
    ]
  },
  "gigcredit": {
    "theme": "Finance & Economics",
    "title": "Inflation hits everyone. It doesn't hit everyone the same.",
    "desc": "Economic literacy, financial confidence and income opportunity are unevenly handed out, most of all to women and people in underserved communities. Students use design thinking, financial literacy and policy awareness to build economic tools that work for the people the system was never drawn around.",
    "examines": [
      "Why credit scoring fails workers whose income changes daily",
      "How markets, pricing and geopolitics decide what a household can afford",
      "Why digital scams shadow every new financial product"
    ],
    "questions": [
      "Can financial literacy become a habit instead of a lesson?",
      "Why do so few small business owners understand pricing?"
    ]
  },
  "microfin": {
    "theme": "Finance x Business",
    "title": "Heat costs her a day's earnings. The only answer on offer is a loan.",
    "desc": "Microfinance promised to end poverty. Students examine where it built debt traps instead, and how climate shocks now push informal workers into that same cycle. Then they design financial tools that hold when the weather does not.",
    "examines": [
      "How heat and climate shocks reach informal livelihoods first",
      "Where microfinance created dependence instead of independence",
      "How insurance, savings products and responsible loans could serve communities better"
    ],
    "questions": [
      "Can we design heat insurance for informal workers?",
      "What would lending look like if it were built around the borrower?"
    ]
  },
  "brain": {
    "theme": "Psychology & Business",
    "title": "Your heart races before the exam starts. That's biology, not weakness.",
    "desc": "Students learn how cortisol and adrenaline actually work in the body, then design sessions that teach it to others: a pulse check before and after a stress trigger, and an honest look at how academic pressure and comparison keep that response switched on.",
    "examines": [
      "How stress hormones change heart rate, breathing and focus",
      "How academic and peer pressure trigger the response, and why comparison feeds it",
      "How memory holds and lets go, and what shifts for people living with dementia"
    ],
    "questions": [
      "Attention, scrolling, and what memory keeps",
      "Can memory circles and games support dementia patients?",
      "How do you actually read a food label?"
    ]
  },
  "ai": {
    "theme": "Design Thinking for GOOD",
    "title": "Every toy, classroom and AI model was designed by someone. Why not you?",
    "desc": "Tech promised to connect everyone and did not. Students examine who gets left out through access, data privacy and algorithmic bias, then take hands-on design challenges and prototype with equity built in from the start rather than bolted on after.",
    "examines": [
      "How to run a real design challenge: a gender neutral toy, a kinder classroom, a teen friendly clinic",
      "Who the digital world excludes, and how bias enters a model",
      "How to prototype with equity built in from the first sketch"
    ],
    "questions": [
      "Are we preparing young people to use AI, or to shape it?",
      "Can women microentrepreneurs learn prompt engineering for profit?",
      "Can we design an inclusive bus stop?"
    ]
  }
};
