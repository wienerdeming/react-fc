import shouldUpdate from './shouldUpdate'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import equal from './utils/fastDeepEqual'

const pure = BaseComponent => {
  const hoc = shouldUpdate((props, nextProps) => !equal(props, nextProps))

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'pure'))(
      hoc(BaseComponent)
    )
  }

  return hoc(BaseComponent)
}

export default pure
