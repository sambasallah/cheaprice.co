import firebase from '../firebase/firebase';
export default async (req, res) => {
    await firebase.collection('users')
    .where('id', '==', "1234")
    .get()
    .then((snap) => {
        snap.forEach((doc) => {
            doc.ref.update({
                email: 'new@email.com'
            })
        });
        res.json({message: 'Updated'});
    }).catch((err) => {
        res.json({error: err});
    });
}