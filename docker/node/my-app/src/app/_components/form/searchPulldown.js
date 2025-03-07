'use client';
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function SearchPullDown ({ term, actionCreator }) {
    const mp = [...Array(145)].map((_, i) => i + 1);
    const unitArray = ["'%'", ...mp];
    const optionsObj = {
        unit: [...unitArray],
        // unit: [...Array(145)].map((_, i) => i + 1),
        matl: ["giu", "pass20", "ex15", "brit", "shuraba", "toefl700"]
    }
    const OPTIONS = [...optionsObj[term]];
    
    const selector = useSelector(state => state.terms[term]);
    const [selected, setSelected] = useState(selector);
    const dispatch = useDispatch();

    const clickHandler = (e) => {
        setSelected(e.target.value);
    }

    const setDispatch = (e) => {
        dispatch(actionCreator(e.target.value));
    }

    // termの先頭を大文字にする
    const termUpper = term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()

    return (
        <div className="flex justify-start sm:justify-center py-1 w-3/4 md:w-1/4">
            <label htmlFor={term} className="w-2/5 md:w-1/4 text-right text-base sm:text-lg px-2">{termUpper}: </label>
            <div className="w-1/2 text-black">
                <select id={term} name={term}
                    value={selected}
                    onChange={(e) => clickHandler(e)}
                    onBlur={(e) => setDispatch(e)}
                    className="inline-block self-center border border-stone-600 rounded p-1 w-full md:w-2/3 lg:1/2"
                >                    
                    {OPTIONS.map(opt => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>))
                    }
                </select>
            </div>
        </div>
    );
}