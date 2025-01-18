export interface Resource {
  id: string;
  name: string;
  type: string;
  quantity: number;
}

export interface MockItem {
  id: string;
  name: string;
  type: string;
  available: boolean;
}