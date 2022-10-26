const nodemailer = require('nodemailer');

export default async function webhookHandler(req, res) {
  if (req.method === 'POST') {
    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

      const coupon = await stripe.coupons.create({
        percent_off: 10,
        duration: 'once',
      });

      const { code } = await stripe.promotionCodes.create({
        coupon: coupon.id,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nebobrew@gmail.com',
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: 'Nebo Brew',
        to: req.body.email,
        subject: 'Welcome to the newsletter!',
        html: `
		<div style="background:#927F71;padding:3rem;text-align:center;color:#ffffff;">
		<h1>NEBO BREW</h1>
		</div>
		<div style="background:#ffffff;padding:2rem;text-align:center;">
			<h2 style="font-size:2rem;color:#000000;font-weight:normal;">Your 10% discount code:</h2>
			<p style="font-size:3rem;color:#000000;font-weight:bold;">${code}</p>
		</div>
		`,
      };

      transporter.sendMail(mailOptions);
      res.status(200).send();
    } catch (error) {
      res.status(500).send();
    }
  }
}
