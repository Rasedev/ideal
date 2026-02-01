// components/Sections/TeamSection.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeam } from '../Slices/sectionsSlice';

const Team = () => {
  const dispatch = useDispatch();
  const { team, loading } = useSelector((state) => state.sections);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const defaultTeam = [
    {
      id: 1,
      name: "Mike Jowling",
      position: "SOUR TERRA BY",
      image: "/api/placeholder/300/300",
      description: "Creative Corporate, Community Company Profile, Agency and editor."
    }
  ];

  const displayTeam = team.length > 0 ? team : defaultTeam;

  return (
    <section id="team" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Meet Our Advisors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I like the geometric visual, bold type, easy grid and the well balanced whitespace. Gallery Photo Creative Corporate, Community Company Profile, Agency and editor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTeam.map((member) => (
            <TeamMemberCard key={member.id} member={member} loading={loading.team} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member, loading }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    {loading ? (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    ) : (
      <>
        <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <span className="text-gray-500">Member Photo</span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {member.name}
          </h3>
          <p className="text-blue-600 font-medium mb-4">
            {member.position}
          </p>
          <p className="text-gray-600 text-sm">
            {member.description}
          </p>
        </div>
      </>
    )}
  </div>
);

export default Team;