// Phase 1

const connectBtn = document.getElementById('connectWalletBtn');
const walletAddressSpan = document.getElementById('walletAddress');
const ethBalanceSpan = document.getElementById('ethBalance');
const chainInfoSpan = document.getElementById('chainInfo');
const projectStatusDiv = document.getElementById('projectStatus');


let userAddress = null;

// ในฟังก์ชัน connectWallet
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];
      // ทำอย่างอื่นต่อ
      // Request wallet connection
        const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        walletAddressSpan.textContent = address;

        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Get balance
        const balance = await provider.getBalance(address);
        ethBalanceSpan.textContent = ethers.formatEther(balance) + " ETH";

        // Get chain info
        const network = await provider.getNetwork();
        chainInfoSpan.textContent = `${network.name} (Chain ID: ${network.chainId})`;

        connectBtn.disabled = true;
        connectBtn.textContent = 'Connected';
    } catch (err) {
      console.error(err);
    }
  } else {
    alert("Please install MetaMask");
    alert("Error connecting wallet: " + err.message);
  }
}
connectBtn.addEventListener('click', connectWallet);



// Phase 2

// const projects = [
//   { name: 'Base', apiKey: 'd0yPfEO09-du4BxyCNY7zp30N0Akj7ly', chain: 'base-mainnet' },
//   { name: 'ZKSync', apiKey: 'd0yPfEO09-du4BxyCNY7zp30N0Akj7ly', chain: 'zksync' },
//   { name: 'Starknet', apiKey: 'YOUR_COVALENT_API_KEY', chain: 'starknet-mainnet' },
//   { name: 'Linea', apiKey: 'd0yPfEO09-du4BxyCNY7zp30N0Akj7ly', chain: 'linea' },
//   { name: 'Scroll', apiKey: 'd0yPfEO09-du4BxyCNY7zp30N0Akj7ly', chain: 'scroll' },
// ];

// // ฟังก์ชันจำลองดึงข้อมูลกิจกรรม wallet จาก API (จริงๆต้องเรียก API จริง)
// async function fetchActivityStatus(project, walletAddress) {
//   // ตัวอย่าง API จาก Alchemy หรือ Covalent จะเรียกตาม project.chain และ walletAddress
//   // เช่น Alchemy NFT API หรือ Covalent transaction history API
//   // ตัวนี้จำลองผลลัพธ์:
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // จำลองสถานะ:
//       const statusOptions = [
//         'Never used',
//         'Used bridge',
//         'Staked tokens',
//         'Claimed airdrop',
//       ];
//       // สุ่มสถานะ
//       const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
//       resolve(randomStatus);
//     }, 500);
//   });
// }

// async function updateAirdropStatus(walletAddress) {
//   document.getElementById('airdropWallet').textContent = walletAddress;
//   const container = document.getElementById('projectsStatus');
//   container.innerHTML = '<p>Loading project statuses...</p>';

//   const statuses = await Promise.all(projects.map(p => fetchActivityStatus(p, walletAddress)));

//   container.innerHTML = '';
//   projects.forEach((project, i) => {
//     const div = document.createElement('div');
//     div.innerHTML = `<strong>${project.name}:</strong> ${statuses[i]}`;
//     container.appendChild(div);
//   });
// }

// async function connectWallet() {
//   // ... เชื่อม MetaMask แบบเดิม
//   const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });

//   // แสดงใน wallet info
//   walletAddressSpan.textContent = address;

//   // เรียก update airdrop status
//   updateAirdropStatus(address);
// }


// // More Phase 2

// const ALCHEMY_API_KEY = 'du4BxyCNY7zp30N0Akj7ly';
// const BASE_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`; // แก้ URL ตาม chain ที่ใช้งาน

// async function getTransactions(walletAddress) {
//   const url = `${BASE_URL}/getAssetTransfers?fromAddress=${walletAddress}&category=external,erc20,erc721&withMetadata=true&maxCount=10`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch transaction data');
//   }
//   const data = await response.json();
//   return data.transfers || [];
// }


