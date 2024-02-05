import { IService } from './../../../shared/services/service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LabServicesService } from 'src/app/shared/services/lab_services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceListComponent implements OnInit {


  private configID : number =0;
  private readonly labServices = inject(LabServicesService)
  items: IService[]  = [];

  constructor(private _router: Router ,private cdr: ChangeDetectorRef) { }


  ngOnInit() {
    const config = this._router.getCurrentNavigation()?.extras.state?.['config'];
    console.log("configId recieved from lab :",config);
    this.configID = config ;
    this.getLabRelatedServices() ;
  }


  getLabRelatedServices(){
    this.labServices.fetchServices(this.configID).pipe(take(1))    .subscribe(
      (res : any) => {
        console.log("FETCH SERVICES :", res);
        this.items = res.data;
        this.cdr.detectChanges();
        return  { info: res.info, data: res.data }
      },
      (error) => {
        console.error("Error fetching services:", error);
        console.error('Error Info:', error.error.info);
      }
    );

  }

  navigateToEmail(item: any) {
    console.log("clicked on " + item.name);
    this._router.navigate(["/email-confirmation"])
  }


}
