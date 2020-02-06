import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Location, LocationApi } from '../shared/sdk';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'lattitude', 'longitude', 'level', 'medias', 'delete'];
  dataSource: MatTableDataSource<Location>;
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private locationApi: LocationApi,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.isLoading = true;

    this.locationApi.find({include: ['medias']}).subscribe((locations: Location[]) => {
      this.dataSource.data = locations;

      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.filter;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  rowClicked(location: Location) {
    this.router.navigate(['location', location.id]);
  }

  openConfirmationDialog(location: Location): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Supprimer définitivement ce lieu et ses médias ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delete(location);
      }
    });
  }

  private filter(location: Location, filters: string) {
    const matchFilter = [];
    const filterArray = filters.split('+');
    const fields = Object.values(location).filter(Boolean);

    filterArray.forEach(filter => {
      const customFilter = [];

      fields.forEach(field => {
        if (typeof field === 'string') {
          customFilter.push(field.toLocaleLowerCase().includes(filter));
        }

        if (typeof field === 'number') {
          customFilter.push((field + '').includes(filter));
        }
      });
      matchFilter.push(customFilter.some(Boolean));
    });

    return matchFilter.every(Boolean);
  }

  private delete(location: Location): void {
    this.locationApi.deleteById(location.id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(theLocation => theLocation.id !== location.id);
      this.snackbar.open('Lieu supprimé', null, {duration: 2000});
    });
  }
}
