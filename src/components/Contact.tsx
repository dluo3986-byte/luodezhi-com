const socials = [
  { name: "GitHub", href: "https://github.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Twitter", href: "https://twitter.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Get In Touch
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Let&apos;s Work Together
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          Whether you have a project in mind, a job opportunity, or just want to say hi —
          my inbox is always open. I&apos;ll do my best to get back to you!
        </p>

        <a
          href="mailto:contact@luodezhi.com"
          className="inline-flex items-center gap-3 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200 text-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Say Hello
        </a>

        <div className="flex items-center justify-center gap-8 mt-12">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
