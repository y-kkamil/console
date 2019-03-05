import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchTokenModalComponent } from './fetch-token-modal.component';
import { ModalService } from 'fundamental-ngx';

describe('FetchTokenModalComponent', () => {
  const mockModalService = {
    open: jasmine
      .createSpy('open')
      .and.returnValue({ result: { finally: () => {} } }),
  };

  let component: FetchTokenModalComponent;
  let fixture: ComponentFixture<FetchTokenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FetchTokenModalComponent],
      providers: [ModalService],
    })
      .overrideComponent(FetchTokenModalComponent, {
        set: {
          template: '',
          providers: [{ provide: ModalService, useValue: mockModalService }],
        },
      })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FetchTokenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should show the fetch token modal', () => {
    expect(component['isActive']).toBe(false);
    component.show();
    expect(component['isActive']).toBe(true);
    expect(component['title']).toEqual('Fetch token');
  });
});
