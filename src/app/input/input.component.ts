import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { InputTypeModel } from '../autocomplete-input/autocomplete-input.component';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor, OnChanges, OnInit {
    @Output() public inputFocus = new EventEmitter<FocusEvent>();
    @Output() public inputFocusOut = new EventEmitter<FocusEvent>();
    @Input() public placeholder: string | undefined = '';
    @Input() public autocompletePosition = 'auto';
    @Input() public maxTermLength?: number;
    @Input() public matAutocomplete?: MatAutocomplete;
    @Input() public inputType?: InputTypeModel;
    @Input() public cleanable?: boolean;
    @Input() public autocompleteDisabled?: boolean;
    @Input() public manualPanelControl?: boolean;
    @Input() public invalidInput?: boolean | undefined | null;
    @Input() public autocompletePanelOpened!: boolean;

    @ViewChild(MatAutocompleteTrigger, { static: false }) public trigger!: MatAutocompleteTrigger;
    @ViewChild('inputWithAutocomplete', { static: false }) public inputWithAutocomplete!: ElementRef;

    public customiseClasses!: { [key: string]: boolean };
    public controlTouched!: boolean;
    private onChange!: (arg0: string) => string;
    private onTouched!: () => void;
    // tslint:disable-next-line:variable-name
    private _value!: string;

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
        if (this.onChange) {
            this.onChange(value);
        }
    }

    constructor(private control: NgControl, private cdr: ChangeDetectorRef) {
        this.control.valueAccessor = this;
    }

    ngOnInit(): void {
        this.setClasses();
    }

    ngOnChanges({ cleanable, inputType, manualPanelControl }: SimpleChanges): void {
        if (cleanable || inputType || manualPanelControl) {
            this.setClasses();
        }
    }

    public writeValue(value: string): void {
        this._value = value;
        this.cdr.markForCheck();
    }

    public registerOnChange(fn: (arg0: string) => string): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public clearInput(event: MouseEvent): void {
        event.preventDefault();
        this.value = '';
    }

    public inputFocusEmit(event: FocusEvent): void {
        this.inputFocus.emit(event);
    }

    public inputFocusOutEmit(event: FocusEvent): void {
        this.inputFocusOut.emit(event);
        if (this.onTouched) {
            this.onTouched();
        }
        this.controlTouched = true;
        this.cdr.markForCheck();
    }

    public panelOpened(): void {
        this.cdr.markForCheck();
    }

    public panelClosed(): void {
        this.cdr.markForCheck();
    }

    public focus(): void {
        this.inputWithAutocomplete.nativeElement.focus();
    }

    public openAutocompletePanel(event: MouseEvent): void {
        event.preventDefault();
        this.focus();
        this.trigger.openPanel();
    }

    public closeAutocompletePanel(event: MouseEvent): void {
        event.preventDefault();
        this.trigger.closePanel();
    }

    public get invalid(): boolean | undefined | null {
        return this.control ? this.control.invalid || this.invalidInput : false;
    }

    private setClasses(): void {
        const typeClass = `mts-input-${this.inputType}`;
        this.customiseClasses = {
            'mts-input-with-icon': !!this.inputType,
            [typeClass]: !!this.inputType,
        };
    }
}
