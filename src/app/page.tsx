'use client';

import { useState, useEffect } from "react";
import Toast, { useToast } from "@/components/Toast";

export default function Home() {
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showToast('Thank you for your message. We will get back to you soon.', 'success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        showToast(`Error: ${result.error || 'Failed to send message. Please try again.'}`, 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Check for hash on component mount
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  const services = [
    {
      title: 'Basic Living Skills',
      description: 'Learn essential skills for daily living and independence, including:',
      details: [
        'Personal hygiene and grooming',
        'Meal planning and preparation',
        'Household management',
        'Budgeting and money management',
        'Time management and organization'
      ]
    },
    {
      title: 'Community Integration',
      description: 'Develop skills to actively participate in community life:',
      details: [
        'Public transportation navigation',
        'Community resource utilization',
        'Social interaction skills',
        'Recreational activities',
        'Volunteer opportunities'
      ]
    },
    {
      title: 'Medication Education',
      description: 'Understand and manage your medication effectively:',
      details: [
        'Medication purpose and effects',
        'Proper medication administration',
        'Side effect management',
        'Medication scheduling',
        'Communication with healthcare providers'
      ]
    },
    {
      title: 'Certified Peer Specialist Services',
      description: 'Connect with certified peer specialists who understand your journey:',
      details: [
        'Peer support and mentoring',
        'Recovery planning',
        'Crisis prevention',
        'Wellness strategies',
        'Personal goal setting'
      ]
    },
    {
      title: 'Social Skills Development',
      description: 'Build and maintain healthy relationships:',
      details: [
        'Communication skills',
        'Conflict resolution',
        'Boundary setting',
        'Relationship building',
        'Social networking'
      ]
    },
    {
      title: 'Transition to Community Living',
      description: 'Get assistance with transitioning to community living:',
      details: [
        'Housing search and placement',
        'Moving assistance',
        'Community orientation',
        'Resource connection',
        'Ongoing support'
      ]
    }
  ];

  return (
    <div className="relative">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      {/* Floating Referral Button */}
      <a
        href="https://form.jotform.com/251537077898170"
            target="_blank"
            rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#00799F] hover:bg-[#006688] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Refer a Client
      </a>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
          {/* Main Circles */}
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#00799F]/40 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-[900px] h-[900px] bg-[#00799F]/40 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-[#00799F]/40 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          
          {/* Triangle */}
          <div className="absolute top-1/4 left-1/4 w-0 h-0 border-l-[400px] border-r-[400px] border-b-[693px] border-l-transparent border-r-transparent border-b-[#00799F]/30 transform rotate-45" />
          
          {/* Additional Circles */}
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00799F]/30 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-[#00799F]/30 rounded-full blur-2xl" />

          {/* New Shapes */}
          {/* Small Circles */}
          <div className="absolute top-1/4 right-1/3 w-[200px] h-[200px] bg-[#00799F]/20 rounded-full blur-xl" />
          <div className="absolute bottom-1/3 left-1/4 w-[150px] h-[150px] bg-[#00799F]/20 rounded-full blur-xl" />
          <div className="absolute top-2/3 left-2/3 w-[180px] h-[180px] bg-[#00799F]/20 rounded-full blur-xl" />

          {/* Squares */}
          <div className="absolute top-1/5 right-1/5 w-[300px] h-[300px] bg-[#00799F]/15 rotate-45 blur-xl" />
          <div className="absolute bottom-1/5 left-1/5 w-[250px] h-[250px] bg-[#00799F]/15 rotate-45 blur-xl" />

          {/* Additional Triangles */}
          <div className="absolute top-2/3 right-1/4 w-0 h-0 border-l-[200px] border-r-[200px] border-b-[346px] border-l-transparent border-r-transparent border-b-[#00799F]/25 transform -rotate-45" />
          <div className="absolute bottom-1/3 left-2/3 w-0 h-0 border-l-[150px] border-r-[150px] border-b-[260px] border-l-transparent border-r-transparent border-b-[#00799F]/25 transform rotate-135" />

          {/* Blurred Lines */}
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[2px] bg-[#00799F]/15 blur-xl transform rotate-45" />
          <div className="absolute top-1/3 right-1/3 w-[300px] h-[2px] bg-[#00799F]/15 blur-xl transform -rotate-45" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/75 to-gray-900/75 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Anoka Health Center LLC
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white">
              Adult Rehabilitative Mental Health Services
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#00799F] hover:bg-[#006688] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 min-w-[180px]"
              >
                Contact Us
              </button>
              <a
                href="https://form.jotform.com/251537077898170"
            target="_blank"
            rel="noopener noreferrer"
                className="bg-[#00799F] hover:bg-[#006688] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 flex items-center justify-center gap-2 min-w-[180px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Refer a Client
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-gradient-to-b from-gray-900 to-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">About Anoka Health Center</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Helping individuals achieve independence through personalized mental health services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#00799F] mb-4">Our Mission</h3>
              <p className="text-white mb-6">
                We provide recovery-oriented interventions to help individuals acquire and enhance essential life skills, restoring capabilities affected by mental illness.
              </p>
              <p className="text-white">
                We believe in empowering individuals to lead fulfilling, independent lives through comprehensive support and personalized care.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#00799F] mb-4">Our Approach</h3>
              <p className="text-white mb-6">
                Our qualified professionals create personalized treatment plans to help you develop the skills needed for independent living and community participation.
              </p>
              <p className="text-white">
                Our team of qualified professionals works closely with each client to create personalized treatment plans that address their specific goals and challenges.
              </p>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-gray-800/50">
            <h3 className="text-2xl font-bold text-[#00799F] mb-6">Eligibility Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <h4 className="text-lg font-semibold text-white mb-3">Requirements:</h4>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>18 years or older</li>
                  <li>Recent diagnostic assessment</li>
                  <li>Substantial disability in three or more areas</li>
                  <li>Capacity to benefit from services</li>
                </ul>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <h4 className="text-lg font-semibold text-white mb-3">Service Areas:</h4>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Anoka County</li>
                  <li>Dakota County</li>
                  <li>Hennepin County</li>
                  <li>Ramsey County</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 bg-gradient-to-b from-gray-800 to-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Comprehensive services to help you live independently and improve your quality of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 border border-gray-800/50"
              >
                <h3 className="text-2xl font-bold text-[#00799F] mb-4">{service.title}</h3>
                <p className="text-white mb-4">{service.description}</p>
                <ul className="list-disc list-inside text-white space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
            <h3 className="text-2xl font-bold text-[#00799F] mb-4">Service Delivery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <h4 className="text-lg font-semibold text-white mb-3">How We Work</h4>
                <p className="text-white">
                  Services are provided in your home or community setting. Our professionals work one-on-one to help you develop essential life skills.
                </p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <h4 className="text-lg font-semibold text-white mb-3">Getting Started</h4>
                <p className="text-white">
                  Begin with a referral from a mental health professional. We&apos;ll complete an assessment and create your personalized treatment plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-gradient-to-b from-gray-900 to-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Get in touch to learn more about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-800/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#00799F] mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">Address</h4>
                    <p className="text-white">
                      2021 E Hennepin Ave, Ste 475<br />
                      Minneapolis, MN, 55413
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Phone</h4>
                    <p className="text-white">(612) 259-7803</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#00799F] mb-4">Hours</h3>
                <p className="text-white">
                  Monday - Friday: 9:00 AM - 5:00 PM<br />
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#00799F] mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00799F] focus:border-[#00799F]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00799F] focus:border-[#00799F]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00799F] focus:border-[#00799F]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00799F] focus:border-[#00799F]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-[#00799F] hover:bg-[#006688]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
