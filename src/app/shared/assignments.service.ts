import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of, forkJoin } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { assignments } from '../shared/data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  url = "https://service1-projet-angular.onrender.com/api/assignments";
  //url = "http://localhost:8010/api/assignments";

  peuplerBD(): Observable<Assignment[]> {
    const calls = assignments.map((assignment) => this.addAssignment(assignment));
    return forkJoin(calls); // forkJoin attend que toutes les requêtes soient résolues
  }

  getAssignments(page: number, limit: number, filtre: string, r: string): Observable<any> {
    return this.http.get(this.url + `?page=${page}&limit=${limit}`+'&trie=' + filtre + "&recherche=" + r);
  }


  addAssignment(assignment: Assignment): Observable<Assignment> {
    console.log("Dans addAssignment, avant post");
    console.log(assignment);
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    //return of('Assignment service : assignment modifié !');
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    // return of('Assignment service : assignment supprimé !');
    let deleteURI = this.url + "/" + assignment._id;
    return this.http.delete(deleteURI);
  }

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.url}/id/${id}`);
  }
  

  getAssignmentbis(_id: { $oid: string }): Observable<Assignment | undefined> {
    // Extraire la valeur $oid de l'objet _id
    const id = _id.$oid;
  
    // Utiliser cette valeur dans l'URL de la requête
    return this.http.get<Assignment>(`${this.url}/${id}`);
  }
  

}