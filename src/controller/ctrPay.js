const Stripe = require('stripe')

const ctrPay = {}

const stripe = new Stripe(process.env.KEY_STRIPE)

ctrPay.donaciones = async (req, res, next) => {
    try {
        const { id, amount, billing_details } = req.body
        console.log(id, amount, billing_details)
        const payment = await stripe.paymentIntents.create({

            amount,
            currency: "eur",
            description: "Donación",
            payment_method: id,
            confirm: true,
            receipt_email: billing_details.email
        })
        //console.log(payment)
        res.status(200).json({ message: 'Muchas gracias por su donación' })
    } catch (err) {
        console.log(err)
        next(err)
    }

}

module.exports = ctrPay