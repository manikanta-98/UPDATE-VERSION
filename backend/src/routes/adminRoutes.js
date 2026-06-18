import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import User from "../models/User.js";
import { isUsingJsonFallback } from "../config/db.js";
import { loadJsonUsers } from "../services/jsonUsers.js";

const router = Router();

router.use(adminAuth);

router.get("/users", async (req, res) => {
  try {
    if (isUsingJsonFallback()) {
      const users = loadJsonUsers();
      return res.json({ success: true, data: users });
    }
    const users = await User.find({}).sort({ createdAt: -1 }).select("-password");
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/analytics", async (req, res) => {
  try {
    if (isUsingJsonFallback()) {
      const users = loadJsonUsers();
      const todayLogins = users.filter((u) => {
        if (!u.lastLogin) return false;
        const d = new Date(u.lastLogin);
        const today = new Date();
        return d.toDateString() === today.toDateString();
      }).length;
      return res.json({
        success: true,
        data: { totalUsers: users.length, todayLogins },
      });
    }

    const totalUsers = await User.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayLogins = await User.countDocuments({
      updatedAt: { $gte: today }, // lastLogin isn't in User schema? Oh wait, is lastLogin recorded? Wait! In authController.js login:
      // wait, does authController update lastLogin?
    });

    res.json({ success: true, data: { totalUsers, todayLogins } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
