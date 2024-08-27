import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginPage } from '../src/pages/LoginPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../src/utils/authContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

const mockLoginApiConnect = jest.fn();

const navigation = { navigate: jest.fn() };

test('should log in successfully and navigate to home screen', async () => {
  const { getByPlaceholderText, getByText } = render(
    <AuthContext.Provider value={{ loginApiConnect: mockLoginApiConnect }}>
      <LoginPage navigation={navigation} />
    </AuthContext.Provider>
  );

  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Sign in');

  fireEvent.changeText(emailInput, 'test@example.com');
  fireEvent.changeText(passwordInput, 'password');
  fireEvent.press(loginButton);

  await waitFor(() => {
    expect(mockLoginApiConnect).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'access_token',
      expect.any(String)
    );
    expect(navigation.navigate).toHaveBeenCalledWith('Home');
  });
});
