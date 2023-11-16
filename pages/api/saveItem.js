import clientPromise from '../../lib/mongodb';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  // Connect to the MongoDB client
  const client = await clientPromise;
  const db = client.db("bestBuyWishlist");
  const { userID, product } = req.body;

  try {
    // Check if the item already exists in the 'items' collection
    const existingItem = await db.collection('items').findOne({ sku: product.sku });
    if (!existingItem) {
      // If not, add it to the 'items' collection
      // Spread operator creates new object with same key, value pairs
      // Useful for adding additional fields or modifying existing fields
      // Without changing the original object
      await db.collection('items').insertOne({ ...product });
    }

    // Add the item to the user's tracking list in 'user_items'
    await db.collection('user_items').updateOne(
      { userID },
      { $addToSet: { items: product.sku } }, // Prevents duplicates
      { upsert: true }
    );

    res.status(200).json({ message: 'Item saved successfully' });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Error saving item' });
  }
}
