async function searchResults(keyword) {
  const results = [];
  const url = `https://mappletv.uk/api/4k_media?search=${encodeURIComponent(keyword)}&mediaType=tv,movie&page=1&perPage=30`;

  const response = await fetchv2(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://mappletv.uk/'
    }
  });

  const json = await response.json();

  for (const item of json.items) {
    const isTV = item.is_tv === true;

    const href = isTV
      ? `tv|${item.id}|${item.season_number || 1}|${item.episode_number || 1}`
      : `movie|${item.id}`;

    results.push({
      title: item.title,
      image: item.poster,
      href: href
    });
  }

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
