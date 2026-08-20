import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Leaf, ArrowRight, Phone, Mail } from 'lucide-react';

export function Login() {
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' or 'email'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('input'); // 'input' or 'otp'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');
    
    if (name.trim().length === 0) {
      setError('Please enter your User Name.');
      return;
    }

    if (authMethod === 'phone') {
      if (phone.replace(/\D/g, '').length < 10) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }
    } else {
      if (!email.includes('@') || !email.includes('.')) {
        setError('Please enter a valid email address.');
        return;
      }
    }
    
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');
    if (otp.length === 4) {
      navigate('/home');
    } else {
      setError('Please enter the 4-digit OTP.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Column - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-primary relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1600&q=80" 
          alt="Fresh produce" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-white max-w-md text-center p-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold mb-4">Welcome Back to Freshly</h1>
          <p className="text-lg text-white/90">Sign in to continue ordering the freshest organic fruits and vegetables straight to your door.</p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-heading font-bold text-primary">Freshly</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-textMain mb-2">
              {step === 'input' ? 'Log In' : 'Verify OTP'}
            </h2>
            <p className="text-textMuted text-sm">
              {step === 'input' 
                ? 'Welcome back! Please enter your details to log in.' 
                : `We've sent a 4-digit code to ${authMethod === 'phone' ? '+1 ' + phone : email}.`}
            </p>
          </div>

          {step === 'input' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Auth Method Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button 
                  type="button"
                  className={`flex-1 py-2 text-sm font-semibold rounded-md flex justify-center items-center gap-2 transition-colors ${authMethod === 'phone' ? 'bg-white shadow text-primary' : 'text-textMuted hover:text-textMain'}`}
                  onClick={() => setAuthMethod('phone')}
                >
                  <Phone size={16} /> Phone
                </button>
                <button 
                  type="button"
                  className={`flex-1 py-2 text-sm font-semibold rounded-md flex justify-center items-center gap-2 transition-colors ${authMethod === 'email' ? 'bg-white shadow text-primary' : 'text-textMuted hover:text-textMain'}`}
                  onClick={() => setAuthMethod('email')}
                >
                  <Mail size={16} /> Email
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-textMain">User Name</label>
                <Input 
                  type="text" 
                  placeholder="John Doe" 
                  className="h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {authMethod === 'phone' ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-textMain">Mobile Number</label>
                  <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                    <div className="flex items-center px-4 bg-gray-50 border-r border-gray-300 text-textMuted font-medium">
                      +1
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Enter your number" 
                      className="flex-1 px-4 py-3 outline-none text-textMain"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-textMain">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-lg font-semibold flex items-center justify-center gap-2">
                Continue <ArrowRight size={18} />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-textMain">Enter OTP</label>
                <Input 
                  type="text" 
                  maxLength={4} 
                  placeholder="• • • •" 
                  className="text-center tracking-[1em] text-2xl h-14 font-bold border-gray-300"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-semibold">
                Verify & Login
              </Button>
              <div className="text-center">
                <button type="button" className="text-sm text-textMuted hover:text-primary font-medium" onClick={() => setStep('input')}>
                  Change {authMethod === 'phone' ? 'Number' : 'Email'}?
                </button>
              </div>
            </form>
          )}

          {step === 'input' && (
            <div className="mt-8 text-center">
              <p className="text-sm text-textMuted">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
