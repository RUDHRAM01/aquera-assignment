import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Aquera';
  data: any;
  page = 1;
  constructor(private apiService: ApiService) {
    this.apiService.getData(1).subscribe((data: any) => {
      this.data = data.results;
      for (let i = 0; i < this.data.length; i++) {
      this.data[i].residents.forEach((resident: any) => {
        this.apiService.getResidentData(resident).subscribe((residentData: any) => {
          if(this.data[i].residentData === undefined) {
            this.data[i].residentData = [];
          }
          this.data[i].residentData.push(residentData);
        });
      });
      }
    });
  }

  loadNext(value: any) {
    if (value === 'next') {

      this.page = this.page + 1;
    } else if (value === 'prev') {
      if (this.page === 1) {
        return;
      }
      this.page = this.page - 1;
    } else {
      this.page = value;
    }
    this.apiService.getData(this.page).subscribe((data: any) => {
      this.data = data.results;
      for (let i = 0; i < this.data.length; i++) {
      this.data[i].residents.forEach((resident: any) => {
        this.apiService.getResidentData(resident).subscribe((residentData: any) => {
          if(this.data[i].residentData === undefined) {
            this.data[i].residentData = [];
          }
          this.data[i].residentData.push(residentData);
        });
      });
      }
    }, (error: any) => {
      if(error.status === 404) {
        this.page = this.page - 1;
      }
    });
  }
}
