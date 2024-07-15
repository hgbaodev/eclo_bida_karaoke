'use client';
import Statistical from '@/app/[locale]/shared/statistical';
import useCheckPermissions from '@/hooks/use-check-permission';

export default function BlankPage() {
  const check = useCheckPermissions('role.View');
  if (!check) {
    window.location.href = '/error/403';
  }
  return <Statistical />;
}
