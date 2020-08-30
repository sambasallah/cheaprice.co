const axios = require('axios').default;
export default async (req, res) => {
    if(req.method === 'POST') {
        const { products } = req.body;
        products.forEach(async (value) => {
            if(value.store == 'Amazon') {
                const filterPrice  = (str) => {
                    if(str === 'Currently unavailable') {
                        return null;
                    }
                    return str.replace(/[`~!@#%^&*()_a-zA-Z|+\-=?;:'",<>\\n{\}\[\]\\\/]/gi, '');
                }
                console.log('Amazon');
                await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/amazon/add',{url: value.url},
                {headers: {'Content-Type': 'application/json'}}).
                then((resp) => {
                     let priceRaw = filterPrice(resp.data.price);
                     let pricefilter = priceRaw.replace(/\s\s+/g,'');
                     let price = pricefilter.startsWith('$')? pricefilter.substr(1) : pricefilter.substr(3);
                     let previousPrice = resp.data.previousPrice !== null? 
                     resp.data.previousPrice.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\\n{\}\[\]\\\/]/gi, '') : null;
                     let scraped = {
                        title: resp.data.title, url: resp.data.url, 
                        price: price, 
                        previousPrice: previousPrice,
                        description: resp.data.description,
                        image: resp.data.image,
                        store: resp.data.store
                        };
                     axios.post(process.env.NODE_ENV === 'development'? 
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/price/compare` : 
                    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/price/compare`, {previousData: value, scraped: scraped},
                      {headers: {'Content-Type': 'application/json'}})
                      .catch((err) => {
                          console.log('Error sending data');
                      });
                }).catch((err) => {
                    axios.post(process.env.NODE_ENV === 'development'? 
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/price/compare` : 
                    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/price/compare`, {previousData: value, scraped: null},
                      {headers: {'Content-Type': 'application/json'}})
                      .catch((err) => {
                          console.log('Error sending data');
                      });
                    console.log(err);
                });
            } else if(value.store === 'Walmart') {
                await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/walmart/add',{url: value.url},
                {headers: {'Content-Type': 'application/json'}}).
                then((resp) => {
                    console.log(resp.data);
                     axios.post(process.env.NODE_ENV === 'development'? 
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/price/compare` : 
                    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/price/compare`, {previousData: value, scraped: resp.data},
                      {headers: {'Content-Type': 'application/json'}})
                      .catch((err) => {
                          console.log('Error sending data');
                      });
                }).catch((err) => {
                    axios.post(process.env.NODE_ENV === 'development'? 
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/price/compare` : 
                    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/price/compare`, {previousData: value, scraped: null},
                      {headers: {'Content-Type': 'application/json'}})
                      .catch((err) => {
                          console.log('Error sending data');
                      });
                    console.log(err);
                });
            } else if(value.store === 'eBay') {
                await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/ebay/add',{url: value.url},
                {headers: {'Content-Type': 'application/json'}}).
                then((resp) => {
                    console.log(resp.data);
                    axios.post(process.env.NODE_ENV === 'development'? 
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/price/compare` : 
                    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/price/compare`, {previousData: value, scraped: resp.data},
                      {headers: {'Content-Type': 'application/json'}})
                      .catch((err) => {
                          console.log('Error sending data');
                      });
                }).catch((err) => {
                    axios.post(process.env.NODE_ENV === 'development'? 
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/price/compare` : 
                    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/price/compare`, {previousData: value, scraped: null},
                      {headers: {'Content-Type': 'application/json'}})
                      .catch((err) => {
                          console.log('Error sending data');
                      });
                    console.log(err);
                });
            } else {
                console.log('Unsupported store');
            }
            console.log('Crawl Completed');
        });
    }
     res.json({message: 'Request Method Not Allowed'});
}