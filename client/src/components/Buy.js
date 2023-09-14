import React from 'react'
import { ethers } from 'ethers';
const Buy = ({ state }) => {
    const buyChai = async (e) => {
        e.preventDefault();
        const { contract } = state;
        const name = document.querySelector('#name').value;
        const message = document.querySelector('#message').value;
        console.log(name, message, contract);
        const amount = { value: ethers.parseEther("0.001") }
        const transaction = await contract.buy(name, message, amount);
        await transaction.wait();
        console.log("done");
    }
    return (
        <div>
            <form onSubmit={buyChai}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder='Enter Your Name' />
                <label htmlFor="message">Message</label>
                <input type="text" id="message" placeholder='Enter Your Message' />
                <button type="submit">Pay</button>
            </form>
        </div>
    )
}

export default Buy
