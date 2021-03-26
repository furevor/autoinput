import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { DestroyableDirective } from './destroyable.directive';
import { InputComponent } from './input/input.component';

@NgModule({
    declarations: [
        AppComponent,
        MainFormComponent,
        SelectComponent,
        AutocompleteInputComponent,
        DestroyableDirective,
        InputComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
