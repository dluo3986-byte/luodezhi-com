const strengths = [
  {
    title: "Bilingual",
    detail: "Native Chinese & English, working Spanish",
  },
  {
    title: "Financial Services",
    detail: "Retail banking, compliance, syndication exposure",
  },
  {
    title: "AI & Technology",
    detail: "AI agent workflows, prompt engineering, content creation with AI tools",
  },
  {
    title: "Research & Analysis",
    detail: "Historical research methodology, critical thinking, academic writing",
  },
];

const openTo = [
  "Financial Analysis",
  "Compliance",
  "Operations",
  "Consulting",
  "Research",
  "AI-integrated roles",
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Get to Know Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Avatar */}
          <div className="flex justify-center lg:sticky lg:top-24">
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-7xl font-bold text-white select-none shadow-2xl">
                L
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center text-3xl">
                🎓
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Binghamton University Graduate &apos;26
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Recent Binghamton University graduate (BA History, 2026) with internship experience
                in financial services and a growing portfolio of AI-powered projects.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                My background combines analytical research skills from History with practical
                exposure to financial operations through internships at{" "}
                <span className="text-gray-200 font-medium">ICBC (USA)</span> and{" "}
                <span className="text-gray-200 font-medium">
                  Canton Mutual Financial Limited
                </span>{" "}
                (a licensed Hong Kong financial firm), where I gained firsthand experience in
                banking operations, regulatory compliance, KYC/AML workflows, and client
                management.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I&apos;m actively building expertise in AI tools and AI agent development — using
                platforms like Claude, ChatGPT, and automation frameworks to create content,
                streamline workflows, and develop project prototypes. I believe AI proficiency
                is the defining skill of our generation, and I&apos;m committed to applying it
                across industries.
              </p>
            </div>

            {/* Core Strengths */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Core Strengths</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {strengths.map((s) => (
                  <div
                    key={s.title}
                    className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-indigo-500/40 transition-colors"
                  >
                    <p className="text-indigo-400 font-medium text-sm mb-1">{s.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Open to */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">
                Open to opportunities in:
              </h4>
              <div className="flex flex-wrap gap-2">
                {openTo.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full text-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-2">— in the U.S. or Hong Kong</p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Get in touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
