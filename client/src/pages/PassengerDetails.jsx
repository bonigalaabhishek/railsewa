import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Plus, Trash2, ChevronRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const bookingData = location.state;

  const [passengers, setPassengers] = useState([
    {
      id: 1,
      name: "",
      age: "",
      gender: "M",
      berth: "No Preference",
      nationality: "Indian",
    },
  ]);

  const [contactDetails, setContactDetails] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!bookingData || !user) {
      navigate("/");
      return;
    }
  }, [bookingData, user, navigate]);

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([
        ...passengers,
        {
          id: Date.now(),
          name: "",
          age: "",
          gender: "M",
          berth: "No Preference",
          nationality: "Indian",
        },
      ]);
    }
  };

  const removePassenger = (id) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((p) => p.id !== id));
    }
  };

  const updatePassenger = (id, field, value) => {
    setPassengers(
      passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate passengers
    passengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        newErrors[`passenger_${index}_name`] = "Name is required";
      }
      if (!passenger.age || passenger.age < 1 || passenger.age > 120) {
        newErrors[`passenger_${index}_age`] = "Valid age is required";
      }
    });

    // Validate contact details
    if (!contactDetails.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!contactDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      const totalFare = bookingData.fare * passengers.length;
      navigate("/payment", {
        state: {
          ...bookingData,
          passengers,
          contactDetails,
          totalFare,
        },
      });
    }
  };

  if (!bookingData) return null;

  const { train, searchData, selectedClass, fare } = bookingData;

  return (
    <div className="passenger-details">
      <div className="passenger-details-container">
        {/* Header */}
        <div className="passenger-details-header">
          <button
            onClick={() => navigate(-1)}
            className="passenger-details-back"
          >
            <ArrowLeft className="passenger-details-back-icon" />
            Back to Search Results
          </button>
          <h1 className="passenger-details-title">Passenger Details</h1>
          <p className="passenger-details-subtitle">
            Please provide passenger information for booking
          </p>
        </div>

        {/* Journey Summary */}
        <div className="journey-summary">
          <h2 className="journey-summary-title">Journey Summary</h2>
          <div className="journey-summary-grid">
            <div className="journey-summary-item">
              <p>Train</p>
              <p className="font-semibold">
                {train.number} - {train.name}
              </p>
            </div>
            <div>
              <p>Route</p>
              <p className="font-semibold">
                {searchData.from} → {searchData.to}
              </p>
            </div>
            <div>
              <p>Date & Time</p>
              <p className="font-semibold">
                {searchData.date} at {train.departure}
              </p>
            </div>
            <div>
              <p>Class</p>
              <p className="font-semibold">
                {selectedClass} - ₹{fare} per passenger
              </p>
            </div>
          </div>
        </div>

        {/* Passenger Details Form */}
        <div className="passenger-form">
          <div className="passenger-form-header">
            <h2 className="passenger-form-title">Passenger Information</h2>
            <button
              onClick={addPassenger}
              disabled={passengers.length >= 6}
              className="add-passenger-btn"
            >
              <Plus className="add-passenger-icon" />
              <span>Add Passenger</span>
            </button>
          </div>

          <div className="passenger-list">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="passenger-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="passenger-card-header">
                    Passenger {index + 1}
                  </h3>
                  {passengers.length > 1 && (
                    <button
                      onClick={() => removePassenger(passenger.id)}
                      className="remove-passenger-btn"
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>

                <div className="passenger-fields">
                  <div>
                    <label className="passenger-field-label">Full Name *</label>
                    <input
                      type="text"
                      value={passenger.name}
                      onChange={(e) =>
                        updatePassenger(passenger.id, "name", e.target.value)
                      }
  className={`passenger-field-input ${
                        errors[`passenger_${index}_age`] ? 'contact-field-border-red' : 'contact-field-border-gray'
                      }`}                      placeholder="Enter full name"
                    />
                    {errors[`passenger_${index}_name`] && (
                      <p className="passenger-field-error">
                        {errors[`passenger_${index}_name`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="passenger-field-label">Age *</label>
                    <input
                      type="number"
                      value={passenger.age}
                      onChange={(e) =>
                        updatePassenger(passenger.id, "age", e.target.value)
                      }
                      className={`passenger-field-input ${
                        errors[`passenger_${index}_age`] ? 'contact-field-border-red' : 'contact-field-border-gray'
                      }`}
                      placeholder="Age"
                      min="1"
                      max="120"
                    />
                    {errors[`passenger_${index}_age`] && (
                      <p className="passenger-field-error">
                        {errors[`passenger_${index}_age`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="passenger-field-label">Gender *</label>
                    <select
                      value={passenger.gender}
                      onChange={(e) =>
                        updatePassenger(passenger.id, "gender", e.target.value)
                      }
                      className="passenger-field-select"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="T">Transgender</option>
                    </select>
                  </div>

                  <div>
                    <label className="passenger-field-label">
                      Berth Preference
                    </label>
                    <select
                      value={passenger.berth}
                      onChange={(e) =>
                        updatePassenger(passenger.id, "berth", e.target.value)
                      }
                      className="passenger-field-select"
                    >
                      <option value="No Preference">No Preference</option>
                      <option value="Lower">Lower</option>
                      <option value="Middle">Middle</option>
                      <option value="Upper">Upper</option>
                      <option value="Side Lower">Side Lower</option>
                      <option value="Side Upper">Side Upper</option>
                    </select>
                  </div>

                  <div>
                    <label className="passenger-field-label">Nationality</label>
                    <select
                      value={passenger.nationality}
                      onChange={(e) =>
                        updatePassenger(
                          passenger.id,
                          "nationality",
                          e.target.value
                        )
                      }
                      className="passenger-field-select"
                    >
                      <option value="Indian">Indian</option>
                      <option value="Foreign">Foreign</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <h2 className="contact-details-title">
            Contact Details
          </h2>
          <div className="contact-details-grid">
            <div>
              <label className="contact-field-label">
                Email Address *
              </label>
              <input
                type="email"
                value={contactDetails.email}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    email: e.target.value,
                  })
                }
                className={`contact-field-input ${
                  errors.email ? "contact-field-border-red" : "contact-field-border-gray"
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="contact-field-error">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={contactDetails.phone}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    phone: e.target.value,
                  })
                }
                className={`contact-field-input ${
                  errors.phone ? "contact-field-border-red" : "contact-field-border-gray"
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="contact-field-error">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Fare Summary */}
        <div className="fare-summary">
          <h2 className="fare-summary-title">
            Fare Summary
          </h2>
          <div className="fare-summary-list">
            <div className="fare-summary-item">
              <span>
                Base Fare ({passengers.length} passenger
                {passengers.length > 1 ? "s" : ""})
              </span>
              <span>₹{fare * passengers.length}</span>
            </div>
            <div className="fare-summary-item">
              <span>Reservation Fee</span>
              <span>₹{passengers.length * 15}</span>
            </div>
            <div className="fare-summary-item">
              <span>Service Tax</span>
              <span>₹{Math.round(fare * passengers.length * 0.05)}</span>
            </div>
            <div className="fare-summary-total">
              <span>Total Amount</span>
              <span>
                ₹
                {fare * passengers.length +
                  passengers.length * 15 +
                  Math.round(fare * passengers.length * 0.05)}
              </span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="continue-section">
          <button
            onClick={handleContinue}
            className="continue-btn"
          >
            <span>Continue to Payment</span>
            <ChevronRight/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
