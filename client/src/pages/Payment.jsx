import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, Shield, ArrowLeft, Lock } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!bookingData) {
      navigate('/');
      return;
    }
  }, [bookingData, navigate]);

  const validateCardDetails = () => {
    const newErrors = {};

    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Valid 16-digit card number is required';
    }
    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Valid expiry date (MM/YY) is required';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      newErrors.cvv = 'Valid 3-digit CVV is required';
    }
    if (!cardDetails.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }

    return newErrors;
  };

  const validateUPI = () => {
    const newErrors = {};
    if (!upiId || !upiId.includes('@')) {
      newErrors.upiId = 'Valid UPI ID is required';
    }
    return newErrors;
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardDetails({...cardDetails, number: value});
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails({...cardDetails, expiry: value});
  };

  const handlePayment = async () => {
    let validationErrors = {};

    if (paymentMethod === 'card') {
      validationErrors = validateCardDetails();
    } else if (paymentMethod === 'upi') {
      validationErrors = validateUPI();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setProcessing(true);
    setErrors({});

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate PNR
      const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      
      navigate('/booking-confirmation', {
        state: {
          ...bookingData,
          pnr,
          paymentMethod,
          bookingStatus: 'Confirmed'
        }
      });
    } catch (error) {
      setErrors({ payment: 'Payment failed. Please try again.' });
    } finally {
      setProcessing(false);
    }
  };

  if (!bookingData) return null;

  const { train, searchData, selectedClass, passengers, totalFare } = bookingData;
  const finalAmount = totalFare + passengers.length * 15 + Math.round(totalFare * 0.05);

  return (
    <div className="payment">
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <button
            onClick={() => navigate(-1)}
            className="payment-back"
          >
            <ArrowLeft className="payment-back-icon" />
            Back to Passenger Details
          </button>
          <h1 className="payment-title">Payment</h1>
          <p className="payment-subtitle">Complete your booking by making the payment</p>
        </div>

        <div className="payment-grid">
          {/* Payment Methods */}
          <div className="payment-methods">
            <div className="payment-methods-title">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>
              
              {/* Payment Method Tabs */}
              <div className="payment-tabs">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`payment-tab ${
                    paymentMethod === 'card' ? 'active' : ''
                  }`}
                >
                  <CreditCard className="payment-tab-icon"/>
                  <span>Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`payment-tab ${
                    paymentMethod === 'upi' ? 'active' : ''
                  }`}
                >
                  <Smartphone className="payment-tab-icon" />
                  <span>UPI</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`payment-tab ${
                    paymentMethod === 'netbanking' ? 'active' : ''
                  }`}
                >
                  <Building className="payment-tab-icon" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="payment-form">
                  <div >
                    <label className="payment-field-label">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={handleCardNumberChange}
                      className={`payment-field-input ${
                        errors.cardNumber ? 'payment-field-border-red' : 'payment-field-border-gray'
                      }`}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {errors.cardNumber && (
                      <p className="payment-field-error">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="payment-field-label">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={handleExpiryChange}
                        className={`payment-field-input ${
                          errors.expiry ? 'payment-field-border-red' : 'payment-field-border-gray'
                        }`}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.expiry && (
                        <p className="payment-field-error">{errors.expiry}</p>
                      )}
                    </div>

                    <div>
                      <label className="payment-field-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').substring(0, 3)})}
                        className={`payment-field-input ${
                          errors.cvv ? 'payment-field-border-red' : 'payment-field-border-gray'
                        }`}
                        placeholder="123"
                        maxLength="3"
                      />
                      {errors.cvv && (
                        <p className="payment-field-error">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="payment-field-label">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      className={`payment-field-input ${
                        errors.name ? 'payment-field-border-red' : 'payment-field-border-gray'
                      }`}
                      placeholder="Enter cardholder name"
                    />
                    {errors.name && (
                      <p className="payment-field-error">{errors.name}</p>
                    )}
                  </div>
                </div>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <div>
                  <label className="payment-field-label">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className={`payment-field-input ${
                      errors.upiId ? 'payment-field-border-red' : 'payment-field-border-gary'
                    }`}
                    placeholder="yourname@paytm"
                  />
                  {errors.upiId && (
                    <p className="payment-field-error">{errors.upiId}</p>
                  )}
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Bank
                  </label>
                  <select className="payment-field-select">
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </div>
              )}

              {/* Security Notice */}
              <div className="payment-security">
                <div className="payment-security-header">
                  <Shield className="payment-security-icon" />
                  <span className="payment-security-title">Secure Payment</span>
                </div>
                <p className="payment-security-text">
                  Your payment information is encrypted and secure. We use industry-standard security measures.
                </p>
              </div>

              {errors.payment && (
                <div className="payment-error">
                  <p className="payment-error-text">{errors.payment}</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="booking-summary">
              <h2 className="booking-summary-title">Booking Summary</h2>
              
              <div className="booking-summary-list">
                <div className='booking-summary-item'>
                  <p className="booking-summary-train">{train.name}</p>
                  <p className="booking-summary-train-number">#{train.number}</p>
                </div>
                
                <div className="booking-summary-detail">
                  <span>Route:</span>
                  <span>{searchData.from} → {searchData.to}</span>
                </div>
                
                <div className="booking-summary-detail">
                  <span>Date:</span>
                  <span>{searchData.date}</span>
                </div>
                
                <div className="booking-summary-detail">
                  <span>Class:</span>
                  <span>{selectedClass}</span>
                </div>
                
                <div className="booking-summary-detail">
                  <span>Passengers:</span>
                  <span>{passengers.length}</span>
                </div>
                
                <hr className="booking-summary-divider" />
                
                <div className="booking-summary-detail">
                  <span>Base Fare:</span>
                  <span>₹{totalFare}</span>
                </div>
                
                <div className="booking-summary-detail">
                  <span>Reservation Fee:</span>
                  <span>₹{passengers.length * 15}</span>
                </div>
                
                <div className="booking-summary-detail">
                  <span>Service Tax:</span>
                  <span>₹{Math.round(totalFare * 0.05)}</span>
                </div>
                
                <hr className="booking-summary-divider" />
                
                <div className="booking-summary-total">
                  <span>Total Amount:</span>
                  <span>₹{finalAmount}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                 className="payment-button"
              >
                {processing ? (
                  <>
                    <div className="payment-button-spinner"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="payment-button-icon" />
                    <span>Pay ₹{finalAmount}</span>
                  </>
                )}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;