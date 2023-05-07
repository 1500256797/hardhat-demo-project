// 根据白名单地址生成merkle tree for airdrop
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { task } = require("hardhat/config");
const { utils } = require("ethers");


async function generateMerkle_1() {
    const users = [
        { address: "0x17FD7Ad13e95Da293c9084Ee126B4814373a5A1D", amount: 10 },
        { address: "0x242bb464FFC55a731f763D6FF67D4892d527A753", amount: 15 },
        { address: "0x34e66C5E4dad03e7Bc6069a9F8A35eb0D7e4FCf0", amount: 20 },
        { address: "0x8a9b4dDeC5A67cf102224A8ba5c1e0788808C08C", amount: 30 },
    ];

    // equal to MerkleDistributor.sol #keccak256(abi.encodePacked(account, amount));
    // leaf
    const leaf = users.map((x) =>
        utils.solidityKeccak256(["address", "uint256"], [x.address, x.amount])
    );
    // merkle tree
    const merkleTree = new MerkleTree(leaf, keccak256, { sortPairs: true });
    // root
    const root = merkleTree.getHexRoot();
    console.log("merkle树的叶子节点为", leaf + "\n ")
    console.log("merkle树为", merkleTree + "\n ")
    console.log("merkle树的根节点为", root+ "\n ");
    // 测试 第一个地址的证明
    const proof = merkleTree.getHexProof(leaf[0]);

    console.log("地址1的merkle树的证明为", proof);
    console.log("地址1的merkle树的证明为", merkleTree.getHexProof(leaf[0]));
    console.log("地址2的merkle树的证明为", merkleTree.getHexProof(leaf[1]));
    console.log("地址3的merkle树的证明为", merkleTree.getHexProof(leaf[2]));
    console.log("地址4的merkle树的证明为", merkleTree.getHexProof(leaf[3]));
}

async function generateMerkle_2() {
    const users = [
        "0xa5D36934830c903827C632c0031f56d6C43C992b",
        "0x00E2aC1299f4adf1AEd28F5A525cB537865Fa5aF",
        "0x1A6928C5CF34175F9AFb534AB85C42f6e8a2B77d",
        "0x3C1822D8A83192aCB07b7e540e074A274680b65C",
    ]

    // leaf
    const leaf = users.map((x) =>
        utils.solidityKeccak256(["address"], [x])
    );

    // merkle tree
    const merkleTree = new MerkleTree(leaf, keccak256, { sortPairs: true });
    // root
    const root = merkleTree.getHexRoot();

    console.log("merkle树的叶子节点为", leaf + "\n ")
    console.log("merkle树为", merkleTree + "\n ")
    console.log("merkle树的根节点为", root+ "\n ");
    // 测试 第一个地址的证明
    const proof = merkleTree.getHexProof(leaf[0]);

    console.log("地址1的merkle树的证明为", proof);
    console.log("地址1的merkle树的证明为", merkleTree.getHexProof(leaf[0]));
    console.log("地址2的merkle树的证明为", merkleTree.getHexProof(leaf[1]));
    console.log("地址3的merkle树的证明为", merkleTree.getHexProof(leaf[2]));
    console.log("地址4的merkle树的证明为", merkleTree.getHexProof(leaf[3]));

}

task("generateMerkle", "生成默克尔树，为了向白名单用户airdrop!  eg: npx hardhat generateMerkle")
    .setAction(async () => {
        // 地址+数量 用1
        // await generateMerkle_1();
        // 纯地址 用2
        await generateMerkle_2();
    }
);
