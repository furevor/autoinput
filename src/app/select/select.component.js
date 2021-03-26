var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { AutocompleteInputComponent } from '../autocomplete-input/autocomplete-input.component';
import { Observable } from 'rxjs';
import { FormControl, NgControl } from '@angular/forms';
import { OptionFilterService } from '../../services';
var SelectComponent = /** @class */ (function () {
    function SelectComponent(control, optionFilterService) {
        this.control = control;
        this.optionFilterService = optionFilterService;
        this.autocompleteControl = new FormControl('');
        this.bindLabelFunction = function (value) {
            return value ? value : '';
        };
        this.control.valueAccessor = this;
    }
    Object.defineProperty(SelectComponent.prototype, "value", {
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
    SelectComponent.prototype.ngOnInit = function () {
        this.filteredOptions$ = this.optionFilterService.getFilteredOptions(this.autocompleteControl.valueChanges, this.options$, this.bindLabelFunction);
    };
    SelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    SelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    SelectComponent.prototype.writeValue = function (value) {
        this.value = value;
        this.selectedOptionLabel = this.bindLabelFunction(value);
    };
    SelectComponent.prototype.openPanel = function () {
        this.autocomplete.changePanelState(true);
    };
    SelectComponent.prototype.focusOutEmit = function (event) {
        var _a = (event || {}).relatedTarget, relatedTarget = _a === void 0 ? {} : _a;
        var _b = (relatedTarget || {}).nodeName, nodeName = _b === void 0 ? '' : _b;
        if (nodeName != 'MAT-OPTION') {
            this.autocompleteControl.setValue('');
        }
    };
    SelectComponent.prototype.optionSelected = function (_a) {
        var value = _a.option.value;
        this.value = value;
        this.selectedOptionLabel = this.bindLabelFunction(value);
        this.autocompleteControl.setValue('');
    };
    Object.defineProperty(SelectComponent.prototype, "invalid", {
        get: function () {
            return this.control ? this.control.invalid : false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Observable)
    ], SelectComponent.prototype, "options$", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "placeholder", void 0);
    __decorate([
        ViewChild('autocomplete', { static: false }),
        __metadata("design:type", AutocompleteInputComponent)
    ], SelectComponent.prototype, "autocomplete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], SelectComponent.prototype, "bindLabelFunction", void 0);
    SelectComponent = __decorate([
        Component({
            selector: 'mts-select',
            templateUrl: './select.component.html',
            styleUrls: ['./select.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [NgControl, OptionFilterService])
    ], SelectComponent);
    return SelectComponent;
}());
export { SelectComponent };
