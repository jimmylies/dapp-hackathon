const MAX_STAKE_PSP = 500000;
const DELEGATE_PART = 30000;

function adjustment(stakedPSP) {
    const a = (0.003 / 245000);
    const b = -(0.765 / 245000);
    return (a * stakedPSP + b);
}

function stake_part(staker, stakedPSP) {
    const capped_stakedPSP = Math.min(stakedPSP, MAX_STAKE_PSP);
    return (capped_stakedPSP / 10000 * 0.0065 + adjustment(capped_stakedPSP));
}

function reward_staker(delegate_part, staker, stakedPSP) {
    return (Math.min(delegate_part, DELEGATE_PART) * stake_part(staker, stakedPSP));
}

function delegate(stakers, stakedPSP, delegate_parts) {
    const rewards = [];
    stakers.forEach((staker, index) => {
        rewards[index] = reward_staker(delegate_parts[index], staker, stakedPSP[index]);
        console.log(`${staker} will receive ${rewards[index]} by staking ${stakedPSP[index]} PSP and delegating ${delegate_parts[index]} PSP`);
    });
    console.log("Total reward: " + rewards.reduce((partialSum, a) => partialSum + a, 0));
    return rewards;
}

export { delegate };
