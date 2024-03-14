import { useSelector } from "react-redux";

export default function Statistics() {
    const statistics = useSelector(state => state.statistics);
    const { total, current, correct, incorrect } = statistics;

    return (
        <div className="container mx-auto p-3 md:p-10 border border-white rounded-md text-base md:text-4xl">
            <div className="flex justify-center space-x-2 md:space-x-10">
                <p>total: {total}</p>
                <p>current: {current}</p>
                <p>correct: {correct}</p>
                <p>incorrect: {incorrect}</p>
            </div>
        </div>
    );
}