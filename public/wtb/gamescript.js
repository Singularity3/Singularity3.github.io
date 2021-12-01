var mainScene = document.getElementById("main");
var contractScene = document.getElementById("contracts");
var recipesScene = document.getElementById("recipes");
var eventScene = document.getElementById("event");
var kitchenScene = document.getElementById("kitchen");
var marketingScene = document.getElementById("marketing");
var loanScene = document.getElementById("loans");

var weather = "sunny";
var day = 0;

var resources = [0, 0, 0, 0, 0, 0];
var resourcesChange = [0, 0, 0, 0, 0, 0];
var recipes = [0, 0, 0, 0, 0];
var contracts = [];
var activeContracts = [];
var pizzaCosts = [2, 3, 3, 4, 2];
var excitement = 0;
var deltaExcitement = 0;
var marketExcitement = 0;
var marketingUsed = [false, false];
var penalty = 1;
var totalSlices = 0;
var totalRevenue = 0;
var week = 0;
var loanTimer = 3;
var timeMod = 0;

function startGame() {
    resources = [10, 10, 10, 0, 0, 25];
    recipes = [1, 0, 0, 0, 0];
    excitement = 0.20;
    eventScene.innerHTML = "<h2>Welcome to Benny's</h2><p>It's a bright, sunny morning on P1X-C3.</p><p>You're a newly hired store manager for Benny's, the interplanetary (and newly intergalactic) chain of pizza restaurants. Bennycorp Ltd has decided to expand their pizza empire to cater to other species, and you've been designated the Pizza Ambassador to the Andromeda Galaxy.</p><p>Of course, they failed to tell you this at the interview.</p><p>Your dropship, upon impacting the oddly magenta surface of P1X-C3, unfolds itself into a small restaurant with a diner-style facade, complete with a neon sign. Only the kitchen and sleeping areas are oxygenated; you assume the inhabitants of the planet are not fans of breathable air.</p><button type='button' onclick='changeScene(0)'>It's going to be a long year...</button>";
    newDay();
    changeScene(3);
    buildMainScene();
    document.getElementById("loanButton").style.display = "none";
}

function changeScene(sceneNum){
    mainScene.style.display = "none";
    contractScene.style.display = "none";
    recipesScene.style.display = "none";
    eventScene.style.display = "none";
    kitchenScene.style.display = "none";
    marketingScene.style.display = "none";
    loanScene.style.display = "none";
    switch(sceneNum) {
        case 0:
            buildMainScene();
            mainScene.style.display = "block";
            break;
        case 1:
            buildContractsList(false);
            contractScene.style.display = "block";
            break;
        case 2:
            buildRecipesScene();
            recipesScene.style.display = "block";
            break;
        case 3:
            eventScene.style.display = "block";
            break;
        case 4:
            buildKitchenScene();
            kitchenScene.style.display = "block";
            break;
        case 5:
            buildMarketingScene();
            marketingScene.style.display = "block";
            break;
        case 6:
            buildLoanScene();
            loanScene.style.display = "block";
            break;
    }
}

function genWeather(){
    var rand = Math.random()*10;
    if(rand > 9) {
        return("acid");
    }
    if(rand > 7) {
        return("dust");
    }
    if(rand > 6) {
        return("magnet");
    }
    return("sunny");
}

function buildMainScene() {
    var resourceReport = document.getElementById("resources");
    var dayReport = document.getElementById("day");
    dayReport.innerHTML = "<h2>Day " + day + ".";
    resourceReport.innerHTML = "<h4>Resources</h4>";
    resourceReport.innerHTML += "<p>Dough: " + resources[0] + " tons (" + resourcesChange[0] + " each week)</p>";
    resourceReport.innerHTML += "<p>Cheese: " + resources[1] + " tons (" + resourcesChange[1] + " each week)</p>";
    resourceReport.innerHTML += "<p>Sauce: " + resources[2] + " tons (" + resourcesChange[2] + " each week)</p>";
    resourceReport.innerHTML += "<p>Pepperoni: " + resources[3] + " tons (" + resourcesChange[3] + " each week)</p>";
    resourceReport.innerHTML += "<p>Mushrooms: " + resources[4] + " tons (" + resourcesChange[4] + " each week)</p>";
    resourceReport.innerHTML += "<p>You currently have " + resources[5] + " credit(s) (" + resourcesChange[5] + " each week) <i>(-"+ marketExcitement +"/day from marketing)</i></p>";
    resourceReport.innerHTML += "<br>";
    resourceReport.innerHTML += "<p>Next delivery is in " + (7-((day-1)%7)) + " days.</p>";
    resourceReport.innerHTML += "<p style='border:1px solid black; width: 400px'> </p>";

}

