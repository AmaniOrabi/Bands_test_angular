import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BandService {
  private apiUrl = 'http://localhost:8000/api/bands';

  constructor(private http: HttpClient) {}

  getBands(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBand(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBand(band: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/`, band, { headers });
  }

  updateBand(band: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${band.id}`, band, {
      headers,
    });
  }

  deleteBand(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
