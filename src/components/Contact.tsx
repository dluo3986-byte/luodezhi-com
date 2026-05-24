const socials = [
  { name: "GitHub", href: "https://github.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Twitter", href: "https://twitter.com" },
];

const contactInfo = [
  {
    label: "Primary Email",
    value: "luodezhi290@gmail.com",
    href: "mailto:luodezhi290@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Secondary Email",
    value: "dluo3986@gmail.com",
    href: "mailto:dluo3986@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+1 (516) 728-5156",
    href: "tel:+15167285156",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
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

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {contactInfo.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-3 p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                <p className="text-gray-200 text-sm font-medium break-all">{item.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8">
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
