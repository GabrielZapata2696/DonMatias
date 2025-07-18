import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

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
    MatCardModule,
    MatSnackBarModule
  ]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  
  // EmailJS configuration
  private readonly SERVICE_ID = EMAILJS_CONFIG.SERVICE_ID;
  private readonly TEMPLATE_ID = EMAILJS_CONFIG.TEMPLATE_ID;
  private readonly PUBLIC_KEY = EMAILJS_CONFIG.PUBLIC_KEY;
  
  contactInfo = [
    {
      icon: 'location_on',
      title: 'Nuestra Ubicación',
      details: ['Oficina: Calle 9 sur # 79C - 139', 'Medellín, Antioquia']
    },
    {
      icon: 'phone',
      title: 'Teléfono',
      details: ['+57 313-681-7407', 'Lun-Vie, 8am-5pm COT']
    },
    {
      icon: 'email',
      title: 'Correo Electrónico',
      details: ['Empresadedesarrollotorritorial@gmail.com']
    }
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
    
    // Initialize EmailJS
    emailjs.init(this.PUBLIC_KEY);
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      try {
        // Prepare the email parameters
        const emailParams = {
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
          to_email: 'Empresadedesarrollotorritorial@gmail.com'
        };

        // Send email using EmailJS
        const result = await emailjs.send(
          this.SERVICE_ID,
          this.TEMPLATE_ID,
          emailParams
        );

        // Show success message
        this.snackBar.open(
          '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
          'Cerrar',
          {
            duration: 5000,
            panelClass: ['success-snackbar']
          }
        );

        // Reset form
        this.contactForm.reset();
        
      } catch (error) {
        console.error('Error sending email:', error);
        
        // Show error message
        this.snackBar.open(
          'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
          'Cerrar',
          {
            duration: 5000,
            panelClass: ['error-snackbar']
          }
        );
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
