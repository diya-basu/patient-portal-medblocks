import React, { useState } from 'react';
import db from './db';

export default function SQLQuery() {
  const [query, setQuery] = useState('SELECT * FROM patients;');
  const [results, setResults] = useState(null);

  const executeQuery = async () => {
    try {
      const res = await db.query(query);
      setResults(res.rows || res);
    } catch (err) {
      setResults([{ error: err.message }]);
    }
  };

  return (
    <div>
      <h4 style={{ width: '100%', textAlign: 'left', alignSelf: 'flex-start', marginBottom: '1rem' }}>
        Run SQL Query
      </h4>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Enter your SQL Query"
      />
      <br /><br />
      <button className="execute-button" onClick={executeQuery}>
        Execute
      </button>

      <div className="output-box">
        {results === null ? (
          <p style={{ fontSize: '0.75rem', textAlign: 'center' }}><b>Output will be displayed here</b></p>
        ) : (
          <pre>
            {JSON.stringify(results, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
