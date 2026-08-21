import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="py-5 fade-in">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card text-center" style={{ padding: '3rem' }}>
                <div className="mb-4">
                  <FiCheckCircle style={{ fontSize: '4rem', color: 'var(--success-color)' }} />
                </div>
                <h1 className="mb-3">Check Your Email</h1>
                <p className="text-muted mb-4">
                  We've sent a password reset link to{' '}
                  <strong>{email}</strong>
                </p>
                <p className="text-muted small">
                  The link will expire in 24 hours. If you don't receive it, check your spam folder.
                </p>
                <div className="mt-4">
                  <Link to="/login" className="btn btn-primary">
                    Back to Login
                  </Link>
                </div>
                <div className="mt-3">
                  <Link to="/forgot-password" className="text-decoration-none small">
                    Didn't receive the email? Resend
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 fade-in">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card" style={{ padding: '2rem' }}>
              <div className="mb-4">
                <Link to="/login" className="btn btn-link mb-3" style={{ border: 'none', background: 'none', color: 'inherit' }}>
                  <FiArrowLeft /> Back to Login
                </Link>
                <h1 className="mb-2">Forgot Password?</h1>
                <p className="text-muted">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <FiMail className="me-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="you@example.com"
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-muted mb-0">
                  Remember your password?{' '}
                  <Link to="/login" className="text-decoration-none fw-bold">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
