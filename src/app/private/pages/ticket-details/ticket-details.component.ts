import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { TicketsService } from 'src/app/shared/services/tickets.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticketId: number | null = null;
  ticket: any;
  paramMapSubscription: Subscription | null = null;
  queryParamsSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private readonly ticketService: TicketsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.paramMapSubscription = this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ticketId') ? Number(params.get('ticketId')) : null;
    });
  }

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(queryParams => {
      if ("token" in queryParams && queryParams['token']) {
        localStorage.setItem('token', queryParams['token'])
        if (this.ticketId) {
          this.router.navigate([`private/ticket/${this.ticketId}`], { replaceUrl: true })
        }
      } else if (localStorage.hasOwnProperty("token") && this.ticketId) {
        this.getTicket(this.ticketId);
      }
    });
  }

  getTicket(id: number) {
    this.ticketService.retrieveTicket(id).pipe(
      take(1)
    ).subscribe((res) => {
      this.ticket = res.data;
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy() {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
