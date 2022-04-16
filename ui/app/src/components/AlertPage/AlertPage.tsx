import { Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../services/service-models";
import { useAlertServiceContext } from "../../store";
import { formatDate } from "../../util/util";


const NewAlert = () => {
    const alertService = useAlertServiceContext();
    const [message, setMessage] = useState('');
    const addAlert = async () => {
        if(message == '')
            return;
        await alertService.createAlert(message);
        setMessage('');
    }
    return (
        <>
            <Typography variant="h4">
                Add Alert
            </Typography>
            <TextField 
                value={message} 
                onChange={e=>setMessage(e.currentTarget.value)} 
                onKeyPress={e=>{if(e.key == 'Enter') addAlert()} }
                id="outlined-basic" 
                label="Message" 
                multiline
                rows={4}
                fullWidth
                variant="outlined" />
            <div>
                <Button onClick={() => addAlert()} variant="contained">
                    Create Alert
                </Button>
            </div>
        </>
    );
}
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
            <NewAlert/>
            <div style={{padding:'5px'}}></div>
            <Divider />
            <Typography variant="h4">
                Alerts
            </Typography>
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