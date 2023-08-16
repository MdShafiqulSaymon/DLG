import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";
import prisma from "../../db/db.server";
import utils from "../middleware/utils";
import userMiddleware from "../middleware/user.middleware";
router.post(
	"/register",
	userMiddleware.checkUserEmail,
	userController.createUser
);
router.post("/login", userMiddleware.checkUserExist, userController.logIn);
router.delete(
	"/:userId",
	userMiddleware.checkUserId,
	userController.deleteUser
);
router.get("/users", userController.getAllUser);
router.put("/:userId", userMiddleware.checkUserId, userController.updatedUser);
module.exports = router;
