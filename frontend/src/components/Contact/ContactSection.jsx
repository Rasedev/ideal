// components/Contact/ContactSection.jsx
// import React, { useState, useEffect } from 'react';

// const ContactSection = () => {
//   const [contactData, setContactData] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     service: ''
//   });

//   useEffect(() => {
//     const fetchContactData = async () => {
//       try {
//         const response = await fetch('/api/contact-info');
//         const data = await response.json();
//         setContactData(data);
//       } catch (error) {
//         setContactData({
//           title: "Collaborate on a project.",
//           subtitle: "web design of Development",
//           description: "Lorem ipsum dolor sit amet, consectetur adipiscing. Curabitur dolor amet gimnisi tellus, quis lorem ipsum tacitip.",
//           expertTitle: "Discussion with Financial Experts",
//           helpText: "How can we help you?"
//         });
//       }
//     };

//     fetchContactData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       if (response.ok) {
//         alert('Thank you for your message! We will contact you soon.');
//         setFormData({ name: '', email: '', phone: '', service: '' });
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   if (!contactData) return <div className="h-96 bg-gray-200 animate-pulse"></div>;

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               {contactData.title}
//             </h2>
//             <h3 className="text-xl text-blue-600 font-semibold mb-6">
//               {contactData.subtitle}
//             </h3>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div>
//               <p className="text-gray-600 mb-8 leading-relaxed">
//                 {contactData.description}
//               </p>
              
//               <div className="mb-8">
//                 <h4 className="text-xl font-bold text-gray-800 mb-4">
//                   {contactData.expertTitle}
//                 </h4>
//                 <p className="text-gray-600">
//                   {contactData.helpText}
//                 </p>
//               </div>

//               <div className="flex flex-wrap gap-2 mb-8">
//                 {['ALL', 'CONCEPT', 'FEB/ENTERG', 'AMET/CONCEPT', 'PROFESSIONAL', 'BUSINESS GROWTH', 'Cavity'].map((tag) => (
//                   <span key={tag} className="bg-white border border-gray-300 px-3 py-1 rounded text-sm text-gray-700">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-lg p-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-gray-700 mb-2 font-medium">Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Your Name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2 font-medium">Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Your Email"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2 font-medium">Phone Number:</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Your Phone Number"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2 font-medium">SERVICE</label>
//                   <select
//                     name="service"
//                     value={formData.service}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select a service</option>
//                     <option value="financial">Financial Planning</option>
//                     <option value="mortgage">Mortgage Advisor</option>
//                     <option value="investment">Investment Advisor</option>
//                     <option value="savings">Savings Money</option>
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
//                 >
//                   Get a Call Back
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;



import React, { useEffect, useState } from 'react';
import { useSections } from '../hooks/useSections';

const ContactSection = () => {
  const { 
    contactData, 
    loading, 
    contactSubmitSuccess,
    contactSubmitError,
    fetchContactData, 
    submitContactForm,
    clearContactSubmitStatus
  } = useSections();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });

  useEffect(() => {
    fetchContactData();
  }, [fetchContactData]);

  useEffect(() => {
    if (contactSubmitSuccess) {
      setFormData({ name: '', email: '', phone: '', service: '' });
      const timer = setTimeout(() => {
        clearContactSubmitStatus();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [contactSubmitSuccess, clearContactSubmitStatus]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContactForm(formData);
  };

  if (loading.contact && !contactData) {
    return <div className="h-96 bg-gray-200 animate-pulse"></div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {contactData?.title}
            </h2>
            <h3 className="text-xl text-blue-600 font-semibold mb-6">
              {contactData?.subtitle}
            </h3>
          </div>

          {/* Success/Error Messages */}
          {contactSubmitSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              Thank you for your message! We will contact you soon.
            </div>
          )}
          {contactSubmitError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {contactSubmitError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {contactData?.description}
              </p>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  {contactData?.expertTitle}
                </h4>
                <p className="text-gray-600">
                  {contactData?.helpText}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {contactData?.tags?.map((tag) => (
                  <span key={tag} className="bg-white border border-gray-300 px-3 py-1 rounded text-sm text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields same as before */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Name"
                  />
                </div>

                {/* ... other form fields ... */}

                <button
                  type="submit"
                  disabled={loading.contactSubmit}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
                >
                  {loading.contactSubmit ? 'Submitting...' : 'Get a Call Back'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;





