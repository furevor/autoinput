var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
var InputComponent = /** @class */ (function () {
    function InputComponent(control, cdr) {
        this.control = control;
        this.cdr = cdr;
        this.inputFocus = new EventEmitter();
        this.inputFocusOut = new EventEmitter();
        this.placeholder = '';
        this.autocompletePosition = 'auto';
        this.control.valueAccessor = this;
    }
    Object.defineProperty(InputComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            if (this.onChange) {
                this.onChange(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.ngOnInit = function () {
        this.setClasses();
    };
    InputComponent.prototype.ngOnChanges = function (_a) {
        var cleanable = _a.cleanable, inputType = _a.inputType, manualPanelControl = _a.manualPanelControl;
        if (cleanable || inputType || manualPanelControl) {
            this.setClasses();
        }
    };
    InputComponent.prototype.writeValue = function (value) {
        this._value = value;
        this.cdr.markForCheck();
    };
    InputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    InputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    InputComponent.prototype.clearInput = function (event) {
        event.preventDefault();
        this.value = '';
    };
    InputComponent.prototype.inputFocusEmit = function (event) {
        this.inputFocus.emit(event);
    };
    InputComponent.prototype.inputFocusOutEmit = function (event) {
        this.inputFocusOut.emit(event);
        if (this.onTouched) {
            this.onTouched();
        }
        this.controlTouched = true;
        this.cdr.markForCheck();
    };
    InputComponent.prototype.panelOpened = function () {
        this.cdr.markForCheck();
    };
    InputComponent.prototype.panelClosed = function () {
        this.cdr.markForCheck();
    };
    InputComponent.prototype.focus = function () {
        this.inputWithAutocomplete.nativeElement.focus();
    };
    InputComponent.prototype.openAutocompletePanel = function (event) {
        event.preventDefault();
        this.focus();
        this.trigger.openPanel();
    };
    InputComponent.prototype.closeAutocompletePanel = function (event) {
        event.preventDefault();
        this.trigger.closePanel();
    };
    Object.defineProperty(InputComponent.prototype, "invalid", {
        get: function () {
            return this.control ? this.control.invalid || this.invalidInput : false;
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.setClasses = function () {
        var _a;
        var typeClass = "mts-input-" + this.inputType;
        this.customiseClasses = (_a = {
                'mts-input-with-icon': !!this.inputType
            },
            _a[typeClass] = !!this.inputType,
            _a);
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "inputFocus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "inputFocusOut", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "autocompletePosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputComponent.prototype, "maxTermLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", MatAutocomplete)
    ], InputComponent.prototype, "matAutocomplete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputComponent.prototype, "inputType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "cleanable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "autocompleteDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "manualPanelControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "invalidInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "autocompletePanelOpened", void 0);
    __decorate([
        ViewChild(MatAutocompleteTrigger, { static: false }),
        __metadata("design:type", MatAutocompleteTrigger)
    ], InputComponent.prototype, "trigger", void 0);
    __decorate([
        ViewChild('inputWithAutocomplete', { static: false }),
        __metadata("design:type", ElementRef)
    ], InputComponent.prototype, "inputWithAutocomplete", void 0);
    InputComponent = __decorate([
        Component({
            selector: 'mts-input',
            templateUrl: './input.component.html',
            styleUrls: ['./input.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [NgControl, ChangeDetectorRef])
    ], InputComponent);
    return InputComponent;
}());
export { InputComponent };
