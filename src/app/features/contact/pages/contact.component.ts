import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class ContactComponent {
  contactForm: FormGroup;
  
  contactInfo = [
    {
      icon: 'location_on',
      title: 'Nuestra Ubicación',
      details: ['Avenida de Negocios 123', 'Suite 100', 'Madrid, 28001']
    },
    {
      icon: 'phone',
      title: 'Teléfonos',
      details: ['+34 915 123 456', 'Lun-Vie, 9am-6pm CET']
    },
    {
      icon: 'email',
      title: 'Correo Electrónico',
      details: ['info&#64;brochure.com', 'soporte&#64;brochure.com']
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Handle form submission
    }
  }
}
