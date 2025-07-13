import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Share, Calendar, MapPin, Users, Train } from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  useEffect(() => {
    if (!bookingData) {
      navigate('/');
      return;
    }
  }, [bookingData, navigate]);

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download functionality would be implemented here');
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Train Booking Confirmation',
        text: `My train booking is confirmed! PNR: ${bookingData.pnr}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Train booking confirmed! PNR: ${bookingData.pnr}`);
      alert('Booking details copied to clipboard!');
    }
  };

  if (!bookingData) return null;

  const { train, searchData, selectedClass, passengers, pnr, totalFare } = bookingData;
  const finalAmount = totalFare + passengers.length * 15 + Math.round(totalFare * 0.05);

  return (
    <div className="booking-confirmation">
      <div className="booking-confirmation-container">
        {/* Success Header */}
        <div className="confirmation-header">
          <div className="confirmation-icon-container">
            <CheckCircle className="confirmation-icon" />
          </div>
          <h1 className="confirmation-title">Booking Confirmed!</h1>
          <p className="confirmation-subtitle">Your train ticket has been successfully booked</p>
        </div>

        {/* PNR and Actions */}
        <div className="pnr-section">
          <div className="pnr-content">
            <h2 className="pnr-number">PNR: {pnr}</h2>
            <p className="pnr-message">Please save this PNR number for future reference</p>
          </div>
          
          <div className="pnr-actions">
            <button
              onClick={handleDownloadTicket}
              className="pnr-action-btn download"
            >
              <Download className="pnr-action-icon" />
              <span>Download Ticket</span>
            </button>
            
            <button
              onClick={handleShareBooking}
              className="pnr-action-btn share"
            >
              <Share className="pnr-action-icon" />
              <span>Share Booking</span>
            </button>
            
            <button
              onClick={() => navigate('/booking-history')}
              className="pnr-action-btn history"
            >
              <Calendar className="pnr-action-icon" />
              <span>View All Bookings</span>
            </button>
          </div>
        </div>

        {/* Booking Details */}
        <div className="details-grid">
          {/* Journey Details */}
          <div className="details-card">
            <h3 className="details-card-title">Journey Details</h3>
            
            <div className="journey-details-list">
              <div className="journey-detail-icon-container blue">
                <Train className="journey-detail-icon blue" />
                <div className='journey-detail-content'>
                  <p>{train.name}</p>
                  <p>Train #{train.number}</p>
                </div>
              </div>
              
              <div className="journey-detail-icon-container green">
                <MapPin className="journey-detail-icon green" />
                <div className='journey-detail-content'>
                  <p className="font-semibold">{searchData.from} → {searchData.to}</p>
                  <p className="text-sm text-gray-600">Route</p>
                </div>
              </div>
              
              <div className="journey-detail-icon-container orange">
                <Calendar className="journey-detail-icon orange" />
                <div className='journey-detail-content'>
                  <p>{searchData.date}</p>
                  <p>Departure: {train.departure}</p>
                </div>
              </div>
              
              <div className="journey-detail-icon-container purple">
                <Users className="journey-detail-icon purple" />
                <div className='journey-detail-content'>
                  <p>Class: {selectedClass}</p>
                  <p>{passengers.length} Passenger{passengers.length > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="details-card">
            <h3 className="details-card-title">Payment Details</h3>
            
            <div className="payment-details-list">
              <div className="payment-detail-item">
                <span>Base Fare:</span>
                <span>₹{totalFare}</span>
              </div>
              
              <div className="payment-detail-item">
                <span>Reservation Fee:</span>
                <span>₹{passengers.length * 15}</span>
              </div>
              
              <div className="payment-detail-item">
                <span>Service Tax:</span>
                <span>₹{Math.round(totalFare * 0.05)}</span>
              </div>
              
              <hr className="payment-detail-divider" />
              
              <div className="payment-detail-total">
                <span>Total Paid:</span>
                <span className="payment-total-amount">₹{finalAmount}</span>
              </div>
              
              <div className="payment-status">
                <p className="payment-status-title">Payment Successful</p>
                <p className="payment-status-text">Transaction completed successfully</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="passenger-details-card">
          <h3 className="passenger-details-title">Passenger Details</h3>
          
          <div className="passenger-table-container">
            <table className="passenger-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((passenger, index) => (
                  <tr key={index} className="passenger-table-name">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 font-medium">{passenger.name}</td>
                    <td className="py-2">{passenger.age}</td>
                    <td className="py-2">{passenger.gender === 'M' ? 'Male' : passenger.gender === 'F' ? 'Female' : 'Transgender'}</td>
                    <td className="py-2">
                      <span className="passenger-status-badge">
                        CNF
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Information */}
        <div className="important-info">
          <h3 className="important-info-title">Important Information</h3>
          <ul className="important-info-list">
            <li>• Please carry a valid photo ID proof during your journey</li>
            <li>• Report at the station at least 30 minutes before departure</li>
            <li>• Tickets can be cancelled up to 4 hours before departure</li>
            <li>• For any queries, contact IRCTC helpline: 139</li>
            <li>• Keep your PNR number safe for future reference</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="navigation-section">
          <button
            onClick={() => navigate('/')}
            className="navigation-button"
          >
            Book Another Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;