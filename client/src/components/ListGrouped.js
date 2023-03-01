import React from "react";

export const ListGrouped = (operations) => {
    if ( Array.isArray(operations.operations)) {
        return (
            <table>
                <tr>
                    <th>Number</th>
                    <th>Bank</th>
                    <th>Place</th>
                    <th>Count transactions</th>
                    <th>Total cash</th>
                </tr>
                {operations.operations.map(op => {
                    return (
                        <tr key={op.id}>
                            <th>{op.number}</th>
                            <th>{op.bank_name}</th>
                            <th>{op.place}</th>
                            <th>{op.count}</th>
                            <th>{op.cash}</th>
                        </tr>
                    )
                })}
            </table>)
    } else {
        return (
            <table>
                <tr>
                    <th>Number</th>
                    <th>Bank</th>
                    <th>Place</th>
                    <th>Count transactions</th>
                    <th>Total cash</th>
                </tr>
            </table>
        )
    }
}