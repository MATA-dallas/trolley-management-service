import { DataClient } from "../../data-providers";
import { Knex } from "knex";
import { Alert, allKeysOfAlert } from "./alert.model";

export interface Data {
    getAlertById: ReturnType<typeof getAlertById>;
    getAll: ReturnType<typeof getAll>;
    addAlert: ReturnType<typeof addAlert>;
}

const getAlertById = (alerts: () => Knex.QueryBuilder<any, any>) => async (id: number): Promise<Alert> => {
    const alert = (await alerts()
        .select<any, Alert[]>()
        .where({
            ID: id
        })
    );

    return alert[0];
}

const getAll = (alerts: () => Knex.QueryBuilder<any, any>) => async (limit:number | null, active: boolean) => {
    limit = limit ?? 5;
    return (await alerts()
        .where({
            active
        })
        .select<any, Alert[]>(allKeysOfAlert)
        .orderBy('posted','desc')
        .limit(limit)) as Alert[];
}

const addAlert = (alerts: () => Knex.QueryBuilder<any, any>) => async (alertText: string, type: string, timePosted: Date): Promise<number> => {
    const item = (await alerts()
        .insert({
            'Type': type,
            'Alert': alertText,
            'UpdateID': 0,
            'Posted': timePosted,
            'postedBy': '',
            'Active': true
        })
        .returning('ID')
    ) as number[];
    if(item[0] == undefined)
        throw new Error("Alert was not inserted correctly");
    return item[0];

}

const create = async (data: DataClient): Promise<Data> => {
    const alerts = () => data.mysql('riderAlerts')
    
    return {
        getAll: getAll(alerts),
        addAlert: addAlert(alerts),
        getAlertById: getAlertById(alerts)
    };
}

export default { create }