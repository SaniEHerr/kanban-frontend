export interface Card {
  _id: string;
  title: string;
  order: number;
  description?: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  _id: string;
  title: string;
  order: number;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
}