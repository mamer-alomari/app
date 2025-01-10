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