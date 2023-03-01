import React from "react";

export const ListCurGrouped = (operations) => {
    if ( Array.isArray(operations.operations)) {
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Total sum</th>
                    <th>Count transactions</th>
                    <th>Total sum in rub</th>
                </tr>
                {operations.operations.map(op => {
                    return (
                        <tr key={op.id}>
                            <th>{op.name}</th>
                            <th>{op.sum}</th>
                            <th>{op.count}</th>
                            <th>{Math.round(op.rub)}</th>
                        </tr>
                    )
                })}
            </table>)
    } else {
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Total sum</th>
                    <th>Count transactions</th>
                    <th>Total sum in rub</th>
                </tr>
            </table>
        )
    }
}