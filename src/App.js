import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import  firebase from './firebase';
// import Slider from '@material-ui/core/Slider';

function App() {
 
  var models = {}

  // var storage = require('@google-cloud/storage')
  var storage = firebase.storage()
  var ctr = 1

  var cur_name = ""
  // console.log("hm?")
  readDB()
  

  function writeDB(){
    
    firebase.database().ref('models').set(models)
   
  }

  function readDB(){
    var compare = firebase.database().ref('models')
    compare.on('value', function(snapshot) {
      // console.log(snapshot.val()["Alejandro-Barreto"]);
      models = snapshot.val()
      // console.log(models)
      init()
    });
  }

  function readJSONDB(){
    var compare = firebase.database().ref('list')
    compare.on('value', function(snapshot) {
      // console.log(snapshot.val()["Alejandro-Barreto"]);
      var cur_file = snapshot.val()[cur_name]
      const newImg = document.createElement("json")
      newImg.height = "500"
      newImg.width = "500"
      newImg.innerHTML = JSON.stringify(cur_file)
      // console.log(document.getElementById(ctr))
      console.log(cur_file)
      document.body.appendChild(newImg)
      ctr = ctr + 1
      // console.log(models)
      
    });
  }

  function init() {
    if(models == null)
      models = {}

    var name_list = Object.keys(models)
    console.log(models)
    // console.log( name_list )
    

    // var storeRef = storage.ref('abbistar/abbistar_1.jpg')
    storage.ref('/').listAll().then(function (result) {
      // console.log(result["prefixes"][0]["location"]["path"])

      for (var i = 0; i < result["prefixes"].length; i++) {
        cur_name = result["prefixes"][i]["location"]["path"]

        if (name_list.includes(cur_name) == false) {
          console.log("success")
          loadImages(cur_name)
          break
        }
      }
    })
  }

  function loadImages(dir_name) {
    console.log("check")
    
    // var storeRef = storage.ref('abbistar/abbistar_1.jpg')
    storage.ref(dir_name).listAll().then(function (result) {
      
      result.items.forEach(function (imageRef) {
        // console.log(imageRef)
        imageRef.getMetadata().then(function (result) {
          // console.log(result["contentType"])

          if (result["contentType"] == "application/json") {
            displayJson(imageRef)
          }
          else {
            displayImage(imageRef)
          }
        })

        // displayImage(imageRef)
      })
      // readJSONDB()
    })
  }

  function displayJson(jsonRef){
    readJSONDB()
  }

  function displayImage(imageRef){
    

    imageRef.getDownloadURL().then((url) => {
      
      const newImg = document.createElement("img")
      newImg.style.height = "300"
      newImg.style.width = "100vw"
      newImg.src=url
      newImg.id = ctr
      // console.log(document.getElementById(ctr))
      // console.log(ctr)
      document.body.appendChild(newImg)
      ctr = ctr + 1
    })

    
  }

  // function handleChange  (event, newValue) {
  //   setValue(newValue);
  //   document.getElementById("demo").innerHTML = "Value: " + newValue + "%"
  // };

  // const [value, setValue] = React.useState(30);
  // const value = 50
  // const setValue = React.useState(30);

  function final() {
    models[cur_name] = parseInt(document.getElementById("quantity").value)

    for(var i = ctr - 1; i >= 1; i --){
      // console.log(document.getElementById(i))
      // console.log(i)
      document.getElementById(i).remove()
      
    }
    ctr = 1
    writeDB()
    init()
  }

  return (
    <div className="App" >
      {/* <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" /> */}
      <input type="number" id="quantity" name="quantity" min="1" max="5"></input>
      <p><span id="demo"></span></p>
      <button onClick={final}>Continue</button>
      
    </div>
  );
}

export default App;
