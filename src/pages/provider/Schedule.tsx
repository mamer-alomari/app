import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isSameDay, parseISO } from 'date-fns';
import Calendar from '../../components/schedule/Calendar';
import NewJobModal from '../../components/schedule/NewJobModal';
import AssignmentModal from '../../components/schedule/AssignmentModal';
import { mockScheduledJobs, type ScheduledJob } from '../../data/mockScheduleData';
import { mockWorkers, mockVehicles } from '../../data/resourceData';
import { checkResourceAvailability } from '../../utils/scheduleUtils';

export default function Schedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState<ScheduledJob[]>(mockScheduledJobs);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);

  const jobsForSelectedDate = schedule.filter(job => 
    isSameDay(parseISO(job.date), selectedDate)
  );

  const handleCreateJob = (jobData: Partial<ScheduledJob>) => {
    const newJob: ScheduledJob = {
      id: `MOV-${Date.now()}`,
      customerName: jobData.customerName || '',
      address: jobData.address || '',
      date: jobData.date || '',
      startTime: jobData.startTime || '',
      estimatedDuration: jobData.estimatedDuration || 4,
      status: 'scheduled',
      assignedWorkers: [],
      assignedVehicle: undefined
    };

    setSchedule([...schedule, newJob]);
    setShowNewJobModal(false);
  };

  const handleAssignResources = (jobId: string, data: {
    workers: string[];
    vehicle: string;
    estimatedDuration: number;
  }) => {
    setSchedule(schedule.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          assignedWorkers: data.workers,
          assignedVehicle: data.vehicle,
          estimatedDuration: data.estimatedDuration
        };
      }
      return job;
    }));
    setShowAssignModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate('/provider/dashboard')} className="text-2xl mr-4">‹</button>
              <h1 className="text-2xl font-bold">Schedule</h1>
            </div>
            <button
              onClick={() => setShowNewJobModal(true)}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Add New Job
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <Calendar
            jobs={schedule.map(job => ({
              id: job.id,
              date: job.date,
              time: job.startTime,
              status: job.status
            }))}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        {jobsForSelectedDate.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Jobs for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            {jobsForSelectedDate.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{job.customerName}</h3>
                    <p className="text-sm text-gray-500">{job.id}</p>
                    <p className="text-sm text-gray-500">
                      {job.startTime} ({job.estimatedDuration} hours)
                    </p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => setShowAssignModal(job.id)}
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm mb-2"
                    >
                      {job.assignedWorkers.length > 0 ? 'Reassign Resources' : 'Assign Resources'}
                    </button>
                    {job.assignedWorkers.length > 0 && (
                      <>
                        <p className="text-sm font-medium">
                          {job.assignedWorkers.length} workers assigned
                        </p>
                        {job.assignedVehicle && (
                          <p className="text-sm text-gray-500">
                            Vehicle: {job.assignedVehicle}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{job.address}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No jobs scheduled for this date
          </div>
        )}
      </main>

      {showNewJobModal && (
        <NewJobModal
          selectedDate={selectedDate}
          onSubmit={handleCreateJob}
          onClose={() => setShowNewJobModal(false)}
        />
      )}

      {showAssignModal && (
        <AssignmentModal
          jobId={showAssignModal}
          date={format(selectedDate, 'yyyy-MM-dd')}
          workers={mockWorkers}
          vehicles={mockVehicles}
          onAssign={handleAssignResources}
          onClose={() => setShowAssignModal(null)}
        />
      )}
    </div>
  );
}