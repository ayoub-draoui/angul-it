import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Challenge } from './pages/challenge/challenge';
import { Result } from './pages/result/result';
import { captchaGuard } from './guards/captcha.guard';
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'challenge', component: Challenge },
    { path: 'result',component: Result,canActivate: [captchaGuard]}

];
