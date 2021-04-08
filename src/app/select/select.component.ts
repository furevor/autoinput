import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AutocompleteInputComponent } from '../autocomplete-input/autocomplete-input.component';
import { Observable } from 'rxjs';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OptionFilterService } from '../option-filter.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor, OnInit {
    @Input() public options$!: Observable<string[]>;
    @Input() public placeholder?: string;
    @ViewChild('autocomplete', { static: false }) public autocomplete!: AutocompleteInputComponent;

    public filteredOptions$!: Observable<string[]>;
    public autocompleteControl = new FormControl('');
    public selectedOptionLabel!: string;

    // tslint:disable-next-line:variable-name
    private _value!: string;

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        console.log(`${value} - from setter`);
        this._value = value;
        if (this.onChange) {
            this.onChange(value);
        }
    }

    private onChange!: (arg0: string) => string;
    private onTouched!: (arg0: string) => string;

    constructor(public control: NgControl, private optionFilterService: OptionFilterService) {
        this.control.valueAccessor = this;
    }

    @Input() public bindLabelFunction: (value: string) => string = (value: string) => {
        return value ? value : '';
    };

    ngOnInit(): void {
        this.filteredOptions$ = this.optionFilterService
            .getFilteredOptions(this.autocompleteControl.valueChanges, this.options$, this.bindLabelFunction)
            .pipe(
                tap(() => {
                    console.log(`This is our inner value ... ${this.control?.control?.value}`);
                }),
            );
    }

    public registerOnChange(fn: (arg0: string) => string): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: (arg0: string) => string): void {
        this.onTouched = fn;
    }

    public writeValue(value: string): void {
        this.value = value;
        this.selectedOptionLabel = this.bindLabelFunction(value);
    }

    public openPanel(): void {
        this.autocomplete.changePanelState(true);
    }

    public focusOutEmit(event: FocusEvent): void {
        const { relatedTarget = {} } = event || {};
        const { nodeName = '' } = (relatedTarget as HTMLElement) || {};
        if (nodeName !== 'MAT-OPTION') {
            this.autocompleteControl.setValue('');
        }
    }

    public optionSelected({ option: { value } }: MatAutocompleteSelectedEvent): void {
        this.value = value;
        this.selectedOptionLabel = this.bindLabelFunction(value);
        this.autocompleteControl.setValue('');
    }

    public get invalid(): boolean | null {
        return this.control ? this.control.invalid : false;
    }
}
