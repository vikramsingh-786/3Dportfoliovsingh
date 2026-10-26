export const profile = {
  name: 'Vikram Singh',
  role: 'Full-stack developer & UI designer',
  intro:
    'I build fast, considered web products — from the database to the last pixel of the interface.',
  email: 'bobvik2003@gmail.com',
  // Google Drive direct-download link: update the file in Drive and the site picks it up.
  // The Drive file must be shared as "Anyone with the link" or visitors hit a sign-in page.
  cv: 'https://drive.google.com/uc?export=download&id=1Sz-zZq8hc5oYEsDquonGr4Q5YCjDmlTo',
};

export const socials = [
  { name: 'GitHub', url: 'https://github.com/vikramsingh-786' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vikram-singh-508b08250/' },
  { name: 'X', url: 'https://x.com/VikramS01972090' },
  { name: 'Instagram', url: 'https://www.instagram.com/vikram___5683/?hl=en' },
];

export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'services', title: 'Services' },
  { id: 'tech', title: 'Stack' },
  { id: 'portfolio', title: 'Work' },
  { id: 'contact', title: 'Contact' },
];

export const stats = [
  { value: '800+', label: 'Problems solved' },
  { value: '5★', label: 'CodeChef' },
  { value: 'Knight', label: 'LeetCode' },
];

export const experience = [
  {
    role: 'Associate Software Engineer',
    org: 'CoinSwitch · Bengaluru',
    period: 'Jul 2026 — Present',
    note: 'Promoted from SDE Intern (Jan 2026). Building Lemonn RA, a B2B trading-signal platform for Research Analysts: Go microservice integration, OTP/JWT auth, the signal lifecycle in Next.js/TypeScript, feature flags, Telegram config, Docker builds and CSP hardening.',
  },
  {
    role: 'Frontend Developer Intern',
    org: 'Techies Gateway · Remote',
    period: 'Jul 2024 — Jun 2025',
    note: 'Built React and Redux applications.',
  },
];

export const education = {
  degree: 'Integrated B.Tech (IT) + MBA',
  school: 'ABV-IIITM Gwalior',
  period: 'Jul 2021 — Jun 2026',
};

export const achievements = [
  'CodeChef 5-Star, LeetCode Knight, Codeforces Specialist — 800+ problems solved',
  "Led Urja '23, a 200+ participant event",
  'Certifications from FreeCodeCamp, Scaler and Lets GradeUp',
];

