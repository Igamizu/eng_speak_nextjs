import { useSelector } from "react-redux";
import SentenceItem from "./sentenceItem";

export default function SentenceList({ lang, onClick, isShow }) {
    const { question } = useSelector(state => state.question);
    const { japanese, eng1, eng2, eng3 } = question;
    const eng = [eng1, eng2, eng3];

    return (
        <>
            <div onClick={onClick}
                className="p-5 md:p-10 border rounded-lg mb-4"
            >
            {lang === "ja" && <SentenceItem>{japanese}</SentenceItem>}
            {lang === "en" && eng.map(_eng => <SentenceItem isShow={isShow}>{_eng}</SentenceItem>)}
            </div>
        </>
    );
}