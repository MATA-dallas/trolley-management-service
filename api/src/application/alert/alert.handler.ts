
import { Util } from "../../util/util";
import { Data } from "./alert.data"

const getAllAlerts = (alerts: Data) => async (limit: number | null) => {
    return alerts.getAll(limit, true);
}

const addAlert = (alerts: Data, util: Util) => async (alertText: string | null): Promise<number> => {
    if(alertText == null)
        throw new Error('Alert text is required');
    
    // legacy code uses this markup. this will need to get refactored out after the first prod push
    const html = `<div style='width:100%;padding:5px;background-color:#488115;color:WHITE;'>${alertText}</div>`;
    return await alerts.addAlert(html, 'INFO', util.getCurrentDateTime());
}

const getAlertById = (alerts: Data) => async (id: number) => {
    return await alerts.getAlertById(id);
}

const deleteAlert = (alerts: Data) => () => {
    return await alerts.
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