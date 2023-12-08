module.exports = class RoomManager{

    static GetCreepRoleCount(role)
    {
        var count = 0;
        for(var name in Game.creeps){
            if(Game.creeps[name].memory.role == role){
                count++;
            }
        }
        return count;
    }
    
    static CreateCreep(role)
    {
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], Game.time, {
        memory: {role: role}
        });
    }
    
    static SetRoomMemory(entity)
    {
        Memory.room[entity.room.name] = {
            Resources : this.GetRoomResources(entity),
            Set : true
        }
        
    }
    
    static GetRoomResources(entity)
    {
        var resources = {
            Sources : entity.room.find(FIND_SOURCES).length
        }
        return resources;
    }
    
    static CleanCreeps()
    {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }

}