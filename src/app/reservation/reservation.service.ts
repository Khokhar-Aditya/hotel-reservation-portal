import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
    
  private apiUrl = "http://localhost:3000"
  private reservations : Reservation[] =[];

  constructor(private http: HttpClient){
    let savedReservatiopns = localStorage.getItem("reservations");
    this.reservations = savedReservatiopns ? JSON.parse(savedReservatiopns) : [];
  }

// WithOut Mockoon API

  getReservations(): Reservation[]{
    return this.reservations;
  }

  getReservation(id : string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation : Reservation): void{
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }

  deleteReservation(id : string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index,1)
    localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }  

  updateReservation(id: string ,updateReservation : Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updateReservation;
    localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }

  //With Mockoon Api

  // getReservations(): Observable<Reservation[]>{
  //   return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  // }

  // getReservation(id : string): Observable<Reservation> {
  //   return this.http.get<Reservation>(this.apiUrl + "/reservation/"+id);
  // }

  // addReservation(reservation : Reservation): Observable<void>{
  //   return this.http.post<void>(this.apiUrl + "/reservation", reservation);

  // }

  // deleteReservation(id : string): Observable<void> {
  //   return this.http.delete<void>(this.apiUrl + "/reservation/"+id);
  // }  

  // updateReservation(id: string ,updateReservation : Reservation): Observable<void> {
  //   return this.http.put<void>(this.apiUrl + "/reservation/"+ id, updateReservation);

  // }
  
}
