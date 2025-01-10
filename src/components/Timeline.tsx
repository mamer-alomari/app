import { TimelineEvent } from '../types/job';

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex items-start">
          <div className="relative flex flex-col items-center mr-4">
            <div className={`w-4 h-4 rounded-full ${
              event.completed ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            {index < events.length - 1 && (
              <div className={`w-0.5 h-full absolute top-4 ${
                event.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">{event.time}</p>
            <p className="font-medium">{event.status}</p>
            <p className="text-sm text-gray-600">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}