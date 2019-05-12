import React from 'react'
import { mount } from 'enzyme'
import rxjs5Config from '../rxjsObservableConfig'
import setObservableConfig from '../setObservableConfig'
import componentFromStream from '../componentFromStream'

const testTransform = transform => {
  const Double = componentFromStream(transform)
  const wrapper = mount(<Double n={112} />)
  const div = wrapper.find('div')
  expect(div.text()).toBe('224')
  wrapper.setProps({ n: 358 })
  expect(div.text()).toBe('716')
}

test('works with RxJS 5', () => {
  setObservableConfig(rxjs5Config)
  testTransform(props$ =>
    props$.map(({ n }) =>
      <div>
        {n * 2}
      </div>
    )
  )
})
