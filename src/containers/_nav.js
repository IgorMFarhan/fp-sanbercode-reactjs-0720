export default [
  // Dashboard
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },


  // Movies
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Movie']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Movie List',
    to: '/movie/list',
    icon: 'cil-movie',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create New',
    to: '/movie/create',
    icon: 'cil-pencil',
  },

  // Games
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Game']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Game List',
    to: '/game/list',
    icon: 'cil-gamepad',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create New',
    to: '/game/create',
    icon: 'cil-pencil',
  },

  // User
  {
    _tag: 'CSidebarNavTitle',
    _children: ['User']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Change Password',
    to: '/change-password',
    icon: 'cil-fingerprint',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    onClick: 'handleLogout',
    icon: 'cil-account-logout',
  },

]

