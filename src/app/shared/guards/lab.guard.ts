import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router } from '@angular/router';
import { LabsService } from '../services/labs.service';


@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(
    private router: Router,
    private labService: LabsService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const id = this.labService.getKioskGroupIdValue;
    if (id != null) {
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
}

export const LabGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(route, state);
}