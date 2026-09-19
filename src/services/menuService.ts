import { type MenuCategory, type MenuItem } from '@/data/bakery';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1I-nyMnK01FQkz36qXZR7XzHo2TzIR8hVrioNYUonH_s/gviz/tq?tqx=out:csv&sheet=menu';

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

function convertGoogleDriveImageUrl(url: string): string {
  if (!url) {
    return '';
  }

  // Extract Google Drive file ID from:
  // https://drive.google.com/file/d/FILE_ID/view
  const match = url.match(/\/file\/d\/([^/]+)/);

  if (match?.[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }

  // If the URL is already an image URL, keep it unchanged
  return url;
}

export async function fetchMenu(): Promise<MenuCategory[]> {
  return await loadMenuFromSheet();
}

async function loadMenuFromSheet(): Promise<MenuCategory[]> {
  const response = await fetchWithTimeout(SHEET_URL);

  if (!response.ok) {
    throw new Error('Unable to load menu from Google Sheets');
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

  const items: (MenuItem & {
  category: string;
  id: string;
  allergens: string;
})[] = [];

  for (const row of rows.slice(1)) {
    const available = getColumn(row, 'available').toLowerCase();

    if (available !== 'true') {
      continue;
    }

    const name = getColumn(row, 'name');

    if (!name) {
      continue;
    }

    items.push({
      id: getColumn(row, 'id') || name,
      category: getColumn(row, 'category') || 'Other',
      name,
      description: getColumn(row, 'description'),
      price: getColumn(row, 'price'),
      image: convertGoogleDriveImageUrl(getColumn(row, 'image')),
      alt: name,
      allergens: getColumn(row, 'allergens'),

    });
  }

  const categoryMap = new Map<string, MenuCategory>();

  for (const item of items) {
    const categoryName = item.category;

    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, {
        id: categoryName.toLowerCase().replace(/\s+/g, '-'),
        label: categoryName,
        items: [],
      });
    }

  categoryMap.get(categoryName)!.items.push({
  name: item.name,
  description: item.description,
  price: item.price,
  image: item.image,
  alt: item.alt,
  allergens: item.allergens,
});
  }

  return Array.from(categoryMap.values());
}