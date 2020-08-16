import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CreateMovie = React.lazy(() => import('./views/movies/CreateMovie.js'));
const MovieList = React.lazy(() => import('./views/movies/MovieList.js'));
const EditMovie = React.lazy(() => import('./views/movies/EditMovie.js'));
const ChangePassword = React.lazy(() => import('./views/profile/ChangePassword.js'));
const CreateGame = React.lazy(() => import('./views/games/CreateGame.js'));
const EditGame = React.lazy(() => import('./views/games/EditGame.js'));
const GameList = React.lazy(() => import('./views/games/GameList.js'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/movie/create', name: 'Add Movie', component: CreateMovie },
  { path: '/movie/edit/:id', name: 'Edit Movie', component: EditMovie },
  { path: '/movie/list', name: 'Movies List', component: MovieList },
  { path: '/change-password', name: 'Change Password', component: ChangePassword },
  { path: '/game/create', name: 'Add Game', component: CreateGame },
  { path: '/game/edit/:id', name: 'Edit Game', component: EditGame },
  { path: '/game/list', name: 'Games List', component: GameList },
];

export default routes;
