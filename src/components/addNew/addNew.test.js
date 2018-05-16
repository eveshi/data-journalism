import React from 'react'

import { swallow } from '../../enzyme_configure'
import Adapter from 'enzyme-adapter-react-16'

import AddNew from './addNew'
import AlertBox from '../alertBox/alertBox'

describe('test addNew', () => {
    let wrapper

    beforeEach(() => {
        wrapper = swallow(<AddNew />)
    })

    it('should contain alertBox if not authenticate', () => {
        wrapper.setProps({login:true})
        expect(wrapper.find(<AlertBox />)).toHaveLength(1)
    })

    it('should not contain alertBox if authenticate', () => {
        expect(wrapper.find(<AlertBox />)).toHaveLength(0)
    })
})
