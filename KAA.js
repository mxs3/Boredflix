async function searchResults(keyword) {
    const results = [];

    const res = await fetchv2("https://kaa.to/api/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: keyword })
    });

    const json = await res.json();

    for (const item of json) {
        const title = item.title_en || item.title || "No Title";
        const slug = item.slug;
        const poster = item.poster?.hq
            ? `https://img.kaa.to/posters/${item.poster.hq}.webp`
            : null;

        results.push({
            title: title,
            image: poster,
            href: `https://kaa.to/${slug}`
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
