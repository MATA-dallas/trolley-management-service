import { cardMediaClasses, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { CarDataItem } from "../../services/service-models"
import { useCarDataServiceContext } from "../../store"

export const CarPage = () => {
    return <CarTable />
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (date.getMonth()+1) +"/"+ date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
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
                        Battery %
                    </TableCell>
                    <TableCell>
                        GPS Satelites
                    </TableCell>
                    <TableCell>
                        Last Updated
                    </TableCell>
                    <TableCell>
                        Manual Status
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cars?.map(car=> {
                    return (
                        <TableRow key={car.car.car}>
                            <TableCell>
                                {car.car.car}
                            </TableCell>
                            <TableCell>
                                {car.carState?.Battery ?? "No Value"}
                            </TableCell>
                            <TableCell>
                                {car.carState?.NumSats ?? "No Value"}
                            </TableCell>
                            <TableCell>
                                {car.carPosition?.updateTime == null ? "" : formatDate(car.carPosition?.updateTime)}
                            </TableCell>
                            <TableCell>
                                {car.carPosition?.manualStatus}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}