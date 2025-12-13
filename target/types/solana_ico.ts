/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_ico.json`.
 */
export type SolanaIco = {
  "address": "HWcfFmawwMUaUngfNBpLa4Tfpk7B3bXbUvSMQvfW1sSv",
  "metadata": {
    "name": "solanaIco",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "buyTokens",
      "discriminator": [
        189,
        21,
        230,
        133,
        247,
        2,
        110,
        42
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "writable": true
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "icoMint"
        },
        {
          "name": "icoProgramTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "icoProgram",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "icoProgramBump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createIco",
      "discriminator": [
        12,
        83,
        125,
        16,
        133,
        67,
        173,
        93
      ],
      "accounts": [
        {
          "name": "icoAdmin",
          "writable": true,
          "signer": true
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "icoMint"
        },
        {
          "name": "icoAdminTokenAccount",
          "writable": true
        },
        {
          "name": "icoProgramTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "icoProgram",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "icoAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositeIco",
      "discriminator": [
        20,
        67,
        136,
        29,
        254,
        228,
        61,
        26
      ],
      "accounts": [
        {
          "name": "icoAdmin",
          "writable": true,
          "signer": true
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "icoMint"
        },
        {
          "name": "icoAdminTokenAccount",
          "writable": true
        },
        {
          "name": "icoProgramTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "icoProgram",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  99,
                  111,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "icoMint"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "discriminator": [
        206,
        156,
        59,
        188,
        18,
        79,
        240,
        232
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "overflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6001,
      "name": "invalidAdmin",
      "msg": "Invalid Admin"
    }
  ],
  "types": [
    {
      "name": "data",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "tokenSold",
            "type": "u64"
          },
          {
            "name": "totalTokens",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
