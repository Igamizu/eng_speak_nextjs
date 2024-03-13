'use client';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { LoadAsyncQuestions } from "lib/store/modules/questions";
import { LoadAsyncStatistics, initStatistics } from "lib/store/modules/statistics";

export default function Save_load() {
    const [state, setState] = useState("");
    const setInput = (e) => {
        setState(prev => e.target.value);
    }

    const router = useRouter();
    const questionsSelector = useSelector(state => state.questions);
    const statistics = useSelector(state => state.questions);
    const dispatch = useDispatch();


    useEffect(() => {
        const setLoad = async () => {
            const { current } = statistics;
            const { questions } = questionsSelector;

            if(current && questions){
                router.push(`/questions/${questions[current - 1].key_value}`);
            }
        }
        setLoad();
    }, [statistics.status, questionsSelector.status])

    const loadSlot = () => {
        dispatch(LoadAsyncQuestions(state));
        dispatch(LoadAsyncStatistics(state));
    }

    return (
        <>
            <input type="text"
                value={state}
                onChange={e => setInput(e)}
                onBlur={e => setInput(e)}
                onKeyDown={e => setInput(e)}
                className="text-black p-1 mr-2"
            />
            <button
                className="text-lg bg-black text-white py-1 px-2 mr-2 rounded-md hover:font-bold hover:bg-black transition-all duration-300"
            >
                Save
            </button>
            <button
                onClick={loadSlot}
                className="text-lg bg-black text-white py-1 px-2 mr-2 rounded-md hover:font-bold hover:bg-black transition-all duration-300"
            >
                Load
            </button>
        </>
    );
}