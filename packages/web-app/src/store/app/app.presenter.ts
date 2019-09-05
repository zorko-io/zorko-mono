export  class AppPresenter {
  static getAuth (state: Map<string, any>) {
    return state.get('auth');
  }
}
