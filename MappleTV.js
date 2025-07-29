async function searchResults(keyword) {
  try {
    const url = `https://mappletv.uk/search?q=${encodeURIComponent(keyword)}`;
    const res = await fetchv2(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://mappletv.uk/'
      }
    });

    const html = await res.text();
    const results = [];

    const items = html.split('class="card"');
    for (const item of items) {
      const hrefMatch = item.match(/href="\/details\/(movie|tv)\/(\d+)"/);
      const imgMatch = item.match(/<img[^>]+src="([^"]+)"[^>]*>/);
      const titleMatch = item.match(/class="card-title"[^>]*>\s*([^<]+)/);

      if (hrefMatch && imgMatch && titleMatch) {
        const type = hrefMatch[1]; // movie أو tv
        const id = hrefMatch[2];
        const embedUrl = type === 'movie'
          ? `https://mappletv.uk/watch/movie/${id}?autoPlay=true`
          : `https://mappletv.uk/watch/tv/${id}-1-1?autoPlay=true`;

        results.push({
          title: decodeHTMLEntities(titleMatch[1]),
          href: embedUrl,
          image: imgMatch[1],
          type
        });
      }
    }

    if (results.length === 0) {
      return JSON.stringify([{ title: 'No results found', href: '', image: '' }]);
    }

    return JSON.stringify(results);
  } catch (err) {
    return JSON.stringify([{ title: 'Error', href: '', image: '', error: err.message }]);
  }
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
