export const IDL = {
    "version": "0.1.0",
    "name": "decentralized_news",
    "instructions": [
      {
        "name": "initialize",
        "accounts": [
          {
            "name": "state",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "publishArticle",
        "accounts": [
          {
            "name": "article",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "state",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "image",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "State",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "totalArticles",
              "type": "u16"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "Article",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "image",
              "type": "string"
            }
          ]
        }
      }
    ],
    "metadata": {
      "address": "GKQz8VpfXHbj2hXeazQHq1YzN8XvZyQQM2rhpHYJfake"
    }
  }