function newDay(){
    day++;
    if(day%7 == 1){
        newWeek();
    }
    if(day%3 == 1){
        buildContractsList(true);
    }
    weather = genWeather();
    var weatherReport = document.getElementById("weather")
    switch(weather){
        case "sunny":
            var temp = String(Math.round(Math.random()*32+111))
            weatherReport.innerHTML = "<h4>Sunny</h4><p>It's a warm, sunny day. Surface temperature is a balmy " + temp + " Fahrenheit.</p><p>You wonder why the weather module still uses Fahrenheit.</p>";
            break;
        case "magnet":
            weatherReport.innerHTML = "<h4>Magnetic Storm</h4><p>Dust motes hang in the air in rippling patterns, and the light fragments to match. The temperature readout is unreadable.</p><p>At least none of your kitchen equipment is ferrous.</p>";
            break;
        case "dust":
            weatherReport.innerHTML = "<h4>Dust Storm</h4><p>Strong winds have whipped the surface into a purple cloud of tiny potassium particles. The temperature is violently fluctuating.</p><p>You hope your filters are all in working order.</p>";
            break;
        case "acid":
            weatherReport.innerHTML = "<h4>Acid Rain</h4><p>Chromic acid falls over the dusty plain, reacting with the potassium in the soil the only way it knows how: violently exploding. The surface soon resembles a mined-out asteroid.</p><p>It's not a great day to go out on the town, even if there was a town to go to.</p>";
            break;
    }
    excitement -= excitement*.1;
    excitement += Math.log2(marketExcitement+1)*.01;
    excitement += deltaExcitement;
    resources[5] -= marketExcitement;
    if(resources[5]<(-25)){
        eventScene.innerHTML = "<h2>In Too Deep</h2><p>You have accrued " + (resources[5]*-1) + " credits of debt. Your restaurant has been repossessed by Bennycorp. Better luck next time!</p>";
        changeScene(3);
    }
    else if(excitement <= 0){
        eventScene.innerHTML = "<h2>Anti-Pizza Crusade</h2><p>The aliens violently reject your human custom of pizza, and burn your restaurant to the ground. Better luck next time!</p>";
        changeScene(3);
    }
    else{
        changeScene(0);
    }
    loanTimer--;
    if(loanTimer <= 0){
        document.getElementById("loanButton").style.display = "block";
    }
}

function newWeek(){
    week++;
    timeMod += (week-1)*3;
    for(var i = 0; i < 6; i++){
        resources[i] += resourcesChange[i];
    }
    for(var i = 0; i < activeContracts.length; i++){
        activeContracts[i].activeTime -= 1;
        if(activeContracts[i].activeTime <= 0){
            for(var j = 0; j < 6; j++){
                resourcesChange[j] -= activeContracts[i].resources[j];
            }
            activeContracts.splice(i, 1);
            i--;
        }
    }
    if(day == 15||day == 29){
        penalty++;
    }
    deltaExcitement -= .005;
}


