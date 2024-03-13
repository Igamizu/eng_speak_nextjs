'use client';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { LoadAsyncQuestions } from "lib/store/modules/questions";
import { LoadAsyncStatistics, initStatistics } from "lib/store/modules/statistics";

const ENDPOINT = "/api/giu/save_slot"

export default function Save_load() {
    const [state, setState] = useState("");
    const setInput = (e) => {
        setState(prev => e.target.value);
    }

    const router = useRouter();
    const questionsSelector = useSelector(state => state.questions);
    const statistics = useSelector(state => state.statistics);
    const { current, correct, incorrect } = statistics;
    const { questions } = questionsSelector;
    const dispatch = useDispatch();

    useEffect(() => {
        const setLoad = async () => {
            if (current && questions) {
                router.push(`/questions/${questions[current - 1].key_value}`, { scroll: false });
            }
        }
        setLoad();
    }, [statistics.status, questionsSelector.status])

    const loadSlot = () => {
        dispatch(LoadAsyncQuestions(state));
        dispatch(LoadAsyncStatistics(state));
    }

    const save = async () => {
        const res = await fetch(ENDPOINT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: state, current, correct, incorrect, questions})
        });
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
                onClick={save}
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