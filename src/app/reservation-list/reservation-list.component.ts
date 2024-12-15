import { Component,OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations : Reservation[] = []
  filteredReservations : Reservation[] = []

  constructor(private reservationService: ReservationService){

  }

// WithOut Mockoon Api/
ngOnInit(): void {
  this.reservations = this.reservationService.getReservations();  
  this.filteredReservations = this.reservations;
}

deleteReservation(id : string){
  this.reservationService.deleteReservation(id);
}


//  With Mockoon Api
//   ngOnInit(): void {
//     this.reservationService.getReservations().subscribe(reservations => {
//       this.reservations = reservations;
//       this.filteredReservations = reservations;
//     });
    
//   }

//   deleteReservation(id: string){

//     this.reservationService.deleteReservation(id).subscribe(() =>
//     {
//       console.log("Successfully processed the delete Api")
//     });
//   }

  applyFilter(event: Event): void{
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredReservations = this.reservations.filter(
      product => product.guestName.toLowerCase().includes(searchTerm)
    )
  }

  

}
