import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Users, Wifi, Coffee, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchData = location.state;
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(searchData?.class || 'SL');

  useEffect(() => {
    if (!searchData) {
      navigate('/');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const mockTrains = [
        {
          number: '12951',
          name: 'MUMBAI RAJDHANI',
          departure: '16:35',
          arrival: '08:35+1',
          duration: '16h 00m',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          classes: {
            '1A': { available: 12, fare: 4565, status: 'AVAILABLE' },
            '2A': { available: 35, fare: 2890, status: 'AVAILABLE' },
            '3A': { available: 68, fare: 2135, status: 'AVAILABLE' },
            'SL': { available: 0, fare: 675, status: 'WL/45' }
          },
          amenities: ['wifi', 'meals', 'charging']
        },
        {
          number: '12903',
          name: 'GOLDEN TEMPLE MAIL',
          departure: '19:55',
          arrival: '13:45+1',
          duration: '17h 50m',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          classes: {
            '1A': { available: 8, fare: 4125, status: 'AVAILABLE' },
            '2A': { available: 22, fare: 2650, status: 'AVAILABLE' },
            '3A': { available: 45, fare: 1980, status: 'AVAILABLE' },
            'SL': { available: 120, fare: 625, status: 'AVAILABLE' }
          },
          amenities: ['meals', 'charging']
        },
        {
          number: '12615',
          name: 'GRAND TRUNK EXPRESS',
          departure: '07:10',
          arrival: '06:50+1',
          duration: '23h 40m',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          classes: {
            '2A': { available: 18, fare: 2320, status: 'AVAILABLE' },
            '3A': { available: 55, fare: 1745, status: 'AVAILABLE' },
            'SL': { available: 85, fare: 520, status: 'AVAILABLE' }
          },
          amenities: ['charging']
        }
      ];
      setTrains(mockTrains);
      setLoading(false);
    }, 1500);
  }, [searchData, navigate]);

  const handleBookNow = (train) => {
    if (!user) {
      navigate('/login', { state: { returnTo: '/passenger-details', bookingData: { train, searchData, selectedClass } } });
      return;
    }
    
    navigate('/passenger-details', { 
      state: { 
        train, 
        searchData, 
        selectedClass,
        fare: train.classes[selectedClass].fare
      } 
    });
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'meals': return <Coffee className="h-4 w-4" />;
      case 'charging': return <div className="h-4 w-4 bg-green-500 rounded-sm" />;
      default: return null;
    }
  };

  if (!searchData) return null;

  return (
    <div className="search-results">
      <div className="search-results-container">
        {/* Search Summary */}
        <div className="search-summary">
          <div className="search-summary-content">
            <div className="search-summary-info">
              <div className="search-summary-route">
                {searchData.from} <ChevronRight className="search-summary-route-icon" /> {searchData.to}
              </div>
              <div className="search-summary-date">{searchData.date}</div>
              <div className="search-summary-class">{searchData.class} Class</div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="search-summary-modify"
            >
              Modify Search
            </button>
          </div>
        </div>

        {/* Class Filter */}
        <div className="class-filter">
          <div className="class-filter-buttons">
            {['SL', '3A', '2A', '1A'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`class-filter-button ${selectedClass === cls ? 'active' : ''}`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Searching for available trains...</p>
          </div>
        )}

        {/* Train Results */}
        {!loading && (
          <div className="train-results">
            {trains.map((train) => (
              <div key={train.number} className="train-card">
                <div className="train-card-content">
                  <div className="train-card-grid">
                    {/* Train Info */}
                    <div className="train-info">
                      <h3 className="train-name">{train.name}</h3>
                      <p className="train-number">#{train.number}</p>
                      <div className="train-amenities">
                        {train.amenities.map((amenity, index) => (
                          <div key={index} className="train-amenity-icon">
                            {getAmenityIcon(amenity)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timing */}
                    <div className="train-timing">
                      <div className="train-timing-content">
                        <div className="train-timing-station">
                          <div className="train-timing-time">{train.departure}</div>
                          <div className="train-timing-station-name">{searchData.from}</div>
                        </div>
                        <div className="train-timing-duration">
                          <Clock className="train-timing-duration-icon" />
                          <div className="train-timing-duration-text">{train.duration}</div>
                        </div>
                        <div className="train-timing-station">
                          <div className="train-timing-time">{train.arrival}</div>
                          <div className="train-timing-station-name">{searchData.to}</div>
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="train-availability">
                      {selectedClass in train.classes ? (
                        <div className="train-availability-grid">
                          <div className="train-availability-item">
                            <h4>Availability</h4>
                            <div className={`train-availability-status ${
                              train.classes[selectedClass].status === 'AVAILABLE' ? 'available' :
                              train.classes[selectedClass].status.includes('WL') ? 'waiting' : 'rac'
                            }`}>
                              {train.classes[selectedClass].status}
                            </div>
                          </div>
                          <div className="train-availability-item">
                            <h4>Fare</h4>
                            <div className="train-fare">
                              ₹{train.classes[selectedClass].fare}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="train-unavailable">Not available in {selectedClass}</div>
                      )}
                    </div>

                    {/* Book Button */}
                    <div className="train-book-button">
                      {selectedClass in train.classes && train.classes[selectedClass].status === 'AVAILABLE' ? (
                        <button 
                          onClick={() => handleBookNow(train)}
                          className="train-book-btn"
                        >
                          Book Now
                        </button>
                      ) : (
                        <button
                          disabled
                          className="train-book-btn"
                        >
                          {selectedClass in train.classes ? 'Check Availability' : 'Not Available'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && trains.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">No trains found for the selected route and date.</p>
            <button
              onClick={() => navigate('/')}
              className="no-results-button"
            >
              Try Different Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;