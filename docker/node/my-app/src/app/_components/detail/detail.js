'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { initStatistics, setCorrect, setIncorrect } from "lib/store/modules/statistics";
import { setQuestionCorrect, setQuestionIncorrect, filterQuestionsIncorrect } from "lib/store/modules/questions";
import Button from "../button/button";
import EmptyButton from "../button/emptyButton";
import SentenceList from "./sentenceList";

export default function Detail({ key_value, isRetry, setRetry }) {
    const router = useRouter();
    const disptach = useDispatch();
    const [isShow, setIsShow] = useState(false);
    const [cCorrect, set_cCorrect] = useState(false);
    const [cIncorrect, set_cIncorrect] = useState(false);

    const terms = useSelector(state => state.terms);
    const { matl } = terms;

    const statistics = useSelector(state => state.statistics);
    const { questions } = useSelector(state => state.questions);
    const { total, current, incorrect } = statistics;

    useEffect(() => {
        if (questions && current) {
            set_cCorrect(questions[current - 1].correct);
            set_cIncorrect(questions[current - 1].incorrect);
        }
        isRetry && setRetry(prev => !prev);
    }, [current, isRetry])

    const answered = () => {
        if (!cCorrect && !cIncorrect) {
            disptach(setCorrect(1));
        }
        else if (cCorrect && !cIncorrect) {
            disptach(setCorrect(-1));
        }
        else if (!cCorrect && cIncorrect) {
            disptach(setCorrect(1));
            set_cIncorrect(prev => !prev);
            disptach(setQuestionIncorrect(current - 1));
            disptach(setIncorrect(-1));
        }
        set_cCorrect(prev => !prev);
        disptach(setQuestionCorrect(current - 1));
    }

    const mistaken = () => {
        if (!cCorrect && !cIncorrect) {
            disptach(setIncorrect(1));
        }
        else if (!cCorrect && cIncorrect) {
            disptach(setIncorrect(-1));
        }
        else if (cCorrect && !cIncorrect) {
            disptach(setIncorrect(1));
            set_cCorrect(prev => !prev);
            disptach(setQuestionCorrect(current - 1));
            disptach(setCorrect(-1));
        }
        set_cIncorrect(prev => !prev);
        disptach(setQuestionIncorrect(current - 1));
    }

    const setNext = () => {
        if (questions && total !== current) {
            router.push(`/questions/${questions[current].key_value}?matl=${matl}`, { scroll: false });
        }
    }
    const setPrevious = () => {
        if (questions && current !== 1) {
            router.push(`/questions/${questions[current - 2].key_value}?matl=${matl}`, { scroll: false });
        }
    }

    const setFirst = () => {
        if (questions && current !== 1) {
            router.push(`/questions/${questions[0].key_value}?matl=${matl}`, { scroll: false });
        }
    }

    const set10plus = () => {
        if (questions && total !== current) {
            if (current + 9 < total) {
                router.push(`/questions/${questions[current + 9].key_value}?matl=${matl}`, { scroll: false });
            } else if (current + 9 >= total) {
                router.push(`/questions/${questions[total - 1].key_value}?matl=${matl}`, { scroll: false });
            }
        }   
    }

    const set10minus = () => {
        if (questions && current !== 1) {
            if (current - 11 > 1) {
                router.push(`/questions/${questions[current - 11].key_value}?matl=${matl}`, { scroll: false });
            } else if (current -11 <= 1) {
                router.push(`/questions/${questions[0].key_value}?matl=${matl}`, { scroll: false });
            }
        }
    }

    const incorrectSet = () => {
        const payload = [...questions];
        disptach(filterQuestionsIncorrect(payload));
    }

    const retry = () => {
        disptach(initStatistics());
        setRetry(prev => !prev);
        router.refresh();
        router.push(`/questions/${questions[0].key_value}?matl=${matl}`, { scroll: false });
    }

return (
    <div className="container mx-auto text-xl md:text-4xl">
        <div className="pb-2 md:py-7">
            <p>
                {cCorrect ? <span className="text-red-600 font-bold">正解: </span>: ""}
                {cIncorrect ? <span className="text-blue-600 font-bold">不正解: </span>: ""}
                {key_value}
            </p>
        </div>
        <SentenceList lang="ja" key="ja" />
        <SentenceList lang="en" key="en" onClick={() => setIsShow(prev => !prev)} isShow={isShow} />
        <div className="flex flex-row justify-center pb-2">
            <Button onClick={setFirst}>初</Button>
            {current > 1 ? <Button onClick={setPrevious}>前</Button> : <EmptyButton />}
            {current !== total ? <Button onClick={setNext}>次</Button> : <EmptyButton />}
            <Button onClick={answered} className={"text-red-600"}>〇</Button>
            <Button onClick={mistaken} className={"text-blue-600"}>×</Button>
            {incorrect > 0 ? <Button onMouseDown={incorrectSet} onClick={retry} className={"text-blue-600"}>復</Button> : <EmptyButton />}
        </div>
        <div className="flex flex-row justify-center pb-5">
            <Button onClick={set10plus}>10+</Button>
            <Button onClick={set10minus}>10-</Button>
            <EmptyButton />
            <EmptyButton />
            <EmptyButton />
            <EmptyButton />
        </div>
    </div>
);
}