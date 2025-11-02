import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Heading, Loader } from '../../components';
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/fetchData";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminDashBoard = () => {
  const [userCount, setUserCount] = useState(null);
  const [planCount, setPlanCount] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [contactCount, setContactCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      offset: 120,
      once: true
    });

    getUsers();
    getPlans();
    getSubscriptions();
    getContacts();
    getFeedbacks();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/auth/total-user`);
      if (res.data?.success) setUserCount(res.data.total);
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong in getting users");
      setLoading(false);
    }
  };

  const getPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/plan/total-plan`);
      if (res.data?.success) setPlanCount(res.data.total);
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong in getting plans");
      setLoading(false);
    }
  };

  const getSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/subscription/total-subscription`);
      if (res.data?.success) setSubscriberCount(res.data.total);
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong in getting subscription");
      setLoading(false);
    }
  };

  const getContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/contact/total-contact`);
      if (res.data?.success) setContactCount(res.data.total);
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong in getting contact");
      setLoading(false);
    }
  };

  const getFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/feedback/total-feedback`);
      if (res.data?.success) setFeedbackCount(res.data.total);
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong in getting feedback");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="pt-10 bg-gray-900 min-h-screen">
      <Heading name="Admin Dashboard" />

      <div className="container mx-auto px-6 py-20">
        {/* Create Plan Button */}
        <div className="flex justify-end mb-10">
          <button
            onClick={() => navigate('/dashboard/admin/create-plane')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            data-aos="fade-left"
          >
            + Create New Plan
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          <Link
            className="p-5 border border-white hover:bg-blue-600 transition-all"
            to={`/dashboard/admin/user-list`}
            data-aos="fade-up"
          >
            <h2 className="text-white font-bold text-3xl">
              Users: {userCount ?? "Loading..."}
            </h2>
          </Link>

          <Link
            className="p-5 border border-white hover:bg-blue-600 transition-all"
            to={`/dashboard/admin/subscriber-list`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-white font-bold text-3xl">
              Subscribers: {subscriberCount ?? "Loading..."}
            </h2>
          </Link>

          <Link
            className="p-5 border border-white hover:bg-blue-600 transition-all"
            to={`/dashboard/admin/plans`}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="text-white font-bold text-3xl">
              Plans: {planCount ?? "Loading..."}
            </h2>
          </Link>

          <Link
            className="p-5 border border-white hover:bg-blue-600 transition-all"
            to={`/dashboard/admin/contact-us`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h2 className="text-white font-bold text-3xl">
              Queries: {contactCount ?? "Loading..."}
            </h2>
          </Link>

          {feedbackCount !== null && (
            <Link
              className="p-5 border border-white hover:bg-blue-600 transition-all"
              to={`/dashboard/admin/feedbacks`}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h2 className="text-white font-bold text-3xl">
                Feedbacks: {feedbackCount ?? "Loading..."}
              </h2>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashBoard;
