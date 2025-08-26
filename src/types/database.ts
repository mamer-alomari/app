export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      workers: {
        Row: {
          id: string;
          company_id: string;
          worker_id: string | null;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          ssn: string | null;
          role: string;
          status: string;
          hire_date: string | null;
          documents: any;
          pay_rate: any;
          work_hours: any;
          pay_stubs: any;
          permissions: any;
          supervisor: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          worker_id?: string | null;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          ssn?: string | null;
          role: string;
          status?: string;
          hire_date?: string | null;
          documents?: any;
          pay_rate?: any;
          work_hours?: any;
          pay_stubs?: any;
          permissions?: any;
          supervisor?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          worker_id?: string | null;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          ssn?: string | null;
          role?: string;
          status?: string;
          hire_date?: string | null;
          documents?: any;
          pay_rate?: any;
          work_hours?: any;
          pay_stubs?: any;
          permissions?: any;
          supervisor?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      vehicles: {
        Row: {
          id: string;
          company_id: string;
          vehicle_id: string | null;
          make: string;
          model: string;
          year: number;
          vin: string;
          license_plate: string;
          registration_expiry: string;
          insurance_policy_number: string;
          insurance_expiry: string;
          capacity: any;
          mileage: number;
          status: string;
          maintenance_history: any;
          fueling_history: any;
          documents: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          vehicle_id?: string | null;
          make: string;
          model: string;
          year: number;
          vin: string;
          license_plate: string;
          registration_expiry: string;
          insurance_policy_number: string;
          insurance_expiry: string;
          capacity?: any;
          mileage?: number;
          status?: string;
          maintenance_history?: any;
          fueling_history?: any;
          documents?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          vehicle_id?: string | null;
          make?: string;
          model?: string;
          year?: number;
          vin?: string;
          license_plate?: string;
          registration_expiry?: string;
          insurance_policy_number?: string;
          insurance_expiry?: string;
          capacity?: any;
          mileage?: number;
          status?: string;
          maintenance_history?: any;
          fueling_history?: any;
          documents?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      quotes: {
        Row: {
          id: string;
          company_id: string;
          customer_name: string;
          customer_email: string | null;
          customer_phone: string | null;
          source_address: string;
          destination_address: string;
          items: any;
          status: string;
          total_price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          customer_name: string;
          customer_email?: string | null;
          customer_phone?: string | null;
          source_address: string;
          destination_address: string;
          items?: any;
          status?: string;
          total_price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          customer_name?: string;
          customer_email?: string | null;
          customer_phone?: string | null;
          source_address?: string;
          destination_address?: string;
          items?: any;
          status?: string;
          total_price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      marketplace: {
        Row: {
          id: string;
          quote_id: string;
          company_id: string;
          bid_amount: number | null;
          status: string;
          accepted_at: string | null;
          rejected_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quote_id: string;
          company_id: string;
          bid_amount?: number | null;
          status?: string;
          accepted_at?: string | null;
          rejected_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quote_id?: string;
          company_id?: string;
          bid_amount?: number | null;
          status?: string;
          accepted_at?: string | null;
          rejected_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 