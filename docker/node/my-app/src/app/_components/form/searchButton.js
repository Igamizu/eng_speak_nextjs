import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addAsyncWithStatus } from "lib/store/modules/questions";
import { initStatistics } from "lib/store/modules/statistics";
import { useEffect, useState } from "react";

export default function SearchButton () {
    const router = useRouter();
    const terms = useSelector(state => state.terms);
    const questionsSelector = useSelector(state => state.questions);
    const dispatch = useDispatch();
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const setQuestions = async() => {
            console.log(isSearch);
            if(questionsSelector.status === "fulfilled" && isSearch) {
                const { questions } = questionsSelector;
                dispatch(initStatistics());
                router.push(`/questions/${questions[0].key_value}`, { scroll: false });
            }
        }
        setQuestions();
    }, [questionsSelector.status, isSearch]);

    const clickHandler = async (e) => {
        e.preventDefault();
        await dispatch(addAsyncWithStatus(terms));
        await dispatch(initStatistics());
        setIsSearch(prev => true);
    }

    return (
        <>
            <div className="flex justify-center pt-2 md:pt-5">
                <input type="submit" value="Apply"
                    onClick={(e) => clickHandler(e)}
                    className="text-base md:text-lg bg-black text-white p-2 md:p-3 mb-2 md:mb-3 rounded-md hover:font-bold hover:bg-black transition-all duration-300"
                />
            </div>
        </>
    );
}