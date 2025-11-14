import Banner from '../models/Banner.js';

export const getAllBanners = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'vendor') {
      filter.vendorId = req.user.userId;  
    }

    const banners = await Banner.find(filter);
    res.json({ success: true, data: banners, count: banners.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get single banner
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create banner
export const createBanner = async (req, res) => {
  try {
    const bannerData = {
      ...req.body,
      vendorId: req.user.role === 'vendor' ? req.user.userId : null
    };

    const banner = new Banner(bannerData);
    await banner.save();

    res.status(201).json({ 
      success: true, 
      message: 'Banner created',
      data: banner 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update banner
export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    if (req.user.role === 'vendor' && banner.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const updated = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      message: 'Banner updated',
      data: updated 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete banner
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    if (req.user.role === 'vendor' && banner.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await Banner.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Toggle banner status
export const toggleBannerStatus = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({ 
      success: true, 
      message: 'Banner status updated',
      data: banner 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
