import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const userID = req.query.userID;

  try {
    const client = await clientPromise;
    const db = client.db("bestBuyWishlist");

    // Fetch user's saved SKUs from 'user_items' collection
    const userItems = await db.collection('user_items').findOne({ userID });
    if (!userItems) {
      return res.status(404).json({ message: 'No saved items found' });
    }

    // Fetch item details from 'items' collection
    const items = await db.collection('items')
                          .find({ sku: { $in: userItems.items } })
                          .toArray();

    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching saved items:', error);
    res.status(500).json({ error: 'Error fetching saved items' });
  }
}