// async function updateAirdropStatusWithAlchemy(walletAddress) {
//   document.getElementById('airdropWallet').textContent = walletAddress;
//   const container = document.getElementById('projectsStatus');
//   container.innerHTML = '<p>Loading transaction data from Alchemy...</p>';

//   try {
//     const transactions = await getTransactions(walletAddress);

//     if (transactions.length === 0) {
//       container.innerHTML = '<p>No transactions found.</p>';
//       return;
//     }

//     container.innerHTML = '<h3>Recent Transactions:</h3>';
//     transactions.forEach(tx => {
//       const div = document.createElement('div');
//       div.innerHTML = `
//         <p><strong>From:</strong> ${tx.from}</p>
//         <p><strong>To:</strong> ${tx.to}</p>
//         <p><strong>Asset:</strong> ${tx.asset || 'ETH'}</p>
//         <p><strong>Block:</strong> ${tx.blockNum}</p>
//         <hr />
//       `;
//       container.appendChild(div);
//     });

//   } catch (err) {
//     container.innerHTML = `<p>Error fetching data: ${err.message}</p>`;
//   }
// }


// async function connectWallet() {
//   const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
//   document.getElementById('walletAddress').textContent = address;

//   // เรียกฟังก์ชัน update status โดยใช้ Alchemy API
//   updateAirdropStatusWithAlchemy(address);
// }

// ===== Phase 1 code อยู่ข้างบน (connectWallet, getBalanceAndNetwork, etc.) =====

// รายชื่อโปรเจกต์ Layer 2 สำคัญพร้อม contract address จริง (ตัวอย่าง)
const projects = [
  {
    name: "Base",
    chainId: 8453,
    bridgeContracts: [
      "0x4200000000000000000000000000000000000006", // Base bridge contract ตัวอย่าง
    ],
    stakeContracts: [
      // สมมุติ contract stake base ถ้ามี
    ],
    claimUrl: "https://base.org/claim",
  },
  {
    name: "ZKSync",
    chainId: 324,
    bridgeContracts: [
      "0xDef1C0ded9bec7F1a1670819833240f027b25EfF", // ตัวอย่าง contract bridge ของ ZKSync
    ],
    stakeContracts: [],
    claimUrl: "https://zksync.io/airdrop",
  },
  {
    name: "Starknet",
    chainId: 324_000, // สมมุติ chainId, ต้องแก้เป็นจริงถ้ามี
    bridgeContracts: [],
    stakeContracts: [],
    claimUrl: "https://starknet.io/airdrop",
  },
  // เพิ่ม Linea, Scroll ตามต้องการ
];

// Mapping network ชื่อ Alchemy สำหรับ chainId
const networkNameMap = {
  1: "eth-mainnet",
  5: "eth-goerli",
  10: "optimism-mainnet",
  137: "polygon-mainnet",
  324: "zksync-mainnet",
  8453: "base-mainnet",
  // เพิ่มเติม
};

const ALCHEMY_API_KEY = 'k_W2-IidyICZ7h9c2AdhI';

