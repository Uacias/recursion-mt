import {
  UltraHonkBackend,
} from "@aztec/bb.js";
import innerCircuit from "../circuits/example/target/example.json" with { type: "json" };
import { readFile } from "fs/promises";

import { CompiledCircuit, Noir } from "@noir-lang/noir_js";
import * as garaga from "garaga";


(async () => {
  try {
    await garaga.init();
    const innerCircuitNoir = new Noir(innerCircuit as CompiledCircuit);
    const innerBackend = new UltraHonkBackend(innerCircuit.bytecode, {
      threads: 2,
      
    }, );

    console.log("polska gurom");

    const inputs = {
      x: "0x1",
      y: "0x3",
    };
    console.log("before execute");
    const { witness } = await innerCircuitNoir.execute(inputs);
    console.log("Proof generate");
    const { proof: innerProofFields, publicInputs: innerPublicInputs } =
      await innerBackend.generateProof(witness, {keccak: true});
    console.log("proof", innerProofFields);

    const arrayBuffer = await readFile("../circuits/example/target/vk.bin");

    const binaryData = new Uint8Array(arrayBuffer);

    console.log("inner circuit verification key: ", binaryData.length);

    const honkCalldata = garaga.getHonkCallData(
      innerProofFields,
      flattenFieldsAsArray(innerPublicInputs),
      binaryData,
      0
    );

    const honkCalldataHex = [
      ...honkCalldata.map((element) => `0x${element.toString(16)}`),
    ];
    console.log("Honk calldata", honkCalldataHex);
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
  const totalLength = arrays.reduce(
    (acc: any, val: any) => acc + val.length,
    0
  );
  const result = new Uint8Array(totalLength);

  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}

function hexToUint8Array(hex: any) {
  const sanitisedHex = BigInt(hex).toString(16).padStart(64, "0");

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
