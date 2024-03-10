'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'next/navigation';
import { addAsyncQuestion } from "lib/store/modules/question";
import DetailQuestion from "@/app/_components/detail/detail"

export default function Detail() {
    const params = useParams();
    const { key_value } = params;
    const dispatch = useDispatch();

    const { questions } = useSelector(state => state.questions);
    const { question, status } = useSelector(state => state.question);

    useEffect(() => {
        const setQuestion = () => {
           dispatch(addAsyncQuestion(key_value)); 
        }
        setQuestion();
    } , [])

    return (
        <>
            <h3 className="text-center mt-3 text-2xl">{status !== "pending" ? "" : "Loading..."}</h3>
            {question && status !== "pending" ? <DetailQuestion {...question} key={question.key_value} /> : ""}
        </>
    );
}