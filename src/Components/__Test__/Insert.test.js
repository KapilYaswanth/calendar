import React from 'react';
import {render,fireEvent, cleanup} from '@testing-library/react';
import Insert from '../Insert';
import renderer from 'react-test-renderer'


it("renders correctly",()=>{
    const {queryByTestId} = render(<Insert />)
    expect(queryByTestId("insert form")).toBeTruthy();
})


    it("updates on change",() => {
        const {queryByPlaceholderText} = render(<Insert />)
        const textField = queryByPlaceholderText("Event Name");
        fireEvent.change(textField,{target:{value:"test"}})
        expect(textField.value).toBe("test")
    })

    it("updates on change",() => {
        const {queryByPlaceholderText} = render(<Insert />)
        const textField = queryByPlaceholderText("Input Start Date");
        fireEvent.change(textField,{target:{value:"test"}})
        expect(textField.value).toBe("test")
    })

it("Create Insert Form Matches Snapshot",()=>{
    const tree = renderer.create(<Insert/>).toJSON();
    expect(tree).toMatchSnapshot();
})

