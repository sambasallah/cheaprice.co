import firebase from '../firebase/firebase';

export default async (req, res) => {
    if(req.method !== 'GET') {
        res.json({message: 'Request Method Not Allowed'});
    }
    await firebase
    .collection('products')
    .get()
    .then((data) => {
        let allDocs = [];
        data.docs.map((doc) => {
            allDocs.push(doc.data());
        });
        res.json(allDocs);
    })
    .catch((error) => {
        res.json(error);
    });
}