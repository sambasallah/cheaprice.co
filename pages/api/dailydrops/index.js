import firebase from '../firebase/firebase';

export default async (req, res) => {
    if(req.method === 'GET') {
        const shuffle = (arra1) => {
            let ctr = arra1.length, temp, index;
        
        // While there are elements in the array
            while (ctr > 0) {
        // Pick a random index
                index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
                ctr--;
        // And swap the last element with it
                temp = arra1[ctr];
                arra1[ctr] = arra1[index];
                arra1[index] = temp;
            }
            return arra1;
        }
        let drops = [];
        let products = [];
        await firebase.collection('prices')
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
               if(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)) {
                   drops.push(doc.data().id);
               }
            });
        }).catch((err) => {
            res.json({err});
        });
        if(drops.length >= 1) {
            let dailydeals = shuffle(drops);
        // filter to remove duplicate id's
        dailydeals = [...new Set(drops.slice(0,10))];
        await firebase.collection('products')
        .where('id','in',dailydeals)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                // return resolve(doc.data());
                products.push(doc.data());
            });
        }).catch((err) => {
            res.json(err);
        });
       res.json({dailydrops: products});
        }
        res.json({dailydrops: products});
    }
    res.json({message: 'Request Method Not Allowed'});
}