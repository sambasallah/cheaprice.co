const axios = require('axios').default;

export default async (req, res) => {
    await axios.get('http://localhost:3000/api/products/')
    .then((resp) => {
      res.json(resp.data)
    })
    .catch((err) => {
      res.json({message: 'Error occured'});
    });
}