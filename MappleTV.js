const BASE_API = 'https://mappletv.uk/api/4k_media';

const headers = {
  'User-Agent': 'Mozilla/5.0 (SoraPlugin)',
  'Referer': 'https://mappletv.uk/'
};

// 🟢 1. البحث عن أنمي / فيلم
async function searchResults(keyword) {
  const results = [];
  const url = `${BASE_API}?search=${encodeURIComponent(keyword)}&mediaType=tv,movie&page=1&perPage=30`;
  const response = await fetchv2(url, { headers });
  const json = await response.json();

  for (const item of json.items) {
    results.push({
      title: item.title,
      image: item.poster,
      href: JSON.stringify({
        type: item.is_tv ? 'tv' : 'movie',
        id: item.id
      })
    });
  }

  return JSON.stringify(results);
}

// 🟢 2. تفاصيل الأنمي / الفيلم
async function extractDetails(url) {
  const { id, type } = JSON.parse(url);
  const apiUrl = `${BASE_API}/${id}`;
  const response = await fetchv2(apiUrl, { headers });
  const data = await response.json();

  return JSON.stringify([{
    title: data.title,
    description: data.overview,
    image: data.poster,
    aliases: data.original_title || '',
    airdate: data.release_date || '',
    type: type
  }]);
}

// 🟢 3. استخراج الحلقات (افتراضيًا 12 حلقة من الموسم 1)
async function extractEpisodes(url) {
  const { id, type } = JSON.parse(url);
  const results = [];

  if (type !== "tv") return JSON.stringify([]);

  const numEpisodes = 12; // ممكن يتغير لو في API مخصصة لاحقًا

  for (let i = 1; i <= numEpisodes; i++) {
    results.push({
      number: i,
      href: JSON.stringify({
        id: id,
        season: 1,
        episode: i
      })
    });
  }

  return JSON.stringify(results);
}

// 🟢 4. استخراج رابط التشغيل (فيلم أو حلقة)
async function extractStreamUrl(url) {
  const data = JSON.parse(url);

  let embedUrl = '';
  if (data.season) {
    embedUrl = `https://mappletv.uk/watch/tv/${data.id}-${data.season}-${data.episode}?autoPlay=true`;
  } else {
    embedUrl = `https://mappletv.uk/watch/movie/${data.id}?autoPlay=true`;
  }

  return embedUrl;
}
