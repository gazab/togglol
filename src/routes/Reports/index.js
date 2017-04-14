import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'reports',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Reports = require('./containers/ReportsContainer').default
      const reducer = require('./modules/reports').default

      /*  Add the reducer to the store on key 'reports'  */
      injectReducer(store, { key: 'reports', reducer })

      /*  Return getComponent   */
      cb(null, Reports)

    /* Webpack named bundle   */
    }, 'reports')
  }
})