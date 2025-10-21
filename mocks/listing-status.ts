import { ListingStatus } from '@/types';

export const mockListingStatus: ListingStatus[] = [
  {
    id: 1,
    nameIt: 'Archiviato',
    nameEn: 'Archived',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    nameIt: 'Bozza',
    nameEn: 'Draft',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 3,
    nameIt: 'In Attesa',
    nameEn: 'Pending',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 4,
    nameIt: 'Attivo',
    nameEn: 'Active',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 5,
    nameIt: 'Scaduto',
    nameEn: 'Expired',
    createdAt: '2023-01-01T00:00:00Z',
  },
];
