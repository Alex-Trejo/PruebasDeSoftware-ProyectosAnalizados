import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPostsComponent } from './crud-posts.component';

describe('CrudPostsComponent', () => {
  let component: CrudPostsComponent;
  let fixture: ComponentFixture<CrudPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


