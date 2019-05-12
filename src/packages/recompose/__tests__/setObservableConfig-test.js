import React from 'react'
import { mount } from 'enzyme'
import { map } from 'rxjs/operators'
import rxConfig from '../rxjsObservableConfig'
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
  setObservableConfig(rxConfig)
  testTransform(props$ =>
    props$.pipe(
      map(({ n }) =>
        <div>
          {n * 2}
        </div>
      )
    )
  )
})
