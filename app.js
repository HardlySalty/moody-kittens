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
  if(daysPassed != null){
    day = daysPassed
  }
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
      <table class="kitten" style="padding-bottom:2vw; padding-left: 5vw; padding-right:4vw; padding-top:1.5vw">
        <span>
          <i width="10vw" height="8vw" class="kitten"></i>
          <tr align="center" >
            <th colspan="5"><img src="${kitten.moodPic}"></th>
          </tr>
          <tr align="center">
            <th width="12vw">Name</th>
            <th width="12vw">Age</th>
            <th width="12vw">Weight</th>
            <th width="12vw">Mood</th>
          </tr>
          <tr align="center">
            <td width="12vw">${kitten.name}</td>
            <td width="12vw">${kitten.age}</td>
            <td width="12vw">${kitten.weight}lbs</td>
            <td width="12vw">${kitten.moodStr}</td>
          </tr
          <tr>
          <td width="50vw" colspan="4" style="padding-left: 3.4vw;"><button style="font-size: .9vw;" onclick="feedCat(${kitten.id})">Feed</button><i> </i><button style="font-size: .9vw;" onclick="petCat(${kitten.id})" style="width: 3vw">Pet</button></td>
          </tr>
        </span>
      </table>
    <div>`
    }else{
      template += `
      <div class="unselectable">
      <table class="kitten" style="padding-bottom:2vw; padding-left: 2vw; padding-top:1vw">
        <span>
          <i width="10vw" height="10vw" class="kitten"></i>
          <tr align="center" >
            <th colspan="5"><img src="${kitten.moodPic}"></th>
          </tr>
          <tr align="center">
            <td width="12vw"></td>
            <th width="12vw">Name</th>
            <th width="12vw">Age</th>
            <td width="12vw"></td>
          </tr>
          <tr align="center">
            <td width="12vw"></td>
            <td width="12vw">${kitten.name}</td>
            <td width="12vw">${kitten.age}</td>
            <td width="12vw"></td>
          </tr
          <tr>
          <td width="50vw" colspan="4" style="padding-left: 6.4vw;"><button onclick="buryCat(${kitten.id})">Bury</button></td>
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
}

loadKittens();

