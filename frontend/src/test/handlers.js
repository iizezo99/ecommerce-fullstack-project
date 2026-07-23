import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const API_URL = 'http://localhost:5000/api';

export const mockCategories = [
  { id: 'cat-1', name: 'Electronics' },
  { id: 'cat-2', name: 'Clothing' },
];

export const mockProducts = [
  {
    id: 'prod-1',
    name: 'iPhone 16 Pro',
    price: 1199.99,
    description: 'The latest flagship phone.',
    imageUrl: 'https://example.com/iphone.jpg',
    categoryId: 'cat-1',
    category: { id: 'cat-1', name: 'Electronics' },
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-2',
    name: 'Leather Jacket',
    price: 249.99,
    description: 'Premium leather jacket.',
    imageUrl: null,
    categoryId: 'cat-2',
    category: { id: 'cat-2', name: 'Clothing' },
    createdAt: '2026-01-02T00:00:00.000Z',
  },
];

export const handlers = [
  http.get(`${API_URL}/categories`, () => {
    return HttpResponse.json(mockCategories);
  }),

  http.get(`${API_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';

    const filtered = search
      ? mockProducts.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      : mockProducts;

    return HttpResponse.json({
      data: filtered,
      pagination: {
        page: 1,
        limit: 8,
        total: filtered.length,
        totalPages: 1,
      },
    });
  }),
];

export const server = setupServer(...handlers);
