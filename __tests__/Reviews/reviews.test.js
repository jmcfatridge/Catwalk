import React from 'react';
import Modal from 'react-modal';
import 'regenerator-runtime/runtime'
import { WidgetProvider } from '../../client/src/components/WidgetContext.jsx';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Reviews from '../../client/src/components/Reviews/Reviews.jsx';
import App from '../../__testFiles/AppReviews.jsx';


describe('Reviews', () => {
  test('renders Reviews component', async () => {
    global.fetch = jest.fn(() => Promise.resolve());
    render(<App />);
    await waitFor(() => {expect(screen.queryByTestId('not-rendered')).toBeNull()})

    userEvent.click(screen.getByText('Ratings & Reviews'))
    userEvent.click(screen.getByTestId('reviews'))
    // screen.debug();
  });

  test('adds new review', async () => {

    const fakePost = {
      star: 'dyn-star-2',
      recommend: 'recommend-no',
      fit: 'Runs slightly tight',
      length: 'Runs slightly short',
      comfort: 'Comfortable',
      quality: 'Pretty great',
      body: 'This is a test review body. This is a test review body.',
      name: 'testName',
      email: 'test@test.test',
      photo: 'https://photolemur.com/uploads/blog/unnamed.jpg'
    }
    global.fetch = jest.fn(() => Promise.resolve());
    render(<App />);
    await waitFor(() => {expect(screen.queryByTestId('not-rendered')).toBeNull()})

    userEvent.click(screen.getByText('ADD A REVIEW +'))
    expect(screen.queryByText('‼ Please enter the following fields:')).toBeNull()
    userEvent.click(screen.getByText('submit'))
    expect(screen.queryByText('‼ Please enter the following fields:')).not.toBeNull()

    userEvent.click(screen.getByTestId(fakePost.star))
    userEvent.click(screen.getByTestId(fakePost.recommend))

    // screen.debug(null, 100000)

    userEvent.click(screen.getByLabelText(fakePost.fit))
    userEvent.click(screen.getByLabelText(fakePost.length))
    userEvent.click(screen.getByLabelText(fakePost.comfort))
    userEvent.click(screen.getByLabelText(fakePost.quality))

    const input0 = screen.getByLabelText('Review body')
    fireEvent.change(input0, { target: { value: fakePost.body } })

    const input1 = screen.getByPlaceholderText('Example: jackson11!')
    fireEvent.change(input1, { target: { value: fakePost.name } })

    const input2 = screen.getByPlaceholderText('Example: jackson11@email.com')
    fireEvent.change(input2, { target: { value: fakePost.email } })

    const input3 = screen.getByTestId('review-add-photo-input')
    fireEvent.change(input3), { target: {value: fakePost.photo}}
    // userEvent.click(screen.getByText('add'))
    // expect(screen.queryByText(fakePost.photo)).not.toBeNull()

    expect(input0.value).toBe('This is a test review body. This is a test review body.')
    expect(input1.value).toBe('testName')
    expect(input2.value).toBe('test@test.test')

    userEvent.click(screen.getByText('submit'))
    // expect(screen.queryByText('‼ Please enter the following fields:')).toBeNull()
    // screen.debug(null, 100000)
  })
});