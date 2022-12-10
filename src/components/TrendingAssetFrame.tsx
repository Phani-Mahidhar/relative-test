import React, { useEffect } from "react";
import { getTrendingAssetWithId, TrendingAssetModel } from "../rest_api/TrendingAssetRequests";

interface TrendingAssetProp {
    trendingAsset: TrendingAssetModel;
}

export default function TrendingAssetFrame(props: TrendingAssetProp) {
    var mainAssetIconRef: React.RefObject<HTMLDivElement> = React.createRef();

    useEffect(() => {
        mainAssetIconRef.current?.style.setProperty("background-image",
            `linear-gradient(180deg, #626a881a 0%, ${props.trendingAsset.iconTheme}10 100%)`)
    }, [])

    return (
        <div className="h-[400px] w-72 pt-12 mb-6 flex flex-col items-center relative">
            <div ref={mainAssetIconRef} className={`h-24 w-24 absolute top-0 flex justify-center items-center rounded-full box-border shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] backdrop-blur-`}>
                <div className="h-11 w-11"> {getImageFromAsset(props.trendingAsset)}</div>
            </div>
            {getTrendingAssetBody(props)}
        </div>
    )
}


function getTrendingAssetBody(props: TrendingAssetProp) {
    return (
        <div className="h-[350px] pt-20 px-6 w-full z-2 bg-asset-frame bg-contain bg-no-repeat">
            <div className="flex flex-col my-auto h-full w-full">
                <div className="mb-3 text-frame-text text-xs font-semibold mx-auto flex flex-row">
                    <p>{`${props.trendingAsset.name} (${props.trendingAsset.abbreviation})`}</p>
                </div>
                {titleValueDisplay("Price",
                    <div className="h-full w-full flex flex-row items-center relative">
                        <div className="text-white text-base font-semibold mx-auto">
                            {props.trendingAsset.priceInDollars.toLocaleString(undefined,
                                { style: "currency", minimumFractionDigits: 2, currency: "USD", currencyDisplay: "narrowSymbol", maximumFractionDigits: 20 })}
                        </div>
                        {getPriceChange(props.trendingAsset.changeInPercent)}
                    </div>
                )}
                {titleValueDisplay("TVL",
                    <div className="h-full text-white font-semibold text-base flex items-center justify-around">
                        {props.trendingAsset.tvl.toLocaleString(undefined, 
                            { style: "currency", currency: "USD", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 })}
                    </div>
                )}
                {titleValueDisplay("Popular pairs",
                    <div className="h-full flex flex-row items-center justify-space">
                        {props.trendingAsset.popularPairsId.map((id, idx) => {
                            let asset = getTrendingAssetWithId(id)
                            return (
                                <div className="h-full mx-1" key={idx}>
                                    {getImageFromAsset(asset)}
                                </div>)
                        })}
                    </div>, false
                )}
            </div>

        </div>
    )
}

function titleValueDisplay(title: String, value: JSX.Element, spanWidth: boolean = true) {
    return (
        <div className="w-full flex flex-col justify-between items-center mt-2.5">
            <div className={"h-10 px-4 py-1.5 rounded-full shadow-md bg-primary" + (spanWidth ? " w-full" : "")} >
                {value}
            </div>
            <div className="text-frame-text text-xs font-semibold mx-auto mt-2 flex flex-row">
                <p>{title}</p>
            </div>
        </div>
    )
}

function getPriceChange(change: number) {
    let commonClasses = "text-xs ml-auto absolute right-0"
    if (change >= 0) {
        return <div className={commonClasses + " text-green-600"}>
            {change.toLocaleString(undefined, { signDisplay: "exceptZero" })}%
        </div>
    }
    return <div className={commonClasses + " text-red-600"}>
        {change.toLocaleString(undefined, { signDisplay: "exceptZero" })}%
    </div>
}

function getImageFromAsset(asset: TrendingAssetModel) {
    return <img className="h-full w-auto" src={require("assets/" + asset.iconLocation)} alt={asset.iconLocation} />
}