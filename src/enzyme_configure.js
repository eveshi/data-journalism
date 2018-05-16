import Enzyme from 'enzyme'
import Adaptar from 'enzyme-adapter-react-16'

Enzyme.configure({
    adaptar: new Adaptar()
})

export default Enzyme