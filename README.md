# action-esper.io-upload

This action uploads an apk to esper.io using [Esper.io API](https://api.esper.io/#section/Introduction)

## Inputs

### `enterpriseId`

**Required** Esper.io Enterprise ID.

### `apiKey`

**Required** API key to interact with esper.io API.

### `endpointName`

**Required** Esper.io endpoint name.

### `filePath`

**Required** APK file path.

## Outputs

### `applicationId`

New uploaded application id.

## Example usage

uses: actions/action-esper.io-upload@v1.1
with:
  enterpriseId: 'ENTERPRISE_ID'
  apiKey: 'API_KEY'
  endpointName: 'ENDPOINT_NAME'
  filePath: 'FILE_PATH'

## References

- [https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#introduction]
- [https://github.com/vercel/ncc]