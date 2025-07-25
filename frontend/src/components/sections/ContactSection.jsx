import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../data/mockData';

const ContactSection = () => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4" style={{ color: currentTheme?.textPrimary }}>
          Get in Touch
        </h2>
        <p className="text-xl mb-8" style={{ color: currentTheme?.textSecondary }}>
          Let's discuss your next project or collaboration
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: currentTheme?.cardBackground,
              borderColor: currentTheme?.cardBorder 
            }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: currentTheme?.textPrimary }}>
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: currentTheme?.textPrimary }}>
                    Email
                  </p>
                  <p style={{ color: currentTheme?.textSecondary }}>
                    {portfolioData.personal.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: currentTheme?.textPrimary }}>
                    Phone
                  </p>
                  <p style={{ color: currentTheme?.textSecondary }}>
                    {portfolioData.personal.phone}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: currentTheme?.textPrimary }}>
                    Location
                  </p>
                  <p style={{ color: currentTheme?.textSecondary }}>
                    {portfolioData.personal.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Response Time */}
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: currentTheme?.cardBackground,
              borderColor: currentTheme?.cardBorder 
            }}
          >
            <h4 className="text-lg font-semibold mb-4" style={{ color: currentTheme?.textPrimary }}>
              Response Time
            </h4>
            <p className="text-sm" style={{ color: currentTheme?.textSecondary }}>
              I typically respond to messages within 24-48 hours. For urgent matters, 
              please feel free to call me directly.
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: currentTheme?.cardBackground,
              borderColor: currentTheme?.cardBorder 
            }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: currentTheme?.textPrimary }}>
              Send Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentTheme?.textPrimary }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ 
                      backgroundColor: currentTheme?.inputBackground,
                      borderColor: currentTheme?.inputBorder,
                      color: currentTheme?.textPrimary
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentTheme?.textPrimary }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ 
                      backgroundColor: currentTheme?.inputBackground,
                      borderColor: currentTheme?.inputBorder,
                      color: currentTheme?.textPrimary
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme?.textPrimary }}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ 
                    backgroundColor: currentTheme?.inputBackground,
                    borderColor: currentTheme?.inputBorder,
                    color: currentTheme?.textPrimary
                  }}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme?.textPrimary }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  style={{ 
                    backgroundColor: currentTheme?.inputBackground,
                    borderColor: currentTheme?.inputBorder,
                    color: currentTheme?.textPrimary
                  }}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="mr-2" size={20} />
                    Send Message
                  </div>
                )}
              </motion.button>
            </form>
            
            {/* Submit Message */}
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg flex items-center ${
                  submitSuccess 
                    ? 'bg-green-100 border border-green-200' 
                    : 'bg-red-100 border border-red-200'
                }`}
              >
                {submitSuccess ? (
                  <CheckCircle className="text-green-600 mr-2" size={20} />
                ) : (
                  <AlertCircle className="text-red-600 mr-2" size={20} />
                )}
                <p className={submitSuccess ? 'text-green-800' : 'text-red-800'}>
                  {submitMessage}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;