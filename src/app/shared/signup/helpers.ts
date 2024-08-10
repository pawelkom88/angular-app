import { AbstractControl, FormGroup } from '@angular/forms';
import { Labels, labels } from './constants';

export function getErrorMessage(form: FormGroup, controlName: Labels): string {
  const control = form.get(controlName);

  if (!control) {
    return '';
  }

  if (control.untouched) {
    return '';
  }

  if (control.hasError('required')) {
    return `${labels[controlName]} is required.`;
  }

  if (control.hasError('email')) {
    return 'Please enter a valid email address.';
  }

  if (control.hasError('minlength')) {
    const minLength = control.errors?.['minlength'].requiredLength;
    return `${labels[controlName]} must be at least ${minLength} characters long.`;
  }

  if (control.hasError('pattern')) {
    return `${labels[controlName]} must include uppercase, lowercase, a number, and a special character.`;
  }

  if (control.hasError('passwordMismatch')) {
    return 'Passwords do not match.';
  }

  return '';
}

export function getFormError(form: FormGroup): string {
  if (form.untouched) {
    return 'Please fill in the form.';
  }

  const untouchedFields = Object.keys(form.controls).filter(
    (key) => !form.get(key)?.touched
  );

  if (untouchedFields.length > 0) {
    return 'Please fill in the remaining fields.';
  }

  return '';
}

export function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  const passwordMismatch = password && confirmPassword && password.value !== confirmPassword.value;

  if (passwordMismatch) {
    confirmPassword.setErrors({ passwordMismatch: true });
  } else {
    confirmPassword?.setErrors(null);
  }

  return null;
}