function buildContractsList(make_new){
    contractScene.innerHTML = "<h2>Contracts for Hire</h2>";
    if(make_new){
        contracts = [];
        for(var i = 0; i<4; i++){
            var newContract = genContract();
            contracts.push(newContract);
            if(newContract.resources[0] != 0){
                contractScene.innerHTML += "<p>Dough: " + newContract.resources[0] + " tons/week</p>";
            }
            if(newContract.resources[1] != 0){
                contractScene.innerHTML += "<p>Cheese: " + newContract.resources[1] + " tons/week</p>";
            }
            if(newContract.resources[2] != 0){
                contractScene.innerHTML += "<p>Sauce: " + newContract.resources[2] + " tons/week</p>";
            }
            if(newContract.resources[3] != 0){
                contractScene.innerHTML += "<p>Pepperoni: " + newContract.resources[3] + " tons/week</p>";
            }
            if(newContract.resources[4] != 0){
                contractScene.innerHTML += "<p>Mushrooms: " + newContract.resources[4] + " tons/week</p>";
            }
            if(newContract.resources[5] != 0){
                contractScene.innerHTML += "<p>Cost per Week: " + newContract.resources[5]*-1 + " credits</p>";
            }
            contractScene.innerHTML += "<p>Upfront Cost: " + newContract.cost + " credits</p><p>Lasts 3 weeks</p> <button type='button' onclick='acceptContract(" + i + ")'>Sign</button><p style='border:1px solid black; width: 400px'> </p>";
        }
    }
    else{
        for(var i = 0; i < contracts.length; i++){
            var currContract = contracts[i];
            if(currContract.resources[0] != 0){
                contractScene.innerHTML += "<p>Dough: " + currContract.resources[0] + " tons/week</p>";
            }
            if(currContract.resources[1] != 0){
                contractScene.innerHTML += "<p>Cheese: " + currContract.resources[1] + " tons/week</p>";
            }
            if(currContract.resources[2] != 0){
                contractScene.innerHTML += "<p>Sauce: " + currContract.resources[2] + " tons/week</p>";
            }
            if(currContract.resources[3] != 0){
                contractScene.innerHTML += "<p>Pepperoni: " + currContract.resources[3] + " tons/week</p>";
            }
            if(currContract.resources[4] != 0){
                contractScene.innerHTML += "<p>Mushrooms: " + currContract.resources[4] + " tons/week</p>";
            }
            if(currContract.resources[5] != 0){
                contractScene.innerHTML += "<p>Cost per Week: " + currContract.resources[5]*-1 + " credits</p>";
            }
            contractScene.innerHTML += "<p>Upfront Cost: " + currContract.cost + " credits</p><p>Lasts " + currContract.activeTime + " weeks</p><button type='button' onclick='acceptContract(" + i + ")'>Sign</button><p style='border:1px solid black; width: 400px'> </p>";
        }
        if(contracts.length == 0){
            contractScene.innerHTML += "<p>There are currently no contracts available.</p>";
        }
        else{
            contractScene.innerHTML += "<p>You have " + resources[5] + " credits.</p>";
        }
    }
    contractScene.innerHTML += "<p>Contracts refresh in " + (3-((day-1)%3)) + " days.</p>";
    contractScene.innerHTML += "<button type='button' onclick='changeScene(0)'>Go Back</button>";
}

function genContract(){
    var company = Math.floor(Math.random()*5);
    var primaryResource = Math.floor(Math.random()*(1+day*2))%5;
    var secondaryResource = Math.floor(Math.random()*12);
    var amount = Math.ceil(Math.random()*(5+week))+2+Math.floor(week/3);
    var resources = [0, 0, 0, 0, 0, 0];
    var weeks = Math.ceil(Math.random()*(3+Math.floor(week/2)))+1;
    if(day == 1 && contracts.length < 4){
        primaryResource = contracts.length;
        amount = Math.ceil(Math.random()*2)+4;
        weeks = Math.ceil(Math.random()*2)+1;
    }
    resources[primaryResource] = amount;
    if(secondaryResource < 5 && secondaryResource != primaryResource){
        resources[secondaryResource] = Math.ceil(amount/2);
        amount *= 1.3;
    }
    if(secondaryResource == 5){
        resources[5] = Math.floor(amount * -0.7);
        amount = Math.ceil(amount*(1/weeks)+(week/2))
    }
    var cost = Math.round((amount * weeks * 1.7)*(Math.random()*0.5+0.75));
    /*switch(company){
        case 0:
            cost = Math.floor(cost*0.7);
            break;
        case 4:
            cost = Math.ceil(cost*1.3);
    }*/
    return({"company": company, "resources": resources, "cost": cost, "activeTime": weeks});
}

function acceptContract(contractNum){
    contract = contracts[contractNum];
    if(contract.cost <= resources[5]){
        activeContracts.push(contract);
        resources[5] -= contract.cost;
        contracts.splice(contractNum, 1);
        for(var i = 0; i < 6; i++){
            resourcesChange[i] += contract.resources[i];
        }
        buildContractsList(false);
    }
    else{
        eventScene.innerHTML = "<h4>Not Enough Money</h4><p>This contract costs " + contract.cost + " credits, but you only have " + resources[5] + ".</p><button type='button' onclick='changeScene(1)'>Darn</button>";
        changeScene(3);
    }
}

