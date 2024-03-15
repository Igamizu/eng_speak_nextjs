export default function Button({ children, onMouseDown, onClick, className }) {
    return (
        <button onClick={onClick} onMouseDown={onMouseDown}
            className={"text-base w-32 md:text-4xl p-2 md:p-5 rounded-lg bg-black hover:font-bold transition-all duration-300 mr-3 " + className}>
            {children}
        </button>
    );
}