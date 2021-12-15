

const tryParseInt = (val: string) : number | null => {
    const parsedInt = parseInt(val);
    if(isNaN(parsedInt) || !isFinite(parsedInt))
        return null;
    return parsedInt;
}

const getCurrentDateTime = () : Date => {
    return new Date();
}



export interface Util {
    tryParseInt : typeof tryParseInt
    getCurrentDateTime : typeof getCurrentDateTime
}

const create = ():Util => {
    return {
        tryParseInt,
        getCurrentDateTime
    }
}

export default { create }
