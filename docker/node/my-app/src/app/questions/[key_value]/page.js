'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'next/navigation';
import { addAsyncQuestion } from "lib/store/modules/question";
import { setCurrent, setTotal } from "lib/store/modules/statistics";
import DetailQuestion from "@/app/_components/detail/detail"
import Statistics from "@/app/_components/detail/statistics";

export default function Detail() {
    const params = useParams();

    const { key_value } = params;
    const dispatch = useDispatch();
    const [isRetry, setRetry] = useState(false);

    const { questions } = useSelector(state => state.questions);
    const { question, status } = useSelector(state => state.question);
    const questionsKey = questions ? questions.map(_question => _question.key_value) : [];
    const statistics = useSelector(state => state.statistics);

    useEffect(() => {
        const setQuestion = async () => {
            await dispatch(addAsyncQuestion(key_value));
        }
        setQuestion();
        questions && dispatch(setTotal(questions.length));
    } , [])

    useEffect(() => {
        if(status === "fulfilled") {
            const index = questionsKey.indexOf(question.key_value);
            dispatch(setCurrent(index + 1));
        }
        isRetry && dispatch(setTotal(questions.length));
        isRetry && setRetry(prev => !prev);
    }, [status, isRetry])

    return (
        <>
            <Statistics />
            <h3 className="text-center mt-3 text-2xl">{status !== "pending" ? "" : "Loading..."}</h3>
            {question && status !== "pending" ? <DetailQuestion {...question} key={question.key_value} isRetry={isRetry} setRetry={setRetry} /> : ""}
        </>
    );
}