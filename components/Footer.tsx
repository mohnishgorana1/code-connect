import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Code, Plug } from "lucide-react";
import Link from "next/link";
export const Footer = () => {
  
  const sections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Demo", href: "#demo" },
        { name: "Integrations", href: "#integrations" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Blog", href: "#blog" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "FAQ", href: "#faq" },
        { name: "Support", href: "#support" },
        { name: "Docs", href: "#docs" },
        { name: "API Status", href: "#status" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: FaTwitter,
      href: "#",
      name: "Twitter",
    },
    {
      icon: FaGithub,
      href: "https://github.com/mohnishgorana1/code-connect",
      name: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/mohnish-gorana-804374340/",
      name: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-indigo-900/50 pt-12 pb-8 mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-gray-800 pb-10">
        {/* Brand Info */}
        <div className="col-span-2 mx-auto flex flex-col justify-between">
          <Link
            href="/"
            className="  text-xl md:text-2xl font-semibold tracking-tight flex items-center group transition-all duration-300"
          >
            <Plug
              size={26}
              className="text-indigo-400 group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-indigo-500 font-bold tracking-tight">
              CodeConnect
            </span>
          </Link>
          <p className="text-gray-500 text-sm mx-2">
            &copy; {new Date().getFullYear()} CodeConnect, Inc. <br /> All
            rights reserved.
          </p>
          <div className="mx-2 flex flex-col space-x-6">
            <a
              href="#terms"
              className="text-gray-500 hover:text-white transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#privacy"
              className="text-gray-500 hover:text-white transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        {sections.map((section) => (
          <div key={section.title} className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
