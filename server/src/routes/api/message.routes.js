import { Router } from "express"; 
import { addMessage,getMessages } from "../../controllers/messageChat.controller";

const router=Router()

router.post('/',addMessage)
router.post('/AllMessages',getMessages)

export default router
