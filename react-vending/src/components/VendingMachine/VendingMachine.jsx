import React, { useState } from 'react';
import './VendingMachine.styles.css';

import {vendingItems} from './VendingData'

const VendingMachine = () => {
    
    const items = vendingItems;
    const [currentItem, setCurrentItem] = useState(null);
    const [funds, setCurrentFunds] = useState(20.00)
    const [dispensed , setDispensed] = useState(null)

    function hadleSelection(item){
        setCurrentItem(item);
    }

    function pay(item) {

        if (dispensed) {
            alert('Please retrieve your item, before purchasing another')
            return;
        }
        
        if (item.stock < 1 ) {
            alert('item is sold out, please select a different item.')
            return;
        }

        if (funds < item.price) {
            alert('Not enough funds to purchase item.');
            return;
        }

        setCurrentFunds(funds - item.price);
        setDispensed(item);
    }

    function recharge() {
        setCurrentFunds(20)
    }

    return (
        <>
            <div className='funds' >Wallet: ${funds.toFixed(2)}</div>
            <button className='recharge' onClick={recharge}>Recharge</button>
            <div className='vending-machine-body'>
            
                <div className='items-container'>
                    {
                        Object.keys(items).map((item, index) => (
                            <div 
                                key={index} 
                                style={{backgroundImage:`url(${items[item].img})`}} 
                                className='vending-item'
                                onClick={() =>hadleSelection(items[item])}>
                            </div>
                        ))
                    }
                </div>

                <div className='payment-container'>
                    <span className='thank-you'>Thank You</span>
                    <div className='display'>
                        {
                            currentItem && currentItem.stock > 0 ?
                            <p>${currentItem.price.toFixed(2)}</p>
                            : 'SOLD OUT'
                        }
                        
                    </div>
                        <button className='pay-btn' onClick={() => pay(currentItem)}>Purchase</button>
                </div>
                <div className='item-door'>
                    <div 
                        className='dispensed-item' 
                        style={ dispensed ? {backgroundImage: `url(${dispensed.img})`}: null }
                        onClick={() => setDispensed(null)}
                    ></div>
                </div>
            </div>
        </>
    )
};

export default VendingMachine;
