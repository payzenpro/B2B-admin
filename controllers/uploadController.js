import cloudinary from '../config/cloudinary.js';
import fs from 'fs';


export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    console.log(' Uploading to Cloudinary:', req.file.originalname);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'ecommerce/products',
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    fs.unlinkSync(req.file.path);

    console.log(' Uploaded:', result.secure_url);

    res.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error(' Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    console.log(` Uploading ${req.files.length} images`);

    const uploadPromises = req.files.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: 'ecommerce/products',
        resource_type: 'image',
        transformation: [
          { width: 800, height: 800, crop: 'limit' },
          { quality: 'auto' }
        ]
      })
    );

    const results = await Promise.all(uploadPromises);

    req.files.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    const images = results.map(result => ({
      url: result.secure_url,
      publicId: result.public_id
    }));

    console.log(` Uploaded ${images.length} images`);

    res.json({
      success: true,
      images: images,
      count: images.length,
      message: `${images.length} images uploaded successfully`
    });

  } catch (error) {
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    
    console.error(' Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID required'
      });
    }

    console.log(' Deleting:', publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    console.log(' Deleted successfully');

    res.json({
      success: true,
      message: 'Image deleted successfully',
      result: result
    });

  } catch (error) {
    console.error(' Delete error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