function buildKitchenScene() {
    kitchenScene.innerHTML = "<h2>In the Kitchen</h2>";
    kitchenScene.innerHTML += "<p>Dough: " + resources[0] + " tons</p>";
    kitchenScene.innerHTML += "<p>Cheese: " + resources[1] + " tons</p>";
    kitchenScene.innerHTML += "<p>Sauce: " + resources[2] + " tons</p>";
    kitchenScene.innerHTML += "<p>Pepperoni: " + resources[3] + " tons</p>";
    kitchenScene.innerHTML += "<p>Mushrooms: " + resources[4] + " tons</p>";
    
    if(recipes[0]){
        kitchenScene.innerHTML += "<h4>Cheese Pizza</h4>";
        var maxPizzas = Math.min(resources[0], resources[1], resources[2]);
        kitchenScene.innerHTML += "<p>Cost: 1 Dough, 1 Cheese, 1 Sauce <i>(" + maxPizzas + " possible)</i></p>";
        kitchenScene.innerHTML += "<p>Price: 2 Credits/slice</p>";
        kitchenScene.innerHTML += "<input type='number' id='cheeseQuantity' min='0' max='" + maxPizzas + "' value='0'>";
    }
    
    if(recipes[1]){
        kitchenScene.innerHTML += "<h4>Pepperoni Pizza</h4>";
        var maxPizzas = Math.min(resources[0], resources[1], resources[2], resources[3]);
        kitchenScene.innerHTML += "<p>Cost: 1 Dough, 1 Cheese, 1 Sauce, 1 Pepperoni <i>(" + maxPizzas + " possible)</i></p>";
        kitchenScene.innerHTML += "<p>Price: 3 Credits/slice</p>";
        kitchenScene.innerHTML += "<input type='number' id='peppQuantity' min='0' max='" + maxPizzas + "' value='0'>";
    }
    if(recipes[2]){
        kitchenScene.innerHTML += "<h4>Mushroom Pizza</h4>";
        var maxPizzas = Math.min(resources[0], resources[1], resources[2], resources[4]);
        kitchenScene.innerHTML += "<p>Cost: 1 Dough, 1 Cheese, 1 Sauce, 1 Mushroom <i>(" + maxPizzas + " possible)</i></p>";
        kitchenScene.innerHTML += "<p>Price: 3 Credits/slice</p>";
        kitchenScene.innerHTML += "<input type='number' id='mushQuantity' min='0' max='" + maxPizzas + "' value='0'>";
    }
    if(recipes[3]){
        kitchenScene.innerHTML += "<h4>Supreme Pizza</h4>";
        var maxPizzas = Math.min(resources[0], resources[1], resources[2], resources[3], resources[4]);
        kitchenScene.innerHTML += "<p>Cost: 1 Dough, 1 Cheese, 1 Sauce, 1 Pepperoni, 1 Mushroom <i>(" + maxPizzas + " possible)</i></p>";
        kitchenScene.innerHTML += "<p>Price: 4 Credits/slice</p>";
        kitchenScene.innerHTML += "<input type='number' id='supremeQuantity' min='0' max='" + maxPizzas + "' value='0'>";
    }
    if(recipes[4]){
        kitchenScene.innerHTML += "<h4>White Pizza</h4>";
        var maxPizzas = Math.min(resources[0], resources[1]);
        kitchenScene.innerHTML += "<p>Cost: 1 Dough, 1 Cheese <i>(" + maxPizzas + " possible)</i></p>";
        kitchenScene.innerHTML += "<p>Price: 2 Credits/slice</p>";
        kitchenScene.innerHTML += "<input type='number' id='whiteQuantity' min='0' max='" + maxPizzas + "' value='0'>";
    }
    kitchenScene.innerHTML += "<p>Each pizza contains 8 slices.</p>";
    kitchenScene.innerHTML += "<button type='button' onclick='readPizzaCount()'>Let's Bake</button>";
    kitchenScene.innerHTML += "<button type='button' onclick='changeScene(0)'>Back</button>";
}

