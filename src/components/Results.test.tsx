import { render } from '@testing-library/react';
import Results from './Results';

describe('Results component', () => {
  test('renders Results component with data and checks audio elements', () => {
    const mockData = {
      word: 'test',
      definitions: [
        {
          definition: 'a procedure intended to establish the quality, performance, or reliability of something',
          example: 'students often take a practice test'
        }
      ],
      synonyms: ['hello', 'trial'],
      error: null,
      phonetics: [
        { audio: 'http://example.com/test1.mp3', text: 'Example Text 1' },
        { audio: 'http://example.com/test2.mp3', text: 'Example Text 2' }
      ]
    };

    const { getByText, container } = render(<Results {...mockData} />);
    
    // Check for the word "test" in the h2 element specifically.
    const wordElement = getByText('Word: test');
    expect(wordElement.tagName).toBe('H2');
    expect(wordElement).toBeInTheDocument();

    // Check for the definition
    expect(getByText(/a procedure intended to establish the quality, performance, or reliability of something/i)).toBeInTheDocument();

    // Check for synonyms
    expect(getByText(/hello/i)).toBeInTheDocument();
    expect(getByText(/trial/i)).toBeInTheDocument();

    // Check for example usage
    expect(getByText(/students often take a practice test/i)).toBeInTheDocument();
    
    // Check if audio elements are in the document and have the right src.
    const audioElements = container.querySelectorAll('audio');
    expect(audioElements.length).toBe(2); // Check if there are two audio elements
    audioElements.forEach((audioElement, index) => {
      expect(audioElement).toHaveAttribute('src', mockData.phonetics[index].audio);
    });
  });
});
