import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { operatorsArray } from '../../assets';
import { DestroyableDirective } from '../destroyable.directive';

@Component({
    selector: 'app-main-form',
    templateUrl: './main-form.component.html',
    styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent extends DestroyableDirective implements OnInit {
    public operators$: Observable<string[]>;
    public otherOperator = '';

    public readonly otherOperatorValue = 'Другое (указать)';

    public operatorControl = new FormControl('', { validators: [Validators.required] });

    constructor() {
        super();
        const operators = operatorsArray;
        const [firstOperator] = operators;
        const autoSelectedOperator = firstOperator;
        this.operatorControl.setValue(autoSelectedOperator);

        this.operators$ = of([...operators, this.otherOperatorValue]);
    }

    public forward(): void {
        // if (this.model.Operator === this.otherOperatorValue) {
        //     const { otherOperator } = this;
        //     this.model.Operator = otherOperator;
        // }
        // this.formNavigationService.forward();
    }

    ngOnInit(): void {
        // TODO: remove model and create reactive form for all pages
        this.operatorControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(operator => {
            console.log(`hello form ${operator}`);
        });
    }
}