function readPizzaCount(){
    var resourceTotal = Array.from(resources);
    var cheeseQuantity = 0;
    var peppQuantity = 0;
    var mushQuantity = 0;
    var supremeQuantity = 0;
    var whiteQuantity = 0;
    
    if(recipes[0]){
        cheeseQuantity = document.getElementById("cheeseQuantity").value;
        resourceTotal[0] -= cheeseQuantity;
        resourceTotal[2] -= cheeseQuantity;
        resourceTotal[1] -= cheeseQuantity;
    }
    if(recipes[1]){
        peppQuantity = document.getElementById("peppQuantity").value;
        resourceTotal[0] -= peppQuantity;
        resourceTotal[2] -= peppQuantity;
        resourceTotal[1] -= peppQuantity;
        resourceTotal[3] -= peppQuantity;
    }
    if(recipes[2]){
        mushQuantity = document.getElementById("mushQuantity").value;
        resourceTotal[0] -= mushQuantity;
        resourceTotal[2] -= mushQuantity;
        resourceTotal[1] -= mushQuantity;
        resourceTotal[4] -= mushQuantity;
    }
    if(recipes[3]){
        supremeQuantity = document.getElementById("supremeQuantity").value;
        resourceTotal[0] -= supremeQuantity;
        resourceTotal[2] -= supremeQuantity;
        resourceTotal[1] -= supremeQuantity;
        resourceTotal[3] -= supremeQuantity;
        resourceTotal[4] -= supremeQuantity;
    }
    if(recipes[4]){
        whiteQuantity = document.getElementById("whiteQuantity").value;
        resourceTotal[0] -= whiteQuantity;
        resourceTotal[1] -= whiteQuantity;
    }
    var fulfillable = true;
    for(var i = 0; i<5; i++){
        if(resourceTotal[i] < 0){
            fulfillable = false;
        }
    }
    if(fulfillable){
        resources = Array.from(resourceTotal);
        processPizzas([cheeseQuantity*8, peppQuantity*8, mushQuantity*8, supremeQuantity*8, whiteQuantity*8])
    }
    else {
        eventScene.innerHTML = "<h2>Not Enough Ingredients</h2><p>You need more ingredients to fulfill this order!</p><button type='button' onclick='changeScene(4)'>Back</button>";
        changeScene(3);
    }
}

function processPizzas(pizzas){
    var slicesLeft = Array.from(pizzas);
    var pizzaTypes = 0
    for(var i = 0; i<pizzas.length; i++){
        if(pizzas[i]!= 0){
            pizzaTypes++;
        }
    }
    var moneyMade = 0;
    var slicesSold = 0;
    for(var j = 60+timeMod; j > 0; j--){
        if(Math.random() < excitement){
            sliceOrder = [0, 1, 2, 3, 4];
            shuffle(sliceOrder)
            for(var i = 0; i < sliceOrder.length; i++){
                if(slicesLeft[sliceOrder[i]]>0){
                    slicesLeft[sliceOrder[i]] -= 1;
                    resources[5] += pizzaCosts[sliceOrder[i]];
                    moneyMade += pizzaCosts[sliceOrder[i]];
                    slicesSold++;
                }
            }
        }
    }
    if(penalty > pizzaTypes){
        excitement-=0.01;
    }
    eventScene.innerHTML = "<h2>End of Day " + day + "</h2><p>You sold " + slicesSold + " slices, and made " + moneyMade + " credits.</p><button type='button' onclick='newDay()'>All in a day's work</button>";
    changeScene(3);
    totalSlices += slicesSold;
    totalRevenue += moneyMade;
}

function buildRecipesScene() {
    recipesScene.innerHTML = "<h2>Recipes for Purchase</h2>";
    var noRecipes = true;
    if(!recipes[0]){
        recipesScene.innerHTML += "<p>Cheese Pizza: 1 Dough + 1 Cheese + 1 Sauce. 2 credits/slice</p><p><button type='button' onclick='buyRecipe(0, 10)'>Buy Cheese Pizza (10 credits)</button></p>";
        noRecipes = false;
    }
    if(!recipes[1]){
        recipesScene.innerHTML += "<p>Pepperoni Pizza: 1 Dough + 1 Cheese + 1 Sauce + 1 Pepperoni. 3 credits/slice</p><p><button type='button' onclick='buyRecipe(1, 30)'>Buy Pepperoni Pizza (30 credits)</button></p>";
        noRecipes = false;
    }
    if(!recipes[2]){
        recipesScene.innerHTML += "<p>Mushroom Pizza: 1 Dough + 1 Cheese + 1 Sauce + 1 Mushroom. 3 credits/slice</p><p><button type='button' onclick='buyRecipe(2, 30)'>Buy Mushroom Pizza (30 credits)</button></p>";
        noRecipes = false;
    }
    if(!recipes[3]){
        recipesScene.innerHTML += "<p>Supreme Pizza: 1 Dough + 1 Cheese + 1 Sauce + 1 Pepperoni + 1 Mushroom. 4 credits/slice</p><p><button type='button' onclick='buyRecipe(3, 50)'>Buy Supreme Pizza (50 credits)</button></p>";
        noRecipes = false;
    }
    if(!recipes[4]){
        recipesScene.innerHTML += "<p>White Pizza: 1 Dough + 1 Cheese. 2 credits/slice</p><p><button type='button' onclick='buyRecipe(4, 50)'>Buy White Pizza (50 credits)</button></p>";
        noRecipes = false;
    }
    if(noRecipes){
        recipesScene.innerHTML += "<p>Looks like there are no recipes left to purchase.</p>";
    }
    else{
        recipesScene.innerHTML += "<p>You have " + resources[5] + " credits.</p>";
    }
    recipesScene.innerHTML += "<button type='button' onclick='changeScene(0)'>Back</button>";
}

