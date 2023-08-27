import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";
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
router.put(
	"/completeProfile/:userId",
	userMiddleware.checkUserId,
	userController.userProfile
);
module.exports = router;
