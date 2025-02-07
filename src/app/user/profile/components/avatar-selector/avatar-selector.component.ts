import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'md-avatar-selector',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './avatar-selector.component.html',
  styleUrl: './avatar-selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvatarSelector),
      multi: true,
    },
  ],
})
export class AvatarSelector implements ControlValueAccessor {
  avatarFile: File | string = '';

  private onChange: (value: File | string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: File | string): void {
    this.avatarFile = value;
  }

  registerOnChange(fn: (value: File | string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onImagePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.length ? input.files[0] : '';

    this.avatarFile = file;
    this.onChange(file);
    this.onTouched();
  }

  onImageRemove(): void {
    this.avatarFile = '';
    this.onChange('');
    this.onTouched();
  }
}
