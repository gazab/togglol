import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Togglol = require('./containers/TogglolContainer').default
      const reducer = require('./modules/togglol').default

      /*  Add the reducer to the store on key 'toggl'  */
      injectReducer(store, { key: 'togglol', reducer })

      /*  Return getComponent   */
      cb(null, Togglol)

    /* Webpack named bundle   */
    }, 'togglol')
  }
})
