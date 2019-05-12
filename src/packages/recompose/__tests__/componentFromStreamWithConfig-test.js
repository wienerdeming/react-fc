import React from 'react'
import { mount } from 'enzyme'
import { Observable } from 'rxjs'
import rxjsConfig from '../rxjsObservableConfig'
import { componentFromStreamWithConfig } from '../componentFromStream'

test('componentFromStreamWithConfig creates a stream with the correct stream type.', () => {
  const RXJSComponent = componentFromStreamWithConfig(rxjsConfig)(props$ => {
    expect(props$ instanceof Observable).toBe(true)
    return props$.map(v =>
      <div>
        {String(v)}
      </div>
    )
  })

  mount(<RXJSComponent />)
})
