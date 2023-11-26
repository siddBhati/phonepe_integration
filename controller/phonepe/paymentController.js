const crypto =  require('crypto');
const axios = require('axios');
const {salt_key, merchant_id} = require('./secret')

module.exports.newPayment = async (req, res) => {
    // res.send('hiiiiiii')
    try {
        // const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: 'MT7850590068188104',
            merchantUserId: 'MUID123',
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:5000/api/status/${merchantTransactionId}`,
            // redirectUrl: `http://localhost:5000/paymentdone`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        axios.request(options).then(function (response) {
            console.log('axios request for redirecting')
            console.log(response.data.data.instrumentResponse.redirectInfo.url);
            // return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
            res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
            // return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
            // res.status(200).json({
            //     status: 'success',
            //     body: response.data
            //   })
        })
        .catch(function (error) {
            console.error(error);
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

module.exports.checkStatus = async(req, res) => {
    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
    method: 'GET',
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay/${merchantId}/${merchantTransactionId}`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
    }
    };

    // CHECK PAYMENT STATUS
    axios.request(options).then(async(response) => {
        // if (response.data.success === true) {
        //     const url = `http://localhost:3000/success`
        //     return res.redirect(url)
        // } else {
        //     const url = `http://localhost:3000/failure`
        //     return res.redirect(url)
        // }
        console.log('axios request for status');
        res.render('successpayment', { data: response.data });
    })
    .catch((error) => {
        console.error(error);
    });
};


