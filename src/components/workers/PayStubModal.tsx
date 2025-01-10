import { PayStub } from '../../types/payroll';
import { format } from 'date-fns';

interface PayStubModalProps {
  payStub: PayStub;
  onClose: () => void;
}

export default function PayStubModal({ payStub, onClose }: PayStubModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold">Pay Stub</h2>
            <p className="text-gray-500">
              Period: {format(new Date(payStub.periodStart), 'MMM d')} - {format(new Date(payStub.periodEnd), 'MMM d, yyyy')}
            </p>
          </div>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Hours</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Regular Hours</span>
                  <span>{payStub.regularHours}</span>
                </div>
                <div className="flex justify-between">
                  <span>Overtime Hours</span>
                  <span>{payStub.overtimeHours}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Earnings</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Regular Pay</span>
                  <span>${payStub.regularPay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Overtime Pay</span>
                  <span>${payStub.overtimePay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-1">
                  <span>Gross Pay</span>
                  <span>${payStub.grossPay.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Deductions</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Federal Tax</span>
                <span>${payStub.deductions.federal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>State Tax</span>
                <span>${payStub.deductions.state.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Local Tax</span>
                <span>${payStub.deductions.local.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Social Security</span>
                <span>${payStub.deductions.socialSecurity.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Medicare</span>
                <span>${payStub.deductions.medicare.toFixed(2)}</span>
              </div>
              {payStub.deductions.other?.map(deduction => (
                <div key={deduction.name} className="flex justify-between">
                  <span>{deduction.name}</span>
                  <span>${deduction.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Net Pay</span>
              <span>${payStub.netPay.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Pay Date: {format(new Date(payStub.payDate), 'MMMM d, yyyy')}</p>
            <p>Direct Deposit</p>
          </div>
        </div>
      </div>
    </div>
  );
}