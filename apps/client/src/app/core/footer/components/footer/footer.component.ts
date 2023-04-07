import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cybernetically-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
