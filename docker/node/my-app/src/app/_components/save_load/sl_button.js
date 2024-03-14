export default function SlButton({ onClick, children }) {
    return (
        <>
            <button
                onClick={onClick}
                className="text-lg bg-black text-white py-1 px-2 mr-2 rounded-md hover:font-bold hover:bg-black transition-all duration-300"
            >
                {children}
            </button>
        </>
    );
}