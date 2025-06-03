import { Barretenberg, deflattenFields, RawBuffer, reconstructHonkProof, UltraHonkBackend } from "@aztec/bb.js";
import innerCircuit from "merge.json" assert { type: "json" };
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
      { recursive: true }
    );

    const inputs = {
      secret_1: "0xecfb517a7a809d43e2738081556d459c170649a3339e8e6005a40beeac7d9d9",
      nullifier_1: "0xccd43729afa2f6ae082040aabe6c3738fe972df9d780b76de9259973d8c42a4",
      commitment_amount_1: "0x29a2241af62c0000",
      token_address_1: "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      hashpath_1: [
        "0x3635f9e77611bfe342cd8af7891847bb0d3dbb9b391ccb199c633a709f455c4",
        "0x10a656c83c7b26a9fd85d67a9892605180b581e38bd39642157fe03fa388b98b",
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
      root_1: "0xd01187bbf7beef1ba526c685c808326ffa5093fee91be6985b593e067aa5171",
      secret_2: "0x17daf6bf2d738a2eddb7b6f474525a1d81ad9cd33c1255cffca3600b7313e29f",
      nullifier_2: "0x1cb7e192c55210d5d3cc26927c187f8698c30bba852bfde169b6490f2d0f40da",
      commitment_amount_2: "0x3782dace9d900000",
      token_address_2: "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      hashpath_2: [
        "0x1481e80cb959148868b280427d620632c3a0e733ce48c05f711a8cfc1b181ddc",
        "0x10a656c83c7b26a9fd85d67a9892605180b581e38bd39642157fe03fa388b98b",
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
      root_2: "0xd01187bbf7beef1ba526c685c808326ffa5093fee91be6985b593e067aa5171",
      secret_3: "0x1447ffb6cc8e28e2b79a496952f33a7c8c7b580b315a689dca492299ddcc3e2b",
      nullifier_3: "0x112645c0171d84a5850431067b4755fee056d44de53eef04dbc52d4cc555c5bd",
      commitment_amount_3: "0x4563918244f40000",
      token_address_3: "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      hashpath_3: [
        "0x2098f5fb9e239eab3ceac3f27b81e481dc3124d55ffed523a839ee8446b64864",
        "0x2d5cd91796428e8ebd0102b573f45ccbc8101d3d3ec10dbb18973ffa95b90d0d",
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
      index_3: "0x2",
      root_3: "0xd01187bbf7beef1ba526c685c808326ffa5093fee91be6985b593e067aa5171",
      gas_fee: "0xd4a246cb8d841e0",
      refund_secret_1: "0x2b9995e6712454490a3ae215e70853cd9b061b8c7d33dd4a380dc97893d93f66",
      refund_nullifier_1: "0x13e85a603e23fe6b178eb50c572d9d1595296d8b2b022eb697c6b6631dce1f5",
      refund_amount_1: "0x38196d158c1bbe20",
      refund_commitment_hash_1: "0x7a15693a431f6b20ae9275e5d75c68526c8f2d6ba6132aad6ca997e7c855ca0",
      refund_secret_2: "0x1411b994f5c552a6ada821857321eec30e65119c2eadf43f3346997429547ab1",
      refund_nullifier_2: "0x15b09885645c1654a030cec132fe3716dcb2d726d788bac89e0319f44829266b",
      refund_amount_2: "0x6124fee993bc0000",
      refund_commitment_hash_2: "0x290bfceaa7cae5fd19c3c8497f016c915511150a298ff6a1ce4f24ada50a6abe"
    };
    const { witness } = await innerCircuitNoir.execute(inputs);
    const { proof: innerProofFields, publicInputs: innerPublicInputs } =
      await innerBackend.generateProof(witness);

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
    }, { recursive: true });

    const recursiveInputs = {
      proof: deflattenFields(innerProofFields),
      public_inputs: innerPublicInputs,
      verification_key: vkAsFields,
    };

    const { witness: recursiveWitness } = await recursiveCircuitNoir.execute(
      recursiveInputs
    );
    const { proof: recursiveProof, publicInputs: recursivePublicInputs } =
      await recursiveBackend.generateProof(recursiveWitness, { keccak: true });


    // Verify recursive proof
    const verified = await recursiveBackend.verifyProof({
      proof: recursiveProof,
      publicInputs: recursivePublicInputs,
    }, { keccak: true });
    console.log("Recursive proof verified: ", verified);

    const arrayBuffer = await readFile('/home/piotrstec/dev/tmp-projects/recursion-mt/js/vk');

    console.log("Recursive proof: ", recursiveProof.length);
    console.log("Recursive public inputs: ", recursivePublicInputs.length);
    const binaryData = new Uint8Array(arrayBuffer);

    console.log("inner circuit verification key: ", binaryData.length);

    const honkCalldata = garaga.getHonkCallData(
      recursiveProof,
      flattenFieldsAsArray(recursivePublicInputs),
      binaryData,
      0
    );


    const honkCalldataHex = [
      ...honkCalldata.map((element) => `0x${element.toString(16)}`)
    ];


    const provider = new RpcProvider({
      nodeUrl:
        'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/mVezGEryDGu44a6orkirJc-1DABMv6HW'
    });
    let starknetCall: Call = {
      contractAddress: `0x00eb23b85f3e8b361d740177f0a981087b9ab60ba346d4b531b64e6a8273f60d`,
      entrypoint: 'verify_ultra_keccak_honk_proof',
      calldata: honkCalldataHex
    };
    let callResponse = await provider.callContract(starknetCall);

    console.log("CallResponse: ", callResponse);

    process.exit(verified ? 0 : 1);
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