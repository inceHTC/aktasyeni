const PROJECT_ID = "aktaspeynir";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function parseValue(val) {
  if (!val) return null;
  if ("stringValue" in val) return val.stringValue;
  if ("integerValue" in val) return Number(val.integerValue);
  if ("doubleValue" in val) return Number(val.doubleValue);
  if ("booleanValue" in val) return val.booleanValue;
  if ("nullValue" in val) return null;
  if ("arrayValue" in val) return (val.arrayValue.values ?? []).map(parseValue);
  if ("mapValue" in val) return parseFields(val.mapValue.fields ?? {});
  return null;
}

function parseFields(fields) {
  const result = {};
  for (const [key, val] of Object.entries(fields ?? {})) {
    result[key] = parseValue(val);
  }
  return result;
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const doc = await res.json();
    return { id, ...parseFields(doc.fields) };
  } catch {
    return null;
  }
}

export async function listProductIds() {
  const ids = [];
  let pageToken = null;

  do {
    const url = new URL(`${BASE_URL}/products`);
    url.searchParams.set("pageSize", "300");
    url.searchParams.set("mask.fieldPaths", "category"); // minimal payload
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    try {
      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!res.ok) break;
      const data = await res.json();
      for (const doc of data.documents ?? []) {
        ids.push(doc.name.split("/").pop());
      }
      pageToken = data.nextPageToken ?? null;
    } catch {
      break;
    }
  } while (pageToken);

  return ids;
}
