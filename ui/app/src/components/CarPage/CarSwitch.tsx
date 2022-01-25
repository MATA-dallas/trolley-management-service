import { Switch } from "@mui/material"

export type CarSwitchProps = {
    manualStatus: "OFF" | "",
    carId: number
}

export const CarSwitch = ({manualStatus, carId} : CarSwitchProps) => {
    
    return (
        <Switch checked={manualStatus != "OFF"} />
    )
}