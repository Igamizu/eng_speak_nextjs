'use client';
import { useSelector } from "react-redux";
import SearchList from "./searchList";
import SearchButton from "./searchButton";
import Save_load from "../save_load/save_load";

export default function Form() {
    const terms = useSelector(state => state.terms);
    const questions = useSelector(state => state.questions);

    return (
        <>
            <div className="container mx-auto p-3 md:p-5">
                <form id="searchForm">
                    <div className="pb-2 md:pb-5">
                        <h2 className="text-center text-xl md:text-3xl font-bold">出題範囲指定</h2>
                    </div>
                    <SearchList />
                    <SearchButton/>
                </form>
                <Save_load />
            </div>
        </>
    );
}