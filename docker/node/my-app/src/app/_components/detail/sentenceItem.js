export default function SentenceItem({isShow = true, children}) {
    return (
        <>
            {isShow ? <h2 className={"pb-5 visible"}>{children}</h2> : <h2 className={"pb-5 invisible"}>{children}</h2>}
        </>
    );
}