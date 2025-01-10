import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Press me" />);
    expect(getByText('Press me')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Press me" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Press me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders in disabled state correctly', () => {
    const { getByText } = render(
      <Button title="Press me" disabled={true} />
    );
    
    const buttonElement = getByText('Press me');
    expect(buttonElement.props.style).toHaveProperty('opacity', 0.5);
  });
}); x