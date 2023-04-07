import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cybernetically-sign-in-page',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {}
