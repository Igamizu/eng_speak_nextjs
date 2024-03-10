import { setGenre, setUnit } from "lib/store/modules/terms";
import SearchPullDown from "./searchPulldown";

export default function SearchList() {
    return(
        <>
            <div className="flex justify-center">
                <SearchPullDown term={"unit"} actionCreator={setUnit}/>
                <SearchPullDown term={"genre"} actionCreator={setGenre}/>
            </div>
        </>
    );
}