import firebase from '../firebase/firebase';
const axios = require('axios').default;

export default (req, res) => {
    if(req.method === 'POST') {
        await firebase.collection('products')
        .get()
        .then((snaps) => {
           let products = [];
           snaps.docs.map((doc) => {
             products.push(doc.data());
           })
           axios.post('/aws-lambda-endpoint', {products: products},{headers: {'Content-Type': 'application/json'}})
           .catch((err) => {
               // send email
               axios.post('https://localhost:3000/api/sendmail/crawlerror',{headers: {'Content-Type': 'application/json'}})
               .catch((err) => {
                  console.log('Error sending crawl error message');
               });
           });
        }).catch((err) => {
          // send email
          axios.post('https://localhost:3000/api/sendmail/producterror',{headers: {'Content-Type': 'application/json'}})
          .catch((err) => {
             console.log('Error sending crawl error message');
          });
          return res.json({message: 'Error getting data'});
        })
    }
    return res.json({message: 'Request method is not allowed'});
}