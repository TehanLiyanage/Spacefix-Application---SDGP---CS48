import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    universityName: '',
    department: '',
    role: '',
    city: '',
    county: '',
    numberOfHalls: '',
    totalStudents: '',
    existingSystem: '',
    preferredContactMethod: 'email',
    implementationTimeframe: '',
    specificRequirements: ''
  });

  const handleChange = (e) => {
    const value = e.target.type === 'radio' ? e.target.value : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const inputVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const InputField = ({ label, name, type = "text", placeholder, required = true, ...props }) => (
    <motion.div variants={inputVariants} className="space-y-2">
      <label htmlFor={name} className="block text-gray-700 font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </motion.div>
  );

  const SelectField = ({ label, name, options, required = true }) => (
    <motion.div variants={inputVariants} className="space-y-2">
      <label htmlFor={name} className="block text-gray-700 font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
        required={required}
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50 px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={contentVariants}
        className="w-full max-w-3xl"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Registration Inquiry
            </h1>
            <p className="mt-2 text-gray-600 text-lg">
              Tell us about your institution and requirements
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            variants={formVariants}
            className="p-8 space-y-6 bg-white/50 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
              />
              
              <InputField
                label="Contact Number"
                name="contactNumber"
                type="tel"
                placeholder="Enter your contact number"
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
              />

              <InputField
                label="University Name"
                name="universityName"
                placeholder="Enter your university name"
              />

              <InputField
                label="Department"
                name="department"
                placeholder="Enter your department"
              />

              <InputField
                label="Role/Position"
                name="role"
                placeholder="Enter your role"
              />

              <InputField
                label="City"
                name="city"
                placeholder="Enter your city"
              />

              <InputField
                label="County"
                name="county"
                placeholder="Enter your county"
              />

              <InputField
                label="Number of Halls"
                name="numberOfHalls"
                type="number"
                placeholder="Enter number of halls"
                min="1"
              />

              <InputField
                label="Total Students"
                name="totalStudents"
                type="number"
                placeholder="Enter total number of students"
                min="1"
              />

              <SelectField
                label="Existing Management System"
                name="existingSystem"
                options={[
                  { value: "none", label: "No existing system" },
                  { value: "manual", label: "Manual system" },
                  { value: "digital", label: "Digital system" },
                  { value: "mixed", label: "Mixed system" }
                ]}
              />

              <SelectField
                label="Preferred Contact Method"
                name="preferredContactMethod"
                options={[
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Phone" },
                  { value: "both", label: "Both" }
                ]}
              />

              <SelectField
                label="Implementation Timeframe"
                name="implementationTimeframe"
                options={[
                  { value: "immediate", label: "Within 1 month" },
                  { value: "quarter", label: "Within 3 months" },
                  { value: "halfYear", label: "Within 6 months" },
                  { value: "year", label: "Within 1 year" }
                ]}
              />
            </div>

            <motion.div variants={inputVariants} className="space-y-2">
              <label htmlFor="specificRequirements" className="block text-gray-700 font-medium">
                Specific Requirements or Questions
              </label>
              <textarea
                id="specificRequirements"
                name="specificRequirements"
                value={formData.specificRequirements}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                placeholder="Please share any specific requirements or questions you have"
                rows="4"
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full py-3 px-6 font-medium text-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Submit Inquiry</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default InquiryForm;