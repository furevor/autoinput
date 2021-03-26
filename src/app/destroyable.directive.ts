import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
    selector: '[appDestroy]',
})
export class DestroyableDirective implements OnDestroy {
    protected ngUnsubscribe = new Subject<void>();

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
