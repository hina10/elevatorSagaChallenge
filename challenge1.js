
//Challenge #1: Transport 15 people in 60 seconds or less

{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {

            elevator.goToFloor(0);

        });
        // Whenever you in elevator and press button
        elevator.on("floor_button_pressed", function(floorNum) { 
            elevator.goToFloor(floorNum) 
        });
        elevator.on("passing_floor", function(floorNum, direction){
            var counterStop = false; 
           elevator.destinationQueue = elevator.destinationQueue.filter(function(floorN,i){
                if(floorN == floorNum){
                    counterStop =true;
                }
               return false;
            });
            if(counterStop){
                elevator.checkDestinationQueue();
                elevator.goToFloor(floorNum,true);
            }
        });
        for(var floorNum=0 in floors)
            {
            var floor = floors[floorNum];
            //Whenever floor upbutton and downbutton is presses 
            floor.on("up_button_pressed", function() { elevator.goToFloor(floor.floorNum()); } );
            floor.on("down_button_pressed", function() { elevator.goToFloor(floor.floorNum()); } );
    }
},
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}