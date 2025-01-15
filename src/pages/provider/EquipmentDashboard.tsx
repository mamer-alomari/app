import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, FAB, useTheme } from 'react-native-paper';
import { Equipment } from '../../types/equipment';
import { equipmentService } from '../../services/api/equipment.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { useNavigation } from '@react-navigation/native';

export const EquipmentDashboard = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const data = await equipmentService.getEquipment();
      setEquipment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load equipment');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Assigned To</DataTable.Title>
        </DataTable.Header>

        {equipment.map((item) => (
          <DataTable.Row 
            key={item.id}
            onPress={() => navigation.navigate('EquipmentDetails', { id: item.id })}
          >
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.type}</DataTable.Cell>
            <DataTable.Cell>{item.status}</DataTable.Cell>
            <DataTable.Cell>
              {item.assignedTo ? `${item.assignedTo.first_name} ${item.assignedTo.last_name}` : '-'}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        onPress={() => navigation.navigate('AddEquipment')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 