//Challenge #3: Transport 23 people in 60 seconds or less
//Nothing changes code is working same as challenge 2 (Size of lift is Increased from 5 to 7 people)

{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
            //Removed as taking extra time/space in destination queue 

        });
        // Whenever you in elevator and press button
        elevator.on("floor_button_pressed", function(floorNum) { 
            elevator.goToFloor(floorNum) 
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
        for(var floorNum=0 in floors)
            {
            var floor = floors[floorNum];
            getToFloor(floor);

        };
        //getToFloor function for up_button_pressed(up button pressed) && down_button_pressed(down button pressed)
            function getToFloor(floor){
            floor.on("up_button_pressed", function() {
                elevator.goToFloor(floor.floorNum());

            });
            floor.on("down_button_pressed", function() {

                elevator.goToFloor(floor.floorNum());

            });
        }
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}