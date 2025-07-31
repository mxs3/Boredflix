async function searchResults(keyword) {
  const url = "https://kaa.to/api/search";

  const response = await soraFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
      "Origin": "https://kaa.to",
      "Referer": "https://kaa.to/",
    },
    body: JSON.stringify({ query: keyword }),
  });

  const data = await response.json();
  const results = [];

  for (const item of data) {
    const id = item.slug;
    const image = `https://img.kaa.to/posters/${item.poster?.hq}.webp`;
    const rawTitle = item.title_en || item.title;
    const title = cleanTitle(rawTitle);
    results.push({ id, title, image });
  }

  console.log(results);
  return JSON.stringify(results);
}

// دالة بسيطة لتنظيف العنوان من أي رموز زيادة (لو عايز تعدلها حسب مزاجك)
function cleanTitle(title) {
  return title?.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
}
