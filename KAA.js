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

  const results = await response.json();

  if (!Array.isArray(results)) return [];

  return results.map((item) => {
    const image = `https://img.kaa.to/posters/${item.poster?.hq}.webp`;

    return {
      id: item.slug,
      title: item.title_en || item.title,
      altTitle: item.title,
      image,
      year: item.year,
    };
  });
}

// ✅ فك ترميز HTML
function decodeHTMLEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
