import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event.service'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  constructor(private http: EventService){}

  ngOnInit(): void {
    this.http.myMethod(); 
    
  }}


