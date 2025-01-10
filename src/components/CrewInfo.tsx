import { CrewMember } from '../types/job';

interface CrewInfoProps {
  crew: CrewMember[];
}

export default function CrewInfo({ crew }: CrewInfoProps) {
  return (
    <div className="space-y-4">
      {crew.map(member => (
        <div key={member.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
          <img
            src={member.photo}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div className="flex-1">
            <h3 className="font-medium">{member.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{member.role}</p>
          </div>
          <a
            href={`tel:${member.phone}`}
            className="bg-black text-white p-2 rounded-full"
          >
            📞
          </a>
        </div>
      ))}
    </div>
  );
}