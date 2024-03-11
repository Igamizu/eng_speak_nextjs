'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCorrect, setIncorrect } from "lib/store/modules/statistics";
import Button from "../button/button";

export default function Detail({ key_value, japanese, eng1, eng2, eng3}) {
    const router = useRouter();
    const disptach = useDispatch();
    const [isShow, setIsShow] = useState(false);
    const [cCorrect, set_cCorrect] = useState(false);
    const [cIncorrect, set_cIncorrect] = useState(false);

    const statistics = useSelector(state => state.statistics);
    const { questions } = useSelector(state => state.questions);
    const { total, current } = statistics;

    const setNext = () => {
        if (questions && total !== current) {
            router.push(`/questions/${questions[current].key_value}`);
        }
    }
    const setPrevious = () => {
        if (questions && current !== 1) {
            router.push(`/questions/${questions[current - 2].key_value}`);
        }
    }

    const answered = () => {
        if(!cCorrect && !cIncorrect) {
            disptach(setCorrect(1));
        } 
        else if(cCorrect && !cIncorrect) {
            disptach(setCorrect(-1));
        }
        else if(!cCorrect && cIncorrect) {
            disptach(setCorrect(1));
            set_cIncorrect(prev => !prev);
            disptach(setIncorrect(-1));
        }
        set_cCorrect(prev => !prev);
    }

    const mistaken = () => {
        if(!cCorrect && !cIncorrect) {
            disptach(setIncorrect(1));
        }
        else if(!cCorrect && cIncorrect) {
            disptach(setIncorrect(-1));
        }
        else if(cCorrect && !cIncorrect) {
            disptach(setIncorrect(1));
            set_cCorrect(prev => !prev);
            disptach(setCorrect(-1));
        }
        set_cIncorrect(prev => !prev)
    }


    return (
        <div className="container mx-auto text-4xl">
            <div className="py-7">
                <p>{key_value}</p>
            </div>
            <div className="p-10 border rounded-lg mb-4">
                <h2>{japanese}</h2>
            </div>
            <div className="p-10 border rounded-lg mb-4">
                <h2 className="pb-5">{isShow && eng1 ? eng1 : <br></br>}</h2>
                {/* <h2 className="pb-5">{isShow ? eng2 : <br></br>}</h2>
                <h2 className="pb-5">{isShow ? eng3 : <br></br>}</h2> */}
            </div>
            <div className="flex pb-10">
                <Button onClick={() => setIsShow(prev => !prev)}>英文表示</Button>
                <Button onClick={setPrevious}>前の問題</Button>
                <Button onClick={setNext}>次の問題</Button>
                <Button onClick={answered}>正解カウント</Button>
                <Button onClick={mistaken}>不正解カウント</Button>
            </div>
        </div>
    );
}