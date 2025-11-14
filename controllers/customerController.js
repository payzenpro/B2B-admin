// import Customer from '../models/Customer.js';

// // Get all customers
// export const getAllCustomers = async (req, res) => {
//   try {
//     console.log(' Fetching all customers...');
//     const customers = await Customer.find().sort({ createdAt: -1 });
//     console.log(' Customers found:', customers.length);
//     res.json({ success: true, data: customers });
//   } catch (error) {
//     console.error(' Error fetching customers:', error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get customer by ID
// export const getCustomerById = async (req, res) => {
//   try {
//     console.log(' Fetching customer:', req.params.id);
//     const customer = await Customer.findById(req.params.id);
    
//     if (!customer) {
//       return res.status(404).json({ success: false, message: 'Customer not found' });
//     }
    
//     res.json({ success: true, data: customer });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Create customer
// export const createCustomer = async (req, res) => {
//   try {
//     console.log(' Creating customer:', req.body);
    
//     const customer = new Customer(req.body);
//     await customer.save();
    
//     console.log(' Customer created:', customer._id);
//     res.status(201).json({ success: true, data: customer });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Update customer
// export const updateCustomer = async (req, res) => {
//   try {
//     console.log(' Updating customer:', req.params.id);
    
//     const customer = await Customer.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
    
//     if (!customer) {
//       return res.status(404).json({ success: false, message: 'Customer not found' });
//     }
    
//     res.json({ success: true, data: customer });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Delete customer
// export const deleteCustomer = async (req, res) => {
//   try {
//     console.log(' Deleting customer:', req.params.id);
    
//     const customer = await Customer.findByIdAndDelete(req.params.id);
    
//     if (!customer) {
//       return res.status(404).json({ success: false, message: 'Customer not found' });
//     }
    
//     res.json({ success: true, message: 'Customer deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


import User from '../models/Customer.js';

// ✅ Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' });
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create customer
export const createCustomer = async (req, res) => {
  try {
    const customer = await User.create({ ...req.body, role: 'customer' });
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
