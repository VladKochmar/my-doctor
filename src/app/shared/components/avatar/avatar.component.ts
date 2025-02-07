import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() name: string = 'U';
  @Input() avatar: string | null = null;
  @Input() size: number = 42;
  @Input() font: number = 18;
}
