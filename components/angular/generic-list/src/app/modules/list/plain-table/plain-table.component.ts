import {
  Component,
  Input,
  Injector,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { PlainListComponent } from '../plain-list/plain-list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'y-plain-table',
  templateUrl: './plain-table.component.html',
  styleUrls: ['./plain-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlainTableComponent extends PlainListComponent {
  @Input() headerRenderer: Type<any>;
  @Input() footerRenderer: Type<any>;
  @Input() entryTagName = 'tbody';

  @ViewChild('header', { read: ViewContainerRef })
  headerViewContainer: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef })
  footerViewContainer: ViewContainerRef;

  render(source: Observable<any[]>) {
    super.render(source);

    if (this.headerRenderer) {
      const injector = Injector.create({
        providers: [],
        parent: this.headerViewContainer.parentInjector,
      });
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        this.headerRenderer,
      );
      const hostTag = document.createElement('thead');
      const component = componentFactory.create(injector, [], hostTag);
      this.headerViewContainer.clear();
      this.headerViewContainer.insert(component.hostView);
    }

    if (this.footerRenderer) {
      const injector = Injector.create({
        providers: [],
        parent: this.footerViewContainer.parentInjector,
      });
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        this.footerRenderer,
      );
      const hostTag = document.createElement('tfoot');
      const component = componentFactory.create(injector, [], hostTag);
      this.footerViewContainer.clear();
      this.footerViewContainer.insert(component.hostView);
    }
  }
}
