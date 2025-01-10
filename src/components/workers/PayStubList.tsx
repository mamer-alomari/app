import { PayStub } from '../../types/payroll';
import { format } from 'date-fns';

interface PayStubListProps {
  payStubs: PayStub[];
  onViewPayStub: (payStub: PayStub) => void;
}

export default function PayStubList({ payStubs, onViewPayStub }: PayStubListProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Pay Stubs</h3>
      <div className="space-y-2">
        {payStubs.map(payStub => (
          <div
            key={payStub.id}
            className="border rounded-lg p-3 cursor-pointer hover:border-black"
            onClick={() => onViewPayStub(payStub)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">
                  {format(new Date(payStub.periodStart), 'MMM d')} - {format(new Date(payStub.periodEnd), 'MMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-500">
                  Pay Date: {format(new Date(payStub.payDate), 'MMM d, yyyy')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${payStub.netPay.toFixed(2)}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  payStub.status === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payStub.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}