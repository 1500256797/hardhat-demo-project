const { task } = require("hardhat/config");
var axios = require("axios").default;
// 阻塞模式，只能一个请求得到响应后再发起下一个请求。---单线程版
async function makeRequests() {
    for(let i = 0; i < 100000; i++) {
    console.log("查询第" + i + "次")
    try {
        const response = await axios.get('https://api.foxe.vip/api/merkle/0x5CAbc55b6e6fd5a2aB8B37e36bA1Bbeac60cfE12');
        if(response.status.toString().startsWith("5")) {
            console.log("code:server error")
            continue
        }
        console.log(response.data);
    } catch (error) {
        console.error('错误');
        }
    }
}

// 异步模式，同时发出多个异步请求并等待所有请求都完成，然后一次性处理所有的响应结果。---单线程
async function makeRequests_promise(address) {
    const requests = [];
    for (let i = 0; i < 1000; i++) {
        requests.push(
            axios
                .get(`https://api.foxe.vip/api/merkle/${address}`)
                .then((response) => {
                    if (response.status.toString().startsWith("2")) {
                        return { success: true, status: response.status, data: data };
                    } 
                }).catch((errorObj) => {
                    // 由于网络等因素，请求失败时，errorObj.response可能为null
                    if (errorObj.response!=null && errorObj.response.status.toString().startsWith("4")) {
                        return { success: false, status: errorObj.response.status, data: errorObj.response.data };
                    }else if (errorObj.response!=null && errorObj.response.status.toString().startsWith("5")){
                        return { success: false, status: errorObj.response.status, data: "502: Bad gateway" };
                    }
                })
        );
    }// for end

    const results = await Promise.all(requests);

    for (let [index, result] of results.entries()) {
        if (!result) {
            console.log(`第 ${index} 次请求出错`);
            continue;
        }
        if (result.success) {
            console.log("第" + index + "次请求成功！状态码为", result.status, "结果为:", result.data);
        } else {
            console.log("第" + index + "次请求出错！状态码为", result.status, "结果为:", result.data);
        }
    }
}


task("merkle", "查询merkle树 eg: npx hardhat merkle --address 0x356faDD245d35ff8F1a207aC83BE7EEa911abeEE")
.addParam("address", "钱包地址")
.setAction(async taskArgs => {
    console.log("开始查询merkle树")
    // await makeRequests()
    await makeRequests_promise(taskArgs.address)
});

module.exports = {};




