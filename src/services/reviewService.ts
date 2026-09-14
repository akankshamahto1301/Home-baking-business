import { testimonials } from '@/data/bakery';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

export interface Review {
  id: string;
  name: string;
  review: string;
  rating: number;
  category: string;
  approved: boolean;
  photoUrl: string;
}

const REVIEWS_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1I-nyMnK01FQkz36qXZR7XzHo2TzIR8hVrioNYUonH_s/gviz/tq?tqx=out:csv&sheet=Reviews';

const REVIEWS_API_URL =
  'https://script.google.com/macros/s/AKfycbwmE9LJZPtqNNgVcXLsmn2Gl-GMNjGvhQMHijdCs4TY8JzV1Sc4SXJC2sNkyB1CkeCF/exec';

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && next === '\n') i++;

      row.push(cell.trim());
      cell = '';

      if (row.some((value) => value !== '')) {
        rows.push(row);
      }

      row = [];
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell.trim());

    if (row.some((value) => value !== '')) {
      rows.push(row);
    }
  }

  return rows;
}

const fallbackReviews: Review[] = testimonials.map((item, index) => ({
  id: `fallback-${index}`,
  name: item.author,
  review: item.review,
  rating: 5,
  category: item.occasion,
  approved: true,
  photoUrl: '',
}));

export async function fetchReviews(): Promise<Review[]> {
  try {
    return await loadReviewsFromSheet();
  } catch (error) {
    console.error('Failed to load reviews from Google Sheets, using fallback.', error);
    return fallbackReviews;
  }
}

async function loadReviewsFromSheet(): Promise<Review[]> {
  const response = await fetchWithTimeout(`${REVIEWS_SHEET_URL}&_=${Date.now()}`);

  if (!response.ok) {
    throw new Error('Unable to load reviews');
  }

  const csv = await response.text();
  const rows = parseCSV(csv);

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((header) =>
    header.toLowerCase().trim()
  );

  const getColumn = (row: string[], column: string) => {
    const index = headers.indexOf(column);
    return index === -1 ? '' : row[index]?.trim() ?? '';
  };

  return rows
    .slice(1)
    .map((row) => ({
      id: getColumn(row, 'id'),
      name: getColumn(row, 'name'),
      review: getColumn(row, 'review'),
      rating: Number(getColumn(row, 'rating')) || 5,
      category: getColumn(row, 'category'),
      approved:
        getColumn(row, 'approved').toLowerCase() === 'true',
      photoUrl: getColumn(row, 'photourl'),
    }))
    .filter(
      (review) =>
        review.approved &&
        review.name &&
        review.review
    );
}

export async function submitReview(data: {
  name: string;
  review: string;
  rating: number;
  category: string;
}) {
  await fetchWithTimeout(REVIEWS_API_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      name: data.name,
      review: data.review,
      rating: data.rating,
      category: data.category,
    }),
  });
}