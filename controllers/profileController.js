import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
   
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ profile: user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
