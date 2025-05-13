set -e

cd inner
nargo compile
bb write_vk --scheme ultra_honk --oracle_hash keccak -b ./target/inner.json -o ./target
cd ..

cd recursive
nargo compile
bb write_vk --scheme ultra_honk --oracle_hash keccak -b ./target/recursive.json -o ./target
cd ..

cd transfer
nargo compile
bb write_vk --scheme ultra_honk --oracle_hash keccak -b ./target/transfer.json -o ./target
cd ..

cd merge
nargo compile
bb write_vk --scheme ultra_honk --oracle_hash keccak -b ./target/merge.json -o ./target
cd ..

echo "Done"
