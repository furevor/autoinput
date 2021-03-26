import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { InputComponent } from '../input/input.component';

export type InputTypeModel = 'search';

@Component({
    selector: 'app-autocomplete-input',
    templateUrl: './autocomplete-input.component.html',
    styleUrls: ['./autocomplete-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteInputComponent implements ControlValueAccessor, AfterViewInit {
    @Output() public inputFocus = new EventEmitter<FocusEvent>();
    @Output() public inputFocusOut = new EventEmitter<FocusEvent>();
    @Output() public optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();
    @Input() public autocompletePosition: 'auto' | 'below' | 'above' = 'auto';
    @Input() public maxTermLength?: number;
    @Input() public inputType?: InputTypeModel;
    @Input() public cleanable?: boolean;
    @Input() public autoActiveFirstOption?: boolean;
    @Input() public options$!: Observable<unknown[]>;
    @Input() public placeholder?: string;
    @Input() public autocompleteDisabled?: boolean;
    @Input() public manualPanelControl?: boolean;
    @Input() public invalidInput?: boolean;

    @ViewChild('scrollBar', { static: false }) private scrollBar: NgScrollbar;
    @ViewChild('mtsInput', { static: false }) private mtsInput: InputComponent;
    @ViewChild('autoComplete', { static: false }) private autoComplete: MatAutocomplete;

    public focused: boolean;

    private onChange: (string) => string;
    private onTouched: (string) => string;
    private _value: string;

    constructor(private control: NgControl, private cdr: ChangeDetectorRef) {
        this.control.valueAccessor = this;
    }

    @Input() public bindLabelFunction: (value: unknown) => string = (value: string) => {
        return value;
    };

    ngAfterViewInit(): void {
        const { autocompletePosition } = this;
        this.mtsInput.trigger.position = autocompletePosition;
    }

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
        if (this.onChange) {
            this.onChange(value);
        }
    }

    public writeValue(value: string): void {
        this._value = value;
        this.cdr.markForCheck();
    }

    public registerOnChange(fn: (string) => string): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: (string) => string): void {
        this.onTouched = fn;
    }

    public scrollToCurrentItem(event: KeyboardEvent): void {
        const {
            mtsInput: {
                trigger: { activeOption },
            },
        } = this;
        const {
            scrollBar: { nativeElement: scrollBarElement },
        } = this;

        const {
            autoComplete: {
                options: { length: optionsQuantity },
            },
        } = this;

        if (activeOption) {
            const activeOptionElement = activeOption._getHostElement();
            const activeOptionElementRect = activeOptionElement.getBoundingClientRect();
            const scrollBarRect = scrollBarElement.getBoundingClientRect();

            const { bottom: currentItemBottom } = activeOptionElementRect;
            const { top: currentItemTop } = activeOptionElementRect;
            const { bottom: scrollBarBottom } = scrollBarRect;
            const { top: scrollBarTop } = scrollBarRect;
            const maxViewedOptions = scrollBarElement.offsetHeight / activeOptionElement.offsetHeight;

            switch (event.code) {
                case 'ArrowDown':
                    if (currentItemBottom > scrollBarBottom) {
                        this.scrollBar.scrollTo({
                            top:
                                activeOptionElement.offsetTop -
                                activeOptionElement.offsetHeight * (maxViewedOptions - 1),
                        });
                    } else if (activeOption && activeOptionElement.offsetTop === 0) {
                        this.scrollBar.scrollTo({ top: activeOptionElement.offsetTop });
                    }
                    break;
                case 'ArrowUp':
                    if (currentItemTop <= scrollBarTop) {
                        this.scrollBar.scrollTo({ top: activeOptionElement.offsetTop });
                    } else if (
                        activeOption &&
                        activeOptionElement.offsetTop === activeOptionElement.offsetHeight * (optionsQuantity - 1)
                    ) {
                        this.scrollBar.scrollTo({ top: activeOptionElement.offsetTop });
                    }
                    break;
                default:
                    break;
            }
        }
    }

    public changePanelState(open: boolean): void {
        if (this.mtsInput.trigger) {
            open ? this.mtsInput.trigger.openPanel() : this.mtsInput.trigger.closePanel();
        }
    }

    public inputFocusEmit(event: FocusEvent): void {
        this.focused = true;
        this.inputFocus.emit(event);
    }

    public optionSelectedEmit(event: MatAutocompleteSelectedEvent): void {
        this.optionSelected.emit(event);
    }

    public inputFocusOutEmit(event: FocusEvent): void {
        this.focused = false;
        this.inputFocusOut.emit(event);
        const { relatedTarget = {} } = event || {};
        const { nodeName = '' } = (relatedTarget as HTMLElement) || {};
        if (nodeName != 'MAT-OPTION') {
            this.changePanelState(false);
        }
    }

    public focus(): void {
        this.mtsInput.focus();
    }

    public panelOpened(): void {
        this.mtsInput.panelOpened();
    }

    public panelClosed(): void {
        this.mtsInput.panelClosed();
    }

    public get invalid(): boolean {
        return this.control ? this.control.invalid || this.invalidInput : false;
    }
}
