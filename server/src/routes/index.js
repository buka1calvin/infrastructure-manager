import express from "express";
import user from './api/user.routes';
import ride from './api/ride.routes';
import booking from './api/booking.routes'
import messagesRoute from './api/message.routes'
import item from "./api/items.routes"


const routes=express.Router();
routes.use('/users',user);
routes.use('/rides', ride)
routes.use('/bookings',booking)
routes.use('/messages',messagesRoute)
routes.use('/items',item)
// routes.use("/chatbot")


export default routes;

