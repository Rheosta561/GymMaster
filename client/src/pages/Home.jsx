import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero, Plans, Trainers, Reviews, FAQ } from '../components';
import Contact from './Contact';
import About from './About';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <Hero />
      <Plans />
      <Trainers />
      <Reviews />
      <FAQ />
      <Contact />

      {/* Admin Panel Button */}
      <div className="my-10 flex justify-center">
        <button
          onClick={() => navigate('/dashboard/admin')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Go to Admin Panel
        </button>
      </div>
    </div>
  );
};

export default Home;
