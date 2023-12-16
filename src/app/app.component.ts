import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface UserDataType {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date | string;
  gender: string;
  education: string;
  company: string;
  experience: string;
  package: string;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-crudapp-json-server-15';

  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
  ];

  dataSource!: MatTableDataSource<UserDataType>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getAllUserData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllUserData() {
    this._userService.getAllUsers().subscribe({
      next: (resp: any) => {
        console.log('resp=>', resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log('err=>', err);
      },
    });
  }
}
