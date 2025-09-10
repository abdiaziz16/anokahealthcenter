'use client';

import { useState } from 'react';
import Toast, { useToast } from '@/components/Toast';

interface JobApplication {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: File | null;
}

export default function Careers() {
  const { toast, showToast, hideToast } = useToast();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [formData, setFormData] = useState<JobApplication>({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null,
  });
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = ['.pdf', '.doc', '.docx'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validExtensions.includes(fileExtension)) {
        setError('Please upload a PDF or Word document');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, resume: file }));
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resume) {
      setError('Please upload your resume');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('position', formData.position);
      submitData.append('resume', formData.resume);

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        showToast('Thank you for your application. We will review your submission and get back to you soon.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          resume: null,
        });
        setSelectedPosition(null);
        setError('');
      } else {
        const errorMessage = result.error || 'Failed to submit application. Please try again.';
        setError(errorMessage);
        showToast(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      const errorMessage = 'Failed to submit application. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
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

  const positions = [
    {
      title: 'Qualified Clinicals',
      description: 'Clinical nurse specialist in mental health, Licensed independent clinical social worker (LICSW), Licensed marriage and family therapist (LMFT), Licensed psychologist (LP), Licensed professional clinical counselor (LPCC), Mental health rehabilitation professional, Nurse practitioner with psychiatric specialty (NP), Psychiatrist',
      requirements: [
        'Valid state license in respective field',
        'Minimum 2 years of clinical experience',
        'Strong communication and interpersonal skills',
        'Ability to work independently and as part of a team'
      ]
    },
    {
      title: 'Mental Health Practitioners',
      description: 'Mental health practitioners provide services to adults with mental illness with emotional disturbance. Must be under clinical supervision of a mental health professional.',
      requirements: [
        'Completed 30 semester hours or 45 quarter hours in behavioral sciences',
        '2,000 hours of supervised experience',
        'Training in mental illness, recovery, and de-escalation techniques',
        'Strong understanding of mental health and substance abuse issues'
      ]
    },
    {
      title: 'Certified Peer Specialist',
      description: 'Provide non-clinical, recovery-focused activities encouraging empowerment, self-determination, and decision-making.',
      requirements: [
        'Personal experience with mental health recovery',
        'Certified Peer Specialist certification',
        'Strong communication and interpersonal skills',
        'Ability to share personal recovery experiences appropriately'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Join Our Team</h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Make a difference in mental health care. Join our team of dedicated professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-[#00799F] mb-4">{position.title}</h3>
                <p className="text-white mb-4">{position.description}</p>
                <h4 className="text-lg font-semibold text-white mb-2">Requirements:</h4>
                <ul className="list-disc list-inside text-white space-y-2 mb-6">
                  {position.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSelectedPosition(position.title);
                    setFormData(prev => ({ ...prev, position: position.title }));
                  }}
                  className="w-full bg-[#00799F] text-white font-bold py-3 px-6 rounded-md hover:bg-[#006688] transition duration-300"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-gray-800/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#00799F]">Apply for {selectedPosition}</h3>
              <button
                onClick={() => setSelectedPosition(null)}
                className="text-white hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Full Name
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
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00799F] focus:border-[#00799F]"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-white mb-1">
                  Resume (PDF or Word Document)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00799F] focus:border-[#00799F]"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
                    Sending Application...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 