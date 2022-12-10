import assets from 'trending_assets.json';

export interface TrendingAssetModel {
    id: number;
    name: string;
    abbreviation: string;
    iconLocation: string;
    iconTheme: string;
    priceInDollars: number;
    changeInPercent: number;
    tvl: number;
    popularPairsId: number[]
}

export function getAllTrendingAssets(): TrendingAssetModel[] {
    let trendingAssets: Array<TrendingAssetModel> = [];
    assets.trending_assets.forEach((asset) => {
        trendingAssets.push(unmarshallTrendingAsset(asset));
    })
    return trendingAssets;
}


export function getTrendingAssetWithId(id: number): TrendingAssetModel {
    let asset = assets.trending_assets.find((asset) => asset.id === id);
    return unmarshallTrendingAsset(asset);
}


function unmarshallTrendingAsset(asset: any): TrendingAssetModel {
    let trendingAsset: TrendingAssetModel = {
        id: asset.id,
        name: asset.name,
        abbreviation: asset.abbreviation,
        iconLocation: asset.icon_path,
        iconTheme: asset.icon_theme,
        priceInDollars: asset.price_in_dollars,
        changeInPercent: asset.change_in_percent,
        tvl: asset.tvl,
        popularPairsId: asset.popular_pairs_id
    };
    return trendingAsset;
}
