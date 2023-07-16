import shortid from 'shortid';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config()

var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });


export const verifyPayment=(req, res) => {
    const secret = "razorpaysecret";
  
    console.log(req.body);
  
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
  
    console.log(digest, req.headers["x-razorpay-signature"]);
  
    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      res.status(200).json({
        message: "OK",
      });
    } else {
      res.status(403).json({ message: "Invalid" });
    }
  };
  
  export const paymentusingRazorpay=async (req, res) => {
  
    // console.log(req.body);
    const payment_capture = 1;
    const amount =req.body.amount* 100;
    const currency = "INR";
  
    const options = {
      amount,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };
  
    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
    }
  };