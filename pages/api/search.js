import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { term } = req.query;
  const apiKey = process.env.BESTBUY_API_KEY;
  // the API takes search queries as each space seperated string joined by "&search="
  // for example, for oven stainless steel, we need search=oven&search=stainless&search=steel
  const formattedQuery = term.split(' ').join('&search=');
  const url = `https://api.bestbuy.com/v1/products((search=${formattedQuery}))?apiKey=${apiKey}&format=json`;

  try {
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    res.status(200).json(data.products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching search results' });
  }
}

