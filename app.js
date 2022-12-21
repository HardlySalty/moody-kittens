let feedCupText = document.getElementById("feedCups")
let feedAmt = .25
let caloriesAmt = 60
let kittens = []
let deadKittens = []
let randID
let day = 1

function addKitten(event) {
  event.preventDefault()
  if(kittens.length >= 8){
    return false
  }

  
  
  let kittenName = document.getElementById("name").value
  let addKittenForm = document.getElementById("addKittenForm")
  let newKittenWeight
  let newKittenCalories
  let randID
  let currentDay = day
  
  let nameCheck = kittens.findIndex(x => x.name === kittenName.charAt(0).toUpperCase() + kittenName.slice(1))
  if(nameCheck != -1){
    return false
  }

  function randWeight(){
    const randNum = Math.floor(Math.random() * 10) + 1
    randID = Math.floor(Math.random() * 1000055000) * 112143 * 1461000
    if(randNum < 5){
      newKittenWeight = 2.5
      newKittenCalories = 180
    }else{
      newKittenWeight = 5
      newKittenCalories = 360
    }
  }
  randWeight()
  
  kittens.push({
    name: kittenName.charAt(0).toUpperCase() + kittenName.slice(1),
    alive: true,
    age: 0,
    birthday: currentDay,
    weight: newKittenWeight,
    mood: 55,
    moodStr: "",
    moodPic: "",
    todaysPets: 0,
    hunger: 100,
    currentCalories: 0,
    caloriesNeeded: newKittenCalories,
    id: randID
  })
  saveKittens()
  addKittenForm.reset()
  drawKittens()
}

function moodToString(kitten){
  switch(true){
    case kitten.alive == false:
      kitten.moodStr = "DEAD"
      break
    case kitten.mood >= 80:
      kitten.moodStr = "Loving"
      break
    case kitten.mood > 60 && kitten.mood < 80: 
      kitten.moodStr = "Happy"
      break
    case kitten.mood <= 60 && kitten.mood >= 50:
      kitten.moodStr = "Okay"
      break
    case kitten.mood < 50 && kitten.mood > 35:
      kitten.moodStr = "Sad"
      break
    case kitten.mood <= 35 && kitten.mood > 15:
      kitten.moodStr = "Depressed"
      break
    case kitten.mood < 15:
      kitten.moodStr = "KILL"
      break
  }
}

function moodToPicture(kitten){
  switch(true){
    case kitten.moodStr == "Loving":
      kitten.moodPic = "loving.jpg"
      break
    case kitten.moodStr == "Happy":
      kitten.moodPic = "happy.jpg"
      break
    case kitten.moodStr == "Okay":
      kitten.moodPic = "nuetral.jpg"
      break
    case kitten.moodStr == "Sad":
      kitten.moodPic = "sad.jpg"
      break
    case kitten.moodStr == "Depressed":
      kitten.moodPic = "deppressed.jpg"
      break
    case kitten.moodStr == "KILL":
      kitten.moodPic = "kill.jpg"
      break
    case kitten.moodStr == "DEAD":
      kitten.moodPic = "dead.jpg"
      break
  }
}

function checkKitten(){
  kittens.forEach(kitten => {
    let yearsOld = Math.floor((day - kitten.birthday) / 10)
    if(kitten.age != yearsOld && kitten.alive == true){
      kitten.age = yearsOld
      if(kitten.age > 3){
        kitten.alive = false
      }
      saveKittens()
    }
    if(kitten.mood <= 10){
      let index = Math.floor(Math.random() * kittens.length)
      kittens[index].alive = false
    }

    drawKittens()
  })
}

function saveKittens() {
  localStorage.setItem("kittens", JSON.stringify(kittens))
  localStorage.setItem("daysPassed", day)
}

function loadKittens() {
  let storedKittens = JSON.parse(localStorage.getItem("kittens"))
  let daysPassed = localStorage.getItem("daysPassed")
  if(storedKittens != null){
    kittens = storedKittens
  }
  day = daysPassed
  drawKittens()
  drawDay()
}

function buryCat(catID){
  index = kittens.findIndex(x => x.id === catID)
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
}

function petCat(catID){
  index = kittens.findIndex(x => x.id === catID)
  kittens[index].todaysPets++
  if(kittens[index].todaysPets > 3){
    kittens[index].mood -= 5
  }else{
    kittens[index].mood += 1
  }
  checkKitten()
}

function resetPets(){
  kittens.forEach(kitten => {
    kitten.todaysPets = 0
  })
}

function feedCat(catID){
  index = kittens.findIndex(x => x.id === catID)
  kittens[index].currentCalories += caloriesAmt
  console.log(kittens[index].currentCalories)
  console.log(kittens[index].mood)
}

