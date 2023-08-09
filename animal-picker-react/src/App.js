import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


var items = [{name: "Bear", description: "A large furry animal. Strong and powerful."}, 
          {name: "Cow", description: "A large animal. Gives milk."}, 
          {name: "Tiger", description: "A deadly animal. Has stripes."}, 
          {name: "Penguin", description: "A silly animal. Waddles. Lives in the cold."}]
function App() {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
   setSubmitting(true);

   setTimeout(() => {
     setSubmitting(false);
   }, 3000)


   fetch("http://127.0.0.1:5000/generateQuestions", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(items),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(() => {
      console.log("Success")
    })
    .catch((err) => {
      console.log(err)
    });
 }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Which Animal are You?</h1>
      </header>
      <div className="wrapper">
        <h1>How About Them Apples</h1>
        {submitting &&
        <div>Submtting Form...</div>
      }
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Thing</p>
              <input name="thing" value="animal"/>
            </label>
            {items.map(item => <div><p>{item["name"]}</p> <input label={item["name"]} value={item["description"]}></input></div>)} 
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    
    
  );
}

export default App;
