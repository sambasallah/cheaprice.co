
import firebase from '../firebase/firebase';
export default async (req, res) => {
    await firebase.collection('prices')
    .where('id','==','fjJAJKDSJFKJKJjskjfkjakjskfkJKJAKJFFUiuR2skjfk')
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