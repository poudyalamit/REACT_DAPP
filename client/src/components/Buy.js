import React from 'react'
import { ethers } from 'ethers';
const Buy = ({ state }) => {
    const buyChiya = async (e) => {
        e.preventDefault();
        const { contract } = state;
        const name = document.querySelector('#name').value;
        const message = document.querySelector('#message').value;
        // console.log(name, message, contract);
        try {
            const amount = { value: ethers.parseEther("0.01") };
            const transaction = await contract.buy(name, message, amount);
            await transaction.wait();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
            <form onSubmit={buyChiya}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder='Enter Your Name'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <input type="text" className="form-control" id="message" placeholder='Enter Your Message'/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!state.contract}>Pay</button>
            </form>
        </div>
        </>
    )
}

export default Buy
