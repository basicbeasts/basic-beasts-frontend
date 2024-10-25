import type { NextPage } from "next"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { query } from "@onflow/fcl"
import "react-toastify/dist/ReactToastify.css"
import ChestRankingList from "@components/ui/ChestRankingList"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Container = styled.div`
  background: black;
  color: white;
  // height: 3000px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1em;
  text-align: center;
  padding: 70px 0 100px;
`

const chestData = [
  {
    rankByTotalBeasts: 1,
    address: "0xb1da287e72470bf5",
    name: "ms",
    findName: "",
    numberOfBeastsCollected: 2,
  },
  {
    rankByTotalBeasts: 2,
    address: "0xb1da287e72470bbb",
    name: "Dense16",
    findName: "",
    numberOfBeastsCollected: 1,
  },
]

/*
  1. Use whitelist addresses 800+ check for chest collection and sale collection
  2. Count the numbers of chest and sale ids and add them together - Careful of null values.
  3. get .find profiles
  4. sort and rank them
  5. add the data
  6. add the usernames
*/

const ChestRankings: NextPage = () => {
  const [rankingsData, setRankingsData] = useState<any>([])

  useEffect(() => {
    var addresses: any = [
      "0x1a34cb2b01340e1a",
      "0x3c75ba818f26f705",
      "0xe64c7f460b03d67b",
      "0xda0dd4af82f8506d",
      "0x232a3718b6df6b26",
      "0x12fbebe1e75cb846",
      "0xba1e1f6d764c034c",
      "0x653678e59972c0c7",
      "0x4eafc975bfc8806d",
      "0xb1da287e72470bf5",
      "0xe1cfe1ba997b5aac",
      "0x4a9710bf56a16ce9",
      "0x36cd07c7f30ab286",
      "0x29f293731fe0b0d6",
      "0xee1558af21b66f03",
      "0x4ceb2bd63278e64b",
      "0xabeaee10735a1c27",
      "0x0017a3b1aba046a0",
      "0x002c479c5c9eb30f",
      "0x004435fe2f85a7ef",
      "0x01d63aa89238a559",
      "0x024c55d07ccfa3b0",
      "0x04f6e4bcf6d0853d",
      "0x061b18e65d103d67",
      "0x06ca672e162254fe",
      "0x080333474695ab2a",
      "0x0927b4c5224c547a",
      "0x092aa9b5083dcba6",
      "0x095579673d08c87b",
      "0x0afd9a93e2dfd5b5",
      "0x0d01c3b6e40d77da",
      "0x0e4890041b8ab02c",
      "0x128c21b9d239b34c",
      "0x12f6eaad8e737997",
      "0x15bbfcb5329b3f58",
      "0x16cedd8f91216f91",
      "0x18d7e8fd44629257",
      "0x19d2c747e331e55b",
      "0x1bc31aaa579214dc",
      "0x1be00b14dcaf2bcc",
      "0x1cd4e1008b86405c",
      "0x1d2059b5c36f854d",
      "0x1de30f4696f609ac",
      "0x1e75fdb1215bd249",
      "0x1e80699a42df6b84",
      "0x1f1f10741b9283fa",
      "0x22279acadcce4301",
      "0x22ccbd9a65caed82",
      "0x2322601d66f491d0",
      "0x2ce52a606595a856",
      "0x2d712e51aed08530",
      "0x2dacf0a391e3963a",
      "0x2e30e2b632c5127d",
      "0x2fc20028c489836a",
      "0x31b734c8bbe5aaf3",
      "0x33548e028557e725",
      "0x337bf11954a327d1",
      "0x3538ec87e9a5c463",
      "0x36e444c6c0e45eaf",
      "0x381f7dab36d1035b",
      "0x384f7105f450c8d1",
      "0x388bd5fba5d21031",
      "0x3b3c2333962c08ae",
      "0x3dd205c8c4e66e7f",
      "0x402b310fada88d86",
      "0x408a32b316f97417",
      "0x408a44b92dd0d969",
      "0x414e98b58f8b1c3f",
      "0x4240c81f5ef41dc5",
      "0x42f26b36c23ba924",
      "0x452142687484883a",
      "0x469ebc88d31b039d",
      "0x4cffe3ca74303176",
      "0x50c1cf534dee6e0a",
      "0x512140283f6c029c",
      "0x51674711ecf38fb1",
      "0x51916e9d3aa7ca11",
      "0x51f7d6e1f51299c9",
      "0x528f0b23eb7befdb",
      "0x534b38c652958192",
      "0x53eb546c815a91cc",
      "0x55baa6074621f8a9",
      "0x58b0ae9b445c21e7",
      "0x59962794aabc8410",
      "0x5a16175a09403578",
      "0x5af049d2352d32b6",
      "0x5afeb8b639a9fd2b",
      "0x5bd306d953339725",
      "0x62034ddca24257b3",
      "0x62350544cd7cae8c",
      "0x639cb112c3b5305b",
      "0x63c213f549fa5d82",
      "0x6aceac04e0db3e3f",
      "0x729fd1fecddfbf32",
      "0x75eaf55ba62052d1",
      "0x784f20f61c140784",
      "0x7a75cdaac8889e9b",
      "0x7b9b0ceed3906b3e",
      "0x7c3686487bdafe3f",
      "0x7cda37bd69dd322c",
      "0x7d3610ad2540cef1",
      "0x7d42b33e5512cdd6",
      "0x824ca8e45ef58af3",
      "0x83fff3c042c86174",
      "0x904a5b279b78c64b",
      "0x9627d55ad751fdf3",
      "0x9835f63f5e9bb039",
      "0x9892f17ba9d3f207",
      "0x9d70546541de06e9",
      "0x9dd22d4e9d7feadd",
      "0xa0008580f3ce9e19",
      "0xa09500d6e2c902e2",
      "0xa1bf3abeb7619193",
      "0xa28210924444b31a",
      "0xa6ea74cc86a5d0a2",
      "0xaa52d6b116eef505",
      "0xab639e96d731899e",
      "0xb094d7bb379c5df5",
      "0xbf5dab6db12195dc",
      "0xc35c72c07a65c475",
      "0xcb376dc9e62f43ec",
      "0xcf18ca8f1e1ff750",
      "0xd1be382162f6001c",
      "0xd1cbdc82e8d77fd9",
      "0xd38e4d0b4ea7ae3d",
      "0xd4175c85b913863c",
      "0xd57c3edf9168d6da",
      "0xd6ee7ec9188a95a3",
      "0xd7c3dc9a314ea1a0",
      "0xdaa3ea067bf3870d",
      "0xdab4a65ecbe66ab2",
      "0xdac20c70f784cbf2",
      "0xdd4cc9447d3759b0",
      "0xdfe2cfa666c433fc",
      "0xe60b40eb08a0b7e8",
      "0xe6678169a87a6a09",
      "0xe68efe37ce6bcac1",
      "0xe7a6debef534e65f",
      "0xe7c51e636197652a",
      "0xe8b46b3e22649b5b",
      "0xe94418000e72282d",
      "0xf446f8d2a7e6458d",
      "0xf485bc7c3d368579",
      "0xf5e48eff05419f16",
      "0xf8c695a634462c0c",
      "0xf9864cf393d75e06",
      "0xf990f65e6bc05c17",
      "0xfa3a0fb4819829cc",
      "0xfc6e090f6f51f54a",
      "0xfd4c97b7b23969df",
      "0x0581211de6cb6f62",
      "0x0680efc553ae48ca",
      "0x084fa39757268546",
      "0x09f60af3cba1aa8c",
      "0x0df85d6f2920d098",
      "0x196c1869b10635b1",
      "0x1a2f91bd5cd6a327",
      "0x1a34cb2b01340e1a",
      "0x1aefb347b9d0ff81",
      "0x1bee156690e698b4",
      "0x25c28d063e66365e",
      "0x26657b3e6a7e47b6",
      "0x29c8abeb9aeea64a",
      "0x2c3122964f50851d",
      "0x2c9688d4124fdd98",
      "0x2cb2f385507be175",
      "0x2debac69a029ee02",
      "0x2ee1d9a0e392631d",
      "0x2ee4b493eabcd09f",
      "0x32d215fd24c144b7",
      "0x3564d691f3ae6103",
      "0x3a7a2af28d43354b",
      "0x3b14a0bb94ac59b9",
      "0x3ea3790519dedacf",
      "0x42c72ecd472a6ea7",
      "0x451459400329a010",
      "0x478af2b5f727e631",
      "0x4c47bdc309dc025f",
      "0x4ef2ad3972386692",
      "0x5123813a9b9ddd4c",
      "0x5159075e4cd4324c",
      "0x58f981dadcd936ee",
      "0x5a3f9f93973e6ccb",
      "0x5a892cc2a508ce72",
      "0x5b5d4f6505ab34fd",
      "0x5d8bc33e161c7906",
      "0x5f563944d3f15ed7",
      "0x63c83ab9583e2e0a",
      "0x65dbf9d4fcd95b2f",
      "0x727f517c9a2332f1",
      "0x72e42bd050cfa475",
      "0x737ed0e41b195496",
      "0x74cb39528e554ecc",
      "0x78fbca5747c12d11",
      "0x7af4fbec6da8a216",
      "0x7bc356bb77ccdc25",
      "0x7bece00ea37730fb",
      "0x7c03c24d483dbfdb",
      "0x7dc31d656658715d",
      "0x85561f8d3bb5ed83",
      "0x857057e5336d7dcb",
      "0x86cf2d2441c62867",
      "0x886f3aeaf848c535",
      "0x8af6cf154f849c33",
      "0x90b8b92029d3f58c",
      "0x90f9ac62df0313c0",
      "0x91ea11ac49d2240a",
      "0x92ba5cba77fc1e87",
      "0x96a92342bfafdf7f",
      "0x9b56572c03eaec23",
      "0x9e3f24690134ac18",
      "0xa0b1b3d713449442",
      "0xa12d27d3da0aaa1a",
      "0xa2dd21d69fe7819b",
      "0xa52178f3993523f4",
      "0xa677e48fad13d0f1",
      "0xa96cf0ffe26ab8ad",
      "0xb45abee17345254a",
      "0xb736f78a7107f27c",
      "0xb759fca4b2aa2f13",
      "0xb8023f7992b2858d",
      "0xbdca7a644c787160",
      "0xbf63238df9c75596",
      "0xbfb2a63efb78f43f",
      "0xc30fea11292fe0d8",
      "0xc3a11ce8639d9df5",
      "0xc8c7eeec9b78e7fb",
      "0xcb6bee4ae9c5ce85",
      "0xd06fca00f209ff86",
      "0xd2080c06c8b93c0d",
      "0xd398543ecb887375",
      "0xd5c92debe3265064",
      "0xd77c1b568638b39c",
      "0xde967f0f2bce5879",
      "0xded49a9ae3cd6783",
      "0xe31d0d94c9700e8c",
      "0xe611c5af622331cb",
      "0xe6a87f0e9884a159",
      "0xea0dd3503ce7b827",
      "0xf0f78794b2dc5140",
      "0xf9e05616ccd4831a",
      "0xfa6cb8b96a1e0f47",
      "0xfcbe1e1ed18c5a26",
      "0x01999301b8177ea9",
      "0x01a419e27b47c3da",
      "0x02996c1c97505f67",
      "0x0a7409fb79c960bb",
      "0x0c2ca62a44917deb",
      "0x2fda15cd99de76b5",
      "0x53900d253a0a8228",
      "0x75c653b036648f23",
      "0x8d8afb7a555b203e",
      "0xcf3b432c03484846",
      "0xd8f175c7870cdd08",
      "0xe7e12e738327d541",
      "0xadb9c333fb516d2f",
      "0x688e3a776c8a78d0",
      "0x87e4a356ed8ee51c",
      "0x0383148a36b04b64",
      "0x3a4811757eedc387",
      "0x489eb9b625e3e8aa",
      "0x64ab7e43ec5ef05a",
      "0xa49cb61b2694317f",
      "0xb817d805fe214491",
      "0xb9ac345213636a80",
      "0xa19688f32fc3c6e2",
      "0xefc24c6674db8de6",
      "0xfcddbc5ac1b0469f",
      "0x5539dd2235547eba",
      "0x973939950d7c21a3",
      "0x004996d48d643f00",
      "0x00f287aef03d54cb",
      "0x025cbac9009c61d8",
      "0x02cba1a0f1204b3d",
      "0x03089263a2c80200",
      "0x030d0c85f30d4490",
      "0x05d38668a3b45fb1",
      "0x06790716a5aa42f6",
      "0x067dc203163af173",
      "0x0745c5c3e28fb5c8",
      "0x0893d4423f25c7d6",
      "0x08be6b4aa7ae896f",
      "0x093f53f4ca7e052a",
      "0x09920568c0b45c00",
      "0x0a0226f57d114e6d",
      "0x0a156a52967c7428",
      "0x0a3ff3c4a1734d2a",
      "0x0a6595c82e5a1511",
      "0x0ab941853b6188d8",
      "0x0b1a4be2d39fa604",
      "0x0bb44fcf2c487fa6",
      "0x0bb5e7e996f67fa1",
      "0x0bbfa46ca43d28a0",
      "0x0c4a39107850f89b",
      "0x0c5737334c78c442",
      "0x0c7da1c51aeebec5",
      "0x0ccc515c9eb2db31",
      "0x0cd2e326a9bc9de2",
      "0x0d0a29ebda8ea6bb",
      "0x0da212bb82129be9",
      "0x0e133a868105de81",
      "0x0e1ff8249c156a43",
      "0x0e67264e94498b08",
      "0x0eb72c6284442bf4",
      "0x0f649511e969c7ad",
      "0x102285c2597c57c4",
      "0x10e50ae7a753e157",
      "0x1115fcf9b3ffddb7",
      "0x11aa13eccd1c8d5c",
      "0x11b777f9814342f6",
      "0x1281f567fd0700ba",
      "0x12b1b698e4c1d655",
      "0x136c94b9fd1f06e2",
      "0x13b59263df6ca9fd",
      "0x140ad647d5a8c9de",
      "0x140fd043497fd8b2",
      "0x14af3936f9729080",
      "0x151364824c470aa9",
      "0x158ee9fcc921056a",
      "0x15b0b57071203160",
      "0x15c8f3f8b46e87d7",
      "0x167c914f165b706f",
      "0x16a637f07450fb77",
      "0x16a7e8224331d069",
      "0x16ae8f1cbfceaa9e",
      "0x179d637fc30eb923",
      "0x1886ee13f79300e4",
      "0x18ac43604a57253c",
      "0x190bab54e24d6ecd",
      "0x1930f1dcc69b4bab",
      "0x1976f71ba3f240e1",
      "0x19a1857aeec7780f",
      "0x19da90bd6862c857",
      "0x1b13a1bcae96f096",
      "0x1b3ffae3ea2eca6e",
      "0x1c09c3b8d6bf323b",
      "0x1c2960c189cbb2c3",
      "0x1c637136b7a37f6c",
      "0x1cf11baf57176ffc",
      "0x1dac55c5bf4af0b4",
      "0x1df788b3a81ab500",
      "0x1e346c2d59c73df4",
      "0x1e44e4436c3e77d4",
      "0x1ee4ff1d322e4c93",
      "0x1f02ec7cc1a7cc56",
      "0x2175e5e4458284b4",
      "0x21834948ab6c4e82",
      "0x21a0e9339220e2de",
      "0x21aac18135121731",
      "0x22b5bddcec01a1b0",
      "0x23bd17f4ac311e9c",
      "0x26ad8a1fd11fe817",
      "0x2760733d652131e8",
      "0x28577162e5e34697",
      "0x28762b71c874bdbe",
      "0x2896e67c4ff3c25c",
      "0x28a8541801c90cd4",
      "0x28b9d516f88a76ee",
      "0x28ef325636df7a2e",
      "0x299327d145e39828",
      "0x2a70a86658f33a69",
      "0x2b496cb78301dc3b",
      "0x2b8dc729b31a475e",
      "0x2b9a8a8fb5f92c86",
      "0x2c5f3e3a0825d921",
      "0x2cc26629902a733f",
      "0x2d4218a6ea07d205",
      "0x2d7942d195a92099",
      "0x2d7f7dac32e2c469",
      "0x2dc9828c66591296",
      "0x2f9d55c4b032877a",
      "0x2fa6fd677af9d169",
      "0x2fc2c8872c48fedd",
      "0x3096162965ab4c6c",
      "0x314cc864f479dac2",
      "0x315a93bec0b4b62e",
      "0x32b4ee6fb718f756",
      "0x3358c97ffb850b8b",
      "0x33901f18b3907282",
      "0x33c221718d0b93ca",
      "0x345f3c44cc602464",
      "0x358664d45848c602",
      "0x3587ccf2e2f6c605",
      "0x368b4f175831543a",
      "0x36ef378785835e55",
      "0x37d179cfb62c849a",
      "0x37d3f4532f28f8f6",
      "0x37fa0a6fd107dbc1",
      "0x383ba59d52a53715",
      "0x38a00aa3de58d3b6",
      "0x3963a18240a2cd77",
      "0x396aac8ac42a44f3",
      "0x3a3117fd87d9f112",
      "0x3a75734f60012d2b",
      "0x3aa277db4d656f41",
      "0x3aeb295f73b8fa0c",
      "0x3c2a4bc540acd48c",
      "0x3d73b74e96bed358",
      "0x3da466b7a6b334ef",
      "0x3de76775b2837f54",
      "0x3defb4aeece48c53",
      "0x3e3ee8b8849e5cfb",
      "0x3e80fe38d3e6a03b",
      "0x3ec58c095d68accc",
      "0x3f272d76cbd6636f",
      "0x4065d1f7f1e3388c",
      "0x40abf1bc408a5ea5",
      "0x40ddb57a8ad30567",
      "0x4128fb3a8a382fd8",
      "0x423b45c54e3b2d9b",
      "0x425e0d6ebf5da7f5",
      "0x42921f1da9563ce4",
      "0x42ec365ab5f89312",
      "0x43449aee5e70cf13",
      "0x448ec9bc867e25e7",
      "0x44c3391a9ecaa1c1",
      "0x44ffe8f5e4b73e5d",
      "0x45f302e82fadbd62",
      "0x463843a7bb3e6bef",
      "0x46ace569ff52bd67",
      "0x46d6fb10be71d261",
      "0x473a441d6486aeba",
      "0x478fa502f8d55b71",
      "0x47bb80702fbbe142",
      "0x488c4b7ef14e6ded",
      "0x48f4368c842a53ff",
      "0x4a377f72c03fb49a",
      "0x4a862212b54c1c2f",
      "0x4ab4fed3a1bf2d43",
      "0x4b19cd7fad04b1b5",
      "0x4b2500ac94277024",
      "0x4b97be47fd401caf",
      "0x4b9a848e7f3d8221",
      "0x4bf5f854314f7457",
      "0x4c10ee993e695095",
      "0x4c5656fb88e88b16",
      "0x4c9f5f4ef79cd901",
      "0x4cdd9d629793e7a9",
      "0x4d6f5a85bbdb10f3",
      "0x4db50eee6cb53f64",
      "0x4e5681a62add4adf",
      "0x4ead931dc8021796",
      "0x4ec31652afeb4dcb",
      "0x4f2df0af1cffb93c",
      "0x4f30c4082e0b8b27",
      "0x4f37d68c503c37bc",
      "0x4f7a76676d5b99d1",
      "0x4f8bd58d082a3716",
      "0x4fcab73b7325fa43",
      "0x5103498b0a6828a0",
      "0x52082b3f9673f316",
      "0x5272434cec79316e",
      "0x53193cd431aab9e2",
      "0x53ece48e34a37469",
      "0x53f389d96fb4ce5e",
      "0x54143430bc14c63f",
      "0x5425b421d1ed65c3",
      "0x548906155c6c9f52",
      "0x550231a03e82e7aa",
      "0x55cecdc485ca51c3",
      "0x55e8c8dc0611e450",
      "0x56519e3cf1364884",
      "0x56ecf32a2c30f07c",
      "0x56f5a100d06caebb",
      "0x578bec897c4542f6",
      "0x5798b0a962a9b911",
      "0x5891ef84ec9c7c03",
      "0x58bbc728329a01b7",
      "0x5917366ba790b9cf",
      "0x591f6090c14dc55e",
      "0x5963f0aece2c0a1e",
      "0x59d06d22a958fb1c",
      "0x5ad6355fb73ebe24",
      "0x5b545eae9905348e",
      "0x5c4e71da6a2fd3f8",
      "0x5c8728dd6bf07c5e",
      "0x5df450fd243d4d18",
      "0x5f16a298da1de853",
      "0x5f59c39e18f34e14",
      "0x5fc4cbc0a52fce41",
      "0x60dbbec29ae1228b",
      "0x60fe9001b697f96b",
      "0x616002d8527026d1",
      "0x61b5b154e0cc1615",
      "0x61f49f6ca63678fc",
      "0x62179504d8e482d1",
      "0x624ceb15e9f4cfc6",
      "0x6259723319de18e1",
      "0x628f698a4c8ab767",
      "0x62fa15cb0bb99f5e",
      "0x6304124e48e9bbd9",
      "0x634fb65d3997ae1b",
      "0x635e5d9ae3dbf0a8",
      "0x63cd6cf0e13a152d",
      "0x647c89fdc2a990d8",
      "0x648c20a88dd0b0dc",
      "0x65034b14274aaa3a",
      "0x65cc5b64baf74c12",
      "0x65e87078dd105ab4",
      "0x6674c10a5876d650",
      "0x69198d809e08bbc3",
      "0x6935ca1cc29608cc",
      "0x693e1a3aa1b10095",
      "0x69d10b55a8b63f7b",
      "0x6a2c7ae9e425afaf",
      "0x6a3c0373d9732823",
      "0x6b75d62f17e48230",
      "0x6ba1f6ffafcc3a56",
      "0x6bb6cc527f88ad6d",
      "0x6c9948caa4f0a0e0",
      "0x6da5130398318645",
      "0x6ddc134511faca77",
      "0x6f117f4cf2f4c135",
      "0x6ffeeb03c349714d",
      "0x70e4dbcb018eb314",
      "0x7120ab3fbf74ea9e",
      "0x71dbd2b3c8521539",
      "0x71dd256187d88c7e",
      "0x724652fb8c6e4841",
      "0x72604a21fa1d25b8",
      "0x72c1174eb3f03380",
      "0x7331da2a177687c5",
      "0x746e3935e2426b77",
      "0x74d9f72f77a36c14",
      "0x763bb470608a8de9",
      "0x7685779d2a9bd4f4",
      "0x778f98794016bdf9",
      "0x77a783ecd4fc6ce8",
      "0x77c7d07e179df87a",
      "0x78abb10d089fcd82",
      "0x79185aed4b5de4d4",
      "0x796b9c0ec8e77071",
      "0x7a52b4f8010adf4f",
      "0x7a8a82e654d527ab",
      "0x7aa67a216d55c20a",
      "0x7ad0552f698decdc",
      "0x7aeb7853c084e2a3",
      "0x7b3f577a5dd2bb90",
      "0x7b4e77cd89ed264d",
      "0x7b608648a725b671",
      "0x7c2fd49ddcfe7702",
      "0x7cf77b60a9bd8987",
      "0x7e08c5c9d257a1b1",
      "0x7e44735edd1e08e8",
      "0x7e8b8cc75b1645df",
      "0x7e8c9fbd93d77f23",
      "0x7f56b3dbec189af8",
      "0x7fa7e31b8afa16d7",
      "0x80e4e67034eaf8ac",
      "0x815de4dc72c5b37a",
      "0x81cc267075993ca8",
      "0x81fd4876b523b22c",
      "0x8227ffc3552c3582",
      "0x834bc36c65edadb9",
      "0x8398873298db043a",
      "0x83cf6bcc9108d7a4",
      "0x84c3d63308d8a7ee",
      "0x84f2b93425ec78f7",
      "0x85963d8885cb66df",
      "0x86087793f9f8ecd3",
      "0x8628996576f79e0a",
      "0x862cc49208757a73",
      "0x8630fa754bf11151",
      "0x86f93a916ab2b896",
      "0x87a49a1374d4dd5c",
      "0x884a1ab70351db37",
      "0x888823ad652e69e3",
      "0x8921ad8036432e0c",
      "0x89924867e6096068",
      "0x89e10aa5b0872ac6",
      "0x8a734ab3396569bf",
      "0x8ac9c86a15d05d2c",
      "0x8ad964626e97a887",
      "0x8b1d44dbf5bedb46",
      "0x8b88b91908ff2f21",
      "0x8bc0ca9bb42635fd",
      "0x8c3214d08559f571",
      "0x8c5e7734ee4d71ae",
      "0x8d7950d3caecaaf9",
      "0x8dd7ba16c30089d9",
      "0x8e43b28960760549",
      "0x8f12227dd66570ce",
      "0x8f552f04748aa4da",
      "0x8f57504c58eb7c39",
      "0x8fba22a865ab12c3",
      "0x9057de451bfd671c",
      "0x90bd6b4845e310a0",
      "0x90ffa96425ec2e08",
      "0x91639e07cae218f3",
      "0x917d2c82a69489da",
      "0x9184c5afe6660581",
      "0x919b30e52b1b3fb0",
      "0x91a6cdf26594a9da",
      "0x9275f29062d1ff9c",
      "0x92e988e519439996",
      "0x935063916f5ed002",
      "0x935ab90826715698",
      "0x944c55df25c554b1",
      "0x94504c7e9535e93b",
      "0x94ec1ecc5e0645bd",
      "0x95261a7cd4c25c3c",
      "0x9534d5ff9bc2f883",
      "0x9564b3672134c07a",
      "0x95bf74afa7b6b0b5",
      "0x95d67a78c58c87e8",
      "0x95f7ce7c455851b9",
      "0x965024870966a9a6",
      "0x972cdf17d71966d8",
      "0x9769ad2659976a2f",
      "0x992088395673d594",
      "0x9993565b6d6bc4af",
      "0x99bd48c8036e2876",
      "0x9a8e72f73015ab9f",
      "0x9b09033ec1a76e54",
      "0x9b21ea7fe0281bca",
      "0x9b59978d954c25d8",
      "0x9c3f50acde39b288",
      "0x9c6cfd99ea36db62",
      "0x9ca680da7ea58ec8",
      "0x9ce27c8a546f050d",
      "0x9d27e9d78050aea1",
      "0x9d452ae474e549cf",
      "0x9e7eb5f579a843a5",
      "0x9ec99406f7fcefd9",
      "0x9ef88d0be1e19dbe",
      "0x9f33d34964fe20b7",
      "0x9f6c9a99531b7aaa",
      "0x9f6ddd56f210d1b2",
      "0xa059c6365f5dba49",
      "0xa0da7ced8ef7ab35",
      "0xa160692f4a2e290f",
      "0xa16c336f9a2cca31",
      "0xa1a057e9ec762ba4",
      "0xa2c0fb6600509ef8",
      "0xa355dccf9e7ef9ed",
      "0xa368d20d881a9a95",
      "0xa38a8fa13849968b",
      "0xa4c0ad85bf143c10",
      "0xa53a6eebf9222d75",
      "0xa56f0e77df0304e0",
      "0xa6770b99eddeac14",
      "0xa677937b20ccfbe8",
      "0xa6f1446ca3308eec",
      "0xa6f26129dbf2257d",
      "0xa6fab2f28595d67a",
      "0xa77e62a082a9b1d1",
      "0xa7a70eb383d53a47",
      "0xa7aae0e9aa378773",
      "0xa920e5f0901bcead",
      "0xa92199bada423aea",
      "0xa9eac9ffccd5e0d1",
      "0xab100659fd4f2568",
      "0xabc9d41074a3a9cd",
      "0xabe313aaea68a89c",
      "0xac08579b94f29c9a",
      "0xac36b54da463afa3",
      "0xac82139d993bf170",
      "0xace9334e1f3d6518",
      "0xad07f3f4b2d316da",
      "0xad9d9edafce7010d",
      "0xaf5b493db24f7702",
      "0xafe1876aa30fe02d",
      "0xaffce28159a6a9e0",
      "0xb006f153b1a53923",
      "0xb016c5b907f09b74",
      "0xb1e96be448e83993",
      "0xb1f5bbebfd57a833",
      "0xb1f75d40f1aa76b1",
      "0xb2ea0fe697fdb4ff",
      "0xb33838f45e94df94",
      "0xb352ac3d217215f6",
      "0xb36c86bba25a8c82",
      "0xb370574aa1139b45",
      "0xb408551a0bcfb625",
      "0xb47d96ff729a1f48",
      "0xb5a907733c2496b2",
      "0xb759dbe241def9bb",
      "0xb75dd7a6ac79b1ee",
      "0xb768e556ffcf8a8e",
      "0xb900bc1dc3464929",
      "0xb9219004d5f81f7e",
      "0xb9ebcbff04e91a1b",
      "0xbab6bdde0e4c387f",
      "0xbb4b9f1e35deb769",
      "0xbb7c578672b3db7c",
      "0xbbaed1c84d4c818b",
      "0xbc5d238413b99f0b",
      "0xbd16886e47b96b9c",
      "0xbd6568cadaf9780c",
      "0xbf4e55d43f7be0ff",
      "0xc0272821d70040c8",
      "0xc0522295f0621275",
      "0xc0597793abff95ba",
      "0xc1e016a784c1103d",
      "0xc1e9e88503dabb51",
      "0xc1ffe3ed49bc2a0c",
      "0xc2326ef579f73a99",
      "0xc25a85742a702818",
      "0xc268cf367f865c90",
      "0xc28803c54ef7a515",
      "0xc2bd473f2668330b",
      "0xc2dcf1048fcc55bf",
      "0xc2f0dc51f05dc239",
      "0xc41333b67801cf74",
      "0xc41678c26fd5fbc3",
      "0xc4363553c69a81b9",
      "0xc44ef60460166f62",
      "0xc451d623b002f08e",
      "0xc4779eb4e3a2b73c",
      "0xc53e4a169bc39b48",
      "0xc68c1622284b0e67",
      "0xc69fa514766a8965",
      "0xc7325ee8c968bfde",
      "0xc782f47c1997a958",
      "0xc80bdb26257f7db8",
      "0xc8c4bd5c83eb36ee",
      "0xc8d1461cac26a9ff",
      "0xc90deaa34ac42980",
      "0xc950c106ff90a4ee",
      "0xc96124bed0ff601e",
      "0xca1f4220bce92cf7",
      "0xca6b42d4eafb2773",
      "0xcb2a90c0d1945ddd",
      "0xcbd39705675d2b04",
      "0xcc06c3369c3388b4",
      "0xcc6db3a83fe63697",
      "0xcc84bafc62de3b21",
      "0xccea80173b51e028",
      "0xcd8355558cf2c260",
      "0xcd8ffdc1e99585d1",
      "0xcdc414a213e8b5c8",
      "0xce4dfd08c47b7964",
      "0xcf667284dec53278",
      "0xcfcb24e78f77bca8",
      "0xcfe69a11a10a7476",
      "0xd028fcfcbbb474cd",
      "0xd0e64455c7cf4518",
      "0xd15b5fd06507f24e",
      "0xd160bbfd923907e1",
      "0xd1811787f13783d4",
      "0xd1a8f578173e2914",
      "0xd319cf819f8782b9",
      "0xd3b7f0298b020444",
      "0xd4213cc41fb83dd4",
      "0xd5cb24a9f46e25f9",
      "0xd64d7a5638840bb7",
      "0xd7a6ca1d69ec139d",
      "0xd85f07e043f2a9d4",
      "0xd88ea4eb04cf58b2",
      "0xd91979d5d542bf28",
      "0xd96dc67ae64ee202",
      "0xd9837ecde3015b8c",
      "0xd9b288d6b5d1550e",
      "0xdb0cd116d6f6e801",
      "0xdb1b73a690d8ff3c",
      "0xdb205fdbd45fa0de",
      "0xdb216fe0f88b20df",
      "0xdbe91a1fcda6868f",
      "0xdc4bbe0f5e09f70d",
      "0xdc8d27a9c9709150",
      "0xdca84b7a0f9c2cee",
      "0xdcdb8c9861a8e9d6",
      "0xdd2919f21a3b53d8",
      "0xdd56bed4a2d17b1c",
      "0xddc3977aaf777b3b",
      "0xddcb151262352410",
      "0xde95b4a2a537096a",
      "0xdeedef17cea9b04d",
      "0xdf7c0d54b86fb327",
      "0xe0099a6a9816ef0b",
      "0xe013edfa47f0cda7",
      "0xe01d6a94705daf44",
      "0xe082995c6facfe03",
      "0xe0c24ef100cd3cc1",
      "0xe15b8cbc708739be",
      "0xe1924da6e732161e",
      "0xe1d5954d03ccb02d",
      "0xe2c4cd19cb326cec",
      "0xe37bf99960482912",
      "0xe49d0241a4150c0c",
      "0xe587d84e954396cb",
      "0xe608c737e0d492bd",
      "0xe6d95eb8a1356d19",
      "0xe6e58e5636c6a318",
      "0xe70228d38a59fbb0",
      "0xe710915afe70f271",
      "0xe76e9fa44ad25cd5",
      "0xe7d066325d67dcf0",
      "0xe812cbc355734d1d",
      "0xe8d97591eea7ba5e",
      "0xe92e8c362aec35b5",
      "0xe94b5d7efb16b9ba",
      "0xea82fa9a6378b1b5",
      "0xea86d066cb5da92f",
      "0xea967c6eb01a5c84",
      "0xeaaf4592fbf3ff0c",
      "0xeaf76833d270630e",
      "0xeb2fa201fa3a8fad",
      "0xeb3188665b5e4978",
      "0xec7f6fa834eb879c",
      "0xecc82593743e5ef4",
      "0xecccfc45df886486",
      "0xee5a76409bfca2d5",
      "0xeeaf3607089fef58",
      "0xeece6e2b0c78a494",
      "0xef1fb52de3e49fbe",
      "0xf0b2563d416a82ee",
      "0xf10d2fcd6113e2cb",
      "0xf144f4696774f810",
      "0xf168888f8bc0c3ba",
      "0xf1db9e425819af36",
      "0xf2ced66e3e1e65af",
      "0xf32ca382033f89b6",
      "0xf32e159b7169aa85",
      "0xf4e2db2d9e9a2a45",
      "0xf51741fe35ee2340",
      "0xf5504c879701f754",
      "0xf56fd3e55b3fb64d",
      "0xf5a5afa72222b27a",
      "0xf60e38a51612a809",
      "0xf738b8f48e7259ab",
      "0xf836f55d7e702022",
      "0xf8cf99af5d40f415",
      "0xf90d415bb3028aec",
      "0xfbf56736effcd252",
      "0xfc07d3b4fd8c3657",
      "0xfd0ba0b54d7264f3",
      "0xfe127a7613b630e3",
      "0xffd6e594ed81158c",
    ]
    fetchChestRankingData(addresses)
  }, [])

  const getAllFindProfiles = async (addresses: any) => {
    try {
      let res = await query({
        cadence: `
        import Profile from 0xProfile
        access(all) fun main(addresses: [Address]) : {Address: Profile.UserProfile} {
            var profiles: {Address: Profile.UserProfile} = {}
            for address in addresses {
                let user = getAccount(address)
                    .getCapability<&{Profile.Public}>(Profile.publicPath)
                    .borrow()?.asProfile()
                if (user != nil) {
                    profiles[user?.address!] = user
                }
            }
            return profiles
        }
        `,
        args: (arg: any, t: any) => [arg(addresses, t.Array(t.Address))],
      })
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const getAllUserChestCollections = async (addresses: any) => {
    try {
      let response = await query({
        cadence: `
        import NFTDayTreasureChest from 0xNFTDayTreasureChest
        
        access(all) fun main(addresses: [Address]) : {Address:[UInt64]} {
          var dict: {Address:[UInt64]} = {}
      
          for address in addresses {
              let account = getAccount(address)
      
              var IDs: [UInt64] = []
      
              let collectionRef = account.getCapability(NFTDayTreasureChest.CollectionPublicPath).borrow<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>() 
      
              if(collectionRef != nil) {
                  IDs = collectionRef!.getIDs()
                  if(IDs.length > 0) {
                    dict[address] = IDs
                  }
              }
              
          }
          return dict
        }
        `,
        args: (arg: any, t: any) => [arg(addresses, t.Array(t.Address))],
      })
      // console.log(response)
      // console.log("user chest: ")
      // console.log(response)
      return response
    } catch (err) {
      console.log(err)
    }
  }

  const getAllUserSaleCollections = async (addresses: any) => {
    try {
      let response = await query({
        cadence: `
        import BlackMarketplace from 0xBlackMarketplace

        access(all) fun main(addresses: [Address]) : {Address:[UInt64]} {
          var dict: {Address:[UInt64]} = {}

          for address in addresses {
            let account = getAccount(address)

            var IDs: [UInt64] = []

            let collectionRef = account.getCapability(BlackMarketplace.CollectionPublicPath).borrow<&{BlackMarketplace.SalePublic}>() 

            if(collectionRef != nil) {
                IDs = collectionRef!.getIDs()
                if(IDs.length > 0) {
                  dict[address] = IDs
                }
            }
          }
          return dict
        }
        `,
        args: (arg: any, t: any) => [arg(addresses, t.Array(t.Address))],
      })

      // console.log("user sale: ")
      // console.log(response)
      return response
    } catch (err) {
      console.log(err)
    }
  }

  const fetchChestRankingData = async (addresses: any) => {
    var addressesFound: any = []

    //Get All Chest Collections
    var allChestCollections: any = []
    await getAllUserChestCollections(addresses).then((response: any) => {
      allChestCollections = response
      addressesFound = Object.keys(allChestCollections)
    })

    //Get All Sale Collections
    var allSaleCollections: any = []
    await getAllUserSaleCollections(addresses).then((response: any) => {
      allSaleCollections = response
    })

    //Get All Find Profiles
    var findProfiles: any = []
    await getAllFindProfiles(addresses).then((response: any) => {
      findProfiles = response
    })

    //Get all unique addresses with chests
    for (let key in allSaleCollections) {
      if (!addressesFound.includes(key)) {
        addressesFound.push(key)
      }
    }

    var unsortedData: any = []

    for (let key in addressesFound) {
      let address = addressesFound[key]

      //get chestCount
      var chestCount = 0
      if (allChestCollections[address] != null) {
        chestCount = allChestCollections[address].length
      }
      if (allSaleCollections[address] != null) {
        chestCount = chestCount + allSaleCollections[address].length
      }

      //get profile
      var profile = findProfiles[address]

      var treasureHunter = {
        address: address,
        chestCount: chestCount,
        name:
          profile != null
            ? profile.findName != ""
              ? profile.findName + ".find"
              : profile.name
            : address.slice(0, 6).concat("...").concat(address.slice(-4)),
      }
      unsortedData.push(treasureHunter)
    }
    unsortedData.reverse()
    unsortedData.sort((a: any, b: any) => b.chestCount - a.chestCount)

    var rankedData: any = []
    var rank = 1
    for (let key in unsortedData) {
      let data = unsortedData[key]
      var rankedHunter = {
        address: data.address,
        numberOfBeastsCollected: data.chestCount,
        name: data.name,
        rankByTotalBeasts: rank,
      }
      rankedData.push(rankedHunter)
      rank = rank + 1
    }

    setRankingsData(rankedData)
    console.log(rankedData)
  }

  return (
    <Container>
      {/* <ToastContainer autoClose={5000} position="bottom-right" theme="dark" /> */}
      <ChestRankingList chestData={rankingsData} />
    </Container>
  )
}

export default ChestRankings