function checkCalories(){
  kittens.forEach(kitten => {
    let afterDayCalories = kitten.currentCalories - kitten.caloriesNeeded
    switch(true){
      case(afterDayCalories <= 20 && afterDayCalories >= -20):
          if(kitten.mood <= 100){kitten.mood += 5}
          kitten.currentCalories - kitten.neededCalories
          break
      case(afterDayCalories > 20 && afterDayCalories < 50):
          kitten.mood -= 15
          kitten.currentCalories - kitten.neededCalories
          break
      case(afterDayCalories >= 50 && afterDayCalories < 100):
          kitten.hapmoodpiness -= 20
          kitten.currentCalories - kitten.neededCalories
          break
      case(afterDayCalories >= 100 && afterDayCalories < 150):
          kitten.mood -= 30
          kitten.currentCalories - kitten.neededCalories
          break
      case(afterDayCalories < -20 && afterDayCalories > -50):
          kitten.mood -= 15
          kitten.currentCalories - kitten.neededCalories
          break
      case(afterDayCalories <= -50 && afterDayCalories > -100):
          kitten.mood -= 20
          kitten.currentCalories - kitten.neededCalories
          break
      case(afterDayCalories <= 100 && afterDayCalories > -150):
          kitten.mood -= 30
          kitten.currentCalories - kitten.neededCalories
          break
      case(afterDayCalories > 250 || afterDayCalories < -250):
          kitten.alive = false
          break
      default:
          break
    }
    kitten.currentCalories = afterDayCalories
  })
}

function feedMore(){
  if(feedAmt != 5){
    feedAmt += .25
    caloriesAmt += 60
  }
  drawCupSize()
}

function feedLess(){
  if(feedAmt != .25){
    feedAmt -= .25
    caloriesAmt -= 60
  }
  drawCupSize()
}

function drawCupSize(){
  let smallNum = feedAmt - Math.floor(feedAmt)
  let bigNum = Math.floor(feedAmt)
  let fractionNum = ""
  switch(smallNum >= 0){
    case smallNum == .25:
      fractionNum = "1/4"
      break
    case smallNum == .50:
      fractionNum = "1/2"
      break
    case smallNum == .75:
      fractionNum = "3/4"
      break
    default:
      fractionNum = ""
      break
  }
  if(bigNum < 1){
    bigNum = ""
  }
  feedCupText.innerText = `${bigNum} ${fractionNum} Cup`
}

function drawDay(){
  let dayText = document.getElementById("dayCount")
  dayText.innerText = `Day: ${day}`
}

function nextDay(){
  day++
  saveKittens()
  checkCalories()
  checkKitten()
  resetPets()
  drawDay()
}

function drawKittens() {
  let template = ""

  kittens.forEach(kitten => {
    moodToString(kitten)
    moodToPicture(kitten)
    if(kitten.alive == true){
      template += `
    <div class="unselectable">
      <table class="kitten" style="padding-bottom:50px; padding-left: 60px; padding-top:30px">
        <span>
          <i width="100" height="100" class="kitten"></i>
          <tr align="center" >
            <th colspan="5"><img src="${kitten.moodPic}"></th>
          </tr>
          <tr align="center" >
            <th width="80">Name</th>
            <th width="50">Age</th>
            <th width="85">Weight</th>
            <th width="70">Mood</th>
          </tr>
          <tr align="center">
            <td width="80">${kitten.name}</td>
            <td width="50">${kitten.age}</td>
            <td width="85">${kitten.weight}lbs</td>
            <td width="70">${kitten.moodStr}</td>
          </tr
          <tr>
          <td width="365" colspan="4" style="padding-left: 30.5%;"><button onclick="feedCat(${kitten.id})">Feed</button><i> </i><button onclick="petCat(${kitten.id})" style="width: 62.22px">Pet</button></td>
          </tr>
        </span>
      </table>
    <div>`
    }else{
      template += `
    <div class="unselectable">
      <table class="kitten" style="padding-bottom:50px; padding-left: 60px; padding-top:30px">
        <span>
        <i width="100" height="100" class="kitten"></i>
          <tr align="center" >
            <th colspan="5"><img src="${kitten.moodPic}"></th>
          </tr>
          <tr align="center" >
          <th width="80"></th>
          <th width="80">Name</th>
          <th width="50">Age</th>
          <th width="70">Mood</th>
          </tr>
          <tr align="center">
            <td width="80"></td>
            <td width="80">${kitten.name}</td>
            <td width="50">${kitten.age}</td>
            <td width="70">Peacful</td>
          </tr>
          <tr>
          <td width="365" colspan="5" style="padding-left: 42%;"><button onclick="buryCat(${kitten.id})">bury</button><i></td>
          </tr>
        </span>
      </table>
    <div>`
    }
    
  })

  document.getElementById("gameContainer").innerHTML = template
  saveKittens()
}

function getStarted() {
  document.getElementById("welcome").remove()
  document.getElementById("gameContainer").removeAttribute("hidden")
  console.log('Good Luck, Take it away')
}

loadKittens();

