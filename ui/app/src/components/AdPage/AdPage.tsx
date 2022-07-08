import { useEffect, useState } from "react";
import { Ad } from "../../services/ad.service";
import { useAdContext } from "../../store";

const CreateAdSection = () => {
    const adService = useAdContext();

    return (
        <div>
            TODO: finish this
        </div>
    );
}

export const AdPage = () => {
    const adService = useAdContext();
    const [latestAd, setLatestAd] = useState<Ad|null>(null)
    useEffect(() => {
        const sub = adService.getLatestAdSubject().subscribe((newAd) =>{
            setLatestAd(_=> newAd);
        });
        return sub.unsubscribe;
    },[adService]);
    return (
        <div>
            {latestAd?.message || "none"}
        </div>
    );
}