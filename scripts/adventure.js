const { ethers } = require("hardhat")

const abi = require("./abis/rarity-abi.js")

async function main() {
  const rarityAddress = "0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb"
  const signer = ethers.provider.getSigner(process.env.RARITY_WALLET_ADDRESS)
  const rarity = new ethers.Contract(rarityAddress, abi, signer)

  let n = await signer.getTransactionCount()

  console.log(n)

  // EDIT THIS LIST WITH YOU SUMMON ID'S
  const summons = [558645, 713627, 713653, 713705, 713729, 727888]

  for (let i = 0; i < summons.length; i++) {
    let overrides = { nonce: n, gasLimit: 100000 }
    let s = summons[i]

    await rarity.adventure(s, overrides)
    console.log("Adventured summon #" + s)
    n += 1
  }
}

setInterval(async () => {
  try {
    await main()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}, 1000 * 60 * 60 * 24)
