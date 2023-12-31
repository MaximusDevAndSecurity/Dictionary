import SearchBar from './components/SearchBar';
import Results from './components/Results';
import { useState } from 'react';
import './App.css'

function App() {
    // States.
  const [word, setWord] = useState<string | null>(null);
  const [definitions, setDefinitions] = useState<Array<{ definition: string, example: string | null }>>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [phonetics, setPhonetics] = useState<Array<{ audio: string, text: string }>>([]);

   // indicate if data is being fetched.
  const [loading, setLoading] = useState<boolean>(false);
  
    // check if a search has been attempted
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  // display potential errors from the search.
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setError("Please enter a word.");
      return;
    }
    setWord(term); 
    setLoading(true);  // Start loading
    setSearchAttempted(true);

    try {
      // API request to get the word details
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
      
      // If the response is not successful (like a 404), throw an error.
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data && data.length > 0) {
        let extractedDefinitions: Array<{ definition: string, example: string | null }> = [];
        let extractedSynonyms: string[] = [];
        let extractedPhonetics: Array<{ audio: string, text: string }> = data[0]?.phonetics.map((phonetic: any) => ({
          audio: phonetic.audio || '',
          text: phonetic.text || ''
        })) || [];

        setPhonetics(extractedPhonetics);

   // get details from the fetched data.
        for (let entry of data) {
          for (let meaning of entry.meanings) {
            for (let def of meaning.definitions) {
              extractedDefinitions.push({
                definition: def.definition,
                example: def.example || null
              });
            }
            extractedSynonyms.push(...meaning.synonyms);
          }
        }
        setError(null)
        setDefinitions(extractedDefinitions);
        setSynonyms(extractedSynonyms);
      } 
    } catch (error) {
      //if a user searches for a word, the api will throw error, so if we catch error from the api request we setError
      setError(`"${term}" is not a valid word or there was a network error.`);
    } finally {
      // Stop the loading after fetching data regardless of success or failure.
      setLoading(false);
    }
  };


  return (
    <div className="app-container">
    <h1>Dictionary</h1>
    <SearchBar onSearch={handleSearch} />
    {error && <p className="error-message">{error}</p>}
    {loading ? (
      <p>Loading...</p>
    ) : searchAttempted ? ( 
      // Render the Results component if a search has been attempted.
      <Results 
          word={word} 
          definitions={definitions} 
          synonyms={synonyms} 
          error={error}
          phonetics={phonetics}
      />
    ) : null}
  </div>
  );
}

export default App;
