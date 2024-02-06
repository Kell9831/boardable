import * as React from 'react';

function App() {
  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    fetch("http://localhost:5500/")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);
  
  return (
    <div>
      <h1>Test de hola mundo</h1>
      <pre>{JSON.stringify(message, null, 2)}</pre>
    </div>
  );
}

export default App;
