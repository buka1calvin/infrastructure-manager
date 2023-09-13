import Stripe from "stripe";
import Booking from "../models/Booking";
import { sendEmail } from "../service/sendEmail.service";
import Ride from "../models/Ride";
import generateEmailText from "../service/generateEmailText";

const stripe = Stripe(process.env.SECRETE_KEY);

export const userPayment = async (req, res) => {
  const { email, firstname, id } = req.user;
  try {
    const bookings = await Booking.find({
      user_id: id,
      status: "approved",
      pay_status: "pending",
    });
     console.log("bookings", bookings)
     const booking = await bookings.map(booking => booking)
    if (bookings.length === 0) {
      res
        .status(404)
        .json({message: "Nothing to pay 😥."});
    } else {
      const customer = await stripe.customers.create({
        metadata: {
          email,
          name: firstname,
          booking: JSON.stringify(bookings.map((booking) => booking._id)),
        },
      });

      const line_items = bookings.map((item) => {
        return {
          price_data: {
            currency: process.env.CURRENCY,
            product_data: {
              name: "WooHoo car",
              description: "Drive your dream with WooHoo car",
              metadata: {
                id: item._id,
                ride_id: item.ride_id,
              },
            },
            unit_amount: item.total_price * 100,
          },
          quantity: parseInt(
            item.booked_seats + `${item.booked_seats > 1 ? "seats" : "seat"}`
          ),
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "KE", "RW"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: process.env.CURRENCY,
              },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: process.env.CURRENCY,
              },
              display_name: "Next day air",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
        line_items,
        mode: "payment",
        customer: customer.id,
        success_url: `${process.env.STRIPECHECKOUT_SUCCESS}/checkout-success`,
        cancel_url: `${process.env.STRIPECHECKOUT_SUCCESS}/bookings`,
      });
      res.send({ url: session.url });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const stripeHook = (req, res) => {
  let data;
  let eventType;
  let webhookSecret = process.env.SIGNING_SCRETE;

  if (webhookSecret) {
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      return res.status(400).send({ error: err });
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          console.log("customers", customer);
          const bookingIds = JSON.parse(customer.metadata.booking);
          const bookings = await Booking.find({ _id: { $in: bookingIds } });

          const rideIds = bookings.map((booking) => booking.ride_id);
          const rides = await Ride.find({ _id: { $in: rideIds } });
          let HTMLText;
           rides.map((ride) => {
            HTMLText = `<html>
            <head>
              <style>
                table {
                  border-collapse: collapse;
                  width: 50%;
                }
                
                th, td {
                  padding: 8px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                }
                
                th {
                  background-color: #f2f2f2;
                }
                
                .full {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
              </style>
            </head>
            <body>
              <table>
                <thead>
                  <tr style="width: 100%;">
                    <th>Departure</th>
                  </tr>
                  <tr class="full">
                    <td colspan="3">${ride.departureDate}</td>
                  </tr>
                  <tr>
                    <th>Booking-ID</th>
                    <th>Booker</th>
                    <th>Number of Seats</th>
                  </tr>
                  <tr>
                    <td>${bookings.map((booking) => booking._id)}</td>
                    <td>${customer.metadata.name}</td>
                    <td>${bookings.map((booking) => booking.booked_seats)}</td>
                  </tr>
                  <tr>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>FRW</th>
                  </tr>
                  <tr>
                    <td>${ride.origin}</td>
                    <td>${ride.destination}</td>
                    <td>${bookings.map((booking) => booking.total_price)}</td>
                  </tr>
                </thead>
              </table>
            </body>
          </html>`;
          });
          const sendToEmail = customer.metadata.email;
          bookings.forEach(async(booking) => {
           booking.pay_status = 'paid'
             await booking.save()
          })
          sendEmail(
            sendToEmail,
            "Your invoice for ride from woohoo car",
            HTMLText
          );
        } catch (err) {
          console.log("+++++++++++++++++++++++", err);
        }
      })
      .catch((err) => console.log("hello"));
  }

  res.send().end();
};
