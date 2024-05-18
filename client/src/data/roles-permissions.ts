import { ROLES } from '@/config/constants';

export const users = [
  {
    id: 1,
    role: ROLES.HRD,
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
  },
  {
    id: 2,
    role: ROLES.Administrator,
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
  },
  {
    id: 3,
    role: ROLES.Developer,
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
  },
  {
    id: 4,
    role: ROLES.Administrator,
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
  },
  {
    id: 5,
    role: ROLES.Administrator,
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
  },
  {
    id: 6,
    role: ROLES.Administrator,
    avatar: `https://avatars.githubusercontent.com/u/120194990?v=4`,
  },
];

export const rolesList = [
  {
    name: ROLES.User,
    color: '#2465FF',
    users,
  },
  {
    name: ROLES.Customer,
    color: '#0070F3',
    users,
  },
  {
    name: ROLES.Area,
    color: '#0070F3',
    users,
  },
];

export const roleActions = [
  {
    id: 1,
    name: 'Add User',
  },
  {
    id: 2,
    name: 'Rename',
  },
  {
    id: 3,
    name: 'Remove Role',
  },
];
