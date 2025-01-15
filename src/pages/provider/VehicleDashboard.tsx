import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  Box,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Vehicle } from '../../types/vehicle';
import { vehicleService } from '../../services/api/vehicles.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const VehicleDashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadVehicles = async () => {
    try {
      console.log('Starting to load vehicles...');
      setLoading(true);
      const data = await vehicleService.getVehicles();
      console.log('Vehicles loaded:', data);
      
      if (!Array.isArray(data)) {
        console.error('Received non-array data:', data);
        setError('Invalid data format received');
        return;
      }
      
      setVehicles(data);
    } catch (err) {
      console.error('Error in loadVehicles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleAddVehicle = () => {
    navigate('/add-vehicle');
  };

  const handleVehiclePress = (vehicleId: string) => {
    navigate(`/vehicle/${vehicleId}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Box sx={{ p: 3, position: 'relative', minHeight: '100vh' }}>
      {vehicles.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          No vehicles found
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  onClick={() => handleVehiclePress(vehicle.id)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  <TableCell>{vehicle.make}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddVehicle}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};