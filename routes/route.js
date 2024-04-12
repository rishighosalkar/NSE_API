const { default: axios } = require('axios');
const router = require('express').Router();

async function fetchData(symbol) {
  try {
      var headers = {
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        };
        var params = {
          headers: headers,
          followRedirects: false,
          muteHttpExceptions: true
      };
      var ocresponse = await axios.get('https://www.nseindia.com/api/option-chain-indices?symbol='+symbol, params);
      return ocresponse.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);

  }
}


router.route('/').get(async (req, res) => {
  const params = req.query;
  const fetchedData = await fetchData(params.symbol);
  // console.log(fetchedData.records.data);
  const actualData = await fetchedData.records.data;
  const filterData = await actualData.filter(item => item.strikePrice == params.strikePrice && item.expiryDate == params.expiryDate)
  // console.log(filterData);
  res.json(filterData);
});


module.exports = router;