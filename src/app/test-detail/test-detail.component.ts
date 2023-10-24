import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../test-list/test.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Answer } from './Interfaces/answer';
import { Question } from './Interfaces/question';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class TestDetailComponent implements OnInit {
  testId: number;
  test: any;
  testForm: FormGroup;

  constructor(private route: ActivatedRoute, 
    private testService: TestService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.testId = id ? +id : 0;
    this.testForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.testId = id ? +id : 0;

      if (this.testId) {
        this.loadTest(this.testId);
      }
    });
  }

  loadTest(testId: number) {
    this.testService.getTest(testId).subscribe(test => {
      this.test = test;

      this.test.questions.forEach((question: Question) => {
        question.answers.forEach((answer: Answer) => {
          this.testForm.addControl(answer.id.toString(), this.formBuilder.control(false));
        });
      });
    });
  }

  onSubmit() {
    if (this.testForm.valid) {
      const selectedAnswers: number[] = Object.keys(this.testForm.value)
      .filter(key => this.testForm.value[key])
      .map(Number);

      this.testService.submitAnswers(this.testId, selectedAnswers)
        .subscribe(response => {
          this.toastr.success('Test is submitted', 'Notification', { timeOut: 3000 });
        });
    }
  }
}