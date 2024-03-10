'use client';
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function SearchPullDown ({ term, actionCreator }) {
    const optionsObj = {
        unit: [...Array(145)].map((_, i) => i + 1),
        genre: [
            "01_Past and Present", "02_Present perfect and past 1",
            "03_Present perfect and past 2", "04_Future", "05_Modals 1",
            "06_Modals 2", "07_If and wish Passive", "08_Reported speech Questions and auxiliary verbs",
            "09_-ing and to 1", "10_-ing and to 2", "11_Articles and nouns 1",
            "12_Articles and nouns 2", "13_Pronouns and determiners",
            "14_Relative clauses", "15_Adjectives and adverbs 1",
            "16_Adjectives and adverbs 2", "17_Conjunctions and prepositions",
            "18_Prepositions 1", "19_Prepositions 2", "20_Phrasal verbs", "21_Additional Exercises"
            ]
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
        <div className="flex justify-center w-1/4 py-1">
            <label htmlFor={term} className="w-1/4 text-right text-base sm:text-lg px-2">{termUpper}: </label>
            <div className="w-1/2 text-black">
                <select id={term} name={term}
                    value={selected}
                    onChange={(e) => clickHandler(e)}
                    onBlur={(e) => setDispatch(e)}
                    className="inline-block self-center border border-stone-600 rounded p-1 w-full md:w-2/3 lg:1/2"
                >
                    <option key={"%_%"} value={"%_%"}>未選択</option>
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