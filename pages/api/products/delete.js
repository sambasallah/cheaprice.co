
import firebase from '../firebase/firebase';
export default async (req, res) => {
    await firebase.collection('products')
    .where('id','==','20HGHG82748SJ2893RSDJDKFhHSJH23hfweirworuUIWF33u882374')
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