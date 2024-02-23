import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'aquera';
  data: any;

  constructor(private apiService : ApiService, private httpClient : HttpClient) { }

  ngOnInit() {
    this.apiService.getData().subscribe((data: any) => {
      console.log(data);
      this.data = data;
    });
  }
}
