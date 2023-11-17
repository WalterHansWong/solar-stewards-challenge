import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db("bestBuyWishlist");
    
    const { userID, sku } = req.body;

    // Update the user_items collection to remove the sku
    await db.collection('user_items').updateOne(
      { userID },
      { $pull: { items: sku } }
    );

    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ error: 'Error deleting item' });
  }
}
