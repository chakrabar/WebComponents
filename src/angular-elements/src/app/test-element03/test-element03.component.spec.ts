import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestElement03Component } from './test-element03.component';

describe('TestElement03Component', () => {
    let component: TestElement03Component;
    let fixture: ComponentFixture<TestElement03Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestElement03Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestElement03Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
