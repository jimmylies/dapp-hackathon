function swappersRefund(swappers, gasSpentPerSwapper, volumeToRefund) {
    const swappersRefund = [];
    const totalGas = gasSpentPerSwapper.reduce((partialSum, b) => partialSum + b, 0);
    let unusedPSP;
    swappers.forEach((swapper, index) => {
        const refund = volumeToRefund * gasSpentPerSwapper[index] / totalGas;
        const maxSwapperRefund = Math.min(gasSpentPerSwapper[index], refund);
        if (refund > gasSpentPerSwapper[index]) {
            swappersRefund.push(maxSwapperRefund);
            unusedPSP += refund - maxSwapperRefund;
        } else {
            swappersRefund.push(refund);
        }
        swappersRefund.push(refund);
        console.log(`${swapper} will receive $${refund}`);
    });
    if (unusedPSP > 0) {
        console.log(`Unused refunds: $${unusedPSP}`);
    }
    return swappersRefund;
}

export {swappersRefund};

/*

9 è 17% ?
intégrabilité facile pour prendre de l'avance sur le concurrent OneInch
 */
