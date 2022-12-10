import { ReactComponent as TrendingAssetsHeaderIcon } from "assets/trending_assets.svg";

export default function Header() {
    return (
    <header className="flex flex-row items-center">
        <div className="h-4 mr-4">
            <TrendingAssetsHeaderIcon/>
        </div>
        <p className="text-white">Trending Assets</p>
    </header>);
}