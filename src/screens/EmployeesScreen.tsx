import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { apiService } from '../services/api';
import { Employee } from '../types';
import { COLORS, SPACING } from '../constants';

const EmployeesScreen: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getEmployees();
      setEmployees(data);
    } catch (error) {
      Alert.alert('오류', '직원 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEmployees();
    setRefreshing(false);
  };

  const renderEmployee = ({ item }: { item: Employee }) => (
    <TouchableOpacity style={styles.employeeCard}>
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.employeeDetail}>{item.email}</Text>
        <Text style={styles.employeeDetail}>{item.department} • {item.position}</Text>
        <Text style={styles.employeeDetail}>
          입사일: {new Date(item.hireDate).toLocaleDateString('ko-KR')}
        </Text>
      </View>
      <View style={[
        styles.statusBadge,
        { backgroundColor: item.status === 'active' ? COLORS.success : COLORS.error }
      ]}>
        <Text style={styles.statusText}>
          {item.status === 'active' ? '재직' : '퇴사'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>직원 관리</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ 추가</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 6,
  },
  addButtonText: {
    color: COLORS.surface,
    fontWeight: '500',
  },
  listContainer: {
    padding: SPACING.md,
  },
  employeeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  employeeDetail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.surface,
    fontWeight: '500',
  },
});

export default EmployeesScreen;