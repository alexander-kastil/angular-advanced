- `@angular/core/rxjs-interop` provides useful utilities to integrate Angular Signals with RxJS Observables

    - toSignal<T>(observable: Observable<T>, {initialValue}): Signal<T>
    - toObservable<T>

- Keep in mind that the `toSignal()` function creates a signal that is not writable. If you need a writable signal, use an effect or subscribe to the observable directly.