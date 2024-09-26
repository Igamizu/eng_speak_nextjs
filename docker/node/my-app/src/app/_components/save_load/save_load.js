'use client';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { LoadAsyncQuestions } from "lib/store/modules/questions";
import { LoadAsyncStatistics } from "lib/store/modules/statistics";
import { LoadAsyncMatl } from "lib/store/modules/terms";
import SlButton from "./sl_button";

const ENDPOINT = "/api/giu/save_slot"

export default function Save_load() {
    const [state, setState] = useState("");
    const setInput = (e) => {
        setState(prev => e.target.value);
    }
    const [isLoad, setIsLoad] = useState(false);

    const router = useRouter();
    const questionsSelector = useSelector(state => state.questions);
    const terms = useSelector(state => state.terms);
    const statistics = useSelector(state => state.statistics);
    const { matl } = terms;
    const { current, correct, incorrect } = statistics;
    const { questions } = questionsSelector;
    const dispatch = useDispatch();

    useEffect(() => {
        const setLoad = async () => {
            if (current && questions && isLoad) {
                router.push(`/questions/${questions[current - 1].key_value}?matl=${matl}`, { scroll: false });
            }
            isLoad && setIsLoad(prev => !prev);
        }
        setLoad();
    }, [isLoad])

    const loadSlot = async () => {
        await dispatch(LoadAsyncQuestions(state));
        await dispatch(LoadAsyncStatistics(state));
        await dispatch(LoadAsyncMatl(state));
        setIsLoad(prev => !prev);
    }

    const save = async () => {
        console.log(matl);
        const res = await fetch(ENDPOINT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: state, matl, current, correct, incorrect, questions })
        });
    }

    return (
        <div className="mt-5">
            <input type="text"
                value={state}
                onChange={e => setInput(e)}
                onBlur={e => setInput(e)}
                onKeyDown={e => setInput(e)}
                className="text-black p-1 mr-2 w-1/2 md:w-1/5"
            />
            <SlButton onClick={save}>Save</SlButton>
            <SlButton onClick={loadSlot}>Load</SlButton>
        </div>
    );
}