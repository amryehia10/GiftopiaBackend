const axios = require('axios');

const PAYMOB_API_BASE_URL = 'https://accept.paymob.com/api';
const API_KEY = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1Rjd09ESTNMQ0p1WVcxbElqb2lNVGN4TXpBM09UUTJNaTQwTmpRMk56SWlmUS5LRnhtYXJqMS1hWDNIcFFxMFc4WTRIQkhEUWJERkllMEgyOUNhZ0Q4RnJzZWxmdnFDeFNEZ0hMakQ3ZE90WnI2TnlLZGM5RmpyTmlrb19JekFqUVNSUQ=='
const integrationId = 4555884;
const frameId = 837898
async function getAuthToken() {
    try {
        const response = await axios.post(`${PAYMOB_API_BASE_URL}/auth/tokens`, {
            api_key: API_KEY
        });
        return response.data.token;
    } catch (error) {
        console.error('Error obtaining authentication token:', error.response.data);
        throw new Error('Failed to obtain authentication token');
    }
}

async function registerOrder(token, amount) {
    try {
        let response = await axios.post(`${PAYMOB_API_BASE_URL}/ecommerce/orders`, {
            auth_token: token,
            delivery_needed: false,
            amount_cents: amount * 100,
            currency: "EGP",
            items: [],
        })
        return response.data.id;
    } catch (error) {
        console.error('Error obtaining order id:', error.response.data);
        throw new Error('Failed to obtain order id');
    }
}

async function generatePaymentKey(token, orderId, amount, user) {
    try {
        let response = await axios.post(`${PAYMOB_API_BASE_URL}/acceptance/payment_keys`, {
            auth_token: token,
            amount_cents: amount * 100,
            expiration: 3600,
            order_id: orderId,
            currency: "EGP",
            billing_data: {
                email: user.email,
                phone_number: user.phone,
                floor: user.address,
                building: user.address,
                street: user.address,
                city: user.address,
                country: user.address,
                first_name: user.name,
                last_name: user.name,
                state: user.address,
                postal_code: user.address,
                apartment: user.address
            },
            integration_id: integrationId
        })
        return response.data.token;
    } catch (error) {
        throw new Error(error);
    }
}

let createPayment = async (req, res) => { 
    try {
        console.log(req.body)
        const amount = req.body.amount;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const name = req.body.name;

        const authToken = await getAuthToken();
        const orderId = await registerOrder(authToken, amount)
        const user = {email: email, phone: phone, address: address, name: name}
        const paymentToken = await generatePaymentKey(authToken, orderId, amount, user)
        res.status(200).json({status:"success", data: {data: `https://accept.paymobsolutions.com/api/acceptance/iframes/${frameId}?payment_token=${paymentToken}`, orderId: orderId}})
    } catch (error) { 
        res.status(404).json({ status: "fail", error: error })
    }
};

module.exports = {createPayment}