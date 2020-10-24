import React, { createElement } from 'react';
// import { ReactDOM, domrender }from 'react-dom';
import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import  "@testing-library/jest-dom/extend-expect";
import App from './App';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FIlterButton';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders without crashing', ()=>{
//     const div = createElement('div');
//     ReactDOM.render(<App />, div)
// })

afterEach(cleanup);
  
  describe('the todo list', () => {
  
    it('should be a button that says edit', () => {
        const { getByTestId } = render(<Todo />); 
        expect(getByTestId('edit-button')).toHaveTextContent(/Edit/i);  
       });


    it('has edit input once edit button is clicked', () => {
        const { queryByTestId, getByTestId } = render(<Todo />); 
        fireEvent.click(getByTestId('edit-button'))
        expect(queryByTestId(/edit-input/i)).toBeTruthy();
    });

    it("form has proper label", () => {
        // const sampleTask = (name) => {
        //     return name;
        // }
        // const { getByTestId } = render(<Form addTask={sampleTask}/>)
        // fireEvent.change(getByTestId('form-input'),  { target: { value: 'new' } } );
        // fireEvent.click(getByTestId("form-submit"))
        // expect(getByTestId('form-input')).toHaveTextContent("new")
        const {getByTestId} = render(<Form/>)
        expect(getByTestId('form-label')).toHaveTextContent('What needs to be done?')
    })

    it("app snapshot", () => {
        const component = renderer.create(<FilterButton />)
        const tree = component.toJSON;
        expect(tree).toMatchSnapshot();
    })
  });
