const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://es-project-7d0c1-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();
const ref = db.ref('viewers');

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { action } = req.body;
      console.log('Request Action:', action);

      const snapshot = await ref.once('value');
      let count = snapshot.val() || 0;
      console.log('Current Count:', count);

      if (action === 'increment') {
        count += 1;
      } else if (action === 'decrement') {
        count -= 1;
      }

      await ref.set(count);
      console.log('Updated Count:', count);

      res.status(200).json({ count });
    } else {
      const snapshot = await ref.once('value');
      const count = snapshot.val() || 0;
      console.log('Current Count on GET:', count);
      res.status(200).json({ count });
    }
  } catch (error) {
    console.error('Error in API function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
