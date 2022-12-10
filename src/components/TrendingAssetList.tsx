import { getAllTrendingAssets } from "../rest_api/TrendingAssetRequests";
import TrendingAsset from "./TrendingAssetFrame";

export default function TrendingAssetList() {

    return (
        <div className="mt-20 flex flex-row justify-between">
            {
                getAllTrendingAssets().map((val, index) => {
                    return <div className="mr-8" key={index}>
                        <TrendingAsset trendingAsset={val}/>
                    </div>
                })
            }
        </div>
    )
}