function buyRecipe(recipe, cost) {
    if(resources[5] >= cost){
        recipes[recipe] = true;
        resources[5] -= cost;
        eventScene.innerHTML = "<h2>Successful Purchase</h2><p>You have successfully bought this recipe.</p><button type='button' onclick='changeScene(0)'>Cool!</button>";
        changeScene(3);
        excitement += 0.05;
    }
    else{
        eventScene.innerHTML = "<h2>Not Enough Money</h2><p>You need " + (cost - resources[5]) + " more credits to buy this recipe!</p><button type='button' onclick='changeScene(2)'>Back</button>";
        changeScene(3);
    }
}

function buildMarketingScene(){
    marketingScene.innerHTML = "<h2>Marketing</h2>";
    var exciteStr;
    if(excitement<.05){
        exciteStr = "The aliens are preparing to burn your restaurant to the ground.";
    }
    else if(excitement<.15){
        exciteStr = "The aliens seem disappointed with human culture.";
    }
    else if(excitement<.25){
        exciteStr = "The aliens seem mildly amused by the concept of pizza.";
    }
    else if(excitement<.35){
        exciteStr = "The aliens are somewhat interested in trying pizza.";
    }
    else if(excitement<.45){
        exciteStr = "The aliens are warming up to pizza.";
    }
    else if(excitement<.55){
        exciteStr = "Pizza is considered a delicacy on P1X-C3.";
    }
    else if(excitement<.65){
        exciteStr = "Some of the inhabitants are planning a pizza tour of the Milky Way for their next vacation.";
    }
    else if(excitement<.75){
        exciteStr = "A pizza theme park is opening near you.";
    }
    else if(excitement<.85){
        exciteStr = "Pizza is now the dominant religion of P1X-C3.";
    }
    else if(excitement<.95){
        exciteStr = "Cries of devotion to pizza rise from the plains.";
    }
    else {
        exciteStr = "The inhabitants are reprogramming their genetic code so they may survive solely on pizza.";
    }
    marketingScene.innerHTML += "<p>" + exciteStr + "</p>";
    marketingScene.innerHTML += "<p>Marketing Budget: <input type='number' id='marketingBudget' min='0' value='" + marketExcitement + "'> credits/day <button type='button' onclick='runMarketingCampaign(0)'>Set</button></p>";
    if(!marketingUsed[0]){
        marketingScene.innerHTML += "<p><button type='button' onclick='runMarketingCampaign(1)'>Produce Pamphlets (50 credits)</button></p>";
    }
    if(!marketingUsed[1]){
        marketingScene.innerHTML += "<p><button type='button' onclick='runMarketingCampaign(2)'>Televised Advertisement (100 credits)</button></p>";
    }
    recipesScene.innerHTML += "<p>You have " + resources[5] + " credits.</p>";
    marketingScene.innerHTML += "<button type='button' onclick='changeScene(0)'>Back</button>";
}

