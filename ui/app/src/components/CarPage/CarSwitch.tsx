import { Switch } from "@mui/material"
import { useCarDataServiceContext } from "../../store";

export type CarSwitchProps = {
    manualStatus: "OFF" | "",
    carId: number
}

export const CarSwitch = ({manualStatus, carId} : CarSwitchProps) => {
    const carData = useCarDataServiceContext();
    
    return (
        <Switch checked={manualStatus != "OFF"} onClick={()=> carData.toggleCarPosition(carId)} />
    )
}