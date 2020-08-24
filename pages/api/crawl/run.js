import firebase from '../firebase/firebase';
const axios = require('axios').default;

export default async (req, res) => {
    if(req.method === 'POST') {
        await firebase.collection('products').limit(1)
        .get()
        .then(async (snaps) => {
          let products = [];
           snaps.forEach((doc) => {
             products.push(doc.data());
           })
           // https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/crawl
          
           await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/crawl',JSON.stringify({products}),{headers: {'Content-Type': 'application/json'}})
           .then((resp) => {
             res.json(resp.data);
           })
           .catch((err) => {
               // send email
              //  axios.post( process.env.NODE_ENV === 'development'? 
              //  `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/sendmail/crawlerror` : 
              //  `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/sendmail/crawlerror`,{headers: {'Content-Type': 'application/json'}})
              //  .catch((err) => {
              //     console.log('Error sending crawl error message');
              //  });
              console.log(err)
           });
          //  res.json({info: 'Crawl Started'});
        }).catch((err) => {
          // send email
          // axios.post( process.env.NODE_ENV === 'development'? 
          // `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/sendmail/producterror` : 
          // `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/sendmail/producterror`,{headers: {'Content-Type': 'application/json'}})
          // .catch((err) => {
          //    console.log('Error sending crawl error message');
          // });
        res.json({message: 'Error getting data'});
        });
    

    }
    res.json({message: 'Request method is not allowed'});
}