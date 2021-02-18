import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Atleta } from '../../models/atleta';
import { AdministradorServiceService } from 'src/services/administrador-service.service';
import { DataTableDirective } from 'angular-datatables';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements AfterViewInit, OnInit {

  //Pestañas
  public informacion: boolean = true;

  public totalOro: number = 0;
  public totalPlata: number = 0;
  public totalBronce: number = 0;

  public closeResult: string;

  //TablaInformacionAtletas
  public rows: Atleta[] = [];
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  //Medallas
  public tipoMedalla: string;

  constructor(private administradorService: AdministradorServiceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  changeTab() {
    if(this.informacion) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.informacion = false;
        console.log('Destruida');
      });
    }

    if (!this.informacion) {
      this.informacion = true;
      this.getInformacion();
    }
  }

  getInformacion() {
    this.administradorService.getAtletas().subscribe((data: any) => {
      this.rows = [];
      this.rows = data;
      this.dtTrigger.next();
      console.log('cargar tabla')
      this.contarMedallas();  
    }, 
    error => {
      alert('Error al traer datos de administrador.' + error);
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }

  ngAfterViewInit(): void {
    this.getInformacion();
  }

  contarMedallas() {
    for (let index = 0; index < this.rows.length; index++) {
      this.totalOro =  this.totalOro + this.rows[index].gold;
      this.totalPlata = this.totalPlata + this.rows[index].silver;
      this.totalBronce = this.totalBronce + this.rows[index].bronze;
    }
  }

  mostrarMensajeMedalla(modal, tipoMedalla) {
    this.tipoMedalla = tipoMedalla;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Cerrar con: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
