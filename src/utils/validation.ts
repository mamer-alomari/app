export function validateQuote(quote: any): quote is Quote {
  return (
    typeof quote === 'object' &&
    typeof quote.id === 'string' &&
    typeof quote.customer_name === 'string' &&
    typeof quote.source_address === 'string' &&
    typeof quote.destination_address === 'string' &&
    Array.isArray(quote.items) &&
    typeof quote.total_price === 'number'
  );
} 