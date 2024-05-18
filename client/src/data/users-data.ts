import { ROLES } from '@/config/constants';

export type User = {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  role: keyof typeof ROLES;
  createdAt: Date;
  permissions: keyof typeof PERMISSIONS;
  status: keyof typeof STATUSES;
};

export const PERMISSIONS = {
  View: 'View',
  Create: 'Create',
  Update: 'Update',
  Delete: 'Delete',
} as const;

export const STATUSES = {
  Pending: 'Pending',
  Active: 'Active',
  Deactivated: 'Deactivated',
} as const;

export const usersData = [
  {
    id: '0256',
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
    fullName: 'Bessie Beatty',
    email: 'christophe78@gmail.com',
    role: ROLES.User,
    createdAt: '2029-10-14T16:01:40.021Z',
    permissions: [PERMISSIONS.View],
    status: STATUSES.Pending,
  },
  {
    id: '6177',
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
    fullName: 'Joshua Green',
    email: 'ayla_schuster28@yahoo.com',
    role: ROLES.Customer,
    createdAt: '2027-11-01T13:23:52.903Z',
    permissions: [PERMISSIONS.Create, PERMISSIONS.View],
    status: STATUSES.Pending,
  },
  {
    id: '5456',
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
    fullName: 'Wendy Ankunding',
    email: 'lorine66@gmail.com',
    role: ROLES.Area,
    createdAt: '2024-12-29T08:37:13.101Z',
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Create, PERMISSIONS.View],
    status: STATUSES.Active,
  },
];
