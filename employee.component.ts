import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  employees!: any;
  empForm!: FormGroup;
  constructor(private es: EmployeeService, private fb: FormBuilder) {
    this.empForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.es.getEmployee().subscribe((data) => {
      this.employees = data;
    });
  }
  postData() {
    this.es.postEmployee(this.empForm.value).subscribe((data) => {
      console.log('Added...');
      alert('Added');
    });
  }
  updateData(id: number, data: any) {
    this.es.updateEmployee(id, this.empForm.value).subscribe(() => {
      console.log('Updated..');
      alert('Updated');
    });
  }
  deleteData(id: number) {
    this.es.deleteEmployee(id).subscribe(() => {
      console.log('Deleted...');
      alert('Deleted');
    });
  }
}
