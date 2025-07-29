async function search(query) {
  const url = `https://mapple.tv/api/search?q=${encodeURIComponent(query)}`;

  const res = await soraFetch(url, {
    headers: {
      "Accept": "application/json",
      "Referer": "https://mapple.tv",
      "Origin": "https://mapple.tv",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache"
    }
  });

  const data = await res.json();

  if (!data.items || !Array.isArray(data.items)) return [];

  return data.items.map(item => ({
    id: item.id.toString(),
    title: item.title,
    url: `/mapple/${item.id}`,
    poster: `https://image.tmdb.org/t/p/w342${new URL(item.poster).pathname}`,  // البوستر المتوافق مع سورا
    year: item.release_date?.split("-")[0] || "",
    quality: item.highest_quality || "",
    rating: item.rating?.toString() || "",
    type: item.is_tv ? "tv" : "movie"
  }));
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
