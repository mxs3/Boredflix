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
    // بدال ما نستخدم JSON.stringify جوا href مباشرة، نستخدم Base64 لتجنّب الأخطاء
    const hrefObject = {
      id: item.id,
      type: item.is_tv ? 'tv' : 'movie',
      season: item.season_number || 1,
      episode: item.episode_number || 1
    };

    const encodedHref = btoa(JSON.stringify(hrefObject));  // encode href safely

    results.push({
      title: item.title,
      image: item.poster,
      href: encodedHref
    });
  }

  return JSON.stringify(results);
}
