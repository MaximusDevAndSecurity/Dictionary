import React from 'react';
import './Results.css'

type DefinitionType = {
  definition: string;
  example: string | null;
};

// The expected properties that the Results component should receive.
interface Props {
  word: string | null;
  definitions: DefinitionType[];
  synonyms: string[];
  error: string | null;
  phonetics: Array<{ audio: string, text: string }>;
}


const Results: React.FC<Props> = ({ word, definitions, synonyms, error,phonetics }) => {
  // Check if there's an error and display it.
  if (error) {
    return <p className="error-message"></p>;
  }
  else 
  {
     return (
    <div>
      <h2>Word: {word}</h2>
   <div>
   {phonetics.length > 0 && (
     <div>
       {phonetics.map((phonetic, index) => (
         <div key={index}>
          <p><strong>Phonetics:</strong> {phonetic.text}</p>
           <audio controls src={phonetic.audio}></audio>
         </div>
       ))}
     </div>
   )}
 </div>
      <h3>Definitions:</h3>
      <ul>
        {definitions.map((def, index) => (
          <li key={index}>
            {def.definition}
            {def.example && <p><i>Example: {def.example}</i></p>}
          </li>
        ))}
      </ul>
      {synonyms.length > 0 && (
        <>
          <h3>Synonyms:</h3>
          <ul>
            {synonyms.map((syn, index) => (
              <li key={index}>{syn}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

}
export default Results;