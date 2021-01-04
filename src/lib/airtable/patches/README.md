### Overview
This folder contains patches that should be run after regenerating the airtable schema. This is needed to maintain consistency between the frontend and backend.

Add additional patches here via `git format-patch ... -o <path/to/dir>`.
For more information, you can view the resource [here](https://devconnected.com/how-to-create-and-apply-git-patch-files/)

## Directions to apply patch
- Navigate to the root directory `meepanyar/`.
- Apply all patches in the `src/lib/airtable/patches/` directory by running the following command: `git am src/lib/airtable/patches/*.patch`
- The above command is completed successfully after a `Applying: <patch>` prompt in the terminal
