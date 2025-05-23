import { Barretenberg, deflattenFields, RawBuffer, reconstructHonkProof, UltraHonkBackend } from "@aztec/bb.js";
import innerCircuit from "../circuits/transfer/target/extension.json" assert { type: "json" };
import recursiveCircuit from "../circuits/recursive/target/recursive.json" assert { type: "json" };
import { readFile } from 'fs/promises';

import { CompiledCircuit, Noir } from "@noir-lang/noir_js";
import * as garaga from 'garaga';

import { RpcProvider, type Call } from 'starknet';




(async () => {
  try {
    await garaga.init();
    const innerCircuitNoir = new Noir(innerCircuit as CompiledCircuit);
    const innerBackend = new UltraHonkBackend(
      innerCircuit.bytecode,
      { threads: 2 },
    );

    console.log("before input");

    const inputs = {
      root_1: "0x1a44be2dfa217b366ddd77a5b14415504ac4a4775e8d9d2c3b030526b45686a0",
      secret_1: "0x1344b7a78d5b8c6b48def17a5987dd4f24e728ec6e1c6ff188d106e1ae9839aa",
      nullifier_1: "0x1828f6363c3b5aec7c212addb41462622e4a3766a945d8304bd17c00f1adb44b",
      commitment_amount_1: "0x8ac7230489e80000",
      token_address_1: "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      hashpath_1: [
        "0x23b75f0df90fbdfb2abe0b3c921404db07ddf92b6e93fee7f324ebfed7284b8c",
        "0x1069673dcdb12263df301a6ff584a7ec261a44cb9dc68df067a4774460b1f1e1",
        "0x18f43331537ee2af2e3d758d50f72106467c6eea50371dd528d57eb2b856d238",
        "0x7f9d837cb17b0d36320ffe93ba52345f1b728571a568265caac97559dbc952a",
        "0x2b94cf5e8746b3f5c9631f4c5df32907a699c58c94b2ad4d7b5cec1639183f55",
        "0x2dee93c5a666459646ea7d22cca9e1bcfed71e6951b953611d11dda32ea09d78",
        "0x78295e5a22b84e982cf601eb639597b8b0515a88cb5ac7fa8a4aabe3c87349d",
        "0x2fa5e5f18f6027a6501bec864564472a616b2e274a41211a444cbe3a99f3cc61",
        "0xe884376d0d8fd21ecb780389e941f66e45e7acce3e228ab3e2156a614fcd747",
        "0x1b7201da72494f1e28717ad1a52eb469f95892f957713533de6175e5da190af2",
        "0x1f8d8822725e36385200c0b201249819a6e6e1e4650808b5bebc6bface7d7636",
        "0x2c5d82f66c914bafb9701589ba8cfcfb6162b0a12acf88a8d0879a0471b5f85a",
        "0x14c54148a0940bb820957f5adf3fa1134ef5c4aaa113f4646458f270e0bfbfd0",
        "0x190d33b12f986f961e10c0ee44d8b9af11be25588cad89d416118e4bf4ebe80c",
        "0x22f98aa9ce704152ac17354914ad73ed1167ae6596af510aa5b3649325e06c92",
        "0x2a7c7c9b6ce5880b9f6f228d72bf6a575a526f29c66ecceef8b753d38bba7323",
        "0x2e8186e558698ec1c67af9c14d463ffc470043c9c2988b954d75dd643f36b992",
        "0xf57c5571e9a4eab49e2c8cf050dae948aef6ead647392273546249d1c1ff10f",
        "0x1830ee67b5fb554ad5f63d4388800e1cfe78e310697d46e43c9ce36134f72cca",
        "0x2134e76ac5d21aab186c2be1dd8f84ee880a1e46eaf712f9d371b6df22191f3e",
        "0x19df90ec844ebc4ffeebd866f33859b0c051d8c958ee3aa88f8f8df3db91a5b1",
        "0x18cca2a66b5c0787981e69aefd84852d74af0e93ef4912b4648c05f722efe52b",
        "0x2388909415230d1b4d1304d2d54f473a628338f2efad83fadf05644549d2538d",
        "0x27171fb4a97b6cc0e9e8f543b5294de866a2af2c9c8d0b1d96e673e4529ed540",
        "0x2ff6650540f629fd5711a0bc74fc0d28dcb230b9392583e5f8d59696dde6ae21",
        "0x120c58f143d491e95902f7f5277778a2e0ad5168f6add75669932630ce611518",
        "0x1f21feb70d3f21b07bf853d5e5db03071ec495a0a565a21da2d665d279483795",
        "0x24be905fa71335e14c638cc0f66a8623a826e768068a9e968bb1a1dde18a72d2",
        "0xf8666b62ed17491c50ceadead57d4cd597ef3821d65c328744c74e553dac26d",
        "0x918d46bf52d98b034413f4a1a1c41594e7a7a3f6ae08cb43d1a2a230e1959ef",
        "0x1bbeb01b4c479ecde76917645e404dfa2e26f90d0afc5a65128513ad375c5ff2"
      ],
      index_1: "0x0",
      amount: "0x4563918244f40000",
      root_2: "0x1a44be2dfa217b366ddd77a5b14415504ac4a4775e8d9d2c3b030526b45686a0",
      secret_2: "0xce28b55aae81eaf127e3a106b7017d066b276dda4da41de90c2ef6f2a2fac4b",
      nullifier_2: "0x4798d4ce7d47be70c75080c94b45a58b5ca434013a96cb3cffa1217a8c497b8",
      commitment_amount_2: "0x3782dace9d900000",
      token_address_2: "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      hashpath_2: [
        "0x1ebc410dbde3f739eb52660fbd624f3ad6e5bafca5a2bd4efe1fac34756f5db",
        "0x1069673dcdb12263df301a6ff584a7ec261a44cb9dc68df067a4774460b1f1e1",
        "0x18f43331537ee2af2e3d758d50f72106467c6eea50371dd528d57eb2b856d238",
        "0x7f9d837cb17b0d36320ffe93ba52345f1b728571a568265caac97559dbc952a",
        "0x2b94cf5e8746b3f5c9631f4c5df32907a699c58c94b2ad4d7b5cec1639183f55",
        "0x2dee93c5a666459646ea7d22cca9e1bcfed71e6951b953611d11dda32ea09d78",
        "0x78295e5a22b84e982cf601eb639597b8b0515a88cb5ac7fa8a4aabe3c87349d",
        "0x2fa5e5f18f6027a6501bec864564472a616b2e274a41211a444cbe3a99f3cc61",
        "0xe884376d0d8fd21ecb780389e941f66e45e7acce3e228ab3e2156a614fcd747",
        "0x1b7201da72494f1e28717ad1a52eb469f95892f957713533de6175e5da190af2",
        "0x1f8d8822725e36385200c0b201249819a6e6e1e4650808b5bebc6bface7d7636",
        "0x2c5d82f66c914bafb9701589ba8cfcfb6162b0a12acf88a8d0879a0471b5f85a",
        "0x14c54148a0940bb820957f5adf3fa1134ef5c4aaa113f4646458f270e0bfbfd0",
        "0x190d33b12f986f961e10c0ee44d8b9af11be25588cad89d416118e4bf4ebe80c",
        "0x22f98aa9ce704152ac17354914ad73ed1167ae6596af510aa5b3649325e06c92",
        "0x2a7c7c9b6ce5880b9f6f228d72bf6a575a526f29c66ecceef8b753d38bba7323",
        "0x2e8186e558698ec1c67af9c14d463ffc470043c9c2988b954d75dd643f36b992",
        "0xf57c5571e9a4eab49e2c8cf050dae948aef6ead647392273546249d1c1ff10f",
        "0x1830ee67b5fb554ad5f63d4388800e1cfe78e310697d46e43c9ce36134f72cca",
        "0x2134e76ac5d21aab186c2be1dd8f84ee880a1e46eaf712f9d371b6df22191f3e",
        "0x19df90ec844ebc4ffeebd866f33859b0c051d8c958ee3aa88f8f8df3db91a5b1",
        "0x18cca2a66b5c0787981e69aefd84852d74af0e93ef4912b4648c05f722efe52b",
        "0x2388909415230d1b4d1304d2d54f473a628338f2efad83fadf05644549d2538d",
        "0x27171fb4a97b6cc0e9e8f543b5294de866a2af2c9c8d0b1d96e673e4529ed540",
        "0x2ff6650540f629fd5711a0bc74fc0d28dcb230b9392583e5f8d59696dde6ae21",
        "0x120c58f143d491e95902f7f5277778a2e0ad5168f6add75669932630ce611518",
        "0x1f21feb70d3f21b07bf853d5e5db03071ec495a0a565a21da2d665d279483795",
        "0x24be905fa71335e14c638cc0f66a8623a826e768068a9e968bb1a1dde18a72d2",
        "0xf8666b62ed17491c50ceadead57d4cd597ef3821d65c328744c74e553dac26d",
        "0x918d46bf52d98b034413f4a1a1c41594e7a7a3f6ae08cb43d1a2a230e1959ef",
        "0x1bbeb01b4c479ecde76917645e404dfa2e26f90d0afc5a65128513ad375c5ff2"
      ],
      index_2: "0x1",
      gas_fee: "0xec60d6b53032dc0",
      refund_secret_1: "0xfd6b2f79e492b5ed607e543fbcec78b0c29dbf38973289596a94622fe320a81",
      refund_nullifier_1: "0x11bdbd364d3241d83872e523a4748c6963f42572c77f389cd1bd45ceaf0cebb1",
      refund_amount_1: "0x4563918244f40000",
      refund_commitment_hash_1: "0x1f6eb9e2abe107077ae948e1a95b3f6cd13bbe08144bb79b97bce7580fb623a6",
      refund_secret_2: "0x94a8f6cfbde9f614cea119c48a301e2952130807d85c9caaf8a56a6ab88eaa7",
      refund_nullifier_2: "0x6db11e182f47a9ff470011dd69860800fd5d043069c6f76b01f9e6a3873b6f6",
      refund_amount_2: "0x28bccd634a8cd240",
      refund_commitment_hash_2: "0x1b5fdaea50710330b52c0756cb17d1806c2b473d703b6d8424166f170681f9c0",
      _recipient: "0x064fa47c02430E5d69c0c5d340e23397bca308f7B9d85247565fc91F2C2aD2f2"
    };
    console.log("before execute");
    const { witness } = await innerCircuitNoir.execute(inputs);
    console.log("Proof generate")
    const { proof: innerProofFields, publicInputs: innerPublicInputs } =
      await innerBackend.generateProof(witness);
    console.log("proof", innerProofFields);
    console.log("after proof");

    // Get verification key for inner circuit as fields
    const innerCircuitVerificationKey = await innerBackend.getVerificationKey();
    const barretenbergAPI = await Barretenberg.new({ threads: 1 });
    const vkAsFields = (
      await barretenbergAPI.acirVkAsFieldsUltraHonk(
        new RawBuffer(innerCircuitVerificationKey)
      )
    ).map((field) => field.toString());

    // Generate proof of the recursive circuit
    const recursiveCircuitNoir = new Noir(recursiveCircuit as CompiledCircuit);
    const recursiveBackend = new UltraHonkBackend(recursiveCircuit.bytecode, {
      threads: 2,
    });

    // const recursiveInputs = {
    //   proof: deflattenFields(innerProofFields),
    //   public_inputs: innerPublicInputs,
    //   verification_key: vkAsFields,
    // };

    // const { witness: recursiveWitness } = await recursiveCircuitNoir.execute(
    //   recursiveInputs
    // );
    // const { proof: recursiveProof, publicInputs: recursivePublicInputs } =
    //   await recursiveBackend.generateProof(recursiveWitness, { keccak: true });


    // Verify recursive proof
    // const verified = await recursiveBackend.verifyProof({
    //   proof: recursiveProof,
    //   publicInputs: recursivePublicInputs,
    // }, { keccak: true });
    // console.log("Recursive proof verified: ", verified);

    const arrayBuffer = await readFile('/home/piotrstec/dev/recursion-mt/js/vk_extension');

    // console.log("Recursive proof: ", recursiveProof.length);
    // console.log("Recursive public inputs: ", recursivePublicInputs.length);
    const binaryData = new Uint8Array(arrayBuffer);

    console.log("inner circuit verification key: ", binaryData.length);

    const honkCalldata = garaga.getHonkCallData(
      innerProofFields,
      flattenFieldsAsArray(innerPublicInputs),
      binaryData,
      0
    );


    const honkCalldataHex = [
      ...honkCalldata.map((element) => `0x${element.toString(16)}`)
    ];
    console.log("Honk calldata", honkCalldata);


    // const provider = new RpcProvider({
    //   nodeUrl:
    //     'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/mVezGEryDGu44a6orkirJc-1DABMv6HW'
    // });
    // let starknetCall: Call = {
    //   contractAddress: `0x00d01383ee6db2967d9941b23eda27131d5ecdaeeb85645d755f255c218815eb`,
    //   entrypoint: 'verify_ultra_keccak_honk_proof',
    //   calldata: honkCalldataHex
    // };
    // let callResponse = await provider.callContract(starknetCall);

    // console.log("CallResponse: ", callResponse);

    // process.exit(verified ? 0 : 1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();


export function flattenFieldsAsArray(fields: any) {
  const flattenedPublicInputs = fields.map(hexToUint8Array);
  return flattenUint8Arrays(flattenedPublicInputs);
}

function flattenUint8Arrays(arrays: any) {
  const totalLength = arrays.reduce((acc: any, val: any) => acc + val.length, 0);
  const result = new Uint8Array(totalLength);

  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}

function hexToUint8Array(hex: any) {
  const sanitisedHex = BigInt(hex).toString(16).padStart(64, '0');

  const len = sanitisedHex.length / 2;
  const u8 = new Uint8Array(len);

  let i = 0;
  let j = 0;
  while (i < len) {
    u8[i] = parseInt(sanitisedHex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }

  return u8;
}