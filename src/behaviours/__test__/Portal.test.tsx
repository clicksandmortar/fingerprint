describe('MyComponent', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  })

  afterEach(() => {
    ReactDOM.createPortal.mockClear()
  })

  it('should render correctly', () => {
    const component = jest.renderer.create(
      <MyComponent>Hello World!</MyComponent>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
