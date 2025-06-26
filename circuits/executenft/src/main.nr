fn main(
    // === NFT WITHDRAWAL DATA ===
    nft_merkle_root: pub Field,
    nft_secret: Field,
    nft_nullifier: pub Field,
    // ID of the NFT being withdrawn
    nft_token_id: pub Field,
    // Contract address of the NFT (e.g., Ekubo positions NFT)
    nft_contract_address: pub Field,
    nft_merkle_path: [Field; 31],
    nft_leaf_index: Field,
    // === GAS FEE PAYMENT DATA ===
    fee_merkle_root: pub Field,
    fee_secret: Field,
    fee_nullifier: pub Field,
    fee_deposit_amount: Field,
    fee_token_address: pub Field,
    fee_merkle_path: [Field; 31],
    fee_leaf_index: Field,
    fee_gas: pub Field,
    // === FEE REFUND DATA ===
    fee_refund_secret: Field,
    fee_refund_nullifier: Field,
    // Amount being refunded (fee_deposit_amount - fee_gas)
    fee_refund_amount: Field,
    fee_refund_commitment: pub Field,
) {
    // === VERIFY NFT DEPOSIT ===
    let nft_secret_nullifier_hash = poseidon::poseidon::bn254::hash_2([nft_secret, nft_nullifier]);
    let nft_commitment_with_id =
        poseidon::poseidon::bn254::hash_2([nft_secret_nullifier_hash, nft_token_id]);
    let nft_leaf =
        poseidon::poseidon::bn254::hash_2([nft_commitment_with_id, nft_contract_address]);
    verify_membership(nft_merkle_root, nft_leaf, nft_leaf_index, nft_merkle_path);

    // === VERIFY FEE DEPOSIT ===
    let fee_secret_nullifier_hash = poseidon::poseidon::bn254::hash_2([fee_secret, fee_nullifier]);
    assert(fee_deposit_amount == fee_gas + fee_refund_amount);
    let fee_commitment_with_amount =
        poseidon::poseidon::bn254::hash_2([fee_secret_nullifier_hash, fee_deposit_amount]);
    let fee_leaf =
        poseidon::poseidon::bn254::hash_2([fee_commitment_with_amount, fee_token_address]);
    verify_membership(fee_merkle_root, fee_leaf, fee_leaf_index, fee_merkle_path);

    // === SECURITY CHECKS ===
    // Ensure NFT and fee are different deposits
    assert(nft_leaf != fee_leaf);

    // === VERIFY FEE REFUND COMMITMENT ===
    let refund_secret_nullifier_hash =
        poseidon::poseidon::bn254::hash_2([fee_refund_secret, fee_refund_nullifier]);
    let refund_commitment_with_amount =
        poseidon::poseidon::bn254::hash_2([refund_secret_nullifier_hash, fee_refund_amount]);
    let computed_refund_commitment =
        poseidon::poseidon::bn254::hash_2([refund_commitment_with_amount, fee_token_address]);

    assert(fee_refund_commitment == computed_refund_commitment);
}

pub fn compute_merkle_root<let N: u32>(
    leaf: Field,
    leaf_index: Field,
    merkle_path: [Field; N],
) -> Field {
    let index_bits: [u1; N] = leaf_index.to_le_bits();
    let mut current_hash = leaf;

    for i in 0..N {
        let is_right_child = index_bits[i] as bool;
        let (left_child, right_child) = if is_right_child {
            (merkle_path[i], current_hash)
        } else {
            (current_hash, merkle_path[i])
        };
        current_hash = poseidon::poseidon::bn254::hash_2([left_child, right_child]);
    }

    current_hash
}

pub fn verify_membership<let N: u32>(
    expected_root: Field,
    leaf: Field,
    leaf_index: Field,
    merkle_path: [Field; N],
) {
    let computed_root = compute_merkle_root(leaf, leaf_index, merkle_path);
    assert(computed_root == expected_root);
}
