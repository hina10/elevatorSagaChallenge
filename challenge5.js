
//Challenge #6: Transport 40 people using 60 elevator moves or less

{
    init: function(elevators, floors) {


        elevators.forEach(elevator =>initiateElevator(elevator));

        function initiateElevator(elevator){
            elevator.on("idle", function() { elevator.goToFloor(0); });
            // Whenever you in elevator and press button    
            elevator.on("floor_button_pressed", function(floorNum) { 
                elevator.goToFloor(floorNum) ;
            });



            elevator.on("passing_floor", function(floorNum, direction){
                var counterStop = false;
                //Update destination queue on when the passing floor is in destination queue

                elevator.destinationQueue = elevator.destinationQueue.filter(function(floorN,i){
                    if(floorN == floorNum){
                        counterStop =true;
                    }
                    return floorN!= floorNum;
                });
                if(counterStop){
                    elevator.checkDestinationQueue();
                    elevator.goToFloor(floorNum,true);
                }
            });
        }



        // Elevator which is nearest to floor and not full
        function findTheBestElevator(elevators,floor)
        {
            var elevArr = elevators.map(function(elev){ 
                return {elev:elev, distance:Math.abs(elev.currentFloor()-floor.floorNum())+elev.destinationQueue.length}; 
            }) 
            
            //sort in decreasing order
            elevArr.sort(function (a, b) {
                return a.distance - b.distance;
            });
            return elevArr[0].elev.goToFloor(floor.floorNum());
          
        }


        //Get the floor 
        floors.forEach(floor => getToFloor(floor))


        //getToFloor function for up_button_pressed(up button pressed) && down_button_pressed(down button pressed)
        function getToFloor(floor){
            floor.on("up_button_pressed", function() {
                findTheBestElevator(elevators,floor);

            });
            floor.on("down_button_pressed", function() {
                findTheBestElevator(elevators,floor);



            });
        }


    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}