// ดึง transactions ด้วย Alchemy API
async function getTransactions(chainId) {
  const networkName = networkNameMap[chainId];
  if (!networkName) return [];

  const url = `https://eth-${networkName}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

  // Alchemy Asset Transfers API
  const fetchUrl = `${url}/getAssetTransfers`;

  // Alchemy API รูปแบบ POST body
  const body = {
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromAddress: userAddress,
        category: ["external", "erc20", "erc721", "erc1155"],
        maxCount: "0x64", // 100 txs
        order: "desc",
      },
    ],
    id: 1,
  };

  try {
    const res = await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data.result.transfers || [];
  } catch (error) {
    console.error("Fetch tx failed:", error);
    return [];
  }
}

// ตรวจสอบกิจกรรมกับ contract ของแต่ละโปรเจกต์
async function checkProjectEligibility(project) {
  const txs = await getTransactions(project.chainId);

  let usedBridge = false;
  let usedStake = false;

  txs.forEach((tx) => {
    const toAddr = tx.to?.toLowerCase();
    if (project.bridgeContracts.map((c) => c.toLowerCase()).includes(toAddr)) {
      usedBridge = true;
    }
    if (project.stakeContracts.map((c) => c.toLowerCase()).includes(toAddr)) {
      usedStake = true;
    }
  });

  return { usedBridge, usedStake };
}

// แสดงผล eligibility ใน UI
async function loadAirdropStatus() {
  projectStatusDiv.innerHTML = "<p>Loading eligibility data...</p>";
  const statuses = await Promise.all(projects.map(checkProjectEligibility));
  projectStatusDiv.innerHTML = "";

  projects.forEach((project, idx) => {
    const { usedBridge, usedStake } = statuses[idx];

    const card = document.createElement("div");
    card.classList.add("airdrop-card");

    card.innerHTML = `
      <h3>${project.name}</h3>
      <p>Bridge used: <span class="status ${
        usedBridge ? "true" : "false"
      }">${usedBridge ? "Yes" : "No"}</span></p>
      <p>Stake used: <span class="status ${
        usedStake ? "true" : "false"
      }">${usedStake ? "Yes" : "No"}</span></p>
      <p>
        <a href="${project.claimUrl}" target="_blank" rel="noopener noreferrer">
          Claim / Details
        </a>
      </p>
    `;

    projectStatusDiv.appendChild(card);
  });
}

// ต่อจาก Phase 1 connectWallet เพิ่มเรียก loadAirdropStatus หลัง connect สำเร็จ
connectWalletBtn.addEventListener("click", async () => {
  await connectWallet();
  if (userAddress) {
    await loadAirdropStatus();
  } else {
    alert("Wallet not connected");
  }
});









// ต่อจาก Phase 2 

// Whale Tracker: โหลด transaction ขนาดใหญ่จาก Alchemy API
const _API_KEY = 'k_W2-IidyICZ7h9c2AdhI'; // ใส่ API Key จริงของคุณ
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${_API_KEY}`;

async function getBlockTimestamp(blockNumHex) {
  try {
    const res = await fetch(ALCHEMY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBlockByNumber',
        params: [blockNumHex, false]
      })
    });

    const data = await res.json();
    const timestampHex = data.result?.timestamp;
    if (!timestampHex) return 'ไม่ทราบเวลา';

    const timestamp = parseInt(timestampHex, 16) * 1000;
    return new Date(timestamp).toLocaleString();
  } catch (error) {
    return 'ไม่ทราบเวลา';
  }
}

async function loadWhaleTransactions() {
  const whaleTxList = document.getElementById('whaleTxList');
  whaleTxList.innerHTML = "กำลังโหลด...";

  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'alchemy_getAssetTransfers',
    params: [{
      fromBlock: '0x0',
      toBlock: 'latest',
      category: ['external', 'erc20'],
      maxCount: '0x64',
      minValue: '0x16345785d8a0000' // 0.1 ETH
    }]
  };

  try {
    const response = await fetch(ALCHEMY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const transfers = data.result?.transfers || [];

    if (transfers.length === 0) {
      whaleTxList.innerHTML = "ไม่พบข้อมูล Whale Transactions";
      return;
    }

    // ดึงเวลาของแต่ละ block
    const htmlList = await Promise.all(transfers.map(async tx => {
      const amount = Number(tx.value).toFixed(6);
      const time = await getBlockTimestamp(tx.blockNum);
      return `
        <div>
          <p><b>จาก:</b> ${tx.from}</p>
          <p><b>ถึง:</b> ${tx.to}</p>
          <p><b>จำนวน:</b> ${amount} ETH</p>
          <p><b>เวลา:</b> ${time}</p>
          <hr>
        </div>
      `;
    }));

    whaleTxList.innerHTML = htmlList.join('');
  } catch (err) {
    whaleTxList.innerHTML = `เกิดข้อผิดพลาด: ${err.message}`;
  }
}

