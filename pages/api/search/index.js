// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const algoliasearch = require('algoliasearch');

export default async (req, res) => {
    if(req.method !== 'POST') {
        res.json({message: 'Request method is not allowed'});
    }
    const client = algoliasearch('VL9V6CVL87',process.env.NEXT_PUBLIC_ALGOLIA_API);
    const index = client.initIndex('cheaprice.co');
    index.search(req.body.searchText).then(( { hits }) => {
        res.json({products: hits});
    }).catch((err) => {
        res.json({err: err});
    });
}
