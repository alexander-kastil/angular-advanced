import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { StatefulDemoService } from '../stateful-demo.service';
import { AsyncPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss'],
  imports: [MatToolbar, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiComponent {
  service = inject(StatefulDemoService);
  count = this.service.getDemos().pipe(map((items) => items.length));
}
