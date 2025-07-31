async function searchResults(keyword) {
  const url = "https://kaa.to/api/fsearch";

  const response = await soraFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "https://kaa.to",
      "Referer": "https://kaa.to/",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
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

  console.log(results);
  return JSON.stringify(results);
}
