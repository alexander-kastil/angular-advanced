import { Component, forwardRef, input, signal } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NumberPickerComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => NumberPickerComponent),
    },
  ],
  imports: [MatIcon]
})
export class NumberPickerComponent implements ControlValueAccessor, Validator {
  // Values
  quantity = signal(0);

  //A callback function that is called when the control's value changes in the UI.
  private onChange: Function = (newQuantity: number) => {
    this.quantity.set(newQuantity);
  };

  // a callback function that is called by the forms API on initialization to update the form model on blur
  private onTouched: Function = () => {
    this.markAsTouched();
  };

  touched = false;

  disabled = false;

  // Increments the quantity and calls onChange
  onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity.update(old => old + 1);
      this.onChange(this.quantity);
    }
  }

  // Decrements the quantity and calls onChange
  onRemove() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity.update(old => old - 1);
      this.onChange(this.quantity);
    }
  }

  // Updates the quantity.
  writeValue(newQuantity: number) {
    this.quantity.set(newQuantity);
  }

  // Registers a callback for when the value changes
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // Registers a callback for when the control is touched
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // Marks the control as touched
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  // Sets the disabled state
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  // Validates the control
  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity,
        },
      };
    }
    return null;
  }
}
