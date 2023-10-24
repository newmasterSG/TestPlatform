import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  tests!: any[]; // Здесь следует определить тип вашей модели тестов

  constructor(private testService: TestService) {
  }

  ngOnInit() {
    this.testService.getTests().subscribe(tests => this.tests = tests);
  }
}
