'use client';
import { useSelector } from "react-redux";
import SearchList from "./searchList";
import SearchButton from "./searchButton";

export default function Form() {
    const terms = useSelector(state => state.terms);
    const questions = useSelector(state => state.questions);

    return (
        <>
            <div className="container mx-auto p-5">
                <form id="searchForm">
                    <div className="pb-5">
                        <h2 className="text-center text-3xl font-bold">出題範囲指定</h2>
                    </div>
                    <SearchList />
                    <SearchButton/>
                </form>
            </div>
        </>
    );
}