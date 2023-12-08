module.exports = class CreepBasics
{
    static Say(creep, text)
    {
        creep.say(text);
    }
    
    static AllyIdentifier(target)
    {
        var targetName = target.owner.username;
        if(targetName == "TheLumine" || targetName == "Moddingdudes")
        {
            return true;
        }
        return false;
    }

    static CapacityIsFull(creep)
    {
        return (creep.store.getFreeCapacity() <= 0);
    }

    static CapacityIsEmpty(creep)
    {
        return (creep.store.getUsedCapacity() == 0);
    }
}