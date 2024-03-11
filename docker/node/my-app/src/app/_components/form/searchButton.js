import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addAsyncWithStatus } from "lib/store/modules/questions";
import { initStatistics } from "lib/store/modules/statistics";
import { useEffect } from "react";

export default function SearchButton () {
    const router = useRouter();
    const terms = useSelector(state => state.terms);
    const questionsSelector = useSelector(state => state.questions);
    const dispatch = useDispatch();

    useEffect(() => {
        const setQuestions = async() => {
            if(questionsSelector.status === "fulfilled") {
                const { questions } = questionsSelector;
                dispatch(initStatistics());
                router.push(`/questions/${questions[0].key_value}`);
            }
        }
        setQuestions();
    }, [questionsSelector.status]);

    const clickHandler = (e) => {
        e.preventDefault();
        dispatch(addAsyncWithStatus(terms));
    }

    return (
        <>
            <div className="flex justify-center pt-5">
                <input type="submit" value="Apply"
                    onClick={(e) => clickHandler(e)}
                    className="text-lg bg-black text-white p-3 rounded-md hover:font-bold hover:bg-black transition-all duration-300"
                />
            </div>
        </>
    );
}