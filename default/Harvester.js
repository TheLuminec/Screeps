const CreepBasics = require("./CreepBasics");

module.exports = class Harvester extends CreepBasics{

    static Run(creep)
    {
        this.Say(creep, "works");
        console.log(this.AllyIdentifier(creep));
    }

    static HarvestNode(creep)
    {
        if(!this.CapacityIsFull(creep) && creep.memory.currentTask != "transfering") {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            this.Deposit(creep);
        }

    }

    static Deposit(creep)
    {
        creep.memory.currentTask = "transfering";
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        else{
            if(creep.upgradeController(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }

        if(this.CapacityIsEmpty(creep))
        {
            creep.memory.currentTask = "null";
        }
    }
}