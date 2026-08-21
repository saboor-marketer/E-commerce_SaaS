import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load user data
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    });
  }, [isAuthenticated, navigate, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    updateProfile({
      name: formData.name,
      email: formData.email
    });

    setIsSaving(false);
    setSaveMessage('Profile updated successfully!');
    
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-5 fade-in">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="rounded-circle mb-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h4 className="mb-1">{user?.name}</h4>
                <p className="text-muted small mb-0">{user?.email}</p>
              </div>
            </div>

            <div className="card mt-3">
              <div className="list-group list-group-flush">
                <Link to="/profile" className="list-group-item list-group-item-action active">
                  <FiUser className="me-2" />
                  Profile
                </Link>
                <Link to="/orders" className="list-group-item list-group-item-action">
                  <FiMapPin className="me-2" />
                  Orders
                </Link>
                <Link to="/profile" className="list-group-item list-group-item-action">
                  <FiLock className="me-2" />
                  Change Password
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Profile Settings</h3>
                  {saveMessage && (
                    <span className="text-success small">{saveMessage}</span>
                  )}
                </div>

                <form onSubmit={handleSave}>
                  <h5 className="mb-3">Personal Information</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <h5 className="mb-3">Address</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Country</label>
                      <select
                        className="form-select"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="me-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
