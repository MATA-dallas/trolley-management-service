import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../services/service-models";
import { useAlertServiceContext } from "../../store";
import { formatDate } from "../../util/util";


export const AlertPage = () => {
    const alertService = useAlertServiceContext();
    const [alerts, setAlerts] = useState([] as Alert[]);
    useEffect(()=>{
        const sub = alertService.getAlertDataSubject().subscribe((alertData)=>{
            setAlerts(alertData);
        });
        alertService.refresh();
        return sub.unsubscribe;
    }, []);
    return (
        <>
            <div>
                {}
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            
                        </TableCell>
                        <TableCell>
                            Alert
                        </TableCell>
                        <TableCell>
                            Posted
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {alerts.map(alert=>
                        (
                            <TableRow key={alert.ID}>
                                <TableCell>
                                    
                                </TableCell>
                                <TableCell>
                                    {alert.Alert.match('>.*<\/')![0].replace('>','').replace('</','')}
                                </TableCell>
                                <TableCell>
                                    {formatDate(alert.Posted.toString())}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
}