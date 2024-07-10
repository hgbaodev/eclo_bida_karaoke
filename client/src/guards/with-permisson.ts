import useCheckPermissions from '@/hooks/use-check-permission';
import React from 'react';

const WithPermission = ({ permission, children }: { permission: string; children: React.ReactNode }) => {
  const hasPermission = useCheckPermissions(permission);
  return hasPermission ? children : null;
};

export default WithPermission;
