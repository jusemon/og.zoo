
import { Injectable, ComponentFactoryResolver, ApplicationRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private componentRef: ComponentRef<LoadingComponent>;
  displayed = false;
  constructor(private factoryResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef) { }

  show() {
    if (this.displayed) {
      return;
    }
    const factory = this.factoryResolver.resolveComponentFactory(LoadingComponent);
    const rootViewContainer = this.getRootComponent();
    this.componentRef = factory.create(rootViewContainer.injector);
    this.applicationRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.displayed = true;
  }

  hide() {
    if (!this.displayed) {
      return;
    }
    this.applicationRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.displayed = false;
  }

  private getRootComponent() {
    const rootComponents = this.applicationRef.components;
    return rootComponents[0];
  }
}
