import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Download, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const mockBookings = [
        {
          id: '1',
          pnr: '1234567890',
          trainNumber: '12951',
          trainName: 'MUMBAI RAJDHANI',
          from: 'New Delhi',
          to: 'Mumbai Central',
          date: '2025-03-15',
          time: '16:35',
          class: '3A',
          passengers: 2,
          status: 'Confirmed',
          bookingDate: '2025-02-15',
          fare: 4270
        },
        {
          id: '2',
          pnr: '9876543210',
          trainNumber: '12615',
          trainName: 'GRAND TRUNK EXPRESS',
          from: 'New Delhi',
          to: 'Chennai Central',
          date: '2025-02-28',
          time: '07:10',
          class: 'SL',
          passengers: 1,
          status: 'Completed',
          bookingDate: '2025-01-28',
          fare: 520
        },
        {
          id: '3',
          pnr: '5555666677',
          trainNumber: '12903',
          trainName: 'GOLDEN TEMPLE MAIL',
          from: 'Mumbai Central',
          to: 'Amritsar',
          date: '2025-04-10',
          time: '19:55',
          class: '2A',
          passengers: 3,
          status: 'Confirmed',
          bookingDate: '2025-02-10',
          fare: 7950
        }
      ];
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return booking.status === 'Confirmed' && new Date(booking.date) > new Date();
    if (filter === 'completed') return booking.status === 'Completed';
    if (filter === 'cancelled') return booking.status === 'Cancelled';
    return true;
  });

  if (!user) return null;

  return (
    <div className="booking-history">
      <div className="booking-history-container">
        <div className="booking-history-header">
          <h1 className="booking-history-title">Booking History</h1>
          <p className="booking-history-subtitle">View and manage your train bookings</p>
        </div>

        {/* Filter Tabs */}
        <div className="booking-filter">
          <div className="booking-filter-tabs">
            {[
              { key: 'all', label: 'All Bookings' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`booking-filter-tab ${filter === tab.key ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="booking-loading">
            <div className="booking-loading-spinner"></div>
            <p className="booking-loading-text">Loading your bookings...</p>
          </div>
        )}

        {/* Bookings List */}
        {!loading && (
          <div className="booking-list">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-card-content">
                    <div className="booking-card-main">
                      {/* Booking Info */}
                      <div className="booking-card-info">
                        {/* Train Details */}
                        <div className="booking-train-info">
                          <div className="booking-train-header">
                            <h3 className="booking-train-name">
                              {booking.trainName}
                            </h3>
                            <span className={`booking-status-badge ${booking.status.toLowerCase()}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="booking-train-number">Train #{booking.trainNumber}</p>
                          <p className="booking-pnr">PNR: {booking.pnr}</p>
                        </div>

                        {/* Journey Details */}
                        <div className="booking-journey-info">
                          <div className="booking-info-item">
                            <MapPin className="booking-info-icon" />
                            <span className="booking-info-text">
                              {booking.from} → {booking.to}
                            </span>
                          </div>
                          <div className="booking-info-item">
                            <Calendar className="booking-info-icon" />
                            <span className="booking-info-text">{booking.date}</span>
                          </div>
                          <div className="booking-info-item">
                            <Clock className="booking-info-icon" />
                            <span className="booking-info-text">{booking.time}</span>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="booking-details-info">
                          <p className="booking-detail-item">
                            Class: <span className="booking-detail-value">{booking.class}</span>
                          </p>
                          <p className="booking-detail-item">
                            Passengers: <span className="booking-detail-value">{booking.passengers}</span>
                          </p>
                          <p className="booking-detail-item">
                            Fare: <span className="booking-detail-value booking-fare-value">₹{booking.fare}</span>
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="booking-actions">
                        <button className="booking-action-btn primary">
                          <Download className="booking-action-icon" />
                          <span>Download Ticket</span>
                        </button>
                        <button className="booking-action-btn secondary">
                          <span>View Details</span>
                          <ChevronRight className="booking-action-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="booking-card-footer">
                    <p className="booking-date-text">
                      Booked on {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="booking-empty">
                <div className="booking-empty-icon-container">
                  <Calendar className="booking-empty-icon" />
                </div>
                <h3 className="booking-empty-title">No bookings found</h3>
                <p className="booking-empty-text">
                  {filter === 'all' 
                    ? "You haven't made any bookings yet." 
                    : `No ${filter} bookings found.`
                  }
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="booking-empty-button"
                >
                  Book a Train
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;