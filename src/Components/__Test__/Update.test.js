import React from 'react';
import {render,fireEvent, cleanup} from '@testing-library/react'; 
import renderer from 'react-test-renderer'
import Update from '../Update';

afterEach(cleanup);

it("renders correctly",()=>{
    const {queryByTestId} = render(<Update />)
    expect(queryByTestId("update form")).toBeTruthy();
})

describe("Updated Event name",() => {
    it("updates on change",() => {
        const {queryByTestId} = render(<Update />)
        const textField = queryByTestId("Update event name");
        fireEvent.change(textField,{target:{value:"test"}})
        expect(textField.value).toBe("test")
    })
})

describe("Updated Start Date",() => {
    it("updates on change",() => {
        const {queryByTestId} = render(<Update />)
        const textField = queryByTestId("Update start date");
        fireEvent.change(textField,{target:{value:"test"}})
        expect(textField.value).toBe("test")
    })
})

it("Update Form Matches Snapshot",()=>{
    const tree = renderer.create(<Update/>).toJSON();
    expect(tree).toMatchSnapshot();
}) 