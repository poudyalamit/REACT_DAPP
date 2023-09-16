import { useState, useEffect } from "react";

const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const memosMessages = async () => {
            const memos = await contract.get();
            setMemos(memos);
        }
        contract && memosMessages();
    }, [contract])
    return <>
        <p>Messages:</p>
        {memos.map((memo) => {
            return (
                <table key={memo.timestamp}>
                    <tbody>
                        <tr>
                            <td>{memo.name}</td>
                            <td>{memo.from}</td>
                            <td>{String(memo.timestamp)}</td>
                            <td>{memo.message}</td>
                        </tr>
                    </tbody>
                </table>
            )
        })}
    </>
}

export default Memos;