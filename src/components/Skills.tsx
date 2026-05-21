const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma"],
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "Docker", "CI/CD", "Linux", "AWS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            What I Work With
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Skills &amp; Technologies
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group) => (
            <div
              key={group.category}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300"
            >
              <h3 className="text-white font-semibold text-lg mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
