const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Completed", value: "20+" },
  { label: "Happy Clients", value: "15+" },
  { label: "Technologies", value: "10+" },
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-7xl font-bold text-white select-none shadow-2xl">
                L
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center text-3xl">
                👨‍💻
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Software Engineer based in China
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              I&apos;m a passionate full-stack developer with a love for building beautiful,
              functional web applications. I enjoy turning complex problems into simple,
              elegant solutions.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing
              to open-source projects, or sharing knowledge with the developer community.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Open to Work", "Available for Freelance"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Let&apos;s work together
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gray-900 rounded-xl border border-gray-800"
            >
              <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
