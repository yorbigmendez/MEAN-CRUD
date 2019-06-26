import { EmployeeListComponent } from './modules/employee/components/employee-list/employee-list.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './modules/employee/components/employee-create/employee-create.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/employees',
        pathMatch: 'full'
    },
    {
        path: 'employees',
        component: EmployeeListComponent,
    },
    {
        path: 'create',
        component: EmployeeCreateComponent
    },
    {
        path: '**',
        redirectTo: ''}
];

export const AppRouting = RouterModule.forRoot(appRoutes, {
  useHash: true,
  onSameUrlNavigation: 'reload'
});