// Testnet Farming - โหลด balance จาก testnet ต่าง ๆ
let isSwitching = false;
async function loadTestnetBalance() {
  if (isSwitching) return;
  isSwitching = true;
  
  const chain = document.getElementById('testnetSelect').value;
  const testnetBalanceDiv = document.getElementById('testnetBalance');
  testnetBalanceDiv.innerHTML = "กำลังโหลด...";

  if (!window.ethereum) {
    testnetBalanceDiv.innerHTML = "กรุณาติดตั้ง MetaMask หรือ wallet ที่รองรับ";
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];

    // เปลี่ยน chain ตาม testnet ที่เลือก (ต้องรองรับ MetaMask)
    const chainParams = {
      goerli: {
        chainId: '0x5',
        rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
      },
      sepolia: {
        chainId: '0xaa36a7',
        rpcUrls: ['https://rpc.sepolia.org'],
      },
      scroll: {
        chainId: '0x504', // ตัวอย่าง chainId scroll testnet
        rpcUrls: ['https://alpha-rpc.scroll.io/l2'],
      },
      linea: {
        chainId: '0x1234', // เปลี่ยนเป็น chainId จริงของ linea testnet
        rpcUrls: ['https://rpc.goerli.linea.build'],
      }
    };

    const params = chainParams[chain];

    try {
        try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: params.chainId }],
      });
    } catch (switchError) {
      // ถ้ายังไม่มี chain ใน MetaMask ให้เพิ่ม chain เข้าไปก่อน
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'SepoliaETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          });
    
          // หลังจากเพิ่มเสร็จ ให้ switch ไปอีกรอบ
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: params.chainId }],
          });
        } catch (addError) {
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
    } catch (switchError) {
    if (switchError.code === 4902) {
        // Chain ยังไม่ถูกเพิ่มใน MetaMask → ใช้ wallet_addEthereumChain
        try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
            chainId: params.chainId,
            chainName: {
                '0x5': 'Goerli Testnet',
                '0xaa36a7': 'Sepolia Testnet',
                '0x504': 'Scroll Alpha Testnet',
                '0x1234': 'Linea Testnet'
            }[params.chainId],
            rpcUrls: params.rpcUrls,
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
            },
            blockExplorerUrls: []
            }]
        });
        } catch (addError) {
        throw addError;
        }
    } else {
        throw switchError;
    }
    }


    // สร้าง provider เรียกดู balance (ใช้ ethers.js หรือ web3.js ได้ ถ้าอยากง่าย)
    // ตัวอย่างนี้ใช้ fetch แบบดิบ ๆ จาก RPC
    const balanceRes = await fetch(params.rpcUrls[0], {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: 1
      })
    });

    const balanceData = await balanceRes.json();
    const balanceWei = parseFloat(balanceData.result);
    const balanceEth = Number(balanceWei) / 1e18;

    testnetBalanceDiv.innerHTML = `Address: ${address}<br>Balance: ${balanceEth} ETH`;

  } catch(err) {
    testnetBalanceDiv.innerHTML = `เกิดข้อผิดพลาด: ${err.message}`;
  } finally {
    isSwitching = false;
  }
}

// บันทึกกิจกรรม farming ลง localStorage
function saveFarmLog() {
  const farmLog = document.getElementById('farmLog').value;
  if (!farmLog.trim()) {
    alert("กรุณากรอกข้อมูลกิจกรรมฟาร์ม");
    return;
  }
  localStorage.setItem('farmLog', farmLog);
  document.getElementById('farmLogStatus').innerText = "บันทึกเรียบร้อยแล้ว";
}

// โหลดกิจกรรมฟาร์มตอนโหลดเพจ
function loadFarmLog() {
  const savedLog = localStorage.getItem('farmLog');
  if (savedLog) {
    document.getElementById('farmLog').value = savedLog;
  }
}

// Event listeners
document.getElementById('loadWhaleTxBtn').addEventListener('click', loadWhaleTransactions);
document.getElementById('loadTestnetBalanceBtn').addEventListener('click', loadTestnetBalance);
document.getElementById('saveFarmLogBtn').addEventListener('click', saveFarmLog);

window.addEventListener('load', loadFarmLog);
