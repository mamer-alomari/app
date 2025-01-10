import { describe, it, expect } from 'vitest';
import { quotesService } from '../../services/api/quotes.service';

describe('Quotes Service', () => {
  it('retrieves list of quotes', async () => {
    const quotes = await quotesService.getQuotes();
    
    expect(Array.isArray(quotes)).toBe(true);
    expect(quotes.length).toBeGreaterThan(0);
    expect(quotes[0]).toHaveProperty('id');
    expect(quotes[0]).toHaveProperty('items');
    expect(quotes[0]).toHaveProperty('price');
  });

  it('retrieves quote by id', async () => {
    const quoteId = 'QT-1234';
    const quote = await quotesService.getQuoteById(quoteId);
    
    expect(quote).toHaveProperty('id', quoteId);
    expect(quote).toHaveProperty('items');
    expect(quote).toHaveProperty('price');
  });

  it('creates new quote', async () => {
    const quoteData = {
      items: [
        { name: 'Sofa', size: 'Large', quantity: 1 }
      ],
      source: '123 Main St',
      destination: '456 Oak Ave'
    };

    const quote = await quotesService.createQuote(quoteData);
    
    expect(quote).toHaveProperty('id');
    expect(quote).toHaveProperty('items');
    expect(quote.items).toHaveLength(1);
    expect(quote).toHaveProperty('price');
    expect(quote).toHaveProperty('status', 'pending');
  });
});