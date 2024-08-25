import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth-guard.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { GameDetailsComponent } from './shared/game-details/game-details/game-details.component';
import { GamesListComponent } from './shared/games-list/games-list.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';

export const RoutePathsConfig = {
  login: 'login',
  signup: 'signup',
  games: 'games',
  game: 'games/:id',
  notFound: '**',
} as const;

export type RoutePath =
  (typeof RoutePathsConfig)[keyof typeof RoutePathsConfig];

export const routes: Routes = [
  { path: RoutePathsConfig.login, title: 'Login', component: LoginComponent },
  {
    path: RoutePathsConfig.signup,
    title: 'Signup',
    component: SignupComponent,
  },
  // TODO: try this approach (lazy loading) late
  // {
  //   path: RoutePathsConfig.games,
  //   title: 'Games',
  //   component: GamesListComponent,
  //   children: [
  //     {
  //       path: RoutePathsConfig.game,
  //       title: 'Game details',
  //       component: GameDetailsComponent,
  // loadChildren: () =>
  //   import('@/app/pages/game-details/game-details.module').then(
  //     (m) => m.GameDetailsModule
  // ),
  //     },
  //   ],
  //   canActivate: [AuthGuard],
  // },
  {
    path: RoutePathsConfig.games,
    title: 'Games',
    component: GamesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: RoutePathsConfig.game,
    title: 'Game details',
    component: GameDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    title: 'Home',
    redirectTo: RoutePathsConfig.login,
    pathMatch: 'full',
  },
  { path: '**', title: 'Page not found', component: PageNotFoundComponent },
];
