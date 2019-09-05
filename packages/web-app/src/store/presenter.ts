export interface Presenter<S, I> {
    runMutations(): this
    toJS(): S
    toImmutable(): I
}
