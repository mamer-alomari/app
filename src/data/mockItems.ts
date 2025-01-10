export interface MockItem {
  id: string;
  name: string;
  category: string;
  defaultDimensions: {
    length: number;
    width: number;
    height: number;
  };
  averageWeight: number;
  image: string;
  suggestedQuantity: number;
}

export const mockItems: MockItem[] = [
  {
    id: 'FURN-001',
    name: '3-Seater Sofa',
    category: 'Furniture',
    defaultDimensions: {
      length: 84,
      width: 38,
      height: 34
    },
    averageWeight: 150,
    image: '/mock-images/sofa.jpg',
    suggestedQuantity: 1
  },
  {
    id: 'FURN-002',
    name: 'Queen Bed Frame',
    category: 'Furniture',
    defaultDimensions: {
      length: 86,
      width: 64,
      height: 48
    },
    averageWeight: 120,
    image: '/mock-images/bed.jpg',
    suggestedQuantity: 1
  },
  {
    id: 'FURN-003',
    name: 'Dining Chair',
    category: 'Furniture',
    defaultDimensions: {
      length: 20,
      width: 20,
      height: 36
    },
    averageWeight: 15,
    image: '/mock-images/chair.jpg',
    suggestedQuantity: 4
  },
  {
    id: 'FURN-004',
    name: 'Coffee Table',
    category: 'Furniture',
    defaultDimensions: {
      length: 48,
      width: 24,
      height: 18
    },
    averageWeight: 40,
    image: '/mock-images/table.jpg',
    suggestedQuantity: 1
  },
  {
    id: 'BOX-001',
    name: 'Small Box',
    category: 'Boxes',
    defaultDimensions: {
      length: 16,
      width: 12,
      height: 12
    },
    averageWeight: 20,
    image: '/mock-images/small-box.jpg',
    suggestedQuantity: 5
  },
  {
    id: 'BOX-002',
    name: 'Medium Box',
    category: 'Boxes',
    defaultDimensions: {
      length: 18,
      width: 18,
      height: 16
    },
    averageWeight: 30,
    image: '/mock-images/medium-box.jpg',
    suggestedQuantity: 5
  },
  {
    id: 'BOX-003',
    name: 'Large Box',
    category: 'Boxes',
    defaultDimensions: {
      length: 24,
      width: 18,
      height: 24
    },
    averageWeight: 40,
    image: '/mock-images/large-box.jpg',
    suggestedQuantity: 3
  },
  {
    id: 'APPL-001',
    name: 'Refrigerator',
    category: 'Appliances',
    defaultDimensions: {
      length: 36,
      width: 32,
      height: 70
    },
    averageWeight: 300,
    image: '/mock-images/fridge.jpg',
    suggestedQuantity: 1
  }
];