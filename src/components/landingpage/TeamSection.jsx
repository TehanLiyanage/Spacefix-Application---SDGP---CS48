import React from 'react';
import { Mail } from 'lucide-react';

// import images
import sandewdiImg from '../../assets/teammembers/Sandewdi.jpg'; 
import yasithImg from '../../assets/teammembers/Yasith.jpg';
import sameehaImg from '../../assets/teammembers/Sameeha.png'; 
import nisiniImg from '../../assets/teammembers/Nisini.jpg'; 
import tehanImg from '../../assets/teammembers/Tehan.jpg'; 
import kasuniImg from '../../assets/teammembers/Kasuni.jpg'; 

const teamMembers = [
  {
    name: "Akila Tehan Liyanage",
    role: "Developer",
    image: tehanImg,
    email: "mailto:tehanliyanage04@gmail.com"
  },
  {
    name: "Yasith Rashan Perera",
    role: "Developer",
    image: yasithImg,
    email: "mailto:y.rashan22gmail.com"
  },
  {
    name: "Kasuni Dulanjaly",
    role: "Developer",
    image: kasuniImg,
    email: "mailto:kasunidulanjalygmail.com"
  },
  {
    name: "Sandewdi Fonseka",
    role: "Developer",
    image: sandewdiImg,
    email: "mailto:nowanyafonsekagmail.com"
  },
  {
    name: "Mohomad Sameeha",
    role: "Developer",
    image: sameehaImg,
    email: "mailto:sameeha@gmail.com"
  },
  {
    name: "Nisini Soomasekara",
    role: "Developer",
    image: nisiniImg,
    email: "mailto:nisini@spacefix.com"
  }
];

const TeamSection = () => {
  return (
    <section id="team" className="py-16 bg-[rgb(249,250,251)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Meet Our Team
          </h2>
          <p className="text-gray-600">
            The talented developers behind SpaceFix
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-square">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {member.email && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a
                        href={member.email}
                        className="p-2 bg-white rounded-full text-gray-800 hover:scale-110 transition-transform duration-300"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-600">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;