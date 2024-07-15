'use client';

import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';

const useCheckPermissions = (permission: string) => {
  const { role } = useSelector((state: RootState) => state.auth);
  const permissions = role.permissions;
  return permissions.includes(permission as never);
};

export default useCheckPermissions;
