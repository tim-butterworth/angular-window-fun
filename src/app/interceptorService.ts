import {
    Injectable
    , NgZone
} from '@angular/core';
import {
    HttpEvent
    , HttpResponse
} from '@angular/common/http';

import {
    Observer
    , Subject
    , BehaviorSubject
    , Observable
} from 'rxjs';

@Injectable()
class InterceptorService {

    private pendingsList: Array<Pending> = []
    private pendingsBehaviorSubject: Subject<Array<Pending>> = new BehaviorSubject([])
    private pendingResponseMap: Map<String, Observer<HttpEvent<any>>> = new Map()

    constructor(private ngZone: NgZone) {
        const reference = this
        window["zoneInvoke"] = (name: String) => {
            debugger;
            reference.resolveInZone({ name })
        }
        window["noZoneInvoke"] = (name: String) => {
            debugger;
            reference.resolveOutOfZone({ name })
        }
    }

    pendings(): Observable<Array<Pending>> {
        return this.pendingsBehaviorSubject.asObservable();
    }

    addNewPending(pending: Pending, subject: Observer<HttpEvent<any>>) {
        this.pendingsList.push(pending);

        this.pendingsBehaviorSubject.next(this.pendingsList);

        this.pendingResponseMap.set(pending.name, subject);
    }

    resolveInZone(pending: Pending) {
        this.ngZone.run(() => {
            this.resolve(pending)
        })
    }

    resolveOutOfZone(pending: Pending) {
        this.resolve(pending)
    }

    resolve(pending: Pending) {
        const subject = this.pendingResponseMap.get(pending.name)

        subject.next(new HttpResponse({ body: { id: pending.name, key: "value" } }))

        const updatedPending = []
        let index = 0
        while (index < this.pendingsList.length) {
            const toFilterPending = this.pendingsList[index]
            if (toFilterPending.name !== pending.name) {
                updatedPending.push(toFilterPending)
            }
            index++
        }

        this.pendingsList = updatedPending
        this.pendingsBehaviorSubject.next(this.pendingsList)
    }
}

class Pending {
    name: String
}

export {
    InterceptorService
    , Pending
}
