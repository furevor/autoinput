var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { InputComponent } from '../input/input.component';
var AutocompleteInputComponent = /** @class */ (function () {
    function AutocompleteInputComponent(control, cdr) {
        this.control = control;
        this.cdr = cdr;
        this.inputFocus = new EventEmitter();
        this.inputFocusOut = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.autocompletePosition = 'auto';
        this.bindLabelFunction = function (value) {
            return value;
        };
        this.control.valueAccessor = this;
    }
    AutocompleteInputComponent.prototype.ngAfterViewInit = function () {
        var autocompletePosition = this.autocompletePosition;
        this.mtsInput.trigger.position = autocompletePosition;
    };
    Object.defineProperty(AutocompleteInputComponent.prototype, "value", {
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
    AutocompleteInputComponent.prototype.writeValue = function (value) {
        this._value = value;
        this.cdr.markForCheck();
    };
    AutocompleteInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    AutocompleteInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    AutocompleteInputComponent.prototype.scrollToCurrentItem = function (event) {
        var activeOption = this.mtsInput.trigger.activeOption;
        var scrollBarElement = this.scrollBar.nativeElement;
        var optionsQuantity = this.autoComplete.options.length;
        if (activeOption) {
            var activeOptionElement = activeOption._getHostElement();
            var activeOptionElementRect = activeOptionElement.getBoundingClientRect();
            var scrollBarRect = scrollBarElement.getBoundingClientRect();
            var currentItemBottom = activeOptionElementRect.bottom;
            var currentItemTop = activeOptionElementRect.top;
            var scrollBarBottom = scrollBarRect.bottom;
            var scrollBarTop = scrollBarRect.top;
            var maxViewedOptions = scrollBarElement.offsetHeight / activeOptionElement.offsetHeight;
            switch (event.code) {
                case 'ArrowDown':
                    if (currentItemBottom > scrollBarBottom) {
                        this.scrollBar.scrollTo({
                            top: activeOptionElement.offsetTop -
                                activeOptionElement.offsetHeight * (maxViewedOptions - 1),
                        });
                    }
                    else if (activeOption && activeOptionElement.offsetTop === 0) {
                        this.scrollBar.scrollTo({ top: activeOptionElement.offsetTop });
                    }
                    break;
                case 'ArrowUp':
                    if (currentItemTop <= scrollBarTop) {
                        this.scrollBar.scrollTo({ top: activeOptionElement.offsetTop });
                    }
                    else if (activeOption &&
                        activeOptionElement.offsetTop === activeOptionElement.offsetHeight * (optionsQuantity - 1)) {
                        this.scrollBar.scrollTo({ top: activeOptionElement.offsetTop });
                    }
                    break;
                default:
                    break;
            }
        }
    };
    AutocompleteInputComponent.prototype.changePanelState = function (open) {
        if (this.mtsInput.trigger) {
            open ? this.mtsInput.trigger.openPanel() : this.mtsInput.trigger.closePanel();
        }
    };
    AutocompleteInputComponent.prototype.inputFocusEmit = function (event) {
        this.focused = true;
        this.inputFocus.emit(event);
    };
    AutocompleteInputComponent.prototype.optionSelectedEmit = function (event) {
        this.optionSelected.emit(event);
    };
    AutocompleteInputComponent.prototype.inputFocusOutEmit = function (event) {
        this.focused = false;
        this.inputFocusOut.emit(event);
        var _a = (event || {}).relatedTarget, relatedTarget = _a === void 0 ? {} : _a;
        var _b = (relatedTarget || {}).nodeName, nodeName = _b === void 0 ? '' : _b;
        if (nodeName != 'MAT-OPTION') {
            this.changePanelState(false);
        }
    };
    AutocompleteInputComponent.prototype.focus = function () {
        this.mtsInput.focus();
    };
    AutocompleteInputComponent.prototype.panelOpened = function () {
        this.mtsInput.panelOpened();
    };
    AutocompleteInputComponent.prototype.panelClosed = function () {
        this.mtsInput.panelClosed();
    };
    Object.defineProperty(AutocompleteInputComponent.prototype, "invalid", {
        get: function () {
            return this.control ? this.control.invalid || this.invalidInput : false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AutocompleteInputComponent.prototype, "inputFocus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AutocompleteInputComponent.prototype, "inputFocusOut", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AutocompleteInputComponent.prototype, "optionSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutocompleteInputComponent.prototype, "autocompletePosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AutocompleteInputComponent.prototype, "maxTermLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutocompleteInputComponent.prototype, "inputType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutocompleteInputComponent.prototype, "cleanable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutocompleteInputComponent.prototype, "autoActiveFirstOption", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Observable)
    ], AutocompleteInputComponent.prototype, "options$", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutocompleteInputComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutocompleteInputComponent.prototype, "autocompleteDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutocompleteInputComponent.prototype, "manualPanelControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutocompleteInputComponent.prototype, "invalidInput", void 0);
    __decorate([
        ViewChild('scrollBar', { static: false }),
        __metadata("design:type", NgScrollbar)
    ], AutocompleteInputComponent.prototype, "scrollBar", void 0);
    __decorate([
        ViewChild('mtsInput', { static: false }),
        __metadata("design:type", InputComponent)
    ], AutocompleteInputComponent.prototype, "mtsInput", void 0);
    __decorate([
        ViewChild('autoComplete', { static: false }),
        __metadata("design:type", MatAutocomplete)
    ], AutocompleteInputComponent.prototype, "autoComplete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutocompleteInputComponent.prototype, "bindLabelFunction", void 0);
    AutocompleteInputComponent = __decorate([
        Component({
            selector: 'mts-autocomplete-input',
            templateUrl: './autocomplete-input.component.html',
            styleUrls: ['./autocomplete-input.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [NgControl, ChangeDetectorRef])
    ], AutocompleteInputComponent);
    return AutocompleteInputComponent;
}());
export { AutocompleteInputComponent };
