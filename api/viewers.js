const admin = require('firebase-admin');
const serviceAccount = require('../AgastyaBratha/es-project-7d0c1-firebase-adminsdk-efvny-3f0c9b4463.json');  

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://es-project-7d0c1-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();
const ref = db.ref('viewers');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { action } = req.body;
    
    const snapshot = await ref.once('value');
    let count = snapshot.val() || 0;
    console.log('Current Count:', count);
    if (action === 'increment') {
      count += 1;
    } else if (action === 'decrement') {
      count -= 1;
    }

    await ref.set(count);

    res.status(200).json({ count });
  } else {
    const snapshot = await ref.once('value');
    const count = snapshot.val() || 0;
    res.status(200).json({ count });
  }
};
