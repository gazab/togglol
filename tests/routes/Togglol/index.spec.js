import CounterRoute from 'routes/Togglol'

describe('(Route) Togglol', () => {
  let _route

  beforeEach(() => {
    _route = CounterRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path ``', () => {
    expect(_route.path).to.equal('')
  })

})
