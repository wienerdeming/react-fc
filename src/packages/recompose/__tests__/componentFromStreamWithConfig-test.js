import React from 'react'
import { mount } from 'enzyme'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import rxjsConfig from '../rxjsObservableConfig'
import { componentFromStreamWithConfig } from '../componentFromStream'

test('componentFromStreamWithConfig creates a stream with the correct stream type.', () => {
  const RXJSComponent = componentFromStreamWithConfig(rxjsConfig)(props$ => {
    expect(props$ instanceof Observable).toBe(true)
    return props$.pipe(
      map(v =>
        <div>
          {String(v)}
        </div>
      )
    )
  })

  mount(<RXJSComponent />)
})
