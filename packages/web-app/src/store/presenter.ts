

export interface Presenter<S> {
    toJS(): S
    toImmutable(): any
}
