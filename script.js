var english = document.querySelector('.english-btn');
var plabel = document.querySelector('.p-label');
var container = document.querySelector('.container');
var i1 = document.querySelector('.i1');
var i2 = document.querySelector('.i2');
var trip = document.querySelector('.trip');
var input1 = document.createElement('input');
var input2 = document.createElement('input');
var routesUL = document.createElement('ul');
var destSubmit = document.createElement('btn');
var directionsService = new google.maps.DirectionsService();

function calcRoute() {
  var request = {
      origin: input1.value,
      destination: input2.value,
      travelMode: google.maps.TravelMode['TRANSIT']
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      console.log(response);
        container.setAttribute("class", "container")
        plabel.setAttribute("class", "p-label");
        var customInstructions = "Walk to " + input2.value;
        plabel.textContent = "Routes: ";
        trip.textContent = input1.value + " to " + input2.value;
        input1.parentNode.removeChild(input1);
        input2.parentNode.removeChild(input2);
        destSubmit.parentNode.removeChild(destSubmit);
        routesUL.setAttribute("class", "list-group");
        container.appendChild(routesUL);
        
        routes = response.routes[0].legs;
        for(var i = 0; i < routes.length; ++i){
            
            var route = document.createElement('li');
            route.setAttribute("class", "list-group-item animated slideInRight");
            var myTitle1 = document.createElement('h2');
            myTitle1.textContent = "Route " + (i + 1) + ": " + routes[i].departure_time.text + " - " + routes[i].arrival_time.text;
            var myTitle2 = document.createElement('h4');
            myTitle2.textContent = "Steps: ";
            var stepOL = document.createElement('ol');
            routesUL.appendChild(route);
            route.appendChild(myTitle1);
            route.appendChild(myTitle2);
            route.appendChild(stepOL);
            
            for(var x = 0; x < routes[i].steps.length; ++x){
                var stepLI = document.createElement('li');  
                if(routes[i].steps[x].travel_mode == "WALKING" && x == routes[i].steps.length - 1){    
                    stepLI.textContent = customInstructions + " for " + routes[i].steps[x].duration.text + "."; 
                }else if(routes[i].steps[x].travel_mode == "WALKING"){
                    stepLI.textContent = routes[i].steps[x].instructions + " for " + routes[i].steps[x].duration.text + "."; 
                }else if(routes[i].steps[x].travel_mode == "TRANSIT"){
                    stepLI.textContent = routes[i].steps[x].transit.line.short_name + " " + routes[i].steps[x].instructions + " for " + routes[i].steps[x].duration.text + "."; 
                }
                stepOL.appendChild(stepLI);
            }
            
        }
        
    }else{
        plabel.textContent = "Invalid input: Please try again.";
        console.log("Invalid input: Please try again.");
    }
  });
}

english.onclick = function(){
    english.parentNode.removeChild(english);
    plabel.textContent = "Please enter your location and destination: "; 
    input1.setAttribute("class", "form-control animated slideInLeft");
    input2.setAttribute("class", "form-control animated slideInRight");
    input1.setAttribute("placeholder", "Location");
    input2.setAttribute("placeholder", "Destination");
    destSubmit.setAttribute("class", "btn btn-primary animated zoomIn");
    destSubmit.textContent = "Submit";
    
    input1.style.width = "50%";
    input2.style.width = "50%";
    
    
    
    i1.appendChild(input1);
    i2.appendChild(input2);
    container.appendChild(destSubmit);
    
    
}

destSubmit.onclick = function(){
    
    console.log(directionsService);
    calcRoute();
    
}