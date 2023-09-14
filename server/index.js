import app from './app';
import 'dotenv/config';
import { initializeChat } from './service/chatting.service';


const port=process.env.PORT;
const server=app.listen(port,()=>{
  console.log(`server is running at server http://localhost:${port}`);
});

const io=initializeChat(server)

