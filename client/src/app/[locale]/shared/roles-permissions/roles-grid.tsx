'use client';
import RoleCard from '@/app/[locale]/shared/roles-permissions/role-card';
import { rolesList } from '@/data/roles-permissions';
import { dispatch } from '@/store';
import { getRoles } from '@/store/slices/roleSlice';
import { RootState } from '@/store/types';
import cn from '@/utils/class-names';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface RolesGridProps {
  className?: string;
  gridClassName?: string;
}

export default function RolesGrid({ className, gridClassName }: RolesGridProps) {
  const { fetchData, fetchDataLoading } = useSelector((state: RootState) => state.role);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getRoles());
    };
    fetchData();
  }, []);

  return (
    <div className={cn('@container', className)}>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 @[36.65rem]:grid-cols-2 @[56rem]:grid-cols-3 @[78.5rem]:grid-cols-4 @[100rem]:grid-cols-5',
          gridClassName,
        )}
      >
        {fetchData.map((role) => (
          <RoleCard key={role.name} {...role} />
        ))}
      </div>
    </div>
  );
}
