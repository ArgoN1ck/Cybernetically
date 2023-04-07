import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cybernetically-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Counter';
}
