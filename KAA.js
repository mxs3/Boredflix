async function searchResults(keyword) {
  const url = "https://kaa.to/api/fsearch";

  const response = await soraFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "https://kaa.to",
      "Referer": "https://kaa.to/",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X)",
    },
    body: JSON.stringify({ query: keyword }),
  });

  const data = await response.json();
  const results = [];

  for (const item of data.result || []) {
    const title = item.title_en || item.title;
    const image = `https://img.kaa.to/posters/${item.poster?.hq}.webp`;
    const id = item.slug;

    results.push({ id, title, image });
  }

  return JSON.stringify(results);
}
