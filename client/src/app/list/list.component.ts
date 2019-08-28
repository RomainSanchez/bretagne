import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Location, LocationApi } from '../shared/sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  displayedColumns = ['name', 'lattitude', 'longitude', 'medias'];
  dataSource: MatTableDataSource<Location>;
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private locationApi: LocationApi,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.locationApi.find({include: ['medias']}).subscribe((locations: Location[]) => {
      this.dataSource = new MatTableDataSource(locations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.isLoading = false;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  rowClicked(location: Location) {
    this.router.navigate(['location', location.id]);
  }

}
