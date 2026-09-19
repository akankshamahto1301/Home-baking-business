
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

const INSTAGRAM_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1I-nyMnK01FQkz36qXZR7XzHo2TzIR8hVrioNYUonH_s/gviz/tq?tqx=out:csv&sheet=Instagram';

export interface InstagramItem {
  id: string;
  image: string;
  available: boolean;
}

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

export async function fetchInstagramPosts(): Promise<InstagramItem[]> {
  const response = await fetchWithTimeout(INSTAGRAM_SHEET_URL);

  if (!response.ok) {
    throw new Error('Unable to load Instagram posts from Google Sheets');
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
      image: getColumn(row, 'image'),
      available: getColumn(row, 'available').toLowerCase() === 'true',
    }))
    .filter((item) => item.available && item.image);
}