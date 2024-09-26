import { setMatl, setUnit, setWord } from "lib/store/modules/terms";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import SearchPullDown from "./searchPulldown";

export default function SearchList() {
    const [state, setState] = useState("");
    const terms = useSelector(state => state.terms);
    const { word } = terms;
    const dispatch = useDispatch();

    const setInput = (e) => {
        setState(e.target.value);
    }

    const setDispatch = (e) => {
        setState(e.target.value);
        dispatch(setWord(e.target.value));
    }

    return(
        <>
            <div className="flex justify-start md:justify-center">
                <SearchPullDown term={"unit"} actionCreator={setUnit}/>
                <SearchPullDown term={"matl"} actionCreator={setMatl}/>
            </div>
            <div className="mt-5 mb-5 flex justify-center md:justify-center">
                <input type="text"
                    value={state}
                    onChange={e => setInput(e)}
                    onBlur={e => setDispatch(e)}
                    onKeyDown={e => setDispatch(e)}
                    className="text-black p-1 mr-2 md:w-1/5"
                />
            </div>
        </>
    );
}