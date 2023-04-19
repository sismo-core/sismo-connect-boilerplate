#!/bin/sh

# This script generates the ABI files for the contracts in the project.
# It is intended to be run from the project root directory
# the generated ABI will be used to call the contracts from the frontend
mkdir -p ./abi
touch ./abi/AuthAndClaim.json
touch ./abi/SimpleAuth.json
touch ./abi/SimpleClaim.json
touch ./abi/TwoAuthsAndClaim.json

echo "{\n  \"abi\": $(forge inspect AuthAndClaim abi)\n}" >| ./abi/AuthAndClaim.json
echo "{\n  \"abi\": $(forge inspect SimpleAuth abi)\n}" >| ./abi/SimpleAuth.json
echo "{\n  \"abi\": $(forge inspect SimpleClaim abi)\n}" >| ./abi/SimpleClaim.json
echo "{\n  \"abi\": $(forge inspect TwoAuthsAndClaim abi)\n}" >| ./abi/TwoAuthsAndClaim.json