'use client';
import { useState } from "react";

export default function Detail({ key_value, japanese, eng1, eng2, eng3 }) {
    const [isShow, setIsShow] = useState(false);

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
                <h2 className="pb-5">{isShow && eng2 ? eng2 : <br></br>}</h2>
                <h2 className="pb-5">{isShow && eng3 !== "\r" ? eng3 : <br></br>}</h2>
            </div>
            <div className="pb-10">
                <button onClick={() => setIsShow(prev => !prev)}
                    className="p-5 border rounded-lg bg-black hover:font-bold transition-all duration-300">
                        英文表示
                </button>
            </div>
        </div>
    );
}