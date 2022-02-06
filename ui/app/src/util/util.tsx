

export const formatDate = (dateString: string) => {
    const formatMinutes = (date: number) => {
        const dateStr = date.toString();
        return dateStr.length == 1? `0${dateStr}` : dateStr;
    }
    const date = new Date(dateString);
    return (date.getMonth()+1) +"/"+ date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + formatMinutes(date.getMinutes());
}
