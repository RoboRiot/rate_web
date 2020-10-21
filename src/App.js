import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import  firebase from './firebase';
// import Slider from '@material-ui/core/Slider';

function App() {
  const info = document.createElement("p")
  var models = {}

  // var storage = require('@google-cloud/storage')
  var storage = firebase.storage()
  var ctr = 1

  var cur_name = ""
  // console.log("hm?")
  // readDB()
  selectUser()

  function writeDB(){
    
    firebase.database().ref('models/'+username).set(models)
   
  }

  function readDB(){
    console.log("username: " + username)
    var compare = firebase.database().ref('models/'+username)
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
      

      info.innerHTML = "Weight: " + cur_file["Weight"] + "&nbsp; Height: " + cur_file["Height"] + "<br>" + "Hips: " + cur_file["Hips"] + "&nbsp; Waist: " + cur_file["Waist"] + "&nbsp; Chest: " + cur_file["Chest"] + "<br>"
      
      document.body.appendChild(info)
      
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
        readJSONDB()
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

  function selectUser(){
    const title = document.createElement("p")
    const io = document.createElement("input")
    const btn = document.createElement("button")

    title.innerHTML = "Enter username: "
    title.id = "t_username"

    io.id="i_username"

    btn.addEventListener("click", selected); 
    btn.innerHTML="Enter"
    btn.id="b_username"

    document.body.appendChild(title)
    document.body.appendChild(io)
    document.body.appendChild(btn)
  }

  function selected(){
    console.log("entered: " + document.getElementById("i_username").value)
    username = document.getElementById("i_username").value

    document.getElementById("t_username").remove()
    document.getElementById("i_username").remove()
    document.getElementById("b_username").remove()

    const title = document.createElement("p")
    const io = document.createElement("input")
    const btn = document.createElement("button")

    title.innerHTML = "Enter Rating [1-3]: "
    title.id = "t_rating"

    io.id="quantity"
    io.type="number"
    io.min="1"
    io.max="3"

    btn.addEventListener("click", final); 
    btn.innerHTML="Continue"
    btn.id="b_rating"

    document.body.appendChild(title)
    document.body.appendChild(io)
    document.body.appendChild(btn)
    document.body.appendChild(info)
    
    readDB()
  }

  var username = ""

  return (
    <div className="App" >
      {/* <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" /> */}
      {/* <p>Enter Rating: [1-3]</p>
      <input type="number" id="quantity" name="quantity" min="1" max="5"></input>
      <p><span id="demo"></span></p>
      <button onClick={final}>Continue</button> */}
      
    </div>
  );
}

export default App;
