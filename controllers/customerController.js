import generateToken from "../utils/generateToken.js";
import Customer from "../models/customer.js";

export const signUp = async(req, res) => {
    try {
        const customer = await Customer.create(req.body);
        console.log("customer");
        if (customer) {
            console.log(customer);
               return res.status(200).json(
                {
                    message: "customer created !!!",
                    customer: customer,
                })
        } else {
            return res.status(401).json(
                {
                    message: "invalid creadentials !!!",
                })
        }
    } catch (error) {
        return res.status(500).json(
            {
                message: "Error in creating the customer !!!",
                error: error,
            })
    }
}


export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {

    const customer = await Customer.findOne({ email });

    if (!customer || customer?.password!==password) {
      
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = generateToken(customer._id);

   return  res.status(200).json({
      message: "Login successful",
      customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        token, 
      },
    });
  } catch (error) {
return res.status(500).json({ message: "Error", error: error.message });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get customers", error: error.message });
  }
};


export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customer", error: error.message });
  }
};


export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error: error.message });
  }
};


export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error: error.message });
  }
};
