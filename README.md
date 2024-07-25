# Random Word Slug GitHub Action

[![GitHub Super-Linter](https://github.com/actions/javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/javascript-action/actions/workflows/ci.yml/badge.svg)

Generate strings of random english words in various cases with this GitHub
Action, e.g., `vulture-numerous-boy-silly-energy`

Designed to be incredible simple with useful defaults, this Action uses
[`nas5w/random-word-slugs`](https://github.com/nas5w/random-word-slugs) at the
core to generate sequences of random words and outputs them in multiple case
types for you to use.

## Usage

This Action can be used in many ways, with the outputs stored and used in later
steps being a common way.

### Simple example

In your `steps`:

```yml
- name: Generate random words
  id: generate-words
  uses: ACyphus/random-word-slugs-action@v1
- name: Print random words
  run: |
    echo "${{ steps.generate-words.outputs.words-kebab }}"
    echo "${{ steps.generate-words.outputs.words-camel }}"
```

### Inputs

#### `number-of-words`

The number of words to generate.

Default: `3`

#### `parts-of-speech`

The parts of speech to use. One of the following: `noun`, `adjective`. Note
that, if provided, parts-of-speech must be a string with comma separated options
of the same number as the number of words you are requesting. For example:
`noun,adjective,adjective`

Not required.

Default: random

### Outputs

#### `words-kebab`

The generated words in kebab-case.

#### `words-camel`

The generated words in camelCase.

#### `words-sentence`

The generated words in sentence case.

#### `words-lower`

The generated words in lower case.

#### `words-title`

The generated words in Title Case.

#### `time`

A timestamp of when the action was run
