const Harvester = require('./Harvester');
const RoomManager = require('./RoomManager');
const roleBuilder = require("role.builder");

module.exports.loop = function () {
    if(Memory.room[Game.spawns["Spawn1"].room.name].Set == false){
        RoomManager.SetRoomMemory(Game.spawns["Spawn1"]);
    }
    
    if(RoomManager.GetCreepRoleCount("Harvester") < Memory.room[Game.spawns["Spawn1"].room.name].Resources.Sources*2){
        RoomManager.CreateCreep("Harvester");
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'Harvester') {
            Harvester.HarvestNode(creep);
            
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            
        }
    }
    
    RoomManager.CleanCreeps();
}