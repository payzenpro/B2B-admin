
import Address from "../models/address.js"; 

const HARDCODED_USER_ID = "6911b4f9e8eeb4165ab71564"; 

export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: HARDCODED_USER_ID }).sort({
      createdAt: -1,
    });
    console.log("Found addresses:", addresses.length);
    return res.json({ success: true, addresses });
  } catch (err) {
    console.error("getMyAddresses error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch addresses" });
  }
};

export const createAddress = async (req, res) => {
  try {
    const { label, name, phone, street, city, state, pincode, isDefault } = req.body;

    if (!phone || !street || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "phone, street, city, state, pincode required",
      });
    }

    if (isDefault) {
      await Address.updateMany(
        { user: HARDCODED_USER_ID },  
        { $set: { isDefault: false } }
      );
    }

    const addr = await Address.create({
      user: HARDCODED_USER_ID,  
      label,
      name,
      phone,
      street,
      city,
      state,
      pincode,
      isDefault: !!isDefault,
    });

    console.log("Created address:", addr._id);
    return res.status(201).json({ success: true, address: addr });
  } catch (err) {
    console.error("createAddress error:", err);
    return res.status(500).json({ success: false, message: "Failed to create address" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const addr = await Address.findOneAndDelete({
      _id: id,
      user: HARDCODED_USER_ID, 
    });

    if (!addr) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    return res.json({ success: true, message: "Address deleted" });
  } catch (err) {
    console.error("deleteAddress error:", err);
    return res.status(500).json({ success: false, message: "Failed to delete address" });
  }
};

 export const updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const { label, name, phone, street, city, state, pincode, isDefault } =
      req.body;

    const addr = await Address.findOne({ _id: id, user: req.user._id });
    if (!addr) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    addr.label = label ?? addr.label;
    addr.name = name ?? addr.name;
    addr.phone = phone ?? addr.phone;
    addr.street = street ?? addr.street;
    addr.city = city ?? addr.city;
    addr.state = state ?? addr.state;
    addr.pincode = pincode ?? addr.pincode;
    if (typeof isDefault === "boolean") addr.isDefault = isDefault;

    await addr.save();

    return res.json({
      success: true,
      address: addr,
    });
  } catch (err) {
    console.error("updateAddress error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update address",
    });
  }
};
