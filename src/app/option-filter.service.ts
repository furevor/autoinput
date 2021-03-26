import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Injectable()
export class OptionFilterService {
    public getFilteredOptions(
        filterTerm$: Observable<string>,
        options$: Observable<unknown[]>,
        bindLabelFunction: (value: unknown) => string,
    ): Observable<unknown[]> {
        return options$.pipe(
            switchMap(options =>
                filterTerm$.pipe(
                    // startWith(''),
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
