import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const url_ApiKey = 'http://localhost:5000/';
  const [value, setValue] = React.useState([]);
  const [element, setElement] = React.useState({
    title: "",
    content: ""
  });
  // connecting to an API
   React.useEffect(function effectFunction(){
     fetch(url_ApiKey)
     .then(response => response.json())
     .then((data) => {
        setValue(data);
     })
     .catch(rej=>{
       console.log(rej)
     })
   }, [])
   // end of connection
  // to Create a new Note
  function CreateNote(myValue, index) {
    return (
      <Note
        Id={index}
        key={index}
        title={myValue.title}
        content={myValue.content}
        deleteItem={DeleteNote}
      />
    );
  }
  // to delete a Note
  function DeleteNote(event) {
    const itemIndex = Number(event.target.value);

  //  Error region
    fetch(url_ApiKey, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name:itemIndex})
    })
    .then(response=> response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    
// error region



    setValue((prevalue) => {
      return prevalue.filter((element, index) => {
        return itemIndex !== index;
      });
    });
  }
  // to add element to the state hook object before adding to the array
  function addElement(event) {
    const { name, value } = event.target;
    setElement((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  }
  // to add note to the state hook Array when submitted
  function submitElement(event) {
    postData();
    event.preventDefault();
  }


// function to post data to express
   function postData(){
    
    fetch(url_ApiKey, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(element)
    })
    .then(response=> response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
   

    setValue((prevalue) => {
      return [...prevalue, element];
    });
    setElement({
      title: "",
      content: ""
    });
   }
// End of function

  return (
    <div>
      <Header />
      <CreateArea submitElement={submitElement} valueChange={addElement} />
      {value.map(CreateNote)}
      <Footer />
    </div>
  );
}

export default App;
