import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignments',
  templateUrl: './edit-assignments.component.html',
  styleUrls: ['./edit-assignments.component.css']
})
export class EditAssignmentsComponent implements OnInit {

  assignment!:Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;

  //source: string = 'list';  // valeur par défaut

  constructor(private assignmentsService:AssignmentsService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAssignment();

    //Affichage des queryParams et fragment
    console.log("Query Params : ");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment : ");
    console.log(this.route.snapshot.fragment);
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
   
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }


  onSaveAssignment() {
    if (!this.assignment) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
 
        // navigation vers la home page
        this.router.navigate(['/list']);
      });
  }

}
