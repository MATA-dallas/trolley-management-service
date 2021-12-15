
import { Util } from "../../util/util";
import { Data } from "./alert.data"

const getAllAlerts = (alerts: Data) => async (limit: number | null) => {
    return alerts.getAll(limit);
}

const addAlert = (alerts: Data, util: Util) => async (alertText: string | null): Promise<number> => {
    if(alertText == null)
        throw new Error('Alert text is required');
    
    return await alerts.addAlert(alertText, 'INFO', util.getCurrentDateTime());
}

const getAlertById = (alerts: Data) => async (id: number) => {
    return await alerts.getAlertById(id);
}

export interface Handler {
    getAlertById: ReturnType<typeof getAlertById>,
    getAllAlerts: ReturnType<typeof getAllAlerts>,
    addAlert: ReturnType<typeof addAlert>
}

const create = (data: Data, util: Util) : Handler => {
    return {
        getAllAlerts: getAllAlerts(data),
        addAlert: addAlert(data, util),
        getAlertById: getAlertById(data)
    };
}

export default {
    create
}