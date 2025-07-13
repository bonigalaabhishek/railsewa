import React, { useState } from 'react';
import { Search, MapPin, Clock, Users, CheckCircle } from 'lucide-react';

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrData, setPnrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!pnrNumber || pnrNumber.length !== 10) {
      setError('Please enter a valid 10-digit PNR number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = {
        pnr: pnrNumber,
        trainNumber: '12951',
        trainName: 'MUMBAI RAJDHANI',
        dateOfJourney: '15-Mar-2025',
        from: 'NEW DELHI (NDLS)',
        to: 'MUMBAI CENTRAL (BCT)',
        class: '3A',
        passengers: [
          {
            name: 'JOHN DOE',
            age: 32,
            gender: 'M',
            currentStatus: 'CNF/B3/15',
            seatNumber: '15',
            coach: 'B3'
          },
          {
            name: 'JANE DOE',
            age: 28,
            gender: 'F',
            currentStatus: 'CNF/B3/16',
            seatNumber: '16',
            coach: 'B3'
          }
        ],
        chartStatus: 'CHART PREPARED'
      };
      
      setPnrData(mockData);
    } catch (err) {
      setError('Failed to fetch PNR status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pnr-status">
      <div className="pnr-container">
        <div className="pnr-header">
          <h1 className="pnr-title">PNR Status</h1>
          <p className="pnr-subtitle">Check your train ticket booking status</p>
        </div>

        {/* Search Form */}
        <div className="pnr-search-form">
          <form onSubmit={handleSearch}>
            <div className="pnr-search-content">
              <div className="pnr-search-row">
                <div className="pnr-search-field">
                  <label htmlFor="pnr" className="pnr-search-label">
                    PNR Number
                  </label>
                  <input
                    type="text"
                    id="pnr"
                    value={pnrNumber}
                    onChange={(e) => setPnrNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit PNR number"
                    className="pnr-search-input"
                    maxLength={10}
                  />
                </div>
                <div className="pnr-search-button-container">
                  <button
                    type="submit"
                    disabled={loading || pnrNumber.length !== 10}
                    className="pnr-search-button"
                  >
                    <Search className="pnr-search-icon" />
                    <span>{loading ? 'Checking...' : 'Check Status'}</span>
                  </button>
                </div>
              </div>
              {error && (
                <div className="pnr-error">{error}</div>
              )}
            </div>
          </form>
        </div>

        {/* Sample PNR for demo */}
        <div className="pnr-demo">
          <p className="pnr-demo-text">
            <strong>Demo PNR:</strong> Try searching with PNR number: 1234567890
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="pnr-loading">
            <div className="pnr-loading-spinner"></div>
            <p className="pnr-loading-text">Fetching PNR status...</p>
          </div>
        )}

        {/* PNR Results */}
        {pnrData && !loading && (
          <div className="pnr-results">
            {/* Train Details */}
            <div className="pnr-train-details">
              <div className="pnr-train-header">
                <h2 className="pnr-train-title">Train Details</h2>
                <div className={`pnr-chart-status ${
                  pnrData.chartStatus === 'CHART PREPARED' ? 'prepared' : 'not-prepared'
                }`}>
                  {pnrData.chartStatus}
                </div>
              </div>
              
              <div className="pnr-train-info">
                <div className="pnr-info-item">
                  <div className="pnr-info-icon-container blue">
                    <MapPin className="pnr-info-icon blue" />
                  </div>
                  <div className="pnr-info-content">
                    <p>Train</p>
                    <p>{pnrData.trainNumber} - {pnrData.trainName}</p>
                  </div>
                </div>
                
                <div className="pnr-info-item">
                  <div className="pnr-info-icon-container green">
                    <Clock className="pnr-info-icon green" />
                  </div>
                  <div className="pnr-info-content">
                    <p>Journey Date</p>
                    <p>{pnrData.dateOfJourney}</p>
                  </div>
                </div>
                
                <div className="pnr-info-item">
                  <div className="pnr-info-icon-container orange">
                    <Users className="pnr-info-icon orange" />
                  </div>
                  <div className="pnr-info-content">
                    <p>Class</p>
                    <p>{pnrData.class}</p>
                  </div>
                </div>
              </div>

              <div className="pnr-route">
                <div className="pnr-route-content">
                  <div className="pnr-route-station">
                    <p>From</p>
                    <p>{pnrData.from}</p>
                  </div>
                  <div className="pnr-route-arrow">→</div>
                  <div className="pnr-route-station">
                    <p>To</p>
                    <p>{pnrData.to}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="pnr-passengers">
              <h2 className="pnr-passengers-title">Passenger Details</h2>
              <div className="pnr-passengers-list">
                {pnrData.passengers.map((passenger, index) => (
                  <div key={index} className="pnr-passenger-card">
                    <div className="pnr-passenger-grid">
                      <div className="pnr-passenger-info">
                        <p>Passenger {index + 1}</p>
                        <p>{passenger.name}</p>
                        <p>{passenger.gender}, {passenger.age} years</p>
                      </div>
                      
                      <div className="pnr-passenger-status">
                        <p>Current Status</p>
                        <span className={`pnr-status-badge ${
                          passenger.currentStatus.includes('CNF') ? 'confirmed' :
                          passenger.currentStatus.includes('WL') ? 'waiting' : 'rac'
                        }`}>
                          {passenger.currentStatus}
                        </span>
                      </div>
                      
                      {passenger.coach && passenger.seatNumber && (
                        <>
                          <div className="pnr-passenger-seat">
                            <p>Coach</p>
                            <p>{passenger.coach}</p>
                          </div>
                          
                          <div className="pnr-passenger-seat">
                            <p>Seat</p>
                            <p>{passenger.seatNumber}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Guide */}
            <div className="pnr-status-guide">
              <h3 className="pnr-guide-title">Status Guide</h3>
              <div className="pnr-guide-grid">
                <div className="pnr-guide-item">
                  <span className="pnr-guide-dot green"></span>
                  <span><strong>CNF:</strong> Confirmed</span>
                </div>
                <div className="pnr-guide-item">
                  <span className="pnr-guide-dot yellow"></span>
                  <span><strong>RAC:</strong> Reservation Against Cancellation</span>
                </div>
                <div className="pnr-guide-item">
                  <span className="pnr-guide-dot red"></span>
                  <span><strong>WL:</strong> Waiting List</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PNRStatus;