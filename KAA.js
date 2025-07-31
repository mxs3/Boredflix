async function searchResults(keyword) {
  const apiKey = "f545e0c7b78f5294a6316e4a1a467b45"; // مفتاح TMDB الظاهر
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(keyword)}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const results = (data.results || [])
      .filter(item => item.media_type === "movie" || item.media_type === "tv")
      .map(item => ({
        title: item.title || item.name || "Untitled",
        image: item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : "",
        href: `https://boredflix.com/watch/${item.media_type}/${item.id}`
      }));

    return JSON.stringify(results);
  } catch (err) {
    return JSON.stringify([{ title: "Error loading results", image: "", href: "" }]);
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
