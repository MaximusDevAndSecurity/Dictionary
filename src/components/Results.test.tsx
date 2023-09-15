import { render } from '@testing-library/react';
import Results from './Results';

// A test to show if Result component is working correctly if passed props
describe('Results component', () => {
  test('renders Results component with data', () => {
    const mockData = {
      word: 'test',
      definitions: [
        {
          definition: 'a procedure intended to establish the quality, performance, or reliability of something',
          example: 'students often take a practice test'
        }
      ],
      synonyms: ['hello', 'trial'],
      audioURL: 'http://example.com/test.mp3',
      error: null
    };

    const { getByText } = render(<Results {...mockData} />);

    // Check for the word "test" in the h2 element specifically.
    const wordElement = getByText('test');
    expect(wordElement.tagName).toBe('H2');
    expect(wordElement).toBeInTheDocument();

    // Check for the definition
    expect(getByText(/a procedure intended to establish the quality, performance, or reliability of something/i)).toBeInTheDocument();

    // Check for synonyms
    expect(getByText(/hello/i)).toBeInTheDocument();
    expect(getByText(/trial/i)).toBeInTheDocument();

    // Check for example usage
    expect(getByText(/students often take a practice test/i)).toBeInTheDocument();

  });
});