function runMarketingCampaign(type){
    switch(type){
        case 0:
            marketExcitement = document.getElementById("marketingBudget").value;
            changeScene(0);
            break;
        case 1:
            if(resources[5] >= 50){
                resources[5] -= 50;
                eventScene.innerHTML = "<h2>High-Level Marketing Strategy</h2><p>You print some pamphlets, before realizing that you don't have any way to distribute them. You decide to blow them out the airlock. Hopefully some curious aliens will grab them out of the air.</p><button type='button' onclick='changeScene(0)'>Well then</button>";
                deltaExcitement += 0.005;
                marketingUsed[0] = true;
                changeScene(3);
            }
            else {
                eventScene.innerHTML = "<h2>Not Enough Money</h2><p>You need " + (50 - resources[5]) + " more credits to buy this recipe!</p><button type='button' onclick='changeScene(5)'>Back</button>";
                changeScene(3);
            }
            break;
        case 2: 
            if(resources[5] >= 150){
                resources[5] -= 150;
                eventScene.innerHTML = "<h2>Extreme Scheme</h2><p>You don't speak much of the local language, and you've never been much of an actor. You hope that gesturing at the storefront while screaming &#34;Pizza!&#34; gives off the intended impression.</p><button type='button' onclick='changeScene(0)'>Hmmmm</button>";
                deltaExcitement += 0.01;
                marketingUsed[1] = true;
                changeScene(3);
            }
            else {
                eventScene.innerHTML = "<h2>Not Enough Money</h2><p>You need " + (150 - resources[5]) + " more credits to buy this recipe!</p><button type='button' onclick='changeScene(5)'>Back</button>";
                changeScene(3);
            }
            break;
    }
}

function buildLoanScene() {
    loanScene.innerHTML = "<h2>The Sharks Are Circling</h2>";
    loanScene.innerHTML += "<p>Grelzid Galactic Bank welcomes you. You have been pre-approved for an instant loan of up to " + (50*(week)) + " credits!</p><p>Please note that only one loan can be taken out every seven days.</p>";
    loanScene.innerHTML += "<p>Amount of Loan <input type='number' id='loanAmount' min='10' max='" + (50*(week)) +"' value='10'> credits <button type='button' onclick='checkLoan()'>Check</button></p>";
    loanScene.innerHTML += "<div id='loanResult'></div>";
    loanScene.innerHTML += "<p><button type='button' onclick='changeScene(0)'>Back</button></p>";
}

function checkLoan(){
    var loanAmount = document.getElementById("loanAmount").value;
    var repaymentTerm = Math.round(Math.log2(loanAmount));
    var repaymentAmount = Math.round(loanAmount*(1.2+Math.log10(loanAmount)*0.2));
    var costPerTerm = Math.round(repaymentAmount/repaymentTerm);
    var loanCheckScene = document.getElementById("loanResult");
    loanCheckScene.innerHTML = "<p>This will cost " + costPerTerm + " credits/week for " + repaymentTerm + " weeks. <button type='button' onclick='signLoan(" + costPerTerm + ", " + repaymentTerm + ", " + loanAmount + ")'>Take Out Loan</button></p>";
}

function signLoan(costPerWeek, numWeeks, amount){
    document.getElementById("loanButton").style.display = "none";
    loanTimer = 7;
    activeContracts.push({"company": 0, "resources": [0, 0, 0, 0, 0, costPerWeek*-1], "cost": 0, "activeTime": numWeeks});
    resourcesChange[5] -= costPerWeek;
    resources[5] += amount;
    changeScene(0);
}

function displayHandbook(){
    eventScene.innerHTML = "<h2>Uncle Benito Presents: How To Pizza</h2><p>Pizza is the pinnacle of human achievement, and now that we've reached the stars, pizza must follow us to bring about a new era of galactic prosperity.</p><p>In order to properly produce pizza, you must first source your ingredients. Open the Supply Contracts tab on your employee interface to find and purchase supplies within your parsec. Please note that for outer regions, delivery is only undertaken weekly. Make sure that you at least have dough, cheese, and sauce, as these are the foundational ingredients of pizza.</p><p>To sell pizza in quantities befitting the Benny's name, you must devote some resources to marketing. In the Marketing tab, you will find a Marketing Budget adjuster, which controls how many credits you spend per day on marketing, as well as some long-term marketing options. Research has shown that, without proper marketing, alien populations not used to the greatness of pizza may stage violent revolts. Prevent this from happening to your store!</p><p>While we at Benny's believe that all pizza is exciting, the fact remains that variety is the spice of life, and serving only one or two types of pizza may damage our brand image in the long run. Avoid this by purchasing new recipes from the Recipes tab! Most recipes take more ingredients than a basic cheese pizza, but cost more per slice in return. Plus, the prospect of new flavors alone might get the population excited!</p><p>We hope you enjoy your time at Benny's. Remember; customer satisfaction comes first!</p><button type='button' onclick='changeScene(0)'>Helpful</button>";
                changeScene(3);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

startGame();