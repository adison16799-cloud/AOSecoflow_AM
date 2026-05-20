import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-aeco-light-bg dark:bg-aeco-dark-bg flex items-center justify-center px-4">
      <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-aeco-cyan rounded-lg flex items-center justify-center text-white text-lg font-bold">
              🌍
            </div>
            <h1 className="text-2xl font-bold">AOSecoflow</h1>
          </div>
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
            Enterprise Waste Management & ESG Platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error */}
          {error && (
            <div className="bg-aeco-danger/20 border border-aeco-danger/30 text-aeco-danger px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="admin@aosecoflow.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60 mb-2">
            Don't have an account?
          </p>
          <Link
            to="/register"
            className="text-aeco-cyan hover:underline font-medium"
          >
            Create one
          </Link>
        </div>

        {/* Demo Account */}
        <div className="mt-6 p-4 bg-aeco-cyan/10 border border-aeco-cyan/20 rounded-lg text-xs">
          <p className="font-semibold text-aeco-cyan mb-1">Demo Account:</p>
          <p>Email: demo@aosecoflow.com</p>
          <p>Password: Demo@123456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
