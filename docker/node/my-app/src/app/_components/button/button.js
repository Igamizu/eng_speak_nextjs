export default function Button({ children, onClick }) {
    return (
        <button onClick={onClick}
            className="p-5 rounded-lg bg-black hover:font-bold transition-all duration-300 mr-3">
            {children}
        </button>
    );
}