import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rForm: FormGroup;
  post: any;
  description: string = '';
  guestName: string = '';
  titleAlert: string = 'This field is required';

  constructor(private fb: FormBuilder){
    this.rForm = fb.group({
      'guestName': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'validate': ''
    });
  }

  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.rForm.get('guestName').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.rForm.get('guestName').setValidators(Validators.required);
        }
        this.rForm.get('guestName').updateValueAndValidity();
      }
    )
  }

  addPost(post){
    this.description = post.description;
    this.guestName = post.guestName;
  }
}