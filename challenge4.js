//Challenge #4: Transport 28 people in 60 seconds or less
//Max per elevator 7 and there are 2 elevators
{
    init: function(elevators, floors) {


        for(var elevator = 0 in elevators){
            initiateElevator(elevators[elevator]);}
            function initiateElevator(elevator){
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



        // Elevator which is less occupied
        function findTheBestElevator(elevators,floor)
        {
            var elevatorQueueLen = elevators.map(elev => elev.destinationQueue.length);
            var minOcuppiedElev = 0,elevNumber=0;
            if(elevatorQueueLen!= null){
                minOcuppiedElev = Math.min.apply(null,elevatorQueueLen)
                elevNumber = elevatorQueueLen.indexOf(minOcuppiedElev); 
            }
            return elevators[elevNumber].goToFloor(floor.floorNum());
        }


        //Get the floor number
        for(var floorNum=0 in floors)
            {
            var floor = floors[floorNum];
            getToFloor(floor);

        };

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