import Shop from "../models/shop.js";


export const getMyShop = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const shop = await Shop.findOne({ vendor: vendorId });

    return res.json({
      success: true,
      data: shop || null,
    });
  } catch (err) {
    console.error("Error in getMyShop:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch shop details",
    });
  }
};

export const upsertMyShop = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const {
      shopName,
      description,
      logo,
      banner,
      address = {},
      contact = {},
      social = {},
      status,
    } = req.body;

    if (!shopName) {
      return res.status(400).json({
        success: false,
        message: "Shop name is required",
      });
    }

    const slug = makeSlug(shopName);
    if (existingWithSlug) {
      return res.status(400).json({
        success: false,
        message: "Shop name already used by another vendor",
      });
    }

    const updateData = {
      vendor: vendorId,
      shopName,
      slug,
      description: description || "",
      logo: logo || "",
      banner: banner || "",
      address: {
        line1: address.line1 || "",
        line2: address.line2 || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
        country: address.country || "India",
      },
      contact: {
        phone: contact.phone || "",
        email: contact.email || req.user.email, 
      },
      social: {
        website: social.website || "",
        instagram: social.instagram || "",
        facebook: social.facebook || "",
        youtube: social.youtube || "",
      },
    };

    if (status) {
      updateData.status = status;
    }

    const shop = await Shop.findOneAndUpdate(
      { vendor: vendorId },
      updateData,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    return res.json({
      success: true,
      message: "Shop saved successfully",
      data: shop,
    });
  } catch (err) {
    console.error("Error in upsertMyShop:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to save shop",
    });
  }
};

export const getShopBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const shop = await Shop.findOne({ slug, status: "active" }).populate(
      "vendor",
      "name email"
    );

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    return res.json({
      success: true,
      data: shop,
    });
  } catch (err) {
    console.error("Error in getShopBySlug:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch shop",
    });
  }
};
