# Command API

Command APIs are APIs that controls your bot. They defined as the ASCII character string literals. And they may be provided as constants, methods or types in the languages to support implementations.

## How to use this

If there are any library for the languages you want to use, communicate with this game main process through STDIO.

## Officailly supported languages

## Types

### Bool

`true` or `TRUE` and `false` or `FALSE`

## APIs

### Moving a tank

#### Moving left

**Return value**: `{ success: 'SUCCESS' }` ('SUCCESS': bool) means whether it can move left.

**Input Value**: `MOVE LEFT VELOCITY 'VELOCITY'` ('VELOCITY': number) means the velocity moving left.

#### Moving right

**Return value**: `{ success: 'SUCCESS'` }` ('SUCCESS': bool) means whether it can move right.

**Input Value**: `MOVE RIGHT VELOCITY 'VELOCITY'` ('VELOCITY': number) means the velocity moving right.

#### Moving up

**Return value**: `{ success: 'SUCCESS' }` ('SUCCESS': bool) means whether it can move up.

**Input Value**: `MOVE LEFT VELOCITY 'VELOCITY'` ('VELOCITY': number) means the velocity moving up.

#### Moving down

**Return value**: `{ success: 'SUCCESS' }` ('SUCCESS': bool) means whether it can move down.

**Input Value**: `MOVE LEFT VELOCITY 'VELOCITY'` ('VELOCITY': number) means the velocity moving down.
