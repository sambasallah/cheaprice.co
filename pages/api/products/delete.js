
import firebase from '../firebase/firebase';
export default async (req, res) => {
    await firebase.collection('products')
    .where('id','==','uwSNDC82fHWESNNZNWIWURL-389YhsjdhfHOPWEHFISNVSOKD4u8KS-K-J3i-JFK38y')
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