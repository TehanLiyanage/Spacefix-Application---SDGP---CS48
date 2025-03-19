import React from 'react';
import { Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';


const quickLinks = ['Home', 'Features', 'Solutions', 'Team', 'Contact'];

const socialLinks = [
  { 
    icon: <Linkedin className="w-5 h-5" />, 
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/spacefixlk'
  },
  { 
    icon: <Instagram className="w-5 h-5" />, 
    name: 'Instagram',
    href: 'https://www.instagram.com/spacefixlk?igsh=MTZoNTk2MWNjdnYzYw%3D%3D&utm_source=qr'
  },
  { 
    icon: <Twitter className="w-5 h-5" />, 
    name: 'Twitter',
    href: 'https://x.com/Spacefixlk'
  },
  {
    icon: <Youtube className="w-5 h-5" />,
    name: 'YouTube',
    href: 'https://www.youtube.com/@spacefixlk'
  }
];


const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              SPACEFIX
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Making university space management smarter and more efficient.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Social Media</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Spacefix. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Support
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;