const experience = [
  {
    title: "Corporate Syndication Intern",
    company: "ICBC (USA) N.A.",
    location: "New York, NY",
    period: "June 2024 – July 2024",
    bullets: [
      "Conducted fundamental financial analysis of major U.S. and Chinese financial institutions using the CAMEL framework",
      "Evaluated Capital Adequacy, Asset Quality, and Liquidity indicators to identify growth trends and risk factors",
      "Synthesized Balance Sheet, Income Statement, and Cash Flow data to support corporate decision-making",
    ],
    skills: ["Financial Analysis", "CAMEL Framework", "Risk Assessment", "Microsoft Excel"],
  },
  {
    title: "Retail Banking & Credit Card Intern Associate",
    company: "ICBC (USA) N.A.",
    location: "New York, NY",
    period: "June 2023 – August 2023",
    bullets: [
      "Administered KYC procedures and managed tax certifications for non-resident clients ensuring regulatory compliance",
      "Supported risk management in the Credit Card Department by tracking transactions and analyzing debt repayment cycles",
      "Guided clients through account opening and provided insights on housing mortgage applications",
    ],
    skills: ["KYC/AML", "Regulatory Compliance", "Customer Onboarding", "Banking Operations"],
  },
];

const education = [
  {
    degree: "Bachelor of Arts in History",
    school: "Binghamton University",
    period: "August 2022 – May 2026",
  },
  {
    degree: "High School Diploma",
    school: "Jericho Senior High School",
    period: "August 2018 – June 2022",
  },
];

export default function Resume() {
  return (
    <section id="resume" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            My Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Resume</h2>
        </div>

        {/* Experience */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Experience</h3>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-800" />
            <div className="space-y-8">
              {experience.map((job) => (
                <div key={job.title} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-gray-900 border-2 border-indigo-500 rounded-full" />
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-indigo-500/40 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h4 className="text-white font-semibold text-lg leading-tight">{job.title}</h4>
                      <span className="text-indigo-400 text-sm font-medium whitespace-nowrap">{job.period}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      {job.company} &mdash; {job.location}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                          <span className="text-indigo-400 mt-1 shrink-0">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-gray-800 text-gray-400 text-xs rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Education</h3>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-800" />
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.school} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-gray-900 border-2 border-violet-500 rounded-full" />
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-violet-500/40 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-white font-semibold">{edu.degree}</h4>
                        <p className="text-gray-400 text-sm mt-1">{edu.school}</p>
                      </div>
                      <span className="text-violet-400 text-sm font-medium whitespace-nowrap">{edu.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
