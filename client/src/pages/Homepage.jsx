import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRightLeft, Calendar, Users } from 'lucide-react';

const Homepage = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    class: 'SL',
    passengers: 1
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.from && searchData.to && searchData.date) {
      navigate('/search-results', { state: searchData });
    }
  };

  const swapStations = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const popularRoutes = [
    { from: 'New Delhi', to: 'Mumbai', code: 'NDLS-CSTM' },
    { from: 'Bangalore', to: 'Chennai', code: 'SBC-MAS' },
    { from: 'Kolkata', to: 'Delhi', code: 'KOAA-NDLS' },
    { from: 'Hyderabad', to: 'Bangalore', code: 'SC-SBC' }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Journey Starts Here
            </h1>
            <p className="hero-subtitle">
              Book train tickets with ease and comfort
            </p>
          </div>

          {/* Search Form */}
          <div className="search-form-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-form-grid">
                {/* From Station */}
                <div className="search-form-field from">
                  <label className="search-form-label">From</label>
                  <input
                    type="text"
                    value={searchData.from}
                    onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                    placeholder="Departure Station"
                    className="search-form-input"
                    required
                  />
                </div>

                {/* Swap Button */}
                <div className="search-form-field swap">
                  <button
                    type="button"
                    onClick={swapStations}
                    className="swap-button"
                  >
                    <ArrowRightLeft className="swap-button-icon" />
                  </button>
                </div>

                {/* To Station */}
                <div className="search-form-field to">
                  <label className="search-form-label">To</label>
                  <input
                    type="text"
                    value={searchData.to}
                    onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                    placeholder="Arrival Station"
                    className="search-form-input"
                    required
                  />
                </div>

                {/* Date */}
                <div className="search-form-field date">
                  <label className="search-form-label">Journey Date</label>
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="search-form-input"
                    required
                  />
                </div>

                {/* Class */}
                <div className="search-form-field class">
                  <label className="search-form-label">Class</label>
                  <select
                    value={searchData.class}
                    onChange={(e) => setSearchData({...searchData, class: e.target.value})}
                    className="search-form-select"
                  >
                    <option value="SL">Sleeper (SL)</option>
                    <option value="3A">AC 3 Tier (3A)</option>
                    <option value="2A">AC 2 Tier (2A)</option>
                    <option value="1A">AC First Class (1A)</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="search-form-field submit">
                  <button type="submit" className="search-button">
                    <Search className="search-button-icon" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="popular-routes-section">
        <div className="popular-routes-container">
          <h2 className="popular-routes-title">Popular Routes</h2>
          <div className="popular-routes-grid">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                className="popular-route-card"
                onClick={() => setSearchData({
                  ...searchData,
                  from: route.from,
                  to: route.to
                })}
              >
                <div className="popular-route-content">
                  <h3 className="popular-route-from">{route.from}</h3>
                  <ArrowRightLeft className="popular-route-icon" />
                  <h3 className="popular-route-to">{route.to}</h3>
                  <p className="popular-route-code">{route.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose IRCTC?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-container blue">
                <Search className="feature-icon blue" />
              </div>
              <h3 className="feature-title">Easy Booking</h3>
              <p className="feature-description">Quick and hassle-free train ticket booking with real-time availability.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-container green">
                <Calendar className="feature-icon green" />
              </div>
              <h3 className="feature-title">Flexible Dates</h3>
              <p className="feature-description">Book tickets up to 120 days in advance with flexible date options.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-container orange">
                <Users className="feature-icon orange" />
              </div>
              <h3 className="feature-title">Group Booking</h3>
              <p className="feature-description">Book tickets for multiple passengers in a single transaction.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;