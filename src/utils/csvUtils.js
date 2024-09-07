

export function parseCSV(csvText) {

  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i].trim();
    });
    return obj;
  });
}

export async function loadCSV(url) {
  const response = await fetch(url);
  const csvText = await response.text();
  return parseCSV(csvText);
}
