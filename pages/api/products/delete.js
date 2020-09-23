
import firebase from '../firebase/firebase';
export default async (req, res) => {
    await firebase.collection('products')
    .where('id','==','WW92rWw-3wurw83urAOHFEIHASDNKLNAZFHWHEFi88IILSFJWEFHpw893ruJ-3URskW-ur')
    .get()
    .then((snap) => {
        snap.forEach((doc) => {
            doc.ref.delete();
        });
        res.json({message: 'Deleted'});
    }).catch((err) => {
        res.json({err: err});
    })
}