import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {TestPage} from "../../../tab2/test/test.page";
import {Injectable} from "@angular/core";
/**
 * 路由监听控制，控制testpage页面的路由守卫
 */
@Injectable({
  providedIn: 'root'
})
export class  EventCanDeactivate implements CanDeactivate<TestPage> {

  canDeactivate(component: TestPage, route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log( component);
    if(component){
      return component.leaveTip();
    }
    return false;
  }
}


