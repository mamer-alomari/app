export interface PayStub {
  id: string;
  workerId: string;
  periodStart: string;
  periodEnd: string;
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  grossPay: number;
  deductions: {
    federal: number;
    state: number;
    local: number;
    socialSecurity: number;
    medicare: number;
    other?: {
      name: string;
      amount: number;
    }[];
  };
  netPay: number;
  payDate: string;
  status: 'pending' | 'paid';
}

export interface PayrollRecord {
  id: string;
  workerId: string;
  periodStart: string;
  periodEnd: string;
  regularHours: number;
  overtimeHours: number;
  regularRate: number;
  overtimeRate: number;
  totalPay: number;
  status: 'pending' | 'approved' | 'paid';
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  payrollId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
}