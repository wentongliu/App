import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TestPage} from "./tab2/test/test.page";
import {EventCanDeactivate} from "./base/baseFilter/CanDeactivate/TestPageCanDeactivate";
import {TabsPage} from "./tabs/tabs.page";


const routes: Routes = [
  { path: '', component: TabsPage
  },
  {
    path: 'tabs/tab2/test', component:TestPage,
    canDeactivate: [EventCanDeactivate]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
