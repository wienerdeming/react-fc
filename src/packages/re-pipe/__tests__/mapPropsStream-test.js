import React from 'react'
import { mount } from 'enzyme'
import { map } from 'rxjs/operators'
import setObservableConfig from '../setObservableConfig'
import rxjsConfig from '../rxjsObservableConfig'
import { mapPropsStream } from '../'

setObservableConfig(rxjsConfig)

// Most of mapPropsStream's functionality is covered by componentFromStream
test('mapPropsStream creates a higher-order component from a stream', () => {
  const Double = mapPropsStream(props$ =>
    props$.pipe(map(({ n }) => ({ children: n * 2 })))
  )('div')
  const wrapper = mount(<Double n={112} />)
  const div = wrapper.find('div')
  expect(div.text()).toBe('224')
  wrapper.setProps({ n: 358 })
  expect(div.text()).toBe('716')
})
