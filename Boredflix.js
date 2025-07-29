async function searchResults(keyword) {
  const headers = {
    accept: "application/json",
    referer: "https://mappletv.uk",
    "x-requested-with": "XMLHttpRequest",
    "content-type": "application/json",
  };

  const response = await fetch(`https://mappletv.uk/api/search?query=${encodeURIComponent(keyword)}`, {
    method: "GET",
    headers,
  });

  const json = await response.json();

  if (!json?.items?.length) return JSON.stringify([]);

  const results = json.items.map((item) => {
    const title = item.title;
    const image = item.poster;
    const tmdb_id = item.id;
    const isTV = item.is_tv;

    let href = isTV
      ? `https://mappletv.uk/watch/tv/${tmdb_id}-1-1?autoPlay=true`
      : `https://mappletv.uk/watch/movie/${tmdb_id}?autoPlay=true`;

    return {
      title,
      image,
      href,
    };
  });

  return JSON.stringify(results);
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