export const skillGroups = [
  { name: 'Languages', items: ['C/C++', 'Go', 'JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'] },
  { name: 'Frameworks', items: ['Node.js', 'Express', 'FastAPI', 'React', 'Next.js', 'Redux'] },
  { name: 'AI & LLMs', items: ['Gemini API', 'OpenAI API', 'Prompt engineering', 'RAG', 'AI agents', 'Vector search'] },
  { name: 'AI-assisted dev', items: ['Claude Code', 'Cursor', 'GitHub Copilot'] },
  { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { name: 'DevOps', items: ['Docker', 'CI/CD'] },
  { name: 'Planning', items: ['System design', 'Technical specs', 'Agile delivery'] },
];

export const services = [
  {
    title: 'Web development',
    features: ['Responsive design', 'Single-page apps', 'Progressive web apps', 'Performance tuning'],
  },
  {
    title: 'Backend development',
    features: ['REST APIs', 'GraphQL services', 'Database design', 'Authentication'],
  },
  {
    title: 'Full-stack solutions',
    features: ['End-to-end delivery', 'Architecture design', 'Third-party integrations', 'Deployment & scaling'],
  },
  {
    title: 'UI/UX design',
    features: ['Wireframes & prototypes', 'User experience design', 'Design systems', 'Accessibility'],
  },
  {
    title: 'Database solutions',
    features: ['Schema architecture', 'Query optimisation', 'Data migration', 'SQL & NoSQL'],
  },
  {
    title: 'AI-powered products',
    features: ['LLM integrations', 'RAG & chat interfaces', 'AI agents & automation', 'Prompt design & evals'],
  },
];

export const process = ['Discovery', 'Planning & specs', 'AI-assisted build', 'Ship & iterate'];

export const tech = [
  { name: 'HTML5', icon: '/html.png', group: 'Frontend' },
  { name: 'CSS3', icon: '/css.png', group: 'Frontend' },
  { name: 'JavaScript', icon: '/javascript.png', group: 'Frontend' },
  { name: 'TypeScript', icon: '/typescript.png', group: 'Frontend' },
  { name: 'React', icon: '/reactjs.png', group: 'Frontend' },
  { name: 'Next.js', icon: '/nextjs.png', group: 'Frontend' },
  { name: 'Tailwind CSS', icon: '/tailwind.png', group: 'Frontend' },
  { name: 'Redux', icon: '/redux.png', group: 'Frontend' },
  { name: 'GSAP', icon: '/gsap.png', group: 'Frontend' },
  { name: 'Three.js', icon: '/threejs.svg', group: 'Frontend' },
  { name: 'Node.js', icon: '/nodejs.png', group: 'Backend' },
  { name: 'Express', icon: '/express.png', group: 'Backend' },
  { name: 'MongoDB', icon: '/mongodb.png', group: 'Backend' },
  { name: 'PostgreSQL', icon: '/postgl.png', group: 'Backend' },
  { name: 'MySQL', icon: '/sql.png', group: 'Backend' },
  { name: 'Prisma', icon: '/prisma.png', group: 'Backend' },
  { name: 'JWT', icon: '/jwt.png', group: 'Backend' },
  { name: 'AWS', icon: '/aws.png', group: 'Cloud' },
  { name: 'Firebase', icon: '/firebase.svg', group: 'Cloud' },
  { name: 'Vercel', icon: '/vercel.svg', group: 'Cloud' },
  { name: 'Render', icon: '/render.png', group: 'Cloud' },
  { name: 'Netlify', icon: '/netlify.svg', group: 'Cloud' },
  { name: 'Git', icon: '/git.png', group: 'Tools' },
  { name: 'Docker', icon: '/docker.png', group: 'Tools' },
  { name: 'Figma', icon: '/figma.png', group: 'Tools' },
  { name: 'VS Code', icon: '/vscode.png', group: 'Tools' },
  { name: 'Postman', icon: '/postman.png', group: 'Tools' },
];

export const projects = [
  {
    title: 'Nova AI Assistant',
    image: '/Nova.png',
    demo: 'https://vsinghnovaai.vercel.app/',
    code: 'https://github.com/vikramsingh-786/NovaAI',
    desc: 'A ChatGPT-style AI chat platform for real-time conversations — coding help, writing, learning and more.',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'Context API'],
  },
  {
    title: 'SHOPITO — MERN e-commerce',
    image: '/IMG5.png',
    demo: 'https://vs-shopito.vercel.app/',
    code: 'https://github.com/vikramsingh-786/mern-ecommerce-platform',
    desc: 'Full e-commerce platform with payments, an admin dashboard and real-time features.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
  },
  {
    title: 'Coursify — LMS platform',
    image: '/IMG2.png',
    demo: 'https://coursifyvs.vercel.app/',
    code: 'https://github.com/vikramsingh-786/coursify',
    desc: 'Learning management system with course creation, video streaming, progress tracking and quizzes.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
  },
  {
    title: 'Weather dashboard',
    image: '/weatherapp.png',
    demo: 'https://weatherly18.netlify.app/',
    code: 'https://github.com/manju1807/Weatherly-nextjs-weather-app',
    desc: 'Real-time weather and five-day forecasts for any location, with animated icons and a clean interface.',
    tags: ['React', 'Chart.js', 'Geolocation'],
  },
  {
    title: 'Intuitive Quiz Hub',
    image: '/quiz.png',
    demo: 'https://developerquizapp.netlify.app/',
    code: 'https://github.com/vikramsingh-786/ThinkTank-Trivia',
    desc: 'A trivia app with smooth animations, dark mode and a responsive layout.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'Golf animation site',
    image: '/IMG1.png',
    demo: 'https://golfanimation.netlify.app/',
    code: 'https://github.com/vikramsingh-786/Family_Golf',
    desc: 'An immersive marketing site built around scroll animation and smooth transitions.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
  },
];
