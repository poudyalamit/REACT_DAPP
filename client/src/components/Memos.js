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
    return (
        <>
            <p style={{ textAlign: "center", marginTop: "20px" }}>Messages</p>
            {memos.map((memo) => {
                return (
                    <div
                        className="container-fluid"
                        style={{ width: "100%" }}
                        key={Math.random()}
                    >
                        <table
                            style={{
                                marginBottom: "10px",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            backgroundColor: "#96D4D4",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "300px",
                                        }}
                                    >
                                        {memo.name}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#96D4D4",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "300px",
                                        }}
                                    >
                                        {memo.message}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#96D4D4",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "400px",
                                        }}
                                    >
                                        {memo.from}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#96D4D4",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "600px",
                                        }}
                                    >
                                        {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </>
    );
}

export default Memos;