import { cardMediaClasses, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { CarDataItem } from "../../services/service-models"
import { useCarDataServiceContext } from "../../store"
import { formatDate } from "../../util/util"
import { CarSwitch } from "./CarSwitch"

export const CarPage = () => {
    return <CarTable />
}

export const CarTable = () => {
    const carData = useCarDataServiceContext();
    const [cars, setCars] = useState<CarDataItem[]>();
    useEffect(() => {
        const subscription = carData.getCarDataSubject();
        subscription.subscribe(carData=> {
            setCars(carData.cars);
        });
    }, [])
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Car #
                    </TableCell>
                    <TableCell>
                        Battery
                    </TableCell>
                    <TableCell>
                        GPS Satelites
                    </TableCell>
                    <TableCell>
                        Last Updated
                    </TableCell>
                    <TableCell>
                        Show On Tracker
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cars?.map(car=> {
                    return (
                        <TableRow key={car.car.ID}>
                            <TableCell>
                                {car.car.car}
                            </TableCell>
                            <TableCell>
                                {(car.carState?.Battery + "%") ?? "No Value"}
                            </TableCell>
                            <TableCell>
                                {car.carState?.NumSats ?? "No Value"}
                            </TableCell>
                            <TableCell>
                                {car.carPosition?.updateTime == null ? "" : formatDate(car.carPosition?.updateTime)}
                            </TableCell>
                            <TableCell>
                                <CarSwitch 
                                    manualStatus={car.carPosition?.manualStatus??""}
                                    carId={ car.car.car } />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}