import React, {useState} from 'react'
import "../styles/button&menu.css"


export const List = ({ops, blockOp, date}) => {
    const blockHandler = async (event, opId) => {
        //event.preventDefault()
        try {
            blockOp(opId)
        } catch (e) { console.log(e) }
    }
    ops = ops.filter(op => op.date.day === date.day)
    return (

        <ul className="collection">
            <table>
                <caption></caption>
                <tr>
                    <th>Account</th>
                    <th>Card</th>
                    <th>Atm</th>
                    <th>Value</th>
                    <th>Currency</th>
                    <th>Place</th>
                </tr>
                {ops.map(op => (
                    <tr>
                    <th>{op.account_id}</th>
                    <th>{op.card_id}</th>
                    <th>{op.atm_id}</th>
                    <th>{op.value}</th>
                    <th>{op.name}</th>
                    <th>{op.place}</th>
                        <th>{op.blocked}</th>

                    </tr>
                    ))}
            </table>
        </ul>

    )
}