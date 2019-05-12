import React from 'react'
import { mount } from 'enzyme'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { mapPropsStreamWithConfig } from '../'
import rxConfig from '../rxjsObservableConfig'

// Most of mapPropsStreamConfig's functionality is covered by componentFromStream
test('mapPropsStreamWithConfig creates a higher-order component from a stream and a observable config', () => {
  const Double = mapPropsStreamWithConfig(rxConfig)(props$ =>
    props$.pipe(map(({ n }) => ({ children: n * 2 })))
  )('div')
  const wrapper = mount(<Double n={112} />)
  const div = wrapper.find('div')
  expect(div.text()).toBe('224')
  wrapper.setProps({ n: 358 })
  expect(div.text()).toBe('716')
})

test('mapPropsStreamWithConfig creates a stream with the correct config', () => {
  const RXJSComponent = mapPropsStreamWithConfig(rxConfig)(props$ => {
    expect(props$ instanceof Observable).toBe(true)
    return props$.pipe(map(v => v))
  })('div')

  mount(<RXJSComponent />)
})
