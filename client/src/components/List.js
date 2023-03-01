import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {blockOp, } from "../actions/opAction";

export const List = (operations) => {
    const isSuperUser = useSelector(state => state.auth.isSuperUser)
    const dispatch = useDispatch()
    if ( Array.isArray(operations.operations)) {
        return (
            <table>
                <tr>
                    <th>Account</th>
                    <th>Card</th>
                    <th>Atm</th>
                    <th>Value</th>
                    <th>Currency</th>
                    <th>Place</th>
                    <th>Blocking</th>
                </tr>
                {operations.operations.map(op => {
                    return (
                            <tr key={op.id}>
                                <th>{op.account_id}</th>
                                <th>{op.card_id}</th>
                                <th>{op.atm_id}</th>
                                <th>{op.value}</th>
                                <th>{op.name}</th>
                                <th>{op.place}</th>
                                {isSuperUser &&
                                    <th className="blocked"
                                        onClick={(index) => dispatch(blockOp(op.id))}>{op.blocked ? "YES" : "NO"}</th>
                                }
                                {!isSuperUser &&
                                    <th className="blocked">{op.blocked ? "YES" : "NO"}</th>
                                }
                            </tr>
                        )
                })}
            </table>)
    } else {
        return (
            <table>
                <tr>
                    <th>Account</th>
                    <th>Card</th>
                    <th>Atm</th>
                    <th>Value</th>
                    <th>Currency</th>
                    <th>Place</th>
                    <th>Blocking</th>
                </tr>
            </table>
        )
    }
}