import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('App component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders App component with main elements', () => {
    render(<App />);
    expect(screen.getByText('Dictionary')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for a word...')).toBeInTheDocument();
  });

  test('shows loading state when searching', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Search for a word...'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    const loadingElement = await screen.findByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  test('shows error for network issue', async () => {
    render(<App />);
    await act(async () => { 
      fireEvent.change(screen.getByPlaceholderText('Search for a word...'), { target: { value: 'invalidWord' } });
      fireEvent.click(screen.getByText('Search'));
    });
    await waitFor(() => screen.getByText('"invalidWord" is not a valid word or there was a network error.'));
  });
  
  test('shows error message when search term is empty', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Search'));
    expect(await screen.findByText('Please enter a word.')).toBeInTheDocument();
  });
  
  test('renders error state in App component when searching an invalid word', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Search for a word...'), { target: { value: 'invalidWord' } });
    fireEvent.click(screen.getByText('Search'));
    expect(await screen.findByText('"invalidWord" is not a valid word or there was a network error.')).toBeInTheDocument();
  });
});

