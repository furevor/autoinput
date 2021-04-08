import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OptionFilterService {
    public getFilteredOptions(
        filterTerm$: Observable<string>,
        options$: Observable<string[]>,
        bindLabelFunction: (value: string) => string,
    ): Observable<string[]> {
        return options$.pipe(
            switchMap(options =>
                filterTerm$.pipe(
                    startWith(''),
                    map(filterTerm =>
                        options.filter(
                            option =>
                                !filterTerm ||
                                bindLabelFunction(option).toLocaleLowerCase().includes(filterTerm.toLocaleLowerCase()),
                        ),
                    ),
                ),
            ),
        );
    }
}
