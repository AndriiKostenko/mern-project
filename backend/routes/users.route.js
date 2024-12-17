import express from "express";
import { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/user.controllers.js";
export const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;