import { Router } from "express";
import extractToken from "../../middleWares/checkUserWithToken";
import {createUserItem ,itemStatusUpdate,getAllItems} from "../../controllers/item.controller";

const router = Router();

router.get("/",extractToken,getAllItems
)
export default router;