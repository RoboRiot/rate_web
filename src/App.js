import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import  firebase from './firebase'

// import firebase from 'firebase/app';
// import 'firebase/storage';

function App() {
  // var storage = require('@google-cloud/storage')
  var storage = firebase.storage()
  var ctr = 1

  // var storeRef = storage.ref('abbistar/abbistar_1.jpg')
  storage.ref('abbistar').listAll().then(function(result) {
    result.items.forEach(function(imageRef){
      
      imageRef.getMetadata().then(function(result) {
        // console.log(result["contentType"])

        if(result["contentType"] == "application/json"){
          displayJson(imageRef)
        }
        else{
          displayImage(imageRef)
        }
      })


      // displayImage(imageRef)
    })
  })

  function displayJson(jsonRef){
    jsonRef.getDownloadURL().then((url) => {
      
      $.get(url, function(response) {
        console.log(response)
      })
      
    })
  }

  function displayImage(imageRef){
    imageRef.getDownloadURL().then((url) => {
      document.getElementById(ctr).src=url
      ctr = ctr + 1
    })
  }

  return (
    <div className="App">
      <img id='1' height="500" width="400"></img>
      <img id='2' height="500" width="400"></img>
      <a id = '3'></a>
      
    </div>
  );
}

export default App;
