async function searchResults(keyword) {
    try {
        const results = [];
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            'Accept': 'application/json',
            'Referer': 'https://kaa.to/' // لو الموقع بيطلب Referer
        };
        const response = await fetchv2(`https://kaa.to/api/search?q=${encodeURIComponent(keyword)}`, { headers });
        const data = await response.json();

        data.forEach(item => {
            results.push({
                title: item.title?.trim() || 'N/A',
                image: item.poster?.hq ? `https://kaa.to/posters/${item.poster.hq}` : 'N/A',
                href: item.slug ? `/anime/${item.slug}` : 'N/A'
            });
        });

        return JSON.stringify(results);
    } catch (error) {
        console.error('Error in searchResults:', error);
        return JSON.stringify([]);
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
