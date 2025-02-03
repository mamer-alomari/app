import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingOverlay from './components/LoadingOverlay';
import QuoteHistory from './pages/QuoteHistory';
import RetrieveQuote from './pages/RetrieveQuote';
import QuoteDetails from './pages/QuoteDetails';

// Lazy load components with error boundaries
const Welcome = lazy(() => import('./pages/Welcome').catch(() => ({ default: () => <Navigate to="/" /> })));
const Camera = lazy(() => import('./pages/Camera').catch(() => ({ default: () => <Navigate to="/" /> })));
const Login = lazy(() => import('./pages/Login').catch(() => ({ default: () => <Navigate to="/" /> })));
const Quote = lazy(() => import('./pages/Quote').catch(() => ({ default: () => <Navigate to="/" /> })));
const Cart = lazy(() => import('./pages/Cart').catch(() => ({ default: () => <Navigate to="/" /> })));
const CustomerDetails = lazy(() => import('./pages/CustomerDetails').catch(() => ({ default: () => <Navigate to="/" /> })));
const Freight = lazy(() => import('./pages/Freight').catch(() => ({ default: () => <Navigate to="/" /> })));
const Payment = lazy(() => import('./pages/Payment').catch(() => ({ default: () => <Navigate to="/" /> })));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess').catch(() => ({ default: () => <Navigate to="/" /> })));
const Dashboard = lazy(() => import('./pages/Dashboard').catch(() => ({ default: () => <Navigate to="/" /> })));

// Provider Routes
const ProviderDashboard = lazy(() => import('./pages/provider/Dashboard').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderActiveJobs = lazy(() => import('./pages/provider/ActiveJobs').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderJobDetails = lazy(() => import('./pages/provider/JobDetails').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderScanItems = lazy(() => import('./pages/provider/ScanItems').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderSchedule = lazy(() => import('./pages/provider/Schedule').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderWorkers = lazy(() => import('./pages/provider/Workers').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderWorkerDashboard = lazy(() => import('./pages/provider/WorkerDashboard').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderVehicles = lazy(() => import('./pages/provider/Vehicles').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderVehicleDashboard = lazy(() => import('./pages/provider/VehicleDashboard').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderEarnings = lazy(() => import('./pages/provider/Earnings').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderWarehouseLayout = lazy(() => import('./pages/provider/WarehouseLayout').catch(() => ({ default: () => <Navigate to="/" /> })));
const ProviderProfile = lazy(() => import('./pages/provider/Profile').catch(() => ({ default: () => <Navigate to="/" /> })));

export default function App() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        
        {/* Customer Routes */}
        <Route path="/camera" element={<Camera />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/freight" element={<Freight />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Provider Routes */}
        <Route path="/provider">
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="jobs" element={<ProviderActiveJobs />} />
          <Route path="jobs/:id/details" element={<ProviderJobDetails />} />
          <Route path="jobs/:id/scan" element={<ProviderScanItems />} />
          <Route path="schedule" element={<ProviderSchedule />} />
          <Route path="workers" element={<ProviderWorkers />} />
          <Route path="workers/:id" element={<ProviderWorkerDashboard />} />
          <Route path="vehicles" element={<ProviderVehicles />} />
          <Route path="vehicles/:id" element={<ProviderVehicleDashboard />} />
          <Route path="earnings" element={<ProviderEarnings />} />
          <Route path="warehouse" element={<ProviderWarehouseLayout />} />
          <Route path="profile" element={<ProviderProfile />} />
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* New routes */}
        <Route path="/quotes" element={<QuoteHistory />} />
        <Route path="/quotes/retrieve" element={<RetrieveQuote />} />
        <Route path="/quotes/:id" element={<QuoteDetails />} />
      </Routes>
    </Suspense>
  